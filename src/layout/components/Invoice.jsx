import { Link } from 'react-router-dom';
import { useLiveBrowserWidth } from './Utility';
import arrow from '../../assets/icon-arrow-right.svg';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Invoice(props) {
  const invoiceRef = useRef(null)
  useEffect(()=>{
    const tl = gsap.timeline()
    tl.to(invoiceRef.current, {opacity:0.5})
    tl.to(invoiceRef.current, {opacity: 1})
  },[])
  const getStatusTextAndStyle = () => {
    switch (props.invoice.status) {
      case 'draft':
        return { text: 'Draft', invoiceClass: 'draft' };
      case 'pending':
        return { text: 'Pending', invoiceClass: 'pending' };
      case 'paid':
        return { text: 'Paid', invoiceClass: 'paid' };
      default:
        return { text: 'Unknown', invoiceClass: 'draft' };
    }
  };

  const { text, invoiceClass } = getStatusTextAndStyle();

  const smallInvoice = (
    <>
      <Link to={`/view/${props.invoice._id}`}>
        <div className='customer-info'>
          <p className='invoice-id'>
            #<span className='id'>{props.invoice.id}</span>
          </p>
          <p className='invoice-client'>{props.invoice.clientName}</p>
        </div>
        <div className='invoice-details'>
          <div className='payment'>
            <p className='invoice-due'>Due {props.invoice.paymentDue}</p>
            <p className='invoice-total'>
              ${' '}
              {props.invoice.items
                .reduce(
                  (total, item) =>
                    total + parseFloat(item.price) * item.quantity,
                  0
                )
                .toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>
          </div>
          <div className={`status ${invoiceClass}`}>
            <svg width='8' height='8' viewBox='0 0 9 9' fill='none'>
              <circle cx='4' cy='4' r='4' fill='#FF8F00' />
            </svg>
            <p className={`status-text`}>{text}</p>
          </div>
        </div>
      </Link>
    </>
  );
  const largeInvoice = (
    <>
      <Link to={`/view/${props.invoice._id}`}>
        <div className='customer-info'>
          <p className='invoice-id'>
            #<span className='id'>{props.invoice.id}</span>
          </p>
          <p className='invoice-due'>Due {props.invoice.paymentDue}</p>
          <p className='invoice-client'>{props.invoice.clientName}</p>
          <p className='invoice-total'>
            <p className='invoice-total'>
              ${' '}
              {props.invoice.items
                .reduce(
                  (total, item) =>
                    total + parseFloat(item.price) * item.quantity,
                  0
                )
                .toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>
          </p>
          <div className={`status ${invoiceClass}`}>
            <svg width='8' height='8' viewBox='0 0 9 9' fill='none'>
              <circle cx='4' cy='4' r='4' fill='#FF8F00' />
            </svg>
            <p className={`status-text`}>{text}</p>
          </div>
          <img src={arrow} alt='arrow' />
        </div>
      </Link>
    </>
  );
  const browserWidth = useLiveBrowserWidth();
  return (
    <div className='invoice' ref={invoiceRef}>
      {browserWidth < 768 ? smallInvoice : largeInvoice}
    </div>
  );
}

export default Invoice;
