import React, { useEffect } from "react";
import { geolocated } from "react-geolocated";

const Location = (props) => {
  useEffect(() => {
    if (props.coords) props.show(props.coords);
  }, [props]);
  return !props.isGeolocationAvailable ? (
    <div className="cordination_gps">
      Your browser does not support Geolocation
    </div>
  ) : !props.isGeolocationEnabled ? (
    <div className="cordination_gps">Geolocation is not enabled</div>
  ) : props.coords ? (
    <p className="cordination_gps">
      {props.coords.latitude + " " + props.coords.longitude}
    </p>
  ) : (
    <div className="cordination_gps">Getting the location data&hellip; </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
