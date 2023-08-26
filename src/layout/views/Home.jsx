import React, { useState, useEffect } from 'react';
import ModalPortal from '../componets/ModalPortal';
import Invoice from '../componets/Invoice';
import SpinnerLoader from '../componets/SpinnerLoader';
import { fetchInvoices } from '../../api';
import add from '../../assets/icon-plus.svg';
import down from '../../assets/icon-arrow-down.svg';
import illustration from '../../assets/illustration-empty.svg';
import '../../sass/_layout.scss';

function Home() {
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);

  // Gets all the invoices
  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = async () => {
    const invoices = await fetchInvoices();
    setData(invoices.data);
    setLoadingStatus(invoices.loadingStatus);
  };

  // Filter Functionality
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function toggleCheckboxes(status) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Check if none of the checkboxes are selected
    const noneSelected = Array.from(checkboxes).every(
      (checkbox) => !checkbox.checked
    );

    if (noneSelected) {
      setFilterStatus('all');
    } else {
      setFilterStatus(status);
    }

    checkboxes.forEach((checkbox) => {
      if (checkbox.id !== status) {
        checkbox.checked = false;
      }
    });
  }

  // Create Invoice
  const openAddInvoice = async () => {
    await createInvoice();
    await getInvoices();
  };

  const deleteIN = async (id) => {
    await deleteInvoice(id);
    await getInvoices();
  };

  return (
    <section className='home-page'>
      {/* Top Bar */}
      <section className='subheading'>
        <div className='subheading-title'>
          <h3>Invoices</h3>
          <p>{data.length} invoices</p>
        </div>
        <div className='subheading-interact'>
          <p className='filter-btn'>
            Filter
            <img
              src={down}
              alt='down arrow'
              onClick={toggleModal}
              data-testid='filter-btn'
            />
          </p>
          {showModal && (
            <ModalPortal onClose={handleCloseModal}>
              <dialog className='filter-select' value='filter-status'>
                <label htmlFor='checkbox1'>
                  <input
                    type='checkbox'
                    id='draft'
                    name='checkboxGroup'
                    onChange={() => toggleCheckboxes('draft')}
                  />{' '}
                  <span className='custom-checkbox-label'>Draft</span>
                </label>
                <br />
                <label htmlFor='checkbox2'>
                  <input
                    type='checkbox'
                    id='pending'
                    name='checkboxGroup'
                    onChange={() => toggleCheckboxes('pending')}
                  />{' '}
                  <span className='custom-checkbox-label'>Pending</span>
                </label>
                <br />
                <label htmlFor='checkbox3'>
                  <input
                    type='checkbox'
                    id='paid'
                    name='checkboxGroup'
                    onChange={() => toggleCheckboxes('paid')}
                  />{' '}
                  <span className='custom-checkbox-label'>Paid</span>
                </label>
                <br />
              </dialog>
            </ModalPortal>
          )}
          <button className='add-btn' onClick={openAddInvoice}>
            {' '}
            <img src={add} alt='Add' /> New{' '}
          </button>
        </div>
      </section>
      <section className='invoice-list'>
        {/* Invoices Container */}
        {loadingStatus ? (
          <SpinnerLoader />
        ) : data.length > 0 ? (
          data
            .filter(
              (invoice) =>
                filterStatus === 'all' || invoice.status === filterStatus
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
    </section>
  );
}

export default Home;
