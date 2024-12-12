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
        if (pkg.slack.utils.verifyToken(body.token)) {
            if (body.type === 'url_verification') {
                return JSON.stringify({challenge: body.challenge});
            } else {
                sys.events.triggerEvent("slack:webhook", event.data);
                return;
            }
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};