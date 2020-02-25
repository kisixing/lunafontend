"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("../service");
var ImDb_1 = require("../utils/ImDb");
var antd_1 = require("antd");
var react_1 = require("react");
var IM_TOKEN_KEY = 'web_im_lianmed';
exports.useInit = function () {
    var _a = react_1.useState(null), conn = _a[0], setConn = _a[1];
    function init(conn) {
        ImDb_1.imDb.init(conn.user);
        setConn(conn);
    }
    react_1.useEffect(function () {
        service_1.open({ user: 'ahemyugo', token: sessionStorage.getItem(IM_TOKEN_KEY) || 'admin' }).then(function (WebIM) {
            function fakeLogin() {
                conn.open({
                    user: 'ahemyugo',
                    pwd: 'admin',
                    apiUrl: config.apiURL || '',
                    success: function (data) {
                        console.log("login success", data.access_token);
                        sessionStorage.setItem(IM_TOKEN_KEY, data.access_token);
                    },
                    error: function (e) {
                        console.log('webim error', e);
                    },
                    appKey: config.appkey || ''
                });
            }
            var conn = WebIM.conn, config = WebIM.config;
            conn.listen({
                onOpened: function (msg) {
                    init(conn);
                    console.log('onOpened');
                },
                onPresence: function (msg) {
                    switch (msg.type) {
                        case 'joinGroupNotifications':
                            break;
                        case 'deleteGroupChat':
                            break;
                        case 'leaveGroup':
                            break;
                        case 'removedFromGroup':
                            break;
                        case 'invite':
                            break;
                        case 'direct_joined':
                            break;
                        case 'joinPublicGroupSuccess':
                            break;
                        case 'joinPublicGroupDeclined':
                            break;
                        case 'joinChatRoomSuccess':
                            break;
                        case 'reachChatRoomCapacity':
                            break;
                        case 'subscribe':
                            break;
                        case 'subscribed':
                            break;
                        case 'unsubscribe':
                        case 'unsubscribed':
                            break;
                        case 'memberJoinPublicGroupSuccess':
                            break;
                        case 'memberJoinChatRoomSuccess':
                            break;
                        case 'leaveChatRoom':
                            break;
                        case 'addMute':
                            antd_1.message.warning('you was muted');
                            break;
                        case 'removeMute':
                            antd_1.message.success('you was unmuted');
                            break;
                        case 'addAdmin':
                            antd_1.message.success('you were set to be an admin');
                            break;
                        case 'removeAdmin':
                            antd_1.message.success('your admin has been canceled');
                            break;
                        case 'changeOwner':
                            antd_1.message.success('You`ve become group managerd');
                            break;
                        default:
                            break;
                    }
                },
                onError: function (error) {
                    fakeLogin();
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
                        console.log('WEBIM_CONNCTION_DISCONNECTED', WebIM.conn.autoReconnectNumTotal, WebIM.conn.autoReconnectNumMax);
                        return;
                    }
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
                        return;
                    }
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_SERVER_CLOSE_ERROR) {
                        console.log('WEBIM_CONNCTION_SERVER_CLOSE_ERROR');
                        return;
                    }
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
                        return;
                    }
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_REMOVED) {
                        antd_1.message.error('用户下线');
                        return;
                    }
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE) {
                        antd_1.message.error('账户在另外一台设备登录');
                        return;
                    }
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD) {
                        antd_1.message.error('用户修改密码');
                        return;
                    }
                    if (error.type === WebIM.statusCode.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE) {
                        antd_1.message.error('用户被其他设备踢掉');
                        return;
                    }
                    if (error.type === 1) {
                        var data = error.data ? JSON.parse(error.data.data) : '';
                        if (data) {
                            if (data.error_description === 'user not found') {
                                antd_1.message.error('用户名不存在！');
                            }
                            else if (data.error_description === 'invalid password') {
                                antd_1.message.error('密码无效！');
                            }
                            else if (data.error_description === 'user not activated') {
                                antd_1.message.error('用户已被封禁！');
                            }
                        }
                    }
                },
                onClosed: function (msg) {
                    console.log('onClosed', msg);
                },
                onBlacklistUpdate: function (list) { },
                onReadMessage: function (message) { },
                onDeliveredMessage: function (message) {
                },
                onReceivedMessage: function (message) { },
                onRecallMessage: function (message) { },
                onLocationMessage: function (message) {
                },
                onTextMessage: function (message) {
                    console.log("onTextMessage", this, message);
                    var type = message.type;
                    if (type === 'chat') {
                    }
                },
                onPictureMessage: function (message) {
                    var type = message.type;
                    console.log('onPictureMessage', message);
                    switch (type) {
                        case 'chat':
                            break;
                        case 'groupchat':
                            break;
                        case 'chatroom':
                            break;
                        default:
                            break;
                    }
                },
                onFileMessage: function (message) {
                    console.log('onFileMessage', message);
                    var type = message.type;
                    switch (type) {
                        case 'chat':
                            break;
                        case 'groupchat':
                            break;
                        case 'chatroom':
                            break;
                        default:
                            break;
                    }
                },
                onAudioMessage: function (message) {
                    console.log('onAudioMessage', message);
                    var type = message.type;
                    switch (type) {
                        case 'chat':
                            break;
                        case 'groupchat':
                            break;
                        case 'chatroom':
                            break;
                        default:
                            break;
                    }
                },
                onVideoMessage: function (message) {
                    console.log('onVideoMessage', message);
                    var type = message.type;
                    switch (type) {
                        case 'chat':
                            break;
                        case 'groupchat':
                            break;
                        case 'chatroom':
                            break;
                        default:
                            break;
                    }
                },
                onInviteMessage: function (msg) {
                    console.log('onInviteMessage', msg);
                },
                onMutedMessage: function (msg) {
                    console.log('onMutedMessage', msg);
                },
            });
        });
        return function () {
            console.log('close');
            conn && conn.close();
        };
    }, [conn]);
    return { conn: conn, imDb: ImDb_1.imDb };
};
