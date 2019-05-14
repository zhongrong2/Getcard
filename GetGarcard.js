// 获取页面数据
$.ajax({
    url:"",
    data:"",
    method:"get",
    dataType:"josn",
    success:function (data) {
        console.log(data);
    },
    error:function () {
        console.log("服务器出错")
    }
})
//点击显示车牌号键盘
$(".CarNum").click(function (e) {
    // console.log("1");
    $("#select ul").slideUp(400);
    layer.open({
        type: 1
        ,content: '<div id="pro"></div>'
        ,anim: 'up'
        ,shade :false
        ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
    });
    showProvince();
    e.stopPropagation();
})
// 关闭车牌号键盘
$("#box").click(function () {
    closePro();
});
// 点击下拉框
$("#select").click(function(e){
    closePro();
    var ul = $(this).children('ul');
    // 获取下拉框数据
    $.ajax({
        url:"",
        method:"get",
        data:"",
        dataType:"json",
        success:function (data) {
            console.log(data);
        },
        error:function () {
            console.log("服务器出错")
        }
    })
    if(ul.is(":hidden")){
        ul.slideDown('400', function() {
            $(this).find("li").bind("click",function(){
                var selectLi=$(this).text();
                var id = $(this).attr("data");
                $("#select span").text(selectLi);
                $("#select span").attr("data",id);
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
});
//点击领取
function Get() {
    var CarType = $(".checkspan").attr("data");
    var CarNum = $(".CarNum").text();
    var users = $("input[type='checkbox']:checked").val();
    // console.log(CarType,CarNum,users);
    //判断是否选择车辆类型
    if (CarType == 0){
        $(".ProTilet").html("请选择车辆类型");
        $("#probox").show();
        hide();
        return false;
    } ;
    //判断车牌号是否为空
    if (CarNum == "车牌号码"){
        $(".ProTilet").html("请输入车牌号");
        $("#probox").show();
        hide();
        return false;
    }
    //判断是否同意用户协议
    if (users == "" || users == undefined){
        $(".ProTilet").html("请同意活动声明");
        $("#probox").show();
        hide();
        return false;
    }
    $.ajax({
        url:"aaaaaa",
        data:"",
        method:"post",
        dataType:"json",
        success:function () {

        },
        error:function () {
            console.log("服务器出错")
        },
    })
    return true;
}
//点击弹窗取消
function Cancel() {
    $("#hint").hide();
    $("#prompt").hide();
};
// 弹窗隐藏
function hide() {
    setTimeout(function(){
        $("#probox").hide();
    },1000)
};