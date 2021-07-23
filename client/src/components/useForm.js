import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:1337/api/`
})

// const api = axios.create({
//   baseURL: ` https://wardrobev3.herokuapp.com/api/`
// })

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  const history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    try{
    const response = await api({
        url:'/credentials/login',
        mode: 'no-cors',
        method: 'POST',
        data: {
        email: values.email.toLowerCase(),
        password: values.password
    }
  })
  if(response.status === 200){
    localStorage.setItem('sessionId', response.data.sessionId);
    localStorage.setItem('sessionExpires', Date.now() + 360000000);

    console.log(localStorage.getItem('sessionId'));
    history.push('/Userpage');
  }else{
  console.log('error',response.data);
  }
}catch(e){
console.log(e)
}
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;