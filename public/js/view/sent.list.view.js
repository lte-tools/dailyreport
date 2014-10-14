define(['control/event.center', 'model/mail.model', 'util/date.format'], function (EC, __Mail) {
  'use strict';
  var Sent_List_View = function () {
    var __elem;
    var __option;

    var draft_edit = function (mail) {
      top.location='/editor/draft/' + mail.data._id;
    };

    var draft_del = function (id) {
      $(document).find('#tip_context').html('Remove the draft... ');
      $.ajax({
        url: '/mail/delete',
        type: 'POST',
        dataType: 'json',
        data: {'draft_id' : id.data}
      }).done(function (r) {
        if (r.result === 'ok') {      
          $(document).find('#tip_title').html('Message');
          $(document).find('#tip_context').html('Draft deleted.');
        } else {
          $(document).find('#tip_title').html('Warning');
          $(document).find('#tip_context').html(r.data);
        }
        $(document).find('#tip_button').html('').append($('<button></button>').addClass("btn btn-default").attr("type", "button").attr("data-dismiss", "modal").html('Close'));
        __Mail.get_draft_list(create_draft_list);
      });
    };

    var del_tips = function (mail) {
      $(document).find('#tip_title').html('Message');
      $(document).find('#tip_context').html('Are you sure to remove the draft?');
      $(document).find('#tip_button').html('').append($('<button></button>').addClass("btn btn-danger").attr("type", "button").attr("id", "del_anyway").html('Delete').unbind().bind("click", mail.data._id, draft_del)).append($('<button></button>').addClass("btn btn-default").attr("type", "button").attr("data-dismiss", "modal").html('Cancel'));
      $(document).find('#user_tips').modal('show');
    }

    var create_draft_list = function (err, mails) {
      var i;
      if (err) {
        alert(err);
        return;
      }
      __elem.base_draft.html('');
      for (i = mails.length - 1; i >= 0; i -= 1) {
        __elem.base_draft.append(
          $('<li class="sent_draft_item list-group-item"></li>').append(
            $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
            $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
            $('<span class="item_domain"></span>').html(mails[i].mail_info.domain || ''),
            $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms.join(', ') || ''),
            $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
            $('<span class="item_opt"></span>').append(
              $('<span class="glyphicon glyphicon-edit" data-toggle="modal"></span>')
                .on("click", mails[i], draft_edit),
              $('<span>    </span>'),
              $('<span class="glyphicon glyphicon-remove" data-toggle="modal"></span>')
                .on("click", mails[i], del_tips)
            )
          )
        ).addClass('list-group');
      }
    };

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
      __Mail.get_draft_list(create_draft_list);
    };

    this.init = function (opt) {
      __option = $.extend({}, __option, opt);
      __elem = __option.elem;
      update();
    };

  };
  return new Sent_List_View();
});