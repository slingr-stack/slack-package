/****************************************************
 Webhooks
 ****************************************************/

listeners.defaultSlackEvents = {
    label: 'Catch Slack Events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhookSync',
        matching: {
            path: '/slackEvents',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received slack webhook event. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token)) {
            if (event.data.body.type === 'url_verification') {
                sys.logs.info('[slack] Valid url verification. Sending challenge back.');
                return JSON.stringify({challenge: event.data.body.challenge});
            } else {
                sys.logs.info('[slack] Valid slack event received. Triggering event.');
                sys.events.triggerEvent("slack:slackEvent", event.data);
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
        event: 'webhookSync',
        matching: {
            path: '/slashCommands',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received slack slash command webhook. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token) || pkg.slack.utils.verifyToken(event.data.body.payload.token)) {
                sys.logs.info('[slack] Valid slash command received.');
                if (pkg.slack.utils.getConfiguration("slashCommandsEnabled") === "true") {
                    let customCode = pkg.slack.utils.createWrapper("slashCommandsScript", pkg.slack.utils.getConfiguration("slashCommandsScript"));
                    return sys.utils.script.eval(customCode, {eventData: event.data});
                } else {
                    sys.events.triggerEvent("slack:slashCommand", event.data);
                    return "Command received!";
                }
        } else {
            sys.logs.warn('[slack] Invalid verification token for event slash command');
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
            path: '/interactiveMessages',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received slack interactive webhook. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token) || pkg.slack.utils.verifyToken(event.data.body.payload.token)) {
            sys.logs.info('[slack] Valid interactive message received.');
            sys.events.triggerEvent("slack:interactiveMessage", event.data);
        } else {
            sys.logs.warn('[slack] Invalid verification token for interactive event');
        }
    }
};

listeners.defaultOptionLoads = {
    label: 'Catch Option Loads',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhookSync',
        matching: {
            path: '/optionsLoad',
        }
    },
    callback: function(event) {
        sys.logs.info('[slack] Received slack options load webhook. Processing and triggering a package event.');
        if (pkg.slack.utils.verifyToken(event.data.body.token) || pkg.slack.utils.verifyToken(event.data.body.payload.token)) {
            sys.logs.info('[slack] Valid option load received.');
            if (pkg.slack.utils.getConfiguration("optionLoadEnabled") === "true") {
                let customCode = pkg.slack.utils.createWrapper("optionLoadScript", pkg.slack.utils.getConfiguration("optionLoadScript"));
                return sys.utils.script.eval(customCode, {eventData: event.data});
            } else {
                return "Option Load request received!";
            }
        } else {
            sys.logs.warn('[slack] Invalid verification token for event options load');
        }
    }
};