import React, { Component } from 'react';
import Filter from './template/filter';
import GoogleMap from './template/map';
import * as _ from 'lodash';

class App extends Component {

  state = {
    initLocations: [],
    locations: [],
    mapLocations: []
  };
  
  componentDidMount () {
    fetch('locations.json')
    .then((res) => res.json())
    .then((info) => {
      this.setState({
          initLocations: info.data.locations,
          locations: info.data.locations,
          mapLocations: info.data.locations
      })
    })
  }
  
  updateLocations = _.debounce((newLocations) => {
    this.setState({
      locations: newLocations,
      mapLocations: newLocations
    })
  }, 600);

  pickLocation (location) {
    this.setState({ mapLocations: location });
  }

  render() {
    const { locations, initLocations, mapLocations } = this.state;
      return (
        <div className="container">
          <div className="row">
        <Filter
          initLocations={initLocations}
          locations={locations}
          onHandleChange={(newLocations) => this.updateLocations(newLocations)}
          onHandlePick={(location) => this.pickLocation(location)}
        />
        <GoogleMap
          locations={locations}
          mapLocations={mapLocations}
        />
        </div>
      </div>
    )
  }
}

export default App;