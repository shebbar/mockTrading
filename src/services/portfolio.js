const addScript = async function (req, res, next) {
  res.status(200).json({ message: "Success" });
  return;
}

module.exports = { addScript };