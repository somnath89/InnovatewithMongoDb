
import './App.css';

function Cards(props){

    return (
        <div className="carouselcard" onClick={()=>props.plotToMap(props.item)}>
        <p style={{margin:'0px',padding:'4px'}}><b>{props.item.name}</b>
        <br/>
        {"( "+props.item.borough+" )"}
        </p>
        <span className="halfCircle discount">{props.discount+ "%"}</span>
        <div /*style={{width:'220px'}}*/>
            <img style={{width:'250px',float:'right',height:'110px',position: 'relative',top: '-20px'}} 
            src={props.imgUrl}></img>
        </div>
        </div>
    )
}

export default Cards;