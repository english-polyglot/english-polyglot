function popup(
  url,
  width,
  height,
  windowtitle,
  textdescription,
  pronunciation
) {
  var ua = navigator.userAgent;
  var newwin;

  //		if (ua.match(/iPhone|iPod|Android|Blackberry.*WebKit/i))
  //		{

  var left = (screen.width - width) / 2;
  var top = (screen.height - height) / 2;
  var params = "width=" + width + ", height=" + height;
  params += ", top=" + top + ", left=" + left;
  params += ", directories=no";
  params += ", location=no";
  params += ", menubar=no";
  params += ", resizable=yes";
  params += ", scrollbar=yes";
  params += ", status=no";
  params += ", toolbar=no";

  newwin = window.open("answer.html", "windowwin6", params);

  if (url == "") {
    //newwin = window.open('answer.html','_blank');

    newwin.onload = function () {
      newwin.document.head.innerHTML =
        '<meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" /><title>' +
        windowtitle +
        "</title>";
      newwin.document.getElementById("content_answer").innerHTML =
        '<div style="font-family: Arial, Helvetica, sans-serif; font-size:150%; text-align:center;"><div style="background:url(img/li-uncolorer-rt.gif) no-repeat right top #e5f2ee;">' +
        '<div style="background:url(img/li-uncolorer-rb.gif) no-repeat right bottom;">' +
        '<div style="background:url(img/li-uncolorer-lb.gif) no-repeat left bottom;">' +
        '<div style="background:url(img/li-uncolorer-lt.gif) no-repeat left top; margin-right:10px; padding:5px 0 5px 0;">' +
        "</div><div><strong>&nbsp;" +
        textdescription +
        "</strong></div><div>&nbsp;" +
        pronunciation +
        "</div>" +
        '<img src="img/x.gif" width="1" height="10" /></div></div></div>' +
        '<form style="text-align:center;margin:1em">' +
        '<input style="font-size:100%;" type="button" value="   Done   " onClick="window.close();return false;"></form></div>' +
        "<style>#ad_answer{opacity:1}</style>";
    };
  } else {
    if (
      getextension(url) == "jpg" ||
      getextension(url) == "gif" ||
      getextension(url) == "png"
    ) {
      newwin = window.open("answer.html", "_blank");
      newwin.onload = function () {
        newwin.document.head.innerHTML =
          '<meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" /><title>' +
          windowtitle +
          "</title>";
        newwin.document.body.style.margin = 0;
        newwin.document.body.style.textAlign = "center";
        newwin.document.body.innerHTML =
          '<img src="' +
          url +
          '" style="height:100%">' +
          '<p style="font-size:150%; text-align:center"><form><input type="button" value="   Done   " onClick="window.close();return false;"></form></p>';
      };
    } else {
      newwin = window.open(url, "_blank");
      newwin.onload = function () {
        newwin.document.head.innerHTML +=
          '<meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" /><title>' +
          windowtitle +
          "</title>";
      };
    }
  }

  //		}
  //		else
  //		{
  //
  //			var left   = (screen.width  - width)/2;
  //			var top    = (screen.height - height)/2;
  //			var params = 'width='+width+', height='+height;
  //			params += ', top='+top+', left='+left;
  //			params += ', directories=no';
  //			params += ', location=no';
  //			params += ', menubar=no';
  //			params += ', resizable=yes';
  //			params += ', scrollbar=yes';
  //			params += ', status=no';
  //			params += ', toolbar=no';
  //
  //
  //
  //			newwin=window.open(url, 'windowwin6', params);
  //
  //			if (url=="")
  //			{
  //				   newwin.document.open();
  //				   newwin.document.write('<html><head><title>'+windowtitle+'</title>'+
  //				   '<meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" /></head>'+
  //				   '<body onblur="self.onblur();" style="font-family: Arial, Helvetica, sans-serif; font-size:75%; text-align:center;">'+
  //				 '<div style="background:url(img/li-uncolorer-rt.gif) no-repeat right top #e5f2ee;">'+
  //		  '<div style="background:url(img/li-uncolorer-rb.gif) no-repeat right bottom;">'+
  //		  '<div style="background:url(img/li-uncolorer-lb.gif) no-repeat left bottom;">'+
  //		  '<div style="background:url(img/li-uncolorer-lt.gif) no-repeat left top; margin-right:10px; padding:5px 0 5px 0;">'+
  //		  '</div><div><strong>'+textdescription+'</strong></div><div>'+pronunciation+'</div>'+
  //		  '<img src="img/x.gif" width="1" height="10" /></div></div></div>'+
  //		  '<p style="font-size:150%;"><form><input type="button" value="   Done   " onClick="window.close();return false;"></form></p>'+
  //				   '</body></html>');
  //				   newwin.document.close();
  //
  //			}
  //			else
  //			{
  //		//			if((getextension(url)=='jpg')||(getextension(url)=='gif')||(getextension(url)=='png'))
  //		//			{
  //					if ((url.split('.').pop()=='jpg')||(url.split('.').pop()=='gif')||(url.split('.').pop()=='png'))
  //					{
  //						 newwin.document.open();
  //						 newwin.document.write('<html><head><title>'+windowtitle+'</title>'+
  //						 '<meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" /></head>'+
  //						 '<body style="padding:0;margin:0; text-align:center;"><div><img src="'+url+
  //						 '" style="width:100%"/></div>'+
  //						 '<p style="font-size:150%;"><form><input type="button" value="   Done   " onClick="window.close();return false;"></form></p>'+
  //						 '</body></html>');
  //						 newwin.document.close();
  //					 }
  //					else
  //					{
  //						//document.location.href = url;
  //						newwin.document.head.innerHTML = '<meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" /><title>'+windowtitle+'</title>';
  //					}
  //			}
  //
  //			if (window.focus) {newwin.focus()}
  //			return false;
  //
  //		}
}

