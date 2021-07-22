import React, {useState} from 'react'
import FormLogin from './FormLogin.js'
import FormSuccess from './FormSuccess'
import './Form.css'


const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() 
    {
        setIsSubmitted(true);
    }
    return (
        <>
        <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='images/img-2.jpg' alt='spaceship' />
        </div>
        {!isSubmitted ? (
          <FormLogin submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
        </>       
    )
}

export default Form
