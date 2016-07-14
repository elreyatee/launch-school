$(function() {
  var post = {
        title: "Praesent condimentum ligula varius diam.",
        published: "November 18, 2016",
        body: "<p>Aenean pretium lectus ut ipsum aliquam, id pharetra elit lobortis. Nulla laoreet justo urna, id vehicula metus aliquet eget. Nunc diam magna, porta ut diam id, venenatis tincidunt arcu. Etiam elementum libero sed nunc porttitor tincidunt. Integer tincidunt neque viverra felis porttitor, in laoreet dui ultrices. Donec sed risus ac sem luctus blandit. Duis dictum congue tellus sit amet rhoncus. Sed posuere, eros a viverra placerat, lorem mi sagittis turpis, sit amet suscipit sapien dui tempor lorem.</p>"
      };

  // post template function
  var post_template = Handlebars.compile($("#post").html());

  $("body").append(post_template(post));
});
