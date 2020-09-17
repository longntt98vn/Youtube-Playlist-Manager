import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import * as routes from "../constants/routes";

//nav stuff
import Navigation from "./Navigation";
import LandingPage from "./Landing";
import HomePage from "./Home";
import EditMyPlaylist from "./EditMyPlaylist"

import withAuthentication from "./withAuthentication";
import MyPlaylist from "./MyPlaylist";
import VideoPlayer from "./VideoPlayer";

import "../App.css"
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Navigation />
            <Route exact path={routes.EDITMYPLAYLIST} component={EditMyPlaylist}/>
            <Route exact path={routes.LANDING} component={LandingPage} />
            <Route exact path={routes.HOME} component={HomePage} />
            <Route exact path={routes.MYPLAYLIST} component={MyPlaylist}/>
            <Route exact path={routes.VIDEOPLAYER} component={VideoPlayer}/>
            <Footer/>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default withAuthentication(App);


