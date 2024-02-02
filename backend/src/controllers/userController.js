const tables = require("../tables");

// GET

const browse = async (req, res) => {
  try {
    const getUser = await tables.users.readAll();
    if (getUser) {
      res.status(200).json(getUser);
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
    const getUserId = await tables.users.read(parseInt(id, 10));
    if (getUserId[0]) {
      res.status(200).json(getUserId);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
  }
};

// PUT

const edit = async (req, res, next) => {
  const { email, password } = req.body;
  const { id } = req.params;
  try {
    const editUser = await tables.users.update(
      email,
      password,
      parseInt(id, 10)
    );

    if (editUser.length > 0) {
      res.status(200).json(editUser);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// POST

const add = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adduser = await tables.users.create(email, password);
    if (adduser) {
      res.status(201).json(adduser);
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
    const deleteUser = await tables.users.delete(parseInt(id, 10));
    if (deleteUser) {
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

module.exports = { browse, read, edit, add, remove };
