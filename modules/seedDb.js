function seedDatabase(client) {

  client.query(`
          CREATE SEQUENCE IF NOT EXISTS USER_TO_QUEST_SEQ  INCREMENT;
          CREATE SEQUENCE IF NOT EXISTS QUEST_TO_ANSWER_SEQ INCREMENT;

          CREATE TABLE IF NOT EXISTS QUESTIONS
          (
              QUEST_ID    UUID   PRIMARY KEY      NOT NULL
            , QUESTION    VARCHAR                 NOT NULL
            , ENTITY      VARCHAR                 NOT NULL
            , CREATED_ON  timestamp default current_timestamp NOT NULL
          );

          CREATE TABLE IF NOT EXISTS ANSWERS
          (
              ANSWER_ID UUID PRIMARY KEY    NOT NULL
            , ANSWER    VARCHAR             NOT NULL
            , CREATED_ON  timestamp default current_timestamp NOT NULL
          );

          CREATE TABLE IF NOT EXISTS USER_TO_QUESTION
          (
              ID          SERIAL  PRIMARY KEY   DEFAULT NEXTVAL('USER_TO_QUEST_SEQ') NOT NULL
            , QUEST_ID    UUID    REFERENCES QUESTIONS (QUEST_ID)  NOT NULL
            , USER_ID   UUID    REFERENCES ANSWERS (ANSWER_ID)   NOT NULL
            , CREATED_ON  timestamp default current_timestamp NOT NULL
          );

          CREATE TABLE IF NOT EXISTS QUESTIONS_TO_ANSWERS
          (
              ID          SERIAL PRIMARY KEY   DEFAULT NEXTVAL('USER_TO_QUEST_SEQ') NOT NULL
            , QUEST_ID    UUID   REFERENCES QUESTIONS (QUEST_ID)  NOT NULL
            , ANSWER_ID   UUID   REFERENCES ANSWERS (ANSWER_ID)   NOT NULL
            , CREATED_ON  timestamp default current_timestamp NOT NULL
          );`
      , (err, res) => {
          if (err) throw err
          console.log(res)
          client.end()
        }
  )
}

module.exports = seedDatabase
