import React,{useState,useEffect} from 'react';
import './App.css';
import cuisines from './cuisines';

import AddIcon from '@material-ui/icons/AddCircleOutline';
//import DoDisturbOnIcon from '@material-ui/icons/DoDisturbOn';

import HorizontalRuleIcon from '@material-ui/icons/MinimizeRounded';
import PriceSlider from './PriceSlider';

function FilterPanel(props){

    const [cuisine,setCuisineSelected]=useState(false);
    const [rating,setRatingSelected]=useState(false);
    const [openHours,setopenHoursSelected]=useState(false);
    const [selection,setCurrentSelection]=useState("Cuisine");
    const [refresh,setRefresh]=useState(false);

    let previousSelections = window.localStorage.getItem('selections');
    
    const [selectionItems,setSelectionItems] = useState(previousSelections != null?JSON.parse(previousSelections):
      {cuisines:[],ratings:[],openHrs:[],amenities:[],bedrooms:"",bathrooms:"",beds:"",price_range:[]});

    const toggleButton=(event)=>{
       setCurrentSelection(event.target.innerText);
    }

  function RatingComponent(props){
   
    const paintStars=(stars)=>{
        let content = [];
        for(var i=0;i<stars;i++){
        	content.push(<img key={Math.random()} className="stars" src={process.env.PUBLIC_URL+"/images/star.png"}></img>);
        }
        return content;
    }

  	return (<div>{paintStars(props.stars)}</div>)
  }
  const clearSelections=()=>{

  	 let updObj = {...selectionItems,cuisines:[],ratings:[],openHrs:[],amenities:[],
		            bedrooms:"",bathrooms:"",beds:"",price_range:[]};
     window.localStorage.setItem('selections',JSON.stringify(updObj));
     setSelectionItems(updObj);
  	 setRefresh(!refresh);
  }

  const getChosenFilters=()=>{
	console.log("done");
	console.log(selectionItems);
	 props.showFilters(false);
    if(selectionItems.cuisines.length > 0 || selectionItems.ratings.length>0){
      props.search(selectionItems.cuisines,selectionItems.ratings);
    }
	//if(selectionItems.bathrooms.length > 0 || selectionItems.ratings.length>0){
	props.searchHotels(selectionItems.bedrooms,selectionItems.beds,
		               selectionItems.amenities,
					   selectionItems.bathrooms,selectionItems.price_range);
	 // }
	
  }
  const updateSelections=(ev)=>{
    
    let srcArr = [];
    let updObj = {};
    switch(selection){
        case "Rooms/Beds":
		let option = ev.target.id;	
		switch(option){
			case "bathrooms":
			updObj = {...selectionItems, bathrooms:ev.target.value};
            setSelectionItems(updObj);
			break;
			case "bedrooms":
			updObj = {...selectionItems, bedrooms:ev.target.value};
        	setSelectionItems(updObj);
			break;
			case "beds":
			updObj = {...selectionItems, beds:ev.target.value};
        	setSelectionItems(updObj);
		    break;
			default:
				break;
		}
		break;
		case "Cuisine":
         srcArr = selectionItems.cuisines;
         if(ev.target.checked){
            srcArr.push(ev.target.defaultValue);
        }else{
          srcArr = srcArr.filter(item=>item !== ev.target.defaultValue);
        }
        updObj = {...selectionItems, cuisines:srcArr};
        setSelectionItems(updObj);
      break;
      case "Rating":
        srcArr = selectionItems.ratings;
         if(ev.target.checked){
            srcArr.push(ev.target.defaultValue);
        }else{
          srcArr = srcArr.filter(item=>item !== ev.target.defaultValue);
        }
        updObj = {...selectionItems, ratings:srcArr};
        setSelectionItems(updObj);
      break;
      case "Hours":
        srcArr = selectionItems.openHrs;
         if(ev.target.checked){
            srcArr.push(ev.target.defaultValue);
        }else{
          srcArr = srcArr.filter(item=>item !== ev.target.defaultValue);
        }
        updObj = {...selectionItems, openHrs:srcArr};
        setSelectionItems(updObj);
      break;
      case "Amenities":
        srcArr = selectionItems.amenities;
         if(ev.target.checked){
            srcArr.push(ev.target.defaultValue);
        }else{
          srcArr = srcArr.filter(item=>item !== ev.target.defaultValue);
        }
        updObj = {...selectionItems, amenities:srcArr};
        setSelectionItems(updObj);
      break;
     case "Price Range":
        /*srcArr = selectionItems.price_range;
         if(ev.target.checked){
            srcArr.push(ev.target.defaultValue);
        }else{
          srcArr = srcArr.filter(item=>item !== ev.target.defaultValue);
        }*/
        updObj = {...selectionItems, price_range:ev.values[0]};
        setSelectionItems(updObj);
        break;
      default:
       break;
    }
    
    window.localStorage.setItem('selections',JSON.stringify(updObj));
    setRefresh(!refresh);
    
  }
  const populateChoiceContents=()=>{
    switch(selection){
     	case "Cuisine":
     	 return (<div className="cuisine_container"><ul>{cuisines.map(item=>(<li>
     	 		<input key={item} style={{height:'25px',width:'25px'}} type="checkbox" id={item} value={item}
     	 		checked={selectionItems.cuisines.includes(item)}
     	 		onChange={(e)=>updateSelections(e)}/>
     	 		{item}
     	 	</li>))}</ul></div>);
     	break;
     	case "Rating":
    		return (<div><ul>
	            <li>
		            <input key={5} style={{height:'25px',width:'25px'}} type="checkbox" id={5} name={5} value={"A"}
		            checked={selectionItems.ratings.includes("A")}
		            onChange={(e)=>updateSelections(e)}/>
		            5.0<RatingComponent stars={5}/>
	            </li>
	            <li>
		            <input key={4} style={{height:'25px',width:'25px'}} type="checkbox" id={4} name={4} value={"B"}
		            checked={selectionItems.ratings.includes("B")}
		            onChange={(e)=>updateSelections(e)}/>
		            4.0<RatingComponent stars={4}/>
	            </li>
	            <li>
		            <input key={3} style={{height:'25px',width:'25px'}} type="checkbox" id={3} name={3} value={"C"}
		            checked={selectionItems.ratings.includes("C")}
		            onChange={(e)=>updateSelections(e)}/>
		            3.0<RatingComponent stars={3}/>
	            </li>
	            <li>
					<input key={2} style={{height:'25px',width:'25px'}} type="checkbox" id={2} name={2} value={"P"}
					checked={selectionItems.ratings.includes("P")}
					onChange={(e)=>updateSelections(e)}/>
		            2<RatingComponent stars={2}/>
	            </li>
	            <li>
	                 <input key={"any"} style={{height:'25px',width:'25px'}} type="checkbox" id="any" name="any" value="Not Yet Graded"
	                 checked={selectionItems.ratings.includes("Not Yet Graded")}
	                 onChange={(e)=>updateSelections(e)}/>
		             Any Rating
	            </li>
    		</ul></div>);
    	break;
    	case "Hours":
    		return (<div><ul>
    			<li>
		            <input key={"anytime"} style={{height:'25px',width:'25px'}} type="checkbox" id="any time" name="any time" 
		            value="any time" 
		            checked={selectionItems.openHrs.includes("any time")}
		            onChange={(e)=>updateSelections(e)}/>
		            Any Time
	            </li>
	            <li>
		            <input key={"open_now"} style={{height:'25px',width:'25px'}} type="checkbox" id="open now" name="open now" 
		            value="open now" 
		            checked={selectionItems.openHrs.includes("open now")}
		            onChange={(e)=>updateSelections(e)}/>
		            Open Now
	            </li>
	            <li>
		            <input key={"24hrs"} style={{height:'25px',width:'25px'}} type="checkbox" id="24hrs" name="24hrs" value="24hrs"
		            checked={selectionItems.openHrs.includes("24hrs")}
		            onChange={(e)=>updateSelections(e)}/>
		            Open 24 hours
	            </li>
    		</ul></div>);
    	break;
      case "Rooms/Beds":
    		return (<div><ul>
    			<li style={{display:'flex'}}>
		            <input key={"Beds"} style={{height:'25px',width:'25px'}} type="checkbox"
		            value="beds"/>
		            Beds
					<div style={{display:'flex',marginLeft:'138px'}}>
					<HorizontalRuleIcon/>
					<input style={{height:'25px',width:'25px', border:'1px solid #ccc',textAlign:'center'}} type="text" id="beds"
		            onChange={(ev)=>updateSelections(ev)}/>
					<AddIcon/>
					</div>
				</li>
	            <li style={{display:'flex'}}>
		            <input key={"Bedrooms"} style={{height:'25px',width:'25px'}} type="checkbox"
		            value="Bedrooms"/>
		            Bedrooms
					<div style={{display:'flex',marginLeft:'100px'}}>
					<HorizontalRuleIcon/>
					<input style={{height:'25px',width:'25px', border:'1px solid #ccc',textAlign:'center'}} type="text" id="bedrooms"
		            onChange={(ev)=>updateSelections(ev)}/>
					<AddIcon/>
					</div>
	            </li>
	            <li style={{display:'flex'}}>
		            <input key={"Bathrooms"} style={{height:'25px',width:'25px'}} type="checkbox"
                	value="Bathrooms"/>
		            Bathrooms
					<div style={{display:'flex',marginLeft:'95px'}}>
					<HorizontalRuleIcon/>
					<input style={{height:'25px',width:'25px', border:'1px solid #ccc',textAlign:'center'}} type="text" id="bathrooms"
		            onChange={(ev)=>updateSelections(ev)}/>
					<AddIcon/>
					</div>
	            </li>
    		</ul></div>);
    	break;
      case "Amenities":
    		return (<div><ul>
    			<li>
		            <input key={"kitchen"} style={{height:'25px',width:'25px'}} type="checkbox" id="kitchen" name="kitchen" 
		            value="Kitchen" 
		            checked={selectionItems.amenities.includes("Kitchen")}
		            onChange={(e)=>updateSelections(e)}/>
		            Kitchen
	            </li>
	            <li>
		            <input key={"heating"} style={{height:'25px',width:'25px'}} type="checkbox" id="heating" name="heating" 
		            value="Heating" 
		            checked={selectionItems.amenities.includes("Heating")}
		            onChange={(e)=>updateSelections(e)}/>
		            Heating
	            </li>
	            <li>
		            <input key={"wifi"} style={{height:'25px',width:'25px'}} type="checkbox" id="wifi" name="wifi" 
					value="Wifi"
		            checked={selectionItems.amenities.includes("Wifi")}
		            onChange={(e)=>updateSelections(e)}/>
		            Wifi
	            </li>
              <li>
		            <input key={"washing_machine"} style={{height:'25px',width:'25px'}} type="checkbox" id="washing_machine" 
                	name="washing_machine" value="Washer"
		            checked={selectionItems.amenities.includes("Washer")}
		            onChange={(e)=>updateSelections(e)}/>
		            Washing Machine
	            </li>
    		</ul></div>);
    	break;
		case "Price Range":
			return (<div>
				<PriceSlider updateSelections={updateSelections}/>
			</div>);
		break;
     	default:
     	 return "Choose a selection";
     	break;
     }
 }
	return (
    <div className='filterPanel'>
     <button className={selection=='Cuisine'?"filterBtnSelected":"filterBtn"} onClick={(e)=>toggleButton(e)}>Cuisine</button>
	 <button className={selection=='Rating'?"filterBtnSelected":"filterBtn"} onClick={(e)=>toggleButton(e)}>Rating</button>
     <button className={selection=='Hours'?"filterBtnSelected":"filterBtn"} onClick={(e)=>toggleButton(e)}>Hours</button>
     <button className={selection=='Rooms/Beds'?"filterBtnSelected":"filterBtn"} onClick={(e)=>toggleButton(e)}>Rooms/Beds</button>
     <button className={selection=='Amenities'?"filterBtnSelected":"filterBtn"} onClick={(e)=>toggleButton(e)}>Amenities</button>
     <button className={selection=='Price Range'?"filterBtnSelected":"filterBtn"} onClick={(e)=>toggleButton(e)}>Price Range</button>
	 {populateChoiceContents()}
     <div className="footer">
     <button className="cuisineBtn" onClick={(e)=>clearSelections()}>Clear</button>
     <button className="cuisineBtn" onClick={()=>getChosenFilters()}>Done</button>
     </div>
     
   </div>);
}

export default FilterPanel;