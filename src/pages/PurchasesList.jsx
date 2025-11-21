import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faStar } from '@fortawesome/free-regular-svg-icons';
import { viewPurchase, deletePurchase } from '../services/allAPIs';
import { faIndianRupeeSign, faPen } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo.png'




function PurchasesList() {


  useEffect(() => { getPurchaseList() }, [])
  const [purchaseList, setPurchaseList] = useState([])


  // to navigate to edit page
  const navigate = useNavigate()

  // get entire purchase list
  const getPurchaseList = async () => {
    try {
      const result = await viewPurchase()
      console.log(result);
      if (result.status == 200) {
        console.log("Successfully Rendered the purchase List!!")
        setPurchaseList(result.data)
      }
      else {
        alert("failed api call!!")
      }

    }
    catch (err) {
      console.log(err);

    }


  }

  // to delete purchases from purchaseList

  const handleDeletePurchase = async (id) => {
    try {
      const result = await deletePurchase(id)
      getPurchaseList()

    }

    catch (err) {
      console.log(err);

    }

  }

  // to view details



  return (
    <>

      <div className=" p-5 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'beige' ,height:'90px'}}>
       <Link to={'/'}>
          <img className='rounded-5' width={'100px'} height={'60px'} src={logo} alt="ecobuy logo" />
  
       </Link>
        <h1>  EcoBuy Purchase List</h1>
        <div>
          <Link to={'/add'} className='me-4 btn' style={{ backgroundColor: "#2C5E1A", color: "white" }}>+ ADD PURCHASE</Link>
          <Link to={'/impact'} className='me-4 btn' style={{ backgroundColor: "#2C5E1A", color: "white" }}>SHOW IMPACT</Link>
        </div>


      </div>
      <div className="row p-3 ">

        {/* duplicated div */}


        {
          purchaseList?.length > 0 ?

            purchaseList?.map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className='p-4'>
                  <Card style={{ width: '20rem' }} key={index}>
                    <Card.Img variant="top" style={{ height: '300px' }} className='img-fluid' src={product?.thumbnail} />
                    <Card.Body>
                      <div className=' d-flex justify-content-between align-items-center'>

                        <Card.Title>{product?.productName}</Card.Title>
                        <Badge pill className='bg-success d-flex align-items-center gap-1 px-2'>
                          <span className='text-dark'>{product?.ecoRating}</span>
                          <FontAwesomeIcon icon={faStar} />
                        </Badge>

                      </div>
                      <Card.Text as="div">


                        <div className='mt-3 shadow rounded p-3 d-flex justify-content-between align-items-center'
                          style={{ backgroundColor: "beige" }}>
                          <span>Price: <FontAwesomeIcon icon={faIndianRupeeSign} />{product?.price}</span>

                        </div>

                        <div className='d-flex my-3 justify-content-evenly text-center'>
                          <div className='border rounded-4 p-3'>Carbon: <span>{product?.carbonSaved} Kg</span> </div>
                          <div className='border rounded-4 p-3'>Plastic: <span>{Math.ceil(product?.plasticSaved)} bottles</span></div>

                        </div>
                        {
                          product?.notes ?
                            <div className='m-3 border rounded-3 p-2' >
                              <span className='text-black fs-5 '>Notes<FontAwesomeIcon icon={faPenToSquare} className='ms-2 text-warning' /> </span>
                              <hr /><div className='fs-5 text-warning'>{product?.notes}</div></div> :

                            <p>No Notes are added Yet!!</p>
                        }

                      </Card.Text>

                      <div className='d-flex justify-content-between align-items-center gap-2'>
                        <button onClick={() => navigate(`/purchase/${product?.id}/edit`)} className='btn btn-success '>EDIT</button>
                        <button onClick={() => handleDeletePurchase(product?.id)} className='btn btn-danger'>DELETE</button>

                      </div>
                    </Card.Body>
                  </Card>
                </div></div>
            ))

            :
            <h1 className='text-center fw-bolder'>PURCHASE LIST IS EMPTY</h1>



        }


      </div>

    </>

  )
}

export default PurchasesList