import Link from 'next/link';
import React from 'react';

const SignInPage = () => {
    return (
        <div>
            <h1>Sign In Page</h1>
            <p>Wanna create an account? 
                <Link href={'/sign-up'}>Register</Link>
            </p>
        </div>
    );
};

export default SignInPage;