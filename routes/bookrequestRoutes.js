import express from "express";
import upload from "../utils/upload.js";
import BookRequestController from "../controllers/bookRequestController.js";

const router = express.Router();

router.post("/", upload.single("image"), BookRequestController.create);
router.get("/", BookRequestController.list);
router.get("/:id", BookRequestController.getOne);
router.patch("/:id/status", BookRequestController.updateStatus);
router.delete("/:id", BookRequestController.remove);

export default router;
