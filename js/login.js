$(function(){
    //点击去注册按钮 显示注册页面
    $('#login_btn').on('click',function(){
        console.log(111);
        $('.reg-box').show()
        $('.login-box').hide()
    })

    //点击登录按钮 显示登录页面
    $('#reg_btn').on('click',function(){
        console.log(111);
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //自定义表单验证
    var form = layui.form;

    form.verify({
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value){
            //此处value是input用户输入的值
            var pwd = $('.reg-box>.layui-form [name=password]').val();
            //如果两次输入的密码不一致
            if(pwd !== value){
                return '两次输入的密码不一致';
            }
        }
      });
      
      //表单注册功能
      $('#reg_form').on('submit',function(e){
        //取消默认行为
        e.preventDefault();
        //发送ajax请求 上传用户数据
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#reg_form [name=username]').val(),
                password: $('#reg_form [name=password]').val()
            },
            success: function(res){
                if(res.status !== 0){
                    // return console.log(res.message);
                    //使用提示框显示信息
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                //成功后返回登录页面
                $('#reg_btn').click();
            }
        })
      })

      //表单登录功能
      //1.监听提交事件
      $('#login_form').on('submit',function(e){
        //q取消默认行为
        e.preventDefault();

        var data = $('#login_form').serialize();
        //发送ajax请求 
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: data,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                //存储token值
                // var userToken = res.token;
                localStorage.setItem('token',res.token);

                layer.msg(res.message);

                //跳转页面
                location.href = 'index.html';
            }
        })
      })
})