/****************************************************
 Webhooks
 ****************************************************/

listeners.defaultSlackEvents = {
    label: 'Catch Slack events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhookSync',
        matching: {
            path: '/slack/events',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received Slack webhook. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token)) {
            if (body.type === 'url_verification') {
                sys.logs.info('[slack] Valid url verification. Sending challenge back.');
                return JSON.stringify({challenge: event.data.body.challenge});
            } else {
                sys.logs.info('Valid slack event received. Triggering event.');
                sys.events.triggerEvent("slack:event", event.data);
            }
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};

listeners.defaultSlashCommands = {
    label: 'Catch Slash Commands',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/slack/slashCommands',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received Slack webhook. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token)) {
                sys.logs.info('[slack] Valid slash command received. Triggering package event.');
                sys.events.triggerEvent("slack:slashCommand", event.data);
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};

listeners.defaultInteractiveMessages = {
    label: 'Catch Interactive Messages',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/slack/interactiveMessages',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received Slack webhook. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token)) {
            sys.logs.info('[slack] Valid interactive message received. Triggering package event.');
            sys.events.triggerEvent("slack:interactiveMessages", event.data);
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};

listeners.defaultOptonLoads = {
    label: 'Catch Option Loads',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/slack/optionsLoad',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received Slack webhook. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token)) {
            sys.logs.info('[slack] Valid option load received. Triggering package event.');
            sys.events.triggerEvent("slack:optionsLoad", event.data);
        } else {
            sys.logs.warn('[slack] Invalid verification token for event');
        }
    }
};