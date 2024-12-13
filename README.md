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
to the user that installed the Slack app, and you can use it in the SLINGR app to call the Slack API on behalf 
of this user instead of using the bot. Please check the [Javascript API](#javascript-api) docs below to indicate
which token must be used.

### Bot API Token

This is the bot API token you get when installing your app (`Bot User OAuth Access Token` field). This is a bot
token, and it has some limitations when using the web API (see [bot methods](https://api.slack.com/bot-users#bot-methods)).
When you use the package, you can indicate which token you need to use.

### Verification Token

The verification token is used to validate the slash commands and interactive messages hitting the endpoint. You
will find it in the `Basic information` of your app in the field `Verification Token`.

### Slash Commands URL

This is a read-only field and indicates the URL you have to configure in your Slack app to receive slash commands
in your SLINGR app.

### Interactive Messages URL

This is a read-only field and indicates the URL you have to configure in your Slack app to receive interactive
messages in your SLINGR app.

### Options Load URL

This is a read-only field and indicates the URL you have to configure in your Slack app to be able to provide
custom options in dropdowns. This is configured in the same place where you configure the interactive messages
URL.

### Events URL

This is a read-only field and indicates the URL you have to configure to subscribe to the events API. Keep in mind
that the package has to be pushed before configuring the events API in your Slack app because Slack will make
a test request to validate the URL, which will be valid only when the package and http service are pushed and deployed.

## HTTP Requests
You can make `POST`,`GET` requests to the [slack API](API_URL_HERE) like this:
```javascript
var response = pkg.slack.user.post('/reactions.add', body)
var response = pkg.slack.user.post('/reactions.add')
var response = pkg.slack.user.get('/team.billableInfo')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

### Conversations History

Gets a conversation's history

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>Channel</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>Conversation ID to fetch history for.</td>
      </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>Object resulting from the response to the endpoint call.</td>
    </tr>
    </tbody>
</table>


### Delete Message

This step deletes a message from a conversation.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>Channel</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>Channel containing the message to be deleted.</td>
      </tr>
      <tr>
          <td>Message Id</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>Timestamp of the message to be deleted. Example "1405894322.002768"</td>
      </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>Object resulting from the response to the endpoint call.</td>
    </tr>
    </tbody>
</table>

### Send Message

Send a message to a channel.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>Channel</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>Channel containing the message to be deleted.</td>
      </tr>
      <tr>
          <td>Message</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>The message which will be sent to a channel.</td>
      </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>


### Update Message

This step updates a message in a channel.

<h3>Inputs</h3>

<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>Channel</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>Channel containing the message to be deleted.</td>
      </tr>
      <tr>
          <td>Message Id</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>Timestamp of the message to be updated. Example "1405894322.002768"</td>
      </tr>
      <tr>
          <td>Message</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>The message which will be sent to a channel</td>
      </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>

### User Info

This step returns information about a member of a workspace.

<h3>Inputs</h3>
<table>
    <thead>
    <tr>
        <th>Label</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Visibility</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
          <td>User Id</td>
          <td>text</td>
          <td>yes</td>
          <td> - </td>
          <td>Always</td>
          <td>User id to get info</td>
      </tr>
    </tbody>
</table>

<h3>Outputs</h3>

<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>response</td>
        <td>object</td>
        <td>
            Object resulting from the response to the endpoint call.
        </td>
    </tr>
    </tbody>
</table>

## Dependencies
* HTTP Service

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
