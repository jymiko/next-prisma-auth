"use client"
import React from 'react'
import { useFormState } from 'react-dom'
import { TestAction } from './action'

const initState = {
  message: ""
}

const TestPage = () => {
  const [state, action] = useFormState(TestAction, initState);
  return (
    <>
    <div>TestPage</div>
    <form action={action}>
      <input type="text" name='nametxt' />
      <button>Kirim</button>
    </form>
    <p>{state.message}</p>
    </>
  )
}

export default TestPage