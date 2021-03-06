import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProduct } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import Pagination from '../components/Pagination'

const HomeScreen = ({ match }) => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filterOrder =
    products &&
    products.filter((prod) =>
      prod.name.toLowerCase().includes(search.toLowerCase())
    )

  const currentItems =
    filterOrder && filterOrder.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = products && Math.ceil(products.length / itemsPerPage)

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search by product name'
              name='search'
              min='0'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-describedby='basic-addon2'
            />
            <span className='input-group-text' id='basic-addon2'>
              <FaSearch />
            </span>
          </div>
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
                {currentItems &&
                  currentItems.map((product) => (
                    <tr
                      key={product._id}
                      style={{ color: `${product.countInStock < 5 && 'red'}` }}
                    >
                      <td>
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
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
          <div className='d-flex justify-content-center'>
            <Pagination
              setCurrentPage={setCurrentPage}
              totalItems={totalItems}
              arrayLength={products && products.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
