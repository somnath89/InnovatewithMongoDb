import React,{useState,useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import axios from "axios";

import './App.css';

const autocompleteAPI = 'https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/autocomplete';

const autocompleteMultiple = 'https://ap-south-1.aws.data.mongodb-api.com/app/searchapp-qqtoi/endpoint/autocompleteMultiple';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25em',
    },
    height:'30px',
    marginRight:'10px',
    marginLeft:'90px',
    borderWidth: '1px',
    backgroundColor: '#fff',
    border: '1px solid #d6d6d7',
    color: '#000',
    borderRadius: '0.375rem'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

let filterToggled = false;

export function NavigationBar(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilter] = React.useState(false);
  const [autocomplete, setAutocomplete] = React.useState([]);

  let subscribedLs = window.localStorage.getItem('subscribed');
    
  const [subscribed, setSubscribed] = React.useState(subscribedLs != null?subscribedLs:false);
  const [notifications, setNotifications] = React.useState(5);

  const input = React.useRef();
  
  const keyPress=(e)=>{
    if(e.keyCode == 13){
         e.preventDefault();
         console.log('enter value', e.target.value);
         //setSearchTerm(e.target.value);
         setAutocomplete([]);
         props.searchRestaurants(searchTerm);
      }
  }
  const handleSearchGlassClick=()=>{
    setAutocomplete([]);
    props.searchRestaurants(searchTerm);
  }
  const toggleFilterPanel=()=>{
    //setFilter(!filters);
    //props.showFilters(!filters);
    props.showFilters(!filterToggled);
  }
  const toggleSubscription=()=>{
    if(!subscribed){
      window.localStorage.setItem('subscribed',!subscribed);
      setSubscribed(!subscribed);
    }
    if(subscribed)
      clearNotifications();
    
  }
  const clearNotifications=()=>{
    setNotifications(0);
  }
  const handleAutoComplete=(ev)=>{

    setSearchTerm(ev.target.value);

    //autocomplete api call

    axios
      .post(autocompleteMultiple, {
        query: ev.target.value
      })
      .then((response) => {
        console.log("autocomplete resp-->"+JSON.stringify(response.data));
        let respArr = [];
        if(response.data.length>0){
          respArr = response.data.map(item=>item.name);
          console.log(JSON.stringify(respArr));
        }
        setAutocomplete(respArr);
      })
      .catch((error) => {
            console.log(error);
            setAutocomplete([]);
        });

  }
  const setSelection=(ev)=>{
    //console.log(ev.target.innerText);
    setSearchTerm(ev.target.innerText);
    setAutocomplete([]);
    //input.current.focus();

  }

  const listAutocomplete=()=>{

    let content = autocomplete.map(item=><li className="autocomplete_li" key={Math.random()}
      onClick={(e)=>setSelection(e)}>{item}</li>);
    return (<ul className="autocomplete_ul">{content}</ul>);
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static " style={{backgroundColor:'transparent',position:'absolute',top:'7px',height:'0px'}}>
        <div className={classes.search}>
            <InputBase
              inputRef={(input) => {
                if(input != null) {
                   input.focus();
                }
              }}
              placeholder="Search Restaurants/Hotels/Stores"
              classes={{
                root: classes.inputRoot,
                input: classes.searchInput,
              }}
              value={searchTerm}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>handleAutoComplete(e)}
              onKeyDown={(e)=>keyPress(e)}
            />
            <img className="search_glass" src={process.env.PUBLIC_URL+'/images/search.png'}
            onClick={()=>handleSearchGlassClick()}></img>

            {autocomplete.length>0?listAutocomplete():null}

            <button style={{display:'none'}} className="cuisineBtn"
                    onClick={()=>props.searchRestaurants(searchTerm)}>Search</button>
            
            <button className="cuisineBtn" onClick={()=>props.searchAirBnbinBox()}>Hotels</button>
            <button className="cuisineBtn" onClick={()=>props.searchRestaurantsinBox()}>Restaurants</button>
            {/*<button className="cuisineBtn" onClick={()=>props.searchStoresinBox()}>Stores</button>
            <button className="cuisineBtn" onClick={()=>props.searchRestaurantsinBox()}>Near You</button>
            <button className="cuisineBtn" onClick={()=>props.searchRestaurantsinBox()}>Open Now</button>*/}
            

            {/*<button className="cuisineBtn">Cuisine</button>

            <button className="cuisineBtn">Rating</button>
           
            <button className="cuisineBtn">Top Rated</button>
            <button className={!filters?"cuisineBtn":"cuisineBtnSelected"} 
            onClick={()=>toggleFilterPanel()}>Filters</button>*/}

            <button className="cuisineBtn" 
            onClick={()=>toggleFilterPanel()}> More Filters</button>

            {/*<button style={{float:'right'}} className="cuisineBtn" 
            onClick={()=>toggleSubscription()}>{subscribed?"Notifications":"Subscribe"}
            {notifications>0?<div className='notification'>{notifications}</div>:null}
          </button>*/}
          
          </div>
          
        
      </AppBar>
    </div>
  );
}
