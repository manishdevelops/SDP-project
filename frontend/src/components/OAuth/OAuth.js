import React from 'react';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase';

const OAuth = () => {

    const handleGoogleClick = async () => {
        console.log(12)
        try {
            console.log(12)

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result)
            const res = await fetch('/api/users/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            });
            if (!res.ok) {
                const errorData = await res.json();
                return toast.error(errorData.message);
            }
            toast.success('User registration successfull.!');

        } catch (error) {
            console.log(error)
            toast.error('Could not sign in to Google.!');
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>
    )
}

export default OAuth