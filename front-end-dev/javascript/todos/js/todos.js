$(function() {
  var $modal = $("#modal"),
      $todo_list = $("#todo-list"),
      todo_items_template = Handlebars.compile($("#list_of_todo_items").html());

  $("a#add-todo").on("click", function(e) {
    e.preventDefault();
    $modal.show();
  });

  $modal.click(function() {
    $(this).hide();
  });

  // $(".todo-item").on("click", ".delete", function(e) {
  //   e.stopPropagation();
  //
  //   $(this).closest(".todo-item").remove();
  // });

  var todos = {
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
    },
    bindEvents: function() {
      $("form#new-todo").on("submit", $.proxy(this.newTodo, this));
    },
    init: function() {
      this.bindEvents();
    }
  };

  todos.init();
});
