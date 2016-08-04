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
    complete: function(todo) {
      todo.completed = true;
      this.completed_todos.push(todo);
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
    updateTodo: function(todo, data) {
      data.forEach(function(d) {
        todo[d.name] = d.value;
      });

      todo.due_date = this.formatDueDate.call(todo);
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
    // renderMainPage: function() {
    //   $("body").html(templates.main_page(Todo.prototype));
    // },
    // renderTodoListHeader: function() {
    //   $("#todo_list_header").html(templates.todo_list_header_tmpl({ total_todos: Todo.prototype.todos.length }));
    // },
    // renderListItems: function() {
    //   $("#todo_list_items").html(templates.todo_list_item_tmpl({ todos: Todo.prototype.todos }));
    // },
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
      var todo = Todo.prototype.getTodoByID(id)[0];

      markup.editForm(todo);

      $(document).off("submit").on("submit", "form#new_todo", function(e) {
        e.preventDefault();

        markup.toggleModal();
        Todo.prototype.updateTodo(todo, markup.form_data());
        this.loadPage();
      });

      // $(document).on("click", "button[name='complete']", function(e) {
      //   e.stopPropagation();
      //   Todo.prototype.complete(todo);
      //   $("dl[data-id='" + todo.id + "']").find("input[type='checkbox']").prop("checked", true);
      // });
    },
    edit: function(e) {
      e.preventDefault();

      var id = $(e.target).closest("dl").data("id");
      this.update(id);
    },
    bind: function() {
      $(document).off("submit").on("submit", "form#new_todo", $.proxy(this.create, this));
      $(document).on("click", "#add_todo img, #modal_background", markup.toggleModal);
      // $(document).on("click", "#modal_background", markup.toggleModal);
      $(document).on("click", "button.delete", $.proxy(this.delete, this));
      $(document).on("click", "button.edit", $.proxy(this.edit, this));
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
  app.init();
});
