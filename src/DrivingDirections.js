import React,{useState,useEffect} from 'react';
import './App.css';


function DrivingDirections(props){

  const showDirections=()=>{
    console.log("hiii");
    alert('Hello');
    //https://www.google.com/maps?z=15&daddr=LATITUDE,LONGITUDE
    window.open('http://maps.google.com/?q=37.421854,-122.084112');
  }

  return (
  	<img className="drivingDirections" onClick={()=>showDirections(props.coordinates)}
  	src={process.env.PUBLIC_URL+'/images/directions.png'}></img>
  	)
}

export default DrivingDirections;
