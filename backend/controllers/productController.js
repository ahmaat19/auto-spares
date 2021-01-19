import asyncHandler from 'express-async-handler'
import ProductModel from '../models/productModel.js'

export const getProducts = asyncHandler(async (req, res) => {
  const product = await ProductModel.find({}).sort({ createdAt: -1 })
  res.json(product)
})

export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, price, countInStock } = req.body
  const user = req.user.id

  const product = new ProductModel({
    name,
    brand,
    category,
    price,
    countInStock,
    user,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, price, countInStock } = req.body
  const user = req.user.id

  const product = await ProductModel.findById(req.params.id)

  if (product) {
    product.name = name
    product.brand = brand
    product.category = category
    product.price = price
    product.countInStock = countInStock
    product.user = user

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
