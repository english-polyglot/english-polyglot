function popup(
  url,
  width,
  height,
  windowtitle,
  textdescription,
  pronunciation
) {
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
  if (url == "") {
    var newwin = window.open(url, "_blank", params);
    newwin.document.open();
    newwin.document.write(
      "<html><title>" +
        windowtitle +
        "</title>" +
        '<head><meta name="viewport" content="width=device-width, user-scalable=no"></head>' +
        '<body onblur="self.onblur();" style="font-family: Arial, Helvetica, sans-serif; font-size:75%; text-align:center;">' +
        '<div style="background:url(img/li-uncolorer-rt.gif) no-repeat right top #e5f2ee;">' +
        '<div style="background:url(img/li-uncolorer-rb.gif) no-repeat right bottom;">' +
        '<div style="background:url(img/li-uncolorer-lb.gif) no-repeat left bottom;">' +
        '<div style="background:url(img/li-uncolorer-lt.gif) no-repeat left top; margin-right:10px; padding:5px 0 5px 0;">' +
        "</div><div><strong>" +
        textdescription +
        "</strong></div><div>" +
        pronunciation +
        "</div>" +
        '<img src="img/x.gif" width="1" height="10" /></div></div></div>' +
        '<p></p><form><input type="button" value="   Done   " onClick="setTimeout(function() { window.close(); },50);" /></form><p></p></body>'
    );

    newwin.document.close();
  } else {
    if (
      getextension(url) == "jpg" ||
      getextension(url) == "gif" ||
      getextension(url) == "png"
    ) {
      var newwin = window.open(url, "_blank", params);
      //
      //			 var script = document.createElement('img');
      //			 script.src = url;
      //
      //			 // теперь добавляем скрипт в HEAD, он будет загружен и выполнен
      //			 document.documentElement.children[1].appendChild(script);

      //			 document.body.innerHTML='<div><img src="'+url+'" style="width:100%;"></div>';
      // newwin.onload = function(){this.document.head.innerHTML='<meta name="viewport" content="width=device-width, user-scalable=no">'+
      //			 '<title>'+windowtitle+'</title>';
      //			 //this.document.body.innerHTML='<div><img src="'+url+'" style="width:100%;"></div>';
      //			 this.document.body.innerHTML+='<p></p><form><input type="button" value="   Done   " onClick="setTimeout(function() { window.close(); },50);" /></form><p></p>';
      //
      //
      //			 };

      newwin.document.open();
      newwin.document.write(
        "<html><title>" +
          windowtitle +
          "</title>" +
          '<head><meta name="viewport" content="width=device-width, user-scalable=no"></head>' +
          '<body style="padding:0;margin:0; text-align:center;"><div><img src="' +
          url +
          '" style="width:100%;"></div>' +
          '<p></p><form><input type="button" value="   Done   " onClick="setTimeout(function() { window.close(); },50);" /></form><p></p>' +
          "</body></html>"
      );
      newwin.document.close();
    } else {
      var newwin = window.open(url, "_blank", params);
      newwin.onload = function () {
        this.document.head.innerHTML +=
          '<meta name="viewport" content="width=device-width, user-scalable=no">';
        this.document.body.innerHTML +=
          '<p></p><form style="font-size:150%; text-align:center;"><input type="button" value="   Done   " onClick="setTimeout(function() { window.close(); },50);" /></form><p></p>';
      };
      //newwin.document.open(url, 'windowwin5', params);
      //newwin.document.getElementsByTagName('div').innerHTML = '<form><input type="button" value="   Done   " onClick="self.close()"></form>';
      //			var newp=newwin.document.createElement('p');
      //			newp='<form><input type="button" value="   Done   " onClick="self.close()"></form>';
      //			var headdy=document.head
      //			headdy.innerHTML = '<meta name="viewport" content="width=device-width, user-scalable=no">';
      //			boddy.style.width = "100%";

      //			var script = document.createElement('script');
      //script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      //
      //// теперь добавляем скрипт в HEAD, он будет загружен и выполнен
      //document.documentElement.children[0].appendChild(script);

      //newwin.document.open();
      //newwin.document.body.write('<p style="font-size:150%;"><form><input type="button" value="   Done   "'+
      //			' onClick="self.close()"></form></p>');
      //</body></html>');
      // newwin.document.close();
    }
  }

  if (window.focus) {
    newwin.focus();
  }
  return false;
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
    skip_tags: ["link", "style"], // теги, у которых не обрабатываем атрибуты alt и title
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
        "<br />"
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
  s = s.replace(/[^\w\s]|_/g, "");
  s = s.replace(/(^\s*)|(\s*$)/gi, "");
  s = s.replace(/[ ]{2,}/gi, " ");
  s = s.replace(/\n /, "\n");
  //s = s.toLowerCase();
  s = s.replace(/\s+/g, "-");
  return s;
}

function playSound(anchor) {
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

function scrollToTop() {
  var timeOut;
  if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
    window.scrollBy(0, -100);
    timeOut = setTimeout("scrollToTop()", 1);
  } else clearTimeout(timeOut);
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
  document.getElementById(element).style.display = "";
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

    // очистить обработчики, т.к перенос закончен
    document.onmousemove = null;
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
