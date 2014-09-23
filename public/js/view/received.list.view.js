define(['control/event.center', 'model/mail.model', 'model/platform.model', 'util/date.format'], function (g_Event, g_Mail, g_Platform) {
  'use strict';
  var Recevied_List_View = function () {
    var elem;
    this.init = function (opt) {
      var self = this;
      elem = opt.elem;
      elem.date_dom.val((new Date()).format()).datepicker({
        format: 'yyyy-mm-dd',
        autoClose: true
      }).on('changeDate', function () {
        self.update(this.value);
      });
      this.update();
    };

    var show_mail = function (id) {
      elem.base_show.html('');
      g_Mail.get_by_id(id, function (err, mail) {
        elem.base_show.html(mail.mail_body);
        elem.base_modal.modal('show');
      });
    };

    var update_unsent = function (_platform_sent) {
      elem.unsent_dom.html('');
      g_Platform.get_manage_platform(function (err, platforms) {
        var unsent_platforms = [], i;
        for (i = platforms.length - 1; i >= 0; i -= 1) {
          if (-1 === _platform_sent.indexOf(platforms[i].name)) {
            unsent_platforms.push(platforms[i]);
          }
        }
        for (i = unsent_platforms.length - 1; i >= 0; i -= 1) {
          elem.unsent_dom.append(
            $('<li class="unsent_list_item list-group-item"></li>').append(
              $('<span class="item_name"></span>').html(unsent_platforms[i].name || ''),
              $('<span class="item_prime"></span>').html(unsent_platforms[i].prime),
              $('<span class="item_rel"></span>').html(unsent_platforms[i].rel || ''),
              $('<span class="item_domain"></span>').html(unsent_platforms[i].domain.toUpperCase() || '')
            )
          ).addClass('list-group');
        }

      });
    };
    var update_received = function (i_data) {
      g_Mail.get_received_list(i_data, function (err, mails) {
        var i;
        var j;
        var pjson;
        var plist;
        var pshow;
        elem.base_dom.html('');
        var platform_sent = [];
        var show_click_fun = function (mail) {
          return function () {
            show_mail(mail._id);
          };
        };
        for (i = mails.length - 1; i >= 0; i -= 1) {
          platform_sent = platform_sent.concat(mails[i].mail_info.platforms);
          pjson = JSON.stringify(mails[i].mail_info.platforms);
          plist = pjson.substring(1, pjson.length - 1).split(',');
          for (j = 0; j < plist.length; j += 1) {
            if (j > 0) {
              pshow += '<br />';
            } else {
              pshow = '';
            }
            pshow += plist[j].substring(1, plist[j].length - 1);
          }
          elem.base_dom.append(
            $('<li class="received_list_item list-group-item"></li>').append(
              $('<span class="item_platform"></span>').html(pshow || ''),
              $('<span class="item_from"></span>').html(mails[i].mail_header.from.split("@")[0]),
              $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
              $('<span class="item_domain"></span>').html(mails[i].mail_info.domain || ''),
              $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
              $('<span class="item_opt"></span>').append(
                $('<span class="glyphicon glyphicon-search"  data-toggle="modal"</span>')
                  .click(show_click_fun(mails[i]))
              )
            )
          ).addClass('list-group');
        }
        update_unsent(platform_sent);
      });
    };



    this.update = function (i_data) {
      var date = i_data;
      if (!date) {
        date = new Date().format();
      }
      update_received(date);
    };

  };
  return new Recevied_List_View();
});
