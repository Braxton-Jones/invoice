import add from "../../assets/icon-plus.svg"
import down from "../../assets/icon-arrow-down.svg"
import illustration from "../../assets/illustration-empty.svg"
import Invoice from "../componets/Invoice"
import "../../sass/_layout.scss"
import { fetchInvoices, createInvoice } from '../../api'
import React from "react"
import { useState, useEffect } from "react"

function Home(){
const [data, setData] =  useState([]);
const [loadingStatus, setLoadingStatus] = useState(true);
const [toggleFilter, setToggleFilter] = useState(true)

// Gets all the invoices
useEffect(()=>{
    fetchInvoices()
      .then(response => {
        setData(response.data);
        setLoadingStatus(response.loadingStatus);
      })
      .catch(error => {
        console.log("error with getting data from database:", error);
      });
},[])




    


  const openAddInvoice = () => {
    // Opens the Add invoice view
  }

//   Handler Functions
  const handleToggleFilter = () =>{
        setToggleFilter(!toggleFilter)
        console.log("click")
  }



    
    // filter invoices

    return(
    <section className="home-page">
        <section className="subheading">
            <div className="subheading-title">
                <h3>Invoices</h3>
                <p>{data.length} invoices</p>
            </div>
            <div className="subheading-interact">
                <p className="filter-btn" >Filter 
                <img 
                src={down} 
                alt="down arrow" 
                className={toggleFilter ? "open" : "closed" } 
                onClick={handleToggleFilter}
                data-testid = "filter-btn"
                >
                </img>
                </p>
                <button className="add-btn" onClick={openAddInvoice}> <img src={add}/> New </button>
            </div>
        </section>
        <section className="invoice-list">
            {loadingStatus ? (
                    <p>Loading...</p>
                ) : (
                    data.length > 0 ? ( 
                    data
                        // .filter(invoice =>{}
                        //     // filter by status
                        //     )
                        .map(invoice => (
                            <Invoice key={invoice._id} invoice={invoice} />
                            ))
                        
                    ) : (
                        <div className="default-message">
             <img src={illustration}/> 
             <h3>There is nothing here</h3>
             <p>Create an invoice by clicking the <span>New </span>
                button and get started.
             </p> 
            </div>
                    )
                )}
            
        </section>
      

    </section>
    )
}

export default Home