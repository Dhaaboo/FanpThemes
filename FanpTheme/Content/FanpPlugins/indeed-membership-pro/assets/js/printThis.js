;(function($){var opt;$.fn.printThis=function(options){opt=$.extend({},$.fn.printThis.defaults,options);var $element=this instanceof jQuery?this:$(this);var strFrameName="printThis-"+(new Date()).getTime();if(window.location.hostname!==document.domain&&navigator.userAgent.match(/msie/i)){var iframeSrc="javascript:document.write(\"<head><script>document.domain=\\\""+document.domain+"\\\";</script></head><body></body>\")";var printI=document.createElement('iframe');printI.name="printIframe";printI.id=strFrameName;printI.className="MSIE";document.body.appendChild(printI);printI.src=iframeSrc;}else{var $frame=$("<iframe id='"+strFrameName+"' name='printIframe' />");$frame.appendTo("body");}
var $iframe=$("#"+strFrameName);if(!opt.debug)$iframe.css({position:"absolute",width:"0px",height:"0px",left:"-600px",top:"-600px"});setTimeout(function(){function setDocType($iframe,doctype){var win,doc;win=$iframe.get(0);win=win.contentWindow||win.contentDocument||win;doc=win.document||win.contentDocument||win;doc.open();doc.write(doctype);doc.close();}
if(opt.doctypeString){setDocType($iframe,opt.doctypeString);}
var $doc=$iframe.contents(),$head=$doc.find("head"),$body=$doc.find("body");$head.append('<base href="'+document.location.protocol+'//'+document.location.host+'">');if(opt.importCSS)$("link[rel=stylesheet]").each(function(){var href=$(this).attr("href");if(href){var media=$(this).attr("media")||"all";$head.append("<link type='text/css' rel='stylesheet' href='"+href+"' media='"+media+"'>")}});if(opt.importStyle)$("style").each(function(){$(this).clone().appendTo($head);});if(opt.pageTitle)$head.append("<title>"+opt.pageTitle+"</title>");if(opt.loadCSS){if($.isArray(opt.loadCSS)){jQuery.each(opt.loadCSS,function(index,value){$head.append("<link type='text/css' rel='stylesheet' href='"+this+"'>");});}else{$head.append("<link type='text/css' rel='stylesheet' href='"+opt.loadCSS+"'>");}}
if(opt.header)$body.append(opt.header);if(opt.printContainer)$body.append($element.outer());else $element.each(function(){$body.append($(this).html());});if(opt.formValues){var $input=$element.find('input');if($input.length){$input.each(function(){var $this=$(this),$name=$(this).attr('name'),$checker=$this.is(':checkbox')||$this.is(':radio'),$iframeInput=$doc.find('input[name="'+$name+'"]'),$value=$this.val();if(!$checker){$iframeInput.val($value);}else if($this.is(':checked')){if($this.is(':checkbox')){$iframeInput.attr('checked','checked');}else if($this.is(':radio')){$doc.find('input[name="'+$name+'"][value='+$value+']').attr('checked','checked');}}});}
var $select=$element.find('select');if($select.length){$select.each(function(){var $this=$(this),$name=$(this).attr('name'),$value=$this.val();$doc.find('select[name="'+$name+'"]').val($value);});}
var $textarea=$element.find('textarea');if($textarea.length){$textarea.each(function(){var $this=$(this),$name=$(this).attr('name'),$value=$this.val();$doc.find('textarea[name="'+$name+'"]').val($value);});}}
if(opt.removeInline){if($.isFunction($.removeAttr)){$doc.find("body *").removeAttr("style");}else{$doc.find("body *").attr("style","");}}
setTimeout(function(){if($iframe.hasClass("MSIE")){window.frames["printIframe"].focus();$head.append("<script>  window.print(); </script>");}else{if(document.queryCommandSupported("print")){$iframe[0].contentWindow.document.execCommand("print",false,null);}else{$iframe[0].contentWindow.focus();$iframe[0].contentWindow.print();}}
if(!opt.debug){setTimeout(function(){$iframe.remove();},1000);}},opt.printDelay);},333);};$.fn.printThis.defaults={debug:false,importCSS:true,importStyle:false,printContainer:true,loadCSS:"",pageTitle:"",removeInline:false,printDelay:333,header:null,formValues:true,doctypeString:'<!DOCTYPE html>'};jQuery.fn.outer=function(){return $($("<div></div>").html(this.clone())).html()}})(jQuery);