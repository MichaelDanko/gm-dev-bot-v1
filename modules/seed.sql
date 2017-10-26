DO language plpgsql $$
BEGIN

        DROP TABLE QUESTIONS CASCADE;
        DROP TABLE ANSWERS CASCADE;
        DROP TABLE USER_TO_QUESTION CASCADE;
        DROP TABLE QUESTIONS_TO_ANSWERS CASCADE;

        DROP SEQUENCE USER_TO_QUEST_SEQ;
        DROP SEQUENCE QUEST_TO_ANSWER_SEQ;

        CREATE SEQUENCE IF NOT EXISTS USER_TO_QUEST_SEQ START 1000 INCREMENT 1 NO MAXVALUE;
        CREATE SEQUENCE IF NOT EXISTS QUEST_TO_ANSWER_SEQ START 1000 INCREMENT 1 NO MAXVALUE;

        CREATE TABLE IF NOT EXISTS QUESTIONS
        (
            QUEST_ID    UUID      PRIMARY KEY   UNIQUE      NOT NULL
          , QUESTION    VARCHAR                             NOT NULL
          , ENTITY      VARCHAR                             NOT NULL
          , CREATED_ON  timestamp default current_timestamp NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ANSWERS
        (
            ANSWER_ID   UUID      PRIMARY KEY  UNIQUE       NOT NULL
          , ANSWER      VARCHAR                             NOT NULL
          , CREATED_ON  timestamp default current_timestamp NOT NULL
        );

        CREATE TABLE IF NOT EXISTS USER_TO_QUESTION
        (
            ID          SERIAL      PRIMARY KEY       UNIQUE          NOT NULL
          , QUEST_ID    UUID        REFERENCES QUESTIONS (QUEST_ID)   NOT NULL
          , USER_ID     VARCHAR                                       NOT NULL
          , CREATED_ON  timestamp default current_timestamp           NOT NULL
        );

        CREATE TABLE IF NOT EXISTS QUESTIONS_TO_ANSWERS
        (
            ID          SERIAL      PRIMARY KEY       UNIQUE          NOT NULL
          , QUEST_ID    UUID        REFERENCES QUESTIONS (QUEST_ID)   NOT NULL
          , ANSWER_ID   UUID        REFERENCES ANSWERS (ANSWER_ID)    NOT NULL
          , CREATED_ON  timestamp default current_timestamp           NOT NULL
        );

END
$$;
