import { useEffect } from 'react';
import CarouselSlider from 'react-carousel-slider';
import './App.css';

import Cards from './Cards';

function SlidingCarousel(props){
    
    let jsonData = {
        autoSliding: {
             items: [
                 {
                     "imgSrc": process.env.PUBLIC_URL+'/images/img1.jpg'
                 },
                 {
                     "imgSrc": process.env.PUBLIC_URL+'/images/img2.jpg'
                 },
                 {
                     "imgSrc": process.env.PUBLIC_URL+'/images/img3.png'
                 },
                 {
                     "imgSrc": process.env.PUBLIC_URL+'/images/img4.jpg'
                 },
                 {
                    "imgSrc": process.env.PUBLIC_URL+'/images/img5.jpg'
                 },
                 {
                    "imgSrc": process.env.PUBLIC_URL+'/images/img6.jpg'
                 }
             ]
         }
     };

     let cards = {
        autoSliding: {
             items: [<Cards/>,<Cards/>]
         }
     };

    let manner = {
        autoSliding: {interval: "3s"},
        duration: "2s"
    };
    
    let accEleSetting;

    let mobileRegx = /Mobi|Tablet|iPad|iPhone/;
    if (mobileRegx.test(navigator.userAgent)) {
        accEleSetting.button = false;
    }

    let buttonSetting = {
        placeOn: "middle-inside",
        hoverEvent: true,
        style: {
            left: {
                height: "50px",
                width: "50px",
                color: "#929393",
                background: "rgba(225, 228, 232, 0.8)",
                borderRadius: "50%"
            },
            right: {
                height: "50px",
                width: "50px",
                color: "#929393",
                background: "rgba(225, 228, 232, 0.8)",
                borderRadius: "50%"
            }
        }
    };
    useEffect(()=>{

    },[]);

    const addCards=()=>{
        let cards=[];
        let imgs=[
            process.env.PUBLIC_URL+'/images/img1.jpg',
            process.env.PUBLIC_URL+'/images/img2.jpg',
            process.env.PUBLIC_URL+'/images/img3.png',
            process.env.PUBLIC_URL+'/images/img4.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg'
        ]
        for(let i=0;i<props.trending.length;i++){
            var randomDiscount = Math.floor(Math.random() * (25 - 10 + 1) + 10)
            cards.push(<Cards item={props.trending[i]} discount={randomDiscount} imgUrl={imgs[i]}
                   plotToMap={props.plotToMap}/>);
        }
        return cards;
    }

    return (props.trending.length != 0?<div className='carouselPanel'>
            {/*<CarouselSlider slideItems = {addCards()}  
                manner = {manner} 
buttonSetting = {buttonSetting} />*/}
            {<div style={{display:'flex',width:'100%',overflowX:'scroll'}}>{addCards()}</div>}
            <div className="trending_ribbon">
              <img className="ribbonImg" src={process.env.PUBLIC_URL+"/images/ribbon.jpg"}/>  
              <div style={{position: 'relative',top:'-43px',color:'darkblue'}}>Today's Offers in Hotels/Restaurants</div>
             </div>
            
         </div>:null);
}

export default SlidingCarousel;