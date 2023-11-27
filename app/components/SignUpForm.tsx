'use client'

import { useState } from 'react';
// import { signUp } from '../actions/users/signUp';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setMessage("Signing up...");
        // const message = await signUp(email, password);
        try{
          const body = { email, password }
          await fetch( `api/signup`, {
            method: "POST",
            headers: new Headers({ 'Content-Type': 'application/json'}),
            credentials: 'same-origin',
            body: JSON.stringify(body)
          }).then((result) => {
            console.log(result)
            setMessage(message)
          })
        }catch(e){
          console.log(e)
        }
    };

    return (
        <div className='flex flex-col gap-4 bg-gray-400 p-4'>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button onClick={handleSubmit}>Sign up</button>

            <p>{message}</p>
        </div>
    );
};

export default SignUpForm;