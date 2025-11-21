import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header'
import logo from '../assets/logo.png'
import { viewPurchase } from "../services/allAPIs";
import { useState } from "react";







function Home() {


  // to fetch purchaseList details

  useEffect(() => { getPurchaseDetails() }, [])

  const [purchaseList, setPurchaseList] = useState([])
  console.log(purchaseList);


  const getPurchaseDetails = async () => {
    const result = await viewPurchase()
    try{
      if (result.status == 200) {
      console.log("successfully fetched purchase list in home PAGE");
      setPurchaseList(result.data)
    }
    }
    catch (err) {
      console.log(err);
    }



  }


  return (
    <>
      <Header />
      <div className="m-5 pt-5 text-center " style={{ minHeight: '100vh' }} >

        <div className="d-flex justify-content-center align-items-center flex-column" style={{ paddingTop: '200px' }}>
          <h1 className="fw-bolder fs-1"><img src={logo} width={'14%'} alt="" />EcoBuy</h1>
          <h3>
            Track your sustainable purchases. Reduce carbon impact.
            Make every choice count.
          </h3>
        </div>


        <div className="row pt-4">
          <div className="col-md-1"></div>
          <div className="col-md-5 shadow  rounded-4 me-4 p-3" style={{ backgroundColor: "beige" }} >
            <h1>
              {purchaseList.length}
            </h1>
            <p>Purchase Logged</p>

          </div>
          <div className="col-md-5  rounded-4 me-4 p-3" style={{ backgroundColor: "beige" }}>
            <h1><span>
              {
                  purchaseList.reduce((t, i) => t + Number(i.plasticSaved || 0), 0).toFixed(1)
              } </span>kg</h1>
            <p>Carbon Saved</p>
          </div>

          <div className="col-md-1 "></div>

        </div>


      </div>
    </>
  )
}

export default Home





