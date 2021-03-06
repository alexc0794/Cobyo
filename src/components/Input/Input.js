import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Input.css';

const Input = props => (
  <input
    className={cx('Input', `Input-${props.size}`, {
      'Input--disabled': props.disabled
    })}
    autoFocus={props.autoFocus}
    disabled={props.disabled}
    maxLength={props.maxLength}
    size={props.maxLength}
    value={props.value}
    placeholder={props.placeholder}
    onChange={props.onChange}
  />
);

Input.propTypes = {
  autoFocus: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

Input.defaultProps = {
  autoFocus: false,
  size: 'medium',
  disabled: false,
  maxLength: 10,
  value: '',
  placeholder: '',
  onChange: () => {}
};

export default Input;
