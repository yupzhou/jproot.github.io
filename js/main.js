// 导入样式
$('.input-group').on('focus', '.form-control', function () {
  $(this).closest('.input-group, .form-group').addClass('focus');
}).on('blur', '.form-control', function () {
  $(this).closest('.input-group, .form-group').removeClass('focus');
});
$("select").select2({dropdownCssClass: 'dropdown-inverse'});
var hasbind_other = false;
var hasbind_help = false;
var hasbind_dia = false;
var search_mode = 'rootmode'; //搜索方式
//首页下拉菜单
$('#searchmode').change(function(event) {
  search_mode = this.value;
});

//导航栏
$(".searchmethod").click(function() {
  if (($(this).attr('data-mod') == search_mode) && ($('.dicindex').css("visibility") == "visible")) {
    return;
  }
  $('.searchmethod').removeClass('active');
  // console.log(search_mode);
  $(this).addClass('active');
  if ($(this).attr('data-mod') == "rootmode") {
    searchlock = false;
    search_mode = 'rootmode';
    $('.articlebox').show();
    $('.indexbox').show();
    $('.dicindex').css("visibility","visible");
    $('.otherbox').hide();
    $('.helpbox').hide();
	$('.diabox').hide();
    writedata(rootdata);
    $('.searchlist').empty();
    $('.searchinput2').attr('placeholder','输入假名以查询');
    $('.listsearchbox').show();
    $('.articlebox').scrollTop(0);
    $('.indexbox').scrollTop(0);
  }else if ($(this).attr('data-mod') == "affixmode") {
    searchlock = false;
    search_mode = $(this).attr('data-mod');
    $('.articlebox').show();
    $('.searchinput2').attr('placeholder','输入假名以查询');
    $('.indexbox').show();
    $('.dicindex').css("visibility","visible");
    writedata(affixdata);
    $('.searchlist').empty();
    $('.searchinput')[0].value = '';
    $('.listsearchbox').show();
    $('.otherbox').hide();
    $('.helpbox').hide();
	$('.diabox').hide();
    $('.articlebox').scrollTop(0);
    $('.indexbox').scrollTop(0);
  }else if ($(this).attr('data-mod') == "wordmode") {
    searchlock = false;
    search_mode = $(this).attr('data-mod');
    $('.articlebox').show();
    $('.indexbox').show();
    $('.dicindex').css("visibility","visible");
    writedata(worddata);
	$('.searchinput2').attr('placeholder','输入汉字以查询');
    $('.searchlist').empty();
    $('.searchinput2')[0].value = '';
    $('.listsearchbox').show();
    $('.otherbox').hide();
    $('.helpbox').hide();
	$('.diabox').hide();
    $('.articlebox').scrollTop(0);
    $('.indexbox').scrollTop(0);
  }else if ($(this).attr('data-mod') == "othermode") {  //附錄
    searchlock = true;
    $('.articlebox').hide();
    $('.otherbox').show();
    $('.helpbox').hide();
    $('.indexbox').hide();
	$('.diabox').hide();
    $('.listsearchbox').hide();
    $('.dicindex').css("visibility","hidden");
    if (!hasbind_other) {
      bindarrow_other();
      hasbind_other = true;
    }
  
  }else if ($(this).attr('data-mod') == "diamode"){  //方言·音调
    searchlock = true;
    $('.articlebox').hide();
    $('.otherbox').hide();
    $('.helpbox').hide();
    $('.indexbox').hide();
	$('.diabox').show();
    $('.listsearchbox').hide();
    $('.dicindex').css("visibility","hidden");
    if (!hasbind_dia) {
      bindarrow_dia();
      hasbind_dia = true;
    }
	}else if ($(this).attr('data-mod') == "helpmode"){  //關於
	  searchlock = true;
	  $('.articlebox').hide();
	  $('.otherbox').hide();
	  $('.helpbox').show();
	  $('.indexbox').hide();
		$('.diabox').hide();
	  $('.listsearchbox').hide();
	  $('.dicindex').css("visibility","hidden");
	  if (!hasbind_help) {
	    bindarrow_help();
	    hasbind_help = true;
	  }
  }
  
})
//----------------------------------------------------------------------------------//
var indexposition = 'node1';   //目录高亮位置
// 目录点击跳转
$('.indexlink').click(function() {
  if ($(this).hasClass('indexlink-active')) {
    return;
  }else {
    $('.indexlink').removeClass('indexlink-active');
    $(this).addClass('indexlink-active');
    var jumpnode = $(this).attr('data-node');
    indexposition = jumpnode;
    var jumpheight = $('#'+jumpnode).offset().top-$("#node1").offset().top;
    // console.log(jumpheight);
    $(".articlebox").animate({scrollTop:jumpheight},350)
  }
})
// 目录自动更新位置
$('.articlebox').scroll(function() {
  var scrolltop = [0];
  // 赋值
  for (var i = 1; i < 48 ; i++) {//總數+1
    scrolltop[i] = $("#node" + i).offset().top;
  }
  // 循环检查
  for (var j = 47; j > 0; j--) {//總數
    if (scrolltop[j] <= 192) {
      // console.log('node' + j);
      // console.log('$(".articlebox").scrollTop():' + $('.articlebox').scrollTop());
      // console.log('');
      indexposition = 'node' + j;
      updateindex(j);
      return;
    }
  }
})
// 更新目录位置（view）
function updateindex(nodenum) {
  $('.indexlink').removeClass('indexlink-active');
  var nodestr = 'node' + nodenum;
  $("[data-node = "+ nodestr +"]").addClass('indexlink-active');
  var jumpheight = $("[data-node = "+ nodestr +"]").offset().top-$("[data-node='node1']").offset().top;
  $('.indexbox').scrollTop(jumpheight);
}
var indexinsopen = false;   //目录是否展开
// 目录收起展开
$('#indexbtn').click(function() {
  if (indexinsopen) {
    $('.indexbox').css("visibility","hidden");
    $(this).html('目录　开');
    $('.dicindex').addClass('dicindex-close');
    indexinsopen = false;
  }else {
    $('.indexbox').css("visibility","visible");
    $(this).html('目录　关');
    $('.dicindex').removeClass('dicindex-close');
    indexinsopen = true;
  }
})

