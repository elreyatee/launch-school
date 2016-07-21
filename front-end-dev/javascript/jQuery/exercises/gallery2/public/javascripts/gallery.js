$(function() {
	var templates = {},
	    photos;

  // capture all templates into an object
	$("script[type='text/x-handlebars']").each(function(_, item) {
		templates[item.getAttribute("id")] = Handlebars.compile(item.innerHTML);
	});

	// register partial
	Handlebars.registerPartial("comment", $("[data-type='partial']").html());

	$.ajax({
		url: "/photos",
		success: function(json) {
			photos = json;
			renderPhotos();
			renderPhotoContent(photos[0].id)
			slideshow.init();
		}
	});

	$("form").on("submit", function(e) {
		e.preventDefault();
		var $form = $(this);

		$.ajax({
			url: "/comments/new",
			method: "POST",
			data: $form.serialize(),
			success: function(json) {
				$("#comments ul").append(templates.comment(json));
				$form.get(0).reset();
			}
	  });
	});

	var slideshow = {
		$slideshow: $("#slideshow"),
		duration: 500,
		prevSlide: function(e) {
			e.preventDefault();

			var $current = this.$slideshow.find("figure:visible"),
			    $prev = $current.prev("figure");

			if (!$prev.length) {
				$prev = this.$slideshow.find("figure").last();
			}

			$current.fadeOut(this.duration);
			$prev.fadeIn(this.duration, "linear", renderPhotoContent(+$prev.attr("data-id")));
		},
		nextSlide: function(e) {
			e.preventDefault();

			var $current = this.$slideshow.find("figure:visible"),
			    $next = $current.next("figure");

			if (!$next.length) {
				$next = this.$slideshow.find("figure").first();
			}

			$current.fadeOut(this.duration, "linear");
			$next.fadeIn(this.duration, "linear", renderPhotoContent(+$next.attr("data-id")));
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

	function renderPhotoInformation(photo_id) {
		var photo = photos.filter(function(item) {
			return item.id === photo_id;
		})[0];

		$("section > header").html(templates.photo_information(photo));
	}

	function renderComments(photo_id) {
		$.ajax({
			url: "/comments", 
			data: "photo_id=" + photo_id,
			success: function(json) {
				$("#comments ul").html(templates.comments({ comments: json }));
			}
		});
	}

	function setFormPhotoID(photo_id) {
		$("input[name='photo_id']").val(photo_id);
	}

	function renderPhotoContent(photo_id) {
		setFormPhotoID(photo_id);
		renderPhotoInformation(photo_id);
		renderComments(photo_id);
	}
});