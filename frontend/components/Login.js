import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useInput } from '../hooks'

const BASE_URL = 'http://localhost:9009/acme/auth'

export default function Login() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const username = useInput('username')
  const password = useInput('password')
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const onUsernameChange = e => setUsername(e.target.value)
  // const onPasswordChange = e => setPassword(e.target.value)
  const onSubmit = async e => {
    e.preventDefault()
    const payload = {
      username: username.value,
      password: password.value,
    }
    try {
      const res = await axios.post(`${BASE_URL}/login`, payload)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      localStorage.removeItem('token')
      setMessage(err.response?.data?.message || 'Something bad happened')
    }
  }
  return (
    <div className="screen">
      <h3>Login Page</h3>
      {message}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          {...username}
          // value={username}
          // onChange={onUsernameChange}
        />
        <input
          type="password"
          placeholder="password"
          {...password}
          // value={password}
          // onChange={onPasswordChange}
        />
        <button>Login</button>
      </form>
    </div>
  )
}
