function Invoice (props){
    const getStatusTextAndStyle = () => {
        switch (props.invoice.status) {
            case "draft":
                return { text: "Draft", invoiceClass: "draft" };
            case "pending":
                return { text: "Pending", invoiceClass: "pending" };
            case "paid":
                return { text: "Paid", invoiceClass: "paid" };
            default:
                return { text: "Unknown", invoiceClass: "draft" };
        }
    };

    const { text, invoiceClass} = getStatusTextAndStyle();

    

    return(
    <div className="invoice">
               <div className="customer-info">
                   <p className="invoice-id">#<span className="id">{props.invoice.id}</span></p>
                   <p className="invoice-client">{props.invoice.clientName}</p>
               </div>
               <div className="invoice-details">
                   <div className="payment">
                      <p className="invoice-due">Due {props.invoice.paymentDue}</p>
                      <p className="invoice-total">$ {props.invoice.total}</p>
                   </div>
                   <div className={`status ${invoiceClass}`}>
                    <svg width="8" height="8" viewBox="0 0 9 9" fill="none">
                        <circle cx="4" cy="4" r="4" fill="#FF8F00"/>
                    </svg>
                    <p className={`status-text`}>{text}</p> 
                    
                   </div>
               </div>
           </div> 
        
    )
}

export default Invoice