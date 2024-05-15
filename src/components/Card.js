import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export const Card = (props) => {
  let dispatch = useDispatchCart()
  let data = useCart()
  const priceRef = useRef()
  let options = props.foodOptions
  let priceOption = Object.keys(options)

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(priceOption[0] || '')
  const [finalPrice, setFinalPrice] = useState(
    quantity * parseInt(options[size] || 0)
  )

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item
        break
      }
    }
    if (food) {
      // console.log(food, 'fodododododoodododoododoodo')
      if (food.size === size) {
        await dispatch({
          type: 'UPDATE',
          id: props.foodItem._id,
          quantity: quantity,
          price: finalPrice,
        })
        return
      } else if (food.size !== size) {
        console.log(food.size, size, 'this is 35th......')
        await dispatch({
          type: 'ADD',
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          quantity: quantity,
          size: size,
        })
        return
      }
      await dispatch({
        type: 'ADD',
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        quantity: quantity,
        size: size,
      })
    }
  }

  useEffect(() => {
    setFinalPrice(quantity * parseInt(options[size] || 0))
  }, [quantity, size, options])

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: '18rem', maxHeight: '360px' }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: '120px', objectFit: 'fill' }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">{props.foodItem.description}</p>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  )
                })}
              </select>
              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOption.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  )
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
            <hr />
            <button
              className={'btn btn-success justify-center ms-2'}
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
