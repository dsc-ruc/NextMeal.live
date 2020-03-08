import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';
import axios from "axios";

class ListView extends Component {
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
         }
        }

        renderCards(){
            return this.state.allLocations.map(item => {
                return (

                    <Card style={{ width: '100vw', textAlign: 'center' }}>
                        <Card.Body>
                            <Card.Title>{item.restaurant_name}</Card.Title>
                            <Card.Text>
                            Address: {item.address}
                            </Card.Text>
                            <Card.Text>
                                Food Avaiable: {item.food_available}
                            </Card.Text>
                            <Card.Text>
                                Allergies: {item.potential_allergies}
                            </Card.Text>
                            <Card.Text>
                            Start time: {item.food_available_start_time}
                            </Card.Text>
                            <Card.Text>
                                End time: {item.food_available_end_time}
                            </Card.Text>
                            <Card.Text>
                                End time: {item.food_available_end_time}
                            </Card.Text>
                            <Button variant="primary">Get Directions</Button>
                        </Card.Body>
                    </Card>
                );
            })
        }

        componentDidMount() {
            axios.get('http://localhost:8000/api/donor/?format=json')
              .then(res => {
                this.setState({ allLocations: res.data });
              }).catch((error) => {
                console.log(error);
              })        
          }

        
    render() { 
        return ( 
            <div>
            {this.state.allLocations && this.renderCards()}
            </div>
         );
    }
}
 
export default ListView;