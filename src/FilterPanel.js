import React,{useState,useEffect} from 'react';
import './App.css';
import cuisines from './cuisines';


function FilterPanel(props){

    const [cuisine,setCuisineSelected]=useState(false);
    const [rating,setRatingSelected]=useState(false);
    const [openHours,setopenHoursSelected]=useState(false);
    const [selection,setCurrentSelection]=useState("Cuisine");
    const [refresh,setRefresh]=useState(false);

    let previousSelections = window.localStorage.getItem('selections');
    
    const [selectionItems,setSelectionItems] = useState(previousSelections != null?JSON.parse(previousSelections):
      {cuisines:[],ratings:[],openHrs:[]});

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

  	 let updObj = {...selectionItems,cuisines:[],ratings:[],openHrs:[]};
     window.localStorage.setItem('selections',JSON.stringify(updObj));
     setSelectionItems(updObj);
  	 setRefresh(!refresh);
  }

  const getChosenFilters=()=>{
	console.log("done");
	 props.showFilters(false);
    if(selectionItems.cuisines.length > 0 || selectionItems.ratings.length>0){
      props.search(selectionItems.cuisines,selectionItems.ratings);
    }
	
  }
  const updateSelections=(ev)=>{
    
    let srcArr = [];
    let updObj = {};
    switch(selection){
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