//注册前两页展开箭头
function bindarrow() {
  $('.articlebox').children().children().children().children('.arrow').click(function() {
    console.log($(this).hasClass('arrow-open'));
    if ($(this).hasClass('arrow-open')) {
      $(this).removeClass('arrow-open');
      $(this).parent().next().hide();
    }else {
      $(this).addClass('arrow-open');
      $(this).parent().next().show();
    }
  })
}
//注册后两页箭头
function bindarrow_other() {
  $('.otherbox').children().children().children().children('.arrow').click(function() {
    console.log($(this).hasClass('arrow-open'));
    if ($(this).hasClass('arrow-open')) {
      $(this).removeClass('arrow-open');
      $(this).parent().next().hide();
    }else {
      $(this).addClass('arrow-open');
      $(this).parent().next().show();
    }
  })
}
function bindarrow_help() {
  $('.helpbox').children().children().children().children('.arrow').click(function() {
    console.log($(this).hasClass('arrow-open'));
    if ($(this).hasClass('arrow-open')) {
      $(this).removeClass('arrow-open');
      $(this).parent().next().hide();
    }else {
      $(this).addClass('arrow-open');
      $(this).parent().next().show();
    }
  })
}
function bindarrow_dia() {
  $('.diabox').children().children().children().children('.arrow').click(function() {
    console.log($(this).hasClass('arrow-open'));
    if ($(this).hasClass('arrow-open')) {
      $(this).removeClass('arrow-open');
      $(this).parent().next().hide();
    }else {
      $(this).addClass('arrow-open');
      $(this).parent().next().show();
    }
  })
}
// 点击rootbox任意位置展开（选中时易误触）
// $('.rootbox').click(function() {
//   if ($(this).children().children('.arrow').hasClass('arrow-open')) {
//     $(this).children().children('.arrow').removeClass('arrow-open');
//     $(this).children('.rootcontent').hide();
//   }else {
//     $(this).children().children('.arrow').addClass('arrow-open');
//     $(this).children('.rootcontent').show();
//   }
// })

