function interceptUnkown(client, message, category, ASKER) {
              //ASKER ID FOR UNKNOWN_QUESTIONS TO WITH ASKERS?
  client.query(`INSERT INTO UNKNOWN_QUESTIONS (QUESTION, CATEGORY, ASKER) VALUES (${message}, ${category});
                INSERT INTO ASKERS (ASKER, UNK_QUES_ID) VALUES (${ASKER}, (SELECT NEXTVAL FROM UNKNOWN_QUESTIONS WHERE ASKER = ${ASKER}));`, (err, res) => {
    if (err) throw err
    console.log(res)
    client.end()
  })


}

module.exports = interceptUnkown
