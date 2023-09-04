/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.deleteMessageToChannelSlack = function (inputs) {

  var inputsLogic = {
    channel: inputs.channel || "",
    messageId: inputs.messageId || ""
  };

  var body  = {
    channel: inputsLogic.channel,
    ts: inputsLogic.messageId
  }

  return slackFunction('chat.delete', body)
}


var genericSlackFunction = function (options) {
  options = options || {};
  return httpService._request(options);
};

var slackFunction = function (path, options) {
  options = options || {};
  return genericSlackFunction({
    path: path,
    params: options
  });
};
