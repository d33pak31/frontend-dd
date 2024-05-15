import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate() // Move inside the component

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:4000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      const json = await response.json()
      console.log(json)

      if (!json.success) {
        alert('Enter valid details')
        return
      } else {
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem('authToken', json.authToken)
        navigate('/')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while creating the user')
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
            We'll never share your email with anyone else.
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            New User
          </Link>
        </form>
      </div>
    </div>
  )
}