function getextension(filename) {
  return /[^.]+$/.exec(filename);
}

var tooltip = {
  /* НАЧАЛО НАСТРОЕК */
  options: {
    attr_name: "tooltip", // наименование создаваемого tooltip'ого атрибута
    blank_text: "", // текст для ссылок с target="_blank"
    newline_entity: "  ", // укажите пустую строку (""), если не хотите использовать в tooltip'ах многострочность; ежели хотите, то укажите тот символ или символы, которые будут заменяться на перевод строки
    max_width: 0, // максимальная ширина tooltip'а в пикселах; обнулите это значение, если ширина должна быть нелимитирована
    delay: 100, // задержка при показе tooltip'а в миллисекундах
    skip_tags: ["link", "style", "img"], // теги, у которых не обрабатываем атрибуты alt и title
  },
  /* КОНЕЦ НАСТРОЕК */

  t: document.createElement("DIV"),
  c: null,
  g: false,
  canvas: null,

  m: function (e) {
    if (tooltip.g) {
      var x = window.event
        ? event.clientX +
          (tooltip.canvas.scrollLeft || document.body.scrollLeft)
        : e.pageX;
      var y = window.event
        ? event.clientY + (tooltip.canvas.scrollTop || document.body.scrollTop)
        : e.pageY;
      tooltip.a(x, y);
    }
  },

  d: function () {
    tooltip.canvas = document.getElementsByTagName(
      document.compatMode && document.compatMode == "CSS1Compat"
        ? "HTML"
        : "BODY"
    )[0];
    tooltip.t.setAttribute("id", "tooltip");
    document.body.appendChild(tooltip.t);
    if (tooltip.options.max_width)
      tooltip.t.style.maxWidth = tooltip.options.max_width + "px"; // all but ie
    var a =
      document.all && !window.opera
        ? document.all
        : document.getElementsByTagName("*"); // in opera 9 document.all produces type mismatch error
    var l = a.length;
    for (var i = 0; i < l; i++) {
      if (
        !a[i] ||
        tooltip.options.skip_tags.in_array(a[i].tagName.toLowerCase())
      )
        continue;

      var tooltip_title = a[i].getAttribute("title"); // returns form object if IE & name="title"; then IE crashes; so...
      if (tooltip_title && typeof tooltip_title != "string") tooltip_title = "";

      var tooltip_alt = a[i].getAttribute("alt");
      var tooltip_blank =
        a[i].getAttribute("target") &&
        a[i].getAttribute("target") == "_blank" &&
        tooltip.options.blank_text;
      if (tooltip_title || tooltip_blank) {
        a[i].setAttribute(
          tooltip.options.attr_name,
          tooltip_blank
            ? tooltip_title
              ? tooltip_title + " " + tooltip.options.blank_text
              : tooltip.options.blank_text
            : tooltip_title
        );
        if (a[i].getAttribute(tooltip.options.attr_name)) {
          a[i].removeAttribute("title");
          if (tooltip_alt && a[i].complete) a[i].removeAttribute("alt");
          tooltip.l(a[i], "mouseover", tooltip.s);
          tooltip.l(a[i], "mouseout", tooltip.h);
        }
      } else if (tooltip_alt && a[i].complete) {
        a[i].setAttribute(tooltip.options.attr_name, tooltip_alt);
        if (a[i].getAttribute(tooltip.options.attr_name)) {
          a[i].removeAttribute("alt");
          tooltip.l(a[i], "mouseover", tooltip.s);
          tooltip.l(a[i], "mouseout", tooltip.h);
        }
      }
      if (!a[i].getAttribute(tooltip.options.attr_name) && tooltip_blank) {
        //
      }
    }
    document.onmousemove = tooltip.m;
    window.onscroll = tooltip.h;
    tooltip.a(-99, -99);
  },

  _: function (s) {
    s = s.replace(/\&/g, "&amp;");
    s = s.replace(/\</g, "&lt;");
    s = s.replace(/\>/g, "&gt;");
    return s;
  },

  s: function (e) {
    if (typeof tooltip == "undefined") return;
    var d = window.event ? window.event.srcElement : e.target;
    if (!d.getAttribute(tooltip.options.attr_name)) return;
    var s = d.getAttribute(tooltip.options.attr_name);
    if (tooltip.options.newline_entity) {
      var s = tooltip._(s);
      s = s.replace(
        eval("/" + tooltip._(tooltip.options.newline_entity) + "/g"),
        "<br>"
      );
      tooltip.t.innerHTML = s;
    } else {
      if (tooltip.t.firstChild) tooltip.t.removeChild(tooltip.t.firstChild);
      tooltip.t.appendChild(document.createTextNode(s));
    }
    tooltip.c = setTimeout(function () {
      tooltip.t.style.visibility = "visible";
    }, tooltip.options.delay);
    tooltip.g = true;
  },

  h: function (e) {
    if (typeof tooltip == "undefined") return;
    tooltip.t.style.visibility = "hidden";
    if (!tooltip.options.newline_entity && tooltip.t.firstChild)
      tooltip.t.removeChild(tooltip.t.firstChild);
    clearTimeout(tooltip.c);
    tooltip.g = false;
    tooltip.a(-99, -99);
  },

  l: function (o, e, a) {
    if (o.addEventListener) o.addEventListener(e, a, false);
    // was true--Opera 7b workaround!
    else if (o.attachEvent) o.attachEvent("on" + e, a);
    else return null;
  },

  a: function (x, y) {
    var w_width = tooltip.canvas.clientWidth
      ? tooltip.canvas.clientWidth +
        (tooltip.canvas.scrollLeft || document.body.scrollLeft)
      : window.innerWidth + window.pageXOffset;
    var w_height = window.innerHeight
      ? window.innerHeight + window.pageYOffset
      : tooltip.canvas.clientHeight +
        (tooltip.canvas.scrollTop || document.body.scrollTop); // should be vice verca since Opera 7 is crazy!

    if (document.all && document.all.item && !window.opera)
      tooltip.t.style.width =
        tooltip.options.max_width &&
        tooltip.t.offsetWidth > tooltip.options.max_width
          ? tooltip.options.max_width + "px"
          : "auto";

    var t_width = tooltip.t.offsetWidth;
    var t_height = tooltip.t.offsetHeight;

    tooltip.t.style.left = x + 8 + "px";
    tooltip.t.style.top = y + 8 + "px";

    if (x + t_width > w_width) tooltip.t.style.left = w_width - t_width + "px";
    if (y + t_height > w_height)
      tooltip.t.style.top = w_height - t_height + "px";
  },
};

