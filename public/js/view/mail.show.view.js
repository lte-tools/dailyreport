define(['model/mail.model', 'control/event.center'], function (g_Mail, EC) {
  'use strict';
  var Mail_Show_View = function () {
    var elem;
    var show = function (mail_id) {
      var
        modal_body = elem.base.find('.modal-body'),
        modal_title = elem.base.find('.modal-title');
      $.each([modal_body, modal_title], function () {
        this
          .html('')
          .append(
            $('<p></p>').html('Loading...')
          );
      });
      var resize = function () {
        var content_dom = elem.base.find('.modal-content');
        content_dom.outerHeight($(window).height() * 0.85);
        content_dom.find('.modal-body').outerHeight(
          content_dom.innerHeight() - content_dom.find('.modal-header').outerHeight() - content_dom.find('.modal-footer').outerHeight()
        );
      };

      elem.base.on('shown.bs.modal', function () {
        resize();
      });
      $(window).resize(function () {
        resize();
      });
      elem.base.modal('show');
      g_Mail.get_by_id(mail_id, function (err, mail) {
        modal_body.html('');
        modal_title.html(mail.mail_header.subject);
        modal_body.append(
          $('<p></p>').append(
            $('<span class="item"></span>').html('From: '),
            $('<span></span>').html(mail.mail_header.from.replace(/@alcatel-[a-zA-Z]*\.com(\.cn)?/i, ''))
          ),
          $('<p></p>').append(
            $('<span class="item"></span>').html('To: '),
            $('<span></span>').html(mail.mail_header.to.join('; ').replace(/@alcatel-[a-zA-Z]*\.com(\.cn)?/ig, ''))
          ),
          $('<p></p>').append(
            $('<span class="item"></span>').html('Cc: '),
            $('<span></span>').html(mail.mail_header.cc.join('; ').replace(/@alcatel-[a-zA-Z]*\.com(\.cn)?/ig, ''))
          ),
          $('<div class="mail-body"></div>').html(mail.mail_body)
        );
      });
    };
    this.init = function (opt) {
      elem = opt.elem;
      EC.register('mail.show', this);
      EC.on('mail.show', 'show', show);
    };
  };
  return new Mail_Show_View();
});
