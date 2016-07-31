$(function() {
  var $todo_list = $("#todo-list"),
      todo_items_template = Handlebars.compile($("#list_of_todo_items").html()),
      todo_header_template = Handlebars.compile($("main header").html());

  var todos = {
    $modal: $("#modal"),
    $modal_background: $("#modal_background"),
    collection: [],
    addTodo: function() {
      var values = $("#new-todo").serializeArray(),
          todo_item = {};

      values.forEach(function(field, idx) {
        todo_item[field.name] = field.value;
      });

      this.collection.push(todo_item);
      todo_item["id"] = this.collection.length - 1;
      return todo_item;
    },
    newTodo: function(e) {
      e.preventDefault();

      var todo_item = this.addTodo();
      $todo_list.append(todo_items_template(todo_item));
      this.$modal_background.click();
    },
    renderForm: function(e) {
      e.stopPropagation();
      this.$modal.show().find("form")[0].reset();
      this.$modal_background.show();
    },
    hideForm: function(e) {
      e.stopPropagation();

      $("#modal_background").hide();
      this.$modal.hide();
    },
    removeTodo: function(id) {
      this.collection.splice(+id);
    },
    getIDNum: function(id) {
      var id_val = id.match(/\d/)[0];
      return +id_val;
    },
    deleteTodo: function(id) {
      this.collection.splice(id, 1);
    },
    removeTodo: function(e) {
      e.stopPropagation();

      var $el = $(e.target).closest(".todo-item"),
          id = $el.find("input").attr("id");

      id = this.getIDNum(id);
      this.deleteTodo(id);
      $el.remove();
    },
    bindEvents: function() {
      $("form#new-todo").on("submit", $.proxy(this.newTodo, this));
      $("#add-todo").on("click", $.proxy(this.renderForm, this));
      this.$modal_background.on("click", $.proxy(this.hideForm, this));
      $("body").on("click", ".delete", $.proxy(this.removeTodo, this));
    },
    init: function() {
      this.bindEvents();
    }
  };

  todos.init();
});
