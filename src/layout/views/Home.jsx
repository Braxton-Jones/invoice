import add from "../../assets/icon-plus.svg"
import down from "../../assets/icon-arrow-down.svg"
import illustration from "../../assets/illustration-empty.svg"
import Invoice from "../componets/Invoice"
function Home(){
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
      

    </section>
    )
}

export default Home