Array.prototype.in_array = function (value) {
  var l = this.length;
  for (var i = 0; i < l; i++) if (this[i] === value) return true;
  return false;
};

var root =
  window.addEventListener || window.attachEvent
    ? window
    : document.addEventListener
    ? document
    : null;
if (root) {
  if (root.addEventListener) root.addEventListener("load", tooltip.d, false);
  else if (root.attachEvent) root.attachEvent("onload", tooltip.d);
}

function trim(s) {
  s = s.replace(/-/g, " ");
  s = s.replace(/[^\w\s]|_/g, "");
  s = s.replace(/(^\s*)|(\s*$)/gi, "");
  s = s.replace(/[ ]{2,}/gi, " ");
  s = s.replace(/\n /, "\n");
  s = s.toLowerCase();
  //s = s[0].toUpperCase() + s.slice(1);
  s = s.replace(/\s+/g, "-");
  return s;
}

function playSound0(anchor) {
  var soundfile = trim(anchor.innerHTML);
  soundfile = soundfile.toLowerCase();
  var soundfile_mp3 = soundfile + ".mp3";
  var soundfile_ogg = soundfile + ".ogg";
  document.getElementById("dummy").innerHTML =
    '<audio id="my-audio">' +
    '<source src="audio/' +
    soundfile_mp3 +
    '" type="audio/mpeg" />' +
    '<source src="audio/' +
    soundfile_ogg +
    '" type="audio/ogg" />' +
    '<embed hidden="true" autostart="true" loop="false" src="audio/' +
    soundfile_mp3 +
    '" />' +
    "</audio>";

  var myAudio = document.getElementById("my-audio");
  myAudio.play();
}

