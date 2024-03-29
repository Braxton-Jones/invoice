import React, { useState, Suspense, useEffect, useRef } from 'react';
import { fetchInvoices } from '../../api';
import add from '../../assets/icon-plus.svg';
import down from '../../assets/icon-arrow-down.svg';
import '../../sass/views_styling/_invoiceView.scss';
import InvoiceList from '../components/InvoiceList';
import FilterSelect from '../components/FilterSelect';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { useLiveBrowserWidth } from '../components/Utility';
import InvoiceForm from '../components/InvoiceForm';
import { gsap } from 'gsap';

export function loader() {
  const invoicePromise = fetchInvoices();
  return defer({ invoices: invoicePromise });
}

export default function InvoiceView() {
  const addModalRef = useRef(null);
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

  useEffect(() => {
    if(showAddForm === true) {
      gsap.to(addModalRef.current, {
        duration: 0.5,
        opacity: 1,
        ease: 'power4.out',
        x: 0
      })
    }else{
      gsap.to(addModalRef.current, {
        duration: 0.5,
        x: -100,
        opacity: 0,
        ease: 'power4.out',
        
      })
    }
  },[showAddForm])

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
                toggleFilterModal={toggleFilterModal}
              />
            )}
           <div className='add-modal' ref={addModalRef}>
                <InvoiceForm toggleAddForm={toggleAddForm} />
              </div>
          </div>

          <button className='add-btn' onClick={toggleAddForm}>
            <img src={add} alt='Add' />
            {browserWidth < 768 ? 'New' : 'New Invoice'}
          </button>
        </div>
      </section>
<Suspense
        fallback={<>
          <div class='loading-spinner'>
            <div class='spinner'></div>
          </div>
          </>
        }
      >
        <Await resolve={invoicesData.invoices}>
          {(data) => {
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
