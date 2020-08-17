$(function(){
    //渲染数据
    var car={
        init:function(){
            this.getEle();
            this.bindEvent();
        },
        getEle:function(){
            this.allNum=$('.allNum');
           this.price=$('.price2');
           this.all=$('.all');
           this.choose=$('.choose');
           this.pic=$('.picImg');
           this.title=$('.title');
           this.jian=$('.jian');
           this.text=$('.text');
           this.plus=$('.plus');
           this.count=$('.count');
           this.remove=$('.remove');
           this.delete=$('.delete');
           this.yiNum=$('.yiNum');
           this.totalPrice=$('.totalPrice');

        },
        bindEvent:function(){
            if(localStorage.getItem('carList')){
                
                var goods=JSON.parse(localStorage.getItem('carList'));
                var allNum=goods.length;
                $.ajax({
                    url:'../data/samsung.json',
                    type:'get',
                    dataType:'json',
                    success:function(json){
                         $(json).each(function(index,item){
                             $(goods).each(function(i,t){
                                 if(t.id===item.id){
                                  
                                //      var newLi=`<li>
                                //      <input type="checkbox" name="" id="" class="ch"> 
                                //      <img src="${item.imgurl}" alt="">
                                //      <p class="title">${item.title}</p>
                                //      <span class="price">${item.price}</span>
                                //      <div class="num">
                                //          <input class="jian" type="button" value="-">
                                //          <input type="text" disabled="disabled" class="numV" value="${t.num}">
                                //          <input type="button" value="+" class="plus">
                                //      </div>
                                //      <span class="count">￥${item.price.slice(1)*t.num}</span>
                                //      <span class="remove" code="${item.code}">删除</span>
                                //  </li>`



                                //加载数据
                                    var newLi=`
                                    <li>
                                            <input type="checkbox" name="" class="choose" id=""> 
                                            <div class="pic">
                                                <img class="picImg" src="${item.src}" alt="">
                                            </div>
                                            
                                            <p class="title">${item.tit}</p>
                                            <p class="detail">
                                                网络类型：SA/NSA双模(5G)<br/>
                                                机身颜色：7号色<br/>
                                                套餐类型：官方标配<br/>
                                                存储容量：8+128GB<br/>
                                            </p>
                                            <span class="price">${item.price}</span>
                                            <div class="num">
                                                <input class="jian" type="button" value="-">
                                                <input type="text" class="numV" value="${t.num}">
                                                <input type="button" value="+" class="plus">
                                            </div>
                                            <span class="count">￥${item.price*t.num}.00</span>
                                            <span class="remove" code="${item.id}">删除</span>
                                        </li>
                                    `

                                 $('.list').append(newLi);
                                 var flag=true;
                                $('.list .choose').each(function(index,item){
                                    if(!item.checked){
                                        flag=false
                                    }
                                });
                                if(flag){
                                    $('.all')[0].checked=true;
                                    $('.all2')[0].checked=true;
                                }else{
                                    $('.all')[0].checked=false;
                                    $('.all2')[0].checked=false;
                                }
                             }
                                 
                             })
                            
                         })
                    }
                });

                //单个删除功能

                $('.list').on('click','.remove',function(){
                    allNum--;
                    var str=$(this).attr('code');
                    $(goods).each(function(index,item){
                        if(item.id===Number(str)){
                            
                            goods.splice(item.index,1);
                            return;
                        }
                    });
                    console.log(goods);
                    localStorage.setItem('carList',JSON.stringify(goods));
                        let carNum=[];
                        
                        if(localStorage.getItem('carNum')){
                            carNum=JSON.parse(localStorage.getItem('carNum'));
                        }
                        
                        $(carNum).each(function(index,item){
                            if(item.id===Number(str)){
                                carNum.splice(item.index,1);
                                return;
                            }
                        });

                       
                        localStorage.setItem('carNum',JSON.stringify(carNum));
                        
                        $('.carNum').text(carNum.length);
                    $(this).parent().remove();
                    var flag=true;
                    var total=0;

                    $('.list .choose').each(function(index,item){
                        if(!item.checked){
                            flag=false;
                        }else{
                            total+=Number($(this).siblings('.count')[0].innerText.slice(1));
                        }
                    });

                    $('.totalPrice').text(total);
                    $('.price2').text(total);
                    if(flag){
                        $('.all')[0].checked=true;
                        $('.all2')[0].checked=true;
                        if(!$('.list .choose')[0]){
                            $('.all')[0].checked=false;
                            $('.all2')[0].checked=false;
                        }
                    }else{
                        $('.all')[0].checked=false;
                        $('.all2')[0].checked=false;
                    }
                    // if(!$('.list .ch')){
                    //     $('.all')[0].checked=false;
                    // }
                    if(goods.length===0){
                        // $('.all')[0].checked=false;
                        localStorage.removeItem('carList');
                        var newL=`<li style="text-align:center;line-height:80px;">购物车是空的！</li>`
                        $('.list').append(newL);
                    }
                    location.reload();
                });



                //全选按钮1

                $('.tit').on('click','.all',function(){
                    console.log(123);

                    $('.list .choose').each(function(index,item){
                        item.checked=$('.all')[0].checked;
                        
                    });
                    $('.all2')[0].checked=$(this)[0].checked;
                    var total=0;
                    $('.list .choose').each(function(index,item){
                        if(!item.checked){
                            flag=false;
                            $('.yiNum').text('0');
                        }else{
                            $('.yiNum').text(allNum);
                            total+=Number($(this).siblings('.count')[0].innerText.slice(1));
                        }
                    });
                    $('.totalPrice').text('￥'+total+'.00');
                    $('.price2').text(total+'.00');

                })


                //全选按钮2
                $('.titB').on('click','.all2',function(){
                    console.log(123);
                    $('.list .choose').each(function(index,item){
                        item.checked=$('.all2')[0].checked;
                       
                    });
                    
                    console.log($('.all2')[0].checked);
                    $('.all')[0].checked=$('.all2')[0].checked;
                    var total=0;
                    $('.list .choose').each(function(index,item){
                        if(!item.checked){
                            flag=false;
                            $('.yiNum').text('0');
                        }else{
                            $('.yiNum').text(allNum);
                            total+=Number($(this).siblings('.count')[0].innerText.slice(1));
                        }
                    });
                    $('.totalPrice').text('￥'+total+'.00');
                    $('.price2').text(total+'.00');

                })

                //选中删除功能
                $('.titB').on('click','.delete',function(){
                    console.log(123);
                    $('.list .choose').each(function(index,item){
                        if(!item.checked){
                            flag=false;
                        }else{
                            allNum--;

                            var str=$(this).siblings('.remove').attr('code');

                            $(goods).each(function(index,item){
                                if(item.id===Number(str)){
                                    
                                    goods.splice(item.index,1);
                                    return;
                                }
                            });
                            console.log(goods);
                            localStorage.setItem('carList',JSON.stringify(goods));
                                let carNum=[];
                                
                                if(localStorage.getItem('carNum')){
                                    carNum=JSON.parse(localStorage.getItem('carNum'));
                                }
                                
                                $(carNum).each(function(index,item){
                                    if(item.id===Number(str)){
                                        carNum.splice(item.index,1);
                                        return;
                                    }
                                });
        
                               
                                localStorage.setItem('carNum',JSON.stringify(carNum));
                                
                                $('.carNum').text(carNum.length);
                            $(this).parent().remove();
                            var flag=true;
                            var total=0;
        
                            $('.list .choose').each(function(index,item){
                                if(!item.checked){
                                    flag=false;
                                }else{
                                    total+=Number($(this).siblings('.count')[0].innerText.slice(1));
                                }
                            });
        
                            $('.totalPrice').text(total);
                            $('.price2').text(total);
                            if(flag){
                                $('.all')[0].checked=true;
                                $('.all2')[0].checked=true;
                                if(!$('.list .choose')[0]){
                                    $('.all')[0].checked=false;
                                    $('.all2')[0].checked=false;
                                }
                            }else{
                                $('.all')[0].checked=false;
                                $('.all2')[0].checked=false;
                            }
                            // if(!$('.list .ch')){
                            //     $('.all')[0].checked=false;
                            // }
                            if(goods.length===0){
                                // $('.all')[0].checked=false;
                                localStorage.removeItem('carList');
                                var newL=`<li style="text-align:center;line-height:80px;">购物车是空的！</li>`
                                $('.list').append(newL);
                            }
                            location.reload();
                        }
                    });
                })


                //单选按钮
                $('.list').on('click','.choose',function(){
                    var flag=true;
                    var total=0;
                    var spe=0
                    $('.list .choose').each(function(index,item){
                        if(!item.checked){
                            flag=false;
                        }else{
                            spe++;
                            total+=Number($(this).siblings('.count')[0].innerText.slice(1));
                        }
                    });
                    $('.totalPrice').text('￥'+total+'.00');
                    $('.price2').text(total+'.00');

                    if(flag){
                        $('.all')[0].checked=true;
                        $('.all2')[0].checked=true;
                    }else{
                        $('.all')[0].checked=false;
                        $('.all2')[0].checked=false;
                    }
                    $('.yiNum').text(spe);
                })

                //减按钮
                $('.list').on('click','.jian',function(){
                    var num=Number($(this).siblings('.numV')[0].value);
                     num--;
                     if(num<1){
                         num=1;
                     }
                     $(this).siblings('.numV')[0].value=num;
                     $(this).parent().siblings('.count').text('￥'+num*$(this).parent().siblings('.price')[0].innerText+'.00');
                     if($(this).parent().siblings('.choose')[0].checked){
                        var total=0;
                        $('.list .choose').each(function(index,item){
                            if(!item.checked){
                                flag=false;
                            }else{
                                total+=Number($(this).siblings('.count')[0].innerText.slice(1));
                            }
                        });
                        $('.totalPrice').text('￥'+total+'.00');
                        $('.price2').text(total+'.00');

                     }
                 });

                 //加按钮
                 $('.list').on('click','.plus',function(){
                    var num=Number($(this).siblings('.numV')[0].value);
                     num++;
                     if(num>99){
                         num=99;
                     }
                     $(this).siblings('.numV')[0].value=num;
                     $(this).parent().siblings('.count').text('￥'+num*$(this).parent().siblings('.price')[0].innerText+'.00');
                     if($(this).parent().siblings('.choose')[0].checked){
                        var total=0;
                        $('.list .choose').each(function(index,item){
                            if(!item.checked){
                                flag=false;
                            }else{
                                total+=Number($(this).siblings('.count')[0].innerText.slice(1));
                            }
                        });
                        $('.totalPrice').text('￥'+total+'.00');
                        $('.price2').text(total+'.00');
                     }     
                })

                $('.allNum').text(allNum);
            }else{
                var newL=`<li style="text-align:center;line-height:80px;">购物车是空的！</li>`
                $('.list').append(newL);
            }
            $('.tit').on('click','.all',function(){               
                $('.all2')[0].checked=$(this)[0].checked;
            })
            $('.tit').on('click','.all2',function(){               
                $('.all')[0].checked=$(this)[0].checked;
            })
        }
    }
    car.init();
})