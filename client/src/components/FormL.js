import React, {useState} from 'react'
import FormLogin from './formLogin.js'
import FormSuccess from './formSuccess'
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
