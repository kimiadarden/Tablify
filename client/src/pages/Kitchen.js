import React, { useState, useEffect } from "react";
import "../style.css";
import KitchenCard from "../components/KitchenCard";
import Navbar from "../components/Navbar";
import API from '../utils/API'

function Kitchen() {

  const [tables, setTables] = useState([])

  function getSavedTable () {
    API.getTables().then(res => {
      setTables(res.data )
    })
  };

  const cooked = (id) => {
    console.log(id)
    const orderFinished =  tables.forEach(table => table._id !== id)
    setTables(orderFinished)
  }


  useEffect(() => {
    getSavedTable()
  }, [])

  console.log(tables)
  return (
    <>
        <Navbar/>
        {tables ? (
          <>
            {tables.map(table =>
              table.order ? (
                <KitchenCard table={table} cooked={cooked} />
              ):(
                <>
                </>
              ))}
            </>) : (
            <>
            </>
            )}
    </>
  );
}

export default Kitchen;
