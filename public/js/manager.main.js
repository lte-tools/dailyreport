require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie', 'datepicker'], function ($) {
    $(function () {
      require(['view/received.list.view', 'view/mail.show.view'], function (Received_List, Mail_Show) {
        Mail_Show.init({
          elem: {
            base: $('#modal-show-mail')
          }
        });
        Received_List.init({
          elem: {
            base_dom: $('#div_received_list'),
            add_dom: $('#div_add_more'),
            unsent_dom: $('#div_unsent_list'),
            date_dom: $('#datepicker'),
            base_show: $('#email'),
            base_modal: $('#myModal'),
            base_label: $('#myModalLabel')
          }
        });
      });
    });
  });
});
