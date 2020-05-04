module.exports.getMain = async (req, res) => {
  const data = {
    message: 'weatherApi',
  };
  res.status(200).json(data);
};
