!function($, e) {
    function t(i) {
        d.$header.addClass("is__moving");
        var n = i;
        if ($("#header .header__bg").css({
            background: "none"
        }),
        n.hasClass("insite__top") && TweenMax.to("#header", .6, {
            y: -55,
            ease: "easeInOutCirc"
        }),
        "_blank" != n.attr("target")) {
            var t = n.attr("data-color");
            d.$blind.show().removeClass("origin100").addClass("origin0").addClass(t),
            TweenMax.fromTo("#blind", .6, {
                scaleX: 0
            }, {
                scaleX: 1,
                ease: "easeInOutCirc",
                onComplete: function() {
                    e.location = n.attr("href"),
                    target = "_self"
                }
            })
        }
    }
    var d;
    e.Common = d,
    d = d || {
        DEBUG: !1,
        URL_QUERY: {},
        is_fade: !0,
        Page: null,
        Window: {
            $window: null,
            $document: null,
            width: 0,
            height: 0
        },
        LAYOUT_MODE: "pc",
        user_agent: null,
        loaded_img_len: 0,
        img_len: 0,
        img_src_ary: [],
        is_intro_skip: !1,
        $body: null,
        timeout_timer: null,
        $header: null,
        is_show_pickup: !1,
        setupOnce: function() {
            if (d.trace("Common -> setupOnce"),
            d.$body = $("body"),
            d.$header = $("#header"),
            d.$blind = $("#blind"),
            d.$loader = $("#preloader"),
            d.$side = $("#side"),
            d.$footer = $("#footer"),
            d.Window.$window = $(e),
            d.Window.$document = $(document),
            d.Window.width = d.Window.$window.width(),
            d.Window.height = d.Window.$window.height(),
            d.URL_QUERY = d.getURLQuery(),
            d.user_agent = d.setUserAgent(),
            d.Window.width <= 767 ? d.LAYOUT_MODE = "sp" : d.user_agent.Mobile ? d.LAYOUT_MODE = "sp" : d.LAYOUT_MODE = "pc",
            $(e, document, "html,body").scrollTop(0),
            $("html,body").animate({
                scrollTop: 0
            }, "1"),
            "sp" == d.LAYOUT_MODE)
                for (var i = 0; i < $(".switch").length; i++)
                    $(".switch").eq(i).attr("src", $(".switch").eq(i).attr("src").replace("_pc", "_sp"));
            d.$header.addClass("is__moving"),
            d.ResizeEvent.init(),
            d.setHoverEvent(),
            d.showPreLoader()
        },
        getURLQuery: function() {
            var e = location.href
              , n = e.split("?");
            if (n.length < 2)
                return !1;
            params = n[1].split("&");
            var t = [];
            for (i = 0; i < params.length; i++)
                neet = params[i].split("="),
                t.push(neet[0]),
                t[neet[0]] = neet[1];
            return t
        },
        setHoverEvent: function() {
            var i = function(e) {
                return {
                    Tablet: -1 != e.indexOf("windows") && -1 != e.indexOf("touch") || -1 != e.indexOf("ipad") || -1 != e.indexOf("android") && -1 == e.indexOf("mobile") || -1 != e.indexOf("firefox") && -1 != e.indexOf("tablet") || -1 != e.indexOf("kindle") || -1 != e.indexOf("silk") || -1 != e.indexOf("playbook"),
                    Mobile: -1 != e.indexOf("windows") && -1 != e.indexOf("phone") || -1 != e.indexOf("iphone") || -1 != e.indexOf("ipod") || -1 != e.indexOf("android") && -1 != e.indexOf("mobile") || -1 != e.indexOf("firefox") && -1 != e.indexOf("mobile") || -1 != e.indexOf("blackberry"),
                    iOS: -1 != e.indexOf("iphone") || -1 != e.indexOf("ipod") || -1 != e.indexOf("ipad")
                }
            }(e.navigator.userAgent.toLowerCase());
            i.iOS ? $("a,.c-hover").bind({
                touchstart: function() {
                    $(this).addClass("hover")
                },
                touchend: function() {
                    $(this).removeClass("hover")
                }
            }) : $("a,.c-hover").bind({
                mouseover: function() {
                    $(this).addClass("hover")
                },
                mouseout: function() {
                    $(this).removeClass("hover")
                }
            })
        },
        initPreLoader: function() {
            return d.trace("PRELOADER -> initPreLoader()"),
            void d.hidePreLoader();
        },
        setPreLoader: function() {
            var e = this;
            d.trace("PRELOADER -> setPreLoader()");
            for (var i = 0; i < this.img_len; i++) {
                var n = $("img:eq(" + i + ")").attr("src");
                e.img_src_ary.push(n)
            }
            d.trace(e.img_src_ary.length),
            $(document).smartpreload({
                images: e.img_src_ary,
                oneachimageload: function(i) {
                    e.loaded_img_len++,
                    d.onLoadUpdate()
                },
                onloadall: function() {
                    d.trace("PRELOADER :: All item is loaded."),
                    d.hidePreLoader()
                }
            })
        },
        onLoadUpdate: function() {
            var e = this;
            e.loaderd_per = Math.floor(100 / e.img_src_ary.length * e.loaded_img_len);
            d.trace("PRELOADER :: " + e.loaderd_per + "% Loaded"),
            e.loaded_img_len == e.img_src_ary.length && d.trace("PRELOADER :: All item is loaded.")
        },
        showPreLoader: function() {
            d.trace("PRELOADER -> showPreloader"),
            d.$body.css({
                overflow: "hidden"
            }),
            $("#top-page").length > 0 ? d.$loader.show() : d.$loader.remove(),
            d.initPreLoader()
        },
        hidePreLoader: function() {
            d.trace("PRELOADER -> hidePreLoader"),
            this.init()
        },
        reload_count: 0,
        reload_count_max: 2,
        init: function() {
            return d.trace("Common -> init()"),
            clearTimeout(d.timeout_timer),
            d.timeout_timer = null,
            !d.Page && this.reload_count < this.reload_count_max ? (this.reload_count++,
            void setTimeout(d.init, 500)) : (d.trace("Common settings -> " + d.Page),
            d.Page && setTimeout(function() {
                d.Page.setupOnce()
            }, 30),
            d.buttonEvent())
        },
        buttonEvent: function() {
            d.trace("Common -> buttonEvent()");
            var e = !1;
            $("#hamBtn a").on("click", function(i) {
                i.preventDefault(),
                e ? (e = !1,
                d.$body.css({
                    overflow: "visible"
                }),
                $(this).removeClass("active"),
                d.$header.removeClass("is__active"),
                $("#headerNav").css({
                    display: "none"
                })) : (e = !0,
                d.$body.css({
                    overflow: "hidden"
                }),
                $(this).addClass("active"),
                d.$header.addClass("is__active"),
                $("#headerNav").css({
                    display: "block"
                }))
            }),
            $("#headerNav .header__nav__parent").on("click", function(e) {
                e.preventDefault(),
                $(this).parent(".is__mega").find(".header__nav__sub").slideToggle(300)
            }),
            $(".ancor").on("click", function(e) {
                e.preventDefault();
                var i = $(this).attr("href");
                d.autoScroll(i, 800, 0, 0)
            });
        },
        autoScroll: function(e, i, n, t) {
            d.trace("Common -> autoScroll()");
            var o, a = $(e);
            "#" != e && (o = $(e).offset().top,
            d.trace(o),
            a.velocity("stop").velocity("scroll", {
                duration: i,
                delay: n,
                easing: "easeInOutQuart",
                offset: t
            }))
        },
        is_charaDetail: !1,
        charaDetailH: 0,
        is_modal_ann: !1,
        ResizeEvent: {
            init: function() {
                $("#charaDetail").length > 0 && (d.is_charaDetail = !0),
                $("#charaDetailTDD").length > 0 && (d.is_charaDetail = !0),
                d.Window.$window.on("resize", d.ResizeEvent.onResize).trigger("resize")
            },
            onResize: function(e) {
                d.Window.width = d.Window.$window.width(),
                d.Window.height = d.Window.$window.height(),
                d.Window.width <= 767 ? d.LAYOUT_MODE = "sp" : d.user_agent.Mobile ? d.LAYOUT_MODE = "sp" : d.LAYOUT_MODE = "pc",
                d.is_modal_ann && d.ResizeEvent.onSetTopModalSize(),
                "pc" == d.LAYOUT_MODE && d.is_charaDetail && (charaDetailH = $("#details").offset().top + $("#details").height() + 100,
                d.Window.height >= charaDetailH ? $("#detailVisual, #detailSpeaker").css({
                    height: d.Window.height
                }) : $("#detailVisual, #detailSpeaker").css({
                    height: charaDetailH
                }))
            }
        },
        getParam: function(e) {
            var n = location.href;
            if (parameters = n.split("?"),
            parameters.length < 2)
                return !1;
            params = parameters[1].split("&");
            var t = [];
            for (i = 0; i < params.length; i++)
                neet = params[i].split("="),
                t.push(neet[0]),
                t[neet[0]] = neet[1];
            var o = t[e];
            return o
        },
        setUserAgent: function() {
            d.trace("Common -> setUserAgent()");
            var i = e.navigator.userAgent.toLowerCase()
              , n = e.navigator.appVersion.toLowerCase()
              , t = "unknown";
            return -1 != i.indexOf("msie") ? t = -1 != n.indexOf("msie 6.") ? "ie6" : -1 != n.indexOf("msie 7.") ? "ie7" : -1 != n.indexOf("msie 8.") ? "ie8" : -1 != n.indexOf("msie 9.") ? "ie9" : -1 != n.indexOf("msie 10.") ? "ie10" : "ie" : -1 != i.indexOf("trident/7") ? t = "ie11" : -1 != i.indexOf("chrome") ? t = "chrome" : -1 != i.indexOf("safari") ? t = "safari" : -1 != i.indexOf("opera") ? t = "opera" : -1 != i.indexOf("firefox") && (t = "firefox"),
            d.$body.addClass(t),
            -1 != i.indexOf("mobile") && d.$body.addClass("mobile"),
            -1 != i.indexOf("android") && d.$body.addClass("android"),
            function(e) {
                var i = e.indexOf("trident/7") > -1 || e.indexOf("msie") > -1 && -1 == e.indexOf("opera");
                return {
                    Tablet: -1 != e.indexOf("windows") && -1 != e.indexOf("touch") || -1 != e.indexOf("ipad") || -1 != e.indexOf("android") && -1 == e.indexOf("mobile") || -1 != e.indexOf("firefox") && -1 != e.indexOf("tablet") || -1 != e.indexOf("kindle") || -1 != e.indexOf("silk") || -1 != e.indexOf("playbook"),
                    Mobile: -1 != e.indexOf("windows") && -1 != e.indexOf("phone") || -1 != e.indexOf("iphone") || -1 != e.indexOf("ipod") || -1 != e.indexOf("android") && -1 != e.indexOf("mobile") || -1 != e.indexOf("firefox") && -1 != e.indexOf("mobile") || -1 != e.indexOf("blackberry"),
                    Android: -1 != e.indexOf("android"),
                    iOS: -1 != e.indexOf("iphone") || -1 != e.indexOf("ipod") || -1 != e.indexOf("ipad"),
                    IE: i,
                    IE_VERSION: i ? parseInt(e.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3]) : -1,
                    Chrome: e.indexOf("chrome") > -1 && -1 == e.indexOf("edge"),
                    Firefox: e.indexOf("firefox") > -1,
                    Safari: e.indexOf("safari") > -1 && -1 == e.indexOf("chrome"),
                    Opera: e.indexOf("opera") > -1,
                    Edge: e.indexOf("edge") > -1
                }
            }(i)
        },
        pageFadeIn: function() {
            d.trace("pageFadeIn()"),
            e.scrollTo(0, 0)
        },
        setMatchHeight: function(e, n) {
            d.trace("set match height: " + e + " / " + n);
            var t = n
              , o = $(e).length
              , r = []
              , s = [];
            for (i = 0; i <= o; i++)
                r[i] = $(e).eq(i).height(),
                (s.length <= Math.floor(i / t) || s[Math.floor(i / t)] < r[i]) && (s[Math.floor(i / t)] = r[i]);
            $(e).each(function(e) {
                $(this).css("height", s[Math.floor(e / t)] + "px")
            })
        },
        trace: function(e) {
            d.DEBUG && console.log("[trace]" + e)
        }
    },
    d.setupOnce(),
    e.Common = d,
    $("#headerNav a").on("click", function(e) {
        $(this).hasClass("is__blank") || (e.preventDefault(),
        $("#headerNav li").removeClass("is__current"),
        $(this).parent().addClass("is__current"),
        t($(this)))
    }),
    $(".insite, .header__title a").on("click", function(e) {
        e.preventDefault(),
        t($(this))
    })
}(jQuery, window);