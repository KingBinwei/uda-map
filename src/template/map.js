import PropTypes from 'prop-types'
import React, { Component } from 'react';

function loadJS(src, err) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onerror = err();
  ref.parentNode.insertBefore(script, ref);
}

function errorHandle() {
  document.getElementById('map').insertAdjacentHTML('afterbegin', `Can't found this map!`)
}

class Map extends Component {

  static propTypes = {
    mapLocations: PropTypes.array.isRequired
  }
    
  state = {
    loaded: false
  };

  componentDidMount() {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyC4cyzTLl306raz-iA1A-RfRCNxB7k06sI&libraries=places&callback=initMap", errorHandle);
  }

  render() {
    let map, marker, infowindow;
    const { mapLocations } = this.props;
    const { loaded } = this.state;
    window.initMap = () => {
      this.setState({
        loaded: true
      });
    };
  if (loaded) { window.renderMap(mapLocations) }
    
    function addMarker(location) {
      marker = new window.google.maps.Marker({
        position: location.marker.position,
        title: location.marker.title,
        map: map,
        animation: window.google.maps.Animation.DROP
      });
      return marker;
    }

    function addInfo(location) {
      infowindow = new window.google.maps.InfoWindow({
        content: `${location.info}</br>`,
        maxWidth: 200
      });
      return infowindow;
    }

    function clickListener(mar, info) {
      return mar.addListener('click', function () {
        info.open(map, mar);
      })
    }

    window.renderMap = (locations) => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: locations[0].marker.position,
        zoom: 11
      });
      locations.map((location) => {
        
            addMarker(location)
            addInfo(location)
            clickListener(marker, infowindow)
            
      });

    };

    return (
      <div id = "map"> </div>
    )
  }
}

export default Map;