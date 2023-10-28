import '../../sass/componets_stying/_invoiceForm.scss';
import trash from '../../assets/icon-delete.svg';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createNewInvoiceObj,
  generateDate,
} from './Utility';
import { createInvoice, editInvoice } from '../../api';
export default function InvoiceForm(props) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      createdAt: props.currentInvoice?.createdAt ?? new Date(),
      description: props.currentInvoice?.description ?? '',
      paymentTerms: props.currentInvoice?.paymentTerms ?? 7,
      clientName: props.currentInvoice?.clientName ?? '',
      clientEmail: props.currentInvoice?.clientEmail ?? '',
      senderAddress: {
        street: props.currentInvoice?.senderAddress?.street ?? '',
        city: props.currentInvoice?.senderAddress?.city ?? '',
        postCode: props.currentInvoice?.senderAddress?.postCode ?? '',
        country: props.currentInvoice?.senderAddress?.country ?? '',
      },
      clientAddress: {
        street: props.currentInvoice?.clientAddress?.street ?? '',
        city: props.currentInvoice?.clientAddress?.city ?? '',
        postCode: props.currentInvoice?.clientAddress?.postCode ?? '',
        country: props.currentInvoice?.clientAddress?.country ?? '',
      },
      items: props.currentInvoice?.items ?? [
        {
          name: '',
          quantity: 0,
          price: 0,
        },
      ],
    },
    mode: 'onChange',
  });
  const { register, control, handleSubmit, formState, getValues, watch } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data, mode) => {
    console.log(data);
    const submittedData = data;

    if (mode === 'draft') {
      if (submittedData.createdAt) {
        submittedData.createdAt = generateDate(submittedData.createdAt);
      }
      submittedData.status = 'draft';
      const draftInvoice = createNewInvoiceObj(submittedData);
      console.log('draft', draftInvoice);
      await createInvoice(draftInvoice);
      navigate('/');
      props.toggleAddForm();
      return;
    }

    if (props.toggleEditForm) {
      const updatedInvoice = createNewInvoiceObj(submittedData, props.currentInvoice.id, props.currentInvoice.paymentTerms);
      await editInvoice(props.currentInvoice._id, updatedInvoice);
      navigate(`/view/${props.currentInvoice._id}`);
      props.toggleEditForm();
      return;
    }

    const newInvoice = createNewInvoiceObj(submittedData);
    await createInvoice(newInvoice);
    navigate('/');
    props.toggleAddForm();
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleDraft = () => {
    onSubmit(getValues(), 'draft');
  };

  const AddFooter = () => {
    return (
      <section className='add-footer'>
        <button
          type='button'
          className='variant-1'
          onClick={() => props.toggleAddForm()}
        >
          Discard
        </button>
        <button
          type='button'
          className='variant-4'
          disabled={isSubmitting}
          onClick={() => handleDraft()}
        >
          Save as Draft
        </button>
        <button className='variant-3' disabled={isSubmitting}>
          Save & Send
        </button>
      </section>
    );
  };
  const EditFooter = () => {
    return (
      <section className='edit-footer'>
        <button
          type='button'
          className='variant-1'
          onClick={() => props.toggleEditForm()}
        >
          Discard
        </button>
        <button className='variant-4'>Save Changes</button>
      </section>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <h3>
          {props.currentInvoice ? (
            <>
              Edit <span>#</span>
              {props.currentInvoice.id}
            </>
          ) : (
            'New Invoice'
          )}
        </h3>
      </div>
      <div className='invoice-form'>
        <legend>Bill From</legend>
        <section className='sender-info'>
          <div className='input-label-pair'>
            <label htmlFor='senderAddress.street'>Street Address</label>
            <input
              type='text'
              id='senderAddress.street'
              {...register('senderAddress.street', {
                required: {
                  value: true,
                  message: 'Street Name is Required',
                },
              })}
            />
            <p className='errors'>{errors.senderAddress?.street?.message}</p>
          </div>
          <div className='input-label-pair'>
            <label htmlFor='senderAddress.city'>City</label>
            <input
              type='text'
              id='senderAddress.city'
              {...register('senderAddress.city', {
                required: {
                  value: true,
                  message: 'City Name is Required',
                },
              })}
            />
            <p className='errors'>{errors.senderAddress?.city?.message}</p>
          </div>
          <div className='input-label-pair'>
            <label htmlFor='senderAddress.postCode'>Postal Code</label>
            <input
              type='text'
              id='senderAddress.postCode'
              {...register('senderAddress.postCode', {
                required: {
                  value: true,
                  message: 'Postal Code is Required',
                },
              })}
            />
            <p className='errors'>{errors.senderAddress?.postCode?.message}</p>
          </div>
          <div className='input-label-pair'>
            <label htmlFor='senderAddress.country'>Country</label>
            <input
              type='text'
              id='senderAddress.country'
              {...register('senderAddress.country', {
                required: {
                  value: true,
                  message: 'Country is Required',
                },
              })}
            />
            <p className='errors'>{errors.senderAddress?.country?.message}</p>
          </div>
        </section>
        <legend>Bill To</legend>
        <section className='bill-to-info'>
          <div className='input-label-pair'>
            <label htmlFor='clientName'>Client's Name</label>
            <input
              type='text'
              id='clientName'
              {...register('clientName', {
                required: {
                  value: true,
                  message: 'Please add a name',
                },
              })}
            />
            <p className='errors'>{errors.clientName?.message}</p>
          </div>
          <div className='input-label-pair'>
            <label htmlFor='clientEmail'>Client's Email</label>
            <input
              type='text'
              id='clientEmail'
              {...register('clientEmail', {
                required: {
                  value: true,
                  message: 'Please add an email',
                },
              })}
            />
            <p className='errors'>{errors.clientEmail?.message}</p>
          </div>

          <div className='input-label-pair'>
            <label htmlFor='clientAddress.street'>Street Address</label>
            <input
              type='text'
              id='clientAddress.street'
              {...register('clientAddress.street', {
                required: {
                  value: true,
                  message: 'Street Name is Required',
                },
              })}
            />
            <p className='errors'>{errors.clientAddress?.street?.message}</p>
          </div>
          <div className='input-label-pair'>
            <label htmlFor='clientAddress.city'>City</label>
            <input
              type='text'
              id='clientAddress.city'
              {...register('clientAddress.city', {
                required: {
                  value: true,
                  message: 'City Name is Required',
                },
              })}
            />
            <p className='errors'>{errors.clientAddress?.city?.message}</p>
          </div>
          <div className='input-label-pair'>
            <label htmlFor='clientAddress.postCode'>Postal Code</label>
            <input
              type='text'
              id='clientAddress.postCode'
              {...register('clientAddress.postCode', {
                required: {
                  value: true,
                  message: 'Postal Code is Required',
                },
              })}
            />
            <p className='errors'>{errors.clientAddress?.postCode?.message}</p>
          </div>
          <div className='input-label-pair'>
            <label htmlFor='clientAddress.country'>Country</label>
            <input
              type='text'
              id='clientAddress.country'
              {...register('clientAddress.country', {
                required: {
                  value: true,
                  message: 'Country is Required',
                },
              })}
            />
            <p className='errors'>{errors.clientAddress?.country?.message}</p>
          </div>
        </section>
        <section className='additional-info'>
          <div className='input-label-pair'>
            <label htmlFor='createdAt'>Invoice Date</label>
            <input
              type='date'
              id='createdAt'
              {...register('createdAt', {
                required: {
                  value: true,
                  message: 'Please add a date',
                },
              })}
            />
            <p className='errors'>{errors.createdAt?.message}</p>
          </div>

          <div className='input-label-pair'>
            <label htmlFor='paymentTerms'>Payment Terms</label>
            <select id='paymentTerms' {...register('paymentTerms')}>
              <option value='1'>Net 1 Day</option>
              <option value='7'>Net 7 Days</option>
              <option value='14'>Net 14 Days</option>
              <option value='30'>Net 30 Days</option>
            </select>
          </div>

          <div className='input-label-pair'>
            <label htmlFor='description'>Project Description</label>
            <input type='text' id='description' {...register('description')} />
            <p className='errors'>{errors.description?.message}</p>
          </div>
        </section>
        <legend>Item List</legend>
        <section className='invoice-items'>
          {fields.map((field, index) => (
            <div className='item' key={field.id}>
              <div className='input-label-pair'>
                <label htmlFor={`items[${index}].name`}>Item Name</label>
                <input
                  type='text'
                  {...register(`items.${index}.name`, {
                    required: {
                      value: true,
                      message: 'Please add a name',
                    },
                  })}
                />
                <p className='errors'>
                  {errors?.items?.[index]?.name?.message}
                </p>
              </div>
              <div className='input-label-pair'>
                <label htmlFor={`items[${index}].quantity`}> Qty. </label>
                <input type='number' {...register(`items.${index}.quantity`)} />
              </div>
              <div className='input-label-pair'>
                <label htmlFor={`items[${index}].price`}>Price</label>
                <input
                  type='number'
                  {...register(`items.${index}.price`, {
                    required: {
                      value: true,
                      message: 'Price is required',
                    },
                    validate: {
                      isNumber: (fieldValue) => {
                        return (
                          typeof fieldValue === 'number' ||
                          'Please enter a number'
                        );
                      },
                    },
                    valueAsNumber: true,
                  })}
                />
                <p className='errors'>
                  {errors?.items?.[index]?.price?.message}
                </p>
              </div>
              <div className='input-label-pair'>
                <label htmlFor='total'>Total</label>
                <p className='total' name='total'>
                  {typeof (
                    watch(`items.${index}.price`) *
                    watch(`items.${index}.quantity`)
                  ) === 'number' &&
                  !isNaN(
                    watch(`items.${index}.price`) *
                      watch(`items.${index}.quantity`)
                  )
                    ? watch(`items.${index}.price`) *
                      watch(`items.${index}.quantity`)
                    : 0}
                </p>
              </div>
              <img
                src={trash}
                alt='trash can icon'
                onClick={() => remove(index)}
              />
            </div>
          ))}
        </section>
        <button
          type='button'
          className='add-items-btn'
          onClick={() => append({ name: '', quantity: 0, price: 0 })}
        >
          + Add New Item
        </button>
      </div>
      <div className='invoice-form-accent'></div>
      {!props.currentInvoice ? <AddFooter /> : <EditFooter />}
    </form>
  );
}
