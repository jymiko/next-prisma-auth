import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className='w-full px-4 py-8 bg-gray-300 flex flex-row items-center gap-4'>
            <Link href='/'>Home</Link>
            <Link href='/dashboard'>Dashboard</Link>

            {session && session?.user?.email ? (
                <>
                    <Link href='/signout'>Sign out</Link>
                    <p>
                        <b>Signed in as {session?.user?.email}</b>
                    </p>
                </>
            ) : (
                <>
                    <Link href='/signin'>Sign in</Link>
                    <Link href='/signup'>Sign up</Link>
                </>
            )}
        </div>
    );
};

export default Navbar;