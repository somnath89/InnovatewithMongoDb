import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {NavigationBar} from './AppBar.js';
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import * as L from 'leaflet';
import cogoToast from 'cogo-toast';
import FilterPanel from './FilterPanel';

import ratings from './ratingsConfig';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const searchURL = 'https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/searchRestaurants';
const searchInboxURL = 'https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/searchInBox';
const searchWhenDoneURL = 'https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/searchWhenDone';

const mcg = L.markerClusterGroup();

function Home() {
  const [userlocation,setUserLocation] = useState(null);
  const [showFilter,setshowFilter] = useState(false);
  const [mapBounds,setmapBounds] = useState(null);
  const [restaurant,setSelectedRestaurant] = useState(null);
  const [map, setMap] = useState(null);
  
  const plotMarkers =()=>{
    let markersList = [[17.46299,78.3529286],[17.461996, 78.3519]];

    var restaurantIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL+"/images/Restro.svg",
      iconSize:   [38, 95], 
      shadowSize:   [50, 64], 
      iconAnchor:   [22, 94], 
      shadowAnchor: [4, 62],  
      popupAnchor:  [-3, -76] 
  });
    markersList.map(item=>{
      var marker = L.marker(item,{icon:restaurantIcon}).addTo(map);
      var popup = marker.bindPopup('<b>Hello world!</b><br />I am a newly popup.');
    })
  }
  
 const calculateRating=(gradesArr)=>{
    
    const counts = {};
    let grades = gradesArr.map(item=>item.grade);
    grades.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    
    //console.log(counts)
    
    let highestKey = "Not Yet Graded"; //default ranking
    if(JSON.stringify(counts) !== JSON.stringify({})){
       highestKey = Object.keys(counts).reduce(function(a, b){ return counts[a] > counts[b] ? a : b });
    
    }
    //let highestKey = Object.keys(counts).reduce(function(a, b){ return counts[a] > counts[b] ? a : b });
    
   // return ratings[highestKey];

    let content = '';
    for(var i=0;i<ratings[highestKey];i++){
     content=content+'<img key='+Math.random()+' class="stars" src='+process.env.PUBLIC_URL+"/images/star.png"+'></img>';
   }
   return content;
  }

  const plotRestaurants =(response)=>{
    let markersList = response;

    //map.clear
    //const mcg = L.markerClusterGroup();

    mcg.clearLayers();

    var restaurantIcon = L.icon({
      iconUrl: process.env.PUBLIC_URL+"/images/Restro.svg",
      iconSize:   [38, 95],
      shadowSize:   [50, 64], 
      iconAnchor:   [22, 94], 
      shadowAnchor: [4, 62],  
      popupAnchor:  [-3, -76] 
  });

    if(markersList instanceof Array) {

        markersList.map(item=>{
        var marker = L.marker(item.address.coord.reverse(),{icon:restaurantIcon,meta:item}).on('click',function(e) {
        setSelectedRestaurant(e.target.options.meta);
      }).addTo(mcg);

       var LPopup = '<div class=popupcard>'+
     '<b>'+item.name+'</b>'+
     '<img class=drivingDirections coordinate='+item.address.coord+' src='+process.env.PUBLIC_URL+'/images/directions.png'+'></img>'+
     '<div>'+item.cuisine+' restaurant ('+item.borough+')</div>'+
     '<div>'+calculateRating(item.grades)+'</div>'+
     '</div>'
        
      var customOptions ={
              'maxWidth': '300',
              'width': '200',
              'className' : 'custom'
            }
        var popup = marker.bindPopup(LPopup,customOptions);
    })
    map.addLayer(mcg);

    map.panTo(new L.latLng(markersList[0].address.coord));
  }
    
   // setUserLocation(new L.latLng(markersList[0].address.coord));
  }

  const searchRestaurantsinBox = () =>{
    
    let bounds = map.getBounds();
    
    
    toast.info("Fetching data...", { autoClose: false,position: toast.POSITION.TOP_CENTER,
                                     isLoading: true });
     // setmapBounds(bounds);
    let box =[[bounds._southWest.lng,bounds._southWest.lat],[bounds._northEast.lng,bounds._northEast.lat]];
    axios
      .post(searchInboxURL, {
        box: box
      })
      .then((response) => {
        if(response.data == "Sorry unable to get results"){
          toast.dismiss();
          cogoToast.info('No results found.');
          plotRestaurants(response.data);
        }else{
          toast.dismiss();
          plotRestaurants(response.data);
        }
      
      });

  }
  const searchRestaurants = (restaurant) =>{
    
    let bounds = map.getBounds();
    console.log("Map Bounds-->"+bounds);
     // setmapBounds(bounds);

    toast.info("Fetching data...", { autoClose: false,position: toast.POSITION.TOP_CENTER,
                                     isLoading: true });
    axios
      .post(searchURL, {
        name: restaurant
      })
      .then((response) => {
        //plotMarkers();
        if(response.data == "Sorry unable to get results"){
          toast.dismiss();
          cogoToast.info('No results found.');
          plotRestaurants(response.data);
        }else{
          toast.dismiss();
          plotRestaurants(response.data);
        }
        
      
      });

  }

  const searchRestaurantsAfterDone = (cuisines,grades) =>{
    
    let bounds = map.getBounds();
    
    
    toast.info("Fetching data...", { autoClose: false,position: toast.POSITION.TOP_CENTER,
                                     isLoading: true });
     // setmapBounds(bounds);
    let box =[[bounds._southWest.lng,bounds._southWest.lat],[bounds._northEast.lng,bounds._northEast.lat]];
    axios
      .post(searchWhenDoneURL, {
        box: box,
        cuisine:cuisines,
        grade:grades.length ==0?["Not Yet Graded"]:grades
      })
      .then((response) => {
        if(response.data == "Sorry unable to get results"){
          toast.dismiss();
          cogoToast.info('No results found.');
          plotRestaurants(response.data);
        }else{
          toast.dismiss();
          plotRestaurants(response.data);
        }
      
      });

  }
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(location) {
      /*console.log(location.coords.latitude);
      console.log(location.coords.longitude);
      console.log(location.coords.accuracy);*/
      //setUserLocation(new L.latLng([location.coords.latitude, location.coords.longitude]));
      setUserLocation(new L.latLng([40.673570, -73.939714]));
      });
  },[]);

  const showDirections=(event)=>{
    
    //https://www.google.com/maps?z=15&daddr=LATITUDE,LONGITUDE
    //https://www.google.com/maps/dir//37.421854,-122.084112/@37.421854,-122.0863007,17z
   // window.open('http://maps.google.com/?q=37.421854,-122.084112');
   let Destcoordinates = event.target.getAttribute("coordinate");
    window.open('https://www.google.com/maps/dir//'+Destcoordinates+'/@'+Destcoordinates+',17z');
  }

  const addClickHandler=()=>{
    document.querySelectorAll(".drivingDirections").forEach(box => 
      box.addEventListener("click", (ev) => showDirections(ev))
    )
  }

  useEffect(() => {
    setTimeout(addClickHandler, 3000);    
});

  return (
    <div>
     <NavigationBar title={"Welcome"} searchRestaurantsinBox={searchRestaurantsinBox}
       searchRestaurants={searchRestaurants} 
       showFilters={setshowFilter} filterToggle={showFilter}/>
      <ToastContainer />
     {userlocation != null?
     <MapContainer center={[userlocation.lat,userlocation.lng]} zoom={14} 
     scrollWheelZoom={true} style={{ height: "100vh" }} whenCreated={setMap}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {/*<Marker position={[userlocation.latitude,userlocation.longitude]}>
      <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
     </Marker>*/}
     
      </MapContainer>:"User location not found"}
      {showFilter?<FilterPanel showFilters={setshowFilter} search={searchRestaurantsAfterDone}/>:null}
   </div>);
}

export default Home;
