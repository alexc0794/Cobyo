import { types as eventTypes } from '../../event/eventActions_old';
import { types as createTypes } from '../../create/createActions_old';
import { types as eventUserTypes } from '../../event/eventUserActions_old';
import { types as notificationTypes } from '../../event/notifications/notificationsActions';
import { AttendeeDefaultProps } from '../../event/attendees/AttendeesListItem/AttendeesListItem';

export const moduleName = 'events';

const initialState = {};

export const eventInitialState = {
  eventId: null,
  placeId: null,
  location: '',
  scheduledTime: null,
  attendeeIds: [],
  notificationIds: [],
  me: AttendeeDefaultProps,
  isRefreshing: false
};

export default function events(state = initialState, { type, payload }) {
  switch (type) {
    case eventTypes.fetchEventRequest: {
      const { eventId } = payload;
      return {
        ...state,
        [eventId]: {
          ...eventInitialState,
          ...state[eventId]
        }
      };
    }
    case eventTypes.fetchEventSuccess: {
      const { eventId } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          ...payload
        }
      };
    }
    case eventUserTypes.loginEventSuccess: {
      const { eventId, userName, travelMode } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            userName,
            travelMode
          }
        }
      };
    }
    case eventUserTypes.refreshEventSuccess:
    case eventUserTypes.refreshEventFailure: {
      const { eventId, duration, lastUpdated, hasLeft } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            duration,
            lastUpdated,
            hasLeft
          }
        }
      };
    }
    case eventUserTypes.getAttendeesSuccess: {
      const { eventId, attendees } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          attendeeIds: attendees.map(attendee => attendee.userName)
        }
      };
    }
    case eventUserTypes.leaveForEventRequest:
    case eventUserTypes.leaveForEventFailure: {
      const { eventId, hasLeft } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            hasLeft
          }
        }
      };
    }
    case eventUserTypes.changeTravelModeSuccess: {
      const { eventId, travelMode } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          me: {
            ...state[eventId].me,
            travelMode
          }
        }
      };
    }
    case notificationTypes.fetchNotificationsSuccess: {
      const { eventId, notifications } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          notificationIds: notifications.map(({ createdAt }) => createdAt)
        }
      };
    }
    case createTypes.editEventSuccess: {
      const { eventId } = payload;
      return {
        ...state,
        [eventId]: {
          ...state[eventId],
          ...payload
        }
      };
    }
    default:
      return state;
  }
}
