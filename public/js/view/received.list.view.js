define(['control/event.center', 'model/mail.model','model/platform.model','config','util/date.format',], function(__Event, __Mail, __Platform, __Config) {

  return new (function(){
    var __elem;
    var __option;
    var __secelem;
    var today_mail=[];
    var today_domain_name=[];
    var toolList = new Array();
    toolList=__Config.TOOL_List().concat();


    this.init = function(opt,secopt) {
      var toDate=new Date().format();

      __option = $.extend({}, __option, opt);
      __elem = __option.elem;
      __secelem = __elem.add_dom;
      __fddom = __elem.date1_dom;

      __fddom.val(toDate);
      __fddom.datepicker({
        format : 'yyyy-mm-dd'
      }).on('changeDate', function(){
        if(__secelem.add_emails.css('display')=='none'){
            __secelem.add_emails.css('display','inline');
            __secelem.delete_emails.css('display','none');
          }

        update(this.value)

        
      });           

     update(toDate);
     __secelem.add_emails = __secelem.find('span#span_add_email');
     __secelem.delete_emails = __secelem.find('span#span_delete_email');     
    }

    var update = function(dateVal) {
      __Mail.get_received_list(function(err, mails, auth) {
        if (err)  {
          alert(err);
          return;
        }
        __elem.base_dom.html('');
        var today=dateVal;
  
   
        for (var i = mails.length - 1; i >= 0; i--) {
          var email_date=(new Date(mails[i].mail_info.for_date)).format();
          var k=0;
          if(email_date==today){
            if(auth.indexOf('LR')!=-1){
              for(var j=0;j<mails[i].mail_info.platforms.length;j++) {
              __elem.base_dom.append(
                $('<li class="received_list_item list-group-item"></li>').append(
                  $('<span class="item_from"></span>').html(mails[i].mail_header.from.split("@")[0]),
                  $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
                  $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
                  $('<span class="item_domain"></span>').html(mails[i].mail_info.domain.toUpperCase() || ''),
                  $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms[j]|| ''),
                  $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
                  $('<span class="item_opt"></span>').append(
                    $('<span class="glyphicon glyphicon-search"  data-toggle="modal"</span>').attr("id",function(){return i}).click(function(){
                      var j=$(this).attr('id');
                      __Mail.get_received_list(function(err, mails){
                        if (err){
                          alert(err);
                          return;
                        }
                      changMode(mails[j].mail_body);
                      });
                      __elem.base_show.html('Loading......');
                      document.getElementById('modal-dialog').style.left = $(window).width()/3 +'px';
                      __elem.base_modal.modal('show');        
                    })
                  )
                )
              ).addClass('list-group'); 
              today_mail.push(mails[i].mail_info.platforms[j].toString());
              } 
         
            }
            else{
              __elem.base_dom.append(
                $('<li class="received_list_item list-group-item"></li>').append(
                  $('<span class="item_from"></span>').html(mails[i].mail_header.from.split("@")[0]),
                  $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
                  $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
                  $('<span class="item_domain"></span>').html(mails[i].mail_info.domain.toUpperCase() || ''),
                  $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms|| ''),
                  $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
                  $('<span class="item_opt"></span>').append(
                    $('<span class="glyphicon glyphicon-search"  data-toggle="modal" data-target="#myModal"></span>').attr("id",function(){return i}).click(function(){
                      var j=$(this).attr('id');
                      __Mail.get_received_list(function(err, mails){
                        if (err){
                          alert(err);
                          return;
                        }
                      changMode(mails[j].mail_body);
                      });
                      __elem.base_show.html('Loading......');
                      document.getElementById('modal-dialog').style.left = $(window).width()/3 +'px';
                      __elem.base_modal.modal('show');  
                    })
                  )
                )
              ).addClass('list-group'); 
            } 
           
            today_domain_name.push(mails[i].mail_header.from.toString());        
          };
        };


        __secelem.add_emails.unbind('click').click(function(){

        if(__elem.base_dom.children().length!=0){
           __elem.base_dom.empty();
          }          
          for (var i = mails.length - 1; i >= 0; i--) {
            var email_date=(new Date(mails[i].mail_info.for_date)).format();
            
              __elem.base_dom.append(
                $('<li class="received_list_item list-group-item"></li>').append(
                  $('<span class="item_from"></span>').html(mails[i].mail_header.from.split("@")[0]),
                  $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
                  $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
                  $('<span class="item_domain"></span>').html(mails[i].mail_info.domain.toUpperCase() || ''),
                  $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms|| ''),
                  $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
                  $('<span class="item_opt"></span>').append(
                    $('<span class="glyphicon glyphicon-search"  data-toggle="modal" data-target="#myModal"></span>').attr("id",function(){return i}).click(function(){
                      var j=$(this).attr('id');
                      __Mail.get_received_list(function(err, mails){
                        if (err){
                          alert(err);
                          return;
                       }
                      changMode(mails[j].mail_body);
                      });
                      __elem.base_show.html('Loading......');
                      document.getElementById('modal-dialog').style.left = $(window).width()/3 +'px';
                      __elem.base_modal.modal('show');  
                    })   
                  )
                )
              ).addClass('list-group');          
            
          };   

          __secelem.add_emails.css('display','none');
          __secelem.delete_emails.css('display','inline-block');


        });
          
      __secelem.delete_emails.unbind('click').click(function(){
    
        __elem.base_dom.empty();
        for (var i = mails.length - 1; i >= 0; i--) {
          var email_date=(new Date(mails[i].mail_info.for_date)).format();
          var k=0;
          if(email_date==today){
            if(auth.indexOf('LR')!=-1){
              for(var j=0;j<mails[i].mail_info.platforms.length;j++) {
              __elem.base_dom.append(
                $('<li class="received_list_item list-group-item"></li>').append(
                  $('<span class="item_from"></span>').html(mails[i].mail_header.from.split("@")[0]),
                  $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
                  $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
                  $('<span class="item_domain"></span>').html(mails[i].mail_info.domain.toUpperCase() || ''),
                  $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms[j]|| ''),
                  $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
                  $('<span class="item_opt"></span>').append(
                    $('<span class="glyphicon glyphicon-search"  data-toggle="modal" data-target="#myModal"></span>').attr("id",function(){return i}).click(function(){
                      var j=$(this).attr('id');
                      __Mail.get_received_list(function(err, mails){
                        if (err){
                          alert(err);
                          return;
                        }
                      changMode(mails[j].mail_body);
                      });
                      __elem.base_show.html('Loading......');
                      document.getElementById('modal-dialog').style.left = $(window).width()/3 +'px';
                      __elem.base_modal.modal('show'); 
                    })
                  )
                )
              ).addClass('list-group'); 
              today_mail.push(mails[i].mail_info.platforms[j].toString());
              } 
         
            }
            else{
              __elem.base_dom.append(
                $('<li class="received_list_item list-group-item"></li>').append(
                  $('<span class="item_from"></span>').html(mails[i].mail_header.from.split("@")[0]),
                  $('<span class="item_for_date"></span>').html((new Date(mails[i].mail_info.for_date)).format()),
                  $('<span class="item_release"></span>').html(mails[i].mail_info.release || ''),
                  $('<span class="item_domain"></span>').html(mails[i].mail_info.domain.toUpperCase() || ''),
                  $('<span class="item_platform"></span>').html(mails[i].mail_info.platforms|| ''),
                  $('<span class="item_subject"></span>').html(mails[i].mail_header.subject),
                  $('<span class="item_opt"></span>').append(
                    $('<span class="glyphicon glyphicon-search"  data-toggle="modal" data-target="#myModal"></span>').attr("id",function(){return i}).click(function(){
                      var j=$(this).attr('id');
                      __Mail.get_received_list(function(err, mails){
                        if (err){
                          alert(err);
                          return;
                       }
                      changMode(mails[j].mail_body);
                      });
                      __elem.base_show.html('Loading......');
                      document.getElementById('modal-dialog').style.left = $(window).width()/3 +'px';
                      __elem.base_modal.modal('show'); 
                    })   
                  )
                )
              ).addClass('list-group'); 
            } 
           
            today_domain_name.push(mails[i].mail_header.from.toString());        
          };
        };        

        __secelem.add_emails.css('display','inline-block');
        __secelem.delete_emails.css('display','none');

      });        
        
       

        __Platform.get_all_config(function(error, all_config, relea){
          if (error) {
            return;
          }   
        if(__elem.unsent_dom.children().length!=0){
            __elem.unsent_dom.empty();

          }          

          if(!(relea instanceof Array)){

            for (var i in all_config) {
              if(all_config[i].name == '') continue;
              var ind = $.inArray(all_config[i].name,today_mail);
              if(ind==(-1)&&(all_config[i].rel.indexOf(relea)!=(-1))){
                __elem.unsent_dom.append(
                  $('<li class="unsent_list_item list-group-item"></li>').append(
                    $('<span class="item_name"></span>').html(all_config[i].name|| ''),
                    $('<span class="item_prime"></span>').html(all_config[i].prime),
                    $('<span class="item_for_date"></span>').html(today),
                    $('<span class="item_rel"></span>').html(all_config[i].rel || ''),
                    $('<span class="item_domain"></span>').html(all_config[i].domain.toUpperCase() || ''),
                    $('<span class="item_name"></span>').html(all_config[i].name|| '')
                  )                
                ).addClass('list-group');                 
              }
            }
          }

          else if(relea.indexOf('TOOL')!=-1){
            for(var i=0; i < toolList.length; i++){
              var ind = $.inArray(toolList[i],today_domain_name)
              if(ind==-1){
                __elem.unsent_dom.append(
                  $('<li class="unsent_list_item list-group-item"></li>').append(
                    $('<span class="item_email"></span>').html(toolList[i]),
                    $('<span class="item_for_date"></span>').html(today),
                    $('<span class="item_rel"></span>').html(' '),
                    $('<span class="item_domain"></span>').html('TOOL'),
                    $('<span class="item_name"></span>').html(' ')
                  )                
                ).addClass('list-group');
              }
            }
          }

          else{ 
          
            for (var i in all_config) {
              if(all_config[i].domain == '') continue;
              var ind = $.inArray(all_config[i].email,today_domain_name);
              
              if(ind==(-1)&&($.inArray(all_config[i].domain.toUpperCase(),relea)!=(-1))){
                __elem.unsent_dom.append(
                  $('<li class="unsent_list_item list-group-item"></li>').append(
                    $('<span class="item_prime"></span>').html(all_config[i].prime),
                    $('<span class="item_for_date"></span>').html(today),
                    $('<span class="item_rel"></span>').html(all_config[i].rel || ''),
                    $('<span class="item_domain"></span>').html(all_config[i].domain.toUpperCase()|| '')
                    
                  )                
                ).addClass('list-group');                
              }
            }
          }
        });
      });
    };

    var changMode = function changeMode(mailBody){
      __elem.base_show.html(mailBody);
      var windowWidth = $(window).width();
      var modalWidth = document.getElementById('modal-dialog').offsetWidth;
      modalLeft = (windowWidth - modalWidth)/2 + 'px';
      document.getElementById('modal-dialog').style.left=modalLeft;  
    }

  });
});
