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
          (function(mail){
            __elem.base_dom.append(
              $('<li class="sent_list_item list-group-item"></li>').append(
                $('<span class="item_for_date"></span>').html((new Date(mail.mail_info.for_date)).format()),
                $('<span class="item_release"></span>').html(mail.mail_info.release || ''),
                $('<span class="item_domain"></span>').html(mail.mail_info.domain || ''),
                $('<span class="item_platform"></span>').html(mail.mail_info.platforms.join(', ') || ''),
                $('<span class="item_subject"></span>').html(mail.mail_header.subject),
                $('<span class="item_opt"></span>').append(
                  $('<span class="glyphicon glyphicon-search" data-toggle="modal"></span>')
                    .click(function(){
                      show_mail(mail._id);
                    })
                  })
                )
              )
            ).addClass('list-group');

          })(mails[i]);
   
        };


      })
    }

    var show_mail = function(_id) {
      elem.base_show.html('');
      __Mail.get_by_id(_id, function(err, mail) {
        elem.base_show.html(mail.mail_body);
        elem.base_modal.modal('show');
      });
    };

  });
});
