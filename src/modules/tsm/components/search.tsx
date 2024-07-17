import Dialog from '@/shared/components/dialog';
import { useDialogContext } from '@/shared/components/dialog/provider';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import { Divider, Empty, Input, Spin, Typography } from 'antd';
import useSearchAll from './hooks/use-search-all';
import { debounce } from 'lodash';
import useSearchParam from '@/shared/hooks/use-search-param';
import { listColor } from '@/shared/data';
import { CalendarClock, Eye, Link } from 'lucide-react';
import Tooltip from '@/shared/components/tooltip';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import TextEditor from '@/shared/components/text-editor';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/shared/constant/date';

const ModalSearch = () => {
  return (
    <Dialog.Param
      paramKey={SEARCH_PARAMS.DIALOG}
      paramValue={SEARCH_PARAMS_VALUE.SEARCH_ALL}
      size='sm'
    >
      <SearchContent />
    </Dialog.Param>
  );
};

export default ModalSearch;

const SearchContent = () => {
  const [, setKeyword, keyword] = useSearchParam(SEARCH_PARAMS.KEYWORD);

  const { data: searchResult, isLoading } = useSearchAll(keyword as string);

  const { onClose } = useDialogContext();

  return (
    <>
      <Dialog.CloseButton onClose={() => onClose()} />
      <Typography.Title level={4}>Look for everything</Typography.Title>
      <div className='flex flex-col gap-y-4'>
        <Input
          allowClear
          size='large'
          className='border-none py-2 pl-6 outline-none focus-within:border-none focus:border-none focus:outline-none focus:ring-0'
          placeholder='Search for everything...'
          onChange={debounce((e) => setKeyword(e.target.value), 500)}
        />
      </div>
      <Divider className='my-[1px]' />
      {searchResult && (
        <div className='mt-2 flex flex-col gap-y-2'>
          <Typography.Text className='text-xs font-semibold opacity-40'>Results</Typography.Text>
        </div>
      )}
      <div>
        <div className='flex max-h-[500px] flex-col gap-y-2 overflow-y-scroll'>
          <WorkspaceSection workspace={searchResult?.workspaces || []} />
          <ProjectSection projects={searchResult?.projects || []} />
          <ListCardSection listCards={searchResult?.listCards || []} />
          <CardSection cards={searchResult?.cards || []} />
          <NoteSection notes={searchResult?.notes || []} />
        </div>

        {isLoading && (
          <div className='flex items-center justify-center'>
            <Spin />
          </div>
        )}
      </div>
      <div>
        {!isLoading &&
          searchResult &&
          !searchResult?.workspaces.length &&
          !searchResult.projects.length &&
          !searchResult.listCards.length &&
          !searchResult.cards.length &&
          !searchResult.notes.length && <Empty description='No results found' />}
      </div>
    </>
  );
};

