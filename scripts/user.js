/****************************************************
 Dependencies
 ****************************************************/

let httpReference = dependencies.http;
let httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
};

let httpService = {};
/**
 *
 * Handles a request with retry from the platform side.
 */
function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    return requestFn(options, callbackData, callbacks);
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (let key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Sends an HTTP GET request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the GET request to.
 * @param {object} httpOptions  - The options to be included in the GET request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the GET request. [optional]
 * @return {object}             - The response of the GET request.
 */
exports.get = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.get(Slack(options), callbackData, callbacks);
};

/**
 * Sends an HTTP POST request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the POST request to.
 * @param {object} httpOptions  - The options to be included in the POST request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the POST request.
 */
exports.post = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.post(Slack(options), callbackData, callbacks);
};

/****************************************************
 Private helpers
 ****************************************************/

function checkHttpOptions (path, options) {
    options = options || {};
    if (!!path) {
        if (isObject(path)) {
            // take the 'path' parameter as the options
            options = path || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = path;
            } else {
                // create html package
                options = {
                    path: path,
                    body: options
                }
            }
        }
    }
    return options;
}

function isObject (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

let stringType = Function.prototype.call.bind(Object.prototype.toString)

/****************************************************
 Configurator
 ****************************************************/

let Slack = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    let API_URL = config.get("SLACK_API_BASE_URL");
    let url = options.path || "";
    options.url = API_URL + url;
    sys.logs.debug('[slack] Set url: ' + options.path + "->" + options.url);
    return options;
}

function setRequestHeaders(options) {
    let headers = options.headers || {};
    let authorization = options.authorization || {};
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
    const result = {};
    let key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
