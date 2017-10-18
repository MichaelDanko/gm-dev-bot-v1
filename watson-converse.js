var ConversationV1 = require('watson-developer-cloud/conversation/v1');

require('dotenv').config()

var conversation = new ConversationV1({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

conversation.message({
  input: { text: 'hello' },
  workspace_id: process.env.WORKSPACE_ID
 }, function(err, response) {
     if (err) {
       console.error(err);
     } else {
       console.log(JSON.stringify(response, null, 2));
     }
});
