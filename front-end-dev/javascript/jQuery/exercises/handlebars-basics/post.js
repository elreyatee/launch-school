$(function() {
  var posts = [{
        title: "Praesent condimentum ligula varius diam.",
        published: "November 18, 2016",
        body: "<p>Aenean pretium lectus ut ipsum aliquam, id pharetra elit lobortis. Nulla laoreet justo urna, id vehicula metus aliquet eget. Nunc diam magna, porta ut diam id, venenatis tincidunt arcu. Etiam elementum libero sed nunc porttitor tincidunt. Integer tincidunt neque viverra felis porttitor, in laoreet dui ultrices. Donec sed risus ac sem luctus blandit. Duis dictum congue tellus sit amet rhoncus. Sed posuere, eros a viverra placerat, lorem mi sagittis turpis, sit amet suscipit sapien dui tempor lorem.</p>",
        tags: ["JavaScript", "jQuery", "Handlebars"]
      }];

  posts.push({
    title: "Lorem ipsum dolor sit amet.",
    published: "April 27, 2016",
    body: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis orci porta ligula laoreet sodales. Pellentesque mi urna, dapibus a velit in, posuere blandit mauris. Curabitur magna mauris, porta euismod nunc efficitur, semper volutpat purus. Aenean ut diam a ante convallis interdum in quis lacus. Pellentesque non commodo nisi, id tincidunt nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc blandit molestie efficitur. Nam pretium, lorem nec posuere imperdiet, metus est varius nunc, id fermentum neque metus id diam. Sed non turpis at quam egestas maximus tempor eu sapien. Aliquam arcu lectus, porta a imperdiet id, pellentesque a urna. Mauris felis felis, congue eu accumsan vitae, consectetur nec nunc. Maecenas tincidunt diam vel neque porttitor, sodales rhoncus orci interdum. Praesent sed efficitur neque. Maecenas mattis mi a arcu bibendum cursus. Nulla dui felis, convallis tristique ante sit amet, volutpat dapibus nisi. Pellentesque varius posuere leo, nec posuere urna mattis vel.</p>"
  });

  // post template function
  var post_template = Handlebars.compile($("#posts").html());

  // tag partial
  Handlebars.registerPartial("tag", $("#tag").html());

  // append tamplate to body
  $("body").append(post_template({ posts: posts }));
});
