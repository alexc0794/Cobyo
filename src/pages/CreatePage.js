import React, { Component } from 'react';
import {connect} from 'react-redux';
import {formatDateForDatabase} from '../helpers/moment';
import {createEvent} from '../create/createActions';
import NavBar from '../navigation/NavBar/NavBar';
import CreateEventForm from '../create/EventForm/CreateEventForm';
import './Page.css';

class CreatePage extends Component {
  state = {
    placeValue: '',
    placeId: null,
    eventTime: formatDateForDatabase()
  };

  handleSubmit = e => {
    e.preventDefault();
    const {placeId, eventTime} = this.state;
    this.props.createEvent(placeId, eventTime).then(eventId =>
      this.props.history.push(`/events/${eventId}`)
    );
  };

  handleChangePlace = (placeValue) => this.setState({placeValue});

  handleSelectPlace = (placeValue, placeId) => this.setState({placeValue, placeId});

  render() {
    return (
      <div className="CreatePage">
        <CreateEventForm
          placeValue={this.state.placeValue}
          disabled={!this.state.placeId}
          onSubmit={this.handleSubmit}
          onSelectPlace={this.handleSelectPlace}
          onChangePlace={this.handleChangePlace}
        />
        <NavBar/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createEvent
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePage);