/* json格式的字典库，每个数据为一个内容
title标题
class分类（1-xx）为词根头文字（！注意！请严格按照classwords顺序存放数据，否则后添加数据可能读取不到）
summary摘要
content正文*/
// 处理字典数据

/*
定义处理字符串（存放当前处理headclass）
新写入处理字符串，空出一个</div>结尾（循环外）
读取nowdatanum位数据
若nowclass与当前class相符
拼接当前rootbox：
        <div class="rootbox">
            <div class="roottitle">ア/得<span class="rootsummary">blablabla</span><span class="arrow"></span></div>
            <div class="rootcontent" style="display:none;">blablablablablab<br/>lablablablablablabla</div>
        </div>
到该类字符串
否则
   1.将当前headclass用</div>封装，add到articlebox
   2.新写入
     <div class="headclass" id="node10">
         <h4 class="headtitle">• コ 類</h4>
         <div class="headline"></div>
      到处理字符串，空出一个</div>结尾
    3.更新nowclass
注意第一次新写入在循环外
*/
//分类标题数组
var classwords = [
                  'ア　a','イ　i','ウ　u','エ　e','オ　o',
                  'カ　ka','キ　ki','ク　ku','ケ　ke','コ　ko',
                  'サ　sa','シ　si','ス　su','セ　se','ソ　so',
                  'タ　ta','チ　ti','ツ　tu','テ　te','ト　to',
                  'ナ　na','ニ　ni','ヌ　nu','ネ　ne','ノ　no',
                  'ハ　pa','ヒ　pi','フ　pu','ヘ　pe','ホ　po',
                  'マ　ma','ミ　mi','ム　mu','メ　me','モ　mo',
                  'ヤ　ja','ユ　ju','ヨ　jo',
                  'ラ　ra','リ　ri','ル　ru','レ　re','ロ　ro',
                  'ワ　wa','ヰ　wi','ヱ　we','ヲ　wo'
                 ]
//写入字典数据到页面
function writedata(dicdata) {
  $('.articlebox').empty();
  var nowclass = 1;   //当前类别，默认从ア類（class=1）开始读取
  var nowdatanum = 0; //当前数据序号
  var nodestr = ""   //处理用字符串
  //为第一组数据写入nodestr(注意使用单引号)
  nodestr = '<div class="headclass" id="node1"><h4 class="headtitle">▶ ア　a</h4><div class="headline"></div>';
  for (var i = 0; i <= dicdata.length; i++) {
    // console.log(dicdata[i]);
    var nowdata = dicdata[i];
    if (i == dicdata.length) {     //若循环到数据结尾
      nodestr = nodestr + '</div>';
      $('.articlebox').append(nodestr);
    }else if (nowclass == nowdata.class) {   //若nowclass与当前class相符
       nodestr = nodestr + '<div class="rootbox" data-ser=" ' + i + ' "><div class="roottitle">' + nowdata.title  + '<span class="rootsummary">' + nowdata.summary + '</span><span class="arrow"></span></div><div class="rootcontent" style="display:none;">' + nowdata.content + '</div></div>';
    }else{   //若nowclass与当前class不相同
       nodestr = nodestr + '</div>';
       $('.articlebox').append(nodestr);
       nodestr = '<div class="headclass" id="node' + nowdata.class + '"><h4 class="headtitle">▶ ' + classwords[nowdata.class-1] + ' </h4><div class="headline"></div>';
       nodestr = nodestr + '<div class="rootbox" data-ser=" ' + i + ' "><div class="roottitle">' + nowdata.title  + '<span class="rootsummary">' + nowdata.summary + '</span><span class="arrow"></span></div><div class="rootcontent" style="display:none;">' + nowdata.content + '</div></div>';
       nowclass = nowdata.class;
    }
  }
  bindarrow();
}
//默认调用词根字典
writedata(rootdata);
//--------------------------------------------------------------//
var searchlock = false;   //搜索锁定，防止短时间重复搜索
// 注册首页搜索
$('#saveBtn').click(function() {
  if (searchlock) {
    return;
  }
 searchlock = true;
  var searchword = $(".searchinput")[0].value;
  window.localStorage.setItem("searchword",searchword);
  window.localStorage.setItem("searchmode",search_mode);
  window.location.href = "./dict.html";
  
})
//注册首页回车
$("#search-query-3").keydown(function (e) {
    if (e.keyCode == 13) {
      if (searchlock) {
        return;
      }
      searchlock = true;
      var searchword = $(".searchinput")[0].value;
      window.localStorage.setItem("searchword",searchword);
      window.localStorage.setItem("searchmode",search_mode);
      window.location.href = "./dict.html";
    }
});

