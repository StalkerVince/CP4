/* eslint-disable react/jsx-props-no-spreading */
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Login() {
  const { setAuth, auth } = useOutletContext();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, data)
        .then((res) => {
          setAuth(res.data);
          navigate(`/login/${auth.id}`);
        });
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3>Email:</h3>
          <input type="email" {...register("email")} />
          {errors.name && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <h3>Password:</h3>
          <input type={showPassword ? "text" : "password"} />
          {errors.name && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "😀" : "😎"}
        </button>

        <button type="submit" href="/data/create">
          Log In
        </button>

        <button type="button" href="/data/create">
          <Link to="/data/create">Temporary Bypass*</Link>
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Login;
