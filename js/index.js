$(function(){
	var tag = false;
    //通过jquery控制模态框弹出，点击登录，弹出登录模态框
    $('#loginButton').click(function(){
        $('#myModal').modal('show');
    });

    // 点击注册，弹出注册模态框，隐藏登录模态框
    $('#registerLink').click(function(){
    	$('#myModal').modal('hide');
        $('#myRegisterModal').modal('show');
    });

    // 从注册模态框点击登录，弹出登录模态框，隐藏注册模态框
    $('#jump-login').click(function(){
    	$('#myModal').modal('show');
        $('#myRegisterModal').modal('hide');
    });

    // 生成评论,并且独立评论计数器+1，互不干扰，利用事件代理保证动态生成的内容也能绑定事件，同时利用unbind方法保证一次只执行一次，否则会出现多次事件触发。
   $('div').unbind('click').on('click','.submitReview',function(){
   		$('.submitReview').unbind('click').bind('click',function(){
        	var content = $(this).siblings().val();
 			if(content.length === 0){
 				alert('评论内容不能为空');
 			}else{
 				$(this).siblings().eq(1).eq(0).append(`<li>${content}</li>`);
        	    $(this).parent().siblings().children(2).children(1).children(1).eq(1).text((Number)($(this).parent().siblings().children(2).children(1).children(1).eq(1).text())+1);
 			} 	
    	});
   });
   

    // 如果未点赞，单击一下为点赞，再点击一次取消点赞，各信息的点赞数互不干扰.
    $('div').on('click','.good',function(){
    	if((Number)($(this).children(0).text())===0){
    		$(this).children(0).text((Number)($(this).children(0).text())+1) ; 
    	}else{
    		$(this).children(0).text((Number)($(this).children(0).text())-1) ;
    	}
    });

    // 显示隐藏评论
    $('div').on('click','.review',function(){
    	$(this).parent(0).parent(0).siblings(0).toggleClass('reviewAreaDisplay');
    
    });
   
   // 点击发布，进行发布操作
   $('#publishInfo').click(function(){
   		$('#postModal').modal('show');
   })

   // 确认发布

   $('#postOK').click(function(){
   		var index = $('.getPhoto').val().lastIndexOf('\\');
   		var realImg = `images/${$('.getPhoto').val().slice(index+1)}`;
   		var infoContent = $('.textareaContent').val();
   		console.log($(this).parent().parent().parent().parent().siblings().eq(4).children().children().children(0));
   		
        $('#ulFather').prepend(
    		`<li>
				<div>
					<img src=${realImg}>
				
					<span>${infoContent}</span>
					<div class="li-a">
						<a href="#" class="iconfont good">&#xe629; <span class="goodNumber">0</span></a>
						<a href="#" class="iconfont review">&#xe640; <span class="reviewNumber">0</span></a>
						<a href="#" class="iconfont">&#xe60c;</a>
						<a href="#" class="iconfont">&#xe626;</a>
					</div>
				</div>
				<div class="reviewArea controlReview">
					<input class="reviewContent" type="text" name="" placeholder="成熟的小建议：友善发言，言之有物">
					<button class="submitReview">评论</button>
					<ul>
						
					</ul>
				</div>
				
			</li>`
        );
   });

});		
