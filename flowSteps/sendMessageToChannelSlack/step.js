/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.sendMessageToChannelSlack = function (inputs) {

  var inputsLogic = {
    channel: inputs.channel || "",
    message: inputs.message || ""
  };

  var body  = {
    channel: inputsLogic.channel,
    text: inputsLogic.message
  }

  return slackFunction('chat.postMessage', body)
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
