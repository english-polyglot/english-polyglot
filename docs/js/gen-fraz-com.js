/*! Phrase generator v1.2 | Copyright 2012, 2015 Mr.Poligloto | www.english-polyglot.com/generator-fraz.html */

function refreshPage() {
  jQuery.mobile.changePage(window.location.href, {
    allowSamePageTransition: true,
    transition: "none",
    reloadPage: true,
  });
}

refreshPage();

var message_top = "";
var message_bottom = "";
var message_middle = "";
var random_number = 0;
var number_click = 0;
var messages_length = 0;
var first = "a";
var second = "c";
var third = "b";
var c1 = "&nbsp;";
var c2 = "&nbsp;";
var c3 = "&nbsp;";
var j = -1;
var aa = 0;
var bb = 0;
var currentVerb = 0;
var numberOfSelectedVerbs = 0;
var lengthVerbs;
var AR = new Array();
var arrIndexes = new Array();
var arrIndexes2 = new Array();
var randNum = new Array();
var data_top = "";
var data_mid = "";
var data_bot = "";
var dinamic = "";
var transic = "";

var language_choice = 1;

var trans = 0;

var sound = 1;
var sound_global = 1;

var phrase_audio = 1;
var translation_audio = 1;
var mesmid = "";
var mesmid2 = "";
var verbAll = 0;
var verbAllCounter = 0;
var forw = 1;
var bac = 0;
var en = "en";
var ru = "ru";
var urok = 1;
var urok_all_verb_sounds = new Array();
var urok_all_verb_names = new Array();
//var all_uroks_sounds = new Array;// попытка запомнить все глаголы всех уроков
//var all_uroks_names = new Array;

var can_orient = 0;
var can_orient_global = 0;
var text_visibility = 1;
var id_timer;
//  var type_connection = 0;
// start module check-mp3
var audio_name = "fff.mp3";
var phrase_name = "nnn-mp3";
var floaded = new Array(); //false
var show = false;
var buf_state = 1;
var glob_name = "";
//var color_strip = new Array;
var contextClass =
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext;

if (contextClass) {
  var context = new contextClass();
  check_mp3();
}

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

var xhr;
var DB = "";

window.history.pushState(null, null, "generator-fraz.html");

$("[name=radio2]").change(function () {
  can_orient_global = 1 - can_orient_global;
});

$.mobile.defaultPageTransition = "none";

$("#dbl").bind("vclick", function () {
  alert("hi");
  if (show) {
    click1plus1();
  }
});

$("#page1").on("swipeleft", function () {
  if (text_visibility) {
    $("#topPage").toggle(700);
    text_visibility = 0;
    $("#radio4_1").prop("checked", true).checkboxradio("refresh");
    $("#radio4_0").prop("checked", false).checkboxradio("refresh");
  }
  if (!text_visibility) {
    document.getElementById("text_monitor").innerHTML =
      "Swipe&rarr;right to show text";
    clearTimeout(id_timer);
    start_timer("text_monitor");
  } else {
    document.getElementById("text_monitor").innerHTML =
      "Swipe&rarr;right to show text";
    start_timer("text_monitor");
  }
});

