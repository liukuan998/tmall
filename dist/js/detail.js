$(function(){

    //数据渲染
    var load={
        init:function(){
            this.getELe();
            this.bindEvent();
        },
        getELe:function(){
            this.$con=$('.con');
            this.$bigCon=$('.bigCon');
            this.$simg=$('.simg');
            this.$video=$('#video');
            this.$shut=$('.shut');
            this.$biaoti=$('.biaoti');
            this.$tmtit=$('.tmtit');
            this.$pprice=$('.pprice');
            this.$num=$('.num');
            this.$colorKinds=$('.colorKinds');
            this.$href=$(location).attr('href');
        },
        bindEvent:function(){   
            var id=Number(this.$href.split("?")[1].split("=")[1]);
            var _this=this;
            $.ajax({
                url:"./data/samsung.json",
                type:"get",
                dataType:"json",
                success:function(json){
                    $(json).each(function(index,item){
                        if(item.id===id){
                            console.log(item);
                            _this.$biaoti.text(item.tit);
                            _this.$pprice.text(item.price);
                            _this.$num.text(item.sold);
                           
                            _this.$con.find('img').attr('src',item.src);
                            _this.$bigCon.css({
                                'background': 'url('+item.src+') no-repeat',
                                'background-size': '936px 936px'
                            })
                            var str=''
                            $(item.simg).each(function(i,t){
                                str+='<li><img src="'+t+'"></li>'
                            })
                            _this.$simg.html(str);
                            var str2='';
                            $(item.stit).each(function(i,t){
                                str2+='<li>'+
                                '<i class="gou"></i>'+
                                '<img src="'+item.simg[i]+'"><span class="kindName">'+t+'</span>'
                               + '</li>'
                            })
                            _this.$colorKinds.html(str2);
                            if(item.video){
                                _this.$video.css({
                                    display:'block'
                                })
                                _this.$shut.css({
                                    display:'block'
                                })
                                // _this.$video.load(item.video);
                                _this.$video.attr('src',item.video);
                                _this.$video.attr('poster',item.poster);
                                _this.$shut.click(function(){
                                    _this.$video.css({
                                        display:'none'
                                    })
                                    _this.$shut.css({
                                        display:'none'
                                    })
                                })
                                
                            }
                        }
                    });
                    

                }
            });
        }

    }
    load.init();


    //划过事件
    var slide={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.$wuliu=$('.wuliu');
            this.$wu=$('.wu');
            this.$phonet=$('.phonet');
            this.$phonetao=$('.phonetao');
        },
        bindEvent:function(){
            var _this=this;
            this.$wuliu.mouseenter(function(){
                _this.$wu.slideDown(1);
            })
            this.$wuliu.mouseleave(function(){
                _this.$wu.slideUp(1);
            })
            this.$phonet.mouseenter(function(){
                _this.$phonetao.slideDown(1);
            })
            this.$phonet.mouseleave(function(){
                _this.$phonetao.slideUp(1);
            })
        }
    }
    slide.init();

    //放大镜
    var magnify={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.$con=$('.con');
            this.$bigCon=$('.bigCon');
            this.$mask=$('.mask');
        },
        bindEvent:function(){
            var _this=this;
            this.$con.mousemove(function(e){
                var bodyTop=document.body.scrollTop;
                _this.$bigCon[0].style.display = "block";
                _this.$mask[0].style.display = "block";
                var l = e.clientX - _this.offset(_this.$con[0], false).left - 109;
                var t = e.clientY - _this.offset(_this.$con[0], false).top - 109+document.documentElement.scrollTop;
                if (l <= 0) {
                    l = 0;
                } else if (l >= 200) {
                    l = 200;
                }
                if (t <= 0) {
                    t = 0;
                } else if (t >= 200) {
                    t = 200;
                }
                _this.$mask.css({
                    left:l + "px",
                    top:t+"px"
                })
                var scaleL = l / 200;
                var scaleT = t / 200;
                _this.$bigCon[0].style.backgroundPositionX = -418 * scaleL + "px";
                _this.$bigCon[0].style.backgroundPositionY = -418 * scaleT + "px";
            })
            this.$con.mouseleave(function (e) {
                _this.$mask[0].style.display = "none";
                _this.$bigCon[0].style.display = "none";
            });
        },
        offset:function(dom,bool){
            var l = 0, t = 0;
            var bdleft = dom.clientLeft;//初始元素的左边框
            var bdtop = dom.clientTop;//初始元素的上边框
            while(dom){
                l = l + dom.offsetLeft + dom.clientLeft;
                t = t + dom.offsetTop + dom.clientTop;
                dom = dom.offsetParent;
            }
            if (bool) {
                // 元素边框外侧到body的距离
                return {left: l-bdleft, top: t-bdtop};
            } else {
                // 元素内容外侧到body的距离
                return {left: l, top: t};
            }
        }
    }
    magnify.init();
    //划过换图
    var changeImg={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.$lis=$('.simg li');
            this.$con=$('.con');
            this.$bigCon=$('.bigCon');
        },
        bindEvent:function(){
            var _this=this;
            $('.simg').on('mouseenter','li',function(){
                var src=$(this).find('img').attr('src');
                _this.$con.find('img').attr('src',src);
                _this.$bigCon.css({
                    'background': 'url('+src+') no-repeat',
                    'background-size': '936px 936px'
                })
            });
            
        }
    }
    changeImg.init();
    //机身颜色点击换图
    var changeColor={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.colorKinds=$('.colorKinds');
            this.$con=$('.con');
            this.$bigCon=$('.bigCon');
        },
        bindEvent:function(){
            var _this=this;
            var last;
            // var last=$('.colorKinds').find('li').eq(1);
            // console.log(last[0]);
            // last.css({
            //     border: '2px solid #ff0036'
            // })  
            // last.find('.gou').css({
            //     display:'block'
            // })
           
            $('.colorKinds').on('click','li',function(){
                // if(last){
                  $('.colorKinds li:nth-child(1)').css({
                    border: '1px solid #ccc'
                  }) 
                  $('.colorKinds li:nth-child(1)').find('.gou').css({
                    display:'none'
                  }) 
                if(last){
                    last.css({
                    border: '1px solid #ccc'
                    })  
                    last.find('.gou').css({
                        display:'none'
                    })
                }
                 
                // }
                $(this).css({
                    border: ' 2px solid #ff0036'
                })
                $(this).find('.gou').css({
                    display:'block'
                })
                last=$(this);
                var src=$(this).find('img').attr('src');
                _this.$con.find('img').attr('src',src);
                _this.$bigCon.css({
                    'background': 'url('+src+') no-repeat',
                    'background-size': '936px 936px'
                })
            });
        }

    }
    changeColor.init();

    //库存加减
    var minus={
        init:function(){
            this.$up=$('.up');
            this.$down=$('.down');
            var _this=this;
            this.$up.click(function(){
                var value=Number($('.numbers').text());
                value++;
                $('.numbers').text(value);
                if(value>=99){
                    $('.numbers').text('99');
                }
            })
            this.$down.click(function(){
                var value=Number($('.numbers').text());
                value--;
                $('.numbers').text(value);
                if(value<=1){
                    $('.numbers').text('1');
                }
            })
        }

    }
    minus.init();
})