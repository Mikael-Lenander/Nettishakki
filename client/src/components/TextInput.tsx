import React from 'react'
import { useField } from 'formik'
import { TextField, Typography } from '@mui/material'

interface Props {
  label: string
  name: string
  placeholder: string
  type: string
}

export default function TextInput({ name, ...props }: Props) {
  const [field, meta] = useField({ ...props, name })
  const error = Boolean(meta.touched && meta.error)
  const margin = '0.6em'

  return (
    <>
      <TextField
        variant='outlined'
        id={name}
        {...props}
        {...field}
        size='small'
        sx={{ borderRadius: '5px', width: `calc(100% - 2 * ${margin})`, ml: margin, mr: margin, mb: error ? '0em' : '1.2em' }}
      />
      {error && (
        <Typography color='red' fontSize='16px' ml={margin}>
          {meta.error}
        </Typography>
      )}
    </>
  )
}