// 注册字典页搜索
$('#searchbtn').click(function() {
  if (searchlock) {
    return;
  }
  if (search_mode == "rootmode") {
    searchup(rootdata);
  }else if(search_mode == "affixmode"){
	searchup(affixdata); 
  }else {
    searchup(worddata);
  }
})
// 注册字典页回车
$(".searchinput").keydown(function (e) {
    if (e.keyCode == 13) {
      if (searchlock) {
        return;
      }
      if (search_mode == "rootmode") {
        searchup(rootdata);
      }else if(search_mode == "affixmode"){
	  searchup(affixdata); 
    }else {
        searchup(worddata);
      }
    }
});
// 搜索函数
function searchup(dicdata) {
  searchlock = true;
  var searchword = $(".searchinput")[0].value;
  if (searchword == '') {
    searchlock = false;
    return;
  }
  searchword = hiraToKata(searchword);
  if (search_mode == 'rootmode') {    //按訓讀詞根搜索
    for (var i = 0; i < dicdata.length; i++) {
      var rootword = dicdata[i].title.split("　")[0].split(" ")[0];
	  //搜索时删除全角或半角空格
      if (rootword == searchword) {
        var jumpheight = $($('.rootbox')[i]).offset().top-$("#node1").offset().top;
        $(".articlebox").animate({scrollTop:jumpheight},350)
        setTimeout(function() {
          searchlock = false;
        },370)
        return;
      }
    }
    searchlock = false;
  }else if (search_mode == 'affixmode'){ //按訓讀詞綴搜索
	  for (var i = 0; i < dicdata.length; i++) {
      var rootword = dicdata[i].title.split("　")[0].split(" ")[0];
      console.log('rootword:' + rootword);
      if (rootword == searchword) {
        console.log(rootword);
        var jumpheight = $($('.rootbox')[i]).offset().top-$("#node1").offset().top;
        $(".articlebox").animate({scrollTop:jumpheight},350)
        setTimeout(function() {
          searchlock = false;
        },370)
        return;
      }
    }
  }else {                            //按音讀搜索
    for (var i = 0; i < dicdata.length; i++) {
      var rootword = dicdata[i].title.split("　")[0].split(" ")[0];
      console.log('rootword:' + rootword);
      if (rootword == searchword) {
        console.log(rootword);
        var jumpheight = $($('.rootbox')[i]).offset().top-$("#node1").offset().top;
        $(".articlebox").animate({scrollTop:jumpheight},350)
        setTimeout(function() {
          searchlock = false;
        },370)
        return;
      }
    }
    searchlock = false;
  }
}
//---------------------------------------------------------------//
// 跳转检查
var jumpword = window.localStorage.getItem("searchword");
if (jumpword !== null && jumpword != '') {
  $(".searchinput")[0].value = window.localStorage.getItem("searchword");
  window.localStorage.setItem("searchword",'');
  search_mode = window.localStorage.getItem("searchmode");
  window.localStorage.setItem("searchword",'');
  if (search_mode == 'rootmode') {  //按词根搜索
    searchup(rootdata);
  }else if(search_mode == 'affixmode'){ //按词綴搜索
	console.log('ss');
	search_mode = "affixmode";
	$('.searchmethod').removeClass('active');
	$("[data-mod='affixmode']").addClass('active');
	writedata(affixdata);
	searchup(affixdata);
	searchup(affixdata);
  }else{   //按单语搜索
    console.log('ss');
    search_mode = "wordmode";
    $('.searchmethod').removeClass('active');
    $("[data-mod='wordmode']").addClass('active');
    writedata(worddata);
    searchup(worddata);
  }
}


