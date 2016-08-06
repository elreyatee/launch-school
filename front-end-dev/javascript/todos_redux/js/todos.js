var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {},
    x;

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
    selected: {
      title: "All Todos"
    },
    init: function() {
      console.log(this.selected);
      this.groupByDate("completed_todos_by_date", this.completed_todos);
      this.groupByDate("all_todos_by_date", this.todos);
      this.saveData();
    },
    groupByDate: function(obj_name, todos) {
      if(todos.length === 0) { return; }

      this[obj_name] = {};
      var obj = this[obj_name];

      this.sortByDate(todos).forEach(function(item) {
        let o = obj[item.due_date];
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
      if(Date.parse(a.due_date) < Date.parse(b.due_date)) return -1;
      if(Date.parse(a.due_date) > Date.parse(b.due_date)) return 1;
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
        return item.id === id;
      });

      var todo_idx = this.todos.findIndex(function(item) {
        return item.id === id;
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
    changedSelected: function() {

    },
    selectSidebar: function(e) {
      e.preventDefault();

      var $el = $(e.currentTarget),
          title = $el.data("title");

      Todo.prototype.selected = { title: title, total: Todo.prototype.all_todos_by_date[title].length }
      $("#all_todos").find("dl.selected").removeClass("selected");
      $el.addClass("selected");
      this.loadPage();
    },
    bind: function() {
      $(document).off("submit").on("submit", "form#new_todo", $.proxy(this.create, this));
      $(document).on("click", "#add_todo img, #modal_background", markup.toggleModal);
      $(document).on("click", "button.delete", $.proxy(this.delete, this));
      $(document).on("click", "button.edit", $.proxy(this.edit, this));
      $(document).on("click", "#todo_list_items input", $.proxy(this.complete, this));
      $(document).on("click", "#all_todos dl", $.proxy(this.selectSidebar, this));
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
