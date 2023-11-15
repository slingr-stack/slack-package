<table class="table" style="margin-top: 10px">
    <thead>
    <tr>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Summary</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Slack package</td>
        <td>November 15, 2023</td>
        <td>Detailed description of the API of the Slack package.</td>
    </tr>
    </tbody>
</table>

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
  
### User API token

This is the user API token you get when installing your app (`OAuth Access Token` field). This token belongs 
to the user that installed the Slack app, and you can use it in the SLINGR app to call the Slack API on behalf 
of this user instead of using the bot. Please check the [Javascript API](#javascript-api) docs below to indicate
which token must be used.

### Bot API token

This is the bot API token you get when installing your app (`Bot User OAuth Access Token` field). This is a bot
token, and it has some limitations when using the web API (see [bot methods](https://api.slack.com/bot-users#bot-methods)).
When you use the package, you can indicate which token you need to use.

### Verification token

The verification token is used to validate the slash commands and interactive messages hitting the endpoint. You
will find it in the `Basic information` of your app in the field `Verification Token`.

### Slash commands URL

This is a read-only field and indicates the URL you have to configure in your Slack app to receive slash commands
in your SLINGR app.

### Interactive messages URL

This is a read-only field and indicates the URL you have to configure in your Slack app to receive interactive
messages in your SLINGR app.

### Options load URL

This is a read-only field and indicates the URL you have to configure in your Slack app to be able to provide
custom options in dropdowns. This is configured in the same place where you configure the interactive messages
URL.

### Events URL

This is a read-only field and indicates the URL you have to configure to subscribe to the events API. Keep in mind
that the package has to be pushed before configuring the events API in your Slack app because Slack will make
a test request to validate the URL, which will be valid only when the package and http service are pushed and deployed.

# Javascript API

The Javascript API of the slack package has two pieces:

- **HTTP requests**
- **Flow steps**

## HTTP requests
You can make `POST`,`GET` requests to the [slack API](API_URL_HERE) like this:
```javascript
var response = pkg.slack.user.post('/reactions.add', body)
var response = pkg.slack.user.post('/reactions.add')
var response = pkg.slack.user.get('/team.billableInfo')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Flow Step

As an alternative option to using scripts, you can make use of Flows and Flow Steps specifically created for the package:
<details>
    <summary>Click here to see the Flow Steps</summary>

<br>

### Generic Flow Step

Generic flow step for full use of the entire package and its services.

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
        <td>URL (Method)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            This is the http method to be used against the endpoint. <br>
            Possible values are: <br>
            <i><strong>POST,GET</strong></i>
        </td>
    </tr>
    <tr>
        <td>URL (Path)</td>
        <td>choice</td>
        <td>yes</td>
        <td> - </td>
        <td>Always</td>
        <td>
            The url to which this package will send the request. This is the exact service to which the http request will be made. <br>
            Possible values are: <br>
            <i><strong>/api.test<br>/auth.test<br>/chat.delete<br>/chat.meMessage<br>/chat.postMessage<br>/chat.unfurl<br>/chat.update<br>/conversations.archive<br>/conversations.close<br>/conversations.create<br>/conversations.invite<br>/conversations.join<br>/conversations.kick<br>/conversations.leave<br>/conversations.open<br>/conversations.rename<br>/conversations.setPurpose<br>/conversations.setTopic<br>/conversations.unarchive<br>/dialog.open<br>/views.open<br>/views.update<br>/views.publish<br>/views.push<br>/dnd.endDnd<br>/dnd.endSnooze<br>/files.comments.delete<br>/files.delete<br>/files.revokePublicURL<br>/files.sharedPublicURL<br>/files.upload<br>/oauth.access<br>/pins.add<br>/pins.remove<br>/reactions.add<br>/reactions.remove<br>/reminders.add<br>/reminders.complete<br>/reminders.delete<br>/stars.add<br>/stars.remove<br>/usergroups.create<br>/usergroups.disable<br>/usergroups.enable<br>/usergroups.update<br>/usergroups.users.update<br>/users.setActive<br>/users.setPhoto<br>/users.setPresence<br>/users.profile.set<br>/auth.revoke<br>/bots.info<br>/conversations.history<br>/conversations.info<br>/conversations.list<br>/conversations.members<br>/conversations.replies<br>/dnd.info<br>/dnd.setSnooze<br>/dnd.teamInfo<br>/admin.emoji.list<br>/files.info<br>/files.list<br>/pins.list<br>/reactions.get<br>/reactions.list<br>/reminders.info<br>/reminders.list<br>/rtm.start<br>/rtm.connect<br>/search.all<br>/search.files<br>/search.messages<br>/stars.list<br>/team.accessLogs<br>/team.billableInfo<br>/team.info<br>/team.integrationLogs<br>/team.profile.get<br>/usergroups.list<br>/usergroups.users.list<br>/users.deletePhoto<br>/users.getPresence<br>/users.identity<br>/users.info<br>/users.list<br>/users.lookupByEmail<br>/users.profile.get<br></strong></i>
        </td>
    </tr>
    <tr>
        <td>Headers</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom http header for the request.
        </td>
    </tr>
    <tr>
        <td>Query Params</td>
        <td>keyValue</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used when you want to have a custom query params for the http call.
        </td>
    </tr>
    <tr>
        <td>Body</td>
        <td>json</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            A payload of data can be sent to the server in the body of the request.
        </td>
    </tr>
    <tr>
        <td>Event</td>
        <td>dropDown</td>
        <td>no</td>
        <td> - </td>
        <td>Always</td>
        <td>
            Used to define event after the call. <br>
            Possible values are: <br>
            File Downloaded, Callback
        </td>
    </tr>
    <tr>
        <td>Callback data</td>
        <td>textarea</td>
        <td>no</td>
        <td> - </td>
        <td> Event is Callback </td>
        <td>
            This is an object you can send that you will get back when the function is processed.
        </td>
    </tr>
    <tr>
        <td>Callbacks</td>
        <td>Script</td>
        <td>no</td>
        <td> - </td>
        <td> Event is Callback </td>
        <td>
            This is a map where you can listen for different function
        </td>
    </tr>
    <tr>
        <td>Override Settings</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td>Always</td>
        <td></td>
    </tr>
    <tr>
        <td>Follow Redirect</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Indicates that the resource has to be downloaded into a file instead of returning it in the response.</td>
    </tr>
    <tr>
        <td>Download</td>
        <td>boolean</td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>If true the method won't return until the file has been downloaded, and it will return all the information of the file.</td>
    </tr>
    <tr>
        <td>File name</td>
        <td>text</td>
        <td>no</td>
        <td></td>
        <td> overrideSettings </td>
        <td>If provided, the file will be stored with this name. If empty the file name will be calculated from the URL.</td>
    </tr>
    <tr>
        <td>Full response</td>
        <td> boolean </td>
        <td>no</td>
        <td> false </td>
        <td> overrideSettings </td>
        <td>Include extended information about response</td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 5000 </td>
        <td> overrideSettings </td>
        <td>Connect a timeout interval, in milliseconds (0 = infinity).</td>
    </tr>
    <tr>
        <td>Read Timeout</td>
        <td> number </td>
        <td>no</td>
        <td> 60000 </td>
        <td> overrideSettings </td>
        <td>Read a timeout interval, in milliseconds (0 = infinity).</td>
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


</details>

For more information about how shortcuts or flow steps work, and how they are generated, take a look at the [slingr-helpgen tool](https://github.com/slingr-stack/slingr-helpgen).

## Additional Flow Step


<details>
    <summary>Click here to see the Customs Flow Steps</summary>

<br>



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


### Delete Message to channel

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

### Send message to channel

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


### Update message to channel

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

</details>

## Dependencies
* HTTP Service (Latest Version)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
