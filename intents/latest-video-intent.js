module.exports = latestNewsIntent

require('dotenv').config({path: '../'})
const API_KEY = process.env.API_KEY
const CHANNEL_ID = process.env.CHANNEL_ID
const got = require('got')
var Speech = require('ssml-builder')

function latestNewsIntent () {
  var url = 'https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&channelId=' + CHANNEL_ID + '&part=snippet,id&order=date&maxResults=20'
  var me = this
  got(url)
    .then(response => {
      var res = JSON.parse(response.body)
      var title = res.items[0].snippet.title
      var speech = new Speech()
      speech.say('Here is the latest Episode you are missing: ' + title)
      var speechOutput = speech.ssml(true)
      me.response.speak(speechOutput).listen(speechOutput)
      me.emit(':responseReady')
    })
    .catch(error => {
      console.log(error)
      var couldNotGetVideos = 'Unfortuntely I am not godly enough to get my own videos right now.. Come back soon and well try again'
      me.response.speak(couldNotGetVideos).listen(couldNotGetVideos)
      me.emit(':responseReady')
    })

}
