const restify = require('restify'),
  builder = require('botbuilder'),
  Conversation = require('watson-developer-cloud/conversation/v1'),
  server = restify.createServer()

require('dotenv').config()

var workspace = process.env.WATSON_WORKSPACE

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(server.name, "+++", server.url)
})

var conversation = new Conversation({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version_date: Conversation.VERSION_DATE_2017_05_26
})

console.log("process.env.WORKSPACE_ID " + process.env.WORKSPACE_ID)
console.log("process.env.appID " + process.env.appId)
console.log("process.env.appPassword " + process.env.appPassword)

var connector = new builder.ChatConnector({
  appId: process.env.appId,
  appPassword: process.env.appPassword
})

server.post('/api/messages', connector.listen())

let contexts

function findOrCreateContext(convId) {
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
      session.send(response.output.text)
      conversationContext.watsonContext = response.context
    }
  })

})
