import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from "react-router-dom";

const TopMovers = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    try{
      const fetchCompanyInfo = async () => {
        const API_Key = process.env.REACT_APP_FMP_API_KEY;
        let API_CALL = `https://financialmodelingprep.com/api/v3/gainers?apikey=${API_Key}`;
        fetch(API_CALL)
          .then(
            function (response) {
              return response.json()
            }
          )
          .then(
            function (data) {
              setTimeout(function () { setIsLoading(false); }, 250);
              setStories(data)
            }
          )
      }
      fetchCompanyInfo();
    }catch(e){
      console.log(e)
    }
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
      <h2 style={{ color: 'green' }}>Top Gainers</h2>
      {loading()}
      {stories && stories.length > 0 && stories.slice(0, 5).map(story => {
        return (
          <div className='moversContainer' key={story.ticker}>
            <div className='newsTitle'>
              <div>
                {story.companyName}
              </div>
              <NavLink className='navlinks' to={`/stock/${story.ticker}`}>
                {story.ticker}
              </NavLink>
            </div>
            <div className='newsSummary'>

              {story.price} +{story.changes}  <span style={{ color: 'green' }} >{story.changesPercentage}</span>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default TopMovers;