var all_todos = JSON.parse(localStorage.getItem("all_todos")) || [],
    templates = {};

$(function() {
  function Todo(data) {
    this.id = this.last_id;
    // this.completed = false;
    this.filterData(data);
  }

  Todo.prototype = {
    constructor: Todo,
    collection: all_todos || [],
    last_id: localStorage.getItem("id") || 0,
    selected: [],
    current_section: {
      title: "All Todos",
      total: all_todos.length,
      class: "selected"
    },
    filterData: function(data) {
      var self = this;

      data.forEach(function(d) {
        self[d.name] = d.value;
      });
    },
    getIDNum: function(item_id) {
      var id = item_id.match(/\d/)[0];
      return +id;
    },
    saveData: function() {
      localStorage.setItem("all_todos", JSON.stringify(this.collection));
      localStorage.setItem("id", this.last_id);
    },
    deleteTodo: function(item_id) {
      var id = this.getIDNum(item_id),
          todo_index,
          todo;

      todo = this.collection.filter(function(todo) {
        return todo.id === id;
      });

      todo_index = this.collection.indexOf(todo[0]);
      this.collection.splice(todo_index, 1);
      this.saveData();
      this.current_section.total--;
    },
    addTodo: function(data) {
      this.last_id++;
      var new_todo = new Todo(data);
      this.collection.push(new_todo);
      this.saveData();
      this.current_section.total++;
    }
  };

  var form = {
    hideForm: function(e) {
      e.stopPropagation();

      $("#modal_background").hide();
      $("#modal").hide();
    },
    renderForm: function(e) {
      e.stopPropagation();
      $("#modal").show().find("form")[0].reset();
      $("#modal_background").show();
    }
  };

  var start = {
    loadTemplates: function() {
      $("[type='text/x-handlebars']").each(function() {
        $tmpl = $(this);
        templates[$tmpl.attr("id")] = Handlebars.compile($tmpl.html());
      });

      $("[data-type='partial']").each(function() {
        $tmpl = $(this);
        Handlebars.registerPartial($tmpl.attr("id"), $tmpl.html());
      });
    },
    renderTitle: function() {
      $("#todo-header").html(templates.todo_header_template(Todo.prototype));
    },
    renderHeader: function() {
      $("#all-todos").html(templates.all_todos_template(Todo.prototype));
    },
    renderList: function() {
      $("#todo-list").html(templates.list_of_todo_items(Todo.prototype));
    },
    removeTodo: function(e) {
      e.stopPropagation();

      var $el = $(e.target).closest(".todo-item"),
          item_id = $el.find("input").attr("id");

      Todo.prototype.deleteTodo(item_id);
      $el.remove();
      this.renderHeader();
      this.renderTitle();
      this.renderList();
    },
    newTodo: function(e) {
      e.preventDefault();

      var form_data = $("#new-todo").serializeArray();

      Todo.prototype.addTodo(form_data);
      $("#modal_background").click();
      this.renderHeader();
      this.renderTitle();
      this.renderList();
    },
    sideBarSelect: function(e) {
      e.stopPropagation();

      var $el = $(e.target);

      Todo.prototype.current_section.title = $el.attr("data-title");
      Todo.prototype.current_section.total = $el.attr("data-total");
      this.renderTitle();
      this.renderList();
    },
    loadPage: function() {
      $("body").html(templates.whole_page_template(Todo.prototype));
    },
    bind: function() {
      $("body").on("submit", $.proxy(this.newTodo, this));
      $("body").on("click", "#add-todo", $.proxy(form.renderForm, this));
      $("body").on("click", "#modal_background", $.proxy(form.hideForm, this));
      $("body").on("click", ".delete", $.proxy(this.removeTodo, this));
      $("body").on("click", "#all-todos-header", $.proxy(this.sideBarSelect, this));
    },
    setDefault: function() {
      this.bind();
      this.loadPage();
      $("#all-todos-header").click();
    },
    init: function() {
      this.loadTemplates();
      this.setDefault();
    }
  }

  start.init();
});
