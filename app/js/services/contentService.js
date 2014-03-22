// http://localhost:8080/bower_components/requirejs-text/text/samanfattning.txt
define([
        "text!../../content/sammanfattning.txt"
    ],
    function(summary) {
        "use strict";
        return {
            getSummary: function () {
                    debugger;
                return summary;
            },
            getSomeText: function() {
                return "sometext";
            }
        };
    });