const restify = require('restify'),
  builder = require('botbuilder'),
  Conversation = require('watson-developer-cloud/conversation/v1'),
  server = restify.createServer()

require('dotenv').config()

var contexts,
  workspace = process.env.WORKSPACE_ID || ''

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(server.name, "+++", server.url);
});

var conversation = new Conversation({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  url: process.env.WORKSPACE_URL,
  version_date: Conversation.VERSION_DATE_2017_04_21
});

console.log("process.env.WORKSPACE_ID " + process.env.WORKSPACE_ID);
console.log("process.env.appID " + process.env.appId);
console.log("process.env.appPassword " + process.env.appPassword);

var connector = new builder.ChatConnector({
  appId: process.env.appId,
  appPassword: process.env.appPassword
});

server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
  console.log(JSON.stringify(session.message, null, 2));

  var payload = {
    workspace_id: workspace,
    context: '',
    input: {
      text: session.message.text
    }
  };

  var conversationContext = findOrCreateContext(session.message.address.conversation.id);
  if (!conversationContext) conversationContext = {};
  payload.context = conversationContext.watsonContext;

  conversation.message(payload, function(err, response) {
    if (err) {
      session.send(err);
    } else {
      console.log(JSON.stringify(response, null, 2));
      session.send(response.output.text);
      conversationContext.watsonContext = response.context;
    }
  });

});

function findOrCreateContext(convId) {
  if (!contexts)
    contexts = [];
  if (!contexts[convId]) {
    contexts[convId] = {
      workspaceId: workspace,
      watsonContext: {}
    };
  }
  return contexts[convId];
}
