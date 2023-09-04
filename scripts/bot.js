/****************************************************
 Dependencies
 ****************************************************/

var httpReference = dependencies.http;

var httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    put: httpReference.put,
    patch: httpReference.patch,
    delete: httpReference.delete,
    head: httpReference.head,
    options: httpReference.options
};
var httpService = {};

function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    try {
        return requestFn(options, callbackData, callbacks);
    } catch (error) {
        sys.logs.info("[slack] Handling request "+JSON.stringify(error));
    }
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (var key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

/****************************************************
 Helpers
 ****************************************************/

exports.apiTest = {};

exports.authRevoke = {};

exports.authTest = {};

exports.botsInfo = {};

exports.chatDelete = {};

exports.chatMeMessage = {};

exports.chatPostMessage = {};

exports.chatUnfurl = {};

exports.chatUpdate = {};

exports.conversationsArchive = {};

exports.conversationsClose = {};

exports.conversationsCreate = {};

exports.conversationsHistory = {};

exports.conversationsInfo = {};

exports.conversationsInvite = {};

exports.conversationsJoin = {};

exports.conversationsKick = {};

exports.conversationsLeave = {};

exports.conversationsList = {};

exports.conversationsMembers = {};

exports.conversationsOpen = {};

exports.conversationsRename = {};

exports.conversationsReplies = {};

exports.conversationsSetPurpose = {};

exports.conversationsSetTopic = {};

exports.conversationsUnarchive = {};

exports.dialogOpen = {};

exports.viewsOpen = {};

exports.viewsUpdate = {};

exports.viewsPublish = {};

exports.viewsPush = {};

exports.dndEndDnd = {};

exports.dndEndSnooze = {};

exports.dndInfo = {};

exports.dndSetSnooze = {};

exports.dndTeamInfo = {};

exports.adminEmojiList = {};

exports.filesCommentsDelete = {};

exports.filesDelete = {};

exports.filesInfo = {};

exports.filesList = {};

exports.filesRevokePublicURL = {};

exports.filesSharedPublicURL = {};

exports.filesUpload = {};

exports.oauthAccess = {};

exports.pinsAdd = {};

exports.pinsList = {};

exports.pinsRemove = {};

exports.reactionsAdd = {};

exports.reactionsGet = {};

exports.reactionsList = {};

exports.reactionsRemove = {};

exports.remindersAdd = {};

exports.remindersComplete = {};

exports.remindersDelete = {};

exports.remindersInfo = {};

exports.remindersList = {};

exports.rtmStart = {};

exports.rtmConnect = {};

exports.searchAll = {};

exports.searchFiles = {};

exports.searchMessages = {};

exports.starsAdd = {};

exports.starsList = {};

exports.starsRemove = {};

exports.teamAccessLogs = {};

exports.teamBillableInfo = {};

exports.teamInfo = {};

exports.teamIntegrationLogs = {};

exports.teamProfileGet = {};

exports.usergroupsCreate = {};

exports.usergroupsDisable = {};

exports.usergroupsEnable = {};

exports.usergroupsList = {};

exports.usergroupsUpdate = {};

exports.usergroupsUsersList = {};

exports.usergroupsUsersUpdate = {};

exports.usersDeletePhoto = {};

exports.usersGetPresence = {};

exports.usersIdentity = {};

exports.usersInfo = {};

exports.usersList = {};

exports.usersLookupByEmail = {};

exports.usersSetActive = {};

exports.usersSetPhoto = {};

exports.usersSetPresence = {};

exports.usersProfileGet = {};

exports.usersProfileSet = {};

exports.apiTest.post = function(httpOptions) {
    var url = parse('/api.test');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.authRevoke.get = function(httpOptions) {
    var url = parse('/auth.revoke');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.authTest.post = function(httpOptions) {
    var url = parse('/auth.test');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.botsInfo.get = function(httpOptions) {
    var url = parse('/bots.info');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.chatDelete.post = function(httpOptions) {
    var url = parse('/chat.delete');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.chatMeMessage.post = function(httpOptions) {
    var url = parse('/chat.meMessage');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.chatPostMessage.post = function(httpOptions) {
    var url = parse('/chat.postMessage');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.chatUnfurl.post = function(httpOptions) {
    var url = parse('/chat.unfurl');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.chatUpdate.post = function(httpOptions) {
    var url = parse('/chat.update');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsArchive.post = function(httpOptions) {
    var url = parse('/conversations.archive');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsClose.post = function(httpOptions) {
    var url = parse('/conversations.close');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsCreate.post = function(httpOptions) {
    var url = parse('/conversations.create');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsHistory.get = function(httpOptions) {
    var url = parse('/conversations.history');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.conversationsInfo.get = function(httpOptions) {
    var url = parse('/conversations.info');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.conversationsInvite.post = function(httpOptions) {
    var url = parse('/conversations.invite');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsJoin.post = function(httpOptions) {
    var url = parse('/conversations.join');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsKick.post = function(httpOptions) {
    var url = parse('/conversations.kick');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsLeave.post = function(httpOptions) {
    var url = parse('/conversations.leave');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsList.get = function(httpOptions) {
    var url = parse('/conversations.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.conversationsMembers.get = function(httpOptions) {
    var url = parse('/conversations.members');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.conversationsOpen.post = function(httpOptions) {
    var url = parse('/conversations.open');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsRename.post = function(httpOptions) {
    var url = parse('/conversations.rename');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsReplies.get = function(httpOptions) {
    var url = parse('/conversations.replies');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.conversationsSetPurpose.post = function(httpOptions) {
    var url = parse('/conversations.setPurpose');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsSetTopic.post = function(httpOptions) {
    var url = parse('/conversations.setTopic');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.conversationsUnarchive.post = function(httpOptions) {
    var url = parse('/conversations.unarchive');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.dialogOpen.post = function(httpOptions) {
    var url = parse('/dialog.open');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.viewsOpen.post = function(httpOptions) {
    var url = parse('/views.open');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.viewsUpdate.post = function(httpOptions) {
    var url = parse('/views.update');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.viewsPublish.post = function(httpOptions) {
    var url = parse('/views.publish');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.viewsPush.post = function(httpOptions) {
    var url = parse('/views.push');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.dndEndDnd.post = function(httpOptions) {
    var url = parse('/dnd.endDnd');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.dndEndSnooze.post = function(httpOptions) {
    var url = parse('/dnd.endSnooze');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.dndInfo.get = function(httpOptions) {
    var url = parse('/dnd.info');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.dndSetSnooze.get = function(httpOptions) {
    var url = parse('/dnd.setSnooze');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.dndTeamInfo.get = function(httpOptions) {
    var url = parse('/dnd.teamInfo');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.adminEmojiList.get = function(httpOptions) {
    var url = parse('/admin.emoji.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.filesCommentsDelete.post = function(httpOptions) {
    var url = parse('/files.comments.delete');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.filesDelete.post = function(httpOptions) {
    var url = parse('/files.delete');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.filesInfo.get = function(httpOptions) {
    var url = parse('/files.info');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.filesList.get = function(httpOptions) {
    var url = parse('/files.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.filesRevokePublicURL.post = function(httpOptions) {
    var url = parse('/files.revokePublicURL');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.filesSharedPublicURL.post = function(httpOptions) {
    var url = parse('/files.sharedPublicURL');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.filesUpload.post = function(httpOptions) {
    var url = parse('/files.upload');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.oauthAccess.post = function(httpOptions) {
    var url = parse('/oauth.access');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.pinsAdd.post = function(httpOptions) {
    var url = parse('/pins.add');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.pinsList.get = function(httpOptions) {
    var url = parse('/pins.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.pinsRemove.post = function(httpOptions) {
    var url = parse('/pins.remove');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.reactionsAdd.post = function(httpOptions) {
    var url = parse('/reactions.add');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.reactionsGet.get = function(httpOptions) {
    var url = parse('/reactions.get');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.reactionsList.get = function(httpOptions) {
    var url = parse('/reactions.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.reactionsRemove.post = function(httpOptions) {
    var url = parse('/reactions.remove');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.remindersAdd.post = function(httpOptions) {
    var url = parse('/reminders.add');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.remindersComplete.post = function(httpOptions) {
    var url = parse('/reminders.complete');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.remindersDelete.post = function(httpOptions) {
    var url = parse('/reminders.delete');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.remindersInfo.get = function(httpOptions) {
    var url = parse('/reminders.info');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.remindersList.get = function(httpOptions) {
    var url = parse('/reminders.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.rtmStart.get = function(httpOptions) {
    var url = parse('/rtm.start');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.rtmConnect.get = function(httpOptions) {
    var url = parse('/rtm.connect');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.searchAll.get = function(httpOptions) {
    var url = parse('/search.all');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.searchFiles.get = function(httpOptions) {
    var url = parse('/search.files');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.searchMessages.get = function(httpOptions) {
    var url = parse('/search.messages');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.starsAdd.post = function(httpOptions) {
    var url = parse('/stars.add');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.starsList.get = function(httpOptions) {
    var url = parse('/stars.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.starsRemove.post = function(httpOptions) {
    var url = parse('/stars.remove');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.teamAccessLogs.get = function(httpOptions) {
    var url = parse('/team.accessLogs');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.teamBillableInfo.get = function(httpOptions) {
    var url = parse('/team.billableInfo');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.teamInfo.get = function(httpOptions) {
    var url = parse('/team.info');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.teamIntegrationLogs.get = function(httpOptions) {
    var url = parse('/team.integrationLogs');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.teamProfileGet.get = function(httpOptions) {
    var url = parse('/team.profile.get');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usergroupsCreate.post = function(httpOptions) {
    var url = parse('/usergroups.create');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usergroupsDisable.post = function(httpOptions) {
    var url = parse('/usergroups.disable');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usergroupsEnable.post = function(httpOptions) {
    var url = parse('/usergroups.enable');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usergroupsList.get = function(httpOptions) {
    var url = parse('/usergroups.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usergroupsUpdate.post = function(httpOptions) {
    var url = parse('/usergroups.update');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usergroupsUsersList.get = function(httpOptions) {
    var url = parse('/usergroups.users.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usergroupsUsersUpdate.post = function(httpOptions) {
    var url = parse('/usergroups.users.update');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usersDeletePhoto.get = function(httpOptions) {
    var url = parse('/users.deletePhoto');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usersGetPresence.get = function(httpOptions) {
    var url = parse('/users.getPresence');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usersIdentity.get = function(httpOptions) {
    var url = parse('/users.identity');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usersInfo.get = function(httpOptions) {
    var url = parse('/users.info');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usersList.get = function(httpOptions) {
    var url = parse('/users.list');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usersLookupByEmail.get = function(httpOptions) {
    var url = parse('/users.lookupByEmail');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usersSetActive.post = function(httpOptions) {
    var url = parse('/users.setActive');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usersSetPhoto.post = function(httpOptions) {
    var url = parse('/users.setPhoto');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usersSetPresence.post = function(httpOptions) {
    var url = parse('/users.setPresence');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

exports.usersProfileGet.get = function(httpOptions) {
    var url = parse('/users.profile.get');
    sys.logs.debug('[slack] GET from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options));
};

exports.usersProfileSet.post = function(httpOptions) {
    var url = parse('/users.profile.set');
    sys.logs.debug('[slack] POST from: ' + url);
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options));
};

/****************************************************
 Public API - Generic Functions
 ****************************************************/

exports.get = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.get(Slack(options), callbackData, callbacks);
};

exports.post = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.post(Slack(options), callbackData, callbacks);
};

exports.put = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.put(Slack(options), callbackData, callbacks);
};

exports.patch = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.patch(Slack(options), callbackData, callbacks);
};

exports.delete = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.delete(Slack(options), callbackData, callbacks);
};

exports.head = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.head(Slack(options), callbackData, callbacks);
};

exports.options = function(url, httpOptions, callbackData, callbacks) {
    var options = checkHttpOptions(url, httpOptions);
    return httpService.options(Slack(options), callbackData, callbacks);
};

exports.utils = {};

exports.utils.parseTimestamp = function(dateString) {
    if (!dateString) {
        return null;
    }
    var dt = dateString.split(/[: T\-]/).map(parseFloat);
    return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
};

exports.utils.formatTimestamp = function(date) {
    if (!date) {
        return null;
    }
    var pad = function(number) {
        var r = String(number);
        if ( r.length === 1 ) {
            r = '0' + r;
        }
        return r;
    };
    return date.getUTCFullYear()
        + '-' + pad( date.getUTCMonth() + 1 )
        + '-' + pad( date.getUTCDate() )
        + 'T' + pad( date.getUTCHours() )
        + ':' + pad( date.getUTCMinutes() )
        + ':' + pad( date.getUTCSeconds() )
        + '.' + String( (date.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
        + 'Z';
};

exports.utils.fromDateToTimestamp = function(params) {
    if (!!params) {
        return {timestamp: new Date(params).getTime()};
    }
    return null;
};

exports.utils.fromMillisToDate = function(params) {
    if (!!params) {
        var sdf = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: 'UTC'
        });
        return {date: sdf.format(new Date(parseInt(params)))};
    }
    return null;
};

exports.utils.getConfiguration = function (property) {
    sys.logs.debug('[slack] Get property: '+property);
    return config.get(property);
};

/****************************************************
 Private helpers
 ****************************************************/


var concatQuery = function (url, key, value) {
    return url + ((!url || url.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
}

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
}

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

var stringType = Function.prototype.call.bind(Object.prototype.toString)

var parse = function (str) {
    try {
        if (arguments.length > 1) {
            var args = arguments[1], i = 0;
            return str.replace(/(:(?:\w|-)+)/g, () => {
                if (typeof (args[i]) != 'string' && typeof (args[i]) != 'number') throw new Error('Invalid type of argument: [' + args[i] + '] for url [' + str + '].');
                return args[i++];
            });
        } else {
            if (str) {
                return str;
            }
            throw new Error('No arguments nor url were received when calling the helper. Please check it\'s definition.');
        }
    } catch (err) {
        sys.logs.error('Some unexpected error happened during the parse of the url for this helper.')
        throw err;
    }
}

/****************************************************
 Configurator
 ****************************************************/

var Slack = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    var API_URL = config.get("SLACK_API_BASE_URL");
    var url = options.path || "";
    options.url = API_URL + url;
    sys.logs.debug('[slack] Set url: ' + options.path + "->" + options.url);
    return options;
}

function setRequestHeaders(options) {
    var headers = options.headers || {};
    var authorization = options.authorization || {};
    if (config.get("botApiToken")) {
        sys.logs.debug('[slack] Set header bearer');
        authorization = mergeJSON(authorization, {
            type: "oauth2",
            accessToken: sys.storage.get('botApiToken'),
            headerPrefix: "Bearer"
        });
        options.authorization = authorization;
    }
    headers = mergeJSON(headers, {"Content-Type": "application/json"});

    options.headers = headers;
    return options;
}


function mergeJSON (json1, json2) {
    const result = {};
    var key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
