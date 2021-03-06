import React, { Component } from "react";
import './frontdeskstyle.css';
import { Link } from "react-router-dom";
import API from "../utils/API";
// import Small from "../components/TableExamples/Small";
// import Medium from "../components/TableExamples/Medium";
// import Large from "../components/TableExamples/Large";
// import XL from "../components/TableExamples/XL";
import ViewMenuModal from "../components/ViewMenuModal/ViewMenuModal"
import Draggable, { DraggableCore } from 'react-draggable';
import FixTableModal from "../components/FixTableModal/FixTableModal"
import FixMediumTableModal from "../components/FixMediumTableModal/FixedMediumTableModal"
import FixLargeTableModal from "../components/FixLargeTableModal/FixedLargeTableModal"
import OrderingSysModal from "../components/OrderingSysModal/OrderingSysModal"
import OrderingSysMediumModal from "../components/OrderingSysMediumModal/OrderingSysMediumModal"
import OrderingSysLargeModal from "../components/OrderingSysLargeModal/OrderingSysLargeModal"
import OrderListModal from "../components/OrderListModal/OrderListModal"
import OrderListMediumModal from "../components/OrderListMediumModal/OrderListMediumModal"
import OrderListLargeModal from "../components/OrderListLargeModal/OrderListLargeModal"

// import { List, ListItem } from "../components/List";


class Frontdesk extends Component {
    state = {
        tables: [],
        menu: [],
        tableHistory: [],
        statusCount: []
    }
    // functions for diningroom collection testing!!


    getSavedTable = () => {
        API.getTables().then(res => {
            let Count = [];
            let UnoccupiedCount = 0;
            Count[0] = UnoccupiedCount;
            let OccupiedCount = 0;
            Count[1] = OccupiedCount;
            let AppetizerCount = 0;
            Count[2] = AppetizerCount
            let EntreeCount = 0;
            Count[3] = EntreeCount;
            let DessertCount = 0;
            Count[4] = DessertCount;
            res.data.map(table => {
                
                if (table.status === "Unoccupied") {
                    // console.log("Unoccupied")
                    UnoccupiedCount += 1;
                    Count[0] = UnoccupiedCount;
                }
                else if (table.status === "Occupied") {
                    // console.log("Occupied")
                    OccupiedCount += 1;
                    Count[1] = OccupiedCount;
                }
                else if (table.status === "Appetizer") {
                    // console.log("Appetizer")
                    AppetizerCount += 1;
                    Count[2] = AppetizerCount;
                }
                else if (table.status === "Entree") {
                    // console.log("Entree")
                    EntreeCount += 1;
                    Count[3] = EntreeCount;
                }
                else {
                    // console.log("Dessert")
                    DessertCount += 1;
                    Count[4] = DessertCount;
                }

            })
            // console.log("count: ",Count)
            this.setState({ tables: res.data, statusCount: Count})
        })
    }

    buildTable = type => {
                console.log("come into buildTable function")
                let tableData = {};
                if (type === 2) {
                    tableData = {
                        seats: 2
                    }
                } else if (type === 4) {
                    tableData = {
                        seats: 4
                    }
                } else if (type === 6) {
                    tableData = {
                        seats: 6
                    }
                } else if (type === 8) {
                    tableData = {
                        seats: 8
                    }
                }

                API.createNewTable(tableData)
                    .then(res => {
                        console.log("res.data: ", res.data);
                        this.getSavedTable()
                    })
                    .catch(err => console.log(err));
            }

    changeTableStatus = (newTableInfo, status) => {
                console.log("newTableInfo: ", newTableInfo)
                console.log("status: ", status)
                if (status === "Occupied") {
                    console.log("Match Occupied")
                    status = "Appetizer"
                    let color = "yellow"
                    this.state.tables.map(table => {
                        if (table._id === newTableInfo.id) {
                            console.log("Matched Table")
                            let newTable = {
                                color: color,
                                status: status
                            }
                            console.log("newTable: ", newTable)
                            this.updateTable(table._id, newTable)
                            this.getSavedTable()
                        }
                    })
                }
                else if (status === "Appetizer") {
                    status = "Entree"
                    let color = "red"
                    this.state.tables.map(table => {
                        if (table._id === newTableInfo.id) {
                            let newTable = {
                                color: color,
                                status: status
                            }
                            console.log("newTable: ", newTable)
                            this.updateTable(table._id, newTable)
                            this.getSavedTable()
                        }
                    })
                }
                else if (status === "Entree") {
                    status = "Dessert"
                    let color = "gray"
                    this.state.tables.map(table => {
                        if (table._id === newTableInfo.id) {
                            let newTable = {
                                color: color,
                                status: status
                            }
                            console.log("newTable: ", newTable)
                            this.updateTable(table._id, newTable)
                            this.getSavedTable()
                        }
                    })
                }
                else if (status === "Dessert") {
                    status = "Done"
                    let color = "white"
                    this.state.tables.map(table => {
                        if (table._id === newTableInfo.id) {
                            let newTable = {
                                color: color,
                                status: status
                            }
                            console.log("newTable: ", newTable)
                            this.updateTable(table._id, newTable)
                            this.getSavedTable()
                        }
                    })
                }
            }

