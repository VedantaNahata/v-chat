const getCookie = (req, name) => {
  return req.cookies[name] || "";
};
module.exports = getCookie;
