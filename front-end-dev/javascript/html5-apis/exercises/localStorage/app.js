$(function() {
	$("nav li").on("mouseenter", function() {
		var $el = $(this),
		    index = $el.index();
		    
		$el.addClass("active").siblings("li").removeClass("active");
		showContent(index);
	});

	function showContent(index) {
		$("#tabs article").each(function(idx, el) {
			idx === index ? $(el).addClass("selected") : $(el).removeClass("selected");
		});
	}
});