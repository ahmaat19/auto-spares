import asyncHandler from 'express-async-handler'
import OrderModel from '../models/orderModel.js'

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    remain,
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
      remain,
      mobile,
      paidAmount,
      discountAmount,
      totalPrice,
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

// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.remain = true
//     order.paidAt = Date.now()
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     }
//     const updatedOrder = await order.save()
//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// const getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user._id })
//   res.json(orders)
// })

// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   console.log(req.params.id)
//   const order = await Order.findById(req.params.id)

//   if (order) {
//     order.isDelivered = true
//     order.deliveredAt = Date.now()
//     const updatedOrder = await order.save()
//     res.json(updatedOrder)
//   } else {
//     res.status(404)
//     throw new Error('Order not found')
//   }
// })

// export {
//   addOrderItems,
//   getOrderById,
//   updateOrderToPaid,
//   getMyOrders,
//   getOrders,
//   updateOrderToDelivered,
// }
