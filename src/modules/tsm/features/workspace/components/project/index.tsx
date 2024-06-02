import ListCardItem from './list-card-item';
import ModifyCard from './modify-card/modify-card';

const Project = () => {
  return (
    <>
      <div className='px-6'>
        <div className='flex items-center gap-x-3'>
          <ListCardItem />
          <ListCardItem />
          <ListCardItem />
          <ListCardItem />
        </div>
      </div>
      <ModifyCard />
    </>
  );
};

export default Project;
