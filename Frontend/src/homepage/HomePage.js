import React from 'react';
import { Redirect } from 'react-router-dom';
import CFooter from '../globalcomponents/CFooter';
import CNavbar from '../globalcomponents/CNavbar';
import { ContactForm } from './contactus/ContactForm';
import './homepage.css';

const HomePage = ({ authenticated, setAuthenticated }) => {
    if (authenticated) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <CNavbar page={'homepage'} />
            <ContactForm />
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
  

export default HomePage;