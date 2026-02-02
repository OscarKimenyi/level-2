const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const m = new Message(req.body);
  await m.save();
  res.json(m);
});

router.get("/", auth, async (req, res) => {
  res.json(await Message.find());
});

module.exports = router;
