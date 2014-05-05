var user_colors = {
    'rgb(255, 170, 0)'   : 'enigmacurry',
    'rgb(255, 51, 51)'   : 'mshuler',
    'rgb(82, 153, 204)'  : 'rhatch',
    'rgb(0, 153, 0)'     : 'shawn.kumar',
    'rgb(127, 255, 255)' : 'philipthompson'
};

$(document).ready(function() {

    // Listen for DOM changes to the issue blocks:
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var ticket_re = /CASSANDRA-[0-9]+$/;
    var observer = new MutationObserver(function(mutations, observer) {
        $.each(mutations, function(i, m) {
            var tag = $(m.target)
            if (tag.hasClass('ghx-key-link')) {
                var issue = tag.parents(".ghx-issue");
                var grabber = issue.find(".ghx-grabber");
                var user = user_colors[grabber.css('background-color')];
                if (user !== undefined) {
                    issue.find(".ghx-avatar").remove();
                    var avatar = $("<div class='ghx-avatar ghx-has-avatar'><img src='https://issues.apache.org/jira/secure/useravatar?ownerId="+user+"'/></div>");
                    issue.prepend(avatar);
                    avatar.css("display","block");
                }
            }
        });
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });

});
