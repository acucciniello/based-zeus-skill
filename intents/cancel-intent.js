// cancel-intent.js
// Purpose: a function that handles the cancel intent
module.exports = cancelIntent

// Purpose: To cancel the skill and close the session
function cancelIntent () {
  this.emit(':tell', 'Canceling Request and Exiting Skill')
}
