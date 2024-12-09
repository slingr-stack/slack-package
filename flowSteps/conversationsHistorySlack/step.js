/****************************************************
 Dependencies
 ****************************************************/

var httpService = dependencies.http;

/**
 * This flow step will send generic request.
 *
 * @param {object} inputs
 */
step.conversationsHistorySlack = function (inputs) {

  var inputsLogic = {
    channel: inputs.channel || ""
  };

  var options = {
    body: {
      channel: inputsLogic.channel
    },
    path: "/conversations.history",
  };
  options= setApiUri(options);
  options= setRequestHeaders(options);

  return httpService.get(options)
}

function parse (url, pathVariables){
  var regex = /{([^}]*)}/g;
  if (!url.match(regex)){
    return url;
  }
  if(!pathVariables){
    sys.logs.error('No path variables have been received and the url contains curly brackets\'{}\'');
    throw new Error('Error please contact support.');
  }
  url = url.replace(regex, function(m, i) {
    return pathVariables[i] ? pathVariables[i] : m;
  })
  return url;
}

function isObject (obj) {
  return !!obj && stringType(obj) === '[object Object]'
}

var stringType = Function.prototype.call.bind(Object.prototype.toString);

function stringToObject (obj) {
  if (!!obj){
    var keyValue = obj.toString().split(',');
    var parseObj = {};
    for(var i = 0; i < keyValue.length; i++) {
      parseObj[keyValue[i].split('=')[0]] = keyValue[i].split('=')[1]
    }
    return parseObj;
  }
  return null;
}

function setApiUri(options) {
  var API_URL = config.get("SLACK_API_BASE_URL");
  var url = options.path || "";
  options.url = API_URL + url;
  sys.logs.debug('[slack] Set url: ' + options.path + "->" + options.url);
  return options;
}

function setRequestHeaders(options) {
  var headers = options.headers || {};
  var authorization = options.authorization || {};
  if (config.get("userApiToken")) {
    sys.logs.debug('[slack] Set header bearer');
    authorization = mergeJSON(authorization, {
      type: "oauth2",
      accessToken: config.get('userApiToken'),
      headerPrefix: "Bearer"
    });
    options.authorization = authorization;
  }
  headers = mergeJSON(headers, {"Content-Type": "application/json"});

  options.headers = headers;
  return options;
}

function mergeJSON (json1, json2) {
  var result = {};
  var key;
  for (key in json1) {
    if(json1.hasOwnProperty(key)) result[key] = json1[key];
  }
  for (key in json2) {
    if(json2.hasOwnProperty(key)) result[key] = json2[key];
  }
  return result;
}
