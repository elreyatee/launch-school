function addToList() {
  var ol = document.getElementById("languages"),
      new_entry = document.createElement("li");

  new_entry.innerHTML = "SaSS";

  ol.appendChild(new_entry);
}

window.onload = addToList;
