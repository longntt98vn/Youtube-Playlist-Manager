import React, { Component } from 'react';
import Header from './Header';
import "./../App.css";
import Footer from './Footer';
import Content from './Content';
import UserBlock from './UserBlock';
import MyPlaylist from './MyPlaylist';
import EditMyPlaylist from './EditMyPlaylist';

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        {/* <Header></Header>
        <br/><br/><br/>
        

        <Content></Content>
        <Footer></Footer> */}
        {/* <UserBlock></UserBlock> */}
        
        <EditMyPlaylist></EditMyPlaylist>
      </div>
    )

  }
}

export default App;
