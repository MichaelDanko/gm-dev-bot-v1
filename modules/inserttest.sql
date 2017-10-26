
              INSERT INTO QUESTIONS
              (
                  QUEST_ID
                , QUESTION
                , ENTITY
              )
              VALUES (
                  '502cf357-245f-4122-a9e8-29362b1fb9b9'
                , 'What is postgres?'
                , 'programming'
              );

              INSERT INTO USER_TO_QUESTION
              (
                  QUEST_ID
                , USER_ID
              )
              VALUES
              (
                  '502cf357-245f-4122-a9e8-29362b1fb9b9'
                , 'Andrew Gremlich'
              );
