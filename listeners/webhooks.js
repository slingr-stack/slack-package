/****************************************************
 Webhooks
 ****************************************************/

listeners.defaultSlackEvents = {
    label: 'Catch HTTP Slack events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhookSync',
        matching: {
            path: '/slack-events',
        }
    },
    callback: function(event) {
        let body = event.data.body;
        if (pkg.slack.utils.verifySignature(body.token)) {
            return body;
            sys.events.triggerEvent("slack:event", event.data.body);
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};

listeners.slackChallenge = {
    label: 'Catch Slack challenge',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/challenge',
        }
    },
    callback: function(event) {
        let body = event.data.body;
        if (pkg.slack.utils.verifyToken(body.token)) {
            if (body.type === 'url_verification') {
                return JSON.stringify({challenge: body.challenge});
            }
            sys.events.triggerEvent("slack:event", event.data.body);
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};