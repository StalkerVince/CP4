import { React, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Search() {
  const [data, setData] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [drive, setDrive] = useState("");
  const [fuel, setFuel] = useState("");
  const [category, setCategory] = useState("");
  const [power, setPower] = useState("");
  const [isValidate, setIsValidate] = useState(false);
  const [filters, setFilters] = useSearchParams();

  useEffect(() => {
    if (isValidate) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/cars?${filters.toString()}`)
        .then((res) => setData(res.data));
      setIsValidate(false);
    }
  }, [isValidate]);

  const handleFilters = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(filters);
    if (brand !== "") {
      params.set("brand", brand);
    }
    if (model !== "") {
      params.set("model", model);
    }
    if (drive !== "") {
      params.set("drive", drive);
    }
    if (fuel !== "") {
      params.set("fuel", fuel);
    }
    if (category !== "") {
      params.set("category", category);
    }
    if (power !== "") {
      params.set("power", power);
    }
    setFilters(params);
    setIsValidate(true);
  };

  const handleReset = () => {
    const params = new URLSearchParams(filters);
    params.delete("brand");
    setBrand("");
    params.delete("model");
    setModel("");
    params.delete("drive");
    setDrive("");
    params.delete("fuel");
    setFuel("");
    params.delete("category");
    setCategory("");
    params.delete("power");
    setPower(0);
    setFilters(params);
    setIsValidate(true);
  };

  return (
    <>
      <Header />
      <form>
        <div>
          <h3>Brand:</h3>
          <input
            type="text"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
        </div>

        <div>
          <h3>Model:</h3>
          <input
            type="text"
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
          />
        </div>

        <div>
          <h3>Drive:</h3>
          <input
            type="text"
            value={drive}
            onChange={(e) => {
              setDrive(e.target.value);
            }}
          />
        </div>

        <div>
          <h3>Fuel:</h3>
          <input
            type="text"
            value={fuel}
            onChange={(e) => {
              setFuel(e.target.value);
            }}
          />
        </div>

        <div>
          <h3>Category:</h3>
          <input
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>

        <div>
          <h3>Power:</h3>
          <input
            type="number"
            value={power}
            onChange={(e) => {
              setPower(e.target.value);
            }}
          />
        </div>

        <button type="submit" onClick={handleFilters}>
          Search Car Data
        </button>

        <button
          type="button"
          onClick={
            (handleReset,
            () => {
              window.location.href = "/data/search";
            })
          }
        >
          RESET
        </button>
      </form>

      <section>
        {data &&
          data.map((e) => (
            <div key={e.id}>
              <h4>
                {e.brand}
                {e.model}
              </h4>
            </div>
          ))}
      </section>

      <Footer />
    </>
  );
}

export default Search;
