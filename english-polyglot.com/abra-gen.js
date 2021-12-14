//  var intro=['<span class="intro1">'+x+'Для начала работы, нажмите на стрелку внизу</span>'+dwodn,'<span class="intro1">'+x+'Переведите фразу. Нажмите стрелку снова, чтобы увидеть ответ</span>'+dwodn, '<span style="float:left;margin-top:2px;">&#9650;</span><br /><span class="intro1">'+x+'Чтобы прослушать фразу еще раз, кликните по ней самой</span>', '<span class="intro1" style="display:inline-block">'+x+'Таблицу глаголов можно открыть/закрыть здесь</span><span>'+riodn+'</span>', '<span class="intro1" style="text-align:center">'+x+'Здесь можно выбрать глагол</span><span style="position:absolute;left:50%">'+dwodn+'</span>', '<span>'+upodn+'</span><span class="intro1" style="margin-top:-3px;">'+x+'Другие настройки генератора фраз находятся здесь</span>', '<span style="position:absolute;left:50%">'+upodn+'</span><br /><span class="intro1" style="margin-top:-3px;">'+x+'А здесь Вы найдете остальные инструкции по работе с генератором фраз</span>'];

//var ggg='#'+params['id'] --> третий параметр в хвостике адресной строки

//---------------начало скроллинга

//	var to_top=document.getElementById('stt'),
//to_bottom=document.getElementById('m4'),
//		don_btn=document.getElementById('dbt'),
//		stop_scroll=0,
//		curentScrollTop,
//		position=document.documentElement.scrollTop || document.body.scrollTop;

//document.getElementById("m4").href="javascript:void(0)"

//to_top.innerHTML='';
//to_top.className="scroll-to-top fixed-hidden";
//		don_btn.className="donateButton fixed-hidden2";

//		window.addEventListener("scroll",function(){
//			curentScrollTop=document.documentElement.scrollTop || document.body.scrollTop
//		},false);

//		to_top.addEventListener("click",function(e){
//			e.stopPropagation();
//			(function scrollAnimate(){
//				if (curentScrollTop>0 && !stop_scroll) {
//					//scrollTo(0);
//					setTimeout(function(){
//						window.scrollBy(0,(-Math.abs(curentScrollTop)/20));
//						scrollAnimate();
//					},10);
//				}
//			})()
//		},false);

//		to_top.addEventListener("dblclick",function(e){
//			document.body.scrollTop=0;
//			document.documentElement.scrollTop=0;
//		},false);

//		to_bottom.addEventListener("click",function(e){
//			e.stopPropagation();
//			scrollTo(document.getElementById('top_scroll').offsetHeight)
//		},false);

// stop animation on wheel scroll down
//		window.addEventListener("wheel", function(e) {
//		  if (e.deltaY > 0) {
//			  stop_scroll=1;
//			  setTimeout(function(){stop_scroll=0},200)
//		  }
//		},false);
//
//function scrollTo(e){var h=document.documentElement;if(h.scrollTop===0){var t=h.scrollTop;++h.scrollTop;h=t+1===h.scrollTop--?h:document.body;}scrollToX(h,h.scrollTop,e,0)}function scrollToX(e,a,b,t){if(t<0||t>1)return;k=t-1;e.scrollTop=a-(a-b)*(k*k*k+1);t+=0.001*20;setTimeout(function(){scrollToX(e,a,b,t)},20)}

//var JD = {};
//
//JD.debounce = function( wait, func, immediate) {
//	var timeout;
//	return function() {
//		var context = this,
//			args = arguments;
//		var later = function() {
//			timeout = null;
//			if ( !immediate ) {
//				func.apply(context, args);
//			}
//		};
//		var callNow = immediate && !timeout;
//		clearTimeout(timeout);
//		timeout = setTimeout(later, wait || 200);
//		if ( callNow ) {
//			func.apply(context, args);
//		}
//	};
//};

