import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import API from '../../utils/API'
import { List, ListItem } from '../List/index'

function ViewMenuModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Appetizer = props.menu.filter(dish => 
        dish.category === "Appetizer"
    )
    console.log("Appetizer: ",Appetizer)
    const Entre = props.menu.filter(dish => 
        dish.category === "Entre"
    )
    const Dessert = props.menu.filter(dish => 
        dish.category === "Dessert"
    )
    return (
        <>
            <Button variant="primary" className="mt-4" onClick={handleShow}>
                View Menu
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Our Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Appetizer:</p>
                    <ul>
                        {Appetizer.length ? (
                            Appetizer.map(dish => {
                                return(
                                <li key={dish._id}> {dish.item}, {dish.price} USD, {dish.cook_time} mins</li>
                                )
                            })
                        ) : (
                                <h2>no Appetizer on the Menu</h2>
                            )}
                    </ul>
                    <p>Entre:</p>
                    <ul>
                        {Entre.length ? (
                            Entre.map(dish => {
                                return(
                                <li key={dish._id}> {dish.item}, {dish.price}, {dish.cookTime}</li>
                                )
                            })
                        ) : (
                                <h2>no Entre on the Menu</h2>
                            )}
                    </ul>
                    <p>Dessert:</p>
                    <ul>
                        {Dessert.length ? (
                            Dessert.map(dish => {
                                return(
                                <li key={dish._id}> {dish.item}, {dish.price}, {dish.cookTime}</li>
                                )
                            })
                        ) : (
                                <h2>no Dissert on the Menu</h2>
                            )}
                    </ul>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Closed
                    </Button>
                    {/* <Button variant="primary" onClick={handleSubmit}>
                        Add Employee
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ViewMenuModal;