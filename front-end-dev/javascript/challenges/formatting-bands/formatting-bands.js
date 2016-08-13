function removeDots(band) {
  band.name = band.name.replace(/\./, '');
}

function format(name) {
  return name.split(" ").map(function(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }).join(" ");
}

function formatName(band) {
  band.name = format(band.name);
}

function updateCountry(band) {
  band.country = 'Canada';
}

function processBands(data) {
  data.map(function(band) {
    updateCountry(band);
    formatName(band);
    removeDots(band);
  });

  return data;
}
