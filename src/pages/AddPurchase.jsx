import { faIndianRupeeSign, faLeaf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { use, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { addPurchase } from '../services/allAPIs'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Swal from 'sweetalert2';
function AddPurchase() {
  const navigate = useNavigate()
  const [purchaseDetails, setPurchase] = useState({

    productName: "",
    category: "",
    price: "",
    ecoRating: "",
    date: "",
    carbonSaved: 0,
    plasticSaved: 0,
    thumbnail: "",
    notes: ""
  })


  // function to handle the additn of purchases into json server
  const handleAddPurchase = async () => {
    const { productName, category, price } = purchaseDetails
    if (!productName || !category || !price) {
      alert("Kindly Fill the Form Completely!!!")
    }
    else {
      console.log("API CALL");
      try {
        const result = await addPurchase(purchaseDetails)
        console.log(result);
        if (result.status == 201) {
          Swal.fire({
                    icon: "success",
                    title: "Success!!...",
                    text: "Purchase added Successfully!!!!",
                  
                  });
          navigate('/purchase')
        }
        else {
        Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Purchase adding Failed!.."
                  
                  });
        }



      }
      catch (err) {
        console.log("API CALL FAILED!!");

      }


    }

  }



  // console.log(purchaseDetails);




  return (
    <div className='' style={{ minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundImage: 'url(https://images.unsplash.com/photo-1610653216265-74079d187414?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlaWdlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww)' }}>
      
      <div className=" p-5 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'beige' ,height:'90px'}}>
       <Link to={'/'}>
          <img className='rounded-5' width={'100px'} height={'60px'} src={logo} alt="ecobuy logo" />
  
       </Link>
        
        <Link to={'/purchase'} className='me-4 btn' style={{ backgroundColor: "#2C5E1A", color: "white" }}>+ VIEW PURCHASES</Link>

      </div>
      <div className="p-5">
          

        <h1 className='text-center'>Hey<FontAwesomeIcon icon={faLeaf} />!! Add Your Sustainable Purchase</h1>
        <div className='my-5 text-center d-flex justify-content-center'>
          <Card style={{ width: '20rem' }} >
            <Card.Body>
              <Card.Title>
                <h1 style={{ color: 'darkgreen' }}>Add New Purchase</h1>
              </Card.Title>

              <Form>
                <Form.Group >

                  {/* product name */}
                  <Form.Label className="mt-3">Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg: Bamboo Toothbrush"
                    onChange={(e) => setPurchase({ ...purchaseDetails, productName: e.target.value })}
                    value={purchaseDetails.productName}
                  />

                  {/* category */}
                  <Form.Label className='mt-3'>Category</Form.Label>
                  <Form.Select onChange={(e) => setPurchase({ ...purchaseDetails, category: e.target.value })} value={purchaseDetails.category} >
                    <option>Select category</option>
                    <option>Clothing</option>
                    <option>Home Essentials</option>
                    <option>Electronics</option>
                    <option>Groceries</option>
                    <option>Beauty</option>
                    <option >Lifestyle</option>
                    <option >Kitchen</option>
                    <option >Travel Essentials</option>

                  </Form.Select>

                  {/* price */}
                  <Form.Label className='mt-3'>Price<FontAwesomeIcon icon={faIndianRupeeSign} /></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="amount"
                    value={purchaseDetails.price}
                    onChange={(e) => setPurchase({ ...purchaseDetails, price: e.target.value })}

                  />
                  {/* eco rating */}
                  <Form.Label className='mt-3'>Eco Rating</Form.Label>
                  <div className="text-muted small">Rate from 1 to 5</div>
                  <Form.Select onChange={(e) => setPurchase({ ...purchaseDetails, ecoRating: e.target.value })} value={purchaseDetails.ecoRating}>

                    <option>Select EcoRating</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Select>


                  <Form.Label className='mt-3'>Purchase On</Form.Label>
                  <Form.Control type="date"
                    value={purchaseDetails.date}
                    onChange={(e) => setPurchase({ ...purchaseDetails, date: e.target.value })}
                  />

                  {/* Carbon Saved */}
                  <Form.Label className="mt-3">Carbon Saved</Form.Label>
                  <Form.Control
                    type="text"
                    name="carbonSaved"
                    placeholder="eg: 0.5 kg"
                    value={purchaseDetails.carbonSaved}
                    onChange={(e) => setPurchase({ ...purchaseDetails, carbonSaved: e.target.value })}

                  />

                  {/* Plastic Saved */}
                  <Form.Label className="mt-3">Plastic Saved</Form.Label>
                  <Form.Control
                    type="text"
                    name="plasticSaved"
                    placeholder="eg: 2 bottles"
                    value={purchaseDetails.plasticSaved}
                    onChange={(e) => setPurchase({ ...purchaseDetails, plasticSaved: e.target.value })}


                  />

                  {/* Thumbnail */}
                  <Form.Label className="mt-3">Thumbnail URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="thumbnail"
                    placeholder="Image link"
                    value={purchaseDetails.thumbnail}
                    onChange={(e) => setPurchase({ ...purchaseDetails, thumbnail: e.target.value })}

                  />

                  {/* Notes */}
                  <Form.Label className="mt-3">Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="notes"
                    placeholder="Any extra details?"
                    value={purchaseDetails.notes}
                    onChange={(e) => setPurchase({ ...purchaseDetails, notes: e.target.value })}



                  />


                </Form.Group>
              </Form>

              <div className='d-grid my-3 pt-3'>  <button onClick={() => handleAddPurchase()} className='btn btn-primary'>Save Purchase</button></div>
            </Card.Body>
          </Card>


        </div>
      </div>
    </div>
  )
}

export default AddPurchase