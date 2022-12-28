import React from 'react'
import { useField } from 'formik'
import { Select, Typography, MenuItem } from '@mui/material'

interface Props {
  label: string
  name: string
  defaultValue: number
  values: number[]
}

export default function SelectInput({ name, values, label, ...props }: Props) {
  const [field, meta] = useField({ ...props, name })
  const error = Boolean(meta.touched && meta.error)
  const margin = '0.6em'

  return (
    <>
      <Typography fontSize='18px' ml={margin}>
        {label}
      </Typography>
      <Select
        id={name}
        {...props}
        {...field}
        size='small'
        sx={{
          borderRadius: '5px',
          width: `calc(100% - 2 * ${margin})`,
          ml: margin,
          mr: margin,
          mb: error ? '0em' : '1em'
        }}
      >
        {values.map(value => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <Typography color='red' fontSize='16px' ml={margin}>
          {meta.error}
        </Typography>
      )}
    </>
  )
}
