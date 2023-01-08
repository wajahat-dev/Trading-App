import React from 'react';
import { Redirect } from 'react-router-dom';
import './homepage.css';
import CFooter from '../globalcomponents/CFooter';
import CNavbar from '../globalcomponents/CNavbar';
import { Typography } from '@material-ui/core';

const HomePage = ({ authenticated, setAuthenticated }) => {
    if (authenticated) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <CNavbar page={'homepage'} />
            <ContactContainer />
            <CFooter />
        </>
    );
}



const Card = (props) => {
    return (
        <div className={props.className} >
            <div className="small-div">
                <i className={props.className}></i>
  
            </div>
            <div className="big-div">
                <span className='div-title'>
                    {props.title}
                </span>
                <br />
                <span>
                    {props.description}
                </span>
                <img className='homepage-img' src={props.img} alt='' />
            </div>
        </div>
    )
  }
  
  
  
  const ContactContainer = () => {
    return (
        <>
            <div className='contact-container bg-grey'>
                <span className="div-title">Contact</span>
                <div className='contact-form'>
                    <div id='sect1'>
                        <>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {'Copyright © '}
                                <a color="inherit" href="">
                                    Trading
                                </a>{' '}
                                {new Date().getFullYear()}
                                {'.'}
  
                            </Typography>
  
                            <div className='miniInfo1'>
                                <div>
                                    <a href="" target="_blank" rel="noopener noreferrer">
  
                                        {/* <img className='icons' height='25px' width='25px' src={github} alt='github' /> */}
                                    </a>
                                </div>
                                <div>
                                    <a href="" target="_blank" rel="noopener noreferrer">
  
                                        {/* <img className='icons' height='25px' width='25px' src={linkedin} alt='linkedin' /> */}
                                    </a>
                                </div>
                            </div>
                            <Typography variant="body2" color="textSecondary" align="center">
                                Email: Trading
                            </Typography>
                        </>
                    </div>
  
                    <div id='sect2'>
                        <span>
                            Contact
                        </span>
  
                        <input type="text" placeholder="email address" className="input-field" />
                        <textarea name="" id="" cols="30" rows="10" placeholder="comment"></textarea>
                        <button className="contact-btn">Send</button>
                    </div>
                </div>
            </div>
        </>
    );
  }



export default HomePage;