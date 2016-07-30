$(function() {
  var $todo_list = $("#todo-list"),
      todo_items_template = Handlebars.compile($("#list_of_todo_items").html());

  // $(".todo-item").on("click", ".delete", function(e) {
  //   e.stopPropagation();
  //
  //   $(this).closest(".todo-item").remove();
  // });

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
    bindEvents: function() {
      $("form#new-todo").on("submit", $.proxy(this.newTodo, this));
      $("#add-todo").on("click", $.proxy(this.renderForm, this));
      this.$modal_background.on("click", $.proxy(this.hideForm, this));
    },
    init: function() {
      this.bindEvents();
    }
  };

  todos.init();
});
