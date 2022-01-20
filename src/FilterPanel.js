import React,{useState,useEffect} from 'react';
import './App.css';
import cuisines from './cuisines';

let cuisineArr = [];
let ratingArr = [];
let openHrsArr = [];

function FilterPanel(props){

    const [cuisine,setCuisineSelected]=useState(false);
    const [rating,setRatingSelected]=useState(false);
    const [openHours,setopenHoursSelected]=useState(false);
    const [selection,setCurrentSelection]=useState("Cuisine");
    const [refresh,setRefresh]=useState(false);

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

  	 //setCurrentSelection("Cuisine");
  	 cuisineArr = [];
  	 openHrsArr = [];
  	 ratingArr = [];
  	 setRefresh(!refresh);
  }
  const getChosenFilters=()=>{
	console.log("done");
	props.showFilters(false);
  if(cuisineArr.length > 0 || ratingArr.length>0){
      props.search(cuisineArr,ratingArr);
  }
	
  }
  const updateSelections=(sourceArr,ev)=>{
    if(ev.target.checked){
    	sourceArr.push(ev.target.defaultValue);
    }else{
    	sourceArr = sourceArr.filter(item=>item !== ev.target.defaultValue);
    }
    setRefresh(!refresh);
  }
  const populateChoiceContents=()=>{
    switch(selection){
     	case "Cuisine":
     	 return (<div className="cuisine_container"><ul>{cuisines.map(item=>(<li>
     	 		<input key={item} style={{height:'25px',width:'25px'}} type="checkbox" id={item} value={item}
     	 		checked={cuisineArr.includes(item)}
     	 		onChange={(e)=>updateSelections(cuisineArr,e)}/>
     	 		{item}
     	 	</li>))}</ul></div>);
     	break;
     	case "Rating":
    		return (<div><ul>
	            <li>
		            <input key={5} style={{height:'25px',width:'25px'}} type="checkbox" id={5} name={5} value={"A"}
		            checked={ratingArr.includes("A")}
		            onChange={(e)=>updateSelections(ratingArr,e)}/>
		            5.0<RatingComponent stars={5}/>
	            </li>
	            <li>
		            <input key={4} style={{height:'25px',width:'25px'}} type="checkbox" id={4} name={4} value={"B"}
		            checked={ratingArr.includes("B")}
		            onChange={(e)=>updateSelections(ratingArr,e)}/>
		            4.0<RatingComponent stars={4}/>
	            </li>
	            <li>
		            <input key={3} style={{height:'25px',width:'25px'}} type="checkbox" id={3} name={3} value={"C"}
		            checked={ratingArr.includes("C")}
		            onChange={(e)=>updateSelections(ratingArr,e)}/>
		            3.0<RatingComponent stars={3}/>
	            </li>
	            <li>
					<input key={2} style={{height:'25px',width:'25px'}} type="checkbox" id={2} name={2} value={"P"}
					checked={ratingArr.includes("P")}
					onChange={(e)=>updateSelections(ratingArr,e)}/>
		            2<RatingComponent stars={2}/>
	            </li>
	            <li>
	                 <input key={"any"} style={{height:'25px',width:'25px'}} type="checkbox" id="any" name="any" value="Not Yet Graded"
	                 checked={ratingArr.includes("Not Yet Graded")}
	                 onChange={(e)=>updateSelections(ratingArr,e)}/>
		             Any Rating
	            </li>
    		</ul></div>);
    	break;
    	case "Hours":
    		return (<div><ul>
    			<li>
		            <input key={"anytime"} style={{height:'25px',width:'25px'}} type="checkbox" id="any time" name="any time" 
		            value="any time" 
		            checked={openHrsArr.includes("any time")}
		            onChange={(e)=>updateSelections(openHrsArr,e)}/>
		            Any Time
	            </li>
	            <li>
		            <input key={"open_now"} style={{height:'25px',width:'25px'}} type="checkbox" id="open now" name="open now" 
		            value="open now" 
		            checked={openHrsArr.includes("open now")}
		            onChange={(e)=>updateSelections(openHrsArr,e)}/>
		            Open Now
	            </li>
	            <li>
		            <input key={"24hrs"} style={{height:'25px',width:'25px'}} type="checkbox" id="24hrs" name="24hrs" value="24hrs"
		            checked={openHrsArr.includes("24hrs")}
		            onChange={(e)=>updateSelections(openHrsArr,e)}/>
		            Open 24 hours
	            </li>
    		</ul></div>);
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
     {populateChoiceContents()}
     <div className="footer">
     <button className="cuisineBtn" onClick={(e)=>clearSelections()}>Clear</button>
     <button className="cuisineBtn" onClick={()=>getChosenFilters()}>Done</button>
     </div>
     
   </div>);
}

export default FilterPanel;