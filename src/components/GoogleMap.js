import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from "react";
import axios from "axios";
import ResturantMarker from '../images/resturantMarker.png';
import {Card} from 'react-bootstrap';

const style = {
    width: "100%",
    height: "90vh",
    position: "relative",
  };

  // Actual Magic: https://stackoverflow.com/a/41337005
// Distance calculates the distance between two lat/lon pairs
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;
  var a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 12742 * Math.asin(Math.sqrt(a));
}

// Takes an array of objects with lat and lon properties as well as a single object with lat and lon
// properties and finds the closest point (by shortest distance).
function closest(data, v) {
  // console.log(data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon'])))
  // console.log(Math.min(...data.map(p => distance(v['lat'],v['lon'],p['lat'],p['lon']))))
  var distances = data.map(function(p) {
    console.log(p);
    return {
      lat: p.location.coordinates[0],
      lon: p.location.coordinates[1],
      organization: p.name_of_restaurant,
      address: p.address,

      distance: distance(v.currlat, v.currlon, p.location.coordinates[0], p.location.coordinates[1])
    };
  });
  var minDistance = Math.min(...distances.map(d => d.distance));

  var closestTap = {
    organization: "",
    address: "",
    lat: "",
    lon: ""
  };

  for (var i = 0; i < distances.length; i++) {
    if (distances[i].distance === minDistance) {
      closestTap.lat = distances[i].lat;
      closestTap.lon = distances[i].lon;
      closestTap.organization = distances[i].organization;
      closestTap.address = distances[i].address;
    }
  }

  return closestTap;
}

  function getCoordinates() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

export class GoogleMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          currlat: 39.708262399999995, // 39.9528,
          currlon: -75.11408639999999, //-75.1635,
          taps: [],
          tapsLoaded: false,
          allLocations: null,
          closestPoint: null,
        };
      }

      onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderMarkers() {
    return this.state.allLocations.map(item => {
      return (
        <Marker
              icon={{
                url: ResturantMarker,
                anchor: new this.props.google.maps.Point(32,32),
                scaledSize: new this.props.google.maps.Size(64,64)
              }}
              onClick={this.onMarkerClick}
              name={item.restaurant_name}
              address = {item.address}
              sTime = {item.food_available_start_time}
              eTime = {item.food_available_end_time}
              foodAvail = {item.food_available}
              allergies = {item.potential_allergies}
              position={{lat: item.location[0], lng: item.location[1]}}
              qPos = {item.location[0] + "," + item.location[1]}
              />
      )
    })
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/donor/?format=json')
      .then(res => {
        this.setState({ allLocations: res.data });
      }).then(() => {
        this.setState({closestPoint: closest(this.state.allLocations, {currlat: this.state.currlat, currlon: this.state.currlon})});
      })
      .catch((error) => {
        console.log(error);
      })

      getCoordinates().then(position => {
        if (isNaN(position.coords.latitude) || isNaN(position.coords.longitude)) {
          console.log("lat lon not found");
          this.setState({ currlat: parseFloat("39.952744") });
          this.setState({ currlon: parseFloat("-75.163500") });
        } else {
          console.log("lat lon found");
          this.setState({ currlat: position.coords.latitude });
          this.setState({ currlon: position.coords.longitude });
        } 
      });

  }

    render() {
        console.log(this.state.closestPoint);
        return (
          <>
        <Map google={this.props.google}
            className={"map"}
            id="map"
            style={style}
            zoom={14}
            initialCenter={{
            lat: this.state.currlat,
            lng: this.state.currlon
            }}
            center={{ lat: this.state.currlat, lng: this.state.currlon }}
        >
            <Marker
            onClick={this.onMarkerClick}
            name={'Current location'} 
            position={{lat: this.state.currlat, lng: this.state.currlon}}>
              <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                visible={this.state.showingInfoWindow}>
                <div>
                <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
            </Marker>

            {this.state.allLocations && this.renderMarkers()}
            <Marker
                  icon={{
                    url: ResturantMarker,
                    anchor: new this.props.google.maps.Point(32,32),
                    scaledSize: new this.props.google.maps.Size(64,64)
                  }}
                  onClick={this.onMarkerClick}
                  name={'Holder Marker'}
                  address = {"Location"}
                  sTime = {"Start Time"}
                  eTime = {"End Time"}
                  foodAvail = {"Food Avalible"}
                  allergies = {"Allergies"}
                  position={{lat: 39.709262, lng: -75.1240}}/>


            <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                visible={this.state.showingInfoWindow}>
                <div>
                <h3>{this.state.selectedPlace.name}</h3>
                <a href={"https://www.google.com/maps/search/?api=1&query=" + this.state.selectedPlace.qPos}>
                  <h5 >{"Address: " + this.state.selectedPlace.address}</h5>
                </a>

                <h5>{"Open Time: " + this.state.selectedPlace.sTime}</h5>
                <h5>{"Close Time: " + this.state.selectedPlace.eTime}</h5>
                <h5>{"Food Available: " + this.state.selectedPlace.foodAvail}</h5>
                <h5>{"Allergies: " + this.state.selectedPlace.allergies}</h5>
                </div>
            </InfoWindow>
        </Map>

        <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Title>Closest Location</Card.Title>

          <Card.Text>
            <a href={"https://www.google.com/maps/search/?api=1&query=" + (this.state.closestPoint && this.state.closestPoint.lat) + ", " + (this.state.closestPoint && this.state.closestPoint.lon) }>
                  {this.state.closestPoint && this.state.closestPoint.organization}
            </a>
          </Card.Text>

        </Card.Body>
      </Card>
      </>
        );
    }
    }

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBIQpZBgN7WPGuBCRsCXQBfZJvetJxurFg")
})(GoogleMap)
