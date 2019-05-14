// 点击下拉框
$("#select").click(function(e){
    var ul = $(this).children('ul');
    if(ul.is(":hidden")){
        ul.slideDown('400', function() {
            $(this).find("li").bind("click",function(){
                var selectLi=$(this).text();
                $("#select span").text(selectLi);
                $("#select ul").slideUp(400);
            })
            ul.mouseleave(function() {
                $('#select ul').slideUp(400)
            });
        });
    }
    else{
        $(this).children('ul').slideUp(400)
    }
    e.stopPropagation();
});
//点击空白处隐藏下拉框
$(document).bind("click",function(e){
    var target  = $(e.target);
    if(target.closest("#select ul").length == 0){
        $("#select ul").slideUp(400);
    }
})
//点击领取
function Get() {
    $("#hint").show();
    $("#prompt").show();
}
//点击弹窗取消
function Cancel() {
    $("#hint").hide();
    $("#prompt").hide();
}
