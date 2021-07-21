import React from 'react';
import { useHistory } from 'react-router-dom';

import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const initialState = {
  _id: "",
  fullName:"",
  email: [],
  security: [],
  wardrobe: [],
};

const sessionId = localStorage.getItem('sessionId');
const sessionExpires = Number(localStorage.getItem('sessionExpires'));


const FormLogin = ({ submitForm }) => {
  const history = useHistory();
  const { handleChange, handleSubmit,values, errors } = useForm(
    submitForm,
    validate
  );

  if (sessionId && Date.now() < sessionExpires) {
    history.push('/UserPage');
    return <div>You already have logged in</div>;
  }

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Welcome Back
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Log in
        </button>
      </form>
    </div>
  );
};

export default FormLogin;