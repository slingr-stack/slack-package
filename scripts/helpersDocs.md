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