// 生成返回顶部
function bindtotop() {
  $('.waifu').click(function() {
    $(".articlebox").animate({scrollTop:0},350);
    $(".otherbox").animate({scrollTop:0},350);
    $(".diabox").animate({scrollTop:0},350);
    $(".helpbox").animate({scrollTop:0},350);
  }
)
}
bindtotop();
//到达顶部

// 生成返回顶部2
function bindtotop2() {
  $('.backtotop').click(function() {
    $(".articlebox").animate({scrollTop:0},350);
    $(".otherbox").animate({scrollTop:0},350);
    $(".diabox").animate({scrollTop:0},350);
    $(".helpbox").animate({scrollTop:0},350);
  }
)
}
bindtotop2();
  
//首頁更換圖片
function randindexbg() {
  var ind = Math.floor(Math.random()*8);
  if(document.body.clientWidth>=1024){
	  if (ind <= 1) {
    $('.box').css('background-image','url("./src/1.jpg")');
  }else if (ind <= 2)  {
    $('.box').css('background-image','url("./src/2.jpg")');
  }else if (ind <= 3)  {
    $('.box').css('background-image','url("./src/3.jpg")');
  }else if (ind <= 4)  {
    $('.box').css('background-image','url("./src/4.jpg")');
  }else if (ind <= 5)  {
    $('.box').css('background-image','url("./src/5.jpg")');
  }else if (ind <= 6)  {
    $('.box').css('background-image','url("./src/6.jpg")');
  }else if (ind <= 7){
    $('.box').css('background-image','url("./src/7.jpg")');
  }}else{
	if (ind <= 1) {
	  $('.box').css('background-image','url("./src/1.png")');
	}else if (ind <= 2)  {
	  $('.box').css('background-image','url("./src/2.png")');
	}else if (ind <= 3)  {
	  $('.box').css('background-image','url("./src/3.png")');
	}else if (ind <= 4)  {
	  $('.box').css('background-image','url("./src/4.png")');
	}else if (ind <= 5)  {
	  $('.box').css('background-image','url("./src/5.png")');
	}else if (ind <= 6)  {
	  $('.box').css('background-image','url("./src/6.png")');
	}else if (ind <= 7){
	  $('.box').css('background-image','url("./src/7.png")');
	}  
  }
  
}
randindexbg();

