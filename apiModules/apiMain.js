function main(server, client) {

  server.get('/api/getQuestions/', function(req, res, next) {
    client.query(`
                  SELECT
                      QUESTIONS.QUESTION
                    , USER_TO_QUESTION.USER_ID
                  FROM QUESTIONS
                  LEFT JOIN
                    USER_TO_QUESTION
                  ON QUESTIONS.QUEST_ID = USER_TO_QUESTION.QUEST_ID;
                `, (err, resp) => {
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
