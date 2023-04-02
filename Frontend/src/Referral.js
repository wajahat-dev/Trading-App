import React, { useEffect } from 'react';
import CLoader from './globalcomponents/CLoader';
import { useLocation } from "react-router-dom";

const Referral = (props) => {
    const [loader, setLoader] = React.useState(false)
  
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    const doRefferal = async () => {
        debugger
        setLoader(true)
        try {
 
        } catch (error) {
          console.log(error)
        } finally {
          setLoader(false)
        }
      };


    useEffect(()=>{
        doRefferal()
    },[])

    return (

        <>
      <CLoader enabled={loader} />
        Ues

        <h1>


            asdfasdfasdfasdf
        </h1>

        <h1>


asdfasdfasdfasdf
</h1>

<h1>


asdfasdfasdfasdf
</h1>
        </>
    );
}




export default Referral;
