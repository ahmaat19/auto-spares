import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders, updateOrder } from '../actions/orderActions'
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import OrderEditScreen from './OrderEditScreen'
import Pagination from '../components/Pagination'

const OrderScreen = () => {
  const [mobile, setMobile] = useState('')
  const [paidAmount, setPaidAmount] = useState(0.0)
  const [discountAmount, setDiscountAmount] = useState(0.0)
  const [totalPrice, setTotalPrice] = useState([])
  const [orderId, setOrderId] = useState(null)

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { orders, error, loading } = orderList

  const orderUpdate = useSelector((state) => state.orderUpdate)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = orderUpdate

  //   Calculate prices
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const formCleanHandler = () => {
    setMobile('')
    setPaidAmount(0.0)
    setDiscountAmount(0.0)
    setTotalPrice([])
  }

  useEffect(() => {
    dispatch(getOrders())
    if (successUpdate) {
      formCleanHandler()
    }
  }, [dispatch, successUpdate])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch))
  }

  const editHandler = (e) => {
    setMobile(e.mobile)
    setPaidAmount(e.paidAmount)
    setDiscountAmount(e.discountAmount)
    setTotalPrice(e.orderItems)
    setOrderId(e._id)
  }

  const submitHandler = (e) => {
    // e.preventDefault()

    dispatch(
      updateOrder({
        mobile,
        paidAmount,
        discountAmount,
        _id: orderId,
      })
    )
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = orders && orders.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = orders && Math.ceil(orders.length / itemsPerPage)

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <h6 className='fw-light-fs-3'>Orders</h6>
          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped'>
              <thead>
                <tr>
                  <th>MOBILE</th>
                  <th>BALANCE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((order) => (
                    <tr
                      key={order._id}
                      style={{
                        color: `${
                          order.totalPrice -
                            order.paidAmount -
                            order.discountAmount !==
                            0 && 'red'
                        }`,
                      }}
                    >
                      <td>{order.mobile}</td>
                      <td>
                        $
                        {addDecimal(
                          order.totalPrice -
                            order.paidAmount -
                            order.discountAmount
                        )}
                      </td>
                      <td>
                        <button
                          type='button'
                          onClick={() => deleteHandler(order._id)}
                          className='btn btn-danger btn-sm'
                        >
                          <FaTrash />
                        </button>

                        <button
                          type='button'
                          data-bs-toggle='modal'
                          data-bs-target='#editOrderModal'
                          className='btn btn-info btn-sm'
                          onClick={() => editHandler(order)}
                        >
                          <FaEdit />
                        </button>

                        <Link
                          to={`/order/${order._id}`}
                          className='btn btn-success btn-sm'
                        >
                          <FaPrint />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <OrderEditScreen
            submitHandler={submitHandler}
            mobile={mobile}
            discountAmount={discountAmount}
            paidAmount={paidAmount}
            orderItems={totalPrice}
            setMobile={setMobile}
            setDiscountAmount={setDiscountAmount}
            setPaidAmount={setPaidAmount}
            errorUpdate={errorUpdate}
            loadingUpdate={loadingUpdate}
            formCleanHandler={formCleanHandler}
            successUpdate={successUpdate}
          />
        </div>
      )}
      <div className='d-flex justify-content-center'>
        <Pagination
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
          arrayLength={orders && orders.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  )
}

export default OrderScreen
