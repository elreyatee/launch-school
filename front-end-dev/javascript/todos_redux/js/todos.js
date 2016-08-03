var x;

var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {};

$(function() {
  function Todo(data) {
    this.id = this.last_id;
    this.filterData(data);
  }

  Todo.prototype = {
    constructor: Todo,
    todos: all_todos || [],
    last_id: localStorage.getItem("id") || 0,
    filterData: function(data) {
      var self = this;

      data.forEach(function(d) {
        self[d.name] = d.value;
      });
    },
    getTodoByID: function(id) {
      return this.todos.filter(function(todo) {
        return todo.id === id;
      });
    },
    saveData: function() {
      localStorage.setItem("all_todos", JSON.stringify(this.todos));
      localStorage.setItem("id", this.last_id);
    },
    deleteTodo: function(id) {
      x = this.todos;

      var todo = this.getTodoByID(id);
      this.todos.splice(todo.id, 1);
      this.saveData();
    },
    addTodo: function(data) {
      this.last_id++;
      var new_todo = new Todo(data);
      this.todos.push(new_todo);
      this.saveData();
    }
  };

  var form = {
    data: function() {
      return $("form#new_todo").serializeArray();
    },
    toggleModal: function() {
      $("#modal, #modal_background").fadeToggle();
    }
  };

  var app = {
    loadTemplates: function() {
      $("[type='text/x-handlebars']").each(function(){
        $tmpl = $(this);
        templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
      });

      $("[data-type='partial']").each(function() {
        $tmpl = $(this);
        Handlebars.registerPartial($tmpl.attr("id"), $tmpl.html());
      });
    },
    renderSideBar: function() {
      $("#sidebar").html(templates.sidebar_tmpl(Todo.prototype));
    },
    renderMainPage: function() {
      $("body").html(templates.main_page(Todo.prototype));
    },
    renderTodoListHeader: function() {
      $("#todo_list_header").html(templates.todo_list_header_tmpl(Todo.prototype));
    },
    renderListItems: function() {
      $("#todo_list_items").html(templates.todo_list_item_tmpl({ todos: Todo.prototype.todos }));
    },
    deleteTodo: function(e) {
      var id = $(e.target).closest("dl").data("id");

      Todo.prototype.deleteTodo(id);
      this.renderListItems();
    },
    createTodo: function(e) {
      e.preventDefault();

      form.toggleModal();
      Todo.prototype.addTodo(form.data());
      this.renderListItems();
    },
    bind: function() {
      $("#add_todo img, #modal_background").on("click", form.toggleModal);
      $("form#new_todo").on("submit", $.proxy(this.createTodo, this));
      $("body").on("click", "button.delete", $.proxy(this.deleteTodo, this));
    },
    init: function() {
      this.loadTemplates();
      this.bind();
      this.renderMainPage();
    }
  };

  app.init();
});
