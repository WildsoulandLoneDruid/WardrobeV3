import React, {useState} from 'react'
import FormSignUp from './formSignUp'
import FormSuccess from './formSuccess'
import { useHistory } from 'react-router-dom';
import './form.css'

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
          <FormSignUp submitForm={submitForm} />
        ) :
          <FormSuccess />
        }
      </div>
        </>       
    )
}

export default Form
