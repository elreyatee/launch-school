var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {};

$(function() {
  function Todo(data) {
    this.id = this.last_id;
    this.filterData(data);
    this.due_date = this.getDueDate(data);
  }

  Todo.prototype = {
    constructor: Todo,
    todos: all_todos || [],
    last_id: localStorage.getItem("id") || 0,
    default_selection: {
      title: "All Todos",
      total: all_todos.length
    },
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
    updateTodo: function(id, data) {
      var todo = this.getTodoByID(id)[0];

      data.forEach(function(d) {
        todo[d.name] = d.value;
      });
      todo.due_date = this.getDueDate(data);
      this.saveData();
    },
    deleteTodo: function(id) {
      var todo = this.getTodoByID(id);
      this.todos.splice(todo.id, 1);
      this.saveData();
    },
    addTodo: function(data) {
      this.last_id++;
      var new_todo = new Todo(data);
      this.todos.push(new_todo);
      this.saveData();
    },
    getDueDate: function(data) {
      var date = [];

      data.forEach(function(obj) {
        if(obj.name === "due_month") {
          date.push(obj.value);
        } else if(obj.name === "due_year") {
          date.push(obj.value.slice(2));
        }
      });

      return date.join("/");
    }
  };

  var form = {
    data: function() {
      return $("form").serializeArray();
    },
    toggleModal: function() {
      $("#modal, #modal_background").fadeToggle();
    },
    editForm: function(todo) {
      this.toggleModal();

      for(var key in todo) {
        $("[name=" + key + "]").val(todo[key]);
      }
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
    renderMainPage: function() {
      $("body").html(templates.main_page(Todo.prototype));
    },
    renderTodoListHeader: function() {
      $("#todo_list_header").html(templates.todo_list_header_tmpl({ total_todos: Todo.prototype.todos.length }));
    },
    renderListItems: function() {
      $("#todo_list_items").html(templates.todo_list_item_tmpl({ todos: Todo.prototype.todos }));
    },
    deleteTodo: function(e) {
      var id = $(e.target).closest("dl").data("id");

      Todo.prototype.deleteTodo(id);
      this.loadPage();
    },
    createTodo: function(e) {
      e.preventDefault();

      form.toggleModal();
      Todo.prototype.addTodo(form.data());
      this.loadPage();
    },
    sideBarSelect: function(e) {
      e.stopPropagation();

      var $item = $(e.target);

      $("#sidebar").find(".selected").removeClass("selected");
      $item.closest("dl").addClass("selected");
    },
    updateTodo: function(todo) {
      var self = this;
      form.editForm(todo);

      $(document).off("submit").on("submit", "form#new_todo", function(e) {
        e.preventDefault();

        form.toggleModal();

        var form_data = form.data();

        Todo.prototype.updateTodo(todo.id, form_data);
        self.renderListItems();
      });
    },
    editTodo: function(e) {
      e.preventDefault();

      var id = $(e.target).closest("dl").data("id"),
          todo = Todo.prototype.getTodoByID(id);

      this.updateTodo(todo[0]);
    },
    bind: function() {
      $(document).on("submit", "form", $.proxy(this.createTodo, this));
      $(document).on("click", "#add_todo img", form.toggleModal);
      $(document).on("click", "#modal_background", form.toggleModal);
      $(document).on("click", "button.delete", $.proxy(this.deleteTodo, this));
      $(document).on("click", "#all_todos dl", $.proxy(this.sideBarSelect, this));
      $(document).on("click", "#todo_list_items dl dt", $.proxy(this.editTodo, this));
    },
    loadPage: function() {
      this.renderMainPage();
      this.renderTodoListHeader();
      this.renderListItems();
    },
    init: function() {
      this.loadTemplates();
      this.bind();
      this.loadPage();
    }
  };

  app.init();
});
