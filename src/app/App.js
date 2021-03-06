import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../reducers/configureStore';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ErrorBannerContainer from '../error/ErrorBanner/ErrorBannerContainer';
import HomePageContainer from '../home/HomePage/HomePageContainer';
import EventsPageContainer from '../events/EventsPage/EventsPageContainer';
import CreateEventPageContainer from '../create/CreateEventPage/CreateEventPageContainer';
import EditEventPageContainer from '../create/CreateEventPage/EditEventPageContainer';
import EventPageContainer from '../event/EventPage/EventPageContainer';
import SettingsPageContainer from '../settings/SettingsPage/SettingsPageContainer';
import NotFoundPage from '../pages/NotFoundPage';

const store = configureStore();
const extractParams = props => props.match.params;

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="Page">
          <ErrorBannerContainer />
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <HomePageContainer {...props} />}
              />
              <Route
                exact
                path="/events"
                render={() => <EventsPageContainer />}
              />
              <Route
                exact
                path="/settings"
                render={props => <SettingsPageContainer {...props} />}
              />
              <Route
                exact
                path="/create"
                render={props => <CreateEventPageContainer {...props} />}
              />
              <Route
                path="/events/:code"
                render={props => (
                  <Redirect to={`/${extractParams(props).eventId}`} />
                )}
              />
              <Route exact path="/404.html" component={NotFoundPage} />
              <Route
                exact
                path="/:code"
                render={props => (
                  <EventPageContainer {...props} {...extractParams(props)} />
                )}
              />
              <Route
                exact
                path="/:code/edit"
                render={props => <EditEventPageContainer {...props} {...extractParams(props)} />}
              />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