    changeTableAvailability = (newTableInfo, availability) => {
                console.log("newTableInfo: ", newTableInfo)
                console.log("availability: ", availability)
                if (availability === true) {
                    console.log("availability is true")
                    availability = false
                    this.state.tables.map(table => {
                        if (table._id === newTableInfo.id) {
                            console.log("is match")
                            let newTable = {
                                seats: parseInt(table.seats),
                                order: newTableInfo.order,
                                order_quantity: newTableInfo.order_quantity,
                                total_price: parseFloat(newTableInfo.total_price),
                                color: "green",
                                status: "Occupied",
                                availability: availability
                            }
                            console.log("newTable: ", newTable)
                            this.updateTable(table._id, newTable)
                            this.getSavedTable()
                        }
                    })
                } else {
                    console.log("Availability is false")
                    availability = true
                    this.state.tables.map(table => {
                        if (table._id === newTableInfo.id) {
                            let newTable = {
                                seats: parseInt(table.seats),
                                order: "",
                                order_quantity: "",
                                total_price: "",
                                color: "white",
                                status: "Unoccupied",
                                availability: availability
                            }
                            this.updateTable(table._id, newTable)
                            this.getSavedTable()
                        }
                    })
                }

            }

    saveTablePosition = (TableId, newTableInfo) => {
                console.log("newTableInfo: ", newTableInfo)
                this.state.tables.map(table => {
                    if (table._id === TableId) {
                        console.log("Matched Table")
                        let newTableinf = {
                            table_name: newTableInfo.tableName,
                            X: newTableInfo.X,
                            Y: newTableInfo.Y,
                            fixed: true
                        }
                        this.updateTable(table._id, newTableinf)
                        this.getSavedTable()
                    }
                })
            }

    updateTable = (tableId, newTablestatus) => {
                console.log("call API to update availability")
                API.changeTableStatus(tableId, newTablestatus)
                    .then(result => {
                        // console.log(result)
                        this.getSavedTable()
                    })
            }
    // functions for menu collection testing!!

    getMenu = () => {
                API.getMenu().then(res => {
                    // console.log(res.data)
                    const savedMenu = res.data;
                    this.setState({ menu: savedMenu });
                })
                    .catch(err => console.log(err));
            }

    //  functions for table this.state.specificTableHistory testing
    getTableHistoryById = TableId => {
                console.log("Table Id: ", TableId)
                API.findTableHistoryById(TableId).then(res => {
                    console.log(res.data)
                    const specificTableHistory = res.data;
                    this.setState({ tableHistory: specificTableHistory });
                })
                    .catch(err => console.log(err));
            }
    AddTableHistory = () => {
                console.log("go into add Table History function")
                const testOrder =
                {
                    // start_at: Date(),
                    date: "04/06/2020",
                    order: "test dish 2, test dish 3",
                    order_quantity: "1, 2",
                    total_price: 53.15
                }



                API.createTableHistory(testOrder)
                    .then(res => {
                        console.log("res.data: ", res.data);
                        this.retriveSavedTableHistoryById(res.data._id)
                    })
                    .catch(err => console.log(err));
            }


    componentDidMount = () => {
                this.getSavedTable()
                this.getMenu()
            }


