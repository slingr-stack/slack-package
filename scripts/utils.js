/**
 * Verifies the token is the same as the verification token.
 *
 * @param {string} token                - The token to verify
 * @return {boolean}                    - True if the signature is valid, false otherwise.
 */
exports.verifyToken = function (token) {
    return token == config.get("verificationToken");
};