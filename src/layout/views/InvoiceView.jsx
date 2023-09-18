import React, { useEffect, useRef, useState } from 'react';
import { fetchInvoices, createInvoice } from '../../api';
import add from '../../assets/icon-plus.svg';
import down from '../../assets/icon-arrow-down.svg';
import '../../sass/views_styling/_invoiceView.scss';
import InvoiceList from '../componets/InvoiceList';
import FilterSelect from '../componets/FilterSelect';
import { Form, useLoaderData } from 'react-router-dom';
import ModalPortal from '../componets/Utility';
import InvoiceForm from '../componets/InvoiceForm';

export function loader() {
  return fetchInvoices();
}

export default function InvoiceView() {
  const invoices = useLoaderData();
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [isSuccessful, setIsSuccessful] = useState(false)

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleFilteredInvoices = (filteredInvoices) => {
    const invoiceFilteredCount = filteredInvoices.length;
    setInvoiceCount(invoiceFilteredCount);
  };

  return (
    <section className='home-page'>
      <section className='subheading'>
        <div className='subheading-title'>
          <h3>Invoices</h3>
          <p>
            {invoiceCount}{' '}
            {filterStatus ? (filterStatus === 'all' ? '' : filterStatus) : ''}{' '}
            invoices
          </p>
        </div>
        <div className='subheading-interact'>
          <div className='filter-wrapper'>
            <p className='filter-btn' onClick={toggleFilterModal}>
              Filter
              <img src={down} alt='down arrow' />
            </p>
            {showFilterModal && (
              <FilterSelect
                setFilterStatus={setFilterStatus}
                handleCloseModal={handleCloseFilterModal}
              />
            )}
            {showAddForm && (
              <ModalPortal onClose={() => setShowAddForm(false)}>
                <div className='add-modal'>
                  <div>
                    <h3>New Invoice</h3>
                  </div>
                  <InvoiceForm toggleAddForm={toggleAddForm}/>
                </div>
              </ModalPortal>
            )}
          </div>

          <button className='add-btn' onClick={toggleAddForm}>
            <img src={add} alt='Add' />
            New
          </button>
        </div>
      </section>
      <InvoiceList
        loadingStatus={loadingStatus}
        invoices={invoices.data}
        filterStatus={filterStatus}
        onFilteredInvoices={handleFilteredInvoices}
      />
    </section>
  );
}
