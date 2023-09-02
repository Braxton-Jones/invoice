import illustration from '../../assets/illustration-empty.svg';
import Invoice from '../componets/Invoice';
export default function InvoiceList(props) {
  console.log('this', props.invoice);
  return (
    <section className='invoice-list'>
      {/* Invoices Container */}
      {props.invoices.length > 0 ? (
        props.invoices
          .filter(
            (invoice) =>
              props.filterStatus === 'all' ||
              invoice.status === props.filterStatus
          )
          .map((invoice) => <Invoice key={invoice._id} invoice={invoice} />)
      ) : (
        <div className='default-message'>
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
