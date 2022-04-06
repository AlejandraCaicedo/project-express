const log = (req, res, next) => {
  const { url, method } = req;
  console.log(`URI: ${url}, METHOD: ${method}`);
};

module.exports = log;
