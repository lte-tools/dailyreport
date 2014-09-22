define(['../control/event.center', '../model/mail.model', 'bootbox', 'model/platform.model', '../util/date.format'], function (g_Event, g_Mail, bootbox, g_Platform) {
  'use strict';
  var Mail_View = function () {
    var g_elem, g_option;

    var set_data = function (mail) {
      //to
      var to_dom = g_elem.mail_header_dom.find('input#input_mail_to');
      to_dom.val(mail.to);
      //cc
      var cc_dom = g_elem.mail_header_dom.find('input#input_mail_cc');
      cc_dom.val(mail.cc);
      //subject
      var subject_dom = g_elem.mail_header_dom.find('input#input_mail_subject');
      subject_dom.val(mail.subject);
      //body
      var body_dom = g_elem.base_dom.find('div.note-editable');
      body_dom.html(mail.html);
      //release
      var release_dom = g_elem.mail_header_dom.find('#select_release');
      release_dom.val(mail.release);
      //domain
      var domain_dom = g_elem.mail_header_dom.find('#select_domain');
      domain_dom.val(mail.domain);
      //platform
      g_Event.trigger('select.platform', 'add', mail.platforms);
    };

    var load_default = function () {
      g_Platform.get_all_name_by_email(function (error, platforms) {
        if (error) {
          return;
        }
        set_data({
          to: 'lte-tdd-st@lists.alcatel.de,',
          cc: '',
          subject: '',
          html: '',
          platforms: platforms,
          release: '',
          domain: ''
        });
      }, this);

    };

    var load_last = function () {
      g_Mail.get_last(function (error, mail) {
        if (error) {
          return;
        }
        set_data({
          to: mail.mail_header.to,
          cc: mail.mail_header.cc,
          subject: mail.mail_header.subject,
          html: mail.mail_body,
          platforms: mail.mail_info.platforms,
          release: mail.mail_info.release,
          domain: mail.mail_info.domain
        });
      }, this);
    };
    var select_init = function () {
      var for_date_dom = g_elem.mail_header_dom.find('select#select_for_date');
      for_date_dom.html('');
      var today = new Date();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      for_date_dom
        .append(
          $('<option></option>')
            .attr('value', today.format())
            .html(today.format()),
          $('<option></option>')
            .attr('value', yesterday.format())
            .html(yesterday.format())
        );
    };
    var load_other = function () {
      select_init();
      if (!g_option.unsent) {
        var type = window.location.pathname.split('/').reverse()[0];
        if (type === 'last') {
          load_last();
        } else if (type === 'default') {
          load_default();
        }
      }
    };


    var load_unsent_data = function (mail) {
      //release
      var release_dom = g_elem.mail_header_dom.find('#select_release');
      release_dom.html('').append(
        $('<option></option>')
          .attr('value', mail.release)
          .html(mail.release)
      );
      //domain
      var domain_dom = g_elem.mail_header_dom.find('#select_domain');
      domain_dom.html('').append(
        $('<option></option>')
          .attr('value', mail.domain)
          .html(mail.domain)
      );
      //date
      var for_date_dom = g_elem.mail_header_dom.find('select#select_for_date');
      for_date_dom.html('').append(
        $('<option></option>')
          .attr('value', (new Date(mail.for_date)).format())
          .html((new Date(mail.for_date)).format())
      );
      set_data(mail);

    };
    var load_data = function () {
      var mail = g_Mail.get_unsent_mail();
      if (mail) {
        bootbox.dialog({
          message: '<p>Find an unsent mail, open or delete it?</p>',
          title: 'Find unsent mail',
          buttons: {
            open: {
              label: 'Open',
              className: 'btn-default',
              callback: function () {
                g_option.unsent = true;
                load_unsent_data(JSON.parse(mail));
              }
            },
            delete: {
              label: 'Delete',
              className: 'btn-danger',
              callback: function () {
                g_Mail.remove_unsent_mail();
                load_other();

              }
            },
            later: {
              label: 'Ask me later',
              className: 'btn-default',
              callback: function () {
                load_other();

              }
            }
          }
        });
      } else {
        load_other();
      }
    };




    var get_mail_info = function () {
      var d_header = g_elem.mail_header_dom;
      var d_body = g_elem.mail_body_dom;
      return {
        to: d_header.find('#input_mail_to').val(),
        cc: d_header.find('#input_mail_cc').val(),
        subject: d_header.find('#input_mail_subject').val(),
        html: d_body.code(),
        release: d_header.find('#select_release').val(),
        domain: d_header.find('#select_domain').val(),
        for_date: d_header.find('#select_for_date').val(),
        platforms: g_Event.trigger('select.platform', 'get')
      };
    };
    var send_mail = function () {
      var mail = get_mail_info();
      g_Mail.save_unsent_mail(JSON.stringify(mail));
      g_Mail.send(mail, function (err) {
        if (err) {
          alert(err);
          return;
        }
        g_Mail.remove_unsent_mail();
        alert('ok');
      }, this);
    };

    this.init = function (opt) {
      g_option = $.extend({}, g_option, opt);
      g_elem = g_option.elem;
      g_elem.mail_body_dom.summernote({height: 300});
      g_elem.mail_header_dom.find('#btn_mail_send').click(send_mail);
      g_option.unsent = false;
      load_data();
      g_Event.register('mail', this);
    };

  };
  return new Mail_View();
});