// 注册右方搜索
$('#searchbtn2').click(function() {
  if (searchlock) {
    return;
  }
  if (search_mode == "rootmode") {
    listsearch(rootdata);
  }else if(search_mode == "affixmode"){
	 listsearch(affixdata); 
  }else {
    listsearch(worddata);
  }
})
// 注册右方回车
$(".searchinput2").keydown(function (e) {
  if (e.keyCode == 13) {
    if (searchlock) {
      return;
    }
    if (search_mode == "rootmode") {
      listsearch(rootdata);
    }else if(search_mode == "affixmode"){
	 listsearch(affixdata); 
  }else {
      listsearch(worddata);
    }
  }
});
//單語、單漢字搜索
function listsearch(dicdata) {
  searchlock = true;
  var searchword = $(".searchinput2")[0].value;
  if (searchword == '') {
    searchlock = false;
    return;
  }
  searchword = hiraToKata(searchword);
  $('.searchlist').empty();
  if (search_mode == 'rootmode') {    //按訓讀詞根搜索
    var searchwordarr = $('.heresearch');
    for (var i = 0; i < searchwordarr.length; i++) {
      var search_str = searchwordarr[i].innerHTML;
      // 搜索并添加到列表
      if (search_str.match(searchword)) {
        var getnum = parseInt($(searchwordarr[i].parentNode.parentNode).attr("data-ser"));
        var liststr = '<a class="listlink login-link" data-list="' + getnum + '">' + dicdata[getnum].title + '　' + dicdata[getnum].summary + '</a>';
        $('.searchlist').append(liststr);
      }
    }
    //注册列表点击跳转
    $('.listlink').click(function() {
      var jumpnode = parseInt($(this).attr('data-list'));
      console.log($('.rootbox')[jumpnode]);
      var jumpheight = $($('.rootbox')[jumpnode]).offset().top-$("#node1").offset().top;
      $(".articlebox").animate({scrollTop:jumpheight},350)
      setTimeout(function() {
        if (!$($('.rootbox')[jumpnode]).children().children('.arrow').hasClass('arrow-open')) {
          $($('.rootbox')[jumpnode]).children().children('.arrow').click()
        }
      },370)
    })
    searchlock = false;
  }else if(search_mode == 'affixmode'){
	      var searchwordarr = $('.heresearch');
    for (var i = 0; i < searchwordarr.length; i++) {
      var search_str = searchwordarr[i].innerHTML;
      // 搜索并添加到列表
      if (search_str.match(searchword)) {
        var getnum = parseInt($(searchwordarr[i].parentNode.parentNode).attr("data-ser"));
        var liststr = '<a class="listlink login-link" data-list="' + getnum + '">' + dicdata[getnum].title + '　' + dicdata[getnum].summary + '</a>';
        $('.searchlist').append(liststr);
      }
    }
    //注册列表点击跳转
    $('.listlink').click(function() {
      var jumpnode = parseInt($(this).attr('data-list'));
      console.log($('.rootbox')[jumpnode]);
      var jumpheight = $($('.rootbox')[jumpnode]).offset().top-$("#node1").offset().top;
      $(".articlebox").animate({scrollTop:jumpheight},350)
      setTimeout(function() {
        if (!$($('.rootbox')[jumpnode]).children().children('.arrow').hasClass('arrow-open')) {
          $($('.rootbox')[jumpnode]).children().children('.arrow').click()
        }
      },370)
    })
    searchlock = false;
  }else{                            //按音讀搜索
    var searchwordarr = $('.heresearch');
    for (var i = 0; i < searchwordarr.length; i++) {
      var search_str = searchwordarr[i].innerHTML;
      // 搜索并添加到列表
      if (search_str.match(searchword)) {
        var getnum = parseInt($(searchwordarr[i].parentNode.parentNode).attr("data-ser"));
        var liststr = '<a class="listlink login-link" data-list="' + getnum + '">' + dicdata[getnum].title + '　' + dicdata[getnum].summary + '</a>';
        $('.searchlist').append(liststr);
      }
    }
    //注册列表点击跳转
    $('.listlink').click(function() {
      var jumpnode = parseInt($(this).attr('data-list'));
      console.log($('.rootbox')[jumpnode]);
      var jumpheight = $($('.rootbox')[jumpnode]).offset().top-$("#node1").offset().top;
      $(".articlebox").animate({scrollTop:jumpheight},350)
      setTimeout(function() {
        if (!$($('.rootbox')[jumpnode]).children().children('.arrow').hasClass('arrow-open')) {
          $($('.rootbox')[jumpnode]).children().children('.arrow').click()
        }
      },370)
    })
    searchlock = false;
  }
}

// 平假转片假
function hiraToKata(str) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0)  +  0x60;
        return String.fromCharCode(chr);
    });
}

//关闭搜索列表
$('.articlebox').click(function() {
    $('.searchlist').empty();
})