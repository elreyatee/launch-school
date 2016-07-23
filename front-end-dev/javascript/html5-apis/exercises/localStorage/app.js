$(function() {
	$("nav li").on("click", function() {
		var $tab = $(this),
		    class_name = "active",
		    index = $tab.index();

		$tab.addClass(class_name).siblings().removeClass(class_name);
		localStorage.setItem("active_nav", index);
		showArticle(index);
	});

	$(":radio").on("change", function() {
		var color = $(this).val();

		$("body").css("background-color", color);
		localStorage.setItem("background_color", color);
	});

	$(window).on("unload", function() {
		localStorage.setItem("note", $("textarea").val());
	});

	function showArticle(index) {
		$("article").hide().eq(index).show();
	}

	function setNote(note) {
		if (note === null) { return; }
		$("textarea").val(note);
	}

	function setBackgroundColor(color) {
		if (color === null) { return; }
		$("[value='" + color + "']").prop("checked", true).change();
	}

	function setActiveNav(index) {
		if (index === null) { return; }
		$("nav li").eq(index).click();
	}

	setActiveNav(localStorage.getItem("active_nav"));
	setBackgroundColor(localStorage.getItem("background_color"));
	setNote(localStorage.getItem("note"));
});