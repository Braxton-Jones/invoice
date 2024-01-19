import arrow from '../../assets/icon-arrow-left.svg';
import ModalPortal, { useLiveBrowserWidth } from '../components/Utility';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getOneInvoice, deleteInvoice, editInvoice } from '../../api';
import '../../sass/views_styling/_invoiceDetailed.scss';
import InvoiceForm from '../components/InvoiceForm';
import {gsap} from 'gsap';

export function loader({ params }) {
  return getOneInvoice(params.id);
}

function InvoiceDetailedView() {
  const editModalRef = useRef(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const invoiceData = useLoaderData();
  const navigate = useNavigate();
  const browserWidth = useLiveBrowserWidth();

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  async function handleDelete(id) {
    await deleteInvoice(id);
    toggleDeleteModal();
    navigate('/');
  }
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const updateStatus = { status: 'paid' };
  async function handleMarkAsPaid(id, update) {
    await editInvoice(id, update);
    navigate(`/view/${invoiceData._id}`);
  }

  useEffect(() => {
    if(showEditModal === true) {
      gsap.to(editModalRef.current, {
        duration: 0.5,
        opacity: 1,
        ease: 'power4.out',
        x: 0
      })
    }else{
      gsap.to(editModalRef.current, {
        duration: 0.5,
        x: -100,
        opacity: 0,
        ease: 'power4.out',
        
      })
    }
  },[showEditModal])

  const smallStatus = (
    <>
      <p>Status</p>
      <div className={`status ${invoiceData.status}`}>
        <svg width='8' height='8' viewBox='0 0 9 9' fill='none'>
          <circle cx='4' cy='4' r='4' fill='#FF8F00' />
        </svg>
        <p className={`status-text`}>{invoiceData.status}</p>
      </div>
    </>
  );
  const largeStatus = (
    <>
      <p>Status</p>
      <div className={`status ${invoiceData.status}`}>
        <svg width='8' height='8' viewBox='0 0 9 9' fill='none'>
          <circle cx='4' cy='4' r='4' fill='#FF8F00' />
        </svg>
        <p className={`status-text`}>{invoiceData.status}</p>
      </div>
      <div className='button-wrapper'>
        <button className='variant-1' onClick={toggleEditModal}>
          Edit
        </button>
        <button className='variant-2' onClick={toggleDeleteModal}>
          Delete
        </button>
        <button
          className='variant-3'
          onClick={() => handleMarkAsPaid(invoiceData._id, updateStatus)}
        >
          Mark as Paid
        </button>
      </div>
    </>
  );
  const smallDetails = (
    <>
      <div className='invoice-details'>
        <div className='date-and-due'>
          <div className='invoice-date'>
            <p className='title'>Invoice Date</p>
            <p className='data'>{invoiceData.createdAt}</p>
          </div>
          <div className='payment-due'>
            <p className='title'>Payment Due</p>
            <p className='data'>{invoiceData.paymentDue}</p>
          </div>
        </div>
        <div className='bill-to'>
          <p className='title'>Bill To</p>
          <p className='client-name data'>{invoiceData.clientName}</p>
          <div className='address client-address'>
            <p className='address-line'>
              {invoiceData.clientAddress.street || 'No address provided'}
            </p>
            <p className='address-line'>
              {invoiceData.clientAddress.city || 'No city provided'}
            </p>
            <p className='address-line'>
              {invoiceData.clientAddress.postCode || 'No postal code provided'}
            </p>
            <p className='address-line'>
              {invoiceData.clientAddress.country || 'No country provided'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
  const largeDetails = (
    <>
      <div className='date-and-due'>
        <div className='invoice-date'>
          <p className='title'>Invoice Date</p>
          <p className='data'>{invoiceData.createdAt}</p>
        </div>
        <div className='payment-due'>
          <p className='title'>Payment Due</p>
          <p className='data'>{invoiceData.paymentDue}</p>
        </div>
      </div>
      <div className='bill-to'>
        <p className='title'>Bill To</p>
        <p className='client-name data'>{invoiceData.clientName}</p>
        <div className='address client-address'>
          <p className='address-line'>
            {invoiceData.clientAddress.street || 'No address provided'}
          </p>
          <p className='address-line'>
            {invoiceData.clientAddress.city || 'No city provided'}
          </p>
          <p className='address-line'>
            {invoiceData.clientAddress.postCode || 'No postal code provided'}
          </p>
          <p className='address-line'>
            {invoiceData.clientAddress.country || 'No country provided'}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <section className='view-container'>
        <Link to={'/'}>
          <div className='back-btn'>
            <img src={arrow} />
            <p>Go back</p>
          </div>
        </Link>

        <section className='view-status'>
          {browserWidth < 768 ? smallStatus : largeStatus}
        </section>

        {!invoiceData ? (
          <p>Loading...</p>
        ) : (
          <section className='invoice-view'>
            {/* Header */}

            <div className='invoice-header'>
              <h4 className='invoice-id'>
                <span>#</span>
                {invoiceData.id}
              </h4>
              <p className='invoice-description'>{invoiceData.description}</p>
            </div>

            {/* Sender Address */}
            <div className='address sender-address'>
              <p className='address-line'>
                {invoiceData.senderAddress.street || 'No address provided'}
              </p>
              <p className='address-line'>
                {invoiceData.senderAddress.city || 'No city provided'}
              </p>
              <p className='address-line'>
                {invoiceData.senderAddress.postCode ||
                  'No postal code provided'}
              </p>
              <p className='address-line'>
                {invoiceData.senderAddress.country || 'No country provided'}
              </p>
            </div>

            {/* Invoice Data */}
            {browserWidth < 768 ? smallDetails : largeDetails}

            {/* Email */}
            <div className='email'>
              <p className='title'>Sent to</p>
              <p className='client-email data'>
                {invoiceData.clientEmail || 'No email found'}
              </p>
            </div>

            {/* Items */}
            <section className='invoice-details-items'>
              {browserWidth > 1080 ? (
                <table className='invoice-details-table'>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Qty.</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>$ {item.price.toFixed(2)}</td>
                        <td>$ {(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                invoiceData.items.map((item) => (
                  <div className='item' key={item.id}>
                    <div className='item-details'>
                      <p className='item-name'>{item.name}</p>
                      <p className='item-quantity'>
                        {item.quantity} x $ {parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className='item-cost'>
                      <p>
                        $ {parseFloat(item.price).toFixed(2) * item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div className='total'>
                <p>Amount Due</p>
                <p className='invoice-total'>
                  $
                  {invoiceData.items
                    .reduce(
                      (total, item) =>
                        total + parseFloat(item.price) * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </section>
          </section>
        )}
      </section>

      <div className='edit-modal' ref={editModalRef}>
          <InvoiceForm
            currentInvoice={invoiceData}
            toggleEditForm={toggleEditModal}
          />
        </div>

      {showDeleteModal && (
        <ModalPortal onClose={handleCloseDeleteModal}>
          <div className='delete-overlay'>
            <div className='delete-modal'>
              <h3>Confirm Deletion</h3>
              <p>
                {' '}
                Are you sure you want to delete invoice ${invoiceData.id}? This
                action cannot be undone.
              </p>
              <div className='delete-wrapper'>
                <button className='variant-1' onClick={handleCloseDeleteModal}>
                  Cancel
                </button>
                <button
                  className='variant-2'
                  onClick={() => handleDelete(invoiceData._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      <footer>
        <div className='button-wrapper'>
          <button 
          className='variant-1' 
          onClick={toggleEditModal}
          disabled={toggleEditModal}

          >
            Edit
          </button>
          <button 
          className='variant-2' 
          onClick={toggleDeleteModal}
          disabled={toggleEditModal}

          >
            Delete
          </button>
          <button
            className='variant-3'
            onClick={() => handleMarkAsPaid(invoiceData._id, updateStatus)}
            disabled={toggleEditModal}


          >
            Mark as Paid
          </button>
        </div>
      </footer>
    </>
  );
}
export default InvoiceDetailedView;
