$(function(){
    var login={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.$login=$('.login');
            this.$register=$('.register');
            this.$loginCon=$('.loginCon');
            this.$logPhone=$('#logPhone');
            this.$logPass=$('#logPass');
            this.$logBtn=$('.logBtn');
            this.$forget=$('.forget');
            this.$registerCon=$('.registerCon');
            this.$regPhone=$('#regPhone');
            this.$regPass=$('#regPass');
            this.$regName=$('#regName');
            this.$regBtn=$('.regBtn');
            this.$error=$('.error');
            this.$tip=$('.tip');

        },
        bindEvent:function(){
            var _this=this;
            if(localStorage.getItem('name')){
                this.$logPhone.val(localStorage.getItem('phone'))
                this.$logPass.val(localStorage.getItem('pass'))
            }else{
                this.$logPhone.val('')
                this.$logPass.val('')
            }
            console.log(localStorage.getItem('name'));
            this.$login.click(function(){
                _this.$login.css({
                    'border-bottom': '2px solid #000'
                })
                _this.$loginCon.css({
                    'display':'block'
                })
                _this.$registerCon.css({
                    'display':'none'
                })
                _this.$register.css({
                    'border-bottom': 'none'
                })
            })
            this.$register.click(function(){
                _this.$register.css({
                    'border-bottom': '2px solid #000'
                })
                _this.$registerCon.css({
                    'display':'block'
                })
                _this.$loginCon.css({
                    'display':'none'
                })
                _this.$login.css({
                    'border-bottom': 'none'
                })
            })
            this.$logBtn.click(function(){
                var phval=_this.$logPhone[0].value;
                var paval=_this.$logPass[0].value;
                // console.log(pval);
                if(phval.trim()&&phval.trim()){
                    _this.$error.css({
                        display:"none"
                    });
                    if(!(/^1[3456789]\d{9}$/.test(phval))){
                        _this.$error.css({
                            display:"block"
                        })
                        _this.$tip.text(
                            '请输入正确格式手机号'
                        )
                        return;
                    }
                    $.ajax({
                        url: './php/login.php',
                        type: 'get',
                        data:{
                            'type':'login',
                            'phone':phval,
                            'pass':paval
                        },
                        dataType: 'json',
                        success: function (json){
                            // console.log(json[0].name);
                            _this.$error.css({
                                display:"none"
                            })
                            if(!json.result){
                                localStorage.setItem("name" , json[0].name);
                                localStorage.setItem("pass" , json[0].pass);
                                localStorage.setItem("phone" , json[0].phone);

                                location.href='./index.html';
                                

                            }else{
                                _this.$error.css({
                                    display:"block"
                                })
                                _this.$tip.text(
                                    '手机号或密码错误'
                                )
                            }
                        }
                    });
                }else{
                    _this.$error.css({
                        display:"block"
                    })
                    _this.$tip.text(
                        '手机号或密码不能为空'
                    )
                    return;
                }
            })
            this.$regBtn.click(function(){
                var phval=_this.$regPhone[0].value;
                var paval=_this.$regPass[0].value;
                var nval=_this.$regName[0].value;
                // console.log(pval);
                if(phval.trim()&&paval.trim()&&nval.trim()){
                    _this.$error.css({
                        display:"none"
                    });
                    if(!(/^1[3456789]\d{9}$/.test(phval))){
                        _this.$error.css({
                            display:"block"
                        })
                        _this.$tip.text(
                            '请输入正确格式手机号'
                        )
                        return;
                    }
                    
                    if(!(/.{2,10}/.test(nval))){
                        _this.$error.css({
                            display:"block"
                        })
                        _this.$tip.text(
                            '用户名需2-10位'
                        )
                        return;
                    }
                    $.ajax({
                        url: './php/login.php',
                        type: 'get',
                        data:{
                            'type':'add',
                            'phone':phval,
                            'pass':paval,
                            'name':nval
                        },
                        dataType: 'json',
                        success: function (json){
                            // console.log(json[0].name);
                            _this.$error.css({
                                display:"none"
                            })
                            if(!json.result){
                                // console.log(123);
                                alert('注册成功,即刻登录吧')
                                localStorage.setItem("name" , json.name);
                                localStorage.setItem("pass" , json.pass);
                                localStorage.setItem("phone" , json.phone);
                                
                                location.reload();
                                _this.$logPhone.val(localStorage.getItem('phone'))
                                _this.$logPass.val(localStorage.getItem('pass'))

                            }else if(json.result===2){
                                _this.$error.css({
                                    display:"block"
                                })
                                _this.$tip.text(
                                    '手机号已被注册'
                                )
                            }else if(json.result===4){
                                _this.$error.css({
                                    display:"block"
                                })
                                _this.$tip.text(
                                    '注册失败'
                                )
                            }
                        }
                    });
                }else{
                    _this.$error.css({
                        display:"block"
                    })
                    _this.$tip.text(
                        '手机号、密码或用户名不能为空'
                    )
                    return;
                }
            })
        }
    }
    login.init();
})