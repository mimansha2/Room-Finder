const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user.permissions.includes(role)) {
      res.status(403).json({ data: [], message: "Access denied" });
      return;
    }
    next();
  };
};

module.exports = checkRole;
