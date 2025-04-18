import express from "express";
import { getNextMatch, postVote } from "./tournament.controller.js";

const router = express.Router();

router.get("/api/tournament/next-match/:listType", getNextMatch);
router.get("/api/tournament/vote/:listType", postVote);

export default router;
