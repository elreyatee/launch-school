var templates = {};

$(function() {
  var Todo = {
    todos: JSON.parse(localStorage.getItem('all_todos')) || [],
    last_id: localStorage.getItem("id") || 0,
    selected: null,
    current_section: {
      title: "All Todos",
      total: 0
    },
    groupDates: function(obj, todo) {
      if (!obj[todo.due_date]) {
        obj[todo.due_date] = [];
      }
      obj[todo.due_date].push(todo);

      return obj;
    },
    todosByDate: function() {
      return this.todos.sort(this.compareDates).reduce(this.groupDates, {});
    },
    todosByCompletion: function() {
      var complete = [];
      var incomplete = [];

      this.todos.forEach(function(todo) {
        todo.completed ? complete.push(todo) : incomplete.push(todo);
      });
      return incomplete.concat(complete);
    },
    completedTodos: function() {
      return this.todos.filter(todo => todo.completed);
    },
    completedTodosByDate: function() {
      return this.completedTodos().sort(this.compareDates).reduce(this.groupDates, {});
    },
    compareDates: function(a, b) {
      if (Date.parse(a.due_date) < Date.parse(b.due_date)) return -1;
      if (Date.parse(a.due_date) > Date.parse(b.due_date)) return 1;
      return 0;
    },
    complete: function(todo) {
      todo.completed = true;
      this.saveData();
    },
    filterData: function(data) {
      var self = this;
      data.forEach(function(d) {
        self[d.name] = d.value;
      });
    },
    getTodoByID: function(id) {
      return this.todos.find(todo => todo.id === id);
    },
    add: function(data) {
      var newTodo = {};
      this.last_id++;
      newTodo.id = this.last_id;
      newTodo.completed = false;
      this.filterData.apply(newTodo, [data]);
      newTodo.due_date = newTodo.month + "/" + newTodo.year.slice(2);
      this.todos.push(newTodo);
      this.saveData();
    },
    delete: function(id) {
      var idx = this.todos.findIndex(item => item.id === +id);
      this.todos.splice(idx, 1);
      this.saveData();
    },
    update: function(todo, data) {
      this.filterData.apply(todo, [data]);
      todo.due_date = todo.month + "/" + todo.year.slice(2);
      this.saveData();
    },
    saveData: function() {
      localStorage.setItem("all_todos", JSON.stringify(this.todos));
      localStorage.setItem("id", this.last_id);
    }
  };

  var markup = {
    loadTemplates: function() {
      $("[type='text/x-handlebars']").each(function() {
        $tmpl = $(this);
        templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
      });

      $("[data-type='partial']").each(function() {
        $tmpl = $(this);
        Handlebars.registerPartial($tmpl.attr("id"), $tmpl.html());
      });

      Handlebars.registerHelper("totalCompletedTodos", function() {
        return Todo.completedTodos().length;
      });
    },
    formData: function() {
      return $("form").serializeArray();
    },
    toggleModal: function() {
      $("#modal, #modal_background").fadeToggle("fast", function() {
        var $el = $(this);

        if($el.css("display") === "none") {
          $("form")[0].reset();
          $("input[type='submit']").val("Save");
        }
      });
    },
    editForm: function(todo) {
      this.toggleModal();

      var keys = Object.keys(todo);

      for(var i = 0; i < keys.length; i++) {
        $("[name=" + keys[i] + "]").val(todo[keys[i]]);
      }

      $("input[type='submit']").val("Update");
    },
    updateTitle: function() {
      $("#todo_list_header").html(templates.todo_list_header_tmpl(Todo));
    },
    updateList: function() {
      $("#todo_list_items").html(templates.todo_list_item_tmpl(Todo));
    }
  };

  var app = {
    delete: function(e) {
      e.preventDefault();

      var id = $(e.target).closest("dl").data("id");
      Todo.delete(id);
      this.init();
    },
    create: function(e) {
      e.preventDefault();

      markup.toggleModal();
      Todo.add(markup.formData());
      this.init();
    },
    update: function(id) {
      var todo = Todo.getTodoByID(id);

      markup.editForm(todo);

      $("form#new_todo").off("submit").on("submit", function(e) {
        e.preventDefault();

        markup.toggleModal();
        Todo.update(todo, markup.formData());
        this.init();
      }.bind(this));

      $("button.complete").off("click").on("click", function(e) {
        e.preventDefault();

        this.markTodoAsComplete(todo);
      }.bind(this));
    },
    edit: function(e) {
      e.preventDefault();

      var id = $(e.target).closest("dl").data("id");
      this.update(id);
    },
    markTodoAsComplete: function(todo) {
      if (!todo.completed) {
        markup.toggleModal();
        Todo.complete(todo);
        this.init();
      }
    },
    complete: function(e) {
      e.preventDefault();

      var $input = $(e.target);
      var id = $input.closest("dl").data("id");
      var todo = Todo.getTodoByID(id);

      this.markTodoAsComplete(todo);
    },
    selectSideOption: function(e) {
      var $el = $(e.currentTarget);
      var title = $el.data("title");
      var total = $el.data("total");

      Todo.current_section.title = title;
      Todo.current_section.total = total;

      if(title === "All Todos") {
        Todo.selected = Todo.todosByCompletion();
      } else {
        Todo.selected = Todo.todosByDate()[title];
      }

      $("#all_todos").find(".selected").removeClass("selected");
      $el.addClass("selected");
      markup.updateTitle();
      markup.updateList();
      this.bind();
    },
    bind: function() {
      $("#add_todo img, #modal_background").off("click").on("click", markup.toggleModal);
      $("#todo_list_items input").off("click").on("click", $.proxy(this.complete, this));
      $("#all_todos dl").off("click").on("click", $.proxy(this.selectSideOption, this));
      $("form#new_todo").off("submit").on("submit", $.proxy(this.create, this));
      $("button.delete").off("click").on("click", $.proxy(this.delete, this));
      $("button.edit").off("click").on("click", $.proxy(this.edit, this));
    },
    loadPage: function() {
      $("body").html(templates.main_page(Todo));
    },
    init: function() {
      this.loadPage();
      this.bind();
      $("dl[data-title='All Todos']").click();
    }
  };

  markup.loadTemplates();
  app.init();
});
