const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", async (req, res) => {
  const data = await userController.getUsers();
  res.json(data);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const data = await userController.createUser(req.body);
  res.json(data);
});

module.exports = router;
