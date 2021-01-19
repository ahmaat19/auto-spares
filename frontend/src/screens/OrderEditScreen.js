import React from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderEditScreen = ({
  formCleanHandler,
  submitHandler,
  message,
  successUpdate,
  errorUpdate,
  loadingUpdate,
  loading,
  error,
}) => {
  return (
    <div>
      <div
        className='modal fade'
        id='editOrderModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='editOrderModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='editOrderModalLabel'>
                Edit Order
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {message && <Message variant='danger'>{message}</Message>}
              {successUpdate && (
                <Message variant='success'>
                  Order has been updated successfully.
                </Message>
              )}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {loadingUpdate && <Loader />}

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <form onSubmit={submitHandler}>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                      onClick={formCleanHandler}
                    >
                      Close
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderEditScreen
