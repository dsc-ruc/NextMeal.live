import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProfileArea from '../components/ProfileArea';
import * as types from '../constants/actionTypes';

class ProfileTab extends Component {

  componentDidMount() {
    const userID = this.props.pageState.auth.id;
  }

    constructor(props) {
        super(props);
        this.state = { 
            display: false
         }
    }

    changeDiplay(){
        this.setstate({display: true});
    }

    render() { 
        return (
          <div>
            <ProfileArea
              username="peter"
              emailAddress="peter@whatever.com"
            />
          </div>
         );
    }
}

ProfileTab.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pageState: state
  }
}

export default connect(mapStateToProps)(ProfileTab);
