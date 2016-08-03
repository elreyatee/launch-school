var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {};

$(function() {
  function Todo(data) {
    this.id = this.last_id;
    this.filterData(data);
  }

  Todo.prototype = {
    constructor: Todo,
    todos: all_todos,
    last_id: localStorage.getItem("id") || 0,
    filterData: function(data) {
      var self = this;

      data.forEach(function(d) {
        self[d.name] = d.value;
      });
    },
    saveData: function() {
      localStorage.setItem("all_todos", JSON.stringify(this.todos));
      localStorage.setItem("id", this.last_id);
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
    },
    renderTodoListHeader: function() {
      $("#todo_list_header").html(templates.todo_list_header_tmpl(Todo.prototype));
    },
    renderListItems: function() {
      $("#todo_list_items").html(templates.todo_list_item_tmpl({ todos: Todo.prototype.todos }));
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
    },
    init: function() {
      this.loadTemplates();
      this.bind();
    }
  };

  app.init();
});
