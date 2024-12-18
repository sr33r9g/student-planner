import React from 'react';
import cal from '../image/cal.png';
import pdf from '../image/pdf.png';
import list from '../image/list.png';
import ResponsiveAppBar from '../AppBar/ResponsiveAppBar';
import { Link, Link as RouterLink } from 'react-router-dom';
const Home = () => {
  return <div style={{width:"100%", height:"100vh"}}>
      <div ><ResponsiveAppBar /></div>
      <div className='container hwc' style={{ flexWrap:'wrap' }}>
      <Link to='/home/cal' style={{color:'black'}} >
        <div className='box' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px' }}>
          <img src={cal} className='image-size' />
          <h1 style={{ alignSelf: 'center' }}>Calendar</h1>
        </div>
      </Link>
       <Link to='/pdf' style={{color:"black"}}>
        <div className='box' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px' }}>
          <img src={pdf} className='image-size' />
          <h1 style={{ alignSelf: 'center' }}>Notes</h1>
        </div>
       </Link>
      <Link to='/event' style={{color:'black'}}>
        <div className='box' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px' }}>
          <img src={list} className='image-size' />
          <h1 style={{ alignSelf: 'center' }}>Event</h1>
        </div>
      </Link>
       
      </div>     
  </div>
}

export default Home;
