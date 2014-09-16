require(['requirejs.config'] , function() {
  require(['jquery', 'bootstrap', 'cookie','datepicker'], function($) {
    $(function(){
      require(['view/received.list.view'], function(__Received_List) {
        __Received_List.init({
          elem: {
            base_dom: $('#div_received_list'),
            add_dom: $('#div_add_more'),
            unsent_dom: $('#div_unsent_list'),
            date1_dom: $('#datepicker1'),
	          base_show:$('#email'),
            base_modal: $('#myModal'),
            base_label: $('#myModalLabel')
          }
        });
      });
    });
  });
});