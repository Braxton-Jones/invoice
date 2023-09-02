import { Form } from 'react-router-dom';
import '../../sass/componets/_form.scss';

export default function InvoiceForm(props) {
  console.log('this', props.invoiceInfo);
  return (
    <Form className='invoice-form'>
      <fieldset>
        {/* Section 1: Bill From */}
        <legend>Bill From</legend>
        <div className='sender-info'>
          <div className='input-label-pair'>
            <label htmlFor='address'>Street Address</label>
            <input type='text' id='address' />
          </div>
          <div className='input-label-pair'>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' />
          </div>
          <div className='input-label-pair'>
            <label htmlFor='postalCode'>Postal Code</label>
            <input type='text' id='postalCode' />
          </div>
          <div className='input-label-pair'>
            <label htmlFor='country'>Country</label>
            <input type='text' id='country' />
          </div>
        </div>
      </fieldset>
      <fieldset>
        {/* Section 2: Bill To */}
        <legend>Bill To</legend>
        <div className='bill-to-info'>
          <div className='input-label-pair'>
            <label htmlFor='name'>Client's Name</label>
            <input type='text' id='name' />
          </div>

          <div className='input-label-pair'>
            <label htmlFor='email'>Client's Email</label>
            <input type='text' id='email' />
          </div>

          <div className='input-label-pair'>
            <label htmlFor='billingAddress'>Street Address</label>
            <input type='text' id='billingAddress' />
          </div>

          <div className='input-label-pair'>
            <label htmlFor='billingCity'>City</label>
            <input type='text' id='billingCity' />
          </div>

          <div className='input-label-pair'>
            <label htmlFor='post'>Post Code</label>
            <input type='text' id='post' />
          </div>

          <div className='input-label-pair'>
            <label htmlFor='county'>County</label>
            <input type='text' id='county' />
          </div>

          <div className='input-label-pair'>
            <label htmlFor='invoiceDate'>Invoice Date</label>
            <input type='date' id='invoiceDate' />
          </div>

          <div className='input-label-pair'>
            <label htmlFor='paymentPlan'>Payment Terms</label>
            <select id='paymentPlan'>
              <option value='1'>Net 1 Day</option>
              <option value='7'>Net 7 Days</option>
              <option value='14'>Net 14 Days</option>
              <option value='30'>Net 30 Days</option>
            </select>
          </div>

          <div className='input-label-pair'>
            <label htmlFor='description'>Project Description</label>
            <input type='text' id='description' />
          </div>
        </div>
      </fieldset>
      <fieldset>
        {/* Section 3: Item List */}
        <legend>Item List</legend>
        <div className='item-list'>
          {/* You can dynamically add and delete items here */}
          {/* Each item can have its own input fields */}
        </div>
        <button className='add-btn'>+ Add New Item</button>
      </fieldset>
    </Form>
  );
}
