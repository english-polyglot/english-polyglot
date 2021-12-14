/*! Phrase generator v1.2 | Copyright 2012, 2015 Mr.Poligloto | www.english-polyglot.com/generator-fraz.html */

var message_top = "",
  message_bottom = "";
var message_middle = "";
var data_top = "";
var data_mid = "";
var data_bot = "";
var dinamic = "";
var transic = "";
var mesmid = "";
var mesmid2 = "";
var glob_name = "";
var DB = "";
var random_number = 0;
var number_click = 0;
var messages_length = 0;
var aa = 0;
var bb = 0;
var currentVerb = 0;
var numberOfSelectedVerbs = 0;
var verbAllCounter = 0;
var bac = 0;
var can_orient = 0;
var can_orient_global = 0;
var verbAll = 0;
var tog_counter = 0;
var en = "en";
var ru = "ru";
var first = "a";
var second = "c";
var third = "b";
var c1 = "&nbsp;";
var c2 = "&nbsp;";
var c3 = "&nbsp;";
var j = -1;
var lengthVerbs;
var AR = new Array();
var arrIndexes = new Array();
var arrIndexes2 = new Array();
var randNum = new Array();
var urok_all_verb_sounds = new Array();
var urok_all_verb_names = new Array();
var floaded = new Array();
var trans = 1;
var anons = 1;
var language_choice = 1;
var sound = 1;
var sound_global = 1;
var phrase_audio = 1;
var translation_audio = 1;
var forw = 1;
var urok = 1;
var text_visibility = 1;
var buf_state = 1;
var e_space = 1;
var id_timer;
var audio_name = "fff.mp3";
var phrase_name = "nnn-mp3";
var show = false;
var contextClass =
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext;
//var xhr;
var xml = new Array();
var all_uroks_sounds = new Array(); // попытка запомнить все глаголы всех уроков
var all_uroks_names = new Array();
var tri = "<br />&#9660;&#9660;&#9660;";
var dwodn = "&#9660;";
var riodn = "&#9658;";
var upodn = "&#9650;";
var cont = "нажмите пустую область<br />для следующей фразы" + tri;
var rep = (rep2 = "нажмите пустую область<br />чтобы повторить фразу" + tri);
var introT = [9.5, 14, 14, 28, 15, 1, 1];

var i = 0;
var int = document.getElementById("intro");
var x =
  '<em id="stop_intro" class="arrow-r ui-icon-delete" onclick="disappear();i=7" title="Закрыть подсказки"></em>';

var intro = [
  '<span class="intro1">' +
    x +
    "Для начала работы, нажмите на стрелку внизу</span>" +
    dwodn,
  '<span class="intro1">' +
    x +
    "Переведите фразу. Нажмите стрелку снова, чтобы увидеть ответ</span>" +
    dwodn,
  '<span style="float:left;margin-top:2px;">&#9650;</span><br /><span class="intro1">' +
    x +
    "Чтобы прослушать фразу еще раз, кликните по ней</span>",
  '<span class="intro1" style="display:inline-block">' +
    x +
    "Таблицу глаголов можно открыть/закрыть здесь</span><span>" +
    riodn +
    "</span>",
  '<span class="intro1" style="text-align:center">' +
    x +
    'Здесь можно выбрать глагол</span><span style="position:absolute;left:50%">' +
    dwodn +
    "</span>",
  "<span>" +
    upodn +
    '</span><span class="intro1" style="margin-top:-3px;">' +
    x +
    "Другие настройки генератора фраз находятся здесь</span>",
  '<span style="position:absolute;left:50%">' +
    upodn +
    '</span><br /><span class="intro1" style="margin-top:-3px;">' +
    x +
    "А здесь Вы найдете остальные инструкции по работе с генератором фраз</span>",
];
var ij3 =
  '<span id="ij3" class="intras"><span id="i3">&#9658;</span><span id="j3">' +
  x +
  "Таблицу глаголов можно открыть/закрыть здесь</span></span>";
var tabl = [
  ,
  [
    "tablica-glagolov-petrova-image.gif",
    "tablica-glagolov-petrova-image-black.gif",
    "table-base.gif",
  ],
  ,
  [
    "tablica-glagola-to-be-petrova-image.gif",
    "black-tablica-glagola-to-be-petrova-image.gif",
    "table-be.gif",
  ],
  [
    "tablica-glagola-to-be-ing-image.gif",
    "tablica-glagola-to-be-ing-image-black.gif",
    "table-be.gif",
  ],
];
var tab_index = 0;
var gear = "0111101011";

change_language(0); //русский первым

if (contextClass) {
  var context = new contextClass();
  check_mp3();
}

window.history.pushState(null, null, "generator-fraz.html");

$("[name=radio2]").change(function () {
  can_orient_global = 1 - can_orient_global;
});

$.mobile.defaultPageTransition = "none";

r(function () {
  //alert(6..toString(2));
  //alert(parseInt('01111010111',2));

  $("#dbl").bind("vclick", function () {
    if (show) {
      if (text_visibility || !e_space) {
        click1plus1();
      } else {
        click1();
      }
    }
  }); //||!e_space
  if ($("::content .adsbygoogle").css("display") == "none") {
    document.getElementById("page1").innerHTML =
      '<div class="info">Please turn off the Adblock on this site and refresh the page</div>';
  }
}); //вместо $(document).ready

$(document).on("popupafterclose", "#verb-listbox-popup", function () {
  if (i == 5) {
    appear();
  }
});

$("#page1").on("swipeleft swiperight", function () {
  tog_counter++;
  if (tog_counter == 1) {
    $("#topPage").toggle(700);
    text_visibility = 1 - text_visibility;
    if (text_visibility) {
      document.getElementById("text_monitor").innerHTML = cont;
      $("#radio4_0").prop("checked", true).checkboxradio("refresh");
      $("#radio4_1").prop("checked", false).checkboxradio("refresh");
    } else {
      document.getElementById("text_monitor").innerHTML = rep;
      $("#radio4_1").prop("checked", true).checkboxradio("refresh");
      $("#radio4_0").prop("checked", false).checkboxradio("refresh");
    }
  }

  clearTimeout(id_timer);
  start_timer("text_monitor");
  tog_counter = 0;
});

