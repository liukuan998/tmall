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
            var _this=this;
            $.ajax({

                url:'./data/samsung.json',
                type:'get',
                dataType:'json',
                success:function(json){
                    
                    $(json).each(function(index,item){
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
                            三星官方旗舰店 等更多商家&gt;
                            
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
                       
                    })
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