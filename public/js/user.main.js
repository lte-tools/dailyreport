require(['requirejs.config'] , function() {
  require(['jquery', 'bootstrap', 'cookie'], function($) {
    $(function(){
      require(['view/sent.list.view'], function(__Sent_List) {
        __Sent_List.init({
          elem: {
            base_dom: $('#div_sent_list'),
            base_show: $('#email'),
            base_modal: $('#myModal'),
            base_label: $('#myModalLabel')
          }
        });
      });
    });
  });
});