import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import './RecentEvents.css';

const getFormattedLocation = location => location && location.split(',')[0];

// const RecentEvent = props => (
//   <div
//     role="button"
//     tabIndex={0}
//     className="RecentEvent"
//     onClick={() => props.history.push(`/${props.eventId}`)}
//     onKeyPress={e => props.history.push(`/${e.target.dataset.eventId}`)}
//     data-event-id={props.eventId}
//   >
//     {getFormattedLocation(props.location)}
//   </div>
// );

const RecentEvent = props => (
  <Button
    onClick={() => props.history.push(`/${props.eventId}`)}
    size="small"
  >
    {getFormattedLocation(props.location)}
  </Button>
);

RecentEvent.propTypes = {
  eventId: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

const RecentEvents = props => (
  <div className="RecentEvents">
    {!!props.events.length && (
      <p>Back to</p>
    )}
    {props.events.map(event =>
      <RecentEvent
        key={event.eventId}
        {...event}
        history={props.history}
      />
    )}
  </div>
);

RecentEvents.propTypes = {
  events: PropTypes.array,
  history: PropTypes.object.isRequired
};

RecentEvents.defaultProps = {
  events: []
};

export default RecentEvents;