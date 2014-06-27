function hide_handler(ev) {
    $(ev.target).parent().find(".highlight").hide();
    $(ev.target).parent().find(".caption").hide();
    $(ev.target).text("Show Answer");
    $(ev.target).click(show_handler);
}

function show_handler(ev) {
    $(ev.target).parent().find(".highlight").show();
    $(ev.target).parent().find(".caption").show();
    $(ev.target).text("Hide Answer");
    $(ev.target).click(hide_handler);
}

function setup_hider() {
    $(".hidden .highlight").hide();
    $(".hidden .caption").hide();
    $(".hidden .show").click(show_handler);
}

$(document).ready(setup_hider);
