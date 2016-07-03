---
---

function doCalendar() {
    $("#calendar").fullCalendar({
        header: {
            left: "prev",
            center: "title",
            right: "next"
        },
        editable: false,
        handleWindowResize: true,
        displayEventTime: true,
        events: [
            // {% for year in site.data.calendarDB.years %}
            {
                url: "{{site.url}}calendar/db/{{year}}.json",
                color: "yellow",
                textColor: "black"
            }
            // {% endfor %}
        ]
    });

}