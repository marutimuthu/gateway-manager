import React, { useState, useEffect } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, Tab, Tabs } from '@mui/material';

import axios from "axios";
import { server_url } from 'src/api/app.js';

export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({});
  const [initalEvents, setInitalEvents] = useState(null);

  useEffect(() => {
    (async function () {
      const response = await fetch(`${server_url}/api/calendar`);
      const events = await response.json()
      console.log("database events", events)
      // output of initial events
      const output = events.map((event, idx) => {
        return {
          id: event._id,
          title: event.content,
          start: new Date(event.date),
        }
      })
      console.log("state output", output)
      setInitalEvents(output)
    })();
  }, [])

  return (
    <>
      <Helmet>
        <title>Calendar | Gateway Manager</title>
      </Helmet>

      <Container maxWidth="lg">

        <Box sx={{ py: 5 }} item xs={12}>
          <div className="demo-app">
            <div className="demo-app-main">
              {initalEvents && <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev today next',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                initialEvents={initalEvents} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                // you can update a remote database when these fire:
                eventAdd={addEventInDb}
                eventChange={changeEventHandler}
              // eventRemove={function () {}}
              />}
            </div>
          </div>
        </Box>

      </Container>
    </>
  );

  function addEventInDb() {
    axios.post(`${server_url}/api/calender`, {
      "content": newEvent.title,
      "date": newEvent.start
    })
  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEventObj = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      setNewEvent(newEventObj)

      calendarApi.addEvent(newEventObj);
    }

    console.log({ title });
  }

  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )

    ) {

      axios.delete(`${server_url}/api/calender/${clickInfo.event.id}`).then(res => console.log(res))
      clickInfo.event.remove();

    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function changeEventHandler(newEvent) {
    console.log("event changed", newEvent)
    console.log("start new date", newEvent.event.start)
    axios.put(`${server_url}/api/calender`, {
      id: newEvent.event.id,
      content: newEvent.event.title,
    date: new Date(newEvent.event.start),
      
    }).then(res =>  console.log(res))
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}