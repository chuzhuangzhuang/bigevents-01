$(function(){
    // 给区注册按钮注册
    $('#go-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // // 给去登录按钮注册
    $('#go-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //通过layui的form自定义类名
    var form = layui.form;
    form.verify({
        //创建自定义 pwd检测
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          //创建再次确认检测
        repwd: function(value){
            //获取用户输入的密码内容
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value ){
                return '两次输入密码不一致'
            }
        }
    })

    //给表单注册提交事件
    $('#reg_form').on('submit',function(e){
        //取消默认提交事件
        e.preventDefault();
        //发送ajax请求验证账号
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            // dataType: 'jsonP',
            data: {
                username: $('.layui-form [name=username]').val(),
                password: $('.layui-form [name=password]').val()
            },
            success: function(res){
                if(res.status !== 0){
                    return console.log(res.message);
                }
                console.log('注册成功');
            }
        })
    })
})