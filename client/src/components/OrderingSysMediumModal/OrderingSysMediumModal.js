import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import API from '../../utils/API';
import "../TableExamples/tablestyle.css";
import Draggable, { DraggableCore } from 'react-draggable';
import moment from 'moment'


function OrderingSysMediumModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Appetizer = props.menu.filter(dish =>
        dish.category === "Appetizer"
    )
    const Entre = props.menu.filter(dish =>
        dish.category === "Entree"
    )
    const Dessert = props.menu.filter(dish =>
        dish.category === "Dessert"
    )
    let orderedDish = [];
    let orderedDishCount = [];
    let totalPrice = 0;

    function handleInputChange(event) {
        let value = parseInt(event.target.value);
        let name = event.target.name;
        let price = parseFloat(event.target.id);
        console.log("value, price: ", value, ", ", price);
        if (!isNaN(value)) {
            orderedDish.push(name);
            orderedDishCount.push(value);
            totalPrice += value * price;
        }
        // orderedDish.push(name)
        // orderedDishCount.push(value)
        // totalPrice += value * price;
        // console.log(totalPrice)
    }

    function deleteTable(event) {
        event.preventDefault();

        API.deleteTable(props.table._id)
            .then(res => {
                props.getSavedTable()
            })
            .catch(err => console.log(err))
        
        handleClose()
    }

    function handleSubmit(event) {
        event.preventDefault();

        const orderString = orderedDish.toString();
        const orderQuantityString = orderedDishCount.toString();

        const newOrderTohistory = {
            date: moment().format('L'),
            order: orderString,
            order_quantity: orderQuantityString,
            total_price: totalPrice
        }
        console.log("neworderhistory: ", newOrderTohistory)
        API.createTableHistory(newOrderTohistory)
            .then(res => {
                console.log(res)
            })
            console.log("prop and prop.changeTable", props, ", ",props.changeTableAvailability)
        const newTableInfo = {
            id: props.table._id,
            order: orderString,
            order_quantity: orderQuantityString,
            total_price: totalPrice
        }
        props.changeTableAvailability(newTableInfo, props.table.availability)

        handleClose()
        orderedDish = [];
        orderedDishCount = [];
        // alert("Thank you for your submission.")
    }
    
    return (
        <>
            <Draggable onStart={() => false} handle=".table" defaultPosition={{x: props.table.X, y: props.table.Y}} >
                    <Button className="table-medium table text-center" style={{ backgroundColor: props.table.color }} onClick={handleShow}>{props.table.table_name}</Button>
            </Draggable>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title style={{fontFamily: "monospace", fontSize: "30px"}}>Our Menu:</Modal.Title>
                    <Button className="deletebtn" onClick={deleteTable}>Delete table</Button>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <p style={{fontFamily: "monospace", fontSize: "20px"}}>Appetizer:</p>
                        <ul>
                            {Appetizer.length ? (
                                Appetizer.map(dish => {
                                    return (
                                        <li key={dish._id}>
                                            {dish.item}:
                                            <input
                                                name={dish.item}
                                                id={dish.price}
                                                className="input"
                                                type="text"
                                                placeholder="Num"
                                                onChange={handleInputChange}
                                            ></input>
                                        </li>
                                    )
                                })
                            ) : (
                                    <h2>-no appetizers on menu-</h2>
                                )}
                        </ul>
                        <p style={{fontFamily: "monospace", fontSize: "20px"}}>Entree:</p>
                        <ul>
                            {Entre.length ? (
                                Entre.map(dish => {
                                    return (
                                        <li key={dish._id}>
                                            {dish.item}:
                                            <input
                                                name={dish.item}
                                                id={dish.price}
                                                className="input"
                                                type="text"
                                                placeholder="Num"
                                                onChange={handleInputChange}
                                            ></input>
                                        </li>
                                    )
                                })
                            ) : (
                                    <h2>-no entrees on menu-</h2>
                                )}
                        </ul>
                        <p style={{fontFamily: "monospace", fontSize: "20px"}}>Dessert:</p>
                        <ul>
                            {Dessert.length ? (
                                Dessert.map(dish => {
                                    return (
                                        <li key={dish._id}>
                                            {dish.item}:
                                            <input
                                                name={dish.item}
                                                id={dish.price}
                                                className="input"
                                                type="text"
                                                placeholder="Num"
                                                onChange={handleInputChange}
                                            ></input>
                                        </li>
                                    )
                                })
                            ) : (
                                    <h2>-no desserts on menu-</h2>
                                )}
                        </ul>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" style={{margin: "0 auto"}} onClick={handleSubmit}>
                        Submit Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default OrderingSysMediumModal;