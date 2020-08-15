$(function(){
    var forget={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.$err=$(".err");
            this.$word=$(".word");
            this.$back=$(".back");
            this.$move=$(".move");
            this.$btn=$(".btn");
            this.$phone=$("#phone")
            this.$box=$(".box")
        },
        bindEvent:function(){
            var _this=this;
            var flag=false;
            var flag1=false;
            this.$move[0].onmousedown=function(e){
                var e=e||e.event;
                var left=e.offsetX;
                var boxLeft=_this.$box.offset().left;
                console.log(boxLeft);
                document.onmousemove=function(e){
                    // console.log(e.clientX);
                    var moveLeft=e.clientX-left-boxLeft;
                    _this.$move.css({
                        left:moveLeft
                    })
                    _this.$back.css({
                        width:moveLeft
                    })
                    if(moveLeft<=0){
                        _this.$move.css({
                            left:0
                        })
                    }else if(moveLeft>=260){
                        _this.$move.css({
                            left:260
                        })
                        _this.$back.css({
                            width:260
                        })
                        $(".move").html('<img src="./img/pass.png" alt="">')
                        $(".word").text('验证通过');
                        $(".word").css({
                            color:'#fff',
                            transform: 'translate(-80%, -50%)' 
                        })
                        flag=true;
                        flag1=true;
                        // _this.$move.unbind();
                        _this.$move[0].onmousedown=null;
                        document.onmousemove=null;
                        return;
                    }
                    document.onmouseup=function(e){
                        // console.log(e.offsetX);
                        
                        var moveLeft=e.clientX-left-boxLeft;
                        if(flag1){
                            _this.$move.css({
                                left:260
                            })
                            _this.$back.css({
                                width:260
                            })
                            $(".move").html('<img src="./img/pass.png" alt="">')
                            $(".word").text('验证通过');
                            $(".word").css({
                                color:'#fff',
                                transform: 'translate(-80%, -50%)' 
                            })
                        // _this.$move.unbind();
                        flag=true;

                            _this.$move[0].onmousedown=null;
                            document.onmousemove=null;
                            document.onmouseup=null;
                            return;
                        }else{
                            animate(_this.$back[0],{
                                width:0
                            })
                            animate(_this.$move[0],{
                                left:0
                            })
                           
                        }
                        document.onmousemove=null;
                        
                    }
                }
                
            }
            this.$btn.click(function(){
                // console.log(_this.$phone.val());
                if(!(/^1[3456789]\d{9}$/.test(_this.$phone.val()))){
                    _this.$err.css({
                        opacity:1
                    })
                    return;
                }else{
                    _this.$err.css({
                        opacity:0
                    })
                }
                if(flag){
                    $.ajax({
                        url: './php/login.php',
                        type: 'get',
                        data:{
                            'type':'select',
                            'phone':_this.$phone.val(),
                        },
                        dataType: 'json',
                        success: function (json){

                            if(!json.result){
                                // console.log(123);
                                alert('您的初始密码为'+json[0].pass)
                                location.href="./login.html";

                            }else if(json.result===2){
                                alert("手机号暂未注册，快去注册吧！")
                            }
                        }
                    });
                }else{
                    alert("为了您的帐户安全，请进行安全校验");
                }
            })
        }
    }
    forget.init();
})