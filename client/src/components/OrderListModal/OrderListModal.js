import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import API from '../../utils/API'
import Draggable, { DraggableCore } from 'react-draggable';



function OrderListModal(props) {
    // console.log(props.table)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const orderedItem = props.table.order.split(",")
    // console.log("orderedItem: ", orderedItem)
    const orderedQuantity = props.table.order_quantity.split(",")
    const order = [];

    for (var i = 0; i < orderedItem.length; i++) {
        order[i] = {
            item: orderedItem[i],
            quantity: orderedQuantity[i],
            id: i
        }
    }
    // console.log("order of the table: ", order)

    function changeStatus(event) {
        event.preventDefault();
        const newTableInfo = {
            id: props.table._id,
            // color: props.table.color,
            status: props.table.status
        }
        props.changeTableStatus(newTableInfo, props.table.status)

        handleClose()
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newTableInfo = {
            id: props.table._id
        }
        props.changeTableAvailability(newTableInfo, props.table.availability)
        handleClose()
        // alert("Be ready for next customer!.")
    }
    return (
        <>
            <Draggable onStart={() => false} handle=".table" defaultPosition={{ x: props.table.X, y: props.table.Y }} >
                <Button className="table-small table text-center" style={{ backgroundColor: props.table.color }} onClick={handleShow}>{props.table.table_name}</Button>
            </Draggable>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontFamily: "monospace", fontSize: "24px"}}>Order List </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {
                            order.map(order => {
                                return (
                                    <li key={order.id}><span style={{textDecoration: "underline"}}>{order.item}</span>: - {order.quantity} order(s) -</li>
                                )
                            })
                        }
                    </ul>
                    <h3 className="mb-3"><span style={{textDecoration: "underline"}}>Total Price:</span> $<span style={{fontWeight: "bolder"}}>{props.table.total_price}</span></h3>

                </Modal.Body>
                <div className="container">
                    <div className="row mb-3">
                        {props.table.status === "Occupied" ? (

                            <div className="col-sm-3">
                                <button className="col text-dark text-left" variant="secondary" style={{backgroundColor: props.table.color}} onClick={changeStatus}>
                                    Appetizer
                                </button>
                            </div>
                        ):(
                            <div className="col-sm-3">
                                <button className="col text-center" variant="secondary">
                                    Appetizer
                                </button>
                            </div>
                        )}
                        
                        {props.table.status === "Appetizer" ? (
                            <div className="col-sm-3">
                                <button className="col text-dark text-center" variant="secondary" style={{ backgroundColor: props.table.color }} onClick={changeStatus}>
                                    Entree
                                </button>
                            </div>
                        ):(
                            <div className="col-sm-3">                       
                                <button className="col text-center" variant="secondary">
                                    Entree
                                </button>
                            </div>
                        )}
                        
                        {props.table.status === "Entree" ? (
                            <div className="col-sm-3">
                                <button className="col text-dark text-center" variant="secondary" style={{ backgroundColor: props.table.color }} onClick={changeStatus}>
                                    Dessert
                                </button>
                            </div>
                        ):(
                            <div className="col-sm-3">
                                <button className="col" variant="secondary">
                                    Dessert
                                </button>
                            </div>
                        )}

                        {props.table.status === "Dessert" ? (
                            <div className="col-sm-3">
                                <button className="col text-dark text-center" variant="secondary" style={{ backgroundColor: props.table.color }} onClick={handleSubmit}>
                                    Clear
                                </button>
                            </div>
                        ):(
                            <div className="col-sm-3">
                                <button className="col" variant="secondary">
                                    Clear
                                </button>
                            </div>
                        )}

                    </div>
                </div>




            </Modal>
        </>
    );
}

export default OrderListModal;