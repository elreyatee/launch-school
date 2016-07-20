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
			renderPhotos();
			slideshow.init();
		}
	});

	var slideshow = {
		$slideshow: $("#slideshow"),
		default: 500,
		prevSlide: function(e) {
			e.preventDefault();

			var $current = this.$slideshow.find("figure:visible"),
			    $prev = $current.prev("figure");

			if (!$prev.length) {
				$prev = this.$slideshow.find("figure").last();
			}

			$current.fadeOut(this.default);
			$prev.fadeIn(this.default);
		},
		nextSlide: function(e) {
			e.preventDefault();

			var $current = this.$slideshow.find("figure:visible"),
			    $next = $current.next("figure");

			if (!$next.length) {
				$next = this.$slideshow.find("figure").first();
			}

			$current.fadeOut(this.default);
			$next.fadeIn(this.default);
		},
		bind: function() {
			this.$slideshow.find(".prev").on("click", $.proxy(this.prevSlide, this));
			this.$slideshow.find(".next").on("click", $.proxy(this.nextSlide, this));
		},
		init: function() {
			this.bind();
		}
	};

	function renderPhotos() {
		// render all templates onto page, hide all slide figures after the first
		$("#slides").html(templates.photos({ photos: photos }));
		$("#slideshow").find("figure").nextAll().css("display", "none");
	}
});