var mv={
	stat0:'',
	sort_key:16,
	pn:0,
	init:function(){
		this.getdata();
		this.getspan();
		this.getmovie();
		this.getpage();
	},
	getspan:function(){
		var _this=this;
		$('.item').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.num').eq(0).addClass('active')
				.siblings().removeClass('active');
			var t=$(this).html();
			if(t=='全部'){
				_this.stat0=''	
			}else{
				_this.stat0=t;
			}

			_this.pn = 0;
			_this.getdata();		
		})
	},
	getpage:function(){
		var _this=this;
		$('.num').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			_this.pn = ($(this).html()-1)*8;
			_this.getdata();		
		})
	},
	getmovie:function(){
		var _this=this;
		$('.movie').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.num').eq(0).addClass('active')
				.siblings().removeClass('active');
			_this.sort_key = $(this).attr('sort_key');
			_this.pn = 0;
			_this.getdata();		
		})
	},
	getdata:function(){
		var _this=this;
		$.ajax({
			type:'get',
			url:'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?resource_id=28286&query=电影&sort_type=1&rn=8',
			data:{
				stat0:_this.stat0,
				sort_key:_this.sort_key,
				pn:_this.pn
			},
			dataType:'jsonp',
			jsonp: 'cb',
			success:function(data){
				_this.handledata(data);
				console.log(data);
				var ld = layer.load(2);
				setTimeout(function(){
					layer.close(ld);
					//layer.closeAll();
				},500);
			}
		})
	},
	handledata:function(r){
		var result=r.data[0].result;
		var con='';
		for(var i=0;i<result.length;i++){
			con+=`<div><img src=${result[i].kg_pic_url}>
					<p>${result[i].ename}</p>
					<p>${result[i].additional}</p>
				</div>`
		}
		$('.con').html(con);
	}
}
mv.init();