function playSound2(soundfile_mp3, soundfile_ogg) {
  document.getElementById("dummy").innerHTML =
    '<audio id="my-audio">' +
    '<source src="audio/' +
    soundfile_mp3 +
    '" type="audio/mpeg" />' +
    '<source src="audio/' +
    soundfile_ogg +
    '" type="audio/ogg" />' +
    '<embed hidden="true" autostart="true" loop="false" src="audio/' +
    soundfile_mp3 +
    '" />' +
    "</audio>";

  var myAudio = document.getElementById("my-audio");
  myAudio.play();
}

function playSound3(soundf, pap) {
  var soundfile = trim(soundf);
  var soundfile_mp3 = soundfile + ".mp3";
  var soundfile_ogg = soundfile + ".ogg";
  document.getElementById("dummy").innerHTML =
    '<audio id="my-audio">' +
    '<source src="audio/' +
    pap +
    "/" +
    soundfile_mp3 +
    '" type="audio/mpeg" />' +
    '<source src="audio/' +
    pap +
    "/" +
    soundfile_ogg +
    '" type="audio/ogg" />' +
    '<embed hidden="true" autostart="true" loop="false" src="audio/' +
    pap +
    "/" +
    soundfile_mp3 +
    '" />' +
    "</audio>";

  var myAudio = document.getElementById("my-audio");
  myAudio.play();
}

