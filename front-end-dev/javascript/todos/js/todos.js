var d;

var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {};

$(function() {
  var $todo_list = $("#todo-list"),
      $modal = $("#modal"),
      $new_todo = $("#new-todo"),
      $todo_header = $("#todo-header"),
      $modal_background = $("#modal_background");

  function Todo(data) {
    this.id = this.last_id;
    this.completed = false;
    this.filterData(data);
  }

  Todo.prototype = {
    constructor: Todo,
    collection: all_todos,
    last_id: localStorage.getItem("id") || 0,
    filterData: function(data) {
      var self = this;

      data.forEach(function(d) {
        self[d.name] = d.value;
      });
    },
    saveData: function() {
      localStorage.setItem("all_todos", JSON.stringify(this.collection));
      localStorage.setItem("id", this.last_id);
    },
    deleteTodo: function(id) {
      this.collection.splice(id, 1);
      this.saveData();
    },
    addTodo: function(data) {
      this.last_id++;
      var new_todo = new Todo(data);
      this.collection.push(new_todo);
      this.saveData();
      return new_todo;
    }
  };

  var kickstart = {
    loadTemplates: function() {
      $("[type='text/x-handlebars']").each(function() {
        $tmpl = $(this);
        templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
      });
    },
    getIDNum: function(id) {
      var id_val = id.match(/\d/)[0];
      return +id_val;
    },
    removeTodo: function(e) {
      e.stopPropagation();

      var $el = $(e.target).closest(".todo-item"),
          id = $el.find("input").attr("id");

      id = this.getIDNum(id);
      Todo.prototype.deleteTodo(id);
      $el.remove();
    },
    hideForm: function(e) {
      e.stopPropagation();

      $modal_background.hide();
      $modal.hide();
    },
    renderForm: function(e) {
      e.stopPropagation();
      $modal.show().find("form")[0].reset();
      $modal_background.show();
    },
    newTodo: function(e) {
      e.preventDefault();

      var form_data = $new_todo.serializeArray(),
          todo_item = Todo.prototype.addTodo(form_data);

      $todo_list.append(templates.list_of_todo_items(todo_item));
      $modal_background.click();
    },
    bind: function() {
      $new_todo.off("submit").on("submit", $.proxy(this.newTodo, this));
      $("#add-todo").off("click").on("click", $.proxy(this.renderForm, this));
      $modal_background.off("click").on("click", $.proxy(this.hideForm, this));
      $("body").off("click").on("click", ".delete", $.proxy(this.removeTodo, this));
    },
    init: function() {
      this.bind();
      this.loadTemplates();
    }
  }

  kickstart.init();
});
