const restify = require('restify'),
  builder = require('botbuilder'),
  Conversation = require('watson-developer-cloud/conversation/v1'),
  server = restify.createServer()

require('dotenv').config()

var workspace = '83e40a01-30fd-4fcd-958f-9f10f82700d0'

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(server.name, "+++", server.url)
})

var conversation = new Conversation({
  username: 'bbb8723d-87cb-4081-9c87-c40ab5214c1d',
  password: 'eCQjp7lyNb8Y',
  version_date: Conversation.VERSION_DATE_2017_05_26
})

console.log("process.env.WORKSPACE_ID 83e40a01-30fd-4fcd-958f-9f10f82700d0")
console.log("process.env.appID ")
console.log("process.env.appPassword ")

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

server.post('/api/messages', connector.listen())

function findOrCreateContext(convId) {
  let contexts

  if (!contexts)
    contexts = []
  if (!contexts[convId]) {
    contexts[convId] = {
      workspaceId: workspace,
      watsonContext: {}
    }
  }
  return contexts[convId]
}

let bot = new builder.UniversalBot(connector, function(session) {
  console.log('builder connector')
  console.log('MESSAGE', JSON.stringify(session.message.text))

  let payload = {
    workspace_id: workspace,
    context: '',
    input: {
      text: session.message.text
    }
  }

  let conversationContext = findOrCreateContext(session.message.address.conversation.id)

  if (!conversationContext) conversationContext = {}

  payload.context = conversationContext.watsonContext

  console.log('PAYLOAD', payload)

  conversation.message(payload, function(err, response) {

    if (err) {
      console.log("HELLO")
      session.send(err)
    } else {
      console.log('message to watson')
      console.log(JSON.stringify(response, null, 2))
      session.sendTyping();
      setTimeout(function(){
        session.send("hellooo reply")

        var msg = new builder.Message()
        .address(session.message.address)
        .textFormat(builder.TextFormat.markdown)
        .text(response.output.text);
    
        bot.send(msg, function(err) {});
      }, 3000);
      conversationContext.watsonContext = response.context
    }
  })

})
