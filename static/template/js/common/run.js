jQuery(document).ready(function(){
    var $ = jQuery;
    $('.selectpicker').selectpicker();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.selectpicker').selectpicker('mobile');
    }
    //通过value模拟placeholder
    //$('input').placeholder();
    //通过插入元素模拟placeholder
    $('input').placeholder({isUseSpan:true,onInput:false});
});