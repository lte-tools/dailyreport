define(['control/event.center', 'model/mail.model', 'util/date.format'], function(__Event, __Mail) {

  return new (function(){
    var __elem;
    var __option;
    this.init = function(opt) {
      __option = $.extend({}, __option, opt);
      __elem = __option.elem;
      update();
    }
    var update = function() {
      __Mail.get_sent_list(function(err, mails) {
        if (err)  {
          alert(err);
          return;
        }
        __elem.base_dom.html('');
        for (var i = mails.length - 1; i >= 0; i--) {
          __elem.base_dom.append(
            $('<li class="sent_list_item list-group-item"></li>').append(
              $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
              $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
              $('<span class="item_domain"></span>').html(mails[i].mail_info.domain || ''),
              $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms.join(', ') || ''),
              $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
              $('<span class="item_opt"></span>').append(
                $('<span class="glyphicon glyphicon-search" data-toggle="modal"></span>').attr("id",function(){return i}).click(function(){
                  var j = $(this).attr("id");
                  __Mail.get_sent_list(function(err,mails){
                    if(err){
                      alert(err);
                      return;
                    }
                    changMode(mails[j].mail_body,mails[j].mail_header.to,mails[j].mail_header.cc,mails[j].mail_header.subject);
                  })
                })
              )
            )
          ).addClass('list-group');
        };


      })
    }

    var changMode = function changeMode(mailBody,mailToList,mailCcList,mailSubject){

      __elem.base_show.html(mailBody);
      __elem.base_modal.modal('show');
    }

    var mailHeader =  function mailHeader(mailItemList)
    { 
      mailItemList = mailItemList + ',';
      var mailItem_list = String(mailItemList).split(',');
      var mailItem = '';
      for(var i=0;i<mailItem_list.length-1;i++) 
          mailItem = mailItem + mailItem_list[i].split("@")[0] + "&nbsp,&nbsp";
      var m = mailItem.length - 6 ;
      mailItem = mailItem.substring(0,m);
      return mailItem;
    }

  });
});
