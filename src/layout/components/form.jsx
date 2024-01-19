const validateSchema = (values) => {
  const errors = {
    senderAddress: {},
    clientAddress: {},
  };
  if (values.senderAddress.street === '') {
    errors.senderAddress.street = 'Please enter a Street';
  }
  if (values.senderAddress.city === '') {
    errors.senderAddress.city = 'Please enter a City';
  }
  if (values.senderAddress.postCode === '') {
    errors.senderAddress.postCode = 'Please enter a Postcode';
  }
  if (values.senderAddress.country === '') {
    errors.senderAddress.country = 'Please enter a Country';
  }
  if (values.clientAddress.street === '') {
    errors.clientAddress.street = 'Please enter a Street';
  }
  if (values.clientAddress.city === '') {
    errors.clientAddress.city = 'Please enter a City';
  }
  if (values.clientAddress.postCode === '') {
    errors.clientAddress.postCode = 'Please enter a Postcode';
  }
  if (values.clientAddress.country === '') {
    errors.clientAddress.country = 'Please enter a Country';
  }

  if (values.items.length < 1) {
    errors.items = 'There needs to be at least one Item';
  }

{({push, remove}) => (
  <section className='invoice-items'>
    {
      values.items.map((item, index) => (
        <div className='item' key={index}>

          <label htmlFor={`items[${index}].name`}>Item Name</label>
          <Field 
            type='text' 
            name={`items[${index}].name`} />

          <label htmlFor={`items[${index}].quantity`}> Qty. </label>
          <Field 
            type='number' 
            name={`items[${index}].quantity`}/>

          <label htmlFor={`items[${index}].price`}>Price</label>
          <Field 
            type='number' 
            name={`items[${index}].price`}/>

          <label htmlFor={`total`}>Total</label>
          <span name='total'>{(item.quantity * item.price).toString()}</span>

          <img src={trash} onClick={() => console.log(errors)}/>
        </div>
      ))}

    <button
      type='button'
      className='add-btn'
      onClick={() => push({ name: '', quantity: 0, price: 0})}
    >
      Add New Item
    </button>
  </section>
)}}