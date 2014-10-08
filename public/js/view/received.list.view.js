define(['control/event.center', 'model/mail.model', 'model/platform.model', 'util/date.format'], function (EC, g_Mail, g_Platform) {
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
    var get_manage_pltfs = function (site, _platform_sent) {
        g_Platform.get_manage_platform(site, function (err, platforms) {
          var i;
          var unsent_platforms = [];
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
                $('<span class="item_domain"></span>').html(unsent_platforms[i].domain.toUpperCase() || ''),
                $('<span class="item_site"></span>').html(site || '')
              )
            ).addClass('list-group');
          }
        });
      };

    this.update_unsent = function (platform_sent) {
      elem.unsent_dom.html('');
      get_manage_pltfs('CK-BCEM', platform_sent);
      get_manage_pltfs('CK-SOC', platform_sent);
      get_manage_pltfs('HT-BCEM', platform_sent);
      get_manage_pltfs('HT-SOC', platform_sent);
    };

    this.update_received = function (i_data) {
      var _this = this;
      g_Mail.get_received_list(i_data, function (err, mails) {
        elem.base_dom.html('');
        var platform_sent = [];
        var show_click_fun = function (mail) {
          return function () {
            EC.trigger('mail.show', 'show', mail._id);
          };
        };
        var i;
        for (i = mails.length - 1; i >= 0; i -= 1) {
          platform_sent = platform_sent.concat(mails[i].mail_info.platforms);
          elem.base_dom.append(
            $('<li class="received_list_item list-group-item"></li>').append(
              $('<span class="item_from"></span>').html(mails[i].mail_header.from.split("@")[0]),
              $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms.join('</br>') || ''),
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
        _this.update_unsent(platform_sent);
      });
    };

    this.update = function (i_data) {
      var date = i_data;
      if (!date) {
        date = new Date().format();
      }
      this.update_received(date);
    };
  };
  return new Recevied_List_View();
});