# Overview

The Slack package supports the following features:

- Shortcuts for web API
- Interactive messages
- Slash commands
- Events API
- Conversations

In most cases, data formats and methods available are the same you can find in the 
[Slack API documentation](https://api.slack.com), so we strongly suggest reading it
and understanding how it works.

## Configuration

To use the Slack package you will need to create a [Slack app](https://api.slack.com/slack-apps).
Depending on the features you need to use from the package, you will need to enable different
features in the Slack app:

- **Bot users**: if you want to use bots, you will need to add a bot to your Slack app. That can be
  done from the app page in Slack, in the section `Bot Users`.
- **Slash commands**: if you need slash commands, you have create them in your Slack app. When configuring
  a slash command, you will be asked to enter the `Request URL`. This URL is available in the package's
  configuration screen in the field `Slash commands URL`.
- **Interactive messages**: if you need interactive messages, you have to enable that in your Slack app. When
  doing so you will be requested to enter the `Request URL`. This URL is available in the package's
  configuration screen in the field `Interactive messages URL`.
  If you need to support dynamic options in dropdowns, you can also configure the `Options Load URL` here.
- **Events API**: if you need events to be sent over HTTP, you can enable events in your Slack app. You will
  be asked to enter the `Request URL`. This URL is available in the package's configuration screen in the
  field `Events URL`.
  
Other things you need to take into account:

- **Check scopes**: in your Slack app, in the section `OAuth & Permissions`, make sure the following scopes
  are selected:
  - `commands`: this is optional and only needed if you want to use slash commands.
  - `chat:write:user`: this is option and only needed if you want to post messages on behalf of a user.
- **Install app on your team**: right from the configuration of your Slack app you will be able to install
  the app on your team. That will provide you the user and bot token, that will be needed during the
  configuration of the package.
- **Events subscriptions**: before enabling this feature, you will need to make sure the Slack package is
  already pushed. This is because Slack will check the URL is valid in order to allow saving the URL.
  
Below, we describe the settings that can be configured for the package.  
  
### User API Token

This is the user API token you get when installing your app (`OAuth Access Token` field). This token belongs 
to the user that installed the Slack app, and you can use it in the Slingr app to call the Slack API on behalf 
of this user instead of using the bot. Please check the [Javascript API](#javascript-api) docs below to indicate
which token must be used.

**Name**: userApiToken **Type**: text **Mandatory**: false

### Bot API Token


This is the bot API token you get when installing your app (`Bot User OAuth Access Token` field). This is a bot
token, and it has some limitations when using the web API (see [bot methods](https://api.slack.com/bot-users#bot-methods)).
When you use the package, you can indicate which token you need to use.

**Name**: botApiToken **Type**: text **Mandatory**: true

### Verification Token

The verification token is used to validate the slash commands and interactive messages hitting the endpoint. You
will find it in the `Basic information` of your app in the field `Verification Token`.

**Name**: verificationToken **Type**: text **Mandatory**: false

### Slash Commands URL

This is a read-only field and indicates the URL you have to configure in your Slack app to receive slash commands
in your Slingr app.<br>
The Slash Commands URL is a generated URL that follows the pattern `https://<appName>.slingrs.io/<environment>/services/<httpServiceName>/slashCommands`

To set this URL go to your Slack app page:<br>
Slash Commands > Create New Command > Request URL

### Interactive Messages URL

This is a read-only field and indicates the URL you have to configure in your Slack app to receive interactive
messages in your Slingr app.<br>
The Interactive Messages URL is a generated URL that follows the pattern `https://<appName>.slingrs.io/<environment>/services/<httpServiceName>/interactiveMessages`

To set this URL go to your Slack app page:<br>
Interactivity & Shortcuts > Request URL

### Options Load URL

This is a read-only field and indicates the URL you have to configure in your Slack app to be able to provide
custom options in dropdowns. This is configured in the same place where you configure the interactive messages
URL.<br>
The Options Load URL is a generated URL that follows the pattern `https://<appName>.slingrs.io/<environment>/services/<httpServiceName>/optionLoads`

To set this URL go to your Slack app page:<br>
Interactivity & Shortcuts > Select Menus > Options Load URL

### Events URL

This is a read-only field and indicates the URL you have to configure to subscribe to the events API. Keep in mind
that the package has to be pushed before configuring the events API in your Slack app because Slack will make
a test request to validate the URL, which will be valid only when the package and http service are pushed and deployed.<br>
The Events URL is a generated URL that follows the pattern `https://<appName>.slingrs.io/<environment>/services/<httpServiceName>/sync/slackEvents`

To set this URL go to your Slack app page:<br>
Event Subscriptions > Request URL
 
## Javascript API

### HTTP Requests
You can make `POST`,`GET` requests to the [slack API](https://api.slack.com) like this:
```javascript
var response = pkg.slack.user.post('/reactions.add', body)
var response = pkg.slack.user.post('/reactions.add')
var response = pkg.slack.user.get('/team.billableInfo')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Dependencies
* HTTP Service

# About Slingr

Slingr is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about Slingr](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
