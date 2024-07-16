module.exports = (req, res, next) => {
  const pagesize = parseInt(req.query.perpage, 10) || 10;
  const page = Math.max(parseInt(req.query.page, 10), 1) || 1;
  req.pagination = {
    limit: pagesize,
    offset: pagesize * (page - 1),
    page,
    pagesize
  };
  next();
};
