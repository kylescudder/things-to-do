'use client'

import { useForm } from '@mantine/form'
import React from 'react'
import { type IIcon } from '@/lib/models/icon'
import { addCategory } from '@/lib/actions/category.actions'
import { type ICategory } from '@/lib/models/category'
import { Button, Select, TextInput } from '@mantine/core'
import { type option } from '@/lib/models/select-options'
import { categorySuccessToast } from '@/lib/actions/toast.actions'

const AddCategory = (props: {
  icons: IIcon[]
  userId: string
  addNewCategory: (categories: ICategory) => void
}): JSX.Element => {
  const options: option[] = props.icons.map((icon: IIcon) => ({
    value: icon.icon,
    label: icon.text
  }))

  const form = useForm({
    initialValues: {
      text: '',
      icon: ''
    }
  })
  interface formUser {
    text: string
    icon: string
  }
  const onSubmit = async (values: formUser): Promise<void> => {
    const payload: ICategory = {
      _id: '',
      text: values.text,
      icon: values.icon,
      userId: props.userId,
      todoCount: 0
    }
    const newCat = await addCategory(payload)
    if (newCat) {
      props.addNewCategory(newCat)
      await categorySuccessToast(newCat)
    }
  }
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await onSubmit(values)
      })}
      className='flex flex-col justify-start gap-10'
    >
      <TextInput
        label='Category name'
        radius='md'
        placeholder="What'll it be?"
        className='text-dark-2 dark:text-light-2'
        size='md'
        {...form.getInputProps('text')}
      />
      <Select
        radius='md'
        size='md'
        clearable
        transitionProps={{ transition: 'pop-bottom-left', duration: 200 }}
        label='Icon'
        placeholder='Pick one'
        data={options}
        {...form.getInputProps('icon')}
      />
      <Button className='bg-primary-500' type='submit'>
        Add
      </Button>
    </form>
  )
}

export default AddCategory
