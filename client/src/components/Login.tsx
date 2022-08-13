import React from 'react'
import TextInput from './TextInput'
import * as Yup from 'yup'
import FormContainer from './FormContainer'

export default function Login() {
  return (
    <FormContainer
      title='Login'
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required field'),
        password: Yup.string().required('Required field')
      })}
      onSubmit={values => console.log('Submit login with values', values)}
      submitText='Login'
    >
      <TextInput label='username' name='username' placeholder='username' type='text' />
      <TextInput label='password' name='password' placeholder='password' type='password' />
    </FormContainer>
  )
}