var audio_name = "fff.mp3";
var phrase_name = "nnn-mp3";
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
    function (buffer) {
      preload_pap(urok_num);
    },
    function (e) {
      audio_name = "fff.ogg";
      phrase_name = "nnn-ogg";

      preload_pap(urok_num);
    }
  );
}

var urok_all_verb_sounds = new Array();
var urok_all_verb_names = new Array();
//  var all_uroks_sounds = new Array;
//  var all_uroks_names = new Array;

function loadFile(url, callback) {
  //progressCallback,

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
    xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");

    xhr.onreadystatechange = function () {
      try {
        if (xhr.readyState === 4) {
          var status = xhr.status;
          if ((status >= 200 && status < 300) || status === 304) {
            callback(xhr.response);

            delete xhr;
            xhr = null;
          } else {
            //document.getElementById("progress").innerHTML = '';
            //alert(url+" не удалось получить данные:\n"+ xhr.status);
          }
        }
      } catch (e) {
        //alert(' ошибка: '+ e.description );
      }
    };

    //			  xhr.onprogress = function(e) {
    //
    //				  if(e.lengthComputable) {
    //					  var done = e.position || e.loaded, total = e.totalSize || e.total;
    //
    //					  progressCallback( done*100/total );
    //				  }
    //			  };

    xhr.send();
  }
  return xhr;
}

function preload_pap(pap) {
  var urok_verb_sounds = [];
  var urok_verb_names = [];

  var toLoad = (loaded = -1);
  var phrase = "audio/u-" + pap + "/" + phrase_name;
  var audio = "audio/u-" + pap + "/" + audio_name;

  var requestPhrase = loadFile(phrase, function () {
    //updateProgress2,

    urok_verb_names = requestPhrase.responseText.split(",");

    urok_all_verb_names[pap] = urok_verb_names;
  });

  var requestAudio = loadFile(audio, function () {
    //updateProgress2,

    processConcatenatedFile(requestAudio.response);
  });

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
  }

  //		function updateProgress2( p ) {
  //			progress2.style.width = Math.round( p ) + '%';
  //		};
}

function playSound(anchor) {
  var pap = urok_num;
  var soundfile = trim(anchor.innerHTML);

  //		if (typeof anchor === 'string' || anchor instanceof String)
  //			{var soundfile = trim (anchor)}
  //		else
  //			{var soundfile = trim (anchor.innerHTML)}
  //
  //		soundfile = soundfile.toLowerCase();

  //var type_connection = '';

  if (context && urok_all_verb_names[pap] && urok_all_verb_sounds[pap]) {
    var ss = urok_all_verb_names[pap].indexOf(soundfile);
    var ssource2 = urok_all_verb_sounds[pap][ss];
    var ssource = context.createBufferSource();
    ssource.connect(context.destination);

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

    //type_connection = '#3C8C3E';
  } else {
    if (!0) {
      var soundfile_mp3 = soundfile + ".mp3";
      var soundfile_ogg = soundfile + ".ogg";
      document.getElementById("dummy").innerHTML =
        '<audio id="my-audio">' +
        '<source src="audio/u-' +
        pap +
        "/" +
        soundfile_mp3 +
        '" type="audio/mpeg" />' +
        '<source src="audio/u-' +
        pap +
        "/" +
        soundfile_ogg +
        '" type="audio/ogg" />' +
        '<embed hidden="true" autostart="true" loop="false" src="audio/u-' +
        pap +
        "/" +
        soundfile_mp3 +
        '" />' +
        "</audio>";
      var myAudio = document.getElementById("my-audio");
      myAudio.play();
      //type_connection = '#CED228';
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
      //type_connection = '#CA332B';
    }
  }

  //document.getElementById("progress2").style.background = type_connection;
}

// -----------------------------начало драг-энд-дроп

