import React, { useState, Suspense } from 'react';
import { fetchInvoices } from '../../api';
import add from '../../assets/icon-plus.svg';
import down from '../../assets/icon-arrow-down.svg';
import '../../sass/views_styling/_invoiceView.scss';
import InvoiceList from '../componets/InvoiceList';
import FilterSelect from '../componets/FilterSelect';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { useLiveBrowserWidth } from '../componets/Utility';
import InvoiceForm from '../componets/InvoiceForm';

export function loader() {
  const invoicePromise = fetchInvoices();
  return defer({ invoices: invoicePromise });
}

export default function InvoiceView() {
  const invoicesData = useLoaderData();
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [invoiceCount, setInvoiceCount] = useState(0);

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
    const invoiceFilteredCount = filteredInvoices?.length ?? 0;
    setInvoiceCount(invoiceFilteredCount);
  };

  const browserWidth = useLiveBrowserWidth();

  const smallInvoiceCount = `${invoiceCount} ${
    filterStatus ? (filterStatus === 'all' ? '' : `${filterStatus} `) : ''
  }invoices`;

  const largeInvoiceCount = `There ${
    invoiceCount === 1 ? 'is' : 'are'
  } ${invoiceCount} ${filterStatus === 'all' ? 'total' : filterStatus} invoice${
    invoiceCount !== 1 ? 's' : ''
  }`;

  return (
    <section className={`home-page`}>
      <section className='subheading'>
        <div className='subheading-title'>
          <h3>Invoices</h3>
          <p>{browserWidth < 768 ? smallInvoiceCount : largeInvoiceCount}</p>
        </div>
        <div className='subheading-interact'>
          <div className='filter-wrapper'>
            <p className='filter-btn' onClick={toggleFilterModal}>
              {browserWidth < 768 ? 'Filter' : 'Filter by status'}
              <img src={down} alt='down arrow' />
            </p>
            {showFilterModal && (
              <FilterSelect
                setFilterStatus={setFilterStatus}
                handleCloseModal={handleCloseFilterModal}
              />
            )}
            {showAddForm && (
              <div className='add-modal'>
                <InvoiceForm toggleAddForm={toggleAddForm} />
              </div>
            )}
          </div>

          <button className='add-btn' onClick={toggleAddForm}>
            <img src={add} alt='Add' />
            {browserWidth < 768 ? 'New' : 'New Invoice'}
          </button>
        </div>
      </section>
      <Suspense
        fallback={<>
          <div className="loading-message">
            <p>Our project uses the free plan from render.com, 
            which may result in longer loading times, 
            especially after periods of inactivity. 
            We appreciate your understanding and patience</p>
          </div>
          <div class='loading-spinner'>
            <div class='spinner'></div>
          </div>
          </>
        }
      >
        <Await resolve={invoicesData.invoices}>
          {(data) => {
            console.log('data', data);
            return (
              <InvoiceList
                invoices={data}
                filterStatus={filterStatus}
                onFilteredInvoices={handleFilteredInvoices}
              />
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
}
