import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders } from '../actions/orderActions'
import { listProduct } from '../actions/productActions'

const ReportScreen = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const {
    products,
    error: errorProducts,
    loading: loadingProducts,
  } = productList

  const orderList = useSelector((state) => state.orderList)
  const { orders, error: errorOrders, loading: loadingOrders } = orderList

  useEffect(() => {
    dispatch(listProduct())
    dispatch(getOrders())
  }, [dispatch, from, to])

  //   const filteredProducts = (e) => {
  //     products &&
  //       products.filter(
  //         (product) => product.createdAt >= from && product.createdAt <= to
  //       )
  //   }

  return (
    <>
      {loadingOrders || loadingProducts ? (
        <Loader />
      ) : errorOrders || errorProducts ? (
        <Message variant='danger'>{(errorProducts, errorOrders)}</Message>
      ) : (
        <>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
              <label htmlFor='from'>From</label>
              <input
                type='date'
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                name='from'
                className='form-control'
              />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
              <label htmlFor='to'>To</label>
              <input
                type='date'
                value={to}
                onChange={(e) => setTo(e.target.value)}
                name='to'
                className='form-control'
              />
            </div>
          </div>
          <div className='row'>
            <div className='mx-auto col-lg-6 col-md-6 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header'>Products</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    Products In Stock: {products && products.length}
                  </li>
                  <li className='list-group-item'>
                    Products Price: $
                    {products &&
                      products
                        .reduce(
                          (acc, item) => acc + item.countInStock * item.price,
                          0
                        )
                        .toFixed(2)}
                  </li>
                </ul>
              </div>
            </div>

            <div className='mx-auto col-lg-6 col-md-6 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header'>Orders</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>No. of Orders: 6,321</li>
                  <li className='list-group-item'>
                    No. of Orders Price: $98,321
                  </li>
                  <li className='list-group-item'>
                    No. of Orders Loan: $-7,321
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ReportScreen