//JD.lastName=function(){
//
//	if(curentScrollTop>1200){
//		to_top.className="scroll-to-top rotate";
//	}else{
//		to_top.className="scroll-to-top fixed-hidden";
//	}
//
//	var scrollHeight=document.documentElement.scrollHeight || document.body.scrollHeight;
//
//	if ((curentScrollTop+window.innerHeight+300)>=scrollHeight){
//		don_btn.className="donateButton left50";
//	}else{
//		don_btn.className="donateButton fixed-hidden2";
//	}
//
//	if(curentScrollTop>position){
//		stop_scroll=1;
//		setTimeout(function(){stop_scroll=0},200)
//	}
//	position=curentScrollTop;
//
//}
//
//
//	window.addEventListener("scroll",JD.debounce(250,JD.lastName));

var newwin,
  last_url,
  last_width,
  last_height,
  win_test = (win_img = win_url = 0);
window.name = "parent";

function popup(
  url,
  width,
  height,
  windowtitle,
  textdescription,
  pronunciation
) {
  function bindReady(handler) {
    //	console.log(' вход в binReady:'+url)
    //	console.log(getextension(url))
    //	console.log(url.match(/http/i))
    if (url.match(/http/i)) handler();
    var called = false;

    function ready() {
      //console.log('вход в ready')
      if (called) return;
      called = true;
      handler();
    }

    //	if ( document.addEventListener ) { // native event
    //		newwin.addEventListener( "DOMContentLoaded", ready, false )
    //	} //стоявший на этом месте else вызывал сбой в IE
    if (document.attachEvent) {
      // IE

      try {
        var isFrame = newwin.frameElement != null;
      } catch (e) {}

      // IE, the document is not inside a frame
      if (document.documentElement.doScroll && !isFrame) {
        function tryScroll() {
          if (called) return;
          try {
            document.documentElement.doScroll("left");
            ready();
          } catch (e) {
            setTimeout(tryScroll, 10);
          }
        }
        tryScroll();
      }

      // IE, the document is inside a frame
      newwin.attachEvent("onreadystatechange", function () {
        if (newwin.readyState === "complete") {
          ready();
        }
      });
    } else {
      newwin.addEventListener("DOMContentLoaded", ready, false);
    }
    // Old browsers
    if (window.addEventListener) newwin.addEventListener("load", ready, false);
    else if (window.attachEvent) newwin.attachEvent("onload", ready);
    else {
      var fn = newwin.onload; // very old browser, copy old onload
      newwin.onload = function () {
        // replace by new onload and call the old one
        fn && fn();
        ready();
      };
    }
  }

  function flow() {
    last_url = url;

    if (newwin == undefined || !(newwin && !newwin.closed)) {
      // если окно открывается впервые или уже после его закрытия, то...

      //console.log('новое newwin='+newwin)
      // ... открываем окно

      if (parent.screen.width < 800) {
        // если наш гаджет это мобила или планш, то...

        // проводим проверку на контент
        if (url.match(/htm|http/i)) {
          //если это отдельная страница(практика ген-ра, фрагмент фильма, доп.инфа или окно входа в соцсеть)
          //win_url=1
          newwin = window.open(url, "newwin"); // то сразу открываем эту страницу в новой пустой вкладке
        } else {
          // если это не целая страница, а данные
          // то открываем сначала новую пустую вкладку во всю ширину экрана
          newwin = window.open("answer.html", "newwin");
        }
      } else {
        // если наш гаджет - десктоп или лэптоп, то сначала определяем размеры экрана

        var w = width || screen.width / 2,
          h = height || screen.height / 2;
        if (navigator.userAgent.toLowerCase().indexOf("opr") != -1) h += 50; //fix Opera bug
        var left = (screen.width - w) / 2,
          top = (screen.height - h) / 2;
        // а потом определяем центр для окна с размерами WIDTH x HEIGHT
        var params = "width=" + w + ",height=" + h;
        params += ",top=" + top + ",left=" + left;
        params += ",screenY=" + top + ",screenX=" + left; // let's support older NS too ;)
        params += ",resizable";
        params += ",dialog";

        // проверка на контент
        if (url.match(/htm|http/i)) {
          //если это отдельная страница(практика ген-ра, фрагмент фильма, доп.инфа или окно входа в соцсеть)
          //win_url=1
          newwin = window.open(url, "newwin", params); // то сразу открываем эту страницу в новом popup окне посередине экрана
        } else {
          // если это не целая страница, а данные
          // то открываем сначала новое popup окно посередине экрана
          newwin = window.open("answer.html", "newwin", params);
        }
      }
      //console.log('после open newwin.closed='+newwin.closed)

      bindReady(function () {
        // ждем построения DOM
        //console.log(url)
        if (url == "") {
          //  если это вопрос теста, то после построения DOM вставляем блок ответа

          newwin.document.title = windowtitle;
          var i = newwin.document.getElementById("content_answer");
          i.style.display = "block";
          i.style.border = "0.1vw solid #d3d3d3";
          i.style.background = "#e5f2ee";
          newwin.document.getElementById("textdescription").innerHTML =
            textdescription;
          newwin.document.getElementById("pronunciation").innerHTML =
            pronunciation;
          newwin.document.getElementById("but_done").style.display = "block";
          newwin.document.getElementById("print_form").style.display = "none";
          win_test = 1;
        } else {
          //console.log(url)
          if (getextension(url).match(/jpg|gif|png/i)) {
            // если это картинка, то вставляем её
            newwin.document.title = windowtitle;
            var y = newwin.document.getElementById("content_print");
            y.style.display = "block";
            y.innerHTML = '<img src="' + url + '" style="max-width:100%">';
            //newwin.document.getElementById('pronunciation').innerHTML='';
            newwin.document.getElementById("but_done").style.display = "block";
            var x = newwin.document.getElementById("print_form");
            if (parent.screen.width < 800) {
              x.style.display = "none";
            } else {
              x.style.display = "inline-block";
            }
            win_img = 1;
          }
          if (url.match(/http|htm/i)) {
            //если это отдельная страница(практика ген-ра, фрагмент фильма, доп.инфа или окно входа в соцсеть), то
            //alert('hi')
            win_url = 1;
          }
        }

        //		console.log('last_url = '+last_url)
        //	console.log('url = '+url)
        //	console.log('win_test = '+win_test)
        //	console.log('win_img = '+win_img)
        //	console.log('win_url = '+win_url)
      });
    } else {
      // Теперь. Еcли окно открывается повторно, то окно вовсе не открывается
      //console.log('повторное newwin='+newwin)
      if (newwin) newwin.focus(); // сначала выводим окно на первый план
      if (url == "") {
        // ... и если это вопрос теста, то меняем блок ответа(заголовок окна, рамку!! и фразы) ...

        newwin.document.title = windowtitle;
        var i = newwin.document.getElementById("content_answer");
        i.style.display = "block";
        i.style.border = "0.1vw solid #d3d3d3";
        i.style.background = "#e5f2ee";
        newwin.document.getElementById("textdescription").innerHTML =
          textdescription;
        newwin.document.getElementById("pronunciation").innerHTML =
          pronunciation;
        newwin.document.getElementById("but_done").style.display = "block";
        newwin.document.getElementById("print_form").style.display = "none";
      } else {
        //console.log('картинка расширение= '+getextension(url))
        if (getextension(url).match(/jpg|gif|png/i)) {
          // если картинка, то меняем картинку

          var y = newwin.document.getElementById("content_print");
          y.style.display = "block";
          newwin.document.title = windowtitle;
          y.innerHTML = '<img src="' + url + '" style="max-width:100%">';
          //newwin.document.getElementById('pronunciation').innerHTML='';
          newwin.document.getElementById("but_done").style.display = "block";
          var x = newwin.document.getElementById("print_form");
          if (parent.screen.width < 800) {
            x.style.display = "none";
          } else {
            x.style.display = "inline-block";
          }
        }
        if (url.match(/http|htm/i)) {
          //console.log('надо что-то делать тут...')
          //win_url=1
          //отдельная страница(практика для урока генератора, фрагмент фильма или доп.инфа)
        }
      }
    }
  }

  if (win_test || win_img || win_url) {
    // сначала выясняем, это первый или повторный вход
    // если повторный, то ...
    //console.log('повторный вход')
    if (last_url != url) {
      // и если целиковый урл не совпадает
      //console.log('url не совпадает...'+url)
      //				console.log('last_width = '+last_width)
      //	console.log('last_height = '+last_height)
      //	console.log('width = '+width)
      //	console.log('height = '+height)
      if (
        !last_width ||
        last_width != width ||
        last_height != height ||
        url.match(/http/i) ||
        url.match(/generator-fraz/i)
      ) {
        // и не совпадают размеры окна или это вход в соцсеть, то подобный вход - первый...
        // закрываем прежнее окно
        newwin.close();
        //console.log('закрыли newwin.closed='+newwin.closed) //если закомментить этот консоль, то IE перестанет срабатывать при повторном открытии окна
        last_width = width;
        last_height = height;
        win_test = win_img = win_url = 0;
        //ждем пока закроется окно
        (function timer() {
          //console.log('timer')
          if (newwin.closed) {
            //console.log('2-ая проверка закрыли newwin.closed='+newwin.closed)
            flow();
          } else setTimeout(timer, 0);
        })();
      } else flow();
    } else flow();
  } else flow();
  return false;
}

