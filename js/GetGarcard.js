$(document).ready(function(){
    var urlAndParam =location.href.split('#')[0];
    var ID = $("#WeChatID").val();
    $.ajax({
        url: "http://lsh.longshihua.cn/WeChatManager/register/CheckweChatConfig",
        data: {url:urlAndParam,ID: ID },
        type: 'post',
        dataType: "json",
        success: function (data) {
            var timestamp = data.timestamp;
            var noncestr = data.nonceStr;
            var signature = data.signature;
            //通过config接口注入权限验证配置
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                jsApiList: ['chooseImage','uploadImage']
            });
        }
    });
});
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
});
// 关闭车牌号键盘
$("#box").click(function () {
    closePro();
});
// 点击下拉框
$("#select").click(function(e){
    closePro();
    var ul = $(this).children('ul');
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
    if (CarNum == "车牌号码" || CarNum.length == 0){
        $(".ProTilet").html("请填写车牌号");
        $("#probox").show();
        hide();
        return false;
    }
    //判断车牌号格式是否正确
    if(!(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}[A-Z0-9]{0,1}[A-Z0-9]{0,1}$/.test(CarNum))){
        $(".ProTilet").html("车牌号错误，请重新输入");
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
        url:"data.json",
        // data:"",
        method:"get",
        dataType:"json",
        success:function (data) {
            console.log(data);
            if (data.status == 0){
                $(".promptTxt").html(data.msg);
                $("#hint").show();
                $("#prompt").show();
            } else{
                $(".promptTxt").html(data.msg);
                $(".sure").hide();
                $(".prompt-top img").attr("src","img/success.png")
                $(".cancel").html("确定");
                $(".cancel").css("width","100%");
                $("#hint").show();
                $("#prompt").show();
            }
        },
        error:function () {
            $(".ProTilet").html("服务器出错");
            $("#probox").show();
            hide();
        },
    })
    return true;
}
//点击弹窗确定
function Sure() {
    window.location.reload()//刷新当前页面.
}
//点击弹窗取消
function Cancel() {
    $("#hint").hide();
    $("#prompt").hide();
    wx.closeWindow();
};
// 弹窗隐藏
function hide() {
    setTimeout(function(){
        $("#probox").hide();
    },1000)
};