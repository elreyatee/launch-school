var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {};

var x;

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
    last_id: localStorage.getItem("id") || 0,
    completed_todos: JSON.parse(localStorage.getItem("completed_todos")) || [],
    completed_todos_by_date: {},
    all_todos_by_date: {},
    selected: [],
    current_section: {
      title: "All Todos",
      total: 0
    },
    init: function() {
      this.groupByDate("completed_todos_by_date", this.completed_todos);
      this.groupByDate("all_todos_by_date", this.todos);
      this.saveData();
    },
    groupByDate: function(obj_name, todos) {
      this[obj_name] = {};
      var obj = this[obj_name];

      this.sortByDate(todos).forEach(function(item) {
        var o = obj[item.due_date];
        if(o && o.indexOf(item.due_date) === -1) {
          obj[item.due_date].push(item);
        } else {
          obj[item.due_date] = [];
          obj[item.due_date].push(item);
        }
      });
    },
    sortByDate: function(todos) {
      return todos.sort(this.compareByDate);
    },
    compareByDate: function(a, b) {
      if(Date.parse(a.due_date) < Date.parse(b.due_date)) { return -1; }
      if(Date.parse(a.due_date) > Date.parse(b.due_date)) { return 1; }
      return 0;
    },
    complete: function(todo) {
      todo.completed = true;
      this.completed_todos.push(todo);
      this.init();
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
      localStorage.setItem("all_todos", JSON.stringify(this.todos));
      localStorage.setItem("completed_todos", JSON.stringify(this.completed_todos));
      localStorage.setItem("id", this.last_id);
    },
    updateTodo: function(todo, data) {
      data.forEach(function(d) {
        todo[d.name] = d.value;
      });
      todo.due_date = this.formatDueDate.call(todo);
      this.init();
    },
    deleteTodo: function(id) {
      var completed_idx = this.completed_todos.findIndex(function(item) {
        return item.id === +id;
      });

      var todo_idx = this.todos.findIndex(function(item) {
        return item.id === +id;
      });

      this.todos.splice(todo_idx, 1);
      if(completed_idx !== -1) { this.completed_todos.splice(completed_idx, 1); }
      this.init();
    },
    addTodo: function(data) {
      this.last_id++;
      var new_todo = new Todo(data);
      this.todos.push(new_todo);
      this.init();
    },
    formatDueDate: function() {
      return this.due_month + "/" + this.due_year.slice(2);
    }
  };

x = Todo.prototype;

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

      var keys = Object.keys(todo);

      for(var i = 0; i < keys.length; i++) {
        $("[name=" + keys[i] + "]").val(todo[keys[i]]);
      }
    },
    updateTitle: function() {
      $("#todo_list_header").html(templates.todo_list_header_tmpl(Todo.prototype));
    },
    updateList: function() {
      $("#todo_list_items").html(templates.todo_list_item_tmpl(Todo.prototype));
    }
  };

  var app = {
    delete: function(e) {
      e.preventDefault();

      var id = $(e.target).closest("dl").data("id");
      Todo.prototype.deleteTodo(id);
      this.init();
    },
    create: function(e) {
      e.preventDefault();

      markup.toggleModal();
      Todo.prototype.addTodo(markup.form_data());
      this.init();
    },
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
    selectSideOption: function(e) {
      var $el = $(e.currentTarget),
          title = $el.data("title"),
          total = $el.data("total");

      Todo.prototype.current_section.title = title;
      Todo.prototype.current_section.total = total;

      if(title === "All Todos") {
        Todo.prototype.selected = this.getAllIncompleteTodos(Todo.prototype.todos);
      } else {
        Todo.prototype.selected = Todo.prototype.all_todos_by_date[title];
      }

      $("#all_todos").find(".selected").removeClass("selected");
      $el.addClass("selected");
      this.loadPage();
    },
    getAllIncompleteTodos: function(todos) {
      var complete = [],
          incomplete = [];

      todos.forEach(function(todo) {
        if(todo.completed) {
          complete.push(todo);
        } else {
          incomplete.push(todo);
        }
      });
      return incomplete.concat(complete);
    },
    bind: function() {
      $(document).off("submit").on("submit", "form#new_todo", $.proxy(this.create, this));
      $(document).on("click", "#add_todo img, #modal_background", markup.toggleModal);
      $(document).on("click", "button.delete", $.proxy(this.delete, this));
      $(document).on("click", "button.edit", $.proxy(this.edit, this));
      $(document).on("click", "#todo_list_items input", $.proxy(this.complete, this));
      $(document).on("click", "#all_todos dl", $.proxy(this.selectSideOption, this));
    },
    loadPage: function() {
      $("body").html(templates.main_page(Todo.prototype));
    },
    init: function() {
      this.loadPage();
      $("dl[data-title='All Todos']").click();
    }
  };

  markup.loadTemplates();
  Todo.prototype.init();
  app.loadPage();
  app.bind();
  app.init();
});
