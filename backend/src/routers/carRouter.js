const express = require("express");

const router = express.Router();

const {
  read,
  edit,
  add,
  remove,
  browseFilters,
} = require("../controllers/carController");

// GET

router.get("/", browseFilters);

router.get("/:id", read);

// PUT

router.put("/:id", edit);

// POST

router.post("/", add);

// DELETE

router.delete("/:id", remove);

module.exports = router;
