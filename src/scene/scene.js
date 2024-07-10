import React, { useState, useEffect } from 'react';
import { motion  ,  animate, useMotionValue,useTransform, wrap} from "framer-motion";
import Button from '@mui/material/Button';
import ProfileCard from '../profile/profile.js';
import StarIcon from '@mui/icons-material/Star';
import Rating from "@mui/material/Rating";
import { ZoomIn } from '@mui/icons-material';
import gif from '../imgs/gif.gif';

import background1 from './background1.webp';
import background2 from './background2.jpg';
import background3 from './background3.jpg';
import background4 from './background4.jpg';
import background5 from './background5.jpg';
import background6 from './background6.jpg';


function Scene(props) {
  const [loading, setLoading] = React.useState(false);
  const [startCount, setstartCount] = React.useState(false);
  const [startRankPresentation, setstartRankPresentation] = React.useState(true);

  const [showCredencials2, setshowCredencials2] = React.useState(false);
  const [startCountSuper, setstartCountSuper] = React.useState(false);
  
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const [showLotOfCred, setshowLotOfCred] = useState(false);
  const [outOFSUper, setoutOFSUper] = useState(false);

  const handleZoomIn = () => {
    setoutOFSUper(true);
    setIsZoomedIn(true);
    
  };

  const handleReset = () => {
    setIsZoomedIn(false);
  };
  const mapStartRank = {
    'Mountaineer':0,
    'Adventure':0,
    'Explorer':0,
    'Hiker':0,
    'Scout':0,
    'Expeditioner':0,
    'Ranger':1,
    'Double Star Ranger':2,
    'Triple Star Ranger':3,
    'Four Star Ranger':4,
    'Five Star Ranger':5,
    'All Star Ranger':100,
  }
  
  const mapBackground = {
    '1':background1,
    '2':background2,
    '3':background3,
    '4':background4,
    '5':background5,
    '6':background6
  }
  useEffect(() => {
    
        setTimeout(()=>{
    
          const controls = animate(count, props.Data.rank.earnedBadgesCount,{duration:5})

          return () => controls.stop()
        },5000);
        console.log(props.Data.rank);
    
        setTimeout(()=>{
          setstartRankPresentation(false);
        },4000);
        
    });

   

    const count = useMotionValue(0)
    const rounded = useTransform(count, latest => Math.round(latest));

    function numberFormat(num){
      const formatter = new Intl.NumberFormat('en-US');
      return formatter.format(num); 
    }
    function handleStartCount(){

        setstartCount(true);
          setTimeout(()=>{
            setstartCount(false);
          },10000);    
      
    }


    function handleStartCredencials(){

      setTimeout(()=>{
        setshowCredencials2(true);
        setTimeout(()=>{
          setshowCredencials2(false);
        },7000)
      },6000);
    }

    function handleStartCountSuper(){
      
      setTimeout(()=>{
        setstartCountSuper(true);
      },3000);
     

      setTimeout(()=>{
        setstartCountSuper(false);
        if(props.Data.credenciais.length > 10 ){
          setshowLotOfCred(true);
        }
        
        setTimeout(() => {
          setshowLotOfCred(false);
        }, 6000);

        setIsZoomedIn(true);
      },13000);
    }
    console.log(props.Data);
  return (
    <motion.div className="scene"
          initial={{ y: 300 , opacity:  0 }}
          animate={ { y: 0, opacity: 1 }}
          transition={{
            duration:  3,
            ease: "easeOut",
          }}
          style={{  width: "1000px", height: "100%" ,backgroundImage:`url(${mapBackground[props.backgroundOption]})`}}
        >
    {/* Profile  */}
    <ProfileCard  Data={props.Data}></ProfileCard>


      {/* START COUNT BADGES  */}
      {startCount ? 
         <motion.div
         style={{textAlign:'center', width:'500px'}}
         initial={{ y: 50 , opacity:  0 }}
         animate={ { y: 0, opacity: 1 }}
         transition={{
           duration:  5,
           ease: "easeOut",
           repeat: Infinity,
           repeatType: "reverse"
         }}
        >
          <motion.h1>
            Badges earned
          </motion.h1>
          <motion.h1 style={{marginTop:'-1em'}}>
          {rounded}
          </motion.h1>  
        </motion.div>:''
      }
  
       {/* Rank image  */}
      <motion.div 
         initial={{ y: 120 , opacity:  0 }}
         animate={ { y: 20, opacity: 1  ,scale:1.2  , opacity: startRankPresentation? 1: 0 }}
         style={{position:"absolute", marginTop:'20px'}}
         transition={{
           duration: 4,
           ease: "easeOut"
         }}
         onAnimationComplete={handleStartCount}
        >
        <img src={props.Data.rank.rank.imageUrl} />
      </motion.div>

      {startCount ? 
        <motion.div  className='content-badges-into' 
        initial={{ x: '100vw'  }}
        animate={{ x: '-100vw'  }}  
        onAnimationComplete={handleStartCountSuper}
        transition={{ duration: 8, ease: 'easeInOut' }}
        style={{position:"absolute" ,zIndex:'100',width:'1000px', display:'flex', marginTop:'14em',width:'80%', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
        {props.Data.badges.slice(0, 250).map((image, index) => (
            <>
              <motion.img
                key={index}
                src={image.node.award.icon}
                alt={`image-${index}`}
                style={{width:'40px'}}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut'}}
              /> 
              {index ==250   ?<p>...</p>: ''}
            </>
          ))} <p style={{position:'absolute', marginTop:'30%'}}>...</p>
        </motion.div>
    : ''} 

    {startCountSuper ? 
            <motion.div
            style={{textAlign:'center', width:'700px'}}
            initial={{ y:outOFSUper  ? 0 : 50 , opacity:  0 }}
            animate={ { y:outOFSUper  ? 50 : 0 , opacity: outOFSUper ? 0 : 1 }}
            transition={{
              duration:  5,
              ease: "easeOut",
              repeatType: "reverse",
              repeat: Infinity
            }}
            onAnimationComplete={handleZoomIn}

            >
              <motion.h1>
                SuperBadges earned
              </motion.h1>
              <motion.h1 style={{marginTop:'-0.5em'}}>
              {props.Data.Superbadges.length}
              </motion.h1>  
            </motion.div>:''
          }

      {startCountSuper ? 
              <motion.div  className='content-badges-into' 
              initial={{ x: '100vw'   }}
              animate={{ x: '-100vw'}}
              
              transition={{ duration: 12, ease: 'easeInOut' }}
              style={{position:"absolute" , display:'flex', marginTop:'14em',width:'80%', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
              {props.Data.Superbadges.map((image, index) => (
                
                  <motion.img
                    key={index}
                    src={image.node.award != null? image.node.award.icon : ''}
                    alt={`image-${index}`}
                    style={{width:'60px'}}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut'}}
                  />
                ))}
              </motion.div>
          : ''}
          
      {showLotOfCred ?
          <div style={{width:'730px', marginTop:'8em'}}className='conteiner-certifications'>
          
            {props.Data.credenciais.sort((a, b) => {
            const titleA = a.status.order; // Ignorar maiúsculas e minúsculas
            const titleB = b.status.order; // Ignorar maiúsculas e minúsculas
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            // titles must be equal
            return 0;
          }).map((item,index)=>{
                return <motion.div
                alt={'image of rank trailhead'} 
                initial={{ filter: 'contrast(0%)' }}
                animate={{ filter:'contrast(100%)'}}
                transition={{ duration: 5 }}
                style={{backgroundSize:'120px',filter:'contrast(100%)', backgroundImage:`url(${item.logoUrl})`,backgroundPosition:'bottom',backgroundRepeat:'no-repeat', height:'69px', width: '69px', margin:'0px', padding:'0px'}}
                />
                })}

          </div> : ''}

      {isZoomedIn  && !showLotOfCred? 
        <motion.div 
        
          initial={{ scale: 0.2 }} // Escala inicial pequena
          animate={{ scale: 1}} // Escala normal quando isZoomedIn é true
          transition={{ duration: 5}}
          onAnimationComplete={props.stopRecording}
          className='conteiner-final-animation'>
            
              <Rating
                style={{fontSize:'50px' }}
                value={mapStartRank[props.Data.rank.rank.title]}
                readOnly
                precision={1}
                name="customized-10" defaultValue={mapStartRank[props.Data.rank.rank.title]} max={mapStartRank[props.Data.rank.rank.title] <100 ? mapStartRank[props.Data.rank.rank.title]  : 10}

                emptyIcon={
                <StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                />  
                <div className='final-animation' style={{backgroundImage:`url(${gif})`}}>   
                    <div className='item-animation-finaly'>
                        <h4 className='title-of-information'>Points</h4>
                        <Button  className='pulsing-button' style={{fontWeight:"bold", fontSize:"29px"}} variant="contained">{numberFormat(props.Data.rank.earnedPointsSum)}</Button>
                    </div>
                    <div className='item-animation-finaly'>
                        <h4 className='title-of-information'>Badges</h4>
                        <Button  className='pulsing-button' style={{fontWeight:"bold", fontSize:"29px"}} color="secondary" variant="contained">{numberFormat(props.Data.rank.earnedBadgesCount)}</Button>
                    </div>
                    <div className='item-animation-finaly'>
                        <h4 className='title-of-information'>Trails</h4>
                        <Button className='pulsing-button' style={{fontWeight:"bold", fontSize:"29px"}} color="success"variant="contained">{numberFormat(props.Data.rank.completedTrailCount)}</Button>
                    </div>
                </div>
        
        </motion.div>
      :''}
  </motion.div>
 
  );
}

export default Scene;
