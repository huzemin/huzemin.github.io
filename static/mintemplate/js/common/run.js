jQuery(document).ready(function(){
    init(jQuery);
});

function init($) {
     
    //通过value模拟placeholder
    //$('input').placeholder();
    //通过插入元素模拟placeholder
    $('input').placeholder({isUseSpan:true,onInput:false});
    
}