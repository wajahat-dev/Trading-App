import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from "react-router-dom";

const TopLosers = () => {
    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    
    //  financial modeling prep fetch---------------------------------------------------
  useEffect(() => {
    
   try{
    const fetchCompanyInfo = async () =>{
      const API_Key = process.env.REACT_APP_FMP_API_KEY;
      let API_CALL = `https://financialmodelingprep.com/api/v3/losers?limit=10&apikey=${API_Key}`;
    //   let stockChartXValuesFunction = [];
    //   let stockChartYValuesFunction = [];
    
      fetch(API_CALL)
      .then(
          function(response){
              return response.json()
          }
      )
      .then(
          function(data){
            setTimeout(function(){ setIsLoading(false); }, 250);

            setStories(data)
          }
      )
    }
    // fetchCompanyInfo();  
   }catch(e){
    console.log(e)
   }
    //setinterval would go here return the clear interval
    //return ()=> clearInterval
  }, []);
      const loading = () => {
        if (isLoading) {
        return (
        <>
        
        <main className="centered middled">
          <b>Fetching market data...</b>
          <CircularProgress />
          </main>
        </>
        )
      }
    }

      return (
        <div className='losersandwinners'>
        <h2 style={{color: 'red'}}>Top Losers</h2>
        {loading()}
        {stories && stories.length > 0 && stories.slice(0, 5).map(story => {
            return (
              <div className='moversContainer' key={story.ticker}>
                  <div className='newsTitle'>
                  {story.ticker}
                  <div>
                  {story.companyName}
                  </div>
                  <NavLink className='navlinks-red' to={`/stock/${story.ticker}`} >
                  {story.ticker}
                   </NavLink>
                  </div>
                  <div className='newsSummary'>
                  
                  {story.price} {story.changes}  <span style={{color: 'red'}} >{story.changesPercentage}</span>
                  </div>
                   
               </div>
            )
          })}
        </div>
      )
}

export default TopLosers;