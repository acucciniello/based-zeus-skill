// session-ended-request.js
// Purpose: End the Skill and the session
module.exports = sessionEndedRequest

// Purpose: End the Skill and the session
function sessionEndedRequest () {
  this.emit(':tell', 'Stopping Request and Exiting Skill')
}
