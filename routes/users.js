const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields');
const { isRoleValid, isEmailValid, existsUserById } = require('../helpers/db.validators');
// const Role = require('../models/role')

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
  check('email').custom(isEmailValid),
  check('name', 'The name is required').not().isEmpty(),
  check('role').custom(isRoleValid),
  validateFields
], createUser);

router.get("/", getUsers);

router.put("/:id",[
  check('id', 'The id is invalid').isMongoId(),
  check('id').custom(existsUserById),
  check('role').custom(isRoleValid),
  validateFields
],
updateUser);

router.patch("/", patchUser);

router.delete("/:id",[
  check('id', 'The id is invalid').isMongoId(),
  check('id').custom(existsUserById),
  validateFields
], deleteUser);

module.exports = router;