// нужно для закрытия дочерних окон, когда родительское окно уже закрыто

window.onunload = function () {
  if (newwin && !newwin.closed) {
    newwin.close();
  }
};

function getextension(filename) {
  return /[^&]*/.exec(/[^?]*/.exec(/[^.]+$/.exec(filename)))[0];
} // оставляем всё, что после ".", а потом обрезаем всё что после "?" и после "&"

// ---------------ambulance trigger initiation

var css_code = ".hh1{border-radius:50%;width:100px}.strip{height:37px}";
css_code +=
  ".hh1::before{height:39px;transform:translate(5%,-50%);width:90%;background:#a30000}";
css_code +=
  ".hh1 strong{color:transparent;text-shadow:1px 1px 2px transparent}";
css_code +=
  ".hh1::after{width:39px;transform:translate(-50%,5%); height:90%;background:#a30000}";
css_code +=
  ".two-2 .line_1_2,.two-2 .line_3_4{visibility:visible;margin-top:0}.two-2 .line_3_4{font-size:0.8em}";
css_code +=
  ".one-1 .line_1_2,.one-1 .line_3_4{color:transparent;text-shadow:1px 1px 2px transparent}";
css_code +=
  "@media(min-width:768px){.hh1{width:120px}.hh1::before{height:50px}.hh1::after{width:50px}";