$(window).bind("orientationchange", function (event) {
  event.preventDefault();
  if (event.orientation == "landscape") {
    if ($(window).width() <= 370 || $(window).height() <= 370) {
      $("#header2").css({ display: "none" });
      $(".spaceTopPage").css({ "margin-top": "0em" });
      $("#selector").css({ display: "none" });
      $("#infa").css({ display: "none" });
    }
  } else {
    if ($(window).width() <= 370 || $(window).height() <= 370) {
      $("#header2").css({ display: "initial" });
      $(".spaceTopPage").css({ "margin-top": "2.2em" });
      $("#infa").css({ display: "initial" });
      if (urok < 3 || urok > 6) {
        $("#selector").css({ display: "initial" });
      }
    }
  }
  if (can_orient && can_orient_global)
    if (show) {
      click1plus1();
    }
});

function check_mp3() {
  var base64ToBuffer = function (buffer) {
    var binary = window.atob(buffer);
    var buffer = new ArrayBuffer(binary.length);
    var bytes = new Uint8Array(buffer);

    for (var i = 0; i < buffer.byteLength; i++) {
      bytes[i] = binary.charCodeAt(i) & 0xff;
    }
    return buffer;
  };
  var base64String =
    "SUQzAwAAAAABOlRTU0UAAAAwAAAATEFNRSA2NGJpdHMgdmVyc2lvbiAzLjk5LjUgKGh0dHA6Ly9sYW1lLnNmLm5ldCkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/zgMQAAAAAAAAAAABJbmZvAAAADwAAAAMAAANCAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv///////////////////////////////////////////wAAADlMQU1FMy45OXIBbgAAAAAAAAAAFEAkBGAiAABAAAADQrlwxl4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/84DEACIptdwEeEzlC8XMuajf4YE4choE7J2XM0zrUavj7u/fv379+/uDxv/9oIEyYDAYDAYDAYDAAQQIEEIiLPJkyZMmTJkCERnu7IECBAgQiIu7vf//+93d2gAAAAAD////8BAeHh4ekABH/////+AgPDw8PWgABnv//wAAAAEB4eHh6QAAAAQHh4eHrQAAA9+Y/9JT3/OAQCAQCAQCCiQKuBoGgZBWWBoFQVBUFQkDQNA0DQKgqCvR+DIKgqCoKs4sDQNA0DR1bv57//lS//OCxDoUICX4DjGMAD2ZUFRE+WCp3KkeK9fs6/FeVZqCrsFaTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/84LEOwAAAAAAAAAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqg==";

  var audioFromString = base64ToBuffer(base64String);
  context.decodeAudioData(
    audioFromString,
    function (buffer) {},
    function (e) {
      audio_name = "fff.ogg";
      phrase_name = "nnn-ogg";
    }
  );
}

function button_home() {
  //disappear();i=7;
  setMaxWidth("");
  can_orient = 0;
  message_top = "";
  document.getElementById("conteiner").innerHTML = "&nbsp;";
  if (trans) {
    document.getElementById("conteiner3").innerHTML = "&nbsp;";
    document.getElementById("conteiner2").innerHTML = "&nbsp;";
  } else {
    if (first == "b") {
      document.getElementById("conteiner3").innerHTML = "&nbsp;";
      document.getElementById("conteiner2").innerHTML = "";
    } else {
      document.getElementById("conteiner3").innerHTML = "";
      document.getElementById("conteiner2").innerHTML = "&nbsp;";
    }
  }
  $("#selector").css({ display: "initial" });
  $("#soundCheck").css({ display: "initial" });
  currentVerb = 0;
}

function setMaxWidth(i) {
  document.getElementById("page1").style.maxWidth = i;
}

function block(gen, name) {
  var verbID = document.getElementById("verb"),
    tID = document.getElementById("t");
  //tID.innerHTML='';

  //document.getElementById("sw_tab").style.display='none';

  if (typeof all_uroks_sounds == "undefined") {
  } //новый ппытк
  urok_all_verb_sounds = new Array();
  urok_all_verb_names = new Array();

  can_orient = 1;
  urok = gen;
  glob_name = name;

  //anons=0;
  //an_switch();

  function updateProgress(p) {
    progress2.style.width = Math.round(p) + "%";
  }

  document.getElementById("nameLesson").innerHTML =
    gen + ".&nbsp;&nbsp;" + name.innerHTML.match(/<aa>(.*?)<\/aa>/g);
  $(":jqmData(role='page')").attr("data-title", document.title);
  document.getElementById("verb_all").innerHTML = "";
  document.getElementById("verb_counter").innerHTML = "";
  document.getElementById("progress2").style.background = "rgb(120,120,120)";
  switch (gen) {
    case 1:
      {
        verbID.innerHTML =
          '<option value="0" selected="selected">love</option>' +
          '<option value="1">live</option>' +
          '<option value="2">work</option>' +
          '<option value="3">open</option>' +
          '<option value="4">close</option>' +
          '<option value="5">see</option>' +
          '<option value="6">come</option>' +
          '<option value="7">go</option>' +
          '<option value="8">know</option>';
        //tID.innerHTML ='<img src="img/'+tabl[gen][tab_index]+'" />';
      }
      break;

    case 2:
      {
        verbID.innerHTML =
          '<option value="0"  selected="selected">questions</option>' +
          '<option value="1">ask</option>' +
          '<option value="2">travel</option>' +
          '<option value="3">hope</option>' +
          '<option value="4">help</option>' +
          '<option value="5">answer</option>' +
          '<option value="6">take</option>' +
          '<option value="7">speak</option>' +
          '<option value="8">give</option>';
        //tID.innerHTML ='<img src="img/tablica-glagolov-petrova-image.gif" />';
      }
      break;

    case 3:
      {
        verbID.innerHTML = '<option value="0" selected="selected"></option>';
        $("#selector").css({ display: "none" });
        //tID.innerHTML ='<img src="img/tablica-glagola-to-be-petrova-image.gif" />';
      }
      break;

    case 4:
      {
        verbID.innerHTML = '<option value="0" selected="selected"></option>';
        $("#selector").css({ display: "none" });
        //tID.innerHTML ='<img src="img/tablica-glagola-to-be-ing-image.gif" />';
      }
      break;

    case 5:
      {
        verbID.innerHTML = '<option value="0" selected="selected"></option>';
        $("#selector").css({ display: "none" });
      }
      break;

    case 6:
      {
        verbID.innerHTML = '<option value="0" selected="selected"></option>';
        $("#selector").css({ display: "none" });

        r(function () {
          setMaxWidth("950px");
        }); //вместо $(document).ready
      }
      break;

    case 7:
      {
        verbID.innerHTML =
          '<option value="0" selected="selected">buy</option>' +
          '<option value="1">sell</option>' +
          '<option value="2">pay</option>' +
          '<option value="3">make</option>' +
          '<option value="4">choose</option>' +
          '<option value="5">try</option>' +
          '<option value="6">change</option>' +
          '<option value="7">show</option>' +
          '<option value="8">play</option>' +
          '<option value="9">turn</option>';
      }
      break;

    case 8:
      {
        verbID.innerHTML =
          '<option value="0" selected="selected">go</option>' +
          '<option value="1">come</option>' +
          '<option value="2">take</option>' +
          '<option value="3">put</option>' +
          '<option value="4">get</option>' +
          '<option value="5">look</option>' +
          '<option value="6">turn</option>' +
          '<option value="7">walk</option>' +
          '<option value="8">run</option>' +
          '<option value="9">pull</option>';
      }
      break;
  }

  if (urok < 5) {
    tID.innerHTML =
      '<img src="img/' + tabl[urok == 2 ? urok - 1 : urok][tab_index] + '" />';
    document.getElementById("sw_tab").style.display = "block";
  } else {
    document.getElementById("sw_tab").style.display = "none";
  }

  for (var i = 1; i < 9; i++) {
    if (i != urok) {
      document.getElementById("urok" + i).style.display = "none";
    } else {
      document.getElementById("urok" + i).style.display = "block";
    }
  }

  if (typeof xml[urok] == "undefined") {
    DB = "DB-" + gen + ".xml";
    xhr = loadFile(0, DB, updateProgress, function () {
      start_urok();
    });
  } else {
    start_urok();
  }
  $("#verb").selectmenu("refresh", true);
}

