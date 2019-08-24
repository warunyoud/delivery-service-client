import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TableView.css';

class TableView extends Component {
  render() {
    return (
      <table className='table-view'>
        <tr>
          <th>Input</th>
          <th>Output</th>
        </tr>
        {
          this.props.data.map((item) =>
            <tr>
              <td>{ item.input }</td>
              <td>{ item.output }</td>
            </tr>
          )
        }
      </table>
    );
  }
}

TableView.propTypes = {
  data: PropTypes.object.isRequired
}

export default TableView;
