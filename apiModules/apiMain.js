function main(server, client) {
  server.get('/api/getQuestions/', function(req, res, next) {
    res.send(req.params);
    return next();
  });
}

module.exports = main
