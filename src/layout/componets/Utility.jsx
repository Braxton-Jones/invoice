import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children, onClose }) => {
  const portalroot = document.getElementById('portal-root');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !portalroot.contains(event.target) &&
        event.target.className !== 'filter-btn'
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(children, portalroot);
};
export default ModalPortal;

export function generateRandomId() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let randomId = '';

  for (let i = 0; i < 2; i++) {
    const randomLetter = letters.charAt(
      Math.floor(Math.random() * letters.length)
    );
    randomId += randomLetter;
  }

  for (let i = 0; i < 4; i++) {
    const randomNumber = numbers.charAt(
      Math.floor(Math.random() * numbers.length)
    );
    randomId += randomNumber;
  }

  return randomId;
}
export function generateFutureDate(date, days) {
  const start = new Date(date);
  const daysToPay = days;
  const end = new Date(start.setDate(start.getDate() + daysToPay));
  console.log('pre future', end);
  const futureDate = generateDate(end);
  console.log('future date', futureDate);
  return futureDate;
}

export function generateDate(date) {
  const inputDate = new Date(date);
  const day = inputDate.getDate().toString().padStart(2, '0');
  const month = inputDate.toLocaleString('en-US', { month: 'short' });
  const year = inputDate.getFullYear();
  return `${day} ${month} ${year}`;
}

export function createNewInvoiceObj(data) {
  const formattedData = {
    id: data.id,
    createdAt: data.createdAt ?? generateDate(new Date()),
    paymentDue: data.paymentDue,
    description: data.description,
    paymentTerms: data.paymentTerms,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    status: data?.status ?? 'pending',
    senderAddress: {
      street: data.senderAddress.street,
      city: data.senderAddress.city,
      postCode: data.senderAddress.postCode,
      country: data.senderAddress.country,
    },
    clientAddress: {
      street: data.clientAddress.street,
      city: data.clientAddress.city,
      postCode: data.clientAddress.postCode,
      country: data.clientAddress.country,
    },
    items: data.items.map((item) => ({
      name: item.name || '',
      quantity: item.quantity || 0,
      price: item.price || 0,
    })),
  };
  return formattedData;
}

export function successfulRequest(bool) {
  useEffect(() => {
    console.log('Hello');
  }, [bool]);
}

export function useLiveBrowserWidth() {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return browserWidth;
}
