$(function() {
	$("nav li").on("mouseenter", function() {
		$(this).addClass("active").siblings("li").removeClass("active");
	});
});