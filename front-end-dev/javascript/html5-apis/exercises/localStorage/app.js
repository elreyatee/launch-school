$(function() {
	// function showContent(index) {
	// 	$("#tabs article").each(function(idx, el) {
	// 		idx === index ? $(el).addClass("selected") : $(el).removeClass("selected");
	// 	});
	// }

	// function setActiveTab($tab) {
	// 	localStorage.setItem("active_tab", JSON.stringify($tab));
	// }

	// function getActiveTab() {
	// 	return JSON.parse(localStorage.getItem("active_tab"));
	// }

	$("nav li").on("click", function() {
		var $tab = $(this),
		    class_name = "active",
		    index = $tab.index();

		$tab.addClass(class_name).siblings("li").removeClass(class_name);
		// showContent(index);
		// setActiveTab($tab);
	});
});