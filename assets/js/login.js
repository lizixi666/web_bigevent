$(function(){
    //点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()//点击后隐藏loginbox
        $('.reg-box').show()//将被隐藏的regbox显示
    })
    //点击去登陆的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从layui中获取form对象
    var form = layui.form
    var layer=layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了pwd的校验规则
        'pwd':[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          //校验两次密码是否一致的规则
          repwd:function(value){
            //通过形参拿到的是确认密码框中的内容，还需要拿到密码框中的内容，进行比较
            //如果判断失败，return一个错误提示消息
            var pwd =  $('.reg-box [name=password]').val()
            if(pwd!==value){
                return'两次密码不一致'
            }
          }
    })
    var data = {
        username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()
    }
    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();//阻止默认行为
       $.post('/api/reguser',data,function(res){
            if(res.status !==0){
              
                // return layer.msg(res.message)
            }
            layer.msg('注册成功！请登录')
            //模拟人的点击行为
            $('#link_login').click()
        })
       
        
    })
    //监听登陆表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                   
                }
                layer.msg('登陆成功')
                //将登陆成功得到的 token字符串保存到localStorage中
                localStorage.setItem('token',res.token)
                console.log(res.token);
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })



    // //监听注册表单的提交事件
    // $('#form_reg').on('submit',function(e){
    //     //阻止默认提交行为
    //     e.preventDefault();
    //     //发起ajax的POST请求
    //     var data = {  username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
    //     $.post('http://www.liulongbin.top:3007/api/reguser',data,function(res){
    //         if(res.status!==0){
    //             // return console.log(res.message);
    //             return layer.msg(res.message)
    //         }
    //         return layer.msg('注册成功！ 请登录')
    //     })
    // })

    // //监听登录表单的提交事件
    // $('#form_login').submit(function(e){
    //     //阻止默认提交行为
    //     e.preventDefault()
    //     $.ajax({
    //         url:'http://www.liulongbin.top:3007/api/login',
    //         method:'POST',
    //         //快速获取表单中的数据
    //         data:$(this).serialize(),
    //         success:function(res){
    //             if(res.status!==0){
    //                 return layer.msg('登录失败')
    //             }
    //             layer.msg('登陆成功')
    //             console.log(res.token);
    //             //跳转到后台主页
    //             // location.href= '/index.html'
    //         }
    //     })
    // })
})