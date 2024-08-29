const create = async (req, res, model) => {
  try {
    const post = await model.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

module.exports = {
  create,
};
