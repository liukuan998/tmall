
$(function(){
    var shopList={
        init:function(){
            this.getEle();
            this.addEle();
            this.bindEvent();
        },
        getEle:function(){
            this.$lis=$('.shopList li');
            this.$divs=$('.shopList li div');
            this.$lists=$('.listWrap')
        },
        addEle:function(){
            var _this=this;
            $.ajax({
                url:'./data/shopList.json',
                type:'get',
                dataType:'json',
                success:function(json){
                    // console.log($('.list'));
                    $(json).each(function(index,item){
                        $(Object.keys(json[index])).each(function(i,t){
                            var newP=`<p>${t} &gt;</p>`;
                            var newUl=$('<ul></ul>');
                            var newDiv=$('<div></div>');
                            newDiv.html(newP);
                            $(json[index][t]).each(function(x,y){
                                // console.log(y);
                                    var newLi=`<li>${y}</li>`;
                                    newUl.append($(newLi));
                            })
                            // newDiv.append(newP[0]);
                            newDiv.append(newUl[0]);
                           
                            $('.list')[index].append(newDiv[0]);
                        })
                        if(index===1){
                            var newImg='<img src="./img/second.png" alt="">';
                            _this.$lists.eq(2).append(newImg);
                            // $(newImg).css({
                            //     'height': '110px'
                            // })

                        }
                        if(index===2){
                            var newImg='<img src="./img/third.png" alt="">'
                            _this.$lists.eq(3).append(newImg);
                            // console.log(_this.$lists.eq(3));
                        }
                        if(index===8){
                            var newImg='<img src="./img/ninth.png" alt="">'
                            _this.$lists.eq(9).append(newImg);
                            // console.log(_this.$lists.eq(9));
                        }
                        if(index===10){
                            var newImg='<img src="./img/twelve.png" alt="">'
                            _this.$lists.eq(11).append(newImg);
                            // console.log(_this.$lists.eq(index));
                        }
                    })
                }
            })
        },
        bindEvent:function(){
            var _this=this;
            this.$lis.each(function(index,item){
                $(item).mouseover(function(){
                    $(item).find('.listWrap').css({
                        'display':"block",
                        'top':index*-31.2+"px",
                        'background':"#fafafa"
                    })
                });
                $(item).mouseout(function(){
                    $(item).find('.listWrap').css({
                        'display':"none",
                       
                    })
                })
            });
            
        }

    }
    shopList.init();

    //为moduleCon填充内容
    var moduleList={
        init:function(){
            this.getEle();
            this.addEle();
        },
        getEle:function(){
            this.$moduleCon=$(".moduleCon");
        },
        addEle:function(){
            var _this=this;
            $.ajax({
                url:"./data/moduleList.json",
                type:"get",
                dataType:"json",
                success:function(json){
                    $(json).each(function(index,item){
                        var newLi=`<li class="moduleList">
                        <div class="listImg">
                          <img src="${item.src}" alt="">
                        </div>
                        <a class="listMask" href="">
                          <div class="maskTop">
                            <span>
                              ${item.name}
                            </span>
                          </div>
                          <div class="maskBot">
                            <span>点击进入</span>
                          </div>
                        </a>
                      </li>`;
                      _this.$moduleCon.append(newLi);
                    })
                }
            })
        }
    }
    moduleList.init();

    //顶部搜索弹出
    var topSearch={
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            var flag=false;
            // var origin=false;
            window.onscroll=function(){
                var h=document.body.scrollTop||document.documentElement.scrollTop;
                // console.log(h);
                
                if(h>700){
                    flag=true;
                }
                if(h>1000&&h<=1400){
                    $(".super").css({
                        background:"#64c333"
                    })
                }else{
                    $(".super").css({
                        background:"rgba(0,0,0,.6)"
                    })
                }
                if(h>1400&&h<=2600){
                    $(".inter").css({
                        background:"#000"
                    })
                }else{
                    $(".inter").css({
                        background:"rgba(0,0,0,.6)"
                    })
                }
                if(h>2600){
                    $(".guessLike").css({
                        background:"#000"
                    })
                }else{
                    $(".guessLike").css({
                        background:"rgba(0,0,0,.6)"
                    })
                }
                if(h<700){
                    flag=false;
                }
                // if(origin!==flag){
                    if(flag){
                        $(".topSearch").slideDown();
                        $(".topSearch").css({
                            display:'block'
                        })
                        console.log($(".smallCon")[0]);
                        animate($(".smallCon")[0],{
                            'left':0,
                            'bottom':0
                        })
                    }
                    else{
                        $(".topSearch").slideUp();
                        $(".topSearch").css({
                            display:'none'
                        })
                        animate($(".smallCon")[0],{
                            'left':-36,
                            'bottom':-360
                        })
                    }
                //     origin===flag;
                // }
               
            }
            
            
        }
    }
    topSearch.init();

    //天猫超市轮播
    var marketTab={
        init:function(){
            this.getEle();
            this.bindEvent();
        
        },
        getEle:function(){
            this.$tit1=$(".tabConTit1");
            this.$tit2=$(".tabConTit2");
            this.$con1=$(".tabConbot1");
            this.$con2=$(".tabConbot2");
            this.timer=null;
            this.prev=1;
        },
        bindEvent:function(){
            var _this=this;
            this.autoplay();
            this.$tit1.mouseover(function(){
                clearInterval(timer);
                _this.getGreen(this);
                _this.getWhite(_this.$tit2);
                _this.$con1.show();
                _this.$con2.hide();
            });
            this.$tit2.mouseover(function(){
                clearInterval(timer);
                _this.getGreen(this);
                _this.getWhite(_this.$tit1);
                _this.$con1.hide();
                _this.$con2.show();

            })
            // this.$tit1.mouseout(function(){
            //     _this.prev=0;
            //     _this.autoplay();
            // });
            // this.$tit2.mouseout(function(){
            //     _this.prev=1;
            //     _this.autoplay();
            // })
        },
        getGreen:function(item){
            $(item).css({
                background:'#00b262',
                color:'#fff'
            })
        },
        getWhite:function(item){
            $(item).css({
                background:'#f5f5f5',
                color:'#000'
            })
        },
        autoplay:function(){
            var _this=this;
            timer=setInterval(function(){
                // console.log(_this);
                if(_this.prev===0){
                    _this.getGreen(_this.$tit1);
                    _this.getWhite(_this.$tit2);
                    _this.$con1.show();
                    _this.$con2.hide();
                    _this.prev=1;
                }else if(_this.prev===1){
                    _this.getGreen(_this.$tit2);
                    _this.getWhite(_this.$tit1);
                    _this.$con2.show();
                    _this.$con1.hide();
                    _this.prev=0;
                }
            },3000)
        }
    }
    marketTab.init();

    //为天猫超市添加内容
    var market={
        init:function(){
            this.getEle();
            this.addEle();
        },
        getEle:function(){
            this.$market=$(".marketConRight")
        },
        addEle:function(){
            var _this=this;
            $.ajax({
                url:"./data/market.json",
                type:"get",
                dataType:"json",
                success:function(json){
                    $(json).each(function(index,item){
                        var newLi=`<li class="normalLi">
                        <img class="goodsImg" src="${item.src}" alt="">
                        <div class="imgTit">
                        ${item.tit}
                        </div>
                        <div class="imgPrice">
                        ${item.price}
                        </div>
                      </li>`;
                      _this.$market.append(newLi);
                    });
                    
                }
            })
        }
    }
    market.init();
     //为天猫国际添加内容
    var inter={
        init:function(){
            this.getEle();
            this.addEle();
        },
        getEle:function(){
            this.$market=$(".marketConRight2")
        },
        addEle:function(){
            var _this=this;
            $.ajax({
                url:"./data/inter.json",
                type:"get",
                dataType:"json",
                success:function(json){
                    $(json).each(function(index,item){
                        // console.log(item);
                        var newLi=`<li class="normalLi">
                        <img class="goodsImg" src="${item.src}" alt="">
                        <div class="imgTit">
                        ${item.tit}
                        </div>
                        <div class="imgPrice">
                        ${item.price}
                        </div>
                      </li>`;
                      _this.$market.append(newLi);
                    });
                    
                }
            })
        }
    }
    inter.init();
    //为猜你喜欢添加内容
    var like={
        init:function(){
            this.getEle();
            this.addEle();
        },
        getEle:function(){
            this.$market=$(".likeListCon")
        },
        addEle:function(){
            var _this=this;
            $.ajax({
                url:"./data/likeList.json",
                type:"get",
                dataType:"json",
                success:function(json){
                    $(json).each(function(index,item){
                        // console.log(item);
                        var newLi=`<li class="likeGoods">
                        <img class="goodsImg" src="${item.src}" alt="">
                        <div class="imgTit2">
                        ${item.tit}  
                        </div>
                        <div class="imgPrice">
                        ${item.price}
                        </div>
                      </li>`;
                      _this.$market.append(newLi);
                    });
                    

                }
            });
            
        },
        
  
    }
    like.init();
    //导航缩略图（返回顶部等）
    var sNav={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.nav=$(".smallNav");
            this.super=$(".super");
            this.inter=$(".inter");
            this.bea=$(".bea");
            this.fashion=$(".fashion");
            this.live=$(".live");
            this.love=$(".love");
            this.out=$(".out");
            this.guessLike=$(".guessLike");
            this.backTop=$(".backTop");
            this.docu=document.documentElement||document.body;
        },
        bindEvent:function(){
            
            var _this=this;
            //返回顶部
            this.backTop.click(function(){
                console.log(123);
                animate(_this.docu,{'scrollTop':0});
            });
            //天猫超市
            this.super.click(function(){
                
                animate(_this.docu,{'scrollTop':1400});
            })
            //天猫国际
            this.inter.click(function(){
               
                animate(_this.docu,{'scrollTop':2100});
            })
            this.bea.click(function(){
               
                animate(_this.docu,{'scrollTop':1400});
            })
            this.fashion.click(function(){
               
                animate(_this.docu,{'scrollTop':1400});
            })
            this.live.click(function(){
               
                animate(_this.docu,{'scrollTop':1400});
            })
            this.love.click(function(){
              
                animate(_this.docu,{'scrollTop':2100});
            })
            this.out.click(function(){
               
                animate(_this.docu,{'scrollTop':2800});
            })
            this.guessLike.click(function(){
               
                animate(_this.docu,{'scrollTop':2800});
            })
        }
    }
    sNav.init();
})

//轮播swiper
var mySwiper = new Swiper ('.swiper-container', {
    effect : 'fade',
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
      bulletClass : 'my-bullet',
      bulletActiveClass: 'my-bullet-active',
    },
    
    //自动播放
    autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
    }
  })        
  $(".my-bullet").hover(function() {
    $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
},function() {
    mySwiper.autoplay.start(); //鼠标移出之后，自动轮播开启
})
