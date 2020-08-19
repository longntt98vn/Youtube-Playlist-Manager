import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import MainPage from '../component/MainPage';

class RouterURL extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/main-page" component={MainPage}/>
            </Switch>
        );
    }
}

export default RouterURL;