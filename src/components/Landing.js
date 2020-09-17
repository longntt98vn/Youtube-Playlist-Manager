import React, { Component } from 'react';
import { db } from "../firebase/firebase"
import LandingTable from './LandingTable';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromDB: []
    }
  }
  componentDidMount() {
    db.ref(`playlist/public`).on("value", data => {
      const array = [];
      data.forEach(element => {
        array.push({
          playlistID: element.key,
          playlistTitle: element.val().playlistTitle,
          quantity: element.val().quantity,
        })
      })
      this.setState({
        dataFromDB: [...array]
      });

    })
  }

  getData = () => {
    if (this.state.dataFromDB) {
      return this.state.dataFromDB.map((value, key) => {
        return <LandingTable
          key={key}
          idDB={value.playlistID}
          id={key}
          playlistTitle={value.playlistTitle}
          quantity={value.quantity}
        />
      })
    }
  }

  render() {
    return (

        <div className="row landing">
          {
            this.getData()
          }
      </div>
    );
  }
}

export default LandingPage;