function DragObject(element) {
  element.dragObject = this;

  dragMaster.makeDraggable(element);

  this.onDragMove = function (x, y) {
    element.style.top = y - mouseOffset.y + "px";
    element.style.left = x - mouseOffset.x + "px";
  };
}

function fixEvent(e) {
  // получить объект событие для IE
  e = e || window.event;

  // добавить pageX/pageY для IE
  if (e.pageX == null && e.clientX != null) {
    var html = document.documentElement;
    var body = document.body;
    e.pageX =
      e.clientX +
      ((html && html.scrollLeft) || (body && body.scrollLeft) || 0) -
      (html.clientLeft || 0);
    e.pageY =
      e.clientY +
      ((html && html.scrollTop) || (body && body.scrollTop) || 0) -
      (html.clientTop || 0);
  }

  // добавить which для IE
  if (!e.which && e.button) {
    e.which = e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0;
  }

  return e;
}

function getOffset(elem) {
  if (elem.getBoundingClientRect) {
    return getOffsetRect(elem);
  } else {
    return getOffsetSum(elem);
  }
}

function getOffsetRect(elem) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docElem = document.documentElement;

  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
  var clientTop = docElem.clientTop || body.clientTop || 0;
  var clientLeft = docElem.clientLeft || body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

function getOffsetSum(elem) {
  var top = 0,
    left = 0;
  while (elem) {
    top = top + parseInt(elem.offsetTop);
    left = left + parseInt(elem.offsetLeft);
    elem = elem.offsetParent;
  }

  return { top: top, left: left };
}

function closeObject(element) {
  document.getElementById(element).style.display = "none";
}

function showObject(element) {
  document.getElementById(element).style.display = "table";
}

var dragMaster = (function () {
  var dragObject;
  var mouseOffset;

  // получить сдвиг target относительно курсора мыши
  function getMouseOffset(target, e) {
    var docPos = getPosition(target);
    return { x: e.pageX - docPos.x, y: e.pageY - docPos.y };
  }

  function mouseUp() {
    dragObject = null;

    //очистить обработчики, т.к перенос закончен
    document.onmousemove = tooltip.m; //было null, но возникал конфликт с тултипом
    document.onmouseup = null;
    document.ondragstart = null;
    document.body.onselectstart = null;
  }

  function mouseMove(e) {
    e = fixEvent(e);

    with (dragObject.style) {
      position = "absolute";
      top = e.pageY - mouseOffset.y + "px";
      left = e.pageX - mouseOffset.x + "px";
    }
    return false;
  }

  function mouseDown(e) {
    e = fixEvent(e);
    if (e.which != 1) return;

    dragObject = this;

    // получить сдвиг элемента относительно курсора мыши
    mouseOffset = getMouseOffset(this, e);

    // эти обработчики отслеживают процесс и окончание переноса
    document.onmousemove = mouseMove;
    document.onmouseup = mouseUp;

    // отменить перенос и выделение текста при клике на тексте
    document.ondragstart = function () {
      return false;
    };
    document.body.onselectstart = function () {
      return false;
    };

    return false;
  }

  return {
    makeDraggable: function (element) {
      element.onmousedown = mouseDown;
    },
  };
})();

function getPosition(e) {
  var left = 0;
  var top = 0;

  while (e.offsetParent) {
    left += e.offsetLeft;
    top += e.offsetTop;
    e = e.offsetParent;
  }

  left += e.offsetLeft;
  top += e.offsetTop;

  return { x: left, y: top };
}

// - блок расшаривания

