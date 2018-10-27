import logger from '../helpers/logger';
import { getItem } from '../helpers/localStorage';
import { selectPlaceId, selectPlaceName } from './createEventFormSelectors';
import { selectActiveEventId } from '../event/activeEventSelectors_old';
import { createEventApi, editEventPlaceApi } from '../event/eventApi_old';

export const types = {
  selectPlace: 'SELECT_PLACE',
  createEventRequest: 'CREATE_EVENT_REQUEST',
  createEventSuccess: 'CREATE_EVENT_SUCCESS',
  createEventFailure: 'CREATE_EVENT_FAILURE',
  editEventSuccess: 'EDIT_EVENT_SUCCESS',
  editEventFailure: 'EDIT_EVENT_FAILURE'
};

export function selectPlace(placeName, placeId) {
  return {
    type: types.selectPlace,
    payload: { placeName, placeId }
  };
}

function createEventRequest() {
  return { type: types.createEventRequest };
}
function createEventSuccess() {
  return { type: types.createEventSuccess };
}

function createEventFailure({ prevActiveEventId }) {
  return { type: types.createEventFailure, payload: { prevActiveEventId } };
}

export const createEvent = () => async (dispatch, getState) => {
  const state = getState();
  const prevActiveEventId = selectActiveEventId(state);
  const placeId = selectPlaceId(state);
  const placeName = selectPlaceName(state);

  try {
    dispatch(createEventRequest());
    const response = await createEventApi(placeId, placeName);
    if (
      response &&
      !response.errors &&
      response.data &&
      response.data.createEvent
    ) {
      const {
        code: eventId,
        name: eventName,
        place: { googlePlaceId: placeId }
      } = response.data.createEvent;
      dispatch(createEventSuccess());

      const localStoragePlaces = {
        ...getItem('places', true),
        [eventName]: {
          placeId
        }
      };
      localStorage.setItem('places', JSON.stringify(localStoragePlaces));

      return Promise.resolve(eventId);
    }

    dispatch(createEventFailure({ prevActiveEventId }));
    return Promise.reject();
  } catch (error) {
    logger(`Failed to create event: ${error}`);
    dispatch(createEventFailure());

    return Promise.reject();
  }
};

function editEventSuccess({eventId, placeId, location}) {
  return {
    type: types.editEventSuccess,
    payload: {
      eventId,
      placeId,
      location
    }
  };
}

function editEventFailure() {
  return { type: types.editEventFailure };
}

export const editEventPlace = eventId => async (dispatch, getState) => {
  const state = getState();
  const placeId = selectPlaceId(state);
  const placeName = selectPlaceName(state);
  try {
    const response = await editEventPlaceApi({ eventId, placeId, placeName });
    dispatch(editEventSuccess({ eventId, placeId, location: placeName }));

    const localStoragePlaces = {
      ...getItem('places', true),
      [placeName]: {
        placeId
      }
    };
    localStorage.setItem('places', JSON.stringify(localStoragePlaces));

    const localStorageEvents = getItem('events', true);
    localStorage.setItem('events', JSON.stringify({
      ...localStorageEvents,
      [eventId]: {
        ...localStorageEvents[eventId],
        location: placeName
      }
    }));

    return Promise.resolve(response);
  } catch (error) {
    dispatch(editEventFailure());
    logger(`Failed to edit event place: ${error}`);
    return Promise.reject();
  }
};