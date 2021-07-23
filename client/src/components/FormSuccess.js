import React from 'react';
import './Form.css';
import { useHistory } from 'react-router-dom';

const FormSuccess = () => {
  const history = useHistory();
  history.push('/Userpage');
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>We have received your request!</h1>
      <img className='form-img-2' src='img/img-3.jpg' alt='success-image' />
    </div>
  );
};

export default FormSuccess;