function loadFile(papp, url, progressCallback, callback) {
  var arrbuf = false;
  var xhr = null;
  if (window.XMLHttpRequest) {
    try {
      xhr = new XMLHttpRequest();
    } catch (e) {}
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  if (xhr) {
    xhr.open("GET", url, true);
    if (url.split(".").pop() == "mp3" || url.split(".").pop() == "ogg") {
      xhr.responseType = "arraybuffer";
    }
    if (url.split(".").pop() != "xml") {
      arrbuf = true;
    }
    xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");

    xhr.onreadystatechange = function () {
      try {
        if (xhr.readyState === 4) {
          var status = xhr.status;
          if ((status >= 200 && status < 300) || status === 304) {
            if (arrbuf) {
              floaded[papp] = true;
            } else {
              show = true;
            }
            callback(xhr.response);
            delete xhr;
            xhr = null;
          } else {
            if (arrbuf) {
              floaded[papp] = false;
            } else {
              show = false;
            }
          }
        }
      } catch (e) {
        //alert('ошибка: '+ e.description);
        show = false;
      }
    };

    xhr.onprogress = function (e) {
      if (e.lengthComputable) {
        var done = e.position || e.loaded,
          total = e.totalSize || e.total;
        progressCallback((done * 100) / total);
      }
    };
    xhr.send();
  }
  return xhr;
}

function start_urok() {
  if (typeof xml[urok] == "undefined") {
    xml[urok] = xhr.responseXML;
  }
  messages_length = xml[urok]
    .getElementsByTagName("m")
    [currentVerb].getElementsByTagName("d").length;
  click35();
  click4();
  document.getElementById("verb_all").innerHTML = messages_length;
  verbAll = messages_length;
  document.getElementById("verb_counter").innerHTML = verbAllCounter;

  if (!sound_global) {
    document.getElementById("phrase_audio").innerHTML = "";
    document.getElementById("midline").innerHTML = "";
    document.getElementById("translation_audio").innerHTML = "";
  }

  if (sound & sound_global) {
    if (trans) {
      dinamic = '<span style="padding-left:1.5em;"><em>&nbsp;</em></span>';
    }
    document.getElementById("phrase_audio").innerHTML =
      '<a id="clickPhraseAudio' +
      phrase_audio +
      '" href="javascript: void(0)" onclick="click_phrase_audio();"></a><em>&nbsp;</em>';
    if (first == "a") {
      document.getElementById("midline").innerHTML = dinamic;
      document.getElementById("translation_audio").innerHTML =
        '<a id="clickTranslationAudio' +
        translation_audio +
        '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';
    } else {
      document.getElementById("midline").innerHTML =
        '<a id="clickTranslationAudio' +
        translation_audio +
        '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';
      document.getElementById("translation_audio").innerHTML = dinamic;
    }
  } else {
    document.getElementById("conteiner").innerHTML = "&nbsp;";
    if (trans) {
      document.getElementById("conteiner3").innerHTML = "&nbsp;";
      document.getElementById("conteiner2").innerHTML = "&nbsp;";
    } else {
      if (first == "b") {
        document.getElementById("conteiner3").innerHTML = "&nbsp;";
        document.getElementById("conteiner2").innerHTML = "";
      } else {
        document.getElementById("conteiner3").innerHTML = "";
        document.getElementById("conteiner2").innerHTML = "&nbsp;";
      }
    }
  }
  if (i == 0) {
    checkCookie("intro");
    appear();
  }
}

function getRandomArray(min, max) {
  var A = new Array();
  while (max >= min) A.push(max--);
  A.sort(function () {
    return 0.5 - Math.random();
  });
  return A;
}

function click1minus1() {
  disappear();

  forw = 0;
  number_click = 1;

  verbAllCounter--;
  if (verbAllCounter <= 0) {
    verbAllCounter = verbAll;
  }
  j--;
  if (j < 0) {
    j = numberOfSelectedVerbs - 1;
  }

  if (aa == j) {
    bac = 1;
  }
  currentVerb = arrIndexes[j];
  bb = j;

  if ((numberOfSelectedVerbs > 1) & (bac != 0)) {
    randNum[currentVerb]--;
  }
  if (numberOfSelectedVerbs == 1) {
    randNum[currentVerb]--;
  }
  if (randNum[currentVerb] < 0) {
    randNum[currentVerb] = AR[currentVerb].length - 1;
  }

  random_number = AR[currentVerb][randNum[currentVerb]];
  click1();
}

function click1plus1() {
  disappear();
  //if(i!=5){disappear()}
  bac = 0;
  number_click = number_click + 1;

  if (number_click == 1) {
    verbAllCounter++;

    if (verbAllCounter > verbAll) {
      verbAllCounter = 1;
    }

    j++;

    if (j > numberOfSelectedVerbs - 1) {
      j = 0;
    }

    if (bb == j) {
      forw = 1;
    }
    currentVerb = arrIndexes[j];
    aa = j;
    if ((numberOfSelectedVerbs > 1) & (forw != 0)) {
      randNum[currentVerb]++;
    }
    if (numberOfSelectedVerbs == 1) {
      randNum[currentVerb]++;
    }
    if (randNum[currentVerb] > AR[currentVerb].length - 1) {
      randNum[currentVerb] = 0;
    }
    random_number = AR[currentVerb][randNum[currentVerb]];
  }
  click1();
  appear();
}

function click1() {
  if (number_click == 1) {
    document.getElementById("verb_counter").innerHTML = verbAllCounter;
    message_top = getElemText(
      xml[urok]
        .getElementsByTagName("m")
        [currentVerb].getElementsByTagName(first)[random_number]
    );
    message_middle = getElemText(
      xml[urok]
        .getElementsByTagName("m")
        [currentVerb].getElementsByTagName(second)[random_number]
    );
    message_bottom = getElemText(
      xml[urok]
        .getElementsByTagName("m")
        [currentVerb].getElementsByTagName(third)[random_number]
    );

    if (first == "a") {
      data_top =
        "<em>" +
        c1 +
        '</em><span><a id="hierarhy" href="javascript: void(0)" onclick="playSound3(message_top, currentVerb);if(i==2){disappear();appear()}">' +
        message_top +
        "</a></span>";

      if (sound & phrase_audio & sound_global) {
        playSound3(message_top, currentVerb);
      }
      data_mid = "<em>" + c2 + "</em><span>" + message_middle + "</span>";
      data_bot = "<em>" + c3 + "</em><span></span>";
    } else {
      mesmid = message_middle + " ru";
      data_top =
        "<em>" +
        c1 +
        '</em><span><a id="hierarhy" href="javascript: void(0)" onclick="playSound3(mesmid, currentVerb, message_top);if(i==2){disappear();appear()}">' +
        message_top +
        "</a></span>";

      if (sound & phrase_audio & sound_global) {
        playSound3(mesmid, currentVerb, message_top);
      }
      data_mid = "<em>" + c3 + "</em><span></span>";
      data_bot = "<em>" + c2 + "</em><span></span>";
    }

    document.getElementById("conteiner").innerHTML = data_top;
  } else {
    if (first == "a") {
      mesmid2 = message_top + " ru";
      data_bot =
        "<em>" +
        c3 +
        '</em><span><a id="hierarhy" href="javascript: void(0)" onclick="playSound3(mesmid2, currentVerb, message_bottom);if(i==2){disappear();appear()}">' +
        message_bottom +
        "</a></span>";

      if (sound & translation_audio & sound_global) {
        playSound3(mesmid2, currentVerb, message_bottom);
      }
    } // если язык русский то
    else {
      data_mid =
        "<em>" +
        c3 +
        '</em><span><a id="hierarhy" href="javascript: void(0)" onclick="playSound3(message_middle, currentVerb);if(i==2){disappear();appear()}">' +
        message_middle +
        "</a></span>";

      if (sound & translation_audio & sound_global) {
        playSound3(message_middle, currentVerb);
      }
      data_bot = "<em>" + c2 + "</em><span>" + message_bottom + "</span>";
    }
    number_click = 0;
  }
  if (trans) {
    if (first == "b") {
      if (number_click == 1) {
        data_bot = "<em>" + c2 + "</em><span></span>";
      } else {
        data_bot = "<em>" + c2 + "</em><span>" + message_bottom + "</span>";
      }
    } else {
      data_mid = "<em>" + c2 + "</em><span>" + message_middle + "</span>";
    }
  } else {
    if (first == "a") {
      data_mid = "<span></span>";
    } else {
      data_bot = "<span></span>";
    }
  }
  document.getElementById("conteiner3").innerHTML = data_mid;
  document.getElementById("conteiner2").innerHTML = data_bot;
}

function click2() {
  number_click = 0;
}

function click3() {
  if (trans) {
    if (message_top == "") {
      if (sound & sound_global) {
        if (first == "a") {
          document.getElementById("conteiner3").innerHTML =
            "<em>" + c2 + "</em><span></span>";
          document.getElementById("midline").innerHTML = dinamic;
        } else {
          document.getElementById("conteiner2").innerHTML =
            "<em>" + c2 + "</em><span></span>";
          document.getElementById("translation_audio").innerHTML = dinamic;
        }
      }
    } else {
      if (document.getElementById("conteiner").innerHTML != "&nbsp;") {
        if (first == "b") {
          document.getElementById("translation_audio").innerHTML = dinamic;
          if (number_click == 1) {
            data_bot = "<em>" + c2 + "</em><span></span>";
          } else {
            data_bot = "<em>" + c2 + "</em><span>" + message_bottom + "</span>";
          }
          document.getElementById("conteiner2").innerHTML = data_bot;
        } else {
          document.getElementById("midline").innerHTML = dinamic;
          data_mid = "<em>" + c2 + "</em><span>" + message_middle + "</span>";
          document.getElementById("conteiner3").innerHTML = data_mid;
        }
      } else {
        if (first == "b") {
          document.getElementById("translation_audio").innerHTML = dinamic;
          document.getElementById("conteiner2").innerHTML = "&nbsp;";
        } else {
          document.getElementById("midline").innerHTML = dinamic;
          document.getElementById("conteiner3").innerHTML = "&nbsp;";
        }
      }
    }
  } else {
    if (first == "b") {
      document.getElementById("translation_audio").innerHTML = dinamic;
      document.getElementById("conteiner2").innerHTML = "";
    } else {
      document.getElementById("midline").innerHTML = dinamic;
      document.getElementById("conteiner3").innerHTML = "";
    }
  }
}

function click35() {
  randNum[currentVerb] = 0;
  j = -1;
  currentVerb = 0;
  numberOfSelectedVerbs = 0;
  number_click = 0;
  verbAll = 0;

  lengthVerbs = document.formVerb.verb.options.length;
  arrIndexes = new Array();
  arrIndexes2 = new Array();
  for (var i = 0; i < lengthVerbs; i++) {
    if (document.formVerb.verb.options[i].selected) {
      arrIndexes.push(i);
      numberOfSelectedVerbs++;
      arrIndexes2[i] = 1;
      verbAll =
        verbAll +
        xml[urok].getElementsByTagName("m")[i].getElementsByTagName("d").length;
      if (typeof urok_all_verb_names[i] == "undefined") {
        preload_pap(i);
      }
    } else {
      arrIndexes2[i] = 0;
    }
  }
  document.getElementById("verb_all").innerHTML = verbAll;
  document.getElementById("verb_counter").innerHTML = 0;
  verbAllCounter = 0;
}

function click4() {
  var CV;
  var ML;
  AR = new Array();
  randNum = new Array();

  for (var i = 0; i < lengthVerbs; i++) {
    if (arrIndexes2[i] == 1) {
      ML = xml[urok]
        .getElementsByTagName("m")
        [i].getElementsByTagName("d").length;
      AR[i] = getRandomArray(0, ML - 1);
    } else {
      AR[i] = [];
    }
    randNum[i] = -1;
  }
}

function preload_pap(pap) {
  var urok_verb_sounds = [];
  var urok_verb_names = [];

  var toLoad = (loaded = -1);

  if (lengthVerbs == 1) {
    var phrase = "audio/g-" + urok + "/" + phrase_name;
    var audio = "audio/g-" + urok + "/" + audio_name;
  } else {
    var phrase = "audio/g-" + urok + "/" + pap + "/" + phrase_name;
    var audio = "audio/g-" + urok + "/" + pap + "/" + audio_name;
  }

  var requestPhrase = loadFile(pap, phrase, updateProgress2, function () {
    urok_verb_names = requestPhrase.responseText.split(",");

    urok_all_verb_names[pap] = urok_verb_names;
  });

  if (context && buf_state) {
    var requestAudio = loadFile(pap, audio, updateProgress2, function () {
      processConcatenatedFile(requestAudio.response);
    });
  }

  function extractBuffer(src, start, length) {
    var dstU8 = new Uint8Array(length);
    var srcU8 = new Uint8Array(src, start, length);
    dstU8.set(srcU8);
    return dstU8;
  }

  function processConcatenatedFile(dataSound) {
    var ss = new DataView(dataSound);
    var offset = 0;
    while (offset < ss.byteLength) {
      var length = ss.getUint32(offset, true);
      offset += 4;
      var mp3 = extractBuffer(dataSound, offset, length);
      offset += length;
      toLoad++;
      urok_verb_sounds[toLoad] = mp3;
    }
    urok_all_verb_sounds[pap] = urok_verb_sounds;
    if (pap == currentVerb) {
      document.getElementById("progress2").style.background = "#3C8C3E";
    }
  }

  function updateProgress2(p) {
    progress2.style.width = Math.round(p) + "%";
  }
}

function playSound3(soundf, pap, soundr) {
  var soundfile = trim(soundf);

  var type_connection = "";

  if (context && urok_all_verb_names[pap] && urok_all_verb_sounds[pap]) {
    var ss = urok_all_verb_names[pap].indexOf(soundfile);
    //document.getElementById("typeConnection").innerHTML = " «"+soundfile+"»   ";
    var ssource2 = urok_all_verb_sounds[pap][ss];
    var ssource = context.createBufferSource();
    ssource.connect(context.destination);
    if (ssource2) {
      if (ssource2 instanceof Uint8Array) {
        context.decodeAudioData(
          ssource2.buffer,

          function (buffer) {
            ssource.buffer = buffer;
            urok_all_verb_sounds[pap][ss] = ssource.buffer;

            if (ssource.noteOn) {
              ssource.noteOn(0);
            } else {
              ssource.start(0);
            }
          },
          function (err) {
            document.getElementById("progress").innerHTML =
              "error(decodeAudioData): " + err;
          }
        );
      } else {
        ssource.buffer = ssource2;
        ssource.playfunc = ssource.start || ssource.noteOn;
        ssource.playfunc(0);
      }
    } else {
      if (number_click == 1) {
        document.getElementById("log").innerHTML +=
          "неозвученные фразы: «" + soundfile + "»   " + ss;
      }
    }

    type_connection = "#3C8C3E";
  } else {
    if (floaded[pap]) {
      var soundfile_mp3 = soundfile + ".mp3";
      var soundfile_ogg = soundfile + ".ogg";
      if (lengthVerbs == 1) {
        document.getElementById("dummy").innerHTML =
          '<audio id="my-audio">' +
          '<source src="audio/g-' +
          urok +
          "/" +
          soundfile_mp3 +
          '" type="audio/mpeg" />' +
          '<source src="audio/g-' +
          urok +
          "/" +
          soundfile_ogg +
          '" type="audio/ogg" />' +
          '<embed hidden="true" autostart="true" loop="false" src="../audio/g-' +
          urok +
          "/" +
          soundfile_mp3 +
          '" />' +
          "</audio>";
      } else {
        document.getElementById("dummy").innerHTML =
          '<audio id="my-audio">' +
          '<source src="audio/g-' +
          urok +
          "/" +
          pap +
          "/" +
          soundfile_mp3 +
          '" type="audio/mpeg" />' +
          '<source src="audio/g-' +
          urok +
          "/" +
          pap +
          "/" +
          soundfile_ogg +
          '" type="audio/ogg" />' +
          '<embed hidden="true" autostart="true" loop="false" src="../audio/g-' +
          urok +
          "/" +
          pap +
          "/" +
          soundfile_mp3 +
          '" />' +
          "</audio>";
      }
      var myAudio = document.getElementById("my-audio");

      type_connection = "#CED228";
      myAudio.play();
    } else {
      if (soundr) {
        var lang = "ru";
        soundf = soundr;
      } else {
        var lang = "en";
      }
      soundf = encodeURIComponent(soundf);
      document.getElementById("dummy").innerHTML =
        '<audio id="my-audio">' +
        '<source src="http://www.english-polyglot.com/mobile/ttsgateway.php?ie=utf-8&tl=' +
        lang +
        "&q=" +
        soundf +
        '" type="audio/mpeg" />' +
        '<embed hidden="true" autostart="true" loop="false" src="http://www.english-polyglot.com/mobile/ttsgateway.php?ie=utf-8&tl=' +
        lang +
        "&q=" +
        soundf +
        '" />' +
        "</audio>";
      var myAudio = document.getElementById("my-audio");
      myAudio.play();
      type_connection = "#CA332B";
    }
  }

  document.getElementById("progress2").style.background = type_connection;
}

function trim(s) {
  s = s.replace(/-/g, " ");
  s = s.replace(/[^\w\s]|_/g, "");
  s = s.replace(/(^\s*)|(\s*$)/gi, "");
  s = s.replace(/[ ]{2,}/gi, " ");
  s = s.replace(/\n /, "\n");
  s = s.toLowerCase();
  s = s[0].toUpperCase() + s.slice(1);
  s = s.replace(/\s+/g, "-");
  return s;
}

function getElemText(node) {
  return (
    node.text ||
    node.textContent ||
    (function (node) {
      var _result = "";
      if (node == null) {
        return _result;
      }
      var childrens = node.childNodes;
      var i = 0;
      while (i < childrens.length) {
        var child = childrens.item(i);
        switch (child.nodeType) {
          case 5:
            _result += arguments.callee(child);
            break;
          case 4:
            _result += child.value;
            break;
          //break;
        }
        i++;
      }
      return _result;
    })(node)
  );
}

function change_language(j) {
  if (j != language_choice) {
    var posred = phrase_audio;
    phrase_audio = translation_audio;
    translation_audio = posred;
    language_choice = 1 - language_choice;

    if (language_choice == 0) {
      document.getElementById("conteiner").innerHTML = "&nbsp;";
      document.getElementById("conteiner3").innerHTML = "&nbsp;";
      document.getElementById("conteiner2").innerHTML = transic;

      if (sound & sound_global) {
        document.getElementById("phrase_audio").innerHTML =
          '<a id="clickPhraseAudio' +
          phrase_audio +
          '" href="javascript: void(0)" onclick="click_phrase_audio();"></a><em>&nbsp;</em>';

        document.getElementById("midline").innerHTML =
          '<a id="clickTranslationAudio' +
          translation_audio +
          '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';

        document.getElementById("translation_audio").innerHTML = dinamic;
      }

      first = "b";
      second = "a";
      third = "c";
    } else {
      document.getElementById("conteiner").innerHTML = "&nbsp;";
      document.getElementById("conteiner3").innerHTML = transic;
      document.getElementById("conteiner2").innerHTML = "&nbsp;";

      if (sound & sound_global) {
        document.getElementById("phrase_audio").innerHTML =
          '<a id="clickPhraseAudio' +
          phrase_audio +
          '" href="javascript: void(0)" onclick="click_phrase_audio();"></a><em>&nbsp;</em>';

        document.getElementById("translation_audio").innerHTML =
          '<a id="clickTranslationAudio' +
          translation_audio +
          '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';

        document.getElementById("midline").innerHTML = dinamic;
      }
      first = "a";
      second = "c";
      third = "b";
    }
    click2();
  }
}

function click_trans(j) {
  trans = j;
  if (trans) {
    transic = "&nbsp;";
    if (sound && sound_global) {
      dinamic = '<span style="padding-left:1.5em;"><em>&nbsp;</em></span>';
    } else {
      dinamic = "";
    }
  } else {
    transic = "";
    dinamic = "";
  }
  click3();
}

function click_sound(j) {
  sound = j;
  if (sound) {
    if (trans) {
      dinamic = '<span style="padding-left:1.5em;"><em>&nbsp;</em></span>';
    } else {
      dinamic = "";
    }
    document.getElementById("phrase_audio").innerHTML =
      '<a id="clickPhraseAudio' +
      phrase_audio +
      '" href="javascript: void(0)" onclick="click_phrase_audio();"></a><em>&nbsp;</em>';

    if (first == "a") {
      document.getElementById("midline").innerHTML = dinamic;
      document.getElementById("translation_audio").innerHTML =
        '<a id="clickTranslationAudio' +
        translation_audio +
        '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';
    } else {
      document.getElementById("midline").innerHTML =
        '<a id="clickTranslationAudio' +
        translation_audio +
        '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';

      document.getElementById("translation_audio").innerHTML = dinamic;
    }
  } else {
    dinamic = "";
    document.getElementById("phrase_audio").innerHTML = "";
    document.getElementById("translation_audio").innerHTML = "";
    document.getElementById("midline").innerHTML = "";
  }
}

function click_phrase_audio() {
  phrase_audio = 1 - phrase_audio;
  document.getElementById("phrase_audio").innerHTML =
    '<a id="clickPhraseAudio' +
    phrase_audio +
    '" href="javascript: void(0)" onclick="click_phrase_audio();"></a><em>&nbsp;</em>';
}

function click_translation_audio() {
  translation_audio = 1 - translation_audio;
  if (language_choice == 0) {
    document.getElementById("midline").innerHTML =
      '<a id="clickTranslationAudio' +
      translation_audio +
      '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';

    document.getElementById("translation_audio").innerHTML = dinamic;
  } else {
    document.getElementById("midline").innerHTML = dinamic;
    document.getElementById("translation_audio").innerHTML =
      '<a id="clickTranslationAudio' +
      translation_audio +
      '" href="javascript: void(0)" onclick="click_translation_audio();"></a><em>&nbsp;</em>';
  }
}

function hide_phrases(j) {
  if (j != text_visibility) {
    $("#topPage").toggle(700);
    text_visibility = j;
  }
  if (text_visibility) {
    document.getElementById("text_monitor").innerHTML = cont;
  } else {
    document.getElementById("text_monitor").innerHTML = rep;
  }
}

function start_timer(id) {
  id_timer = window.setTimeout(function () {
    document.getElementById(id).innerHTML = "";
  }, 5000);
}

//function fadeOut(id) {
//    var s = document.getElementById(id).style;
//    s.opacity = 1;
//    (function fade() {if((s.opacity-=.1)<.1) {alert('by');document.getElementById(id).innerHTML = '';s.opacity=1}else{(function(){setTimeout(function(){fade},50)})()}} )();
//	//alert(s.opacity);
//
//}

//function fadeIn (id) {
//	var s = document.getElementById(id).style;
//	s.opacity = 0;
//	(function fade1() {if ((s.opacity)>0.9) {alert('hi');s.opacity=1} else {s.opacity=s.opacity+0.1;(function(){setTimeout(function(){fade1},50)})()}})();
//	//alert(s.opacity)
//	//s.opacity=1;
//}

function buffering_sound(j) {
  buf_state = j;
  if (!buf_state) {
    document.getElementById("progress2").style.background = "rgb(120,120,120)";
    urok_all_verb_sounds = new Array();
    urok_all_verb_names = new Array();
  } else {
    block(urok, glob_name);
  }
}

function an_switch() {
  if (i == 3) {
    fadeEffect.init("ij3", 0);
    i++;
    console.log(i);
    appear();
  } //отдельный id-блок!

  var ax = document.getElementById("auxiliary"),
    an_s = document.getElementById("anons_switcher");
  //			t = document.getElementById('sw_tab'),
  //			u = document.getElementById('urok'+urok);

  anons = 1 - anons;
  if (!anons) {
    ax.style.display = "none";
    //if(urok<5){s.style.display='none'};
    an_s.innerHTML =
      '<em id="an_sw" class="arrow-r ui-icon-info" onclick="an_switch();return false;"></em>' +
      ij3;
  } else {
    ax.style.display = "block";
    //if(urok<5){s.style.display='block'};
    an_s.innerHTML =
      '<em id="an_sw" class="arrow-r ui-icon-delete" onclick="an_switch();return false;"></em>' +
      ij3;
  }

  //	var a = document.getElementById("anons_switcher"),
  //		u = document.getElementById('urok'+urok),
  //		t = document.getElementById('t'),
  //		s = document.getElementById('sw_tab');
  //
  //		anons=1-anons;
  //		if (!anons)
  //		{
  //			t.style.display=u.style.display='none'; if(urok<5){s.style.display='none'};
  //			a.innerHTML ='<em id="an_sw" class="arrow-r ui-icon-info" onclick="an_switch();return false;"></em>'+ij3;
  //		}
  //		else
  //		{
  //			t.style.display=u.style.display='block'; if(urok<5){s.style.display='block'};
  //			a.innerHTML ='<em id="an_sw" class="arrow-r ui-icon-delete" onclick="an_switch();return false;"></em>'+ij3;
  //		}
}

function r(f) {
  /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f();
}

var fadeEffect = (function () {
  return {
    init: function (id, flag, target) {
      this.elem = document.getElementById(id);
      var inn = document.getElementById("intro");
      //			var bg = window.getComputedStyle(document.querySelector('.ui-btn-icon-right'), ':after').getPropertyValue('background-color')
      clearInterval(this.elem.si);
      if (flag) {
        this.elem.style.display = "block";

        //				if(i==0||i==1){
        //				  //console.log(bg)
        //				  $('#forward').removeClass('initial').addClass('green');
        ////				  $('head').append("<style>.ui-link.ui-btn.ui-icon-arrow-r.ui-btn-icon-top:after {background-blend-mode:overlay;background-color:green;}</style>");
        //	  //			$(".ui-link .ui-btn.ui-icon-arrow-r .ui-btn-icon-top:after").css({"background-blend-mode":"overlay"});
        //	  //			$(".ui-link .ui-btn.ui-icon-arrow-r .ui-btn-icon-top:after").css({"background-color":"green"});
        //				  //console.log(bg)
        //				}
        //	if(i==3){
        //					$('head').append("<style>.arrow-r.ui-icon-delete:after {background-blend-mode:overlay;background-color:green;}</style>");
        //				}
      }
      inn.style.top = introT[i] + "em";

      this.target = target ? target : flag ? 100 : 0;
      this.flag = flag || -1;
      this.alpha = this.elem.style.opacity
        ? parseFloat(this.elem.style.opacity) * 100
        : 0;
      this.elem.si = setInterval(function () {
        fadeEffect.tween(flag);
      }, 20);
    },
    tween: function (fl) {
      if (this.alpha == this.target) {
        clearInterval(this.elem.si);
        if (!fl) {
          this.elem.style.display = "none";
        } else {
          var col = "#79af72";
          switch (i) {
            case 0:
            case 1:
              document.getElementById("forward").style.backgroundColor = col;
              break;
            case 2:
              document.getElementById("hierarhy").style.color = col;
              break;
            //					  case 1:gre_col('forward',1);break;
            //					case 1:$('#forward').addClass('green');break;
            //					  case 2:gre_col('hierarhy',1);break;
            //					case 2:$('#conteiner #hierarhy').addClass('green');break;
            case 3:
              document.getElementById("an_sw").style.backgroundColor = col;
              break;
            case 4:
              document.getElementById("verb-button").style.backgroundColor =
                col;
              break;
            case 5:
              document.getElementById("a_pageGear").style.backgroundColor = col;
              break;
            case 6:
              document.getElementById("a_pageInst").style.backgroundColor = col;
              break;
          }
        }
      } else {
        var value =
          Math.round(this.alpha + (this.target - this.alpha) * 0.05) +
          1 * this.flag;
        this.elem.style.opacity = value / 100;
        this.elem.style.filter = "alpha(opacity=" + value + ")";
        this.alpha = value;
      }
    },
  };
})();

function disappear() {
  if (i < 7) {
    var col = "";
    switch (i) {
      case 0:
      case 1:
        document.getElementById("forward").style.backgroundColor = col;
        break;
      case 2:
        document.getElementById("hierarhy").style.color = col;
        break;
      //			case 1:gre_col('forward',0);break;
      //			case 1:$('#forward').removeClass('green');break;
      //			case 2:gre_col('hierarhy',0);break;
      //			case 2:$('#conteiner #hierarhy').removeClass('green');break;
      case 3:
        document.getElementById("an_sw").style.backgroundColor = col;
        break;
      case 4:
        document.getElementById("verb-button").style.backgroundColor = col;
        break;
      case 5:
        document.getElementById("a_pageGear").style.backgroundColor = col;
        break;
      case 6:
        document.getElementById("a_pageInst").style.backgroundColor = col;
        break;
    }
    //		if(i==0||i==1){
    //		  $('#forward').removeClass('green').addClass('initial');
    ////		  $('head').append("<style>.ui-link.ui-btn.ui-icon-arrow-r.ui-btn-icon-top:after {background-blend-mode:initial;background-color:initial;}</style>");
    ////		  $(".ui-btn-icon-right:after").css({"background-blend-mode":"initial"});
    ////		  $(".ui-btn-icon-right:after").css({"background-color":"initial"});
    //		}
    if (i == 3) {
      fadeEffect.init("ij3", 0);
      //$('head').append("<style>.arrow-r.ui-icon-delete:after {background-blend-mode:initial;background-color:initial;}</style>");
    } else {
      fadeEffect.init("intro", 0);
    }
    i++;
    console.log(i);
  }
}

function appear() {
  if (i < 7) {
    (function () {
      setTimeout(function () {
        if (i == 4) {
          if ((urok > 2) & (urok < 7)) {
            i++;
          }
        }

        if (i == 3) {
          fadeEffect.init("ij3", 1);
        } else {
          int.innerHTML = intro[i];
          fadeEffect.init("intro", 1);
        }
      }, 1000);
    })();
  }
}

//function gre_col (id, sw) {
//	var col = sw ? '#79af72' : '';
//	document.getElementById(id).style.color=col;
//	if(i!=2){document.getElementById(id).style.backgroundColor=col};
//	//document.getElementById(id).style.backgroundBlendMode='overlay';
//}

//function gre_col (id, sw) {
//var switched = true;
//var col1 = sw ? '#79af72' : '';
//
//	if (sw) {
//		  setInterval(function () {
//			  var col = switched ? '#79af72' : '';
//			  document.getElementById(id).style.color=col;
//			  if(i!=2){document.getElementById(id).style.backgroundColor=col};
//			  //document.getElementById(id).style.backgroundBlendMode='overlay';
//			  switched = !switched;
//		  }, 500);
//	}
//	else{
//			  document.getElementById(id).style.color=col1;
//			  if(i!=2){document.getElementById(id).style.backgroundColor=col1};
//	}
//}

function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
}

function checkCookie(name) {
  var value = getCookie(name);
  //	console.log(value);

  if (value != null && value != "") {
    //		if (value==1) {setCookie(name,2,365);i=0}
    //		else{i=7}
    i = 7;
  } else {
    setCookie(name, 1, 365);
    i = 0;
  }
  //	console.log('i=',i);
  //	console.log(value);
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

function change_color(color) {
  if (color) {
    $("#color999").remove();
  } else {
    $("head").append(
      '<style id="color999">.ui-bar-a,.ui-page-theme-a .ui-bar-inherit,html .ui-bar-a .ui-bar-inherit,html .ui-body-a .ui-bar-inherit,html body .ui-group-theme-a .ui-bar-inherit{background-color:#1d1d1d;border-color:#1b1b1b;color:#fff;text-shadow:0 1px 0 #111}.ui-overlay-a,.ui-page-theme-a,.ui-page-theme-a .ui-panel-wrapper{background-color:#252525;border-color:#454545;color:#fff;text-shadow:0 1px 0 #111}.ui-body-a,.ui-page-theme-a .ui-body-inherit,html .ui-bar-a .ui-body-inherit,html .ui-body-a .ui-body-inherit,html body .ui-group-theme-a .ui-body-inherit,html .ui-panel-page-container-a{background-color:#2a2a2a;border-color:#1d1d1d;color:#fff;text-shadow:0 1px 0 #111}.ui-page-theme-a a,html .ui-bar-a a,html .ui-body-a a,html body .ui-group-theme-a a{color:#fff}.ui-page-theme-a a:visited,html .ui-bar-a a:visited,html .ui-body-a a:visited,html body .ui-group-theme-a a:visited{color:#fff}.ui-page-theme-a a:hover,html .ui-bar-a a:hover,html .ui-body-a a:hover,html body .ui-group-theme-a a:hover{color:#fff}.ui-page-theme-a a:active,html .ui-bar-a a:active,html .ui-body-a a:active,html body .ui-group-theme-a a:active{color:#000}.ui-page-theme-a .ui-btn,html .ui-bar-a .ui-btn,html .ui-body-a .ui-btn,html body .ui-group-theme-a .ui-btn,html head+body .ui-btn.ui-btn-a,.ui-page-theme-a .ui-btn:visited,html .ui-bar-a .ui-btn:visited,html .ui-body-a .ui-btn:visited,html body .ui-group-theme-a .ui-btn:visited,html head+body .ui-btn.ui-btn-a:visited{background-color:#333;border-color:#1f1f1f;color:#fff;text-shadow:0 1px 0 #111}.ui-page-theme-a .ui-btn:hover,html .ui-bar-a .ui-btn:hover,html .ui-body-a .ui-btn:hover,html body .ui-group-theme-a .ui-btn:hover,html head+body .ui-btn.ui-btn-a:hover{background-color:#373737;border-color:#1f1f1f;color:#fff;text-shadow:0 1px 0 #111}.ui-page-theme-a .ui-btn:active,html .ui-bar-a .ui-btn:active,html .ui-body-a .ui-btn:active,html body .ui-group-theme-a .ui-btn:active,html head+body .ui-btn.ui-btn-a:active{background-color:#404040;border-color:#1f1f1f;color:#fff;text-shadow:0 1px 0 #111}.ui-page-theme-a .ui-btn.ui-btn-active,html .ui-bar-a .ui-btn.ui-btn-active,html .ui-body-a .ui-btn.ui-btn-active,html body .ui-group-theme-a .ui-btn.ui-btn-active,html head+body .ui-btn.ui-btn-a.ui-btn-active,.ui-page-theme-a .ui-checkbox-on:after,html .ui-bar-a .ui-checkbox-on:after,html .ui-body-a .ui-checkbox-on:after,html body .ui-group-theme-a .ui-checkbox-on:after,.ui-btn.ui-checkbox-on.ui-btn-a:after,.ui-page-theme-a .ui-flipswitch-active,html .ui-bar-a .ui-flipswitch-active,html .ui-body-a .ui-flipswitch-active,html body .ui-group-theme-a .ui-flipswitch-active,html body .ui-flipswitch.ui-bar-a.ui-flipswitch-active,.ui-page-theme-a .ui-slider-track .ui-btn-active,html .ui-bar-a .ui-slider-track .ui-btn-active,html .ui-body-a .ui-slider-track .ui-btn-active,html body .ui-group-theme-a .ui-slider-track .ui-btn-active,html body div.ui-slider-track.ui-body-a .ui-btn-active{background-color:#2ad;border-color:#2ad;color:#fff;text-shadow:0 1px 0 #08b}.ui-page-theme-a .ui-radio-on:after,html .ui-bar-a .ui-radio-on:after,html .ui-body-a .ui-radio-on:after,html body .ui-group-theme-a .ui-radio-on:after,.ui-btn.ui-radio-on.ui-btn-a:after{border-color:#2ad}.ui-page-theme-a .ui-btn:focus,html .ui-bar-a .ui-btn:focus,html .ui-body-a .ui-btn:focus,html body .ui-group-theme-a .ui-btn:focus,html head+body .ui-btn.ui-btn-a:focus,.ui-page-theme-a .ui-focus,html .ui-bar-a .ui-focus,html .ui-body-a .ui-focus,html body .ui-group-theme-a .ui-focus,html head+body .ui-btn-a.ui-focus,html head+body .ui-body-a.ui-focus{-webkit-aox-shadow:0 0 12px #2ad;-moz-aox-shadow:0 0 12px #2ad;box-shadow:0 0 12px #2ad}</style>'
    );
  }
}

function change_table(table) {
  tab_index = table;
  //var a = document.getElementById('t');
  console.log("urok=", urok);
  var c = urok,
    b = "";
  if (urok == 2) {
    c = 1;
  }

  switch (table) {
    case 0:
      b = tabl[c][0];
      break;
    case 1:
      b = tabl[c][1];
      break;
    case 2:
      b = tabl[c][2];
      break;
  }
  console.log("b=", b);
  document.getElementById("t").innerHTML = '<img src="img/' + b + '" />';
}