css_code +=
  ".two-2 .line_1_2{font-size:21px}.two-2 .line_3_4{font-size:18px}.strip{height:41px}}";
var hover_chk = true;
var amb = document.getElementById("ambulance-trigger");
function ambulance_on() {
  setTimeout(function () {
    amb.innerHTML = css_code;
    hover_chk = !hover_chk;
    ambulance_off();
  }, 1200);
}
function ambulance_off() {
  setTimeout(function () {
    amb.innerHTML = "";
    hover_chk = !hover_chk;
  }, 10000);
}

//ambulance_on(); // start ambulance trigger // put ambulance_on() after hover_chk; in ambulance_off //function

//---------------------------------------

// <-- цветовая пробежка по кнопкам
function flain() {
  for (var i = 1; i <= 4; i++) {
    (function (index) {
      setTimeout(function () {
        document.getElementById("m" + index).style.background = "#000000";
        document.getElementById("m" + index).style.color = "#E0012E";
      }, i * 100);
    })(i);
  }

  setTimeout(function () {
    for (var i = 1; i <= 4; i++) {
      (function (index) {
        setTimeout(function () {
          document.getElementById("m" + index).style.background = "";
          document.getElementById("m" + index).style.color = "";
        }, i * 100);
      })(i);
    }
  }, 50);

  for (var i = 1; i < 17; i++) {
    (function (index) {
      setTimeout(function () {
        document.getElementById("a" + index).style.background = "#000000";
        document.getElementById("a" + index).style.color = "#5E77C7";
      }, i * 50 + 350);
    })(i);
  }

  setTimeout(function () {
    for (var i = 1; i < 17; i++) {
      (function (index) {
        setTimeout(function () {
          document.getElementById("a" + index).style.background = "";
          document.getElementById("a" + index).style.color = "";
        }, i * 50 + 350);
      })(i);
    }
  }, 50);
}
