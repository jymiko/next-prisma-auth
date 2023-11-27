'use client';

import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const SignInForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')

    const { status } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setMessage('Signing in...');
        
        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if(!signInResponse || signInResponse.ok !== true) {
                setMessage("Invalid credentials");
            } else {
                router.refresh();
            }

        } catch(err) {
            console.log(err);
        }

        setMessage(message);
    };

    useEffect(() => {
        if (status === 'authenticated') {
            if(callbackUrl !== null){
                router.push(callbackUrl, { shallow: true })
                router.refresh();
            }else{
                router.push('/')
                router.refresh()
            }
        }
    }, [status]);

    return (
        <div className='flex flex-col gap-4 bg-gray-400 p-4 text-black'>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleSubmit}>Sign in</button>

            <p>{message}</p>
        </div>
    );
};

export default SignInForm;