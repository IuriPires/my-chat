import express from "express";
import {
  regiostrationController,
  userController,
  loginController,
} from "../controllers";

const router = express.Router();

// REGISTRATION
router.post("/registration", regiostrationController);

// USER
router.patch("/users/:id", userController.updateUser);
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getOneUser);
router.delete("/users/:id", userController.deleteUser);

// LOGIN
router.post("/login", loginController.auth);

export default router;
