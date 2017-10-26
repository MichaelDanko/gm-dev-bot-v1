var request = require("request")

const restify = require('restify'),
  builder = require('botbuilder'),
  Conversation = require('watson-developer-cloud/conversation/v1'),
  server = restify.createServer()

require('dotenv').config()

// *** WATSON AND BOT CONNECTORS
var requestData = {}

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
//
//**************** SERVER SETUPS

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(server.name, "+++", server.url)
})

server.post('/api/messages', connector.listen())

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

      if( (repsonse.intents).length === 0 ) {
        requestData.question = response.input 
        requestData.entity = response.entities
        requestData.userId = response.context.conversation_id 

        request({
          url: url,
          method: post,
          json: requestData,
          }, function (error, response, body) {
             if (!error && response.statusCode === 200) {
                     console.log(body)
                 }
             else {
                 
                     console.log("error: " + error)
                     console.log("response.statusCode: " + response.statusCode)
                     console.log("response.statusText: " + response.statusText)
                 }
        })
      }            //handler either not an array or empty array
        //post to database api 
      
      response.output.text.forEach(function(text) {
        session.send(text)
      })
      conversationContext.watsonContext = response.context
    }
  })
})

var requestData = {
       "request": {
           "slice": [
               {
                   "origin": "ZRH",
                   "destination": "DUS",
                   "date": "2014-12-02"
               }
           ],
           "passengers": {
               "adultCount": 1,
               "infantInLapCount": 0,
               "infantInSeatCount": 0,
               "childCount": 0,
               "seniorCount": 0
           },
           "solutions": 2,
           "refundable": false
       }
   }


