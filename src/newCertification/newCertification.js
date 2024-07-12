import React, { useState } from 'react';
import { motion } from 'framer-motion';
import gif from './gif.gif';
const CertificationAnnouncement =  props => {
  const [showImage, setShowImage] = useState(true);

  return (
    <div style={{ textAlign: 'center', marginTop: '7em' }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 50 }}
        transition={{ duration: 7,repeat: Infinity,ease: "easeOut",
            }}
        onAnimationComplete={() => setShowImage(true)}
      >
        <h3 style={{fontSize:'37px', marginBottom:'-2em'}}>And... This is my new certification</h3>
      </motion.div>
      {showImage && (
        <motion.div className='newCert'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{backgroundImage:`url(${gif})`}}
          transition={{ duration: 5, delay: 0.5,ease: "easeOut"}}
        >
          <img
            src={props.url}
            alt="New Certification"
            style={{ width: '300px', height: 'auto', marginTop: '20px' }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CertificationAnnouncement;
