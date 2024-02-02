/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cars`,
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
          <h3>Brand:</h3>
          <input
            type="text"
            placeholder="Alfa Romeo, Lancia..."
            {...register("brand", {
              minLength: { value: 2, message: "Insert Brand" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.brand.message}</span>
          )}
        </div>

        <div>
          <h3>Model:</h3>
          <input
            type="text"
            placeholder="Giulietta, Giulia..."
            {...register("model", {
              minLength: { value: 2, message: "Insert Model" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.model.message}</span>
          )}
        </div>

        <div>
          <h3>Drive:</h3>
          <input
            type="text"
            placeholder="FWD, RWD, AWD..."
            {...register("drive", {
              minLength: { value: 3, message: "Insert Drive Type" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.drive.message}</span>
          )}
        </div>

        <div>
          <h3>Fuel:</h3>
          <input
            type="text"
            placeholder="Diesel... "
            {...register("fuel", {
              minLength: { value: 3, message: "Insert Fuel Type" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.fuel.message}</span>
          )}
        </div>

        <div>
          <h3>Category:</h3>
          <input
            type="text"
            placeholder="Hatchback, GT, Berline..."
            {...register("category", {
              minLength: { value: 2, message: "Insert Vehicule Category" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </div>

        <div>
          <h3>Power:</h3>
          <input
            type="number"
            placeholder="110... (in cv)"
            {...register("power", {
              minLength: { value: 2, message: "Insert Power in cv value" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.power.message}</span>
          )}
        </div>

        <div>
          <h3>Seats:</h3>
          <input
            type="number"
            placeholder="3, 4, 5..."
            {...register("seats", {
              minLength: { value: 1, message: "Insert Power in cv value" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.seats.message}</span>
          )}
        </div>

        <button type="submit">Create Car Data</button>
      </form>
      <Footer />
    </>
  );
}

export default Create;
