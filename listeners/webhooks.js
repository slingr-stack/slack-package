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
            if (body.type === 'url_verification') {
                return {challenge: body.challenge};
            }
            sys.events.triggerEvent("slack:event", event.data.body);
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};