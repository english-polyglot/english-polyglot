var clog = null;

function str_adb() {
  var ins = document.getElementById("instr");

  ins.style.visibility = "visible";
  ins.style.opacity = 1;

  if (document.getElementById("prog3")) {
    var strip = window.innerWidth - document.documentElement.clientWidth; //-0.5; was before onload

    var btn = document.getElementById("stt");
    btn.style.display = "none";

    var bod = document.getElementsByTagName("body")[0];
    bod.style.marginRight = strip + "px";
    bod.style.overflowY = "hidden";
  }
}

function adBlockDetected() {
  var ifr =
    '<iframe id="instr" style="visibility:hidden" class="infront" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" vspace="0" hspace="0" name="internal"></iframe>';

  var adcont =
    '<div id="progress2"><div class="info0"><div class="info"><span> &nbsp;</span><br /><span>Пожалуйста, отключите блокиратор рекламы...</span><br /><span> &nbsp;</span></div><a class="adblock__button"';

  var aAll =
    ' href="stop-block.html" target="internal" onclick="if (clog) {clearTimeout(clog)};">как отключить</a></div>';

  var aFirst = ' id="a1_button"';

  var a = document.getElementById("prog1") || false;
  if (a) a.innerHTML = adcont + aFirst + aAll + ifr;

  var b = document.getElementById("prog2") || false;
  if (b && a) {
    b.innerHTML = adcont + aAll;
  } else if (b && !a) {
    b.innerHTML = adcont + aFirst + aAll + ifr;
  }

  var c = document.getElementById("prog3") || false;
  if (c) c.innerHTML = adcont + aAll;

  if (typeof urok_num == "undefined" || urok_num != 1) {
    //if ((typeof(urok_num)=='undefined') && (urok!=1)) {
    //console.log('urok: ' + urok);
    //			clog = setTimeout(function(){document.getElementById("a1_button").click()}, 7000);
    //}
  }
}

function modal_hide() {
  var ifr = document.getElementById("instr");
  var bod = document.getElementsByTagName("body")[0];
  ifr.style.opacity = "0";
  var i = document.getElementById("stt") || false;
  setTimeout(function () {
    ifr.style.visibility = "hidden";
    bod.style.marginRight = "";
    bod.style.overflowY = "auto";
    if (i) i.style.display = "";
  }, 300);

  if (typeof urok_num == "undefined" || urok_num != 1) {
    //if ((typeof(urok_num)=='undefined') && (urok!=1)) {
    //			if (clog) {clearTimeout(clog)}
    //			clog = setTimeout(function(){document.getElementById("a1_button").click()}, 7000);
    //}
  }
}
