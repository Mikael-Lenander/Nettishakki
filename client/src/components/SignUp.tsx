import React from 'react'
import TextInput from './TextInput'
import FormContainer from './FormContainer'
import * as Yup from 'yup'

export default function SignUp() {
  return (
    <FormContainer
      title='Sign up to save your games'
      initialValues={{
        username: '',
        password: '',
        repeatPassword: ''
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, 'Username must be at least 3 characters long')
          .max(20, 'Username must be at most 20 characters long')
          .required('Required field')
          .matches(/^[A-Za-z0-9_-äö]+$/, 'Allowed charactes are letters, numbers, - and _'),
        password: Yup.string().min(5, 'Password must be at least 5 characters long').required('Required field'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
      })}
      onSubmit={values => console.log('Sign up with values', values)}
      submitText='Sign up'
    >
      <TextInput label='username' name='username' placeholder='username' type='text' />
      <TextInput label='password' name='password' placeholder='password' type='password' />
      <TextInput label='repeat password' name='repeatPassword' placeholder='Repeat password' type='password' />
    </FormContainer>
  )
}
