import { createContext, useEffect, useState } from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import useGetProject from '../project/hooks/query/use-get-project';
import useSearchParams from '@/shared/hooks/use-search-params';

import dayjs from 'dayjs';

import { DB_DATE_TIME_FORMAT } from '@/shared/constant/date';
import { SEARCH_PARAMS, SEARCH_PARAMS_VALUE } from '@/shared/constant/search-param';
import ModifyCard from '../project/modify-card/modify-card';
import { Tooltip, Typography } from 'antd';
import { getTextColor } from '@/utils/customText';
import { DialogCreateEvent } from './create-event';
import { Badge } from 'antd/lib';

export const EventContext = createContext({} as DateSelectArg);
const CalendarComponent = () => {
  const [weekendsVisible, _setWeekendsVisible] = useState(true);
  const [_currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [_events, setEvent] = useState<EventInput[]>([]);
  const [selectInfo, setSelectInfo] = useState<DateSelectArg>();

  const searchParams = useSearchParams();

  const { data: _project } = useGetProject();

  useEffect(() => {
    if (_project) {
      const events = _project?.listCards.reduce((acc, listCard) => {
        const cards = listCard.cards.map((card) => {
          return {
            id: card.id,
            title: card.name,
            start: dayjs(card.startTime).format(DB_DATE_TIME_FORMAT),
            color: `#${card.color}`,
            end: dayjs(card.estimate).format(DB_DATE_TIME_FORMAT),
            allDay: true,
            state: card.status,
          };
        });
        return [...acc, ...cards];
      }, [] as EventInput[]);

      setEvent(events);
    }
  }, [_project]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectInfo(selectInfo);
    searchParams.set({
      [SEARCH_PARAMS.MODAL]: SEARCH_PARAMS_VALUE.CREATE_EVENT,
    });
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    searchParams.set({
      [SEARCH_PARAMS.DIALOG]: SEARCH_PARAMS_VALUE.CARD,
      [SEARCH_PARAMS.ID]: clickInfo.event.id,
    });
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  return (
    <>
      <div className='mx-4 mb-2 h-[calc(100vh-130px)] overflow-y-scroll rounded bg-white py-2 capitalize text-black'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            next: 'Next',
            prev: 'Prev',
            nextYear: 'Next Year',
            prevYear: 'Prev Year',
          }}
          buttonHints={{
            today: 'Go to today',
            month: 'Go to month',
            week: 'Go to week',
            day: 'Go to day',
            next: 'Go to next',
            prev: 'Go to previous',
            nextYear: 'Go to next year',
            prevYear: 'Go to previous year',
          }}
          dayCellClassNames={['bg-gray-100']}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={_events}
          events={_events}
          eventContent={renderEventContent}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          viewClassNames={'bg-white text-black rounded-lg shadow-md border border-gray-200'}
        />
      </div>
      {_project && <ModifyCard members={_project?.users} />}
      <EventContext.Provider value={selectInfo as DateSelectArg}>
        <DialogCreateEvent />
      </EventContext.Provider>
    </>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  const textColor = getTextColor(eventContent?.backgroundColor as string);

  return (
    <>
      <div className='flex min-w-4 items-center gap-x-2 px-2 py-0'>
        <Tooltip
          title={
            eventContent.event.extendedProps.state === 'Done'
              ? 'Done'
              : eventContent.event.extendedProps.state === 'InProgress'
                ? 'In progress'
                : eventContent.event.extendedProps.state === 'InReview'
                  ? 'In review'
                  : eventContent.event.extendedProps.state === 'Approved'
                    ? 'Approved'
                    : 'Not set'
          }
        >
          <Badge
            color={
              eventContent.event.extendedProps.state === 'Done'
                ? 'green'
                : eventContent.event.extendedProps.state === 'InProgress'
                  ? 'orange'
                  : eventContent.event.extendedProps.state === 'InReview'
                    ? 'purple'
                    : eventContent.event.extendedProps.state === 'Approved'
                      ? 'green'
                      : 'gray'
            }
          />
        </Tooltip>
        <div className='item-center flex gap-x-2'>
          <Typography.Text className='text-left text-xs font-semibold' style={{ color: textColor }}>
            {eventContent.event.title}
          </Typography.Text>
        </div>
      </div>
    </>
  );
}

export default CalendarComponent;
