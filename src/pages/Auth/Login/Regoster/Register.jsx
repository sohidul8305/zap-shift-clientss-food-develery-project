import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Socallogin from "../Sociallogin/Socallogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  console.log('in register', location)

  const handleRegistration = (data) => {
    console.log("after register", data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log("User created:", result.user);

        const formData = new FormData();
        formData.append('image', profileImg)
       const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
       axios.post(image_API_URL, formData)

       .then(res =>{
        console.log('after image uplad', res.data.data.url)
        const userPorfile = {
          displayName : data.name,
          photoURL :   res.data.data.url
        } 
        updateUserProfile(userPorfile)
        .then(() =>{
          console.log('user profile updated done')
          navigate(location.state || '/');
        })
        .catch(error =>{
          console.log(error)
        })

       })
       .catch(error=>{
        console.log(error)
       })

      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center font-bold">Create an account</h3>
      <p className="text-center">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required.</p>
          )}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Photo is required.</p>
          )}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}

          {/* password */}
          <label className="label">Password</label>

          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer.
            </p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must include: 1 uppercase, 1 lowercase, 1 number, 1
              special character.
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4 bg-[#CAEB66] text-black">Register</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link state={location.state} className="text-blue-400 underline" to="/login">
            Login
          </Link>
        </p>
      </form>
      <Socallogin></Socallogin>
    </div>
  );
};

export default Register;
