function main(server, client) {

  server.get('/api/getQuestions/', function(req, res, next) {
    client.query(`
                  SELECT
                      q.QUESTION
                    , uq.USER_ID
                  FROM QUESTIONS q
                  LEFT JOIN
                    USER_TO_QUESTION uq
                  ON q.QUEST_ID = uq.QUEST_ID;
                `
                , (err, resp) => {
                    if (err) throw err
                    console.log(resp.rows)
                    res.send(resp.rows)
                    client.end()
                  }
    )

    return next()
  })

  server.get('/api/helloWorld/', function(req, res, next) {
    res.send('helloWorld')
    return next()
  })

}

module.exports = main
