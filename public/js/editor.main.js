require(['requirejs.config'], function () {
  'use strict';
  require(['jquery', 'bootstrap', 'cookie', 'summernote', 'tagsinput', 'typeahead'], function ($) {
    $(function () {
      require(['view/mail.view', 'view/select.platform.view'], function (Html_Editor, Select_Platform) {
        Html_Editor.init({
          elem: {
            base_dom: $('#mail'),
            mail_header_dom: $('#mail #mail_header'),
            mail_body_dom: $('#mail #mail_body')
          }
        });

        Select_Platform.init({
          elem: {
            base_dom: $('#select_platform')
          }
        });
      });
    });
  });
});