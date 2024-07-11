import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import { motion } from "framer-motion";

import StarIcon from '@mui/icons-material/Star';
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

function ProfileCard(props) {
  const [isRevealed, setIsRevealed] = useState(false);

  const [contCertificationShow, setContCertificationShow] = useState(0);
  const [alreadyShowCert, setAlreadyShowCert] = useState([0]);
  const [showCredencials, setshowCredencials] = React.useState(false);


  const mapStartRank = {
    'Ranger':1,
    'Double Star Ranger':2,
    'Triple Star Ranger':3,
    'Four Star Ranger':4,
    'Five Star Ranger':5,
    'All Star Ranger':100,
  }

  setTimeout(()=>{
    setshowCredencials(true);
  },14000);
  
  useEffect(() => {
    let contador =0;
    setInterval(() => {
      contador = contador+1;
     
    },1000)

    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 7000); 
    
    let contCertByTimer= 0;
    if(props.Data.credenciais.length >0){
      let intervalTIme =4000;

      const certTimer = setInterval(() => {
        contCertByTimer = contCertByTimer+1
        if(contCertificationShow < props.Data.credenciais.length){
          setContCertificationShow(contCertByTimer);
        }else{
          clearInterval(certTimer);
        }
        intervalTIme =intervalTIme -500;
        alreadyShowCert.push(contCertByTimer);
        setAlreadyShowCert(alreadyShowCert);
      }, intervalTIme); 

    }

      return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
    initial={{ y: -900, opacity: 0 }}
    animate={{ y: -200, opacity: 1 }}  
    transition={{
      duration: 3,
      ease: "easeOut",
    }}
   
    style={{ position:"absolute",display:"flex",justifyContent:"center", marginTop:'-20px' , marginBottom:props.Data.credenciais.length >5 ? '2em':'0em'}}
  >
    <Card     sx={{ width: 620  }}>
     <CardContent className='content-profile'>
        <motion.div transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 }
        }}>
        
        <Avatar   sx={{ width: 180, height: 180}}
          alt={props.Data.user.firstName + ' ' +props.Data.user.lastName}
          src={props.Data.user.photoUrl}
          className='' />

       
        </motion.div>
        <div className='detail-profile-user'>

          <div style={{ position: 'relative', display: 'inline-block', width: '75px'}}>
              <motion.img
                alt={'image of rank trailhead'} 
                src={props.Data.rank.rank.imageUrl} 
                initial={{ filter: 'contrast(0%)' }}
                animate={{ filter: isRevealed ? 'contrast(100%)' : 'contrast(0%)' }}
                transition={{ duration: 2 }}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
          </div>
          <Typography variant="h5" component="h2">
            {props.Data.user.firstName + ' ' +props.Data.user.lastName}
            </Typography>
            <Typography style={{marginBottom:"10px"}}  color="textSecondary">
            {props.Data.user.role} {props.Data.user.title ? ' - '+props.Data.user.title :''}
            </Typography>
            {props.Data.credenciais.length <=10 ?
            <div className='conteiner-certifications'>
            
                {props.Data.credenciais.map((item,index)=>{
                  return <motion.div
                  alt={'image of certification'} 
                  initial={{ filter: 'contrast(0%)' }}
                  animate={{ filter:showCredencials ?  (props.lastImgCert !=item.logoUrl  || props.continueShowingCertnew  ? 'contrast(100%)' : `contrast(${!props.showLastedCertAnim ? '100%':'0%'})`) : 'contrast(0%)'}}
                  transition={{ duration: 5 }}
                  style={{backgroundSize:'130px', filter:'contrast(100%)', backgroundImage:`url(${item.logoUrl})`,backgroundPosition:'bottom',backgroundRepeat:'no-repeat', height:'75px', width: '75px', margin:'0px', padding:'0px'}}
                  />
                  })}

            </div>
             : ''}
            {/*
            <div>
              <Chip color="primary"  label={props.Data.user.company.name}  />    
              <Chip color="primary"  label={props.Data.user.address.country}/>   
              <Chip  color="primary" icon={<WorkspacePremiumIcon  sx={{ width: 20, height: 20}} fontSize="inherit" />} label={props.Data.credenciais.length} />
            </div>
            */}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}


export default (ProfileCard);
