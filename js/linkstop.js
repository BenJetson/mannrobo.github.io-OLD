---
---

$(document).ready(function() {
    $('a').click(function(e) {
        if ($(this).attr("href") &&
            !($(this).attr("href").startsWith("{{site.url}}")) &&
            !($(this).attr("href").startsWith("#")) &&
            !($(this).is("div#link-headsup a#outbound-anchor"))) {
                e.preventDefault();
                $("div#link-headsup a#outbound-anchor").attr("href", $(this).attr("href"));
                $("div#link-headsup div#outbound-dest").html($(this).attr("href"));
                $("div#link-headsup").openModal();
                return false;

        } 
    });
});

