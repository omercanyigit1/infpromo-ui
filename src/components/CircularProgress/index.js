import React from "react";
import icon from './../../assets/images/icon.png';

const CircularProgress = ({className}) => <div className={`loader ${className}`}>
  <img src={icon} style={{height: 24, width: 24}} alt="loader"/>
</div>;
export default CircularProgress;
