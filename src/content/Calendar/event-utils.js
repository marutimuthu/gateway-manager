let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },

  { id: 5, title: 'add new event', start: '2022-04-20' },
  { id: 1, title: 'hello', start: '2022-03-01', allDay: true },
  {
    id: 2,
    title: 'start pump and off it as well',
    start: '2022-04-01',
    allDay: true
  },
  {
    id: 3,
    title: 'testing before integrating',
    start: '2022-03-01',
    allDay: true
  },
  {
    id: 4,
    title: 'testing dynamic date insertion',
    start: '2022-04-06',
    allDay: true
  },
  { id: 5, title: 'add new event', start: '2022-04-20', allDay: true },
  { id: 6, title: 'sgdfg', start: '2022-04-12', allDay: true },
  { id: 7, title: 'asdfdsf', start: '2022-04-13', allDay: true }
];

export function createEventId() {
  return String(eventGuid++);
}