const WorkspaceSection = ({ workspace }: { workspace: Partial<Workspace>[] }) => {
  const navigate = useNavigate();

  const handleCopyUrl = (id: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/tsm/workspace/${id}`);
    toast.success('Copied to clipboard');
  };
  const handleView = (id: string) => {
    navigate(`tsm/workspace/${id}`, {
      replace: true,
    });
  };
  return (
    <div>
      {workspace.map((ws) => {
        const colorRandom = listColor[Math.floor(Math.random() * listColor.length)].color;

        return (
          <div
            key={ws.id}
            className='group my-1 flex cursor-pointer items-center gap-x-2 rounded p-2 transition-all hover:bg-slate-100'
          >
            <div
              style={{
                backgroundColor: colorRandom,
              }}
              className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white'
            >
              {ws?.name?.charAt(0).toUpperCase()}
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex w-[420px] flex-col gap-y-1'>
                <Typography.Text>{ws.name}</Typography.Text>
                <Typography.Text type='secondary'>{ws.description}</Typography.Text>
              </div>

              <div className='hidden items-center gap-x-1 group-hover:flex'>
                <Tooltip title='View' color='black'>
                  <div
                    onClick={() => handleView(ws?.id as string)}
                    className='cursor-pointer rounded px-1 hover:bg-slate-200'
                  >
                    <Eye className='h-[16px] w-[16px]' />
                  </div>
                </Tooltip>
                <Tooltip title='Copy URL' color='black'>
                  <div
                    onClick={() => handleCopyUrl(ws?.id as string)}
                    className='cursor-pointer rounded px-1 hover:bg-slate-200'
                  >
                    <Link className='h-[16px] w-[16px]' />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ProjectSection = ({ projects }: { projects: TSMProjectSearch[] }) => {
  const navigate = useNavigate();
  const handleCopyUrl = (id: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/tsm/project/${id}`);
    toast.success('Copied to clipboard');
  };
  const handleView = (id: string) => {
    navigate(`tsm/project/${id}`, {
      replace: true,
    });
  };
  return (
    <div>
      {projects.length > 0 && (
        <Typography.Text className='text-xs font-semibold opacity-40'>Projects</Typography.Text>
      )}
      {projects.map((project) => (
        <div
          key={project.id}
          className='group my-1 flex cursor-pointer items-center justify-between rounded p-2 transition-all hover:bg-slate-100'
        >
          <div className='flex items-center gap-x-2'>
            <div className='h-10 w-10 rounded'>
              <img
                src={project.backgroundUnsplash?.urls?.small}
                alt=''
                className='h-10 w-full rounded object-cover'
              />
            </div>
            <div>
              <Typography.Text>{project.name}</Typography.Text>
              <Typography.Text type='secondary'>{project.workspace?.name}</Typography.Text>
            </div>
          </div>

          <div className='hidden items-center gap-x-1 group-hover:flex'>
            <Tooltip title='View' color='black'>
              <div
                onClick={() => handleView(project?.id as string)}
                className='cursor-pointer rounded px-1 hover:bg-slate-200'
              >
                <Eye className='h-[16px] w-[16px]' />
              </div>
            </Tooltip>
            <Tooltip title='Copy URL' color='black'>
              <div
                onClick={() => handleCopyUrl(project?.id as string)}
                className='cursor-pointer rounded px-1 hover:bg-slate-200'
              >
                <Link className='h-[16px] w-[16px]' />
              </div>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};

const ListCardSection = ({ listCards }: { listCards: TSMListCardSearch[] }) => {
  const navigate = useNavigate();
  const handleClickViewDetail = (id: string) => {
    navigate(`tsm/project/${id}?view=project`, {
      replace: true,
    });
  };
  return (
    <div>
      {listCards.length > 0 && (
        <Typography.Text className='text-xs font-semibold opacity-40'>List cards</Typography.Text>
      )}
      <div className='grid grid-cols-2 gap-1'>
        {listCards.map((listCard) => (
          <div
            key={listCard.id}
            onClick={() => handleClickViewDetail(listCard.project.id as string)}
            className='flex cursor-pointer items-center gap-x-4 rounded px-2 transition-all hover:bg-slate-100 '
          >
            <div className='h-10 w-10 rounded'>
              <img
                src={listCard.project.backgroundUnsplash?.urls?.small}
                alt=''
                className='h-10 w-full rounded object-cover'
              />
            </div>
            <div key={listCard.id} className='my-2'>
              <Typography.Text>{listCard.name}</Typography.Text>
              <div>
                <Typography.Text>{listCard.project.name}</Typography.Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardSection = ({ cards }: { cards: TSMCardSearch[] }) => {
  const navigate = useNavigate();
  const handleClickViewDetail = (id: string) => {
    navigate(`tsm/project/${id}?view=project`, {
      replace: true,
    });
  };
  return (
    <div>
      {cards.length > 0 && (
        <Typography.Text className='text-xs font-semibold opacity-40'>Cards</Typography.Text>
      )}
      <div className='grid grid-cols-2'>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClickViewDetail(card.project.id as string)}
            className='flex cursor-pointer items-center gap-x-4 rounded px-2 transition-all hover:bg-slate-100 '
          >
            <div className='h-10 w-10 rounded'>
              <img
                src={card.project.backgroundUnsplash?.urls?.small}
                alt=''
                className='h-10 w-full rounded object-cover'
              />
            </div>
            <div key={card.id} className='my-2'>
              <Typography.Text>{card.name}</Typography.Text>
              <div>
                <Typography.Text>{card.project.name}</Typography.Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NoteSection = ({ notes }: { notes: TSMNote[] }) => {
  return (
    <>
      {notes.length > 0 && (
        <Typography.Text className='text-xs font-semibold opacity-40'>Notes</Typography.Text>
      )}
      {notes.map((note) => (
        <div className='flex flex-col gap-y-2'>
          <Typography.Text className='text-xs font-semibold opacity-40'>
            {note.title}
          </Typography.Text>
          <TextEditor
            className='w-64 truncate text-xs'
            style={{
              fontSize: '8px',
            }}
            initialContent={note.content as string}
          />
          <div className='float-right flex items-center gap-x-2 opacity-40 '>
            <Typography.Text className='text-xs italic'>
              {dayjs(note.createdAt).format(DATE_TIME_FORMAT)}
            </Typography.Text>
            <CalendarClock className='h-3 w-3' />
          </div>
        </div>
      ))}
    </>
  );
};
