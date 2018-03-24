import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {formatDate} from '../../helpers/moment';
import {selectEventTime, selectEventLocation} from '../activeEventSelectors';
import './EventDetails.css';

const EventDetails = props => {
  const time = formatDate(props.dateTime, 'h:mm A');
  const date = formatDate(props.dateTime, 'ddd');

  return (
    <div className="EventDetails">
      <div className="EventDetails-location">
        {props.location.split(',')[0]}
      </div>
      {props.showDateTime && (
        <div className="EventDetails-dateTime">
          <div className="EventDetails-time">{time}</div>
          <div className="EventDetails-date">{date}</div>
        </div>
      )}
    </div>
  );
};

EventDetails.propTypes = {
  dateTime: PropTypes.number,
  location: PropTypes.string,
  showDateTime: PropTypes.bool
};

EventDetails.defaultProps = {
  dateTime: null,
  location: '',
  showDateTime: false
};

const mapStateToProps = state => ({
  dateTime: selectEventTime(state),
  location: selectEventLocation(state)
});

export default connect(
  mapStateToProps
)(EventDetails);