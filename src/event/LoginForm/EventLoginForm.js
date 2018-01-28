import React  from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './EventLoginForm.css';

const EventLoginForm = props => (
  <form
    className="EventLoginForm"
    onSubmit={props.onSubmit}
  >
    <Input
      onChange={props.onChange}
      value={props.value}
    />
    <Button
      disabled={props.disabled}
    >
      Continue
    </Button>
  </form>
);

EventLoginForm.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default EventLoginForm;
