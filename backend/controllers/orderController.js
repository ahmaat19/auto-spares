import asyncHandler from 'express-async-handler'
import OrderModel from '../models/orderModel.js'
import ProductModel from '../models/productModel.js'

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    mobile,
    paidAmount,
    discountAmount,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new OrderModel({
      orderItems,
      user: req.user._id,
      mobile,
      paidAmount,
      discountAmount,
      totalPrice,
    })

    order.orderItems.map(async (item) => {
      const product = await ProductModel.findById(item.product)
      product.countInStock = product.countInStock - Number(item.qty)
      product.save()
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({}).sort({ createdAt: -1 })
  res.json(orders)
})

export const updateOrder = asyncHandler(async (req, res) => {
  const { mobile, discountAmount, paidAmount } = req.body

  const order = await OrderModel.findById(req.params.id)

  if (order) {
    order.mobile = mobile
    order.discountAmount = discountAmount
    order.paidAmount = paidAmount

    const updatedOrder = await order.save()

    if (updatedOrder) {
      res.status(201).json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }

    res.status(201).json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  if (order) {
    order.orderItems.map(async (item) => {
      const product = await ProductModel.findById(item.product)
      product.countInStock = product.countInStock + Number(item.qty)
      product.save()
    })

    await order.remove()
    res.json({ message: 'Order removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
