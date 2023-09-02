import arrow from '../../assets/icon-arrow-left.svg';
import ModalPortal from '../componets/ModalPortal';
import InvoiceForm from '../componets/InvoiceForm';
import { deleteInvoice } from '../../api';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getOneInvoice } from '../../api';
import '../../sass/componets/_invoiceDetailed.scss';
// Break down??

export function loader({ params }) {
  return getOneInvoice(params.id);
}
function InvoiceDetailedView() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const invoiceData = useLoaderData();

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  async function handleDelete(id) {
    await deleteInvoice(id);
  }

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
    // Initialize edited data with current data
  };

  function handleMarkAsPaid() {
    // Your mark as paid logic here
  }

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
          <p>Status</p>
          <div className={`status ${invoiceData.status}`}>
            <svg width='8' height='8' viewBox='0 0 9 9' fill='none'>
              <circle cx='4' cy='4' r='4' fill='#FF8F00' />
            </svg>
            <p className={`status-text`}>{invoiceData.status}</p>
          </div>
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
            <div className='invoice-details'>
              <div className='date-and-due'>
                <div className='invoice-date'>
                  <p className='title'>Invoice Data</p>
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
                    {invoiceData.clientAddress.postCode ||
                      'No postal code provided'}
                  </p>
                  <p className='address-line'>
                    {invoiceData.clientAddress.country || 'No country provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className='email'>
              <p className='title'>Sent to</p>
              <p className='client-email data'>
                {invoiceData.clientEmail || 'No email found'}
              </p>
            </div>

            {/* Items */}
            <section className='invoice-items'>
              {invoiceData.items.map((item) => {
                return (
                  <div className='item'>
                    <div className='item-details'>
                      <p className='item-name'>{item.name}</p>
                      <p className='item-quantity'>
                        {item.quantity} x $ {parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>
                    <div className='item-cost'>
                      <p>$ {parseFloat(item.total).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
              <div className='total'>
                <p>Grand Total</p>
                <p className='invoice-total'>
                  $ {parseFloat(invoiceData.total).toFixed(2)}
                </p>
              </div>
            </section>
          </section>
        )}
      </section>

      {showEditModal && (
        <ModalPortal onClose={() => setShowEditModal(false)}>
          <div className='edit-modal'>
            <h3>
              Edit <span>#</span>
              {invoiceData.id}
            </h3>
            <InvoiceForm invoiceInfo={invoiceData} />
            <div className='edit-modal-footer' >
              <button className='variant-1'onClick={toggleEditModal}>Cancel</button>
              <button className='variant-3'>Save Changes</button>
            </div>
          </div>
        </ModalPortal>
      )}

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
        <div>
          <button className='variant-1' onClick={toggleEditModal}>
            Edit
          </button>
          <button className='variant-2' onClick={toggleDeleteModal}>
            Delete
          </button>
          <button className='variant-3' onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>
        </div>
      </footer>
    </>
  );
}
export default InvoiceDetailedView;