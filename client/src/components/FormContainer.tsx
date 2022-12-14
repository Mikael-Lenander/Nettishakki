import React from 'react'
import { Formik, Form } from 'formik'
import { Typography, Button, Container, Alert } from '@mui/material'
import { AnyObjectSchema } from 'yup'
import { Info } from 'shared'

type FormValues = {
  [key: string]: string
}

type Props = {
  title: string
  initialValues: FormValues
  validationSchema: AnyObjectSchema
  onSubmit(values: FormValues): void
  children: JSX.Element[] | JSX.Element
  submitText: string
  submitFeedback: Info
}

export default function FormContainer({ title, initialValues, validationSchema, children, submitText, onSubmit, submitFeedback }: Props) {
  return (
    <Container
      sx={{
        width: 'clamp(300px, 20vw, 400px)',
        backgroundColor: 'white',
        borderRadius: '10px',
        border: '1px grey solid',
        boxShadow: '4px 4px 10px 1px rgba(0,0,0,0.45)'
      }}
    >
      <Typography variant='h4' margin='10px' mt={3} mb={2}>
        {title}
      </Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          {children}
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' type='submit' sx={{ mb: 4, fontSize: '18px' }}>
              {submitText}
            </Button>
          </Container>
          {submitFeedback.message.length > 0 && (
            <Alert severity={submitFeedback.success ? 'success' : 'error'} sx={{ mb: 2, mt: -2 }}>
              {submitFeedback.message}
            </Alert>
          )}
        </Form>
      </Formik>
    </Container>
  )
}
