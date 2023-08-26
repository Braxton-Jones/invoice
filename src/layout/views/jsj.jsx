<section className='invoice-view'>

          {/* Header */}

          <div className='invoice-header'>

            <h4 className='invoice-id'>

              <span>#</span>

              {invoiceData.id}

            </h4>

            <p className='invoice-description'>{invoiceData.description}</p>

          </div>

  

          {/* Sender Address */}

          <div className='address sender-address'>

            <p className='address-line'>

              {invoiceData.senderAddress.street || 'No address provided'}

            </p>

            <p className='address-line'>

              {invoiceData.senderAddress.city || 'No city provided'}

            </p>

            <p className='address-line'>

              {invoiceData.senderAddress.postCode || 'No postal code provided'}

            </p>

            <p className='address-line'>

              {invoiceData.senderAddress.country || 'No country provided'}

            </p>

          </div>

  

          {/* Invoice Data */}

          <div className='invoice-details'>

            <div className='date-and-due'>

              <div className='invoice-date'>

                <p className='title'>Invoice Data</p>

                <p className='data'>{invoiceData.createdAt}</p>

              </div>

              <div className='payment-due'>

                <p className='title'>Payment Due</p>

                <p className='data'>{invoiceData.paymentDue}</p>

              </div>

            </div>

            <div className='bill-to'>

              <p className='title'>Bill To</p>

              <p className='client-name data'>{invoiceData.clientName}</p>

              <div className='address client-address'>

                <p className='address-line'>

                  {invoiceData.clientAddress.street || 'No address provided'}

                </p>

                <p className='address-line'>

                  {invoiceData.clientAddress.city || 'No city provided'}

                </p>

                <p className='address-line'>

                  {invoiceData.clientAddress.postCode ||

                    'No postal code provided'}

                </p>

                <p className='address-line'>

                  {invoiceData.clientAddress.country || 'No country provided'}

                </p>

              </div>

            </div>

          </div>

  

          {/* Email */}

          <div className='email'>

            <p className='title'>Sent to</p>

            <p className='client-email data'>

              {invoiceData.clientEmail || 'No email found'}

            </p>

          </div>

  

          {/* Items */}

          <section className='invoice-items'>

            {invoiceData.items.map((item) => {

              return (

                <div className='item'>

                  <div className='item-details'>

                    <p className='item-name'>{item.name}</p>

                    <p className='item-quantity'>

                      {item.quantity} x $ {parseFloat(item.price).toFixed(2)}

                    </p>

                  </div>

                  <div className='item-cost'>

                    <p>$ {parseFloat(item.total).toFixed(2)}</p>

                  </div>

                </div>

              );

            })}

            <div className='total'>

              <p>Grand Total</p>

              <p className='invoice-total'>

                $ {parseFloat(invoiceData.total).toFixed(2)}

              </p>

            </div>

          </section>

        </section>