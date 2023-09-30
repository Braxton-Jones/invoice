import React from 'react';
import illustration from '../../assets/illustration-empty.svg';
import Invoice from '../componets/Invoice';

export default function InvoiceList(props) {
  const filteredInvoices = props.invoices?.data.filter(
    (invoice) =>
      props.filterStatus === 'all' || invoice.status === props.filterStatus
  );
  props.onFilteredInvoices(filteredInvoices);

  

  return (
    <section className='invoice-list'>
      {/* Invoices Container */}
      {filteredInvoices?.length > 0 ? (
        filteredInvoices.map((invoice) => (
          <Invoice key={invoice._id} invoice={invoice} />
        ))
      ) : (<div className='default-message'>
          <img src={illustration} alt='Illustration' />
          <h3>There is nothing here</h3>
          <p>
            Create an invoice by clicking the <span>New</span> button and get
            started.
          </p>
        </div>
      )}
    </section>
  );
}
