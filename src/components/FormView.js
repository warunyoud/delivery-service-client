import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FormView.css';

class FormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.getDefaultValue(props)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ selectedValue: this.getDefaultValue(props) });
  }

  getDefaultValue(props) {
    const defaultValue = {};
    Object.keys(props.dimension).forEach((key) => {
      defaultValue[key] = props.dimension[key].defaultValue;
    });
    return defaultValue;
  }

  isInputValid() {
    for (const item in this.props.dimension) {
      if (this.props.dimension[item].isRequired && this.state.selectedValue[item] === '') {
        return false;
      }
    }
    return true;
  }

  getResult() {
    if (!this.isInputValid()) {
        alert('Invalid Input!!! Please fill all the required entries.');
        return;
    }

    const params = Object.keys(this.state.selectedValue).map((item) =>
      this.state.selectedValue[item] === '' ? '' :
      `${item}=${this.state.selectedValue[item]}&`).join('');

    fetch(`${this.props.pullURL}?${params}graphId=${this.props.graphId}`).then(res => res.json())
      .then(result => {
        if (!result) {
          alert('Invalid Input!!! Please correct your entries.');
        } else {
          this.props.setOutput(this.state.selectedValue, result);
          this.setState({ selectedValue: this.getDefaultValue(this.props) });
        }
      });
  }

  handleChange(event, item) {
    const selectedValue = {...this.state.selectedValue};
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    selectedValue[target.name] = value;
    this.setState({ selectedValue });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getResult();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <h1>{ this.props.title }</h1>
        <p> { this.props.description } </p>
        {
          Object.keys(this.state.selectedValue).map((item) =>
            typeof this.state.selectedValue[item] === 'boolean' ?
              (
                <div className='form__input-checkbox'>
                  <input
                    className='form__input-checkbox__field'
                    name={ item }
                    type='checkbox'
                    checked={ this.state.selectedValue[item] }
                    onChange={ this.handleChange }
                    />
                  <span className='form__input-checkbox__label'>{ item }</span>
                </div>
              ) :
              (
                <div className='form__input-text'>
                  <p className='form__input-text__label'>
                    { this.props.dimension[item].isRequired ? `${item}*` : item }
                  </p>
                  <input
                    className='form__input-text__field'
                    name={ item }
                    type='text'
                    value={ this.state.selectedValue[item] }
                    onChange={ this.handleChange }
                    />
                </div>
              )
            )
        }
        <button className='form__button'>Calculate value</button>
      </form>
    );
  }
}

FormView.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pullURL: PropTypes.string.isRequired,
  dimension: PropTypes.object.isRequired,
  setOutput: PropTypes.func.isRequired,
  graphId: PropTypes.string
};

export default FormView;
