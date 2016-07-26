var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

var image_loader = {
  path: "images/",
  srcs: ["1.jpg", "2.jpg", "3.jpg"],
  createImageElement: function(idx, img) {
    var $img = $("<img />", { src: this.path + img });

    $img.on("load", function() {
      var $el = $(this);
      manipulator.processImage($el[0]);
    });
  },
  loadImages: function() {
    $.each(this.srcs, $.proxy(this.createImageElement, this));
  }
};

var manipulator = {
  drawImage: function(img) {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0, img.width, img.height);
  },
  convertToGrayscale: function() {
    var image_data = ctx.getImageData(0, 0, canvas.width, canvas.height),
        gray_color;

    for(let i = 0; i < image_data.data.length; i+=4) {
      var red = image_data.data[i],
          green = image_data.data[i+1],
          blue = image_data.data[i+2],
          gray = red * 0.3086 + green * 0.6094 + blue * 0.0820;

      image_data.data[i] = gray;
      image_data.data[i+1] = gray;
      image_data.data[i+2] = gray;
    }
    ctx.putImageData(image_data, 0, 0);
  },
  writeImage: function() {
    var img = document.createElement("img");
    
    img.src = canvas.toDataURL();
    $("body").append(img);
  },
  processImage: function(img) {
    this.drawImage(img);
    this.convertToGrayscale();
    this.writeImage();
  }
};

$(window).load(image_loader.loadImages());