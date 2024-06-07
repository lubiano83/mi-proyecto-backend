import { Router } from "express";

const ROUTER = Router();

ROUTER.get("/", (req, res) => {
    res.render("chat", { title: "ChatApp" });
});

export default ROUTER;