import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "date-fns";
import TextField from "@material-ui/core/TextField";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.locateMe = this.locateMe.bind(this);
    this.onChangeRestaurant_name = this.onChangeRestaurant_name.bind(
      this
    );

    this.onChangefood_available_start_time = this.onChangefood_available_start_time.bind(
      this
    );
    this.onChangefood_available_end_time = this.onChangefood_available_end_time.bind(
      this
    );
    this.onChangeFood_Available = this.onChangeFood_Available.bind(this);
    this.onChangePontential_Allergies = this.onChangePontential_Allergies.bind(
      this
    );
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      restaurant_name: "",
      location: {
        type: "Point",
        coordinates: [0, 0]
      },
      food_available_start_time: "07:30",
      food_available_end_time: "10:30",
      address: "",
      food_available: "",
      potential_allergies: "",
      fireRedirect: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      const latitude = coords.latitude;
      const longitude = coords.longitude;
      this.setState({
        location: {
          type: "Point",
          coordinates: [latitude, longitude]
        }
      });
    });
  }

  onChangeRestaurant_name(e) {
    this.setState({
      restaurant_name: e.target.value
    });
  }
  onChangefood_available_start_time(e) {
    this.setState({
      food_available_start_time: e.target.value
    });
  }
  onChangefood_available_end_time(e) {
    this.setState({
      food_available_end_time: e.target.value
    });
  }
  onChangeFood_Available(e) {
    this.setState({
      food_available: e.target.value
    });
  }

  onChangePontential_Allergies(e) {
    this.setState({
      potential_allergies: e.target.value
    });
  }

  locateMe() {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=39.719129,-75.077044&key=AIzaSyBIQpZBgN7WPGuBCRsCXQBfZJvetJxurFg"
      )
      .then(response => {
        this.setState({
          address: response.data.results[0].formatted_address
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit(e) {
    e.preventDefault();

    const donor = {
      restaurant_name: this.state.restaurant_name,
      location: this.state.location,
      food_available_start_time: this.state.food_available_start_time,
      food_available_end_time: this.state.food_available_end_time,
      address: this.state.address,
      food_available: this.state.food_available,
      potential_allergies: this.state.potential_allergies
    };

    console.log(donor);

    axios
      .post("http://localhost:8000/api/", donor)
      .then(res => {
        this.setState({fireRedirect: true});
      });


    window.location = "/";
  }
  

  render() {

    const { fireRedirect } = this.state;
      
    return (

        
      <div>
        <Form className="form formStyle" onSubmit={this.onSubmit}>
            <h1>Donation Form</h1>
          <Form.Group controlId="exampleForm.ControlInput1">
            <TextField
              id="standard-basic"
              label="Restaurant Name"
              variant="standard"
              value={this.state.restaurant_name}
              onChange={this.onChangeRestaurant_name}
            />
          </Form.Group>
          <div className="">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <form noValidate>
              <TextField
                id="time"
                label="Start Time"
                type="time"
                defaultValue="07:30"
                value={this.state.food_available_start_time}
                onChange={this.onChangefood_available_start_time}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </form>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <form noValidate>
              <TextField
                id="time"
                label="End Time"
                type="time"
                defaultValue="07:30"
                value={this.state.food_available_end_time}
                onChange={this.onChangefood_available_end_time}
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  step: 300 // 5 min
                }}
              />
            </form>
          </Form.Group>
          </div>
          <Form.Group controlId="formGridState">
            <TextField
              id="standard-basic"
              label="Address"
              variant="standard"
              value={this.state.address}
              onChange={this.onChangeRestaurant_name}
            />
            <a cursor="pointer" onClick={this.locateMe}> Locate Me</a>
          </Form.Group>
          <Form.Group controlId="formGridState">
          <TextField
              id="standard-basic"
              label="Available Food"
              variant="standard"
              value={this.state.food_available}
              onChange={this.onChangeFood_Available}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
          <TextField
              id="standard-basic"
              label="Allergies"
              variant="standard"
              value={this.state.potential_allergies}
              onChange={this.onChangePontential_Allergies}
            />
          </Form.Group>
          <Button className="buttonColor" type="submit">
            Submit
          </Button>
          {fireRedirect && <Redirect to="/" />}
        </Form>
      </div>
    );
  }
}
