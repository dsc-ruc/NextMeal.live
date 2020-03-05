import React from 'react';
import ReactDOM from 'react-dom';
import {geolocated} from 'react-geolocated';

import Geoloc from './Geoloc'

class Main extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.coords && this.props.coords.latitude}</p>
        <Geoloc {...this.props} />
      </div>
    );
  }
}

const MainWithGeoloc = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Main);

export default MainWithGeoloc;