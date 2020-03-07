import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfileTab from './components/ProfileTab.js';

export default (
    <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component ={LoginPage}/>
    <Route path="logount" component={LogoutPage}/>

  <Route path="profile" component={ProfilePage}/>

    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
    </Route>
);
