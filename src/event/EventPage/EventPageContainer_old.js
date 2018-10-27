import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvent } from '../eventActions_old';
import {
  selectEventId,
  selectHasEventEnded,
  selectIsLoggedIn,
  selectEventPhotoReference
} from '../activeEventSelectors_old';
import EventPage from './EventPage_old';

class EventPageContainer extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    isEventLoaded: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    hasEnded: PropTypes.bool.isRequired,
    photoReference: PropTypes.string,
    fetchEvent: PropTypes.func.isRequired
  };

  state = {
    isQuickLoginModalOpen: false,
    localStorageLogin: null
  };

  async componentDidMount() {
    try {
      const {
        localStorageEvent,
        localStorageUserName
      } = await this.props.fetchEvent(this.props.eventId);
      if (!!localStorageEvent) {
        this.setState({
          isQuickLoginModalOpen: true,
          localStorageLogin: {
            ...localStorageEvent
          }
        });
      } else if (!!localStorageUserName) {
        this.setState({
          isQuickLoginModalOpen: true,
          localStorageLogin: {
            userName: localStorageUserName
          }
        });
      }
    } catch (error) {
      this.props.history.replace('/404.html');
    }
  }

  getShowEventEnded = () => this.props.hasEnded;

  getShowLogin = () =>
    !this.getShowEventEnded() &&
    this.props.isEventLoaded &&
    !this.props.isLoggedIn;

  getShowQuickLogin = () =>
    !this.getShowEventEnded() &&
    this.props.isEventLoaded &&
    !this.props.isLoggedIn &&
    !!this.state.localStorageLogin;

  getShowEventCarousel = () => !this.getShowEventEnded() && this.props.isLoggedIn && this.props.isEventLoaded;

  getShowAttendeesList = () =>
    !this.getShowEventEnded() && this.props.isLoggedIn;

  getShowNotifications = () =>
    !this.getShowEventEnded() && this.props.isLoggedIn;

  handleCloseQuickLoginModal = () =>
    this.setState({ isQuickLoginModalOpen: false });

  render() {
    return (
      <EventPage
        eventId={this.props.eventId}
        photoReference={this.props.photoReference}
        showLogin={this.getShowLogin()}
        showQuickLogin={this.getShowQuickLogin()}
        showEventCarousel={this.getShowEventCarousel()}
        showAttendeesList={this.getShowAttendeesList()}
        showNotifications={this.getShowNotifications()}
        showEventEnded={this.getShowEventEnded()}
        {...this.state}
        onCloseQuickLoginModal={this.handleCloseQuickLoginModal}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: selectIsLoggedIn(state),
  isEventLoaded: selectEventId(state) !== null && selectEventId(state) === ownProps.eventId,
  hasEnded: selectHasEventEnded(state),
  photoReference: selectEventPhotoReference(state)
});

const mapDispatchToProps = {
  fetchEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPageContainer);