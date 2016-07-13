var post = {
  title: "Lorem ipsum dolor sit amet.",
  published_date: "November 18, 2016",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue dictum consectetur. Nunc feugiat nisi nec gravida pellentesque. Praesent sed ullamcorper erat. Donec vel erat vehicula, placerat mauris a, sagittis lorem. Vivamus sagittis ante non hendrerit porttitor. In pharetra molestie fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas laoreet faucibus vulputate. Morbi mattis arcu vestibulum orci facilisis, non tincidunt sem condimentum. Etiam tristique malesuada bibendum."
};

var post_template = Handlebars.compile($("post").html());

// var post_template = Handlebars.compile(document.getElementById("post").innerHTML;

$("body").append(post_template(post));
