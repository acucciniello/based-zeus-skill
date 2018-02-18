module.exports = latestNewsIntent

require('dotenv').config({path: '../'})
const API_KEY = process.env.API_KEY
const CHANNEL_ID = process.env.CHANNEL_ID

function latestNewsIntent () {
  const got = require('got')
  console.log(require('dotenv').config())
  var url = 'https://www.googleapis.com/youtube/v3/search?key=' + API_KEY + '&channelId=' + CHANNEL_ID + '&part=snippet,id&order=date&maxResults=20'
  var me = this
  got(url)
    .then(response => {
      var res = JSON.parse(response.body)
      var title = res.items[0].snippet.title
      var speech = 'Here is the latest Episode you are missing: '
      var tempTitle = ''
      var titleParts

      if (title.includes('|')) {
        titleParts = title.split('|')
        console.log(titleParts)
        for (var i = 0; i < titleParts.length; i++) {
          tempTitle  = tempTitle + ' . ' + titleParts[i]
        }
        title = tempTitle
        tempTitle = ''
      }
      if (title.includes('&')) {
        titleParts = title.split('&')
        console.log(titleParts)
        for (var i = 0; i < titleParts.length; i++) {
          console.log(titleParts[i])
          console.log(tempTitle)
          if (i === 0){
            tempTitle = titleParts[i] + ' and '
          } else {
            tempTitle = tempTitle + ' and ' + titleParts[i]
          }
        }
        title = tempTitle
        tempTitle = ''
      }
      speech = speech + title
      me.response.speak(speech).listen(speech)
      me.emit(':responseReady')
    })
    .catch(error => {
      console.log(error)
      var couldNotGetVideos = 'Unfortuntely I am not godly enough to get my own videos right now.. Come back soon and well try again'
      me.response.speak(couldNotGetVideos).listen(couldNotGetVideos)
      me.emit(':responseReady')
    })

}
