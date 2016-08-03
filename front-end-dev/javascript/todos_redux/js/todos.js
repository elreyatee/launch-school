$(function() {
  var app = {
    toggleModal: function(e) {
      e.stopPropagation();

      $("#modal, #modal_background").fadeToggle();
    },
    bind: function() {
      $("#add_todo img").on("click", $.proxy(this.toggleModal, this));
      $("#modal_background").on("click", $.proxy(this.toggleModal, this));
    },
    init: function() {
      this.bind();
    }
  }

  app.init();
});