$("#page1").on("swiperight", function () {
  if (!text_visibility) {
    $("#topPage").toggle(700);
    text_visibility = 1;
    $("#radio4_0").prop("checked", true).checkboxradio("refresh");
    $("#radio4_1").prop("checked", false).checkboxradio("refresh");
  }
  if (!text_visibility) {
    document.getElementById("text_monitor").innerHTML =
      "Swipe&larr;left to hide text";
    start_timer("text_monitor");
  } else {
    document.getElementById("text_monitor").innerHTML =
      "Swipe&larr;left to hide text";
    clearTimeout(id_timer);
    start_timer("text_monitor");
  }
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

function button_home() {
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
  $(".ui-mobile [data-role=page]").css("max-width", i);
}

function block(gen, name) {
  urok_all_verb_sounds = new Array(); // очистка нужна для работы второго и третьего способа озвучания
  urok_all_verb_names = new Array();
  //  all_uroks_sounds = new Array; // попытка запомнить все глаголы всех уроков
  //  all_uroks_names = new Array;

  function updateProgress(p) {
    progress2.style.width = Math.round(p) + "%";
  }

  can_orient = 1;
  urok = gen;
  glob_name = name;
  document.getElementById("nameLesson").innerHTML =
    gen + ".&nbsp;&nbsp;" + name.innerHTML;
  $(":jqmData(role='page')").attr("data-title", document.title);
  document.getElementById("verb_all").innerHTML = "";
  document.getElementById("verb_counter").innerHTML = "";
  document.getElementById("progress2").style.background = "rgb(120,120,120)"; //
  if (gen == 1) {
    document.getElementById("verb").innerHTML =
      '<option value="0" selected="selected">love</option>' +
      '<option value="1">live</option>' +
      '<option value="2">work</option>' +
      '<option value="3">open</option>' +
      '<option value="4">close</option>' +
      '<option value="5">see</option>' +
      '<option value="6">come</option>' +
      '<option value="7">go</option>' +
      '<option value="8">know</option>';
  }

  if (gen == 2) {
    document.getElementById("verb").innerHTML =
      '<option value="0"  selected="selected">questions</option>' +
      '<option value="1">ask</option>' +
      '<option value="2">travel</option>' +
      '<option value="3">hope</option>' +
      '<option value="4">help</option>' +
      '<option value="5">answer</option>' +
      '<option value="6">take</option>' +
      '<option value="7">speak</option>' +
      '<option value="8">give</option>';
  }

  if (gen == 3) {
    document.getElementById("verb").innerHTML =
      '<option value="0"  selected="selected"></option>';
    $("#selector").css({ display: "none" });
  }

  if (gen == 4) {
    document.getElementById("verb").innerHTML =
      '<option value="0"  selected="selected"></option>';
    $("#selector").css({ display: "none" });
  }

  if (gen == 5) {
    document.getElementById("verb").innerHTML =
      '<option value="0"  selected="selected"></option>';
    $("#selector").css({ display: "none" });
  }

  if (gen == 6) {
    document.getElementById("verb").innerHTML =
      '<option value="0"  selected="selected"></option>';
    $("#selector").css({ display: "none" });
    //if ($(window).width()>728) {$( document ).ready( function(){setMaxWidth('950px');});}
  }

  if (gen == 7) {
    document.getElementById("verb").innerHTML =
      '<option value="0"  selected="selected">buy</option>' +
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

  if (gen == 8) {
    document.getElementById("verb").innerHTML =
      '<option value="0"  selected="selected">go</option>' +
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

  DB = "DB-" + gen + ".xml";
  xhr = loadFile(0, DB, updateProgress, function () {
    start_urok();
  });
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
        alert("ошибка: " + e.description);
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
  messages_length = xhr.responseXML
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
}

function getRandomArray(min, max) {
  // Генератор неповторяющихся случайных чисел
  // На деле это массив случайных индексов.
  // Индексы и будут указывать на элемент в базе даных
  var A = new Array();
  while (max >= min) A.push(max--);
  A.sort(function () {
    return 0.5 - Math.random();
  });
  return A;
}

function click1minus1() {
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

  // Итерация глагольного указателя
  if ((numberOfSelectedVerbs > 1) & (bac != 0)) {
    randNum[currentVerb]--;
  }
  if (numberOfSelectedVerbs == 1) {
    randNum[currentVerb]--;
  }
  // Итерация указателей в массиве индексов
  if (randNum[currentVerb] < 0) {
    randNum[currentVerb] = AR[currentVerb].length - 1;
  }

  random_number = AR[currentVerb][randNum[currentVerb]];
  // определяем номер фразы
  click1();
}

function click1plus1() {
  bac = 0;
  number_click = number_click + 1;

  if (number_click == 1) {
    // если клик первый то
    verbAllCounter++;

    if (verbAllCounter > verbAll) {
      verbAllCounter = 1;
    }

    j++; // Итерация глагольного указателя

    if (j > numberOfSelectedVerbs - 1) {
      j = 0;
    }

    if (bb == j) {
      forw = 1;
    }
    currentVerb = arrIndexes[j];
    aa = j;
    // Итерация указателей в массиве индексов
    if ((numberOfSelectedVerbs > 1) & (forw != 0)) {
      randNum[currentVerb]++;
    }
    if (numberOfSelectedVerbs == 1) {
      randNum[currentVerb]++;
    }
    if (randNum[currentVerb] > AR[currentVerb].length - 1) {
      randNum[currentVerb] = 0;
    }
    random_number = AR[currentVerb][randNum[currentVerb]]; // определяем номер фразы
  }
  click1();
}

function click1() {
  if (number_click == 1) {
    // если клик первый то
    document.getElementById("verb_counter").innerHTML = verbAllCounter;
    message_top = getElemText(
      xhr.responseXML
        .getElementsByTagName("m")
        [currentVerb].getElementsByTagName(first)[random_number]
    ); // берем данные для верхней строки
    message_middle = getElemText(
      xhr.responseXML
        .getElementsByTagName("m")
        [currentVerb].getElementsByTagName(second)[random_number]
    ); // берем данные для средней строки
    message_bottom = getElemText(
      xhr.responseXML
        .getElementsByTagName("m")
        [currentVerb].getElementsByTagName(third)[random_number]
    ); // берем данные для нижней строки

    if (first == "a") {
      // если язык англ. то
      data_top =
        "<em>" +
        c1 +
        '</em><span><a href="javascript: void(0)" onclick="playSound3(message_top, currentVerb);">' +
        message_top +
        "</a></span>"; // 'фраза' = верхняя строка

      if (sound & phrase_audio & sound_global) {
        playSound3(message_top, currentVerb);
      }
      data_mid = "<em>" + c2 + "</em><span>" + message_middle + "</span>"; // 'транскрипция' = средняя строка
      data_bot = "<em>" + c3 + "</em><span></span>"; // в качестве 'перевода' = пустая строка
    } // если язык русский то
    else {
      mesmid = message_middle + " ru";
      data_top =
        "<em>" +
        c1 +
        '</em><span><a href="javascript: void(0)" onclick="playSound3(mesmid, currentVerb, message_top);">' +
        message_top +
        "</a></span>"; // 'фраза' = верхняя строка

      if (sound & phrase_audio & sound_global) {
        playSound3(mesmid, currentVerb, message_top);
      }
      data_mid = "<em>" + c3 + "</em><span></span>"; // в качестве 'перевода' = пустая строка
      data_bot = "<em>" + c2 + "</em><span></span>"; // 'транскрипция' = пустая строка
    }

    document.getElementById("conteiner").innerHTML = data_top;
  } // если клик второй то
  else {
    if (first == "a") {
      // если язык англ. то
      mesmid2 = message_top + " ru";
      data_bot =
        "<em>" +
        c3 +
        '</em><span><a href="javascript: void(0)" onclick="playSound3(mesmid2, currentVerb, message_bottom);">' +
        message_bottom +
        "</a></span>"; // в качестве 'перевода' = нижняя строка

      if (sound & translation_audio & sound_global) {
        playSound3(mesmid2, currentVerb, message_bottom);
      }
    } // если язык русский то
    else {
      data_mid =
        "<em>" +
        c3 +
        '</em><span><a href="javascript: void(0)" onclick="playSound3(message_middle, currentVerb);">' +
        message_middle +
        "</a></span>"; // в качестве 'перевода' = средняя строка

      if (sound & translation_audio & sound_global) {
        playSound3(message_middle, currentVerb);
      }
      data_bot = "<em>" + c2 + "</em><span>" + message_bottom + "</span>"; // 'транскрипция' = нижняя строка
    }
    number_click = 0; // обнуляем счетчик кликов
  }
  // теперь определяем нужна ли транскрипция?
  if (trans) {
    // если транскрипция нужна
    if (first == "b") {
      // если (язык - русский и клик первый) то
      if (number_click == 1) {
        data_bot = "<em>" + c2 + "</em><span></span>"; // 'транскрипция' = пустая строка
      } // если (язык - русский и клик второй) то
      else {
        data_bot = "<em>" + c2 + "</em><span>" + message_bottom + "</span>"; // 'транскрипция' = нижняя строка
      }
    } // если (язык - английский) то
    else {
      data_mid = "<em>" + c2 + "</em><span>" + message_middle + "</span>"; // 'транскрипция' = средняя строка
    }
  } // если транскрипция не нужна
  else {
    if (first == "a") {
      // если (язык - английский) то
      data_mid = "<span></span>"; // строки 'транскрипция' - нет
    } // если - русский то
    else {
      data_bot = "<span></span>"; // строки 'транскрипция' - нет
    }
  }
  document.getElementById("conteiner3").innerHTML = data_mid;
  document.getElementById("conteiner2").innerHTML = data_bot;
}

function click2() {
  number_click = 0;
}

function click3() {
  // если был клик по чекбоксу "транскрипция"
  if (trans) {
    // если флажок транскрипция стоит
    if (message_top == "") {
      // если чекбокс кликнули до нажатия кнопки старт
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
    } // если по чекбоксу кликнули после нажатия кнопки старт
    else {
      if (document.getElementById("conteiner").innerHTML != "&nbsp;") {
        if (first == "b") {
          // если язык - русский
          document.getElementById("translation_audio").innerHTML = dinamic;
          if (number_click == 1) {
            data_bot = "<em>" + c2 + "</em><span></span>"; // "транскрипция" = пустая строка
          } //  второй клик
          else {
            data_bot = "<em>" + c2 + "</em><span>" + message_bottom + "</span>"; // "транскрипция" = нижняя строка
          }
          document.getElementById("conteiner2").innerHTML = data_bot;
        } else {
          document.getElementById("midline").innerHTML = dinamic;
          data_mid = "<em>" + c2 + "</em><span>" + message_middle + "</span>"; // "транскрипция" = нижняя строка
          document.getElementById("conteiner3").innerHTML = data_mid;
        }
      } else {
        if (first == "b") {
          // если язык - русский
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
      // если язык - русский
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
        xhr.responseXML.getElementsByTagName("m")[i].getElementsByTagName("d")
          .length;
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
  randNum = new Array(); // массив итераторов каждого из массива глагольных указателей

  for (var i = 0; i < lengthVerbs; i++) {
    if (arrIndexes2[i] == 1) {
      ML = xhr.responseXML
        .getElementsByTagName("m")
        [i].getElementsByTagName("d").length;
      // длина глагольного блока
      AR[i] = getRandomArray(0, ML - 1); // внесение массива в массив
    } else {
      AR[i] = []; // внесение массива в массив
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
    //			document.getElementById("progress").innerHTML = 'Loaded. Process...';
    var ss = new DataView(dataSound);
    var offset = 0;
    while (offset < ss.byteLength) {
      var length = ss.getUint32(offset, true);
      offset += 4;
      var mp3 = extractBuffer(dataSound, offset, length);
      //			  alert(mp3+' '+mp3.buffer)
      offset += length;
      toLoad++;
      //			  document.getElementById("progress").innerHTML = 'Decoding sound ' + toLoad + ' ...';
      urok_verb_sounds[toLoad] = mp3;
    }
    //document.getElementById("progress").innerHTML = 'Decoded '+pap;
    urok_all_verb_sounds[pap] = urok_verb_sounds;
    //color_strip[pap] = '#3C8C3E';
    if (pap == currentVerb) {
      document.getElementById("progress2").style.background = "#3C8C3E";
    }
    //alert('pap='+pap+'toLoad='+toLoad);
  }

  function updateProgress2(p) {
    progress2.style.width = Math.round(p) + "%";
  }
}

function playSound3(soundf, pap, soundr) {
  var soundfile = trim(soundf);

  if (context && urok_all_verb_names[pap] && urok_all_verb_sounds[pap]) {
    //alert('массив звуков есть'+urok_all_verb_names[pap]);

    var ss = urok_all_verb_names[pap].indexOf(soundfile);
    //alert(ss+' '+soundfile);
    var ssource2 = urok_all_verb_sounds[pap][ss];
    var ssource = context.createBufferSource();
    ssource.connect(context.destination);

    if (ssource2 instanceof Uint8Array) {
      // alert(ssource2.buffer);
      context.decodeAudioData(
        ssource2.buffer,

        function (buffer) {
          ssource.buffer = buffer;
          //document.getElementById("typeConnection").innerHTML = buffer.duration;
          //alert(buffer.duration );
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
      //				alert(ssource.noteOn);
      ssource.buffer = ssource2;
      ssource.playfunc = ssource.start || ssource.noteOn;
      ssource.playfunc(0);
    }

    type_connection = "#3C8C3E"; //green
  } else {
    // document.getElementById("progress").innerHTML = '';
    // document.getElementById("progress").innerHTML = floaded;

    if (floaded[pap]) {
      var soundfile_mp3 = soundfile + ".mp3";
      var soundfile_ogg = soundfile + ".ogg";
      //alert('context='+context+' массива звуков нет - звук = ../audio/g-'+urok+'/'+pap+'/'+soundfile_mp3);
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

      type_connection = "#CED228"; //yellow
      myAudio.play();
      //window.setTimeout(function(){myAudio.play();}, 100);
      //ie не всегда воспроизводит звуки
    } else {
      if (soundr) {
        var lang = "ru";
        soundf = soundr;
      } else {
        var lang = "en";
      }
      soundf = encodeURIComponent(soundf);
      //			    document.getElementById("progress").innerHTML = 'http://www.english-polyglot.com/mobile/ttsgateway.php?ie=utf-8&tl='+lang+'&q='+soundf+' '+soundr;

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
      //				myAudio.load();
      //				window.setTimeout(function(){myAudio.play();}, 100);
      myAudio.play();
      //				alert('звук с TTS. lang = '+lang+' soundf = '+ soundf);
      type_connection = "#CA332B"; //red
    }
    //			 	http://www.english-polyglot.com/mobile/ttsgateway.php?ie=utf-8&tl=en&q=spruce
    //				http://translate.google.com/translate_tts?ie=utf-8&tl=en&q=spruce
  }

  document.getElementById("progress2").style.background = type_connection;
}

function trim(s) {
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
          case 1: // ELEMENT_NODE
          case 5: // ENTITY_REFERENCE_NODE
            _result += arguments.callee(child);
            break;
          case 3: // TEXT_NODE
          case 2: // ATTRIBUTE_NODE
          case 4: // CDATA_SECTION_NODE
            _result += child.value;
            break;
          case 6: // ENTITY_NODE
          case 7: // PROCESSING_INSTRUCTION_NODE
          case 8: // COMMENT_NODE
          case 9: // DOCUMENT_NODE
          case 10: // DOCUMENT_TYPE_NODE
          case 11: // DOCUMENT_FRAGMENT_NODE
          case 12: // NOTATION_NODE
            // skip
            break;
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
      //стирание экрана
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
      //стирание экрана
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
  trans = j; //1-trans
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
  sound = j; //1-sound
  if (sound) {
    if (trans) {
      dinamic = '<span style="padding-left:1.5em;"><em>&nbsp;</em></span>';
    } else {
      dinamic = "";
    }
    // два значка динамик в начале строки - моментальное изменение состояния
    document.getElementById("phrase_audio").innerHTML =
      '<a id="clickPhraseAudio' +
      phrase_audio +
      '" href="javascript: void(0)" onclick="click_phrase_audio();"></a><em>&nbsp;</em>';

    // два значка динамик в конце строки - моментальное состояние
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
    text_visibility = j; //1 - text_visibility
    if (text_visibility) {
      document.getElementById("text_monitor").innerHTML = "";
    } else {
      document.getElementById("text_monitor").innerHTML = "Text is hidden";
    }
  }
}

function start_timer(id) {
  id_timer = window.setTimeout(function () {
    document.getElementById(id).innerHTML = "";
  }, 5000);
}

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
