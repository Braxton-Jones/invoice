import React, { useState, useEffect } from 'react';
import ModalPortal from '../componets/ModalPortal';
import Invoice from '../componets/Invoice';
import { fetchInvoices, createInvoice, deleteInvoice } from '../../api';
import add from '../../assets/icon-plus.svg';
import down from '../../assets/icon-arrow-down.svg';
import illustration from '../../assets/illustration-empty.svg';
import '../../sass/_layout.scss';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);


// Gets all the invoices
   useEffect(() => {
    getInvoices()
  },[]);

  const getInvoices = async()=>{
    const invoices = await fetchInvoices()
    setData(invoices.data)
    setLoadingStatus(invoices.loadingStatus)
  }


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
const newIn = {
  "id": "FV2353",
  "createdAt": "2021-11-05",
  "paymentDue": "2021-11-12",
  "description": "Logo Re-design",
  "paymentTerms": 7,
  "clientName": "Anita Wainwright",
  "clientEmail": "",
  "status": "draft",
  "senderAddress": {
    "street": "19 Union Terrace",
    "city": "London",
    "postCode": "E1 3EZ",
    "country": "United Kingdom"
  },
  "clientAddress": {
    "street": "",
    "city": "",
    "postCode": "",
    "country": ""
  },
  "items": [
    {
      "name": "Logo Re-design",
      "quantity": 1,
      "price": 3102.04,
      "total": 3102.04
    }
  ],
  "total": 3102.04
}

const openAddInvoice = async() => {
  await createInvoice(newIn)
  await getInvoices()


  
  };

const  deleteIN = async(id)=>{
  await deleteInvoice(id)
  await getInvoices()
  
}

  return (
    <section className='home-page'>
      {/* Top Bar */}
      <section className='subheading'>
        <div className='subheading-title'>
          <h3>Invoices</h3>
          <p>{data.length} invoices {filterStatus}</p>
        </div>
        <div className='subheading-interact'>
          <button onClick={openAddInvoice}>Add</button>
          <button onClick={()=> deleteIN("64e4c4e93acc7cabb750a807")}>Delete</button>
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
              <div className='filter-select' value="filter-status">
                <label htmlFor='checkbox1'>
                  <input
                    type='checkbox'
                    id='draft'
                    name='checkboxGroup'
                    onChange={() => toggleCheckboxes('draft')}
                  />{' '}
                 Draft
                </label>
                <br />
                <label htmlFor='checkbox2'>
                  <input
                    type='checkbox'
                    id='pending'
                    name='checkboxGroup'
                    onChange={() => toggleCheckboxes('pending')}
                  />{' '}
                 Pending
                </label>
                <br />
                <label htmlFor='checkbox3'>
                  <input
                    type='checkbox'
                    id='paid'
                    name='checkboxGroup'
                    onChange={() => toggleCheckboxes('paid')}
                  />{' '}
                  Paid
                </label>
                <br />
              </div>
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
          <p>Loading...</p>
        ) : data.length > 0 ? (
          data
          .filter(invoice => filterStatus === 'all' || invoice.status === filterStatus)
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
