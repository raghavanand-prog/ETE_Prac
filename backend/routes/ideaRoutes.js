import express from "express";
import {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  voteIdea,
  getStats
} from "../controllers/ideaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getIdeas).post(protect, createIdea);
router.put("/:id/vote", protect, voteIdea);
router.get("/stats", getStats);
router.route("/:id").get(getIdeaById).put(protect, updateIdea).delete(protect, deleteIdea);

export default router;