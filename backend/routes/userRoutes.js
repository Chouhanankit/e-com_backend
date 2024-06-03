const express = require("express");
const {
  registerUser,
  login,
  logout,
  getme,
  getAllUsers,
} = require("../controllers/usercontoller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protect", protect, getme);
router.get("/", getAllUsers); 
// router.get("/", protect, getAllUsers); route protected hai ismai


module.exports = router;
