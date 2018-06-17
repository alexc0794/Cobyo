import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';
import {selectPlace} from '../createActions';
import {initGoogleMapsAPI} from '../../actions/googleMapsActions';
import {selectPlaceName} from '../createEventFormSelectors';

import PlacesAutocomplete from 'react-places-autocomplete';
import './PlacesAutocomplete.css';
import Button from "../../components/Button/Button";

const PlacesAutocompleteSkeleton = () => (
  <div className="PlacesAutocomplete-root">
    <input
      className="PlacesAutocomplete-input"
      disabled
      placeholder="Loading..."
    />
  </div>
);

class PlacesAutocompleteContainer extends Component {

  static propTypes = {
    placeholder: PropTypes.string,
    placeName: PropTypes.string,
    selectPlace: PropTypes.func.isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    onExpand: PropTypes.func
  };

  static defaultProps = {
    placeholder: 'Where to?',
    placeName: '',
    autoFocus: false,
    onExpand() {}
  };

  state = {
    isExpanded: false,
    isGoogleAPILoaded: false,
    showDefaultSearch: false,
    placeName: this.props.placeName
  };

  async componentDidMount() {
    try {
      await this.props.initGoogleMapsAPI();
      this.setState({isGoogleAPILoaded: true});
    } catch(error) {
      this.setState({showDefaultSearch: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.placeName !== this.state.placeName) {
      this.setState({placeName: nextProps.placeName});
    }
  }

  showDefaultSearch = () => this.state.showDefaultSearch;

  showPlacesAutocompleteSkeleton = () => !this.showDefaultSearch() && !this.state.isGoogleAPILoaded;

  showPlacesAutocomplete = () => !this.showDefaultSearch() && this.state.isGoogleAPILoaded;

  handleChangeName = (placeName) => this.setState({placeName});

  handleExpandToggle = () =>
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }), this.props.onExpand);


  render() {
    const classNames = cx('PlacesAutocomplete-wrapper', {
      'PlacesAutocomplete-expanded': this.state.isExpanded
    });

    return (
      <div
        className={classNames}
        onClick={this.handleExpandToggle}
      >
        {this.showDefaultSearch() && <input placeholder={this.props.placeholder} />}
        {this.showPlacesAutocompleteSkeleton() && <PlacesAutocompleteSkeleton/>}
        {this.showPlacesAutocomplete() && (
          <PlacesAutocomplete
            value={this.state.placeName}
            onChange={this.handleChangeName}
            onSelect={this.props.selectPlace}
          >
            {({getInputProps, suggestions, getSuggestionItemProps}) => (
              <div className="PlacesAutocomplete-root">
                <input
                  {...getInputProps({
                    placeholder: 'Where to?',
                    className: 'PlacesAutocomplete-input',
                    autoFocus: this.props.autoFocus
                  })}
                />
                <div className="PlacesAutocomplete-autocompleteContainer">
                  {suggestions.map(suggestion =>
                    <div {...getSuggestionItemProps(suggestion, {className: 'PlacesAutocomplete-autocompleteItem'})}>
                      <Button
                        variation="secondary"
                        size="small"
                      >
                        {suggestion.description.length > 35 ?
                          suggestion.formattedSuggestion.mainText :
                          suggestion.description
                        }
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  placeName: selectPlaceName(state)
});

const mapDispatchToProps = {
  selectPlace,
  initGoogleMapsAPI
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesAutocompleteContainer);
