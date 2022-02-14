import { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './App.css';

import Cards from './Cards';

function SliderCarousel(props){
    
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
            process.env.PUBLIC_URL+'/images/img5.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg',
            process.env.PUBLIC_URL+'/images/img5.jpg'
        ]
        for(let i=0;i<props.trending.length;i++){
            var randomDiscount = Math.floor(Math.random() * (25 - 10 + 1) + 10)
            cards.push(<Cards item={props.trending[i]} discount={randomDiscount} imgUrl={imgs[i]}/>);
        }
        return cards;
    }

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    return (props.trending.length != 0?<div className='carouselPanel'>
            <AliceCarousel items={addCards()} animationType="slide" infinite={true}/>
            <div className="trending_ribbon">
              <img className="ribbonImg" src={process.env.PUBLIC_URL+"/images/ribbon.jpg"}/>  
              <div style={{position: 'relative',top:'-43px',color:'white'}}>Trending in Hotels/Restaurants Today</div>
             </div>            
         </div>:null);
}

export default SliderCarousel;