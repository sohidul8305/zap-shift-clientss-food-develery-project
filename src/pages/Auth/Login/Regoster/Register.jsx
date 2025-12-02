import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Sociallogin/SocalLogin';
import axios from 'axios';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);

                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL
                        };

                        // Insert user into DB
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if(res.data.insertedId){
                                    console.log('User created in DB');
                                    toast,success("User Added Successfully!")
                                }
                            })
                            .catch(err => console.log(err));

                        // Update Firebase profile
                        const userProfile = { displayName: data.name, photoURL };
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('Firebase profile updated');
                                navigate(location.state || '/');
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    // alert('This email is already registered. Please login.');
                    toast.success("User Added Successfully!")
                } else if (error.code === 'auth/invalid-email') {
                    // alert('Invalid email address.');
                } else if (error.code === 'auth/weak-password') {
                    // alert('Password is too weak.');
                } else {
                    console.error(error);
                    // alert('Registration failed. Try again.');
                }
            });
    };

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome to Zap Shift</h3>
            <p className='text-center'>Please Register</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {errors.name && <p className='text-red-500'>Name is required.</p>}

                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" />
                    {errors.photo && <p className='text-red-500'>Photo is required.</p>}

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {errors.email && <p className='text-red-500'>Email is required.</p>}

                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })} className="input" placeholder="Password" />
                    {errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>}
                    {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have uppercase, lowercase, number & special char</p>}

                    <button className="btn btn-neutral mt-4 bg-[#CAEB66] text-black">Register</button>
                </fieldset>
                <p>Already have an account? <Link state={location.state} className='text-blue-400 underline' to="/login">Login</Link></p>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Register;