Share = {
  go: function (a, type, url, title, img, text) {
    type = type || "facebook";
    url = url || location.href;
    title = title || document.title;
    img = img || "";
    text = text || "";

    var urlSet = this[type](url, title, img, text);
    var isOpened = this.popup(urlSet);
    if (null === isOpened) {
      a.href = urlSet;
      return true;
    }
    return false;
  },
  vkontakte: function (purl, ptitle, pimg, text) {
    url = "http://vkontakte.ru/share.php?";
    url += "url=" + encodeURIComponent(purl);
    url += "&title=" + encodeURIComponent(ptitle);
    url += "&description=" + encodeURIComponent(text);
    url += "&image=" + encodeURIComponent(pimg);
    url += "&noparse=true";
    return url;
  },
  odnoklassniki: function (purl, text) {
    url = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1";
    url += "&st.comments=" + encodeURIComponent(text);
    url += "&st._surl=" + encodeURIComponent(purl);
    return url;
  },
  facebook: function (purl, ptitle, pimg, text) {
    url = "http://www.facebook.com/sharer.php?s=100";
    url += "&p[title]=" + encodeURIComponent(ptitle);
    url += "&p[summary]=" + encodeURIComponent(text);
    url += "&p[url]=" + encodeURIComponent(purl);
    url += "&p[images][0]=" + encodeURIComponent(pimg);
    return url;
  },
  twitter: function (purl, ptitle) {
    url = "http://twitter.com/share?";
    url += "text=" + encodeURIComponent(ptitle);
    url += "&url=" + encodeURIComponent(purl);
    url += "&counturl=" + encodeURIComponent(purl);
    return url;
  },
  mailru: function (purl, ptitle, pimg, text) {
    url = "http://connect.mail.ru/share?";
    url += "url=" + encodeURIComponent(purl);
    url += "&title=" + encodeURIComponent(ptitle);
    url += "&description=" + encodeURIComponent(text);
    url += "&imageurl=" + encodeURIComponent(pimg);
    return url;
  },
  google: function (purl) {
    url = "https://plus.google.com/share?";
    url += "url=" + encodeURIComponent(purl);
    //url += '}';
    //url += '&title='       + encodeURIComponent(ptitle);
    //			url += '&description=' + encodeURIComponent(text);
    //			url += '&imageurl='    + encodeURIComponent(pimg);
    return url;
  },
  popup: function (url) {
    return window.open(url, "", "toolbar=0,status=0,width=626,height=436");
  },
};

// -->

