/* eslint-disable react/jsx-props-no-spreading */
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        data
      );
      if (response.status === 201) {
        toast.success(response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>E-mail:</p>
          <input
            type="email"
            placeholder="BottomGear@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <h3>Password:</h3>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            {...register("password")}
          />
        </div>
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "😀" : "😎"}
        </button>

        <button type="submit">Create Account</button>

        <button type="button" href="/data/create">
          <Link to="/data/create">Temporary Bypass</Link>
        </button>
      </form>
      <Footer />
    </>
  );
}

export default SignUp;
