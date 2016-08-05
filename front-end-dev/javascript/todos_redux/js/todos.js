var x;

var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {};

$(function() {
  function Todo(data) {
    this.id = this.last_id;
    this.filterData(data);
    this.due_date = this.formatDueDate();
    this.completed = false;
  }

  Todo.prototype = {
    constructor: Todo,
    todos: all_todos || [],
    completed_todos: [],
    last_id: localStorage.getItem("id") || 0,
    default_selection: {
      title: "All Todos",
      total: all_todos.length
    },
    init: function() {
      console.log(this.todos);
      this.sortTodosByCompletion();
      console.log(this.todos);
    },
    sortTodosByCompletion: function() {
      this.todos.sort(function(a, b) {
        if(a.completed === true) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    complete: function(todo) {
      todo.completed = true;
      this.completed_todos.push(todo);
      this.saveData();
    },
    filterData: function(data) {
      data.forEach(function(d) {
        this[d.name] = d.value;
      }.bind(this));
    },
    getTodoByID: function(id) {
      return this.todos.filter(function(todo) {
        return todo.id === id;
      })[0];
    },
    saveData: function() {
      this.sortTodosByCompletion();
      localStorage.setItem("all_todos", JSON.stringify(this.todos));
      localStorage.setItem("completed_todos", JSON.stringify(this.completed_todos));
      localStorage.setItem("id", this.last_id);
    },
    updateTodo: function(todo, data) {
      data.forEach(function(d) {
        todo[d.name] = d.value;
      });
      todo.due_date = this.formatDueDate.call(todo);
      this.saveData();
    },
    deleteTodo: function(id) {
      var todo = this.getTodoByID(id);

      for(var idx = 0; idx <= this.todos.length - 1; idx++) {
        if(this.todos[idx].id === id) {
          this.todos.splice(idx, 1);
          break;
        }
      }
      this.saveData();
    },
    addTodo: function(data) {
      this.last_id++;
      var new_todo = new Todo(data);
      this.todos.push(new_todo);
      this.saveData();
    },
    formatDueDate: function() {
      return this.due_month + "/" + this.due_year.slice(2);
    }
  };

  var markup = {
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
    form_data: function() {
      return $("form").serializeArray();
    },
    toggleModal: function() {
      $("#modal, #modal_background").fadeToggle("fast", function() {
        var $el = $(this);

        if($el.css("display") === "none") {
          $("form")[0].reset();
        }
      });
    },
    editForm: function(todo) {
      this.toggleModal();

      for(var key in todo) {
        $("[name=" + key + "]").val(todo[key]);
      }
    }
  };

  var app = {
    delete: function(e) {
      e.preventDefault();

      var id = $(e.target).closest("dl").data("id");
      Todo.prototype.deleteTodo(id);
      this.loadPage();
    },
    create: function(e) {
      e.preventDefault();

      markup.toggleModal();
      Todo.prototype.addTodo(markup.form_data());
      this.loadPage();
    },
    // sideBarSelect: function(e) {
    //   e.stopPropagation();
    //
    //   var $item = $(e.target);
    //
    //   $("#sidebar").find(".selected").removeClass("selected");
    //   $item.closest("dl").addClass("selected");
    // },
    update: function(id) {
      var todo = Todo.prototype.getTodoByID(id);

      markup.editForm(todo);

      $(document).off("submit").on("submit", "form#new_todo", function(e) {
        e.preventDefault();

        markup.toggleModal();
        Todo.prototype.updateTodo(todo, markup.form_data());
        this.loadPage();
      }.bind(this));

      $(document).on("click", "button.complete", function(e) {
        e.preventDefault();

        markup.toggleModal();
        Todo.prototype.complete(todo);
        this.loadPage();
      }.bind(this));
    },
    edit: function(e) {
      e.preventDefault();

      var id = $(e.target).closest("dl").data("id");
      this.update(id);
    },
    complete: function(e) {
      e.preventDefault();

      var $input = $(e.target),
          id = $input.closest("dl").data("id"),
          todo = Todo.prototype.getTodoByID(id);

      markup.toggleModal();
      Todo.prototype.complete(todo);
      this.loadPage();
    },
    bind: function() {
      $(document).off("submit").on("submit", "form#new_todo", $.proxy(this.create, this));
      $(document).on("click", "#add_todo img, #modal_background", markup.toggleModal);
      $(document).on("click", "button.delete", $.proxy(this.delete, this));
      $(document).on("click", "button.edit", $.proxy(this.edit, this));
      $(document).on("click", "#todo_list_items input", $.proxy(this.complete, this));
      // $(document).on("click", "#all_todos dl", $.proxy(this.sideBarSelect, this));
    },
    loadPage: function() {
      $("body").html(templates.main_page(Todo.prototype));
    },
    init: function() {
      this.loadPage();
      this.bind();
    }
  };

  markup.loadTemplates();
  Todo.prototype.init();
  app.init();
});