// <-- цветовая пробежка по кнопкам после просмотра флэш-видео
function flain() {
  for (var i = 1; i <= 3; i++) {
    (function (index) {
      setTimeout(function () {
        document.getElementById("m" + index).style.background = "#000000";
        document.getElementById("m" + index).style.color = "#E0012E";
      }, i * 100);
    })(i);
  }

  setTimeout(function () {
    for (var i = 1; i <= 3; i++) {
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

var adcont =
  '<div id="progress2"><div class="info0"><div class="info"><span> &nbsp;</span><br /><span>Пожалуйста, отключите блокиратор рекламы...</span><br /><span> &nbsp;</span></div></div></div>';
if (adblocker) {
  document.getElementById("prog1").innerHTML = adcont;
  document.getElementById("prog2").innerHTML = adcont;
  document.getElementById("prog3").innerHTML = adcont;
}

//<div class="info"><span>В дело верное. </span><br /><span class="rost1">Рубль кровный свой. </span><br /><span class="rost2">Не бойся класть. </span></div><div class="info"><span>Мысли скверные </span><br /><span class="rost1">Из головы долой! </span><br /><span class="rost2">Здесь некому красть!</span></div>

var tabl = [
  ,
  [
    "tablica-glagolov-petrova-image.gif",
    "tablica-glagolov-petrova-image-black.gif",
    "red-tablica-glagolov-petrova-image.gif",
    "table-base.gif",
  ],
  ,
  [
    "tablica-glagola-to-be-petrova-image.gif",
    "black-tablica-glagola-to-be-petrova-image.gif",
    "green-tablica-glagola-to-be-petrova-image.gif",
    "table-be.gif",
  ],
  [
    "tablica-glagola-to-be-ing-image.gif",
    "tablica-glagola-to-be-ing-image-black.gif",
    "tablica-glagola-to-be-ing-image-green.gif",
    "table-be.gif",
  ],
  ,
  ,
  [
    "short-tablica-glagolov-petrova-image.gif",
    "black-short-tablica-glagolov-petrova-image.gif",
    "red-short-tablica-glagolov-petrova-image.gif",
    "table-base-small-3.gif",
  ],
];

var tab_index = 0;

function change_table(table) {
  if (tab_index != table) {
    tab_index = table;
    if (urok_num < 5 || urok_num == 7) {
      var c = urok_num;
      var b = "";
      if (urok_num == 2) {
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
        case 3:
          b = tabl[c][3];
          break;
      }
      document.getElementById("t").src = "img/" + b; //'<img src="img/'+b+'"  />';
      document.getElementById("c").innerHTML = tabl_com[table];
    }
  }
}

function change_table_many(table, row, _max) {
  for (var i = 0; i < _max; i++) {
    if (i == table) {
      document.getElementById(row + i).style.display = "block";
    } else {
      document.getElementById(row + i).style.display = "none";
    }
  }
}

//---------------начало скроллинга

var to_top = document.getElementById("stt"),
  to_bottom = document.getElementById("uroki"),
  don_btn = document.getElementById("dbt"),
  stop_scroll = 0,
  curentScrollTop,
  position = document.documentElement.scrollTop || document.body.scrollTop;

document.getElementById("uroki").href = "javascript:void(0)";

to_top.innerHTML = "";
to_top.className = "scroll-to-top fixed-hidden";
don_btn.className = "donateButton fixed-hidden2";

window.addEventListener(
  "scroll",
  function () {
    curentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
  },
  false
);

to_top.addEventListener(
  "click",
  function (e) {
    e.stopPropagation();
    (function scrollAnimate() {
      if (curentScrollTop > 0 && !stop_scroll) {
        //scrollTo(0);
        setTimeout(function () {
          window.scrollBy(0, -Math.abs(curentScrollTop) / 20);
          scrollAnimate();
        }, 10);
      }
    })();
  },
  false
);

to_top.addEventListener(
  "dblclick",
  function (e) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  false
);

to_bottom.addEventListener(
  "click",
  function (e) {
    e.stopPropagation();
    scrollTo(document.getElementById("top_scroll").offsetHeight);
  },
  false
);

// stop animation on wheel scroll down
window.addEventListener(
  "wheel",
  function (e) {
    if (e.deltaY > 0) {
      stop_scroll = 1;
      setTimeout(function () {
        stop_scroll = 0;
      }, 200);
    }
  },
  false
);

function scrollTo(e) {
  var h = document.documentElement;
  if (h.scrollTop === 0) {
    var t = h.scrollTop;
    ++h.scrollTop;
    h = t + 1 === h.scrollTop-- ? h : document.body;
  }
  scrollToX(h, h.scrollTop, e, 0);
}
function scrollToX(e, a, b, t) {
  if (t < 0 || t > 1) return;
  k = t - 1;
  e.scrollTop = a - (a - b) * (k * k * k + 1);
  t += 0.001 * 20;
  setTimeout(function () {
    scrollToX(e, a, b, t);
  }, 20);
}

var JD = {};

JD.debounce = function (wait, func, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 200);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

JD.lastName = function () {
  if (curentScrollTop > 1200) {
    to_top.className = "scroll-to-top rotate";
  } else {
    to_top.className = "scroll-to-top fixed-hidden";
  }

  var scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;

  if (curentScrollTop + window.innerHeight + 300 >= scrollHeight) {
    don_btn.className = "donateButton left50";
  } else {
    don_btn.className = "donateButton fixed-hidden2";
  }

  if (curentScrollTop > position) {
    stop_scroll = 1;
    setTimeout(function () {
      stop_scroll = 0;
    }, 200);
  }
  position = curentScrollTop;
};

window.addEventListener("scroll", JD.debounce(250, JD.lastName));
