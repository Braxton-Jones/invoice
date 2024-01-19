import '../../sass/componets_stying/_invoiceForm.scss';
import trash from '../../assets/icon-delete.svg';
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';

export default function FormFields() {
  const validateSchema = Yup.object().shape({
    description: Yup.string(),
    paymentTerms: Yup.number().required(),
    clientName: Yup.string().required('Please add a name'),
    clientEmail: Yup.string()
      .email('- Invalid email.')
      .required('Please add an email'),
    createdAt: Yup.date().required('Please add a date'),
    senderAddress: Yup.object().shape({
      street: Yup.string().required('Please add a street name'),
      city: Yup.string().required('Please add a city'),
      postCode: Yup.string().required('Please add a postCode'),
      country: Yup.string().required('Please add a country'),
    }),
    clientAddress: Yup.object().shape({
      street: Yup.string().required('Please add a street name'),
      city: Yup.string().required('Please add a city'),
      postCode: Yup.string().required('Please add a postCode'),
      country: Yup.string().required('Please add a country'),
    }),
    items: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Please add a name'),
          quantity: Yup.number()
            .typeError('Invalid input.')
            .min(1, 'Item quantity cannot be below 1'),
          price: Yup.number().typeError('Invalid input.'),
        })
      )
      .min(1, 'An item must be added.'),
  });

  const initialValues = {
    description: '',
    paymentTerms: 7,
    clientName: '',
    clientEmail: '',
    createdAt: '',
    senderAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    items: [
      {
        name: '',
        quantity: 0,
        price: '',
      },
    ],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors }) => (
        <Form>
          <button type='button' onClick={() => console.log(errors)}>
            Errors
          </button>
          <section className='sender-info'>
            <legend>Bill From</legend>
            <div className='input-label-pair'>
              <label htmlFor='senderAddress.street'>Street Address</label>
              <ErrorMessage name='senderAddress.street' />
              <Field
                type='text'
                id='senderAddress.street'
                name='senderAddress.street'
              />
            </div>
            <div className='input-label-pair'>
              <label htmlFor='senderAddress.city'>City</label>
              <ErrorMessage name='senderAddress.city' />
              <Field
                type='text'
                id='senderAddress.city'
                name='senderAddress.city'
              />
            </div>
            <div className='input-label-pair'>
              <label htmlFor='senderAddress.postCode'>Postal Code</label>
              <ErrorMessage name='senderAddress.postCode' />
              <Field
                type='text'
                id='senderAddress.postCode'
                name='senderAddress.postCode'
              />
            </div>
            <div className='input-label-pair'>
              <label htmlFor='senderAddress.country'>Country</label>
              <ErrorMessage name='senderAddress.country' />
              <Field
                type='text'
                id='senderAddress.country'
                name='senderAddress.country'
              />
            </div>
          </section>
          <section className='bill-to-info'>
            <legend>Bill To</legend>
            <div className='input-label-pair'>
              <label htmlFor='clientAddress.street'>Street Address</label>
              <ErrorMessage name='clientAddress.street' />
              <Field
                type='text'
                id='clientAddress.street'
                name='clientAddress.street'
              />
            </div>
            <div className='input-label-pair'>
              <label htmlFor='clientAddress.city'>City</label>
              <ErrorMessage name='clientAddress.city' />
              <Field
                type='text'
                id='clientAddress.city'
                name='clientAddress.city'
              />
            </div>
            <div className='input-label-pair'>
              <label htmlFor='clientAddress.postCode'>Postal Code</label>
              <ErrorMessage name='clientAddress.postCode' />
              <Field
                type='text'
                id='clientAddress.postCode'
                name='clientAddress.postCode'
              />
            </div>
            <div className='input-label-pair'>
              <label htmlFor='clientAddress.country'>Country</label>
              <ErrorMessage name='clientAddress.country' />
              <Field
                type='text'
                id='clientAddress.country'
                name='clientAddress.country'
              />
            </div>

            <div className='input-label-pair'>
              <label htmlFor='createdAt'>Invoice Date</label>
              <Field type='date' id='createdAt' name='createdAt' />
            </div>

            <div className='input-label-pair'>
              <label htmlFor='paymentTerms'>Payment Terms</label>
              <Field as='select' id='paymentTerms' name='paymentTerms'>
                <option value='1'>Net 1 Day</option>
                <option value='7'>Net 7 Days</option>
                <option value='14'>Net 14 Days</option>
                <option value='30'>Net 30 Days</option>
              </Field>
            </div>
            <div className='input-label-pair'>
              <label htmlFor='description'>Project Description</label>
              <Field type='text' id='description' name='description' />
            </div>
          </section>
          <legend>Item List</legend>
          <ErrorMessage name='items' />
          <FieldArray name='items'>
            {({ push, remove }) => (
              <section className='invoice-items'>
                {values.items.map((item, index) => (
                  <div className='item' key={index}>
                    <label htmlFor={`items[${index}].name`}>Item Name</label>
                    <Field type='text' name={`items[${index}].name`} />

                    <label htmlFor={`items[${index}].quantity`}> Qty. </label>
                    <Field type='number' name={`items[${index}].quantity`} />

                    <label htmlFor={`items[${index}].price`}>Price</label>
                    <Field type='number' name={`items[${index}].price`} />

                    <label htmlFor={`total`}>Total</label>
                    <span name='total'>
                      {(item.quantity * item.price).toString()}
                    </span>

                    <img src={trash} onClick={() => console.log(errors)} />
                  </div>
                ))}

                <button
                  type='button'
                  className='add-btn'
                  onClick={() => push({ name: '', quantity: 0, price: 0 })}
                >
                  Add New Item
                </button>
              </section>
            )}
          </FieldArray>

          <button type='submit'>Hello</button>
        </Form>
      )}
    </Formik>
  );
}
