import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../OAuth/OAuth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';

const SignUp = () => {
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok === false) {
                setLoading(false);
                const errorData = await res.json();
                return toast.error(errorData.message);
            }
            const data = await res.json();
            dispatch(signInSuccess(data.data.user));
            toast.success('Complete your profile!');
            navigate('/profile');
        } catch (error) {
            setLoading(false);
            return toast.error(error.message);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h2 className='text-3xl text-center font-semibold my-7'>Sign Up</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='text' placeholder='name' className='border p-3 rounded-lg' id='name' onChange={handleChange} />
                <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <input type='password' placeholder='confirm password' className='border p-3 rounded-lg' id='passwordConfirm' onChange={handleChange} />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p> Have an account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-700'>
                        Sign in
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default SignUp;