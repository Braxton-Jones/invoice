import add from "../../assets/icon-plus.svg"
import down from "../../assets/icon-arrow-down.svg"
import illustration from "../../assets/illustration-empty.svg"
import Invoice from "../componets/Invoice"
import "../../sass/_layout.scss"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
function Home(){
    const [data, setData] = useState([])


    // Statuses


    // gets invoices from database
    useEffect(()=>{
        axios.get("http://localhost:3000/invoices") 
        .then(response => {
        setData(response.data)
        console.log(data)
        })
        .catch(error => {
        console.log("error with getting data from database:", error)
        })
    }, [data])
    
    // funnels data from database into components
    // filter invoices

    

    return(
    <section className="home-page">
        <section className="subheading">
            <div className="subheading-title">
                <h3>Invoices</h3>
                <p>7 invoices</p>
            </div>
            <div className="subheading-interact">
                <p className="filter-btn">Filter <img src={down} alt="down arrow"/> </p>
                <button className="add-btn"> <img src={add}/> New </button>
            </div>
        </section>
        <section className="invoice-list">
            {data ? data.map(invoice => (
             <Invoice key={invoice.id} invoice={invoice}/>
            )) :
            <div>
             <img src={illustration}/>    
            </div>}
            
        </section>
      

    </section>
    )
}

export default Home