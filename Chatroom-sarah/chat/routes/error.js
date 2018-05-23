var express = require("express");
var router = express.Router();

router.use(catch404);
router.use(errorHandler);

function catch404(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
}

function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}

module.exports = router;
