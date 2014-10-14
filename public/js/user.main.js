require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie'], function ($) {
    $(function () {
      require(['view/sent.list.view', 'view/mail.show.view'], function (Sent_List, Mail_Show) {
        Mail_Show.init({
          elem: {
            base: $('#modal-show-mail')
          }
        });
        Sent_List.init({
          elem: {
            base_dom: $('#div_sent_list'),
            base_draft: $('#div_draft_list'),
            base_show: $('#email'),
            base_modal: $('#myModal'),
            base_label: $('#myModalLabel')
          }
        });
      });
    });
  });
});
