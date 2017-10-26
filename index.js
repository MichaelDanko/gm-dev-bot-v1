const restify = require('restify'),
  builder = require('botbuilder'),
  Conversation = require('watson-developer-cloud/conversation/v1'),
  server = restify.createServer(),
  { Client } = require('pg'),
  interceptUnknown = require('./dbModules/interceptUnknown.js'),
  apis = require('./apiModules/apiMain.js')

require('dotenv').config()

// ************** DATABASE

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

client.connect()

// *** WATSON AND BOT CONNECTORS

var workspace = process.env.WATSON_WORKSPACE

var conversation = new Conversation({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version_date: Conversation.VERSION_DATE_2017_05_26
})

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}
//
//**************** SERVER SETUPS

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(server.name, "+++", server.url)
})

server.post('/api/messages', connector.listen())

apis(server, client)

//******************** BOT ENDPOINT

let contexts

function findOrCreateContext(convId) {

  if (!contexts)
    contexts = []
  if (!contexts[convId]) {
    contexts[convId] = {
      workspaceId: workspace,
      watsonContext: {}
    }
    console.log(contexts)
  }
  return contexts[convId]
}

let bot = new builder.UniversalBot(connector, function(session) {
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

    console.log('RESPONSE', response)
    if (err) {
      console.log(err)
      session.send(err)
    } else {
      console.log(JSON.stringify(response, null, 2))
      if (response.output.text[0].includes("Can you be more specific")) {
        interceptUnknown(client, response.input.text, response.entities[0].entity)
      }
      response.output.text.forEach(function(text) {
        session.send(text)
      })
      conversationContext.watsonContext = response.context
    }
  })

})
