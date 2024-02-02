const express = require("express");

const router = express.Router();

const carRouter = require("./routers/carRouter");
const userRouter = require("./routers/userRouter");

router.use("/cars", carRouter);
router.use("/users", userRouter);

module.exports = router;
