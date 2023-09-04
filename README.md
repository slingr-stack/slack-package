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
---
title: Slack endpoint
keywords: 
last_updated: October 25, 2022
tags: []
summary: "Detailed description of the API of the Slack endpoint."
---

# Overview

The Slack endpoint supports the following features:

- Shortcuts for web API
- Interactive messages
- Slash commands
- Events API
- Conversations

In most cases data formats and methods available are the same you can find in the 
[Slack API documentation](https://api.slack.com), so we strongly suggest to read it
and understand how it works.

## Configuration

In order to use the Slack endpoint you will need to create a [Slack app](https://api.slack.com/slack-apps).
Depending on the features you need to use from the endpoint you will need to enable different
features in the Slack app:

- **Bot users**: if you want to use bots, you will need to add a bot to your Slack app. That can be
  done from the app page in Slack, in the section `Bot Users`.
- **Slash commands**: if you need slash commands, you have create them in your Slack app. When configuring
  an slash command you will be asked to enter the `Request URL`. This URL is available in the endpoint's
  configuration screen in the field `Slash commands URL`.
- **Interactive messages**: if you need interactive messages, you have to enable that in your Slack app. When
  doing so you will be requested to enter the `Request URL`. This URL is available in the endpoints's
  configuration screen in the field `Interactive messages URL`.
  If you need to support dynamic options in dropdowns, you can also configure the `Options Load URL` here.
- **Events API**: if you need events to be sent over HTTP, you can enable events in your Slack app. You will
  be asked to enter the `Request URL`. This URL is available in the endpoint's configuration screen in the
  field `Events URL`.
  
Other things you need to take into account:

- **Check scopes**: in your Slack app, in the section `OAuth & Permissions`, make sure the following scopes
  are selected:
  - `commands`: this is optional and only needed if you want to use slash commands.
  - `chat:write:user`: this is option and only needed if you want to post messages on behalf of a user.
- **Install app on your team**: right from the configuration of your Slack app you will be able to install
  the app on your team. That will provide you the user and bot token, that will be needed during the
  configuration of the endpoint.
- **Events subscriptions**: before enabling this feature you will need to make sure the Slack endpoint is
  already deployed. This is because Slack will check the URL is valid in order to allow to save the URL.
  This means that you will need to create the endpoint, configure basic settings, push changes, make sure
  endpoint is deployed and then you will be able to configure events subscriptions in your Slack app.
  
Below we describe the settings that can be configure for the endpoint.  
  
### Profiles

The Slack endpoint provides three profiles based on how much resources it needs. The more users you have
in your team and more calls are done from your app to the endpoint, the more resources the endpoint will
need.

There are three profiles:

- `Default`: this should be good for most cases. If you have more than 500 users and there are many calls to
  the endpoint you might want to consider using other profile.
- `Medium team`: this is for teams with more than 500 and when there are more calls to the endpoint. More 
  resources will be allocated to handle the load.
- `Big team`: this profile is for big teams (more than 1,000 users) and when you app makes a lot of calls to
  the endpoint.
  
There is no strict rule on which profile you will need. We recommend to start with the `Default` one and move
up as you see you need more resources in your endpoint. You will notice that you need more resources because
when the endpoint has troubles handling the load you will see some errors in the logs saying that there were
problems calling the endpoint.

### User API token

This is the user API token you get when installing your app (`OAuth Access Token` field). This token belongs 
to the user that installed the Slack app and you can use it in the SLINGR app to call the Slack API on behalf 
of this user instead of using the bot. Please check the [Javascript API](#javascript-api) docs below to indicate
which token must be used.

### Bot API token

This is the bot API token you get when installing your app (`Bot User OAuth Access Token` field). This is a bot
token and it has some limitation when using the web API (see [bot methods](https://api.slack.com/bot-users#bot-methods)).
When you use the endpoint you can indicate which token to use, but the bot token is the default one to use.

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
that the endpoint has to be deployed before configuring the events API in your Slack app because Slack will make
a test request to validate the URL, which will be valid only when the endpoint is deployed.

## Quick start

Send a message to a channel:

```js
pkg.slack.functions.chat.postMessage({
  channel: '#test',
  text: 'hello!'
});
```

You can see more parameters to send messages [here](https://api.slack.com/methods/chat.postMessage).

## Javascript API

In order to avoid limiting the functionality of the Slack API we have established a one-to-one mapping of the methods
available in the [Slack API](https://api.slack.com/web) and the API of the endpoint. For example the Slack API has the
following URLs:

```
https://slack.com/api/channels.info
https://slack.com/api/channels.list
https://slack.com/api/chat.postMessage
```

For these methods you will find the corresponding ones in the endpoint API:

```js
pkg.slack.functions.channels.info(params);
pkg.slack.functions.channels.list(params);
pkg.slack.functions.chat.postMessage(params);
```

So the patterns is always the followed and the name in the Slack documentation is the same as the name in the endpoint API.

The same happen with parameters. For example the method `channels.list` has the following params:

- `token`
- `exclude_archived`

The `token` is automatically sent by the endpoint, but you can pass other params:

```js
var res = pkg.slack.functions.channels.list({exclude_archived: 'true'});
```

Finally the data format is also the same as indicated in the Slack documentation. This way you can work with the endpoint
by looking at the Slack documentation which is always up-to-date and has all the information your need.

There are a few exceptions that we will describe in the next sections.

### Making calls using the user token

By default all calls are done using the bot token. However bots have some limitations and cannot use some of the methods.
If you need to use the user token, you need to pass an additional parameter to the method named `send_as_user`:

```js
pkg.slack.functions.channels.create({
  send_as_user: true, 
  name: 'newchannel'
});
```

### Uploading files

To upload files you can use the form specified in the Slack documentation for the method `files.upload`. However in this
case you are responsible for sending the content.

In most cases you will have the file uploaded in your SLINGR app and you want to upload it to Slack. To make it simpler
we added a field called `file_id` that allows you to just send the ID of the SLINGR file and it will be uploaded 
automatically:

```js
var res = pkg.slack.functions.files.upload({
        file_id: record.field('attachment').id(),
        filename: record.field('attachment').name(),
        channels: '#test'
});
sys.logs.info('File uploaded: '+response.file.url_private_download);
```

### Downloading files

When you list files on Slack you will get the URL but not the actual file. You will need to download it.

To make this easier we added a method that doesn't exists on the Slack API:

```js
var res = pkg.slack.functions.files.download({
  file_id: 'F4Q26SE0Y', 
  sync: true
}); 

sys.logs.info('File downloaded: ');
sys.logs.info(' - id: '+res.fileId);
sys.logs.info(' - name: '+res.fileName);
sys.logs.info(' - content type: '+res.contentType);

// you can save it in a record field as well
record.field('attachment').val(res.fileId);
```

You could also do the download of the file in an asynchronous way (which is the default):

```js
var res = pkg.slack.functions.files.download({file_id: 'F4Q26SE0Y'}, {record: record}, {
  'fileDownloaded': function(event) {
    sys.logs.info('File downloaded event: ');
    sys.logs.info(' - id: '+event.data.fileId);
    sys.logs.info(' - name: '+event.data.fileName);
    sys.logs.info(' - content type: '+event.data.contentType);
    
    // you can save it in a record field as well
    record.field('attachment').val(res.fileId);
  }
}); 
```

In this case see that the callback follows the rules explained [here](app_development_model_endpoints.html#callbacks).
For this reason in order to use the `record` variable inside the callback function you need to pass it in the
method call.

### Respond to slash commands and interactive messages

There are some helpers to respond to slash commands and interactive messages:

```js
pkg.slack.functions.respondToSlashCommand(responseUrl, message);
pkg.slack.functions.respondToInteractiveMessage(responseUrl, message);
```

The `responseUrl` can be found in the event of slash commands or interactive messages. For example your listener
could be something like this:

```js
var message = {
    response_type: 'ephemeral',
    text: 'test response'
};
pkg.slack.functions.respondToSlashCommand(event.data.response_url, message);
```

### Other helper methods

We provide a few helper methods to make it easier to work with the data coming from the Slack endpoint:

- `getTeamName(id)`: returns the team's name for the given team ID.
- `getUserName(id)`: returns the user's name for the given user ID.
- `getChannelName(id)`: returns the channel's name for the given channel ID.
- `getDate(timestamp)`: converts a timestamp in the Slack format to a `Date` object that you can assign to
  date fields in SLINGR. For example if you get the following event from Slack:
  
  ```js
  {
      "type": "message",
      "ts": "1358878749.000002",
      "user": "U023BECGF",
      "text": "Hello"
  }
  ```
  
  You could convert the date like this:
  
  ```js
  var date = pkg.slack.functions.getDate(event.data.ts);
  record.field('timestamp').val(date);
  ```

### Conversations

The endpoint adds some features on top of the Slack API to make it easier to create conversations. To register a
conversation you need to call the method `convo.registerConvo()`:

```js
pkg.slack.functions.convo.registerConvo(name, patterns, listeners, callback);
```

Where:

- `name`: this is unique name for the conversation.
- `patterns`: indicate which are the messages that will trigger this conversation. You can use simple text or regular
  expressions. For example if you put `hello` it will match when a user writes `hello`.
- `listeners`: apart from matching the pattern, the message must be in some of the places this conversation will be
  listening to. Options are:
  - `mention`: the message will be evaluated against patterns only if it contains a mention to the bot. For
    example if the bot's name is `mybot`, a message will be evaluated if it is something like `save this note @mybot`.
  - `direct_mention`: similar to `mention`, but in this case the mention to the bot should be the first thing in the
    message, like `@mybot save this note`.
  - `direct_message`: messages will be evaluated if they are sent as a direct message to the bot.
  - `ambient`: all messages that the bot can see (based on the channels the bot is in) will be evaluated against the
    patterns.
- `callback`: this is the function called when a message in a valid context (based on `listeners`) matches one of the
  patterns. You will get three parameters:
  - `msg`: this is the message that trigger the event. Here is a sample of this object:
    ```
    {
      text: 'text of the message',
      user_id: 'U82661273',
      user: '<@U82661273>',
      channel_id: 'C89234774',
      channel: '<#C89234774>'
    }
    ```
  - `convo`: this is the conversation object. This is the object you should use to handle the conversation. It has the
    following methods:
    - `say(msg)`: writes something in the conversation. You can send a simple string or a complex Slack message. There
      is one special parameter to replace the previous message like this: `say({text: 'replace original message!, replace: true})`.
    - `ask(msg, callbacks)`: this will print the message and will wait for an interaction with the user (via message or
      button). You can also use the `replace` falg to replace the original message. The list of callbacks have the following
      settings:
      - `patterns`: these are the patterns that have to match to execute this callback. You can use regular expressions
        here and there is a special format for matching buttons which is `button[name=value]`. You can specify many
        patterns in an array.
      - `callback`: this is the function that will be executed if any of the patterns matches. This function can take
        four parameters: 
        - `msg`: the message that matched this callback.
        - `convo`: the conversation object.
        - `data`: the data passed to this callback (see the `data` object below).
        - `event`: the raw Slack event. 
      - `data`: if you want to send some additional data to the callback (it will be passed as a parameter to it), you
        can set something here. For example this is useful if you need to collect information through the conversation.
      - `default`: if `true`, this callback will be called if no one matches. No need to define patterns in this case.
    - `repeat(msg, data)`: repeats the last message, which is useful if the user didn't write a valid message in the 
      conversation. Parameters `msg` and `data` are optional in case you want to change the original question and provide
      different data to callbacks.
    - `stop()`: stops the conversation. It is important to stop conversations when they are completed to avoid resource
      leaks.
  - `event`: the raw Slack event.

Ideally you should register conversations in libraries, where you can organize them as you prefer. However during
development it is also useful to register conversations in the console in the app runtime because you can make changes
to it quickly without having to push changes all the time.

Apart from executing conversations based on patterns, you can manually triggered them:
  
```js
pkg.slack.functions.convo.triggerConvo('conversation-name', channelId, userId);
```

For example if you want to trigger the conversation `hello` every time a channel is created, you could add a listener
to the event `channel_created`:

```js
if (event.data.type == 'channel_created') {
  pkg.slack.functions.convo.triggerConvo('hello', event.data.channel.id, event.data.channel.creator);
}
```

Here is a simple conversation:

```js
pkg.slack.functions.convo.registerConvo('hello', ['hello', '^hi$'], ['direct_mention', 'direct_message'], function(msg, convo) {
  convo.say('hi '+msg.user);
  convo.ask('what do you want to do? [1, 2, 3]', [
    {
      patterns: ['1'],
      callback: function(msg, convo) {
        convo.say('you selected option 1!');
        convo.say('bye!');
        convo.stop();
      }
    },
    {
      patterns: ['2'],
      callback: function(msg, convo) {
        convo.say('you selected option 2!');
        convo.say('bye!');
        convo.stop();
      }
    },
    {
      patterns: ['3'],
      callback: function(msg, convo) {
        convo.say('you selected option 3!');
        convo.say('bye!');
        convo.stop();
      }
    },
    {
      default: true,
      callback: function(msg, convo) {
        convo.say('sorry, i dont understand you');
        convo.repeat();
      }
    }
  ]);
});
```

Here is another conversation with buttons:

```js
pkg.slack.functions.convo.registerConvo('hello', ['hello', '^hi$'], ['direct_mention', 'direct_message'], function(msg, convo) {
  convo.say('hi '+msg.user);
  convo.ask({
      text: 'what do you want to do?',
      attachments: [
        {
            text: "select one option",
            callback_id: "options1",
            color: "#3AA3E3",
            attachment_type: "default",
            actions: [
                {
                    name: "option",
                    text: "1",
                    type: "button",
                    value: "1"
                },
                {
                    name: "option",
                    text: "2",
                    type: "button",
                    value: "2"
                },
                {
                    name: "option",
                    text: "3",
                    type: "button",
                    value: "3"
                }
            ]
        }
      ]
    }, [
    {
      patterns: ['button[option=1]'],
      data: {a: 1, b: 2},
      callback: function(msg, convo, data) {
        convo.say({text: 'you selected option 1!', replace: true, attachments: []});
        convo.say('`'+JSON.stringify(data)+'`');
        convo.stop();
      }
    },
    {
      patterns: ['button[option=2]'],
      data: {a: 2, b: 3},
      callback: function(msg, convo, data) {
        convo.say({text: 'you selected option 2!', replace: true, attachments: []});
        convo.say('`'+JSON.stringify(data)+'`');
        convo.stop();
      }
    },
    {
      patterns: ['button[option=3]'],
      data: {a: 4, b: 5},
      callback: function(msg, convo, data) {
        convo.say({text: 'you selected option 3!', replace: true, attachments: []});
        convo.say('`'+JSON.stringify(data)+'`');
        convo.stop();
      }
    }
  ]);
});
```

You can also use menus and you can match them in callbacks using `select[name=value]`. For example to match if 
the user selected the option `1` in menu `type`:

```js
{
  patterns: ['select[type=1]'],
  callback: function(msg, convo, data) {
    convo.say({text: 'you selected option 1!', replace: true, attachments: []});
    convo.stop();
  }
}
```

It is possible to match any value in the menu using the `*` value:

```js
{
  patterns: ['select[type=*]'],
  callback: function(msg, convo, data) {
    convo.say({text: 'you selected option '+msg.action_value+'!', replace: true, attachments: []});
    convo.stop();
  }
}
```

## Events

### HTTP events

These events are generated by the [Events API](https://api.slack.com/events-api). This could be useful if you don't want a bot in your app and
you just want to use the events API.

The format of events is the same as explained in the Slack documentation, so you should find the same structure
under the `event.data` in your listeners.

### Interactive messages

When a user interacts with messages (for example by clicking in a button) you will get an event in your app. See
the documentation for [Interactive messages](https://api.slack.com/interactive-messages) to learn more about how
they work.

The format of events is the same as explained in the Slack documentation, so you should find the same structure
under the `event.data` in your listeners.

### Options load

This event is sent when Slack needs to fill a dropdown with dynamic options. The content of `event.data` will be
something like this (see [Populate message menus dynamically](https://api.slack.com/docs/message-menus#menu_dynamic)):

```js
{
    "name": "bugs_list",
    "value": "bot",
    "callback_id": "select_remote_1234",
    "team": {
        "id": "T012AB0A1",
        "domain": "pocket-calculator"
    },
    "channel": {
        "id": "C012AB3CD",
        "name": "general"
    },
    "user": {
        "id": "U012A1BCJ",
        "name": "bugcatcher"
    },
    "action_ts": "1481670445.010908",
    "message_ts": "1481670439.000007",
    "attachment_id": "1",
    "token": "verification_token_string"
}
```

When you get that event you need to generate a list of options like this (see more options in 
[Populate message menus dynamically](https://api.slack.com/docs/message-menus#menu_dynamic)):

```js
{
    "options": [
        {
            "text": "Unexpected sentience",
            "value": "AI-2323"
        },
        {
            "text": "Bot biased toward other bots",
            "value": "SUPPORT-42"
        },
        {
            "text": "Bot broke my toaster",
            "value": "IOT-75"
        }
    ]
}
```

And finally once you have the options you need return them using the `return` keyword:

```js
var options = [];
switch (event.data.name) {
    case 'accounts':
        // generate list of accounts
        break;
    case 'bugs':
        // generalte list of bugs
        break;
}
return {options: options};
```

### Slash command

When a user calls a slash command an event of this type will arrive to your app. See the documentation for
[Slash command](https://api.slack.com/slash-commands) to learn more about how they work.

The format of events is the same as explained in the Slack documentation, so you should find the same structure
under the `event.data` in your listeners. Just keep in mind we convert it to a Javascript object. For example if
the message sent by Slack is this:

```
token=gIkuvaNzQIHg97ATvDxqgjtO
team_id=T0001
team_domain=example
channel_id=C2147483705
channel_name=test
user_id=U2147483697
user_name=Steve
command=/weather
text=94070
response_url=https://hooks.slack.com/commands/1234/5678
```

Under `event.data` you will find this:

```js
{
  token: 'gIkuvaNzQIHg97ATvDxqgjtO',
  team_id: 'T0001'
  team_domain: 'example'
  channel_id: 'C2147483705'
  channel_name: 'test'
  user_id: 'U2147483697'
  user_name: 'Steve'
  command: '/weather'
  text: '94070'
  response_url: 'https://hooks.slack.com/commands/1234/5678'
}
```

### File downloaded

This event is generated when you download a file using the method `files.download()` in an asynchronous way.
Usually you won't create a listener for this as in most cases you will handled it as a callback of the method.

The event contains the following fields:

- `event.fileId`: the ID of the file in the app. You can assign it to a file field in a record.
- `event.fileName`: the name of the file that was downloaded.
- `event.contentType`: the MIME type of the file.

For example in a listener you could assign the file to a record like this:

```js
record.field('attachment').val(res.fileId);
sys.data.save(record);
```

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.


# Javascript API

The Javascript API of the slack package has three pieces:

- **HTTP requests**: These allow making regular HTTP requests.
- **Shortcuts**: These are helpers to make HTTP request to the API in a more convenient way.
- **Additional Helpers**: These helpers provide additional features that facilitate or improves the package usage in SLINGR.

## HTTP requests
You can make `POST`,`GET` requests to the [slack API](API_URL_HERE) like this:
```javascript
var response = pkg.slack.functions.post('/conversations.leave', body)
var response = pkg.slack.functions.post('/conversations.leave')
var response = pkg.slack.functions.get('/admin.emoji.list')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Shortcuts

Instead of having to use the generic HTTP methods, you can (and should) make use of the helpers provided in the package:
<details>
    <summary>Click here to see all the helpers</summary>

<br>

* API URL: '/api.test'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.apiTest.post(body)
```
---
* API URL: '/auth.test'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.authTest.post(body)
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
* API URL: '/views.open'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.viewsOpen.post(body)
```
---
* API URL: '/views.update'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.viewsUpdate.post(body)
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
* API URL: '/stars.add'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.starsAdd.post(body)
```
---
* API URL: '/stars.remove'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.starsRemove.post(body)
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
* API URL: '/usergroups.update'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usergroupsUpdate.post(body)
```
---
* API URL: '/usergroups.users.update'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usergroupsUsersUpdate.post(body)
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
* API URL: '/users.profile.set'
* HTTP Method: 'POST'
```javascript
pkg.slack.functions.usersProfileSet.post(body)
```
---
* API URL: '/auth.revoke'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.authRevoke.get()
```
---
* API URL: '/bots.info'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.botsInfo.get()
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
* API URL: '/conversations.replies'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.conversationsReplies.get()
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
* API URL: '/admin.emoji.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.adminEmojiList.get()
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
* API URL: '/pins.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.pinsList.get()
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
* API URL: '/rtm.start'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.rtmStart.get()
```
---
* API URL: '/rtm.connect'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.rtmConnect.get()
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
* API URL: '/stars.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.starsList.get()
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
* API URL: '/usergroups.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usergroupsList.get()
```
---
* API URL: '/usergroups.users.list'
* HTTP Method: 'GET'
```javascript
pkg.slack.functions.usergroupsUsersList.get()
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
            The url to which this endpoint will send the request. This is the exact service to which the http request will be made. <br>
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


// TODO: Review the dependencies of the package (and remove this comment after set the dependencies)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
