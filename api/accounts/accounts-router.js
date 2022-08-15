const router = require("express").Router();

const { getAll, getById, create, updateById, deleteById } = require("./accounts-model");

router.get("/", async (req, res, next) => {
  const data = await getAll();
  res.status(200).json(data);
});

router.get("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.post("/", (req, res, next) => {
  // DO YOUR MAGIC
});

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use(
  (
    err,
    req,
    res,
    next // eslint-disable-line
  ) => {
    // DO YOUR MAGIC
    res.status(err.status || 500).res.json({
      customMessage: "server error, try again never",
      message: err.message,
    });
  }
);

module.exports = router;
