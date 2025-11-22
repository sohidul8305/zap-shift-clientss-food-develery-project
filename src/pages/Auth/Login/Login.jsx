// src/pages/Login/Login.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import Socallogin from './Sociallogin/Socallogin';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Logged User:", result.user);
      })
      .catch((error) => {
        console.log("Login Error:", error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl">
      <h3 className="text-3xl text-center font-bold mt-4">Welcome back</h3>
      <p className="text-center">Please Login</p>

      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">

          <label className="label">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === 'minLength' && (
            <p className="text-red-500">Password must be at least 6 characters</p>
          )}

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>

        <p className="text-center mt-2">
          New to Zap Shift?{" "}
          <Link className="text-blue-500 underline" to="/register">
            Register
          </Link>
        </p>
      </form>

      <Socallogin />
    </div>
  );
};

export default Login;
