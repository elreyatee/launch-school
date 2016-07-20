$(function() {
	var templates = {},
	    photos;

	$("script[type='text/x-handlebars").each(function(_, item) {
		templates[item.getAttribute("id")] = Handlebars.compile(item.innerHTML);
	});

	$.ajax({
		url: "/photos",
		success: function(json) {
			photos = json;
			$("#slides").append(templates.photos(photos[0]));
		}
	});
});