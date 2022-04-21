const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser
} = require("../controllers/users");

const router = Router();

router.post("/", [
  check('email', 'The email is not valid').isEmail(),
  check('name', 'The name is required').not().isEmpty(),
  validateFields
], createUser);

router.get("/", getUsers);

router.put("/:id", updateUser);

router.patch("/", patchUser);

router.delete("/", deleteUser);

module.exports = router;
