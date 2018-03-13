import React, { Component } from 'react';
import loading from './pokeball_loading.svg';
import './shield.css';

class Shield extends Component {
  render() {
    const show = this.props.show;
    return (
      <div className="shield" data-show={show}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Shield;
