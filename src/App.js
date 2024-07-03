import './App.css';
import React, { useRef, useEffect,useState } from 'react';
import { motion } from "framer-motion";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Scene from './scene/scene.js';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import passo1 from './imgs/1.png';
import passo2 from './imgs/2.png';
import passo3 from './imgs/3.png';

function App() {
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [error, setError] = React.useState(false);
  const [userData,setData] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [startAnimation,setStartAnimation] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        cursor:"none",
        
      });
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp8'
      });

      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      mediaRecorderRef.current = recorder;
      
    mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunksRef.current.push(event.data);
            }
          };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `TrailHead video maker.webm`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        chunksRef.current = [];
      };  
      

      const [videoTrack] = stream.getVideoTracks();
      videoTrack.onended = () => {
        recorder.stop();
        setRecording(false);
      };

      recorder.start();
      setRecording(true);
      setStartAnimation(true);
    } catch (err) {
      console.error('Error accessing display media.', err);
    }
  };

  function handleClick(ev) {
    setLoading(true);
    ev.preventDefault();

    if(url != null && url.length> 0 && isValidTrailblazerURL(url)){
      fetchData();
    }else{
      console.log(url);
      setError('Error, Fill in the url field correctly');
      setLoading(false);
      setTimeout(()=>{
        setError(false);
      },3000);  
    }

  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };


  function handlesetValueOfUrl(ev){
      setUrl(ev.target.value);
  }
  const handleClickFade = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  function isValidTrailblazerURL(url) {
    const regex = /^https:\/\/www\.salesforce\.com\/trailblazer\/[a-zA-Z0-9-]+$/;
    return regex.test(url);
  }

  function setAnimation(){
    setTimeout(()=>{
      if(!recording){
        startRecording();
      }
    },3000)
  }

  const fetchData = async () => {
      try {
        if(url){
          const response = await axios.get('https://4ul.ink/data?username='+url);
          setData(response.data);
          setAnimation();
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError('Error, please check data input');
        setTimeout(()=>{
          setError(false);
        },3000); 
      }
    };
    const stopRecording = () => {
      setTimeout(()=>{
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stop();
          setRecording(false);
        }
        window.location.reload();
      },3000);
     
    };
  
  return (
    <div className="App"   >

      { error ? <Alert className='alert' severity="error">{error}</Alert> :""}
    
      {! startAnimation ? 
       
      <motion.div style={{height:"100%" ,display:'flex',flexDirection:'column',alignItems:'center'}}  animate={userData ? { opacity: 0, scale: 0.2 } : {}}
                transition={{
                  duration: userData ? 2 : 0,
                  delay: 0.1,
                  ease: [0.5, 0.71, 1, 1.5],
                }}
                initial={{ opacity: 1, scale: 1 }}>
        <Button onClick={handleOpenModal}>need help?
        </Button>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{  ...style, width: 800 }}>
            <h2 id="parent-modal-title">How to generate your trailhead video</h2>
            <p id="parent-modal-description">
              1- copy your profile url in you trailhead
              </p>
              <img src={passo1} style={{width:'400px'}} alt='picture of profile url in salesforce trailhead' />
              <p id="parent-modal-description">
                2- past in input link url
              </p>
              <p id="parent-modal-description">
              3- maximize you tab for best experience (F11 in chrome) 
              </p>
              <p id="parent-modal-description">
              4- Click in submit 
              </p>
              <img src={passo2} style={{width:'300px'}} alt='picture of profile url in salesforce trailhead' />
              <p id="parent-modal-description">
              5- Choose tab "Window" and select TrailHead history maker and click in Share
              </p>
              <img  style={{width:'400px'}} src={passo3} alt='picture of profile url in salesforce trailhead' />
            
          </Box>
        </Modal>
        <Box className='content-start'>
            <motion.h1
            style={{}} 
              animate={{ x: [50, 150, 0], opacity: 1, scale: 1 }}
              transition={{
                duration: 2,
                delay: 0.1,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.2 }}
            >
              Let's start?
              <p style={{color:'white', backgroundColor:'rgb(3, 45, 96)', borderRadius:'10px'}} className='legend-of-title'>Get a video of your story in the trailhead</p>
            </motion.h1>

            <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1 }}
            transition={{ duration:5 }}> 

            <form className='content-actions' onSubmit={handleClick}>
              <label className='label-link'>Link Url:</label>
              <input id='user-url' name='user-url' onChange={handlesetValueOfUrl}  className='input-profile-url' type='text' placeholder='https://www.salesforce.com/trailblazer/xxx' />
              {/*
              <FormControl style={{margin:"1em"}}component="fieldset">
                <FormLabel component="legend">Background</FormLabel>
                <RadioGroup style={{display:"flex", flexDirection:'row'}}   aria-label="gender" name="gender1" >
                  <FormControlLabel style={{backgroundPosition:'center',width:'100px',height:'100px',backgroundSize:'70%',backgroundRepeat:'no-repeat',backgroundImage:`url(${background1})`}} value="female" control={<Radio />} label="Female" />
                  <FormControlLabel style={{backgroundPosition:'center',width:'100px',height:'100px',backgroundSize:'70%',backgroundRepeat:'no-repeat',backgroundImage:`url(${background2})`}}  value="male" control={<Radio />} label="Male" />
                  <FormControlLabel style={{backgroundPosition:'center',width:'100px',height:'100px',backgroundSize:'70%',backgroundRepeat:'no-repeat',backgroundImage:`url(${background3})`}}  value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>*/}
              <LoadingButton
                endIcon={<RocketLaunchIcon />}
                loading={loading}
                style={{marginTop:'30px', width:'200px'}} 
                loadingPosition="end"
                variant="contained"
                type='submit'
              >
                <span>Submit</span>
              </LoadingButton>
            </form>
            </motion.div>
        </Box>
        <Grid container justifyContent="center">
        <Grid item>
            <Popper
            sx={{ zIndex: 1200 }}
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>1- We do not store any data from you or the trailhead</Typography>
                  <Typography sx={{ p: 2 }}>2- We do not store the generated video in our applications</Typography>
                  <Typography sx={{ p: 2 }}>3- Our website does not have recording access on mobile devices</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Button onClick={handleClickFade('top')}>Privacity</Button>
        </Grid>
      </Grid>
      </motion.div> : 
      <div className='content-app-main'>
        <div className='div-left-white'></div>
        <Scene stopRecording={stopRecording} Data={userData}></Scene>
        <div className='div-right-white'></div>
      </div>
      }
     
    </div>  
  );
}

export default App;
