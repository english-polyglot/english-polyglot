(function () {
  function async_load() {
    var d = document,
      h = /^http:/.test(d.location) ? "http" : "https",
      a = [],
      s = "script",
      m = [
        "platform.twitter.com/widgets.js",
        "connect.facebook.net/en_US/all.js",
        "userapi.com/js/api/openapi.js",
        "connect.mail.ru/js/loader.js",
        "connect.ok.ru/connect.js",
      ],
      x = d.getElementsByTagName(s)[0];
    for (var j = 0; j < 5; j++) {
      a[j] = d.createElement(s);
      a[j].async = 1;
      a[j].src = h + "://" + m[j];
      x.parentNode.insertBefore(a[j], x);
    }

    a[0].onload = _ga.trackTwitter;
    a[4].onload = a[4].onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState == "loaded" ||
        this.readyState == "complete"
      ) {
        if (!this.executed) {
          this.executed = true;
          setTimeout(function () {
            OK.CONNECT.insertShareWidget(
              "ok_shareWidget",
              document.URL,
              "{'width':165,'height':37,'st':'rounded','sz':20,'ck':1}"
            );
          }, 0);
        }
      }
    };
  }

  if (window.attachEvent) window.attachEvent("onload", async_load);
  else window.addEventListener("load", async_load, false);
})();

// Google Search
(function () {
  var cx = "partner-pub-4595809153827928:9033747066";
  var gcse = document.createElement("script");
  gcse.type = "text/javascript";
  gcse.async = false;
  gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(gcse, s);
})();
window.onload = function () {
  setTimeout(function () {
    document.getElementById("gsc-i-id1").removeAttribute("tooltip");
    document.getElementById("gsc-i-id1").placeholder = "Поиск по сайту";
  }, 0);
};

// Facebook initializing function
window.fbAsyncInit = function () {
  FB.init({
    appId: "107859652683773",
    status: true,
    cookie: true,
    xfbml: true,
    version: "v2.7",
  });
  // Call google Analytics Social Tracking
  _ga.trackFacebook();
};
// Vkontakte initializing function
window.vkAsyncInit = function () {
  VK.init({ apiId: 3755698, onlyWidgets: true });
  VK.Widgets.Like("vk_like", { type: "button", height: 20 });

  // Call Google Analytics Social Tracking
  _ga.trackVkontakte();
};
