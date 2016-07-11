$(function() {
  var $date = $("#order_date"),
      $inventory_item = $("#inventory_item"),
      $inventory_table = $("#inventory");

  var inventory = {
    last_id: 0,
    collection: [],
    setDate: function () {
      var current_date = new Date();
      $date.text(current_date.toUTCString());
    },
    cacheTemplate: function() {
      this.template = $inventory_item.html();
      $inventory_item.remove();
    },
    add: function() {
      this.last_id++;

      var o = {
        id: this.last_id,
        name: "",
        stock_number: "",
        quantity: 1
      }

      this.collection.push(o);
      return o;
    },
    newItem: function(e) {
      e.preventDefault();

      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id));

      $inventory_table.append($item);
    },
    findParent: function(e) {
      return $(e.target).closest("tr");
    },
    remove: function(index) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== index;
      });
    },
    getID: function($item) {
      return +$item.find("input[type='hidden']").val();
    },
    get: function(id) {
      var wanted_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          wanted_item = item;
          return false;
        }
      });

      return wanted_item;
    },
    deleteItem: function(e) {
      e.preventDefault();

      var $item = this.findParent(e).remove();

      this.remove(this.getID($item));
    },
    update: function($item) {
      var id = this.getID($item),
          item = this.get(id);

      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },
    updateItem: function(e) {
      var $item = this.findParent(e);

      this.update($item);
    },
    bindEvents: function() {
      // 'this' is the Inventory object ... to bind the click event to the inventory object so we can
      // call newItem method instead of the DOM element, use proxy which return a new function with
      // its content set to the inventory object
      $("#add_item").on("click", $.proxy(this.newItem, this));
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };

  window.inventory = inventory;
  window.inventory.init();
});
