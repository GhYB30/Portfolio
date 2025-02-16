!function($, e, a) {
    function o() {
        Common.trace("Page -> hideBlind()"),
        e.scrollTo(0, 0),
        $("#mainmodal").hasClass("is__on") ? $("#mainmodal").hasClass("is__open") && (Common.is_modal_ann = !0,
        Common.ResizeEvent.onSetTopModalSize(),
        Common.trace("is__open: " + Common.is_modal_ann),
        $("#mainmodal__visual__pc__ci, #mainmodal__visual__sp__ci").css({
            width: 0
        })) : ($("#mainmodal").remove(),
        $("#mainmodal__cover").remove()),
        Common.$blind.addClass("origin100"),
        TweenMax.to(Common.$blind, .8, {
            scaleX: 0,
            ease: "easeInOutCirc",
            onComplete: function() {
                if (Common.$blind.hide(),
                Common.$body.css({
                    overflow: "visible",
                    width: "100%",
                    height: "100%"
                }),
                $("#mainmodal").hasClass("is__on")) {
                    if ($("#mainmodal").hasClass("is__open"))
                        if ("pc" == Common.LAYOUT_MODE) {
                            var e = .8;
                            TweenMax.to("#mainmodal__visual__pc__ci", .5, {
                                width: "100%",
                                ease: "easeInCirc",
                                onComplete: function() {
                                    TweenMax.fromTo("#ci1__pc", e, {
                                        visibility: "inherit",
                                        opacity: 0,
                                        x: -50
                                    }, {
                                        x: 0,
                                        opacity: 1,
                                        ease: "easeOutCirc"
                                    }),
                                    TweenMax.to("#ci1__pc", e, {
                                        delay: 1 * e,
                                        x: 50,
                                        opacity: 0,
                                        ease: "easeInCirc"
                                    }),
                                    TweenMax.fromTo("#ci2__pc", e, {
                                        visibility: "inherit",
                                        opacity: 0,
                                        x: -50
                                    }, {
                                        delay: 2 * e,
                                        x: 0,
                                        opacity: 1,
                                        ease: "easeOutCirc"
                                    }),
                                    TweenMax.to("#ci2__pc", e, {
                                        delay: 3 * e,
                                        x: 50,
                                        opacity: 0,
                                        ease: "easeInCirc"
                                    }),
                                    TweenMax.fromTo("#ci3__pc", e, {
                                        visibility: "inherit",
                                        opacity: 0,
                                        x: -50
                                    }, {
                                        delay: 4 * e,
                                        x: 0,
                                        opacity: 1,
                                        ease: "easeOutCirc"
                                    }),
                                    TweenMax.to("#ci3__pc", e, {
                                        delay: 5 * e,
                                        x: 50,
                                        opacity: 1,
                                        ease: "easeInCirc"
                                    }),
                                    setTimeout(function() {
                                        Common.is_modal_ann && TweenMax.to("#mainmodal__cover", e, {
                                            scaleX: 1,
                                            ease: "easeInCirc",
                                            onComplete: function() {
                                                $("#mainmodal__cover").addClass("origin100"),
                                                $(".mainmodal__visual__pc__fix").css({
                                                    display: "block"
                                                }),
                                                $("#mainmodal__visual__pc__ci").remove(),
                                                TweenMax.to("#mainmodal__cover", e, {
                                                    scaleX: 0,
                                                    ease: "easeInOutCirc"
                                                })
                                            }
                                        })
                                    }, 5 * e * 1e3)
                                }
                            })
                        } else {
                            var e = .7;
                            TweenMax.to("#mainmodal__visual__sp__ci", .5, {
                                width: "100%",
                                ease: "easeInCirc",
                                onComplete: function() {
                                    TweenMax.fromTo("#ci1__sp", e, {
                                        visibility: "inherit",
                                        opacity: 0,
                                        x: -20
                                    }, {
                                        x: 0,
                                        opacity: 1,
                                        ease: "easeOutCirc"
                                    }),
                                    TweenMax.to("#ci1__sp", e, {
                                        delay: 1 * e,
                                        x: 0,
                                        opacity: 0,
                                        ease: "easeInCirc"
                                    }),
                                    TweenMax.fromTo("#ci2__sp", e, {
                                        visibility: "inherit",
                                        opacity: 0,
                                        x: -20
                                    }, {
                                        delay: 2 * e,
                                        x: 0,
                                        opacity: 1,
                                        ease: "easeOutCirc"
                                    }),
                                    TweenMax.to("#ci2__sp", e, {
                                        delay: 3 * e,
                                        x: 0,
                                        opacity: 0,
                                        ease: "easeInCirc"
                                    }),
                                    TweenMax.fromTo("#ci3__sp", e, {
                                        visibility: "inherit",
                                        opacity: 0,
                                        x: -20
                                    }, {
                                        delay: 4 * e,
                                        x: 0,
                                        opacity: 1,
                                        ease: "easeOutCirc"
                                    }),
                                    TweenMax.to("#ci3__sp", e, {
                                        delay: 5 * e,
                                        x: 0,
                                        opacity: 1,
                                        ease: "easeInCirc"
                                    }),
                                    setTimeout(function() {
                                        Common.is_modal_ann && TweenMax.to("#mainmodal__cover", e, {
                                            scaleX: 1,
                                            ease: "easeInCirc",
                                            onComplete: function() {
                                                function a() {
                                                    setTimeout(function() {
                                                        i >= 3 ? i = 1 : i += 1,
                                                        $("#mainmodal__cover").removeClass("origin100"),
                                                        TweenMax.to("#mainmodal__cover", .6, {
                                                            scaleX: 1,
                                                            ease: "easeInCirc",
                                                            onComplete: function() {
                                                                $("#mainmodal__visual__sp__fix__list li").removeClass("is__show"),
                                                                $("#mainmodal__visual__sp__fix__list li:nth-child(" + i + ")").addClass("is__show"),
                                                                $("#mainmodal__cover").addClass("origin100"),
                                                                TweenMax.to("#mainmodal__cover", .6, {
                                                                    scaleX: 0,
                                                                    ease: "easeOutCirc",
                                                                    onComplete: function() {
                                                                        a()
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }, 4e3)
                                                }
                                                $("#mainmodal__cover").addClass("origin100"),
                                                $(".mainmodal__visual__sp__fix").css({
                                                    display: "block"
                                                }),
                                                $("#mainmodal__visual__sp__ci").remove(),
                                                TweenMax.to("#mainmodal__cover", e, {
                                                    scaleX: 0,
                                                    ease: "easeInOutCirc"
                                                });
                                                var o = $("#mainmodal__visual__sp__fix__list li").length
                                                  , i = 1
                                                  , n = !1;
                                                a(),
                                                $(".mainmodal__visual__sp__fix__l a, .mainmodal__visual__sp__fix__r a").on("click", function(e) {
                                                    if (e.preventDefault(),
                                                    !n) {
                                                        n = !0;
                                                        var a = $(this).attr("href").substr(1);
                                                        "prev" == a ? 1 >= i ? i = o : i -= 1 : i >= 3 ? i = 1 : i += 1,
                                                        "prev" == a ? $("#mainmodal__cover").addClass("origin100") : $("#mainmodal__cover").removeClass("origin100"),
                                                        TweenMax.to("#mainmodal__cover", .6, {
                                                            scaleX: 1,
                                                            ease: "easeInCirc",
                                                            onComplete: function() {
                                                                $("#mainmodal__visual__sp__fix__list li").removeClass("is__show"),
                                                                $("#mainmodal__visual__sp__fix__list li:nth-child(" + i + ")").addClass("is__show"),
                                                                "prev" == a ? $("#mainmodal__cover").removeClass("origin100") : $("#mainmodal__cover").addClass("origin100"),
                                                                TweenMax.to("#mainmodal__cover", .6, {
                                                                    scaleX: 0,
                                                                    ease: "easeOutCirc",
                                                                    onComplete: function() {
                                                                        n = !1
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }, 5 * e * 1e3)
                                }
                            })
                        }
                    $(".mainmodal__btnClose a").on("click", function(e) {
                        e.preventDefault(),
                        Common.is_modal_ann = !1;
                        var a = new TimelineMax
                          , o = $("#mainmodal__cover");
                        o.removeClass("origin100"),
                        a.to(o, .8, {
                            scaleX: 1,
                            ease: "easeInOutCirc",
                            onComplete: function() {
                                $("#mainmodal").remove(),
                                o.addClass("origin100")
                            }
                        }).to(o, .8, {
                            scaleX: 0,
                            ease: "easeInOutCirc",
                            onComplete: function() {
                                o.remove(),
                                i.showPage(),
                                Common.$header.removeClass("is__moving")
                            }
                        })
                    })
                } else
                    i.showPage(),
                    Common.$header.removeClass("is__moving")
            }
        })
    }
    Common.Page = this,
    this.setupOnce = function() {
        Common.trace("Page -> setupOnce"),
        i.init();
        var e = location.hash.substr(1);
        Common.trace("Page -> hash = " + e),
        "top" == e ? (Common.$loader.remove(),
        history.replaceState("", "", "/"),
        setTimeout(function() {
            o()
        }, 400)) : TweenMax.to("#preloader .preloader__bar", .6, {
            delay: .5,
            width: "100%",
            ease: "easeInOutCirc",
            onComplete: function() {
                Common.$loader.remove(),
                o()
            }
        })
    }
    ;
    var i = {
        init: function() {
            function e(e) {
                var a = e
                  , o = $(a).find(".swiper-slide").length;
                if (o > 1)
                    var i = new Swiper(a,{
                        wrapperClass: "swiper-wrapper",
                        slidesPerView: 1,
                        spaceBetween: 0,
                        autoplay: !0,
                        loop: !0,
                        speed: 500
                    })
            }
            Common.trace("Page -> setPage -> init()"),
            Common.$header.addClass("color--black"),
            Common.$header.css({
                transform: "translateY(-55px)"
            }),
            Common.$side.css({
                transform: "translateX(35px)"
            }),
            "pc" == Common.LAYOUT_MODE && (Common.$footer.css({
                transform: "translateY(35px)"
            })),
            "pc" == Common.LAYOUT_MODE && e("#bannerListPC")
        },
        showPage: function() {
            TweenMax.to("#header", .6, {
                y: 0,
                ease: "easeOutQuint"
            }),
            TweenMax.to("#side", .6, {
                x: 0,
                ease: "easeOutQuint"
            }),
            "pc" == Common.LAYOUT_MODE && (TweenMax.to("#footer", .6, {
                y: 0,
                ease: "easeOutQuint"
            }),
            TweenMax.to("#pickup", .6, {
                x: 0,
                ease: "easeOutQuint"
            }),
            TweenMax.to("#pickup .pickup__date", .3, {
                delay: .4,
                opacity: 1,
                y: 0,
                ease: "easeOutQuint"
            }))
        }
    }
      , n = {
        totalNum: null,
        currentNum: null,
        init: function() {
            Common.trace("Page -> setVisual -> init()"),
            n.currentNum = 1,
            "pc" == Common.LAYOUT_MODE ? n.totalNum = $("#visualPC p").length : n.totalNum = $("#visualSP p").length,
            $("#mainCover").css({
                display: "block",
                transform: "scaleX(0)"
            }),
            Common.trace("visual total: " + n.totalNum),
            setTimeout(function() {
                n.onChange()
            }, 4e3)
        },
        onChange: function() {
            Common.trace("Page -> setVisual -> onChange()"),
            $("#mainCover").removeClass("origin100"),
            TweenMax.to("#mainCover", .6, {
                scaleX: 1,
                ease: "easeInOutCirc",
                onComplete: function() {
                    n.currentNum < n.totalNum ? n.currentNum++ : n.currentNum = 1;
                    var e = ".v" + String(n.currentNum);
                    Common.trace("visual num: " + n.currentNum),
                    "pc" == Common.LAYOUT_MODE ? ($("#visualPC p").removeClass("is__current"),
                    $("#visualPC").find(e).addClass("is__current")) : ($("#visualSP p").removeClass("is__current"),
                    $("#visualSP").find(e).addClass("is__current")),
                    $("#mainCover").addClass("origin100"),
                    TweenMax.to("#mainCover", .6, {
                        scaleX: 0,
                        ease: "easeInOutCirc",
                        onComplete: function() {
                            setTimeout(function() {
                                n.onChange()
                            }, 4e3)
                        }
                    })
                }
            })
        }
    }
}(jQuery, window);