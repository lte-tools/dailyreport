require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie', 'datepicker'], function ($) {
    $(function () {
      require(['view/received.list.view'], function (Received_List) {
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