define(['control/event.center', 'model/mail.model', 'util/date.format'], function (EC, __Mail) {
  'use strict';
  var Sent_List_View = function () {
    var __elem;
    var __option;

    /*
    var show_mail = function (_id) {
      __elem.base_show.html('');
      __Mail.get_by_id(_id, function (err, mail) {
        __elem.base_show.html(mail.mail_body);
        __elem.base_modal.modal('show');
      });
    };
    */

    var update = function () {
      __Mail.get_sent_list(function (err, mails) {
        var i;
        if (err) {
          alert(err);
          return;
        }
        __elem.base_dom.html('');
        var show_click_fun = function (mail) {
          return function () {
            EC.trigger('mail.show', 'show', mail._id);
          };
        };
        for (i = mails.length - 1; i >= 0; i -= 1) {
          __elem.base_dom.append(
            $('<li class="sent_list_item list-group-item"></li>').append(
              $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
              $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
              $('<span class="item_domain"></span>').html(mails[i].mail_info.domain || ''),
              $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms.join(', ') || ''),
              $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
              $('<span class="item_opt"></span>').append(
                $('<span class="glyphicon glyphicon-search" data-toggle="modal"></span>')
                  .click(show_click_fun(mails[i]))
              )
            )
          ).addClass('list-group');
        }
      });
    };



    this.init = function (opt) {
      __option = $.extend({}, __option, opt);
      __elem = __option.elem;
      update();
    };

  };
  return new Sent_List_View();
});
