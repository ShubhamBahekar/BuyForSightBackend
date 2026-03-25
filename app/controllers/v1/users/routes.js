const express = require('express');
const router = express.Router();
const {handleGetUsers,handleGetUserById,handleCreateNewUser,handleUpdateUser,handleDeleteUser} = require('./users');

router
.route('/')
.get(handleGetUsers)
.post(handleCreateNewUser)


router.route('/:id')
.get(handleGetUserById)
.put(handleUpdateUser)
.delete(handleDeleteUser)


module.exports = router;