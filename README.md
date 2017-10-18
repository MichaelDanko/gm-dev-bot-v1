# Watson-MS Bot Boilerplate

## Getting started

### Local Development

#### Primary setup
1. Fork this repository, and then clone the fork to your development machine.
2. In the root of the folder make a `.env` file.  
3. Copy and paste the following into the .env file.  
```
# Environment variables
WORKSPACE_ID=
CONVERSATION_USERNAME=
CONVERSATION_PASSWORD=

#Microsoft Bot Info
appId=
appPassword=
```
  * These are the environment variables to use the Watson Conversation service and MS Bot Network application information.  
  * The Watson Conversation environment variables are obtained through Bluemix and are required.
  * With local development the MS variables are not required, but are necessary for remote applications.
4. Download a [BotFramework-Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases) for your local development.

#### Create Watson Responses
1. Create a [Bluemix](https://www.bluemix.net) account.
2. Open up the Hamburger Menu and go to the Watson menu option.
3. Create a Watson Conversation service if you have not already done so.
  * Be sure to just use the Lite plan.
4. Go into the Watson service you just created by clicking it.
5. There should be a tutorial that has the title "Conversation".  Follow this tutorial to become familiar with the terminology and layout of the interface.
 * Follow this tutorial to test later in the emulator!!!
6. Once the tutorial is finished, make sure you are in the Workspace of the Watson conversation GUI.
7. To find the environment variables click the "Deploy" icon (third from the top).
  * Find the "Credentials" tab and click it.
  * Grab the "Workspace ID", "Username", and "Password" credentials and add them to their respective spots in your `.env` file.

#### Local Development
1. If you already have some intents, entities, and or dialogues set up in Watson and you want to have it a go, then open up the root of this project in the terminal or command prompt.
2. Type `node index.js` to run the server found in `index.js`.
  * You should receive some messages in the terminal/command prompt if you haven't removed them from the source code.  Those messages verify that the server is running.
3. Once you ran the command and verified the running service, open the BotFramework-Emulator.
4. Add your server endpoint to the emulator.  
  * Make sure it has the /api/messages endpoint!
  * The endpoint should be `http://localhost:3978/api/messages` if you haven't changed anything in the source code.
5. The emulator will ask for MS credentials but just click "connect" anyway for local development.
6. Send a message to Watson according to the dialogues you setup in your Bluemix account!
