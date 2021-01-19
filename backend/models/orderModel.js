import mongoose from 'mongoose'

const orderScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    remain: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discountAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const OrderModel = mongoose.model('Order', orderScheme)
export default OrderModel
