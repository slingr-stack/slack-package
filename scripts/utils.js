/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Gets a configuration from the properties.
 *
 * @param {string} property - The name of the property to get. If it is empty, return the entire configuration object.
 * @return {string} - The value of the property or the whole object as string.
 */
exports.getConfiguration = function (property) {
    if (!property) {
        return config.get();
    }
    return config.get(property);
};

/**
 * Verifies the token is the same as the verification token.
 *
 * @param {string} token                - The token to verify
 * @return {boolean}                    - True if the signature is valid, false otherwise.
 */
exports.verifyToken = function (token) {
    return token === config.get("verificationToken");
};

/**
 * Creates a wrapper function to execute custom code through eval method.
 *
 * @param {string} wrapperName           - The name of the wrapper function
 * @param {string} code                 - The code to be executed inside the wrapper.
 * @return {string}                    - The string wrapper function.
 */
exports.createWrapper = function (wrapperName, code) {
    return `function ${wrapperName}(eventData) {
        ${escapeForEval(code)}
    }
    ${wrapperName}(context.eventData);`;
};

/**
 * Escapes potentially problematic characters for safe use in dynamically evaluated code.
 *
 * @param {string} code - The raw source code to sanitize before injecting into an eval wrapper.
 * @returns {string} - A sanitized, safe-to-eval string version of the input code.
 */
function escapeForEval(code) {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/`/g, '\\`');
}