    render() {
            console.log("state: ", this.state)
        return(
            <>
        <div className="sidenav">

            <div className="logo-box">
                <h1 style={{ fontSize: "600%", textAlign: "center" }}>T</h1>
            </div>

            <h1 className="box-top">Build Tables</h1>
            <div className="inner-box">
                <button onClick={() => this.buildTable(2)}>
                    Build Small
                        </button>
                <button onClick={() => this.buildTable(4)}>
                    Build Medium
                        </button>
                <button onClick={() => this.buildTable(6)}>
                    Build Large
                        </button>
            </div>

            <h1 className="box-top" style={{ marginTop: "15%" }}>Menu and Payment</h1>
            <div className="inner-box">
                <ViewMenuModal
                    menu={this.state.menu}
                    getMenu={this.getMenu}
                />
                <Link to="/Payment">
                    <button>Payment</button>
                </Link>
            </div>

            <Link to="/">
                <button style={{ marginTop: "25%", backgroundColor: "white" }}>Home</button>
            </Link>
        </div>

        <div id="main">
            <div id="legend">
                <div style={{ marginTop: "5%" }}>
                    <button disabled className="legendbtn" style={{ backgroundColor: "white" }}>{this.state.statusCount[0]}</button>
                    <p className="legendtext">   Available</p>
                </div>
                <br></br>
                <div>
                    <button disabled className="legendbtn" style={{ backgroundColor: "green" }}>{this.state.statusCount[1]}</button>
                    <p className="legendtext"> Ordered</p>
                </div>
                <br></br>
                <div>
                    <button disabled className="legendbtn" style={{ backgroundColor: "yellow" }}>{this.state.statusCount[2]}</button>
                    <p className="legendtext"> Appetizer</p>
                </div>
                <br></br>
                <div>
                    <button disabled className="legendbtn" style={{ backgroundColor: "red" }}>{this.state.statusCount[3]}</button>
                    <p className="legendtext"> Entree</p>
                </div>
                <br></br>
                <div>
                    <button disabled className="legendbtn" style={{ backgroundColor: "gray" }}>{this.state.statusCount[4]}</button>
                    <p className="legendtext"> Dessert</p>
                </div>
            </div>
            {/* create tables */}
            {!this.state.tables ? (
                <h2 style={{ color: "white" }}>No Tables Generated Yet</h2>
            ) : (this.state.tables.map(table => {
                // console.log("table: ", table)
                if (table.seats === 2) {
                    if (table.availability === true && table.fixed === false) {
                        return (
                            <FixTableModal
                                key={table._id}
                                table={table}
                                saveTablePosition={this.saveTablePosition}
                            />
                        )
                    }
                    else if (table.availability === true && table.fixed === true) {
                        console.log("goes to both true")
                        return (
                            <OrderingSysModal
                                key={table._id}
                                table={table}
                                menu={this.state.menu}
                                changeTableAvailability={this.changeTableAvailability}
                                getSavedTable={this.getSavedTable}
                            />
                        )
                    }
                    else if (table.availability === false && table.fixed === true) {
                        return (
                            <OrderListModal
                                key={table._id}
                                table={table}
                                changeTableStatus={this.changeTableStatus}
                                changeTableAvailability={this.changeTableAvailability}
                                getSavedTable={this.getSavedTable}
                            />
                        )
                    }


                } else if (table.seats === 4) {

                    if (table.availability === true && table.fixed === false) {
                        return (
                            <FixMediumTableModal
                                key={table._id}
                                table={table}
                                saveTablePosition={this.saveTablePosition}
                            />
                        )
                    }
                    else if (table.availability === true && table.fixed === true) {
                        console.log("goes to both true")
                        return (
                            <OrderingSysMediumModal
                                key={table._id}
                                table={table}
                                menu={this.state.menu}
                                changeTableAvailability={this.changeTableAvailability}
                                getSavedTable={this.getSavedTable}
                            />
                        )
                    }
                    else if (table.availability === false && table.fixed === true) {
                        return (
                            <OrderListMediumModal
                                key={table._id}
                                table={table}
                                changeTableStatus={this.changeTableStatus}
                                changeTableAvailability={this.changeTableAvailability}
                                getSavedTable={this.getSavedTable}
                            />
                        )
                    }
                } else if (table.seats === 6) {
                    if (table.availability === true && table.fixed === false) {
                        return (
                            <FixLargeTableModal
                                key={table._id}
                                table={table}
                                saveTablePosition={this.saveTablePosition}
                            />
                        )
                    }
                    else if (table.availability === true && table.fixed === true) {
                        console.log("goes to both true")
                        return (
                            <OrderingSysLargeModal
                                key={table._id}
                                table={table}
                                menu={this.state.menu}
                                changeTableAvailability={this.changeTableAvailability}
                                getSavedTable={this.getSavedTable}
                            />
                        )
                    }
                    else if (table.availability === false && table.fixed === true) {
                        return (
                            <OrderListLargeModal
                                key={table._id}
                                table={table}
                                changeTableStatus={this.changeTableStatus}
                                changeTableAvailability={this.changeTableAvailability}
                                getSavedTable={this.getSavedTable}
                            />
                        )
                    }
                }

            }))}


        </div>

            </>
        );
    }
}

export default Frontdesk;