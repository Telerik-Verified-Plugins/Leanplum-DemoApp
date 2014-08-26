(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        trackButtonClicked: function () {
            if (!this.checkSimulator()) {
                Leanplum.track(
                    function(msg) {alert(msg)},
                    function(msg) {alert("ERROR, not tracked: " + msg)},
                    "Button"
                );
            }
        },

        trackButtonClickedWithPayload: function () {
            if (!this.checkSimulator()) {
                Leanplum.track(
                    function(msg) {alert(msg)},
                    function(msg) {alert("ERROR, not tracked: " + msg)},
                    "Button",
                    {"amount": 10}
                );
            }
        },

        registerPush: function () {
            if (!this.checkSimulator()) {
                Leanplum.registerPush({
                    "badge": "true",
                    "sound": "true",
                    "alert": "true",
                    "callback": "onPushNotificationReceived"
                });
            }
        },

        unregisterPush: function () {
            if (!this.checkSimulator()) {
                Leanplum.unregisterPush();
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.Leanplum === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);

document.addEventListener("deviceready", function () {
    if (window.Leanplum) {
	    Leanplum.enableDebugging();
    	Leanplum.start(
            function(msg) {console.log("Started Leanplum. Message was: " + msg)},
            function(msg) {alert("ERROR, Leanplum did not start: " + msg)}
        );
    }
});

function onPushNotificationReceived(e) {
    alert("Push Notification received: " + JSON.stringify(e));
}