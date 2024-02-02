const tables = require("../tables");

// GET

const browseFilters = async (req, res, next) => {
  const {
    brand = null,
    model = null,
    drive = null,
    fuel = null,
    category = null,
    power = null,
    orderby = null,
    limit = 20,
  } = req.query;
  try {
    // Fetch all offers from the database
    const cars = await tables.cars.readAllFilters(
      brand,
      model,
      drive,
      fuel,
      category,
      power,
      orderby,
      Number(limit)
    );
    if (cars !== null) {
      res.json(cars);
    } else {
      res.send(401).json({ message: "Recherche non aboutie" });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const browse = async (req, res) => {
  try {
    const getCar = await tables.cars.readAll();
    if (getCar) {
      res.status(200).json(getCar);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
};

// GET BY ID

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const getCarId = await tables.cars.read(parseInt(id, 10));
    if (getCarId[0]) {
      res.status(200).json(getCarId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { brand, model, drive, fuel, category, power } = req.body;
  const { id } = req.params;
  try {
    const editCar = await tables.cars.update(
      brand,
      model,
      drive,
      fuel,
      category,
      power,
      parseInt(id, 10)
    );

    if (editCar.length > 0) {
      res.status(200).json(editCar);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const { brand, model, drive, fuel, category, power } = req.body;
  try {
    const addCar = await tables.cars.create(
      brand,
      model,
      drive,
      fuel,
      category,
      power
    );
    if (addCar) {
      res.status(201).json(addCar);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// DELETE

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCar = await tables.cars.delete(parseInt(id, 10));
    if (deleteCar) {
      res
        .status(200)
        .json("car has been successefully deleted from your table");
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { browseFilters, browse, read, edit, add, remove };
