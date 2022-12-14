import React from 'react'
import TextInput from './TextInput'
import * as Yup from 'yup'
import FormContainer from './FormContainer'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { login } from '../state/reducers/userReducer'

export default function Login() {
  const dispatch = useAppDispatch()
  const loginInfo = useAppSelector(state => state.user.info)

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
      onSubmit={({ username, password }) => dispatch(login({ username, password }))}
      submitText='Login'
      submitFeedback={loginInfo}
    >
      <TextInput label='username' name='username' placeholder='username' type='text' />
      <TextInput label='password' name='password' placeholder='password' type='password' />
    </FormContainer>
  )
}
