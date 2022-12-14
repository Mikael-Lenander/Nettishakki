import React from 'react'
import TextInput from './TextInput'
import FormContainer from './FormContainer'
import * as Yup from 'yup'
import { useAppSelector, useAppDispatch } from '../state/hooks'
import { signup } from '../state/reducers/userReducer'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const signUpInfo = useAppSelector(state => state.user.info)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
        password: Yup.string()
          .min(5, 'Password must be at least 5 characters long')
          .max(30, 'Password must be at most 30 characters long')
          .required('Required field'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
      })}
      onSubmit={({ username, password, repeatPassword }) =>
        dispatch(signup({ username, password, repeatPassword })).then(() => navigate('/login'))
      }
      submitText='Sign up'
      submitFeedback={signUpInfo}
    >
      <TextInput label='username' name='username' placeholder='username' type='text' />
      <TextInput label='password' name='password' placeholder='password' type='password' />
      <TextInput label='repeat password' name='repeatPassword' placeholder='Repeat password' type='password' />
    </FormContainer>
  )
}
