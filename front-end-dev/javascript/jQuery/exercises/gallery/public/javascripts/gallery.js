$(function() {
  var templates = {},
      photos;

  $("script[type='text/x-handlebars']").each(function() {
    var $tmpl = $(this);
    templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
  });

  $("[data-type=partial]").each(function() {
    var $partial = $(this);
    Handlebars.registerPartial($partial.attr("id"), $partial.html());
  });

  $.ajax({
    url: "/photos",
    success: function(json) {
      photos = json;
      renderPhotos();
      renderPhotoInformation(0);
      getCommentsFor(photos[0].id);
    }
  });

  function renderPhotos() {
    $("#slides").html(templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    $("section > header").html(templates.photo_info(photos[idx]));
  }

  function getCommentsFor(idx) {
    $.ajax({
      url: "/comments",
      data: "photo_id=" + idx,
      success: function(comment_json) {
        $("#comments ul").html(templates.comments({ comments: comment_json }));
      }
    });
  }
});
