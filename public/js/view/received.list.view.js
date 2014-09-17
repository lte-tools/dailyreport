define(['control/event.center', 'model/mail.model', 'model/platform.model', 'util/date.format'], function(__Event, __Mail, __Platform) {
  return new (function(){
    var elem;
    this.init = function(opt) {
      elem = opt.elem;
      this.update();
    }

    var update_received = function(_date) {
      __Mail.get_received_list(_date, function(err, mails) {
        var platform_sent = [];
        for (var i = mails.length - 1; i >= 0; i--) {
          (function(mail) {
            var platforms = mail.mail_info.platforms;
            platform_sent = platform_sent.concat(platforms);
            elem.base_dom.append(
              $('<li class="received_list_item list-group-item"></li>').append(
                $('<span class="item_from"></span>').html(mail.mail_header.from.split("@")[0]),
                $('<span class="item_release"></span>').html(mail.mail_info.release || ''),
                $('<span class="item_domain"></span>').html(mail.mail_info.domain || ''),
                $('<span class="item_subject"></span>').html(mail.mail_header.subject),
                $('<span class="item_opt"></span>').append(
                  $('<span class="glyphicon glyphicon-search"  data-toggle="modal"</span>')
                    .click(function() {
                      show_mail(mail._id);
                    })
                )
              )
            ).addClass('list-group'); 
          })(mails[i]);
        };
        update_unsent(platform_sent);
      });
    };

    var update_unsent = function(_platform_sent) {
      __Platform.get_manage_platform(function(err, platforms) {
        var unsent_platforms = [];
        for (var i = platforms.length - 1; i >= 0; i--) {
          if (-1 == _platform_sent.indexOf(platforms[i])) {
            unsent_platforms.push(platforms[i]);
          }
        };
        for (var i = unsent_platforms.length - 1; i >= 0; i--) {
          elem.unsent_dom.append(
            $('<li class="unsent_list_item list-group-item"></li>').append(
              $('<span class="item_name"></span>').html(unsent_platforms[i].name|| ''),
              $('<span class="item_prime"></span>').html(unsent_platforms[i].prime),
              $('<span class="item_rel"></span>').html(unsent_platforms[i].rel || ''),
              $('<span class="item_domain"></span>').html(unsent_platforms[i].domain.toUpperCase() || '')
            )                
          ).addClass('list-group'); 
        };

      });
    };

    this.update = function(_date) {
      var date = _date;
      if (!date) {
        date = new Date().format();
      }
      update_received(date);
    };
    var show_mail = function(_id) {
      elem.base_show.html('');
      __Mail.get_by_id(_id, function(err, mail) {
        elem.base_show.html(mail.mail_body);
        elem.base_modal.modal('show');
      });
    };
  })();
});
