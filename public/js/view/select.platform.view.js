define(['../control/event.center', '../model/platform.model', 'model/mail.model'], function(__Event, __Platform, __Mail) {
  return new (function(){
    var __elem;
    var __option;
    var __selected = [];
    this.init = function(opt) {
      var self = this;
      __option = $.extend({}, __option, opt);
      __elem = __option.elem;
      __elem.add_dom = __elem.base_dom.find('span#span_add_platform');
      __elem.select_dom = __elem.base_dom.find('select#select_add_platform');
      __elem.add_dom.click(function() {
        __Platform.get_all_name(function(error, all_name) {
          if (error) {
            return;
          }
          __elem.select_dom.html('').append($('<option></option>'));
          $.each(all_name, function(i, name) {
            __elem.select_dom.append(
              $('<option></option>')
                .attr('value', name)
                .html(name)
            );
          });
          __elem.add_dom.hide();
          __elem.select_dom.show();
          __elem.select_dom.focus();
        });
      });
      __elem.select_dom.change(function() {
        var name = $(this).val();
        self.add_platform(name);
        $(this).hide();
        __elem.add_dom.show();
      });
      __elem.select_dom.blur(function() {
        $(this).hide();
        __elem.add_dom.show();
      });
      __elem.base_dom.on('click', '.platform_remove', function() {
        var name = $(this).parent().data('name');
        self.remove_platform(name);
      });


      __Event.register('select.platform', this);
      __Event.on('select.platform', 'get', function() {
        return self.get_platform();
      });
      __Event.on('select.platform', 'add', function(platforms) {
        for (var i = platforms.length - 1; i >= 0; i--) {
          self.add_platform(platforms[i]);
        };
      })
    };
    this.set_data = function(platforms) {
    }
    var update_selected_display = function() {
      var selected_dom = __elem.base_dom.find('#platform_selected');
      selected_dom.html('');
      $.each(__selected, function(i, name) {
        selected_dom.append(
          $('<span></span>')
            .addClass('label')
            .addClass('label-info')
            .html(name)
            .data('name', name)
            .append(
              $('<span class="platform_remove"></span>').html('x')
            )
        );
      })
    };
    this.get_platform = function() {
      return __selected;
    }
    this.add_platform = function(name) {
      if (platform_exists(name)) {
        return;
      }
      __selected.push(name);
      update_selected_display();
    };
    this.remove_platform = function(name) {
      __selected = $.grep(__selected, function(value) {
        return value != name;
      })
      update_selected_display();
    }
    var platform_exists = function(name) {
      if ($.inArray(name, __selected) == -1)
        return false;
      return true;
    }
  });
});