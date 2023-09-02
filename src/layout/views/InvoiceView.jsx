import React, { useState, useEffect } from 'react';
import { fetchInvoices } from '../../api';
import add from '../../assets/icon-plus.svg';
import down from '../../assets/icon-arrow-down.svg';
import '../../sass/_layout.scss';
import InvoiceList from '../componets/InvoiceList';
import FilterSelect from '../componets/FilterSelect';
import { useLoaderData } from 'react-router-dom';

export function loader() {
  return fetchInvoices();
}

export default function InvoiceView() {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const invoices = useLoaderData();

  // Filter Functionality
  const toggleModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className='home-page'>
      <section className='subheading'>
        <div className='subheading-title'>
          <h3>Invoices</h3>
          <p>{invoices.data.length} invoices</p>
        </div>
        <div className='subheading-interact'>
          <div className='filter-wrapper'>
            <p className='filter-btn' onClick={toggleModal}>
              Filter
              <img src={down} alt='down arrow' />
            </p>
            {showModal && (
              <FilterSelect
                setFilterStatus={setFilterStatus}
                handleCloseModal={handleCloseModal}
              />
            )}
          </div>

          <button className='add-btn'>
            <img src={add} alt='Add' />
            New
          </button>
        </div>
      </section>
      <InvoiceList
        loadingStatus={loadingStatus}
        invoices={invoices.data}
        filterStatus={filterStatus}
      />
    </section>
  );
}
