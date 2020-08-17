//动态渲染
$(function(){
    var samsung={
        init:function(){
            this.getELe();
            this.bindEvent();
        },
        getELe:function(){
            this.$sam=$(".sam");
        },
        bindEvent:function(){

            //本页搜索框
            $('.btn').click(function(){
                if($('.sousuoCon').val().trim()){
                    localStorage.setItem('search',$('.sousuoCon').val().trim());
                    location.reload();
                }
            })

            var name=localStorage.getItem('search');
            $(".pp").text('品牌：'+name+'  X');
            $('.sousuoCon').attr('placeholder',name);
            $('.pplast').text(name);
            if(name.indexOf("华为")!==-1){
                $('.intro').css({
                    "background": "url('../img/huawei.png') no-repeat center 0",
                    "background-size": "cover"
                })
            } else if(name.indexOf("米")!==-1){
                $('.intro').css({
                    "background": "url('../img/mi.png') no-repeat center 0",
                    "background-size": "cover"
                })
            }
            var count=0;
            var _this=this;
            $.ajax({

                url:'./data/samsung.json',
                type:'get',
                dataType:'json',
                success:function(json){
                    
                    $(json).each(function(index,item){
                        if(item.tit.indexOf(name)!==-1){
                            count++;
                            var str='';
                        $(item.simg).each(function(i,t){
                           
                            str+='<li><img src="'+t+'" alt=""></li>';
                        })
                        var newLi=`<li class="samlist" num=${item.id} >
                        <div class="mask">
                
                         </div>
                        <img src="${item.src}" alt="">
                        <ul class="simg">
                            ${str}
                        </ul>
                        <p class="samprice">
                            ￥&ensp;${item.price}
                        </p>
                        <p class="samtit">
                           ${item.tit}
                        </p>
                        <p class="shop">
                            ${item.shop} 等更多商家&gt;
                            
                        </p>
                        <p class="cheng">
                            <span class="cheng1">
                                该款月成交 <i>${item.sold}笔</i>
                            </span>
                            <span  class="cheng2">
            
                            </span>
                        </p>
                    </li>`
                    
                       
                        _this.$sam.append(newLi);
                        }
                        
                       
                    })
                    $('.countN').text(count);
                    $('.sam').on('click','.samlist',function(){
                        // console.log($(this).attr('num'));
                        location.href='./detail.html?id='+$(this).attr('num')
                    })
                }
            })
        }
    }
    samsung.init();
    
})