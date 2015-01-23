jQuery(document).ready(function(){
    $('.sidenav > li > a').click(function(e){
        e.preventDefault();
        $('.sidenav > li > a').removeClass('active');
        var sul = $(this).siblings('ul');
        $(this).addClass('active');
        if(sul.length > 0 && !sul.is(":visible")) {
            $('.sidenav > li > a').siblings('ul').slideUp();
            sul.slideDown();
        } else{
            $('.sidenav > li > a').siblings('ul').slideUp();
        }
    });
    // 初始化菜单tip
    $('.sidenav a span').each(function(index, el){
        var title = $(el).text();
        var parent = $(el).parent();
        if(title.trim() != '') {
          parent.attr('data-toggle',"poshytip")
          if(parent.attr('data-no') != 'pjax')
            parent.addClass('pjaxlink');
          parent.attr('title',title);
        }
    });
    $('.sidenav-toggle').click(function(e){
        e.preventDefault();
        var flag = $(this).attr('data-flag');
        if(typeof flag == 'undefined') {
            $(this).find('i').removeClass('fa-indent').addClass('fa-outdent');
            $('.lside').removeClass('col-md-2').addClass('col-md-1');
            $('.main').removeClass('col-md-10').addClass('col-md-11');
            $(this).attr('data-flag',false)
        } else {
          console.log('hello');
            $(this).find('i').removeClass('fa-outdent').addClass('fa-indent');
            $('.lside').removeClass('col-md-1').addClass('col-md-2');
            $('.main').removeClass('col-md-11').addClass('col-md-10');
            $(this).removeAttr('data-flag');
        }
    });

        init(jQuery);
    if(typeof NProgress == 'object') {
        NProgress.configure({ parent: '#pjax' });
    }
    $(document).on('click', 'a[data-pjax=delete]', function(event){
        event.preventDefault();
        var parent = $(this).closest('tr');
        if(parent) {
            parent.addClass('deleting');
        }
        var that = $(this);
        var url = $(this).attr('href');
        var msg = typeof $(this).attr('data-msg') != 'undefined' ?  $(this).attr('msg') : '你确认要删除此条数据么？';
        bootbox.confirm(msg,function(result){
            if(result) {
                if($.support.pjax) {
                    $.pjax({url: url, container: '#pjax',fragment: "#pjax",timeout: 10000,scrollTo:0})
                } else {
                    window.location.href= url;
                }
            } else {
                if(parent) {
                    parent.removeClass('deleting');
                }
            }
        });
    });

    if ($.support.pjax) {
       $(document).pjax('.pjaxlink, .pagination li a, [data-pjax] a, .navbar a', '#pjax', {
            fragment: "#pjax",
            timeout: 10000,
            scrollTo:0
        });
       $(document).on('submit', 'form[data-pjax]', function(event) {
          $.pjax.submit(event, '#pjax', {
                fragment: "#pjax",
                timeout: 10000,
                scrollTo:0
          });
        });
        NProgress.configure({ parent: '#pjax' });
        $(document).on('pjax:start',   function() { NProgress.start(); });
        $(document).on('pjax:popstate',   function() { NProgress.inc(0.2);; });
        $(document).on('pjax:send',   function() { NProgress.inc(0.3);; });
        $(document).on('pjax:success',   function() { NProgress.inc(0.4);; });
        $(document).on('pjax:complete',   function() { NProgress.inc(0.4); });
        $(document).on('pjax:timeout',  function(event) { NProgress.set(0.9); NProgress.done();event.preventDefault()});
        $(document).on('pjax:end', function() { 
            NProgress.inc(0.3);
            NProgress.done();
            init(jQuery);
         });
    }
});
function init($) {
    if(typeof console != 'undefined') {
        console.log('initialize...');
    }
    $('.selectpicker').selectpicker();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile');
    }
    //通过value模拟placeholder
    //$('input').placeholder();
    //通过插入元素模拟placeholder
    $('input').placeholder({isUseSpan:true,onInput:false});
    if(typeof console != 'undefined') {
        console.log('Finish...');
    }
    var poshytip_className = "tip-twitter";
    $('*[data-toggle=poshytip],*[data-toggle=lptip]').poshytip({
        className: poshytip_className,
        showTimeout: 100,
        alignTo: 'target',
        alignX: 'right',
        alignY: 'center',
        offsetX: 10,
        allowTipHover: false,
        fade: true,
        slide: true
    });
    $('*[data-toggle=tptip]').poshytip({
        className: poshytip_className,
        showTimeout: 1,
        alignTo: 'target',
        alignX: 'center',
        offsetY: 2,
        allowTipHover: false,
        fade: true,
        slide: true
    });
     $('*[data-toggle=bptip]').poshytip({
        className: poshytip_className,
        showTimeout: 1,
        alignTo: 'target',
        alignX: 'center',
        alignY: 'bottom',
        offsetY: 2,
        allowTipHover: false,
        fade: true,
        slide: true
    });

     $('*[data-toggle=rptip]').poshytip({
        className: poshytip_className,
        showTimeout: 1,
        alignTo: 'target',
        alignX: 'left',
        alignY: 'center',
        offsetX: 10,
        allowTipHover: false,
        fade: true,
        slide: true
    });
     
    $('form').Validform({
        label:"label",
        showAllError:true,
        tiptype:5
    });

    // popover 
    $('*[data-toggle=popover]').popover();
}