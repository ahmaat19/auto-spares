import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders } from '../actions/orderActions'
import ReactPaginate from 'react-paginate'
import { FaEdit, FaPrint, FaTrash } from 'react-icons/fa'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import OrderEditScreen from './OrderEditScreen'

const OrderScreen = () => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { orders, error, loading } = orderList

  //   Calculate prices
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch))
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
          <OrderEditScreen />
        </div>
      )}
      <div className='d-flex justify-content-center'>
        <ReactPaginate
          previousLabel='previous'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextLabel='next'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          activeClassName='page-item active'
          activeLinkClassName={'page-link'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={totalItems && totalItems}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={(e) => setCurrentPage(e.selected + 1)}
          containerClassName={'page pagination'}
        />
      </div>
    </>
  )
}

export default OrderScreen
