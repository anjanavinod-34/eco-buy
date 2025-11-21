import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faXmark } from '@fortawesome/free-solid-svg-icons'
import { editPurchase, fetchPurchase } from '../services/allAPIs';



function Edit() {



    const { id } = useParams()
    console.log(id);
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
    });


    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        navigate('/purchase')
    }
    const handleShow = () => setShow(true);


    useEffect(() => { handleShow() }, [])
    useEffect(() => { handleFetchPurchase() }, [])

    // to intially fetch the data from server for a specific purchase based on id

    const handleFetchPurchase = async () => {
        const result = await fetchPurchase(id)
        console.log(result);

        if (result.status == 200) {
            setPurchase(result.data)
            setLoading(false);
            setShow(true);
        }
        else {
            alert("API CALL FAILED!!")
        }


    }


    // to edit each purchases in purchase List

    const handleEditPurchase = async () => {
        try {
            const result = await editPurchase(id, purchaseDetails)
            console.log(result);
            alert("Purchase successfully updated!!!!!")

        }
        catch (err) {
            console.log(err);


        }
    }




    return (
        <>

            <div className='my-5'>

                <Modal show={show} onHide={handleClose}>

                    <div className='d-flex justify-content-end p-1'>
                        <button className='border rounded-5 p-2 bg-primary' onClick={handleClose}>
                            <FontAwesomeIcon className='fs-4' icon={faXmark} />
                        </button>
                    </div>



                    <Modal.Body><div className='my-5 text-center d-flex justify-content-center'>
                        <Card style={{ width: '20rem' }} >
                            <Card.Body>
                                <Card.Title>
                                    <h1 style={{ color: 'darkgreen' }}> Edit Purchase Details</h1>
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
                                            <option >Beauty</option>
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

                                <div className='d-grid my-3 pt-3'>  <button onClick={handleEditPurchase} className='btn btn-primary'>Update Purchase</button></div>
                            </Card.Body>
                        </Card>


                    </div></Modal.Body>

                </Modal>

            </div>

        </>
    )
}

export default Edit