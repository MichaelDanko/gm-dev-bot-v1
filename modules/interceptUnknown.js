function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function interceptUnkown(client, question, entity, userId) {

  let questId = guid()

  client.query(`
                INSERT INTO QUESTIONS
                (
                    QUEST_ID
                  , QUESTION
                  , ENTITY
                )
                VALUES (
                    ${questId}
                  , ${question}
                  , ${entity}
                );

                INSERT INTO USER_TO_QUESTION
                (
                    QUEST_ID
                  , USER_ID
                )
                VALUES
                (
                    ${questId}
                  , ${userId}
                );
              `, (err, res) => {
    if (err) throw err
    console.log(res)
    client.end()
  })
}

module.exports = interceptUnkown
