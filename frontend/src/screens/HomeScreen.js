import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProduct } from '../actions/productActions'
import { Link } from 'react-router-dom'

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='table-responsive'>
          <table className='table table-sm hover  border-success '>
            <thead>
              <tr>
                <th>NAME</th>
                <th>Stock</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </td>
                    <td>{product.countInStock}</td>
                    <td>${product.price}</td>

                    <td>
                      <Link
                        to={`/product/${product._id}`}
                        className='btn btn-success btn-sm'
                      >
                        View Detail
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default HomeScreen
