const got = require('got')

var url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCtHCOq2CwEXZFM5lWNQSJozkdLso4mmS4&channelId=UC1PkRYud11ogYDqgdqd23Zw&part=snippet,id&order=date&maxResults=20'

got(url)
  .then(response => {
    var res = JSON.parse(response.body)
    console.log(res.items[0])
    console.log('Here is the latest Episode you are missing: ' + res.items[0].snippet.title)
  })
  .catch(error => {
    console.log(error)
  })
