<table>
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
        <td>September 4, 2023</td>
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

In order to use the Slack package you will need to create a [Slack app](https://api.slack.com/slack-apps).
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

## Quick start

Send a message to a channel:

```js
pkg.slack.functions.chat.postMessage({
  channel: '#test',
  text: 'hello!'
});
```

You can see more parameters to send messages [here](https://api.slack.com/methods/chat.postMessage).

# Javascript API

The Javascript API of the slack package has three pieces:

- **HTTP requests**: These allow making regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the package usage in SLINGR.

## HTTP requests
You can make `POST`,`GET` requests to the [slack API](API_URL_HERE) like this:
```javascript
var response = pkg.slack.functions.post('/reactions.add', body)
var response = pkg.slack.functions.post('/reactions.add')
var response = pkg.slack.functions.get('/team.billableInfo')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the package:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/admin.emoji.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.adminEmojiList.get()
```
---
* API URL: '/api.test'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.apiTest.post(body)
```
---
* API URL: '/auth.revoke'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.authRevoke.get()
```
---
* API URL: '/auth.test'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.authTest.post(body)
```
---
* API URL: '/bots.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.botsInfo.get()
```
---
* API URL: '/chat.delete'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.chatDelete.post(body)
```
---
* API URL: '/chat.meMessage'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.chatMeMessage.post(body)
```
---
* API URL: '/chat.postMessage'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.chatPostMessage.post(body)
```
---
* API URL: '/chat.unfurl'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.chatUnfurl.post(body)
```
---
* API URL: '/chat.update'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.chatUpdate.post(body)
```
---
* API URL: '/conversations.archive'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsArchive.post(body)
```
---
* API URL: '/conversations.close'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsClose.post(body)
```
---
* API URL: '/conversations.create'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsCreate.post(body)
```
---
* API URL: '/conversations.history'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.conversationsHistory.get()
```
---
* API URL: '/conversations.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.conversationsInfo.get()
```
---
* API URL: '/conversations.invite'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsInvite.post(body)
```
---
* API URL: '/conversations.join'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsJoin.post(body)
```
---
* API URL: '/conversations.kick'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsKick.post(body)
```
---
* API URL: '/conversations.leave'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsLeave.post(body)
```
---
* API URL: '/conversations.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.conversationsList.get()
```
---
* API URL: '/conversations.members'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.conversationsMembers.get()
```
---
* API URL: '/conversations.open'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsOpen.post(body)
```
---
* API URL: '/conversations.rename'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsRename.post(body)
```
---
* API URL: '/conversations.replies'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.conversationsReplies.get()
```
---
* API URL: '/conversations.setPurpose'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsSetPurpose.post(body)
```
---
* API URL: '/conversations.setTopic'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsSetTopic.post(body)
```
---
* API URL: '/conversations.unarchive'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.conversationsUnarchive.post(body)
```
---
* API URL: '/dialog.open'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.dialogOpen.post(body)
```
---
* API URL: '/dnd.endDnd'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.dndEndDnd.post(body)
```
---
* API URL: '/dnd.endSnooze'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.dndEndSnooze.post(body)
```
---
* API URL: '/dnd.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.dndInfo.get()
```
---
* API URL: '/dnd.setSnooze'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.dndSetSnooze.get()
```
---
* API URL: '/dnd.teamInfo'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.dndTeamInfo.get()
```
---
* API URL: '/files.comments.delete'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.filesCommentsDelete.post(body)
```
---
* API URL: '/files.delete'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.filesDelete.post(body)
```
---
* API URL: '/files.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.filesInfo.get()
```
---
* API URL: '/files.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.filesList.get()
```
---
* API URL: '/files.revokePublicURL'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.filesRevokePublicURL.post(body)
```
---
* API URL: '/files.sharedPublicURL'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.filesSharedPublicURL.post(body)
```
---
* API URL: '/files.upload'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.filesUpload.post(body)
```
---
* API URL: '/oauth.access'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.oauthAccess.post(body)
```
---
* API URL: '/pins.add'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.pinsAdd.post(body)
```
---
* API URL: '/pins.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.pinsList.get()
```
---
* API URL: '/pins.remove'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.pinsRemove.post(body)
```
---
* API URL: '/reactions.add'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.reactionsAdd.post(body)
```
---
* API URL: '/reactions.get'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.reactionsGet.get()
```
---
* API URL: '/reactions.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.reactionsList.get()
```
---
* API URL: '/reactions.remove'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.reactionsRemove.post(body)
```
---
* API URL: '/reminders.add'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.remindersAdd.post(body)
```
---
* API URL: '/reminders.complete'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.remindersComplete.post(body)
```
---
* API URL: '/reminders.delete'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.remindersDelete.post(body)
```
---
* API URL: '/reminders.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.remindersInfo.get()
```
---
* API URL: '/reminders.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.remindersList.get()
```
---
* API URL: '/rtm.connect'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.rtmConnect.get()
```
---
* API URL: '/rtm.start'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.rtmStart.get()
```
---
* API URL: '/search.all'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.searchAll.get()
```
---
* API URL: '/search.files'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.searchFiles.get()
```
---
* API URL: '/search.messages'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.searchMessages.get()
```
---
* API URL: '/stars.add'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.starsAdd.post(body)
```
---
* API URL: '/stars.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.starsList.get()
```
---
* API URL: '/stars.remove'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.starsRemove.post(body)
```
---
* API URL: '/team.accessLogs'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.teamAccessLogs.get()
```
---
* API URL: '/team.billableInfo'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.teamBillableInfo.get()
```
---
* API URL: '/team.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.teamInfo.get()
```
---
* API URL: '/team.integrationLogs'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.teamIntegrationLogs.get()
```
---
* API URL: '/team.profile.get'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.teamProfileGet.get()
```
---
* API URL: '/usergroups.create'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usergroupsCreate.post(body)
```
---
* API URL: '/usergroups.disable'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usergroupsDisable.post(body)
```
---
* API URL: '/usergroups.enable'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usergroupsEnable.post(body)
```
---
* API URL: '/usergroups.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usergroupsList.get()
```
---
* API URL: '/usergroups.update'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usergroupsUpdate.post(body)
```
---
* API URL: '/usergroups.users.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usergroupsUsersList.get()
```
---
* API URL: '/usergroups.users.update'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usergroupsUsersUpdate.post(body)
```
---
* API URL: '/users.deletePhoto'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usersDeletePhoto.get()
```
---
* API URL: '/users.getPresence'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usersGetPresence.get()
```
---
* API URL: '/users.identity'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usersIdentity.get()
```
---
* API URL: '/users.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usersInfo.get()
```
---
* API URL: '/users.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usersList.get()
```
---
* API URL: '/users.lookupByEmail'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usersLookupByEmail.get()
```
---
* API URL: '/users.profile.get'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usersProfileGet.get()
```
---
* API URL: '/users.profile.set'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usersProfileSet.post(body)
```
---
* API URL: '/users.setActive'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usersSetActive.post(body)
```
---
* API URL: '/users.setPhoto'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usersSetPhoto.post(body)
```
---
* API URL: '/users.setPresence'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usersSetPresence.post(body)
```
---
* API URL: '/views.open'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.viewsOpen.post(body)
```
---
* API URL: '/views.publish'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.viewsPublish.post(body)
```
---
* API URL: '/views.push'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.viewsPush.post(body)
```
---
* API URL: '/views.update'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.viewsUpdate.post(body)
```
---

</details>

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

## Additional Helpers
*MANUALLY ADD THE DOCUMENTATION OF THESE HELPERS HERE...*

## Dependencies
* HTTP Service (Latest Version)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
