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
                sys.logs.info('Valid sync webhook received. Triggering event.');
                sys.events.triggerEvent("slack:webhook", event.data);
            }
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};

listeners.defaultSlackWebhook = {
    label: 'Testing webhook',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
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
                sys.logs.info('Valid webhook received. Triggering event.');
                sys.events.triggerEvent("slack:webhook", event.data);
                return "ok";
            }
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};