import express from "express";
import { getNextMatch, postVote } from "./tournament.controller.js";

const router = express.Router();

router.get("/api/tournament/next-match", getNextMatch);
router.get("/api/tournament/vote", postVote);

export default router;
