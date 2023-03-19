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
        //   const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/userprofile`, {
        //     method: "get",
        //     "accept": '*/*',
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
        //         ? localStorage.getItem('TOKEN_KEY')
        //         : ''
        //         }`,
        //     },
        //   });
        //   if (response.ok) {
        //     const data = await response.json();
        //     if (data.length > 0) {
        //       setGlobalState(p => ({
        //         ...p,
        //         formData: { referral_Code: data[0].referral_code, createdon: data[0].createdon, cnic: data[0].cnic, displayName: data[0].displayname, phone: data[0].phone, country: data[0].country, dob: data[0].dob }
        //       }))
    
        //     }
        //   }
    
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
