const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const { isAuthorized } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/users", isAuthorized, getAllUsers);

module.exports = router;
