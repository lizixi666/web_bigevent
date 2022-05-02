$(function(){
    //调用 getuserinfo获取用户的基本信息
    getUserInfo()
    var layer=layui.layer
    $('#btnLogout').on('click',function(){
        //提示用户是否确认退出
        layer.confirm('是否退出？', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地存储中的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href='/login.html'
            layer.close(index);
          });
    })
})
//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //请求头配置对象
        // headers:{
        //     Authorization: localStorage.getItem('token')||''
        // },
        success: function(res){
           if (res.status!==0){
               return layui.layer.msg('获取用户信息失败!')
           }
           //调用此函数渲染用户头像
           renderAvatar(res.data)
        },
        //不论成功还是失败,最终都会调用complete回调函数
        // complete: function(res){
           
        //     console.log('执行了 complete回调');
        //     console.log(res);
        //     //在complete回调函数中,可以使用res.reponseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //1.强制清空token
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user){
    //1.获取用户名称
    var name = user.nickname || user.username
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //3.按需渲染用户头像
    if(user.userpic !== null){
    //3.1渲染1图片头像
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()    
    }else{
    //3.2渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()//获取name中的第一个字符 toUpperCase将第一个字符转为大写
    $('.text-avatar').html(first).show()
    }
}