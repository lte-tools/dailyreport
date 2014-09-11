require(['requirejs.config'] , function() {
  require(['jquery', 'bootstrap', 'cookie', 'summernote', 'tagsinput', 'typeahead'], function($) {
    $(function(){
      require(['view/mail.view', 'view/select.platform.view'], function(__Html_Editor, __Select_Platform) {
        __Html_Editor.init({
          elem: {
            base_dom: $('#mail'),
            mail_header_dom: $('#mail #mail_header'),
            mail_body_dom: $('#mail #mail_body')
          }
        });

        __Select_Platform.init({
          elem: {
            base_dom: $('#select_platform')
          }
        })
      });
    });
  });
});