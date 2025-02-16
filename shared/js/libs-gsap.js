/*!
 * VERSION: 1.20.2
 * DATE: 2017-06-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
        var a = function(e) {
            var t, i = [], a = e.length;
            for (t = 0; t !== a; i.push(e[t++]))
                ;
            return i
        }
          , r = function(e, t, i) {
            var a, r, s = e.cycle;
            for (a in s)
                r = s[a],
                e[a] = "function" == typeof r ? r(i, t[i]) : r[i % r.length];
            delete e.cycle
        }
          , s = function(e, t, a) {
            i.call(this, e, t, a),
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._dirty = !0,
            this.render = s.prototype.render
        }
          , n = 1e-10
          , o = i._internals
          , l = o.isSelector
          , u = o.isArray
          , p = s.prototype = i.to({}, .1, {})
          , c = [];
        s.version = "1.20.2",
        p.constructor = s,
        p.kill()._gc = !1,
        s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf,
        s.getTweensOf = i.getTweensOf,
        s.lagSmoothing = i.lagSmoothing,
        s.ticker = i.ticker,
        s.render = i.render,
        p.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._yoyoEase = null,
            this._uncache(!0),
            i.prototype.invalidate.call(this)
        }
        ,
        p.updateTo = function(e, t) {
            var a, r = this.ratio, s = this.vars.immediateRender || e.immediateRender;
            t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
            this._uncache(!1),
            this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (a in e)
                this.vars[a] = e[a];
            if (this._initted || s)
                if (t)
                    this._initted = !1,
                    s && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1),
                this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this),
                this._time / this._duration > .998) {
                    var n = this._totalTime;
                    this.render(0, !0, !1),
                    this._initted = !1,
                    this.render(n, !0, !1)
                } else if (this._initted = !1,
                this._init(),
                this._time > 0 || s)
                    for (var o, l = 1 / (1 - r), u = this._firstPT; u; )
                        o = u.s + u.c,
                        u.c *= l,
                        u.s = o - u.c,
                        u = u._next;
            return this
        }
        ,
        p.render = function(e, t, a) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var r, s, l, u, p, c, h, d, f, m = this._dirty ? this.totalDuration() : this._totalDuration, g = this._time, v = this._totalTime, y = this._cycle, _ = this._duration, w = this._rawPrevTime;
            if (e >= m - 1e-7 && e >= 0 ? (this._totalTime = m,
            this._cycle = this._repeat,
            this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = _,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed || (r = !0,
            s = "onComplete",
            a = a || this._timeline.autoRemoveChildren),
            0 === _ && (this._initted || !this.vars.lazy || a) && (this._startTime === this._timeline._duration && (e = 0),
            (0 > w || 0 >= e && e >= -1e-7 || w === n && "isPause" !== this.data) && w !== e && (a = !0,
            w > n && (s = "onReverseComplete")),
            this._rawPrevTime = d = !t || e || w === e ? e : n)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0,
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
            (0 !== v || 0 === _ && w > 0) && (s = "onReverseComplete",
            r = this._reversed),
            0 > e && (this._active = !1,
            0 === _ && (this._initted || !this.vars.lazy || a) && (w >= 0 && (a = !0),
            this._rawPrevTime = d = !t || e || w === e ? e : n)),
            this._initted || (a = !0)) : (this._totalTime = this._time = e,
            0 !== this._repeat && (u = _ + this._repeatDelay,
            this._cycle = this._totalTime / u >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / u && e >= v && this._cycle--,
            this._time = this._totalTime - this._cycle * u,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = _ - this._time,
            f = this._yoyoEase || this.vars.yoyoEase,
            f && (this._yoyoEase || (f !== !0 || this._initted ? this._yoyoEase = f = f === !0 ? this._ease : f instanceof Ease ? f : Ease.map[f] : (f = this.vars.ease,
            this._yoyoEase = f = f ? f instanceof Ease ? f : "function" == typeof f ? new Ease(f,this.vars.easeParams) : Ease.map[f] || i.defaultEase : i.defaultEase)),
            this.ratio = f ? 1 - f.getRatio((_ - this._time) / _) : 0)),
            this._time > _ ? this._time = _ : this._time < 0 && (this._time = 0)),
            this._easeType && !f ? (p = this._time / _,
            c = this._easeType,
            h = this._easePower,
            (1 === c || 3 === c && p >= .5) && (p = 1 - p),
            3 === c && (p *= 2),
            1 === h ? p *= p : 2 === h ? p *= p * p : 3 === h ? p *= p * p * p : 4 === h && (p *= p * p * p * p),
            1 === c ? this.ratio = 1 - p : 2 === c ? this.ratio = p : this._time / _ < .5 ? this.ratio = p / 2 : this.ratio = 1 - p / 2) : f || (this.ratio = this._ease.getRatio(this._time / _))),
            g === this._time && !a && y === this._cycle)
                return void (v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
            if (!this._initted) {
                if (this._init(),
                !this._initted || this._gc)
                    return;
                if (!a && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                    return this._time = g,
                    this._totalTime = v,
                    this._rawPrevTime = w,
                    this._cycle = y,
                    o.lazyTweens.push(this),
                    void (this._lazy = [e, t]);
                !this._time || r || f ? r && this._ease._calcEnd && !f && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / _)
            }
            for (this._lazy !== !1 && (this._lazy = !1),
            this._active || !this._paused && this._time !== g && e >= 0 && (this._active = !0),
            0 === v && (2 === this._initted && e > 0 && this._init(),
            this._startAt && (e >= 0 ? this._startAt.render(e, t, a) : s || (s = "_dummyGS")),
            this.vars.onStart && (0 !== this._totalTime || 0 === _) && (t || this._callback("onStart"))),
            l = this._firstPT; l; )
                l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s,
                l = l._next;
            this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, a),
            t || (this._totalTime !== v || s) && this._callback("onUpdate")),
            this._cycle !== y && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
            s && (!this._gc || a) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, a),
            r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !t && this.vars[s] && this._callback(s),
            0 === _ && this._rawPrevTime === n && d !== n && (this._rawPrevTime = 0))
        }
        ,
        s.to = function(e, t, i) {
            return new s(e,t,i)
        }
        ,
        s.from = function(e, t, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new s(e,t,i)
        }
        ,
        s.fromTo = function(e, t, i, a) {
            return a.startAt = i,
            a.immediateRender = 0 != a.immediateRender && 0 != i.immediateRender,
            new s(e,t,a)
        }
        ,
        s.staggerTo = s.allTo = function(e, t, n, o, p, h, d) {
            o = o || 0;
            var f, m, g, v, y = 0, _ = [], w = function() {
                n.onComplete && n.onComplete.apply(n.onCompleteScope || this, arguments),
                p.apply(d || n.callbackScope || this, h || c)
            }, x = n.cycle, b = n.startAt && n.startAt.cycle;
            for (u(e) || ("string" == typeof e && (e = i.selector(e) || e),
            l(e) && (e = a(e))),
            e = e || [],
            0 > o && (e = a(e),
            e.reverse(),
            o *= -1),
            f = e.length - 1,
            g = 0; f >= g; g++) {
                m = {};
                for (v in n)
                    m[v] = n[v];
                if (x && (r(m, e, g),
                null != m.duration && (t = m.duration,
                delete m.duration)),
                b) {
                    b = m.startAt = {};
                    for (v in n.startAt)
                        b[v] = n.startAt[v];
                    r(m.startAt, e, g)
                }
                m.delay = y + (m.delay || 0),
                g === f && p && (m.onComplete = w),
                _[g] = new s(e[g],t,m),
                y += o
            }
            return _
        }
        ,
        s.staggerFrom = s.allFrom = function(e, t, i, a, r, n, o) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            s.staggerTo(e, t, i, a, r, n, o)
        }
        ,
        s.staggerFromTo = s.allFromTo = function(e, t, i, a, r, n, o, l) {
            return a.startAt = i,
            a.immediateRender = 0 != a.immediateRender && 0 != i.immediateRender,
            s.staggerTo(e, t, a, r, n, o, l)
        }
        ,
        s.delayedCall = function(e, t, i, a, r) {
            return new s(t,0,{
                delay: e,
                onComplete: t,
                onCompleteParams: i,
                callbackScope: a,
                onReverseComplete: t,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        s.set = function(e, t) {
            return new s(e,0,t)
        }
        ,
        s.isTweening = function(e) {
            return i.getTweensOf(e, !0).length > 0
        }
        ;
        var h = function(e, t) {
            for (var a = [], r = 0, s = e._first; s; )
                s instanceof i ? a[r++] = s : (t && (a[r++] = s),
                a = a.concat(h(s, t)),
                r = a.length),
                s = s._next;
            return a
        }
          , d = s.getAllTweens = function(t) {
            return h(e._rootTimeline, t).concat(h(e._rootFramesTimeline, t))
        }
        ;
        s.killAll = function(e, i, a, r) {
            null == i && (i = !0),
            null == a && (a = !0);
            var s, n, o, l = d(0 != r), u = l.length, p = i && a && r;
            for (o = 0; u > o; o++)
                n = l[o],
                (p || n instanceof t || (s = n.target === n.vars.onComplete) && a || i && !s) && (e ? n.totalTime(n._reversed ? 0 : n.totalDuration()) : n._enabled(!1, !1))
        }
        ,
        s.killChildTweensOf = function(e, t) {
            if (null != e) {
                var r, n, p, c, h, d = o.tweenLookup;
                if ("string" == typeof e && (e = i.selector(e) || e),
                l(e) && (e = a(e)),
                u(e))
                    for (c = e.length; --c > -1; )
                        s.killChildTweensOf(e[c], t);
                else {
                    r = [];
                    for (p in d)
                        for (n = d[p].target.parentNode; n; )
                            n === e && (r = r.concat(d[p].tweens)),
                            n = n.parentNode;
                    for (h = r.length,
                    c = 0; h > c; c++)
                        t && r[c].totalTime(r[c].totalDuration()),
                        r[c]._enabled(!1, !1)
                }
            }
        }
        ;
        var f = function(e, i, a, r) {
            i = i !== !1,
            a = a !== !1,
            r = r !== !1;
            for (var s, n, o = d(r), l = i && a && r, u = o.length; --u > -1; )
                n = o[u],
                (l || n instanceof t || (s = n.target === n.vars.onComplete) && a || i && !s) && n.paused(e)
        };
        return s.pauseAll = function(e, t, i) {
            f(!0, e, t, i)
        }
        ,
        s.resumeAll = function(e, t, i) {
            f(!1, e, t, i)
        }
        ,
        s.globalTimeScale = function(t) {
            var a = e._rootTimeline
              , r = i.ticker.time;
            return arguments.length ? (t = t || n,
            a._startTime = r - (r - a._startTime) * a._timeScale / t,
            a = e._rootFramesTimeline,
            r = i.ticker.frame,
            a._startTime = r - (r - a._startTime) * a._timeScale / t,
            a._timeScale = e._rootTimeline._timeScale = t,
            t) : a._timeScale
        }
        ,
        p.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
        }
        ,
        p.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
        }
        ,
        p.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            e > this._duration && (e = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(e, t)) : this._time
        }
        ,
        p.duration = function(t) {
            return arguments.length ? e.prototype.duration.call(this, t) : this._duration
        }
        ,
        p.totalDuration = function(e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
            this._dirty = !1),
            this._totalDuration)
        }
        ,
        p.repeat = function(e) {
            return arguments.length ? (this._repeat = e,
            this._uncache(!0)) : this._repeat
        }
        ,
        p.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        p.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e,
            this) : this._yoyo
        }
        ,
        s
    }, !0),
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
        var a = function(e) {
            t.call(this, e),
            this._labels = {},
            this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
            this.smoothChildTiming = this.vars.smoothChildTiming === !0,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, a, r = this.vars;
            for (a in r)
                i = r[a],
                l(i) && -1 !== i.join("").indexOf("{self}") && (r[a] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }
          , r = 1e-10
          , s = i._internals
          , n = a._internals = {}
          , o = s.isSelector
          , l = s.isArray
          , u = s.lazyTweens
          , p = s.lazyRender
          , c = _gsScope._gsDefine.globals
          , h = function(e) {
            var t, i = {};
            for (t in e)
                i[t] = e[t];
            return i
        }
          , d = function(e, t, i) {
            var a, r, s = e.cycle;
            for (a in s)
                r = s[a],
                e[a] = "function" == typeof r ? r(i, t[i]) : r[i % r.length];
            delete e.cycle
        }
          , f = n.pauseCallback = function() {}
          , m = function(e) {
            var t, i = [], a = e.length;
            for (t = 0; t !== a; i.push(e[t++]))
                ;
            return i
        }
          , g = a.prototype = new t;
        return a.version = "1.20.2",
        g.constructor = a,
        g.kill()._gc = g._forcingPlayhead = g._hasPause = !1,
        g.to = function(e, t, a, r) {
            var s = a.repeat && c.TweenMax || i;
            return t ? this.add(new s(e,t,a), r) : this.set(e, a, r)
        }
        ,
        g.from = function(e, t, a, r) {
            return this.add((a.repeat && c.TweenMax || i).from(e, t, a), r)
        }
        ,
        g.fromTo = function(e, t, a, r, s) {
            var n = r.repeat && c.TweenMax || i;
            return t ? this.add(n.fromTo(e, t, a, r), s) : this.set(e, r, s)
        }
        ,
        g.staggerTo = function(e, t, r, s, n, l, u, p) {
            var c, f, g = new a({
                onComplete: l,
                onCompleteParams: u,
                callbackScope: p,
                smoothChildTiming: this.smoothChildTiming
            }), v = r.cycle;
            for ("string" == typeof e && (e = i.selector(e) || e),
            e = e || [],
            o(e) && (e = m(e)),
            s = s || 0,
            0 > s && (e = m(e),
            e.reverse(),
            s *= -1),
            f = 0; f < e.length; f++)
                c = h(r),
                c.startAt && (c.startAt = h(c.startAt),
                c.startAt.cycle && d(c.startAt, e, f)),
                v && (d(c, e, f),
                null != c.duration && (t = c.duration,
                delete c.duration)),
                g.to(e[f], t, c, f * s);
            return this.add(g, n)
        }
        ,
        g.staggerFrom = function(e, t, i, a, r, s, n, o) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(e, t, i, a, r, s, n, o)
        }
        ,
        g.staggerFromTo = function(e, t, i, a, r, s, n, o, l) {
            return a.startAt = i,
            a.immediateRender = 0 != a.immediateRender && 0 != i.immediateRender,
            this.staggerTo(e, t, a, r, s, n, o, l)
        }
        ,
        g.call = function(e, t, a, r) {
            return this.add(i.delayedCall(0, e, t, a), r)
        }
        ,
        g.set = function(e, t, a) {
            return a = this._parseTimeOrLabel(a, 0, !0),
            null == t.immediateRender && (t.immediateRender = a === this._time && !this._paused),
            this.add(new i(e,0,t), a)
        }
        ,
        a.exportRoot = function(e, t) {
            e = e || {},
            null == e.smoothChildTiming && (e.smoothChildTiming = !0);
            var r, s, n = new a(e), o = n._timeline;
            for (null == t && (t = !0),
            o._remove(n, !0),
            n._startTime = 0,
            n._rawPrevTime = n._time = n._totalTime = o._time,
            r = o._first; r; )
                s = r._next,
                t && r instanceof i && r.target === r.vars.onComplete || n.add(r, r._startTime - r._delay),
                r = s;
            return o.add(n, 0),
            n
        }
        ,
        g.add = function(r, s, n, o) {
            var u, p, c, h, d, f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)),
            !(r instanceof e)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (n = n || "normal",
                    o = o || 0,
                    u = s,
                    p = r.length,
                    c = 0; p > c; c++)
                        l(h = r[c]) && (h = new a({
                            tweens: h
                        })),
                        this.add(h, u),
                        "string" != typeof h && "function" != typeof h && ("sequence" === n ? u = h._startTime + h.totalDuration() / h._timeScale : "start" === n && (h._startTime -= h.delay())),
                        u += o;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)
                    return this.addLabel(r, s);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (t.prototype.add.call(this, r, s),
            r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (d = this,
                f = d.rawTime() > r._startTime; d._timeline; )
                    f && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1),
                    d = d._timeline;
            return this
        }
        ,
        g.remove = function(t) {
            if (t instanceof e) {
                this._remove(t, !1);
                var i = t._timeline = t.vars.useFrames ? e._rootFramesTimeline : e._rootTimeline;
                return t._startTime = (t._paused ? t._pauseTime : i._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale,
                this
            }
            if (t instanceof Array || t && t.push && l(t)) {
                for (var a = t.length; --a > -1; )
                    this.remove(t[a]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
        }
        ,
        g._remove = function(e, i) {
            t.prototype._remove.call(this, e, i);
            var a = this._last;
            return a ? this._time > this.duration() && (this._time = this._duration,
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        g.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
        }
        ,
        g.insert = g.insertMultiple = function(e, t, i, a) {
            return this.add(e, t || 0, i, a)
        }
        ,
        g.appendMultiple = function(e, t, i, a) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, a)
        }
        ,
        g.addLabel = function(e, t) {
            return this._labels[e] = this._parseTimeOrLabel(t),
            this
        }
        ,
        g.addPause = function(e, t, a, r) {
            var s = i.delayedCall(0, f, a, r || this);
            return s.vars.onComplete = s.vars.onReverseComplete = t,
            s.data = "isPause",
            this._hasPause = !0,
            this.add(s, e)
        }
        ,
        g.removeLabel = function(e) {
            return delete this._labels[e],
            this
        }
        ,
        g.getLabelTime = function(e) {
            return null != this._labels[e] ? this._labels[e] : -1
        }
        ,
        g._parseTimeOrLabel = function(t, i, a, r) {
            var s, n;
            if (r instanceof e && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && l(r)))
                for (n = r.length; --n > -1; )
                    r[n]instanceof e && r[n].timeline === this && this.remove(r[n]);
            if (s = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration,
            "string" == typeof i)
                return this._parseTimeOrLabel(i, a && "number" == typeof t && null == this._labels[i] ? t - s : 0, a);
            if (i = i || 0,
            "string" != typeof t || !isNaN(t) && null == this._labels[t])
                null == t && (t = s);
            else {
                if (n = t.indexOf("="),
                -1 === n)
                    return null == this._labels[t] ? a ? this._labels[t] = s + i : i : this._labels[t] + i;
                i = parseInt(t.charAt(n - 1) + "1", 10) * Number(t.substr(n + 1)),
                t = n > 1 ? this._parseTimeOrLabel(t.substr(0, n - 1), 0, a) : s
            }
            return Number(t) + i
        }
        ,
        g.seek = function(e, t) {
            return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
        }
        ,
        g.stop = function() {
            return this.paused(!0)
        }
        ,
        g.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        }
        ,
        g.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        }
        ,
        g.render = function(e, t, i) {
            this._gc && this._enabled(!0, !1);
            var a, s, n, o, l, c, h, d = this._dirty ? this.totalDuration() : this._totalDuration, f = this._time, m = this._startTime, g = this._timeScale, v = this._paused;
            if (e >= d - 1e-7 && e >= 0)
                this._totalTime = this._time = d,
                this._reversed || this._hasPausedChild() || (s = !0,
                o = "onComplete",
                l = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= e && e >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== e && this._first && (l = !0,
                this._rawPrevTime > r && (o = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                e = d + 1e-4;
            else if (1e-7 > e)
                if (this._totalTime = this._time = 0,
                (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (o = "onReverseComplete",
                s = this._reversed),
                0 > e)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0,
                    o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                    this._rawPrevTime = e;
                else {
                    if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                    0 === e && s)
                        for (a = this._first; a && 0 === a._startTime; )
                            a._duration || (s = !1),
                            a = a._next;
                    e = 0,
                    this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !t) {
                    if (e >= f)
                        for (a = this._first; a && a._startTime <= e && !c; )
                            a._duration || "isPause" !== a.data || a.ratio || 0 === a._startTime && 0 === this._rawPrevTime || (c = a),
                            a = a._next;
                    else
                        for (a = this._last; a && a._startTime >= e && !c; )
                            a._duration || "isPause" === a.data && a._rawPrevTime > 0 && (c = a),
                            a = a._prev;
                    c && (this._time = e = c._startTime,
                    this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = e
            }
            if (this._time !== f && this._first || i || l || c) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== f && e > 0 && (this._active = !0),
                0 === f && this.vars.onStart && (0 === this._time && this._duration || t || this._callback("onStart")),
                h = this._time,
                h >= f)
                    for (a = this._first; a && (n = a._next,
                    h === this._time && (!this._paused || v)); )
                        (a._active || a._startTime <= h && !a._paused && !a._gc) && (c === a && this.pause(),
                        a._reversed ? a.render((a._dirty ? a.totalDuration() : a._totalDuration) - (e - a._startTime) * a._timeScale, t, i) : a.render((e - a._startTime) * a._timeScale, t, i)),
                        a = n;
                else
                    for (a = this._last; a && (n = a._prev,
                    h === this._time && (!this._paused || v)); ) {
                        if (a._active || a._startTime <= f && !a._paused && !a._gc) {
                            if (c === a) {
                                for (c = a._prev; c && c.endTime() > this._time; )
                                    c.render(c._reversed ? c.totalDuration() - (e - c._startTime) * c._timeScale : (e - c._startTime) * c._timeScale, t, i),
                                    c = c._prev;
                                c = null,
                                this.pause()
                            }
                            a._reversed ? a.render((a._dirty ? a.totalDuration() : a._totalDuration) - (e - a._startTime) * a._timeScale, t, i) : a.render((e - a._startTime) * a._timeScale, t, i)
                        }
                        a = n
                    }
                this._onUpdate && (t || (u.length && p(),
                this._callback("onUpdate"))),
                o && (this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (s && (u.length && p(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !t && this.vars[o] && this._callback(o)))
            }
        }
        ,
        g._hasPausedChild = function() {
            for (var e = this._first; e; ) {
                if (e._paused || e instanceof a && e._hasPausedChild())
                    return !0;
                e = e._next
            }
            return !1
        }
        ,
        g.getChildren = function(e, t, a, r) {
            r = r || -9999999999;
            for (var s = [], n = this._first, o = 0; n; )
                n._startTime < r || (n instanceof i ? t !== !1 && (s[o++] = n) : (a !== !1 && (s[o++] = n),
                e !== !1 && (s = s.concat(n.getChildren(!0, t, a)),
                o = s.length))),
                n = n._next;
            return s
        }
        ,
        g.getTweensOf = function(e, t) {
            var a, r, s = this._gc, n = [], o = 0;
            for (s && this._enabled(!0, !0),
            a = i.getTweensOf(e),
            r = a.length; --r > -1; )
                (a[r].timeline === this || t && this._contains(a[r])) && (n[o++] = a[r]);
            return s && this._enabled(!1, !0),
            n
        }
        ,
        g.recent = function() {
            return this._recent
        }
        ,
        g._contains = function(e) {
            for (var t = e.timeline; t; ) {
                if (t === this)
                    return !0;
                t = t.timeline
            }
            return !1
        }
        ,
        g.shiftChildren = function(e, t, i) {
            i = i || 0;
            for (var a, r = this._first, s = this._labels; r; )
                r._startTime >= i && (r._startTime += e),
                r = r._next;
            if (t)
                for (a in s)
                    s[a] >= i && (s[a] += e);
            return this._uncache(!0)
        }
        ,
        g._kill = function(e, t) {
            if (!e && !t)
                return this._enabled(!1, !1);
            for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), a = i.length, r = !1; --a > -1; )
                i[a]._kill(e, t) && (r = !0);
            return r
        }
        ,
        g.clear = function(e) {
            var t = this.getChildren(!1, !0, !0)
              , i = t.length;
            for (this._time = this._totalTime = 0; --i > -1; )
                t[i]._enabled(!1, !1);
            return e !== !1 && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        g.invalidate = function() {
            for (var t = this._first; t; )
                t.invalidate(),
                t = t._next;
            return e.prototype.invalidate.call(this)
        }
        ,
        g._enabled = function(e, i) {
            if (e === this._gc)
                for (var a = this._first; a; )
                    a._enabled(e, !0),
                    a = a._next;
            return t.prototype._enabled.call(this, e, i)
        }
        ,
        g.totalTime = function(t, i, a) {
            this._forcingPlayhead = !0;
            var r = e.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            r
        }
        ,
        g.duration = function(e) {
            return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        g.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var t, i, a = 0, r = this._last, s = 999999999999; r; )
                        t = r._prev,
                        r._dirty && r.totalDuration(),
                        r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime,
                        r._startTime < 0 && !r._paused && (a -= r._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale),
                        this.shiftChildren(-r._startTime, !1, -9999999999),
                        s = 0),
                        i = r._startTime + r._totalDuration / r._timeScale,
                        i > a && (a = i),
                        r = t;
                    this._duration = this._totalDuration = a,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
        }
        ,
        g.paused = function(t) {
            if (!t)
                for (var i = this._first, a = this._time; i; )
                    i._startTime === a && "isPause" === i.data && (i._rawPrevTime = 0),
                    i = i._next;
            return e.prototype.paused.apply(this, arguments)
        }
        ,
        g.usesFrames = function() {
            for (var t = this._timeline; t._timeline; )
                t = t._timeline;
            return t === e._rootFramesTimeline
        }
        ,
        g.rawTime = function(e) {
            return e && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(e) - this._startTime) * this._timeScale
        }
        ,
        a
    }, !0),
    _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, i) {
        var a = function(t) {
            e.call(this, t),
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._cycle = 0,
            this._yoyo = this.vars.yoyo === !0,
            this._dirty = !0
        }
          , r = 1e-10
          , s = t._internals
          , n = s.lazyTweens
          , o = s.lazyRender
          , l = _gsScope._gsDefine.globals
          , u = new i(null,null,1,0)
          , p = a.prototype = new e;
        return p.constructor = a,
        p.kill()._gc = !1,
        a.version = "1.20.2",
        p.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0,
            this._repeat = this.vars.repeat || 0,
            this._repeatDelay = this.vars.repeatDelay || 0,
            this._uncache(!0),
            e.prototype.invalidate.call(this)
        }
        ,
        p.addCallback = function(e, i, a, r) {
            return this.add(t.delayedCall(0, e, a, r), i)
        }
        ,
        p.removeCallback = function(e, t) {
            if (e)
                if (null == t)
                    this._kill(null, e);
                else
                    for (var i = this.getTweensOf(e, !1), a = i.length, r = this._parseTimeOrLabel(t); --a > -1; )
                        i[a]._startTime === r && i[a]._enabled(!1, !1);
            return this
        }
        ,
        p.removePause = function(t) {
            return this.removeCallback(e._internals.pauseCallback, t)
        }
        ,
        p.tweenTo = function(e, i) {
            i = i || {};
            var a, r, s, n = {
                ease: u,
                useFrames: this.usesFrames(),
                immediateRender: !1
            }, o = i.repeat && l.TweenMax || t;
            for (r in i)
                n[r] = i[r];
            return n.time = this._parseTimeOrLabel(e),
            a = Math.abs(Number(n.time) - this._time) / this._timeScale || .001,
            s = new o(this,a,n),
            n.onStart = function() {
                s.target.paused(!0),
                s.vars.time !== s.target.time() && a === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale),
                i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
            }
            ,
            s
        }
        ,
        p.tweenFromTo = function(e, t, i) {
            i = i || {},
            e = this._parseTimeOrLabel(e),
            i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                callbackScope: this
            },
            i.immediateRender = i.immediateRender !== !1;
            var a = this.tweenTo(t, i);
            return a.duration(Math.abs(a.vars.time - e) / this._timeScale || .001)
        }
        ,
        p.render = function(e, t, i) {
            this._gc && this._enabled(!0, !1);
            var a, s, l, u, p, c, h, d, f = this._dirty ? this.totalDuration() : this._totalDuration, m = this._duration, g = this._time, v = this._totalTime, y = this._startTime, _ = this._timeScale, w = this._rawPrevTime, x = this._paused, b = this._cycle;
            if (e >= f - 1e-7 && e >= 0)
                this._locked || (this._totalTime = f,
                this._cycle = this._repeat),
                this._reversed || this._hasPausedChild() || (s = !0,
                u = "onComplete",
                p = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 >= e && e >= -1e-7 || 0 > w || w === r) && w !== e && this._first && (p = !0,
                w > r && (u = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r,
                this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = m,
                e = m + 1e-4);
            else if (1e-7 > e)
                if (this._locked || (this._totalTime = this._cycle = 0),
                this._time = 0,
                (0 !== g || 0 === m && w !== r && (w > 0 || 0 > e && w >= 0) && !this._locked) && (u = "onReverseComplete",
                s = this._reversed),
                0 > e)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (p = s = !0,
                    u = "onReverseComplete") : w >= 0 && this._first && (p = !0),
                    this._rawPrevTime = e;
                else {
                    if (this._rawPrevTime = m || !t || e || this._rawPrevTime === e ? e : r,
                    0 === e && s)
                        for (a = this._first; a && 0 === a._startTime; )
                            a._duration || (s = !1),
                            a = a._next;
                    e = 0,
                    this._initted || (p = !0)
                }
            else if (0 === m && 0 > w && (p = !0),
            this._time = this._rawPrevTime = e,
            this._locked || (this._totalTime = e,
            0 !== this._repeat && (c = m + this._repeatDelay,
            this._cycle = this._totalTime / c >> 0,
            0 !== this._cycle && this._cycle === this._totalTime / c && e >= v && this._cycle--,
            this._time = this._totalTime - this._cycle * c,
            this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time),
            this._time > m ? (this._time = m,
            e = m + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)),
            this._hasPause && !this._forcingPlayhead && !t) {
                if (e = this._time,
                e >= g || this._repeat && b !== this._cycle)
                    for (a = this._first; a && a._startTime <= e && !h; )
                        a._duration || "isPause" !== a.data || a.ratio || 0 === a._startTime && 0 === this._rawPrevTime || (h = a),
                        a = a._next;
                else
                    for (a = this._last; a && a._startTime >= e && !h; )
                        a._duration || "isPause" === a.data && a._rawPrevTime > 0 && (h = a),
                        a = a._prev;
                h && h._startTime < m && (this._time = e = h._startTime,
                this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== b && !this._locked) {
                var T = this._yoyo && 0 !== (1 & b)
                  , S = T === (this._yoyo && 0 !== (1 & this._cycle))
                  , C = this._totalTime
                  , P = this._cycle
                  , k = this._rawPrevTime
                  , M = this._time;
                if (this._totalTime = b * m,
                this._cycle < b ? T = !T : this._totalTime += m,
                this._time = g,
                this._rawPrevTime = 0 === m ? w - 1e-4 : w,
                this._cycle = b,
                this._locked = !0,
                g = T ? 0 : m,
                this.render(g, t, 0 === m),
                t || this._gc || this.vars.onRepeat && (this._cycle = P,
                this._locked = !1,
                this._callback("onRepeat")),
                g !== this._time)
                    return;
                if (S && (this._cycle = b,
                this._locked = !0,
                g = T ? m + 1e-4 : -1e-4,
                this.render(g, !0, !1)),
                this._locked = !1,
                this._paused && !x)
                    return;
                this._time = M,
                this._totalTime = C,
                this._cycle = P,
                this._rawPrevTime = k
            }
            if (!(this._time !== g && this._first || i || p || h))
                return void (v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0),
            this._active || !this._paused && this._totalTime !== v && e > 0 && (this._active = !0),
            0 === v && this.vars.onStart && (0 === this._totalTime && this._totalDuration || t || this._callback("onStart")),
            d = this._time,
            d >= g)
                for (a = this._first; a && (l = a._next,
                d === this._time && (!this._paused || x)); )
                    (a._active || a._startTime <= this._time && !a._paused && !a._gc) && (h === a && this.pause(),
                    a._reversed ? a.render((a._dirty ? a.totalDuration() : a._totalDuration) - (e - a._startTime) * a._timeScale, t, i) : a.render((e - a._startTime) * a._timeScale, t, i)),
                    a = l;
            else
                for (a = this._last; a && (l = a._prev,
                d === this._time && (!this._paused || x)); ) {
                    if (a._active || a._startTime <= g && !a._paused && !a._gc) {
                        if (h === a) {
                            for (h = a._prev; h && h.endTime() > this._time; )
                                h.render(h._reversed ? h.totalDuration() - (e - h._startTime) * h._timeScale : (e - h._startTime) * h._timeScale, t, i),
                                h = h._prev;
                            h = null,
                            this.pause()
                        }
                        a._reversed ? a.render((a._dirty ? a.totalDuration() : a._totalDuration) - (e - a._startTime) * a._timeScale, t, i) : a.render((e - a._startTime) * a._timeScale, t, i)
                    }
                    a = l
                }
            this._onUpdate && (t || (n.length && o(),
            this._callback("onUpdate"))),
            u && (this._locked || this._gc || (y === this._startTime || _ !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (n.length && o(),
            this._timeline.autoRemoveChildren && this._enabled(!1, !1),
            this._active = !1),
            !t && this.vars[u] && this._callback(u)))
        }
        ,
        p.getActive = function(e, t, i) {
            null == e && (e = !0),
            null == t && (t = !0),
            null == i && (i = !1);
            var a, r, s = [], n = this.getChildren(e, t, i), o = 0, l = n.length;
            for (a = 0; l > a; a++)
                r = n[a],
                r.isActive() && (s[o++] = r);
            return s
        }
        ,
        p.getLabelAfter = function(e) {
            e || 0 !== e && (e = this._time);
            var t, i = this.getLabelsArray(), a = i.length;
            for (t = 0; a > t; t++)
                if (i[t].time > e)
                    return i[t].name;
            return null
        }
        ,
        p.getLabelBefore = function(e) {
            null == e && (e = this._time);
            for (var t = this.getLabelsArray(), i = t.length; --i > -1; )
                if (t[i].time < e)
                    return t[i].name;
            return null
        }
        ,
        p.getLabelsArray = function() {
            var e, t = [], i = 0;
            for (e in this._labels)
                t[i++] = {
                    time: this._labels[e],
                    name: e
                };
            return t.sort(function(e, t) {
                return e.time - t.time
            }),
            t
        }
        ,
        p.invalidate = function() {
            return this._locked = !1,
            e.prototype.invalidate.call(this)
        }
        ,
        p.progress = function(e, t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration() || 0
        }
        ,
        p.totalProgress = function(e, t) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration() || 0
        }
        ,
        p.totalDuration = function(t) {
            return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this),
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
            this._totalDuration)
        }
        ,
        p.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            e > this._duration && (e = this._duration),
            this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)),
            this.totalTime(e, t)) : this._time
        }
        ,
        p.repeat = function(e) {
            return arguments.length ? (this._repeat = e,
            this._uncache(!0)) : this._repeat
        }
        ,
        p.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e,
            this._uncache(!0)) : this._repeatDelay
        }
        ,
        p.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e,
            this) : this._yoyo
        }
        ,
        p.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
        }
        ,
        a
    }, !0),
    function() {
        var e = 180 / Math.PI
          , t = []
          , i = []
          , a = []
          , r = {}
          , s = _gsScope._gsDefine.globals
          , n = function(e, t, i, a) {
            i === a && (i = a - (a - t) / 1e6),
            e === t && (t = e + (i - e) / 1e6),
            this.a = e,
            this.b = t,
            this.c = i,
            this.d = a,
            this.da = a - e,
            this.ca = i - e,
            this.ba = t - e
        }
          , o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"
          , l = function(e, t, i, a) {
            var r = {
                a: e
            }
              , s = {}
              , n = {}
              , o = {
                c: a
            }
              , l = (e + t) / 2
              , u = (t + i) / 2
              , p = (i + a) / 2
              , c = (l + u) / 2
              , h = (u + p) / 2
              , d = (h - c) / 8;
            return r.b = l + (e - l) / 4,
            s.b = c + d,
            r.c = s.a = (r.b + s.b) / 2,
            s.c = n.a = (c + h) / 2,
            n.b = h - d,
            o.b = p + (a - p) / 4,
            n.c = o.a = (n.b + o.b) / 2,
            [r, s, n, o]
        }
          , u = function(e, r, s, n, o) {
            var u, p, c, h, d, f, m, g, v, y, _, w, x, b = e.length - 1, T = 0, S = e[0].a;
            for (u = 0; b > u; u++)
                d = e[T],
                p = d.a,
                c = d.d,
                h = e[T + 1].d,
                o ? (_ = t[u],
                w = i[u],
                x = (w + _) * r * .25 / (n ? .5 : a[u] || .5),
                f = c - (c - p) * (n ? .5 * r : 0 !== _ ? x / _ : 0),
                m = c + (h - c) * (n ? .5 * r : 0 !== w ? x / w : 0),
                g = c - (f + ((m - f) * (3 * _ / (_ + w) + .5) / 4 || 0))) : (f = c - (c - p) * r * .5,
                m = c + (h - c) * r * .5,
                g = c - (f + m) / 2),
                f += g,
                m += g,
                d.c = v = f,
                0 !== u ? d.b = S : d.b = S = d.a + .6 * (d.c - d.a),
                d.da = c - p,
                d.ca = v - p,
                d.ba = S - p,
                s ? (y = l(p, S, v, c),
                e.splice(T, 1, y[0], y[1], y[2], y[3]),
                T += 4) : T++,
                S = m;
            d = e[T],
            d.b = S,
            d.c = S + .4 * (d.d - S),
            d.da = d.d - d.a,
            d.ca = d.c - d.a,
            d.ba = S - d.a,
            s && (y = l(d.a, S, d.c, d.d),
            e.splice(T, 1, y[0], y[1], y[2], y[3]))
        }
          , p = function(e, a, r, s) {
            var o, l, u, p, c, h, d = [];
            if (s)
                for (e = [s].concat(e),
                l = e.length; --l > -1; )
                    "string" == typeof (h = e[l][a]) && "=" === h.charAt(1) && (e[l][a] = s[a] + Number(h.charAt(0) + h.substr(2)));
            if (o = e.length - 2,
            0 > o)
                return d[0] = new n(e[0][a],0,0,e[0][a]),
                d;
            for (l = 0; o > l; l++)
                u = e[l][a],
                p = e[l + 1][a],
                d[l] = new n(u,0,0,p),
                r && (c = e[l + 2][a],
                t[l] = (t[l] || 0) + (p - u) * (p - u),
                i[l] = (i[l] || 0) + (c - p) * (c - p));
            return d[l] = new n(e[l][a],0,0,e[l + 1][a]),
            d
        }
          , c = function(e, s, n, l, c, h) {
            var d, f, m, g, v, y, _, w, x = {}, b = [], T = h || e[0];
            c = "string" == typeof c ? "," + c + "," : o,
            null == s && (s = 1);
            for (f in e[0])
                b.push(f);
            if (e.length > 1) {
                for (w = e[e.length - 1],
                _ = !0,
                d = b.length; --d > -1; )
                    if (f = b[d],
                    Math.abs(T[f] - w[f]) > .05) {
                        _ = !1;
                        break
                    }
                _ && (e = e.concat(),
                h && e.unshift(h),
                e.push(e[1]),
                h = e[e.length - 3])
            }
            for (t.length = i.length = a.length = 0,
            d = b.length; --d > -1; )
                f = b[d],
                r[f] = -1 !== c.indexOf("," + f + ","),
                x[f] = p(e, f, r[f], h);
            for (d = t.length; --d > -1; )
                t[d] = Math.sqrt(t[d]),
                i[d] = Math.sqrt(i[d]);
            if (!l) {
                for (d = b.length; --d > -1; )
                    if (r[f])
                        for (m = x[b[d]],
                        y = m.length - 1,
                        g = 0; y > g; g++)
                            v = m[g + 1].da / i[g] + m[g].da / t[g] || 0,
                            a[g] = (a[g] || 0) + v * v;
                for (d = a.length; --d > -1; )
                    a[d] = Math.sqrt(a[d])
            }
            for (d = b.length,
            g = n ? 4 : 1; --d > -1; )
                f = b[d],
                m = x[f],
                u(m, s, n, l, r[f]),
                _ && (m.splice(0, g),
                m.splice(m.length - g, g));
            return x
        }
          , h = function(e, t, i) {
            t = t || "soft";
            var a, r, s, o, l, u, p, c, h, d, f, m = {}, g = "cubic" === t ? 3 : 2, v = "soft" === t, y = [];
            if (v && i && (e = [i].concat(e)),
            null == e || e.length < g + 1)
                throw "invalid Bezier data";
            for (h in e[0])
                y.push(h);
            for (u = y.length; --u > -1; ) {
                for (h = y[u],
                m[h] = l = [],
                d = 0,
                c = e.length,
                p = 0; c > p; p++)
                    a = null == i ? e[p][h] : "string" == typeof (f = e[p][h]) && "=" === f.charAt(1) ? i[h] + Number(f.charAt(0) + f.substr(2)) : Number(f),
                    v && p > 1 && c - 1 > p && (l[d++] = (a + l[d - 2]) / 2),
                    l[d++] = a;
                for (c = d - g + 1,
                d = 0,
                p = 0; c > p; p += g)
                    a = l[p],
                    r = l[p + 1],
                    s = l[p + 2],
                    o = 2 === g ? 0 : l[p + 3],
                    l[d++] = f = 3 === g ? new n(a,r,s,o) : new n(a,(2 * r + a) / 3,(2 * r + s) / 3,s);
                l.length = d
            }
            return m
        }
          , d = function(e, t, i) {
            for (var a, r, s, n, o, l, u, p, c, h, d, f = 1 / i, m = e.length; --m > -1; )
                for (h = e[m],
                s = h.a,
                n = h.d - s,
                o = h.c - s,
                l = h.b - s,
                a = r = 0,
                p = 1; i >= p; p++)
                    u = f * p,
                    c = 1 - u,
                    a = r - (r = (u * u * n + 3 * c * (u * o + c * l)) * u),
                    d = m * i + p - 1,
                    t[d] = (t[d] || 0) + a * a
        }
          , f = function(e, t) {
            t = t >> 0 || 6;
            var i, a, r, s, n = [], o = [], l = 0, u = 0, p = t - 1, c = [], h = [];
            for (i in e)
                d(e[i], n, t);
            for (r = n.length,
            a = 0; r > a; a++)
                l += Math.sqrt(n[a]),
                s = a % t,
                h[s] = l,
                s === p && (u += l,
                s = a / t >> 0,
                c[s] = h,
                o[s] = u,
                l = 0,
                h = []);
            return {
                length: u,
                lengths: o,
                segments: c
            }
        }
          , m = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.8",
            API: 2,
            global: !0,
            init: function(e, t, i) {
                this._target = e,
                t instanceof Array && (t = {
                    values: t
                }),
                this._func = {},
                this._mod = {},
                this._props = [],
                this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                var a, r, s, n, o, l = t.values || [], u = {}, p = l[0], d = t.autoRotate || i.vars.orientToBezier;
                this._autoRotate = d ? d instanceof Array ? d : [["x", "y", "rotation", d === !0 ? 0 : Number(d) || 0]] : null;
                for (a in p)
                    this._props.push(a);
                for (s = this._props.length; --s > -1; )
                    a = this._props[s],
                    this._overwriteProps.push(a),
                    r = this._func[a] = "function" == typeof e[a],
                    u[a] = r ? e[a.indexOf("set") || "function" != typeof e["get" + a.substr(3)] ? a : "get" + a.substr(3)]() : parseFloat(e[a]),
                    o || u[a] !== l[0][a] && (o = u);
                if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? c(l, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, o) : h(l, t.type, u),
                this._segCount = this._beziers[a].length,
                this._timeRes) {
                    var m = f(this._beziers, this._timeRes);
                    this._length = m.length,
                    this._lengths = m.lengths,
                    this._segments = m.segments,
                    this._l1 = this._li = this._s1 = this._si = 0,
                    this._l2 = this._lengths[0],
                    this._curSeg = this._segments[0],
                    this._s2 = this._curSeg[0],
                    this._prec = 1 / this._curSeg.length
                }
                if (d = this._autoRotate)
                    for (this._initialRotations = [],
                    d[0]instanceof Array || (this._autoRotate = d = [d]),
                    s = d.length; --s > -1; ) {
                        for (n = 0; 3 > n; n++)
                            a = d[s][n],
                            this._func[a] = "function" == typeof e[a] ? e[a.indexOf("set") || "function" != typeof e["get" + a.substr(3)] ? a : "get" + a.substr(3)] : !1;
                        a = d[s][2],
                        this._initialRotations[s] = (this._func[a] ? this._func[a].call(this._target) : this._target[a]) || 0,
                        this._overwriteProps.push(a)
                    }
                return this._startRatio = i.vars.runBackwards ? 1 : 0,
                !0
            },
            set: function(t) {
                var i, a, r, s, n, o, l, u, p, c, h = this._segCount, d = this._func, f = this._target, m = t !== this._startRatio;
                if (this._timeRes) {
                    if (p = this._lengths,
                    c = this._curSeg,
                    t *= this._length,
                    r = this._li,
                    t > this._l2 && h - 1 > r) {
                        for (u = h - 1; u > r && (this._l2 = p[++r]) <= t; )
                            ;
                        this._l1 = p[r - 1],
                        this._li = r,
                        this._curSeg = c = this._segments[r],
                        this._s2 = c[this._s1 = this._si = 0]
                    } else if (t < this._l1 && r > 0) {
                        for (; r > 0 && (this._l1 = p[--r]) >= t; )
                            ;
                        0 === r && t < this._l1 ? this._l1 = 0 : r++,
                        this._l2 = p[r],
                        this._li = r,
                        this._curSeg = c = this._segments[r],
                        this._s1 = c[(this._si = c.length - 1) - 1] || 0,
                        this._s2 = c[this._si]
                    }
                    if (i = r,
                    t -= this._l1,
                    r = this._si,
                    t > this._s2 && r < c.length - 1) {
                        for (u = c.length - 1; u > r && (this._s2 = c[++r]) <= t; )
                            ;
                        this._s1 = c[r - 1],
                        this._si = r
                    } else if (t < this._s1 && r > 0) {
                        for (; r > 0 && (this._s1 = c[--r]) >= t; )
                            ;
                        0 === r && t < this._s1 ? this._s1 = 0 : r++,
                        this._s2 = c[r],
                        this._si = r
                    }
                    o = (r + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                } else
                    i = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0,
                    o = (t - i * (1 / h)) * h;
                for (a = 1 - o,
                r = this._props.length; --r > -1; )
                    s = this._props[r],
                    n = this._beziers[s][i],
                    l = (o * o * n.da + 3 * a * (o * n.ca + a * n.ba)) * o + n.a,
                    this._mod[s] && (l = this._mod[s](l, f)),
                    d[s] ? f[s](l) : f[s] = l;
                if (this._autoRotate) {
                    var g, v, y, _, w, x, b, T = this._autoRotate;
                    for (r = T.length; --r > -1; )
                        s = T[r][2],
                        x = T[r][3] || 0,
                        b = T[r][4] === !0 ? 1 : e,
                        n = this._beziers[T[r][0]],
                        g = this._beziers[T[r][1]],
                        n && g && (n = n[i],
                        g = g[i],
                        v = n.a + (n.b - n.a) * o,
                        _ = n.b + (n.c - n.b) * o,
                        v += (_ - v) * o,
                        _ += (n.c + (n.d - n.c) * o - _) * o,
                        y = g.a + (g.b - g.a) * o,
                        w = g.b + (g.c - g.b) * o,
                        y += (w - y) * o,
                        w += (g.c + (g.d - g.c) * o - w) * o,
                        l = m ? Math.atan2(w - y, _ - v) * b + x : this._initialRotations[r],
                        this._mod[s] && (l = this._mod[s](l, f)),
                        d[s] ? f[s](l) : f[s] = l)
                }
            }
        })
          , g = m.prototype;
        m.bezierThrough = c,
        m.cubicToQuadratic = l,
        m._autoCSS = !0,
        m.quadraticToCubic = function(e, t, i) {
            return new n(e,(2 * t + e) / 3,(2 * t + i) / 3,i)
        }
        ,
        m._cssRegister = function() {
            var e = s.CSSPlugin;
            if (e) {
                var t = e._internals
                  , i = t._parseToProxy
                  , a = t._setPluginRatio
                  , r = t.CSSPropTween;
                t._registerComplexSpecialProp("bezier", {
                    parser: function(e, t, s, n, o, l) {
                        t instanceof Array && (t = {
                            values: t
                        }),
                        l = new m;
                        var u, p, c, h = t.values, d = h.length - 1, f = [], g = {};
                        if (0 > d)
                            return o;
                        for (u = 0; d >= u; u++)
                            c = i(e, h[u], n, o, l, d !== u),
                            f[u] = c.end;
                        for (p in t)
                            g[p] = t[p];
                        return g.values = f,
                        o = new r(e,"bezier",0,0,c.pt,2),
                        o.data = c,
                        o.plugin = l,
                        o.setRatio = a,
                        0 === g.autoRotate && (g.autoRotate = !0),
                        !g.autoRotate || g.autoRotate instanceof Array || (u = g.autoRotate === !0 ? 0 : Number(g.autoRotate),
                        g.autoRotate = null != c.end.left ? [["left", "top", "rotation", u, !1]] : null != c.end.x ? [["x", "y", "rotation", u, !1]] : !1),
                        g.autoRotate && (n._transform || n._enableTransforms(!1),
                        c.autoRotate = n._target._gsTransform,
                        c.proxy.rotation = c.autoRotate.rotation || 0,
                        n._overwriteProps.push("rotation")),
                        l._onInitTween(c.proxy, g, n._tween),
                        o
                    }
                })
            }
        }
        ,
        g._mod = function(e) {
            for (var t, i = this._overwriteProps, a = i.length; --a > -1; )
                t = e[i[a]],
                t && "function" == typeof t && (this._mod[i[a]] = t)
        }
        ,
        g._kill = function(e) {
            var t, i, a = this._props;
            for (t in this._beziers)
                if (t in e)
                    for (delete this._beziers[t],
                    delete this._func[t],
                    i = a.length; --i > -1; )
                        a[i] === t && a.splice(i, 1);
            if (a = this._autoRotate)
                for (i = a.length; --i > -1; )
                    e[a[i][2]] && a.splice(i, 1);
            return this._super._kill.call(this, e)
        }
    }(),
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
        var i, a, r, s, n = function() {
            e.call(this, "css"),
            this._overwriteProps.length = 0,
            this.setRatio = n.prototype.setRatio
        }, o = _gsScope._gsDefine.globals, l = {}, u = n.prototype = new e("css");
        u.constructor = n,
        n.version = "1.20.0",
        n.API = 2,
        n.defaultTransformPerspective = 0,
        n.defaultSkewType = "compensated",
        n.defaultSmoothOrigin = !0,
        u = "px",
        n.suffixMap = {
            top: u,
            right: u,
            bottom: u,
            left: u,
            width: u,
            height: u,
            fontSize: u,
            padding: u,
            margin: u,
            perspective: u,
            lineHeight: ""
        };
        var p, c, h, d, f, m, g, v, y = /(?:\-|\.|\b)(\d|\.|e\-)+/g, _ = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, w = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, b = /(?:\d|\-|\+|=|#|\.)*/g, T = /opacity *= *([^)]*)/i, S = /opacity:([^;]*)/i, C = /alpha\(opacity *=.+?\)/i, P = /^(rgb|hsl)/, k = /([A-Z])/g, M = /-([a-z])/gi, O = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, z = function(e, t) {
            return t.toUpperCase()
        }, E = /(?:Left|Right|Width)/i, A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, I = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, R = /,(?=[^\)]*(?:\(|$))/gi, D = /[\s,\(]/i, L = Math.PI / 180, B = 180 / Math.PI, N = {}, H = {
            style: {}
        }, F = _gsScope.document || {
            createElement: function() {
                return H
            }
        }, V = function(e, t) {
            return F.createElementNS ? F.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : F.createElement(e)
        }, X = V("div"), Y = V("img"), j = n._internals = {
            _specialProps: l
        }, W = (_gsScope.navigator || {}).userAgent || "", G = function() {
            var e = W.indexOf("Android")
              , t = V("a");
            return h = -1 !== W.indexOf("Safari") && -1 === W.indexOf("Chrome") && (-1 === e || parseFloat(W.substr(e + 8, 2)) > 3),
            f = h && parseFloat(W.substr(W.indexOf("Version/") + 8, 2)) < 6,
            d = -1 !== W.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(W) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(W)) && (m = parseFloat(RegExp.$1)),
            t ? (t.style.cssText = "top:1px;opacity:.55;",
            /^0.55/.test(t.style.opacity)) : !1
        }(), q = function(e) {
            return T.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, Q = function(e) {
            _gsScope.console && console.log(e)
        }, U = "", Z = "", K = function(e, t) {
            t = t || X;
            var i, a, r = t.style;
            if (void 0 !== r[e])
                return e;
            for (e = e.charAt(0).toUpperCase() + e.substr(1),
            i = ["O", "Moz", "ms", "Ms", "Webkit"],
            a = 5; --a > -1 && void 0 === r[i[a] + e]; )
                ;
            return a >= 0 ? (Z = 3 === a ? "ms" : i[a],
            U = "-" + Z.toLowerCase() + "-",
            Z + e) : null
        }, $ = F.defaultView ? F.defaultView.getComputedStyle : function() {}
        , J = n.getStyle = function(e, t, i, a, r) {
            var s;
            return G || "opacity" !== t ? (!a && e.style[t] ? s = e.style[t] : (i = i || $(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(k, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]),
            null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : q(e)
        }
        , ee = j.convertToPixels = function(e, i, a, r, s) {
            if ("px" === r || !r && "lineHeight" !== i)
                return a;
            if ("auto" === r || !a)
                return 0;
            var o, l, u, p = E.test(i), c = e, h = X.style, d = 0 > a, f = 1 === a;
            if (d && (a = -a),
            f && (a *= 100),
            "lineHeight" !== i || r)
                if ("%" === r && -1 !== i.indexOf("border"))
                    o = a / 100 * (p ? e.clientWidth : e.clientHeight);
                else {
                    if (h.cssText = "border:0 solid red;position:" + J(e, "position") + ";line-height:0;",
                    "%" !== r && c.appendChild && "v" !== r.charAt(0) && "rem" !== r)
                        h[p ? "borderLeftWidth" : "borderTopWidth"] = a + r;
                    else {
                        if (c = e.parentNode || F.body,
                        -1 !== J(c, "display").indexOf("flex") && (h.position = "absolute"),
                        l = c._gsCache,
                        u = t.ticker.frame,
                        l && p && l.time === u)
                            return l.width * a / 100;
                        h[p ? "width" : "height"] = a + r
                    }
                    c.appendChild(X),
                    o = parseFloat(X[p ? "offsetWidth" : "offsetHeight"]),
                    c.removeChild(X),
                    p && "%" === r && n.cacheWidths !== !1 && (l = c._gsCache = c._gsCache || {},
                    l.time = u,
                    l.width = o / a * 100),
                    0 !== o || s || (o = ee(e, i, a, r, !0))
                }
            else
                l = $(e).lineHeight,
                e.style.lineHeight = a,
                o = parseFloat($(e).lineHeight),
                e.style.lineHeight = l;
            return f && (o /= 100),
            d ? -o : o
        }
        , te = j.calculateOffset = function(e, t, i) {
            if ("absolute" !== J(e, "position", i))
                return 0;
            var a = "left" === t ? "Left" : "Top"
              , r = J(e, "margin" + a, i);
            return e["offset" + a] - (ee(e, t, parseFloat(r), r.replace(b, "")) || 0)
        }
        , ie = function(e, t) {
            var i, a, r, s = {};
            if (t = t || $(e, null))
                if (i = t.length)
                    for (; --i > -1; )
                        r = t[i],
                        (-1 === r.indexOf("-transform") || Oe === r) && (s[r.replace(M, z)] = t.getPropertyValue(r));
                else
                    for (i in t)
                        (-1 === i.indexOf("Transform") || Me === i) && (s[i] = t[i]);
            else if (t = e.currentStyle || e.style)
                for (i in t)
                    "string" == typeof i && void 0 === s[i] && (s[i.replace(M, z)] = t[i]);
            return G || (s.opacity = q(e)),
            a = Ye(e, t, !1),
            s.rotation = a.rotation,
            s.skewX = a.skewX,
            s.scaleX = a.scaleX,
            s.scaleY = a.scaleY,
            s.x = a.x,
            s.y = a.y,
            Ee && (s.z = a.z,
            s.rotationX = a.rotationX,
            s.rotationY = a.rotationY,
            s.scaleZ = a.scaleZ),
            s.filters && delete s.filters,
            s
        }, ae = function(e, t, i, a, r) {
            var s, n, o, l = {}, u = e.style;
            for (n in i)
                "cssText" !== n && "length" !== n && isNaN(n) && (t[n] !== (s = i[n]) || r && r[n]) && -1 === n.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[n] = "auto" !== s || "left" !== n && "top" !== n ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[n] || "" === t[n].replace(x, "") ? s : 0 : te(e, n),
                void 0 !== u[n] && (o = new ye(u,n,u[n],o)));
            if (a)
                for (n in a)
                    "className" !== n && (l[n] = a[n]);
            return {
                difs: l,
                firstMPT: o
            }
        }, re = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, se = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ne = function(e, t, i) {
            if ("svg" === (e.nodeName + "").toLowerCase())
                return (i || $(e))[t] || 0;
            if (e.getCTM && Fe(e))
                return e.getBBox()[t] || 0;
            var a = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight)
              , r = re[t]
              , s = r.length;
            for (i = i || $(e, null); --s > -1; )
                a -= parseFloat(J(e, "padding" + r[s], i, !0)) || 0,
                a -= parseFloat(J(e, "border" + r[s] + "Width", i, !0)) || 0;
            return a
        }, oe = function(e, t) {
            if ("contain" === e || "auto" === e || "auto auto" === e)
                return e + " ";
            (null == e || "" === e) && (e = "0 0");
            var i, a = e.split(" "), r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : a[0], s = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : a[1];
            if (a.length > 3 && !t) {
                for (a = e.split(", ").join(",").split(","),
                e = [],
                i = 0; i < a.length; i++)
                    e.push(oe(a[i]));
                return e.join(",")
            }
            return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"),
            ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"),
            e = r + " " + s + (a.length > 2 ? " " + a[2] : ""),
            t && (t.oxp = -1 !== r.indexOf("%"),
            t.oyp = -1 !== s.indexOf("%"),
            t.oxr = "=" === r.charAt(1),
            t.oyr = "=" === s.charAt(1),
            t.ox = parseFloat(r.replace(x, "")),
            t.oy = parseFloat(s.replace(x, "")),
            t.v = e),
            t || e
        }, le = function(e, t) {
            return "function" == typeof e && (e = e(v, g)),
            "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
        }, ue = function(e, t) {
            return "function" == typeof e && (e = e(v, g)),
            null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e) || 0
        }, pe = function(e, t, i, a) {
            var r, s, n, o, l, u = 1e-6;
            return "function" == typeof e && (e = e(v, g)),
            null == e ? o = t : "number" == typeof e ? o = e : (r = 360,
            s = e.split("_"),
            l = "=" === e.charAt(1),
            n = (l ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : B) - (l ? 0 : t),
            s.length && (a && (a[i] = t + n),
            -1 !== e.indexOf("short") && (n %= r,
            n !== n % (r / 2) && (n = 0 > n ? n + r : n - r)),
            -1 !== e.indexOf("_cw") && 0 > n ? n = (n + 9999999999 * r) % r - (n / r | 0) * r : -1 !== e.indexOf("ccw") && n > 0 && (n = (n - 9999999999 * r) % r - (n / r | 0) * r)),
            o = t + n),
            u > o && o > -u && (o = 0),
            o
        }, ce = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, he = function(e, t, i) {
            return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e,
            255 * (1 > 6 * e ? t + (i - t) * e * 6 : .5 > e ? i : 2 > 3 * e ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
        }, de = n.parseColor = function(e, t) {
            var i, a, r, s, n, o, l, u, p, c, h;
            if (e)
                if ("number" == typeof e)
                    i = [e >> 16, e >> 8 & 255, 255 & e];
                else {
                    if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)),
                    ce[e])
                        i = ce[e];
                    else if ("#" === e.charAt(0))
                        4 === e.length && (a = e.charAt(1),
                        r = e.charAt(2),
                        s = e.charAt(3),
                        e = "#" + a + a + r + r + s + s),
                        e = parseInt(e.substr(1), 16),
                        i = [e >> 16, e >> 8 & 255, 255 & e];
                    else if ("hsl" === e.substr(0, 3))
                        if (i = h = e.match(y),
                        t) {
                            if (-1 !== e.indexOf("="))
                                return e.match(_)
                        } else
                            n = Number(i[0]) % 360 / 360,
                            o = Number(i[1]) / 100,
                            l = Number(i[2]) / 100,
                            r = .5 >= l ? l * (o + 1) : l + o - l * o,
                            a = 2 * l - r,
                            i.length > 3 && (i[3] = Number(e[3])),
                            i[0] = he(n + 1 / 3, a, r),
                            i[1] = he(n, a, r),
                            i[2] = he(n - 1 / 3, a, r);
                    else
                        i = e.match(y) || ce.transparent;
                    i[0] = Number(i[0]),
                    i[1] = Number(i[1]),
                    i[2] = Number(i[2]),
                    i.length > 3 && (i[3] = Number(i[3]))
                }
            else
                i = ce.black;
            return t && !h && (a = i[0] / 255,
            r = i[1] / 255,
            s = i[2] / 255,
            u = Math.max(a, r, s),
            p = Math.min(a, r, s),
            l = (u + p) / 2,
            u === p ? n = o = 0 : (c = u - p,
            o = l > .5 ? c / (2 - u - p) : c / (u + p),
            n = u === a ? (r - s) / c + (s > r ? 6 : 0) : u === r ? (s - a) / c + 2 : (a - r) / c + 4,
            n *= 60),
            i[0] = n + .5 | 0,
            i[1] = 100 * o + .5 | 0,
            i[2] = 100 * l + .5 | 0),
            i
        }
        , fe = function(e, t) {
            var i, a, r, s = e.match(me) || [], n = 0, o = "";
            if (!s.length)
                return e;
            for (i = 0; i < s.length; i++)
                a = s[i],
                r = e.substr(n, e.indexOf(a, n) - n),
                n += r.length + a.length,
                a = de(a, t),
                3 === a.length && a.push(1),
                o += r + (t ? "hsla(" + a[0] + "," + a[1] + "%," + a[2] + "%," + a[3] : "rgba(" + a.join(",")) + ")";
            return o + e.substr(n)
        }, me = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (u in ce)
            me += "|" + u + "\\b";
        me = new RegExp(me + ")","gi"),
        n.colorStringFilter = function(e) {
            var t, i = e[0] + " " + e[1];
            me.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("),
            e[0] = fe(e[0], t),
            e[1] = fe(e[1], t)),
            me.lastIndex = 0
        }
        ,
        t.defaultStringFilter || (t.defaultStringFilter = n.colorStringFilter);
        var ge = function(e, t, i, a) {
            if (null == e)
                return function(e) {
                    return e
                }
                ;
            var r, s = t ? (e.match(me) || [""])[0] : "", n = e.split(s).join("").match(w) || [], o = e.substr(0, e.indexOf(n[0])), l = ")" === e.charAt(e.length - 1) ? ")" : "", u = -1 !== e.indexOf(" ") ? " " : ",", p = n.length, c = p > 0 ? n[0].replace(y, "") : "";
            return p ? r = t ? function(e) {
                var t, h, d, f;
                if ("number" == typeof e)
                    e += c;
                else if (a && R.test(e)) {
                    for (f = e.replace(R, "|").split("|"),
                    d = 0; d < f.length; d++)
                        f[d] = r(f[d]);
                    return f.join(",")
                }
                if (t = (e.match(me) || [s])[0],
                h = e.split(t).join("").match(w) || [],
                d = h.length,
                p > d--)
                    for (; ++d < p; )
                        h[d] = i ? h[(d - 1) / 2 | 0] : n[d];
                return o + h.join(u) + u + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
            }
            : function(e) {
                var t, s, h;
                if ("number" == typeof e)
                    e += c;
                else if (a && R.test(e)) {
                    for (s = e.replace(R, "|").split("|"),
                    h = 0; h < s.length; h++)
                        s[h] = r(s[h]);
                    return s.join(",")
                }
                if (t = e.match(w) || [],
                h = t.length,
                p > h--)
                    for (; ++h < p; )
                        t[h] = i ? t[(h - 1) / 2 | 0] : n[h];
                return o + t.join(u) + l
            }
            : function(e) {
                return e
            }
        }
          , ve = function(e) {
            return e = e.split(","),
            function(t, i, a, r, s, n, o) {
                var l, u = (i + "").split(" ");
                for (o = {},
                l = 0; 4 > l; l++)
                    o[e[l]] = u[l] = u[l] || u[(l - 1) / 2 >> 0];
                return r.parse(t, o, s, n)
            }
        }
          , ye = (j._setPluginRatio = function(e) {
            this.plugin.setRatio(e);
            for (var t, i, a, r, s, n = this.data, o = n.proxy, l = n.firstMPT, u = 1e-6; l; )
                t = o[l.v],
                l.r ? t = Math.round(t) : u > t && t > -u && (t = 0),
                l.t[l.p] = t,
                l = l._next;
            if (n.autoRotate && (n.autoRotate.rotation = n.mod ? n.mod(o.rotation, this.t) : o.rotation),
            1 === e || 0 === e)
                for (l = n.firstMPT,
                s = 1 === e ? "e" : "b"; l; ) {
                    if (i = l.t,
                    i.type) {
                        if (1 === i.type) {
                            for (r = i.xs0 + i.s + i.xs1,
                            a = 1; a < i.l; a++)
                                r += i["xn" + a] + i["xs" + (a + 1)];
                            i[s] = r
                        }
                    } else
                        i[s] = i.s + i.xs0;
                    l = l._next
                }
        }
        ,
        function(e, t, i, a, r) {
            this.t = e,
            this.p = t,
            this.v = i,
            this.r = r,
            a && (a._prev = this,
            this._next = a)
        }
        )
          , _e = (j._parseToProxy = function(e, t, i, a, r, s) {
            var n, o, l, u, p, c = a, h = {}, d = {}, f = i._transform, m = N;
            for (i._transform = null,
            N = t,
            a = p = i.parse(e, t, a, r),
            N = m,
            s && (i._transform = f,
            c && (c._prev = null,
            c._prev && (c._prev._next = null))); a && a !== c; ) {
                if (a.type <= 1 && (o = a.p,
                d[o] = a.s + a.c,
                h[o] = a.s,
                s || (u = new ye(a,"s",o,u,a.r),
                a.c = 0),
                1 === a.type))
                    for (n = a.l; --n > 0; )
                        l = "xn" + n,
                        o = a.p + "_" + l,
                        d[o] = a.data[l],
                        h[o] = a[l],
                        s || (u = new ye(a,l,o,u,a.rxp[l]));
                a = a._next
            }
            return {
                proxy: h,
                end: d,
                firstMPT: u,
                pt: p
            }
        }
        ,
        j.CSSPropTween = function(e, t, a, r, n, o, l, u, p, c, h) {
            this.t = e,
            this.p = t,
            this.s = a,
            this.c = r,
            this.n = l || t,
            e instanceof _e || s.push(this.n),
            this.r = u,
            this.type = o || 0,
            p && (this.pr = p,
            i = !0),
            this.b = void 0 === c ? a : c,
            this.e = void 0 === h ? a + r : h,
            n && (this._next = n,
            n._prev = this)
        }
        )
          , we = function(e, t, i, a, r, s) {
            var n = new _e(e,t,i,a - i,r,-1,s);
            return n.b = i,
            n.e = n.xs0 = a,
            n
        }
          , xe = n.parseComplex = function(e, t, i, a, r, s, o, l, u, c) {
            i = i || s || "",
            "function" == typeof a && (a = a(v, g)),
            o = new _e(e,t,0,0,o,c ? 2 : 1,null,!1,l,i,a),
            a += "",
            r && me.test(a + i) && (a = [i, a],
            n.colorStringFilter(a),
            i = a[0],
            a = a[1]);
            var h, d, f, m, w, x, b, T, S, C, P, k, M, O = i.split(", ").join(",").split(" "), z = a.split(", ").join(",").split(" "), E = O.length, A = p !== !1;
            for ((-1 !== a.indexOf(",") || -1 !== i.indexOf(",")) && (O = O.join(" ").replace(R, ", ").split(" "),
            z = z.join(" ").replace(R, ", ").split(" "),
            E = O.length),
            E !== z.length && (O = (s || "").split(" "),
            E = O.length),
            o.plugin = u,
            o.setRatio = c,
            me.lastIndex = 0,
            h = 0; E > h; h++)
                if (m = O[h],
                w = z[h],
                T = parseFloat(m),
                T || 0 === T)
                    o.appendXtra("", T, le(w, T), w.replace(_, ""), A && -1 !== w.indexOf("px"), !0);
                else if (r && me.test(m))
                    k = w.indexOf(")") + 1,
                    k = ")" + (k ? w.substr(k) : ""),
                    M = -1 !== w.indexOf("hsl") && G,
                    C = w,
                    m = de(m, M),
                    w = de(w, M),
                    S = m.length + w.length > 6,
                    S && !G && 0 === w[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent",
                    o.e = o.e.split(z[h]).join("transparent")) : (G || (S = !1),
                    M ? o.appendXtra(C.substr(0, C.indexOf("hsl")) + (S ? "hsla(" : "hsl("), m[0], le(w[0], m[0]), ",", !1, !0).appendXtra("", m[1], le(w[1], m[1]), "%,", !1).appendXtra("", m[2], le(w[2], m[2]), S ? "%," : "%" + k, !1) : o.appendXtra(C.substr(0, C.indexOf("rgb")) + (S ? "rgba(" : "rgb("), m[0], w[0] - m[0], ",", !0, !0).appendXtra("", m[1], w[1] - m[1], ",", !0).appendXtra("", m[2], w[2] - m[2], S ? "," : k, !0),
                    S && (m = m.length < 4 ? 1 : m[3],
                    o.appendXtra("", m, (w.length < 4 ? 1 : w[3]) - m, k, !1))),
                    me.lastIndex = 0;
                else if (x = m.match(y)) {
                    if (b = w.match(_),
                    !b || b.length !== x.length)
                        return o;
                    for (f = 0,
                    d = 0; d < x.length; d++)
                        P = x[d],
                        C = m.indexOf(P, f),
                        o.appendXtra(m.substr(f, C - f), Number(P), le(b[d], P), "", A && "px" === m.substr(C + P.length, 2), 0 === d),
                        f = C + P.length;
                    o["xs" + o.l] += m.substr(f)
                } else
                    o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + w : w;
            if (-1 !== a.indexOf("=") && o.data) {
                for (k = o.xs0 + o.data.s,
                h = 1; h < o.l; h++)
                    k += o["xs" + h] + o.data["xn" + h];
                o.e = k + o["xs" + h]
            }
            return o.l || (o.type = -1,
            o.xs0 = o.e),
            o.xfirst || o
        }
          , be = 9;
        for (u = _e.prototype,
        u.l = u.pr = 0; --be > 0; )
            u["xn" + be] = 0,
            u["xs" + be] = "";
        u.xs0 = "",
        u._next = u._prev = u.xfirst = u.data = u.plugin = u.setRatio = u.rxp = null,
        u.appendXtra = function(e, t, i, a, r, s) {
            var n = this
              , o = n.l;
            return n["xs" + o] += s && (o || n["xs" + o]) ? " " + e : e || "",
            i || 0 === o || n.plugin ? (n.l++,
            n.type = n.setRatio ? 2 : 1,
            n["xs" + n.l] = a || "",
            o > 0 ? (n.data["xn" + o] = t + i,
            n.rxp["xn" + o] = r,
            n["xn" + o] = t,
            n.plugin || (n.xfirst = new _e(n,"xn" + o,t,i,n.xfirst || n,0,n.n,r,n.pr),
            n.xfirst.xs0 = 0),
            n) : (n.data = {
                s: t + i
            },
            n.rxp = {},
            n.s = t,
            n.c = i,
            n.r = r,
            n)) : (n["xs" + o] += t + (a || ""),
            n)
        }
        ;
        var Te = function(e, t) {
            t = t || {},
            this.p = t.prefix ? K(e) || e : e,
            l[e] = l[this.p] = this,
            this.format = t.formatter || ge(t.defaultValue, t.color, t.collapsible, t.multi),
            t.parser && (this.parse = t.parser),
            this.clrs = t.color,
            this.multi = t.multi,
            this.keyword = t.keyword,
            this.dflt = t.defaultValue,
            this.pr = t.priority || 0
        }
          , Se = j._registerComplexSpecialProp = function(e, t, i) {
            "object" != typeof t && (t = {
                parser: i
            });
            var a, r, s = e.split(","), n = t.defaultValue;
            for (i = i || [n],
            a = 0; a < s.length; a++)
                t.prefix = 0 === a && t.prefix,
                t.defaultValue = i[a] || n,
                r = new Te(s[a],t)
        }
          , Ce = j._registerPluginProp = function(e) {
            if (!l[e]) {
                var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                Se(e, {
                    parser: function(e, i, a, r, s, n, u) {
                        var p = o.com.greensock.plugins[t];
                        return p ? (p._cssRegister(),
                        l[a].parse(e, i, a, r, s, n, u)) : (Q("Error: " + t + " js file not loaded."),
                        s)
                    }
                })
            }
        }
        ;
        u = Te.prototype,
        u.parseComplex = function(e, t, i, a, r, s) {
            var n, o, l, u, p, c, h = this.keyword;
            if (this.multi && (R.test(i) || R.test(t) ? (o = t.replace(R, "|").split("|"),
            l = i.replace(R, "|").split("|")) : h && (o = [t],
            l = [i])),
            l) {
                for (u = l.length > o.length ? l.length : o.length,
                n = 0; u > n; n++)
                    t = o[n] = o[n] || this.dflt,
                    i = l[n] = l[n] || this.dflt,
                    h && (p = t.indexOf(h),
                    c = i.indexOf(h),
                    p !== c && (-1 === c ? o[n] = o[n].split(h).join("") : -1 === p && (o[n] += " " + h)));
                t = o.join(", "),
                i = l.join(", ")
            }
            return xe(e, this.p, t, i, this.clrs, this.dflt, a, this.pr, r, s)
        }
        ,
        u.parse = function(e, t, i, a, s, n, o) {
            return this.parseComplex(e.style, this.format(J(e, this.p, r, !1, this.dflt)), this.format(t), s, n)
        }
        ,
        n.registerSpecialProp = function(e, t, i) {
            Se(e, {
                parser: function(e, a, r, s, n, o, l) {
                    var u = new _e(e,r,0,0,n,2,r,!1,i);
                    return u.plugin = o,
                    u.setRatio = t(e, a, s._tween, r),
                    u
                },
                priority: i
            })
        }
        ,
        n.useSVGTransformAttr = !0;
        var Pe, ke = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), Me = K("transform"), Oe = U + "transform", ze = K("transformOrigin"), Ee = null !== K("perspective"), Ae = j.Transform = function() {
            this.perspective = parseFloat(n.defaultTransformPerspective) || 0,
            this.force3D = n.defaultForce3D !== !1 && Ee ? n.defaultForce3D || "auto" : !1
        }
        , Ie = _gsScope.SVGElement, Re = function(e, t, i) {
            var a, r = F.createElementNS("http://www.w3.org/2000/svg", e), s = /([a-z])([A-Z])/g;
            for (a in i)
                r.setAttributeNS(null, a.replace(s, "$1-$2").toLowerCase(), i[a]);
            return t.appendChild(r),
            r
        }, De = F.documentElement || {}, Le = function() {
            var e, t, i, a = m || /Android/i.test(W) && !_gsScope.chrome;
            return F.createElementNS && !a && (e = Re("svg", De),
            t = Re("rect", e, {
                width: 100,
                height: 50,
                x: 100
            }),
            i = t.getBoundingClientRect().width,
            t.style[ze] = "50% 50%",
            t.style[Me] = "scaleX(0.5)",
            a = i === t.getBoundingClientRect().width && !(d && Ee),
            De.removeChild(e)),
            a
        }(), Be = function(e, t, i, a, r, s) {
            var o, l, u, p, c, h, d, f, m, g, v, y, _, w, x = e._gsTransform, b = Xe(e, !0);
            x && (_ = x.xOrigin,
            w = x.yOrigin),
            (!a || (o = a.split(" ")).length < 2) && (d = e.getBBox(),
            0 === d.x && 0 === d.y && d.width + d.height === 0 && (d = {
                x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                width: 0,
                height: 0
            }),
            t = oe(t).split(" "),
            o = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * d.width : parseFloat(t[0])) + d.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * d.height : parseFloat(t[1])) + d.y]),
            i.xOrigin = p = parseFloat(o[0]),
            i.yOrigin = c = parseFloat(o[1]),
            a && b !== Ve && (h = b[0],
            d = b[1],
            f = b[2],
            m = b[3],
            g = b[4],
            v = b[5],
            y = h * m - d * f,
            y && (l = p * (m / y) + c * (-f / y) + (f * v - m * g) / y,
            u = p * (-d / y) + c * (h / y) - (h * v - d * g) / y,
            p = i.xOrigin = o[0] = l,
            c = i.yOrigin = o[1] = u)),
            x && (s && (i.xOffset = x.xOffset,
            i.yOffset = x.yOffset,
            x = i),
            r || r !== !1 && n.defaultSmoothOrigin !== !1 ? (l = p - _,
            u = c - w,
            x.xOffset += l * b[0] + u * b[2] - l,
            x.yOffset += l * b[1] + u * b[3] - u) : x.xOffset = x.yOffset = 0),
            s || e.setAttribute("data-svg-origin", o.join(" "))
        }, Ne = function(e) {
            var t, i = V("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), a = this.parentNode, r = this.nextSibling, s = this.style.cssText;
            if (De.appendChild(i),
            i.appendChild(this),
            this.style.display = "block",
            e)
                try {
                    t = this.getBBox(),
                    this._originalGetBBox = this.getBBox,
                    this.getBBox = Ne
                } catch (n) {}
            else
                this._originalGetBBox && (t = this._originalGetBBox());
            return r ? a.insertBefore(this, r) : a.appendChild(this),
            De.removeChild(i),
            this.style.cssText = s,
            t
        }, He = function(e) {
            try {
                return e.getBBox()
            } catch (t) {
                return Ne.call(e, !0)
            }
        }, Fe = function(e) {
            return !(!(Ie && e.getCTM && He(e)) || e.parentNode && !e.ownerSVGElement)
        }, Ve = [1, 0, 0, 1, 0, 0], Xe = function(e, t) {
            var i, a, r, s, n, o, l = e._gsTransform || new Ae, u = 1e5, p = e.style;
            if (Me ? a = J(e, Oe, null, !0) : e.currentStyle && (a = e.currentStyle.filter.match(A),
            a = a && 4 === a.length ? [a[0].substr(4), Number(a[2].substr(4)), Number(a[1].substr(4)), a[3].substr(4), l.x || 0, l.y || 0].join(",") : ""),
            i = !a || "none" === a || "matrix(1, 0, 0, 1, 0, 0)" === a,
            !Me || !(o = "none" === $(e).display) && e.parentNode || (o && (s = p.display,
            p.display = "block"),
            e.parentNode || (n = 1,
            De.appendChild(e)),
            a = J(e, Oe, null, !0),
            i = !a || "none" === a || "matrix(1, 0, 0, 1, 0, 0)" === a,
            s ? p.display = s : o && qe(p, "display"),
            n && De.removeChild(e)),
            (l.svg || e.getCTM && Fe(e)) && (i && -1 !== (p[Me] + "").indexOf("matrix") && (a = p[Me],
            i = 0),
            r = e.getAttribute("transform"),
            i && r && (-1 !== r.indexOf("matrix") ? (a = r,
            i = 0) : -1 !== r.indexOf("translate") && (a = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")",
            i = 0))),
            i)
                return Ve;
            for (r = (a || "").match(y) || [],
            be = r.length; --be > -1; )
                s = Number(r[be]),
                r[be] = (n = s - (s |= 0)) ? (n * u + (0 > n ? -.5 : .5) | 0) / u + s : s;
            return t && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
        }, Ye = j.getTransform = function(e, i, a, r) {
            if (e._gsTransform && a && !r)
                return e._gsTransform;
            var s, o, l, u, p, c, h = a ? e._gsTransform || new Ae : new Ae, d = h.scaleX < 0, f = 2e-5, m = 1e5, g = Ee ? parseFloat(J(e, ze, i, !1, "0 0 0").split(" ")[2]) || h.zOrigin || 0 : 0, v = parseFloat(n.defaultTransformPerspective) || 0;
            if (h.svg = !(!e.getCTM || !Fe(e)),
            h.svg && (Be(e, J(e, ze, i, !1, "50% 50%") + "", h, e.getAttribute("data-svg-origin")),
            Pe = n.useSVGTransformAttr || Le),
            s = Xe(e),
            s !== Ve) {
                if (16 === s.length) {
                    var y, _, w, x, b, T = s[0], S = s[1], C = s[2], P = s[3], k = s[4], M = s[5], O = s[6], z = s[7], E = s[8], A = s[9], I = s[10], R = s[12], D = s[13], L = s[14], N = s[11], H = Math.atan2(O, I);
                    h.zOrigin && (L = -h.zOrigin,
                    R = E * L - s[12],
                    D = A * L - s[13],
                    L = I * L + h.zOrigin - s[14]),
                    h.rotationX = H * B,
                    H && (x = Math.cos(-H),
                    b = Math.sin(-H),
                    y = k * x + E * b,
                    _ = M * x + A * b,
                    w = O * x + I * b,
                    E = k * -b + E * x,
                    A = M * -b + A * x,
                    I = O * -b + I * x,
                    N = z * -b + N * x,
                    k = y,
                    M = _,
                    O = w),
                    H = Math.atan2(-C, I),
                    h.rotationY = H * B,
                    H && (x = Math.cos(-H),
                    b = Math.sin(-H),
                    y = T * x - E * b,
                    _ = S * x - A * b,
                    w = C * x - I * b,
                    A = S * b + A * x,
                    I = C * b + I * x,
                    N = P * b + N * x,
                    T = y,
                    S = _,
                    C = w),
                    H = Math.atan2(S, T),
                    h.rotation = H * B,
                    H && (x = Math.cos(H),
                    b = Math.sin(H),
                    y = T * x + S * b,
                    _ = k * x + M * b,
                    w = E * x + A * b,
                    S = S * x - T * b,
                    M = M * x - k * b,
                    A = A * x - E * b,
                    T = y,
                    k = _,
                    E = w),
                    h.rotationX && Math.abs(h.rotationX) + Math.abs(h.rotation) > 359.9 && (h.rotationX = h.rotation = 0,
                    h.rotationY = 180 - h.rotationY),
                    H = Math.atan2(k, M),
                    h.scaleX = (Math.sqrt(T * T + S * S + C * C) * m + .5 | 0) / m,
                    h.scaleY = (Math.sqrt(M * M + O * O) * m + .5 | 0) / m,
                    h.scaleZ = (Math.sqrt(E * E + A * A + I * I) * m + .5 | 0) / m,
                    T /= h.scaleX,
                    k /= h.scaleY,
                    S /= h.scaleX,
                    M /= h.scaleY,
                    Math.abs(H) > f ? (h.skewX = H * B,
                    k = 0,
                    "simple" !== h.skewType && (h.scaleY *= 1 / Math.cos(H))) : h.skewX = 0,
                    h.perspective = N ? 1 / (0 > N ? -N : N) : 0,
                    h.x = R,
                    h.y = D,
                    h.z = L,
                    h.svg && (h.x -= h.xOrigin - (h.xOrigin * T - h.yOrigin * k),
                    h.y -= h.yOrigin - (h.yOrigin * S - h.xOrigin * M))
                } else if (!Ee || r || !s.length || h.x !== s[4] || h.y !== s[5] || !h.rotationX && !h.rotationY) {
                    var F = s.length >= 6
                      , V = F ? s[0] : 1
                      , X = s[1] || 0
                      , Y = s[2] || 0
                      , j = F ? s[3] : 1;
                    h.x = s[4] || 0,
                    h.y = s[5] || 0,
                    l = Math.sqrt(V * V + X * X),
                    u = Math.sqrt(j * j + Y * Y),
                    p = V || X ? Math.atan2(X, V) * B : h.rotation || 0,
                    c = Y || j ? Math.atan2(Y, j) * B + p : h.skewX || 0,
                    h.scaleX = l,
                    h.scaleY = u,
                    h.rotation = p,
                    h.skewX = c,
                    Ee && (h.rotationX = h.rotationY = h.z = 0,
                    h.perspective = v,
                    h.scaleZ = 1),
                    h.svg && (h.x -= h.xOrigin - (h.xOrigin * V + h.yOrigin * Y),
                    h.y -= h.yOrigin - (h.xOrigin * X + h.yOrigin * j))
                }
                Math.abs(h.skewX) > 90 && Math.abs(h.skewX) < 270 && (d ? (h.scaleX *= -1,
                h.skewX += h.rotation <= 0 ? 180 : -180,
                h.rotation += h.rotation <= 0 ? 180 : -180) : (h.scaleY *= -1,
                h.skewX += h.skewX <= 0 ? 180 : -180)),
                h.zOrigin = g;
                for (o in h)
                    h[o] < f && h[o] > -f && (h[o] = 0)
            }
            return a && (e._gsTransform = h,
            h.svg && (Pe && e.style[Me] ? t.delayedCall(.001, function() {
                qe(e.style, Me)
            }) : !Pe && e.getAttribute("transform") && t.delayedCall(.001, function() {
                e.removeAttribute("transform")
            }))),
            h
        }
        , je = function(e) {
            var t, i, a = this.data, r = -a.rotation * L, s = r + a.skewX * L, n = 1e5, o = (Math.cos(r) * a.scaleX * n | 0) / n, l = (Math.sin(r) * a.scaleX * n | 0) / n, u = (Math.sin(s) * -a.scaleY * n | 0) / n, p = (Math.cos(s) * a.scaleY * n | 0) / n, c = this.t.style, h = this.t.currentStyle;
            if (h) {
                i = l,
                l = -u,
                u = -i,
                t = h.filter,
                c.filter = "";
                var d, f, g = this.t.offsetWidth, v = this.t.offsetHeight, y = "absolute" !== h.position, _ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + u + ", M22=" + p, w = a.x + g * a.xPercent / 100, x = a.y + v * a.yPercent / 100;
                if (null != a.ox && (d = (a.oxp ? g * a.ox * .01 : a.ox) - g / 2,
                f = (a.oyp ? v * a.oy * .01 : a.oy) - v / 2,
                w += d - (d * o + f * l),
                x += f - (d * u + f * p)),
                y ? (d = g / 2,
                f = v / 2,
                _ += ", Dx=" + (d - (d * o + f * l) + w) + ", Dy=" + (f - (d * u + f * p) + x) + ")") : _ += ", sizingMethod='auto expand')",
                -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = t.replace(I, _) : c.filter = _ + " " + t,
                (0 === e || 1 === e) && 1 === o && 0 === l && 0 === u && 1 === p && (y && -1 === _.indexOf("Dx=0, Dy=0") || T.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")),
                !y) {
                    var S, C, P, k = 8 > m ? 1 : -1;
                    for (d = a.ieOffsetX || 0,
                    f = a.ieOffsetY || 0,
                    a.ieOffsetX = Math.round((g - ((0 > o ? -o : o) * g + (0 > l ? -l : l) * v)) / 2 + w),
                    a.ieOffsetY = Math.round((v - ((0 > p ? -p : p) * v + (0 > u ? -u : u) * g)) / 2 + x),
                    be = 0; 4 > be; be++)
                        C = se[be],
                        S = h[C],
                        i = -1 !== S.indexOf("px") ? parseFloat(S) : ee(this.t, C, parseFloat(S), S.replace(b, "")) || 0,
                        P = i !== a[C] ? 2 > be ? -a.ieOffsetX : -a.ieOffsetY : 2 > be ? d - a.ieOffsetX : f - a.ieOffsetY,
                        c[C] = (a[C] = Math.round(i - P * (0 === be || 2 === be ? 1 : k))) + "px"
                }
            }
        }, We = j.set3DTransformRatio = j.setTransformRatio = function(e) {
            var t, i, a, r, s, n, o, l, u, p, c, h, f, m, g, v, y, _, w, x, b, T, S, C = this.data, P = this.t.style, k = C.rotation, M = C.rotationX, O = C.rotationY, z = C.scaleX, E = C.scaleY, A = C.scaleZ, I = C.x, R = C.y, D = C.z, B = C.svg, N = C.perspective, H = C.force3D, F = C.skewY, V = C.skewX;
            if (F && (V += F,
            k += F),
            ((1 === e || 0 === e) && "auto" === H && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !H) && !D && !N && !O && !M && 1 === A || Pe && B || !Ee)
                return void (k || V || B ? (k *= L,
                T = V * L,
                S = 1e5,
                i = Math.cos(k) * z,
                s = Math.sin(k) * z,
                a = Math.sin(k - T) * -E,
                n = Math.cos(k - T) * E,
                T && "simple" === C.skewType && (t = Math.tan(T - F * L),
                t = Math.sqrt(1 + t * t),
                a *= t,
                n *= t,
                F && (t = Math.tan(F * L),
                t = Math.sqrt(1 + t * t),
                i *= t,
                s *= t)),
                B && (I += C.xOrigin - (C.xOrigin * i + C.yOrigin * a) + C.xOffset,
                R += C.yOrigin - (C.xOrigin * s + C.yOrigin * n) + C.yOffset,
                Pe && (C.xPercent || C.yPercent) && (g = this.t.getBBox(),
                I += .01 * C.xPercent * g.width,
                R += .01 * C.yPercent * g.height),
                g = 1e-6,
                g > I && I > -g && (I = 0),
                g > R && R > -g && (R = 0)),
                w = (i * S | 0) / S + "," + (s * S | 0) / S + "," + (a * S | 0) / S + "," + (n * S | 0) / S + "," + I + "," + R + ")",
                B && Pe ? this.t.setAttribute("transform", "matrix(" + w) : P[Me] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + w) : P[Me] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + z + ",0,0," + E + "," + I + "," + R + ")");
            if (d && (g = 1e-4,
            g > z && z > -g && (z = A = 2e-5),
            g > E && E > -g && (E = A = 2e-5),
            !N || C.z || C.rotationX || C.rotationY || (N = 0)),
            k || V)
                k *= L,
                v = i = Math.cos(k),
                y = s = Math.sin(k),
                V && (k -= V * L,
                v = Math.cos(k),
                y = Math.sin(k),
                "simple" === C.skewType && (t = Math.tan((V - F) * L),
                t = Math.sqrt(1 + t * t),
                v *= t,
                y *= t,
                C.skewY && (t = Math.tan(F * L),
                t = Math.sqrt(1 + t * t),
                i *= t,
                s *= t))),
                a = -y,
                n = v;
            else {
                if (!(O || M || 1 !== A || N || B))
                    return void (P[Me] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) translate3d(" : "translate3d(") + I + "px," + R + "px," + D + "px)" + (1 !== z || 1 !== E ? " scale(" + z + "," + E + ")" : ""));
                i = n = 1,
                a = s = 0
            }
            p = 1,
            r = o = l = u = c = h = 0,
            f = N ? -1 / N : 0,
            m = C.zOrigin,
            g = 1e-6,
            x = ",",
            b = "0",
            k = O * L,
            k && (v = Math.cos(k),
            y = Math.sin(k),
            l = -y,
            c = f * -y,
            r = i * y,
            o = s * y,
            p = v,
            f *= v,
            i *= v,
            s *= v),
            k = M * L,
            k && (v = Math.cos(k),
            y = Math.sin(k),
            t = a * v + r * y,
            _ = n * v + o * y,
            u = p * y,
            h = f * y,
            r = a * -y + r * v,
            o = n * -y + o * v,
            p *= v,
            f *= v,
            a = t,
            n = _),
            1 !== A && (r *= A,
            o *= A,
            p *= A,
            f *= A),
            1 !== E && (a *= E,
            n *= E,
            u *= E,
            h *= E),
            1 !== z && (i *= z,
            s *= z,
            l *= z,
            c *= z),
            (m || B) && (m && (I += r * -m,
            R += o * -m,
            D += p * -m + m),
            B && (I += C.xOrigin - (C.xOrigin * i + C.yOrigin * a) + C.xOffset,
            R += C.yOrigin - (C.xOrigin * s + C.yOrigin * n) + C.yOffset),
            g > I && I > -g && (I = b),
            g > R && R > -g && (R = b),
            g > D && D > -g && (D = 0)),
            w = C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix3d(" : "matrix3d(",
            w += (g > i && i > -g ? b : i) + x + (g > s && s > -g ? b : s) + x + (g > l && l > -g ? b : l),
            w += x + (g > c && c > -g ? b : c) + x + (g > a && a > -g ? b : a) + x + (g > n && n > -g ? b : n),
            M || O || 1 !== A ? (w += x + (g > u && u > -g ? b : u) + x + (g > h && h > -g ? b : h) + x + (g > r && r > -g ? b : r),
            w += x + (g > o && o > -g ? b : o) + x + (g > p && p > -g ? b : p) + x + (g > f && f > -g ? b : f) + x) : w += ",0,0,0,0,1,0,",
            w += I + x + R + x + D + x + (N ? 1 + -D / N : 1) + ")",
            P[Me] = w
        }
        ;
        u = Ae.prototype,
        u.x = u.y = u.z = u.skewX = u.skewY = u.rotation = u.rotationX = u.rotationY = u.zOrigin = u.xPercent = u.yPercent = u.xOffset = u.yOffset = 0,
        u.scaleX = u.scaleY = u.scaleZ = 1,
        Se("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(e, t, i, a, s, o, l) {
                if (a._lastParsedTransform === l)
                    return s;
                a._lastParsedTransform = l;
                var u, p = l.scale && "function" == typeof l.scale ? l.scale : 0;
                "function" == typeof l[i] && (u = l[i],
                l[i] = t),
                p && (l.scale = p(v, e));
                var c, h, d, f, m, y, _, w, x, b = e._gsTransform, T = e.style, S = 1e-6, C = ke.length, P = l, k = {}, M = "transformOrigin", O = Ye(e, r, !0, P.parseTransform), z = P.transform && ("function" == typeof P.transform ? P.transform(v, g) : P.transform);
                if (O.skewType = P.skewType || O.skewType || n.defaultSkewType,
                a._transform = O,
                z && "string" == typeof z && Me)
                    h = X.style,
                    h[Me] = z,
                    h.display = "block",
                    h.position = "absolute",
                    F.body.appendChild(X),
                    c = Ye(X, null, !1),
                    "simple" === O.skewType && (c.scaleY *= Math.cos(c.skewX * L)),
                    O.svg && (y = O.xOrigin,
                    _ = O.yOrigin,
                    c.x -= O.xOffset,
                    c.y -= O.yOffset,
                    (P.transformOrigin || P.svgOrigin) && (z = {},
                    Be(e, oe(P.transformOrigin), z, P.svgOrigin, P.smoothOrigin, !0),
                    y = z.xOrigin,
                    _ = z.yOrigin,
                    c.x -= z.xOffset - O.xOffset,
                    c.y -= z.yOffset - O.yOffset),
                    (y || _) && (w = Xe(X, !0),
                    c.x -= y - (y * w[0] + _ * w[2]),
                    c.y -= _ - (y * w[1] + _ * w[3]))),
                    F.body.removeChild(X),
                    c.perspective || (c.perspective = O.perspective),
                    null != P.xPercent && (c.xPercent = ue(P.xPercent, O.xPercent)),
                    null != P.yPercent && (c.yPercent = ue(P.yPercent, O.yPercent));
                else if ("object" == typeof P) {
                    if (c = {
                        scaleX: ue(null != P.scaleX ? P.scaleX : P.scale, O.scaleX),
                        scaleY: ue(null != P.scaleY ? P.scaleY : P.scale, O.scaleY),
                        scaleZ: ue(P.scaleZ, O.scaleZ),
                        x: ue(P.x, O.x),
                        y: ue(P.y, O.y),
                        z: ue(P.z, O.z),
                        xPercent: ue(P.xPercent, O.xPercent),
                        yPercent: ue(P.yPercent, O.yPercent),
                        perspective: ue(P.transformPerspective, O.perspective)
                    },
                    m = P.directionalRotation,
                    null != m)
                        if ("object" == typeof m)
                            for (h in m)
                                P[h] = m[h];
                        else
                            P.rotation = m;
                    "string" == typeof P.x && -1 !== P.x.indexOf("%") && (c.x = 0,
                    c.xPercent = ue(P.x, O.xPercent)),
                    "string" == typeof P.y && -1 !== P.y.indexOf("%") && (c.y = 0,
                    c.yPercent = ue(P.y, O.yPercent)),
                    c.rotation = pe("rotation"in P ? P.rotation : "shortRotation"in P ? P.shortRotation + "_short" : "rotationZ"in P ? P.rotationZ : O.rotation, O.rotation, "rotation", k),
                    Ee && (c.rotationX = pe("rotationX"in P ? P.rotationX : "shortRotationX"in P ? P.shortRotationX + "_short" : O.rotationX || 0, O.rotationX, "rotationX", k),
                    c.rotationY = pe("rotationY"in P ? P.rotationY : "shortRotationY"in P ? P.shortRotationY + "_short" : O.rotationY || 0, O.rotationY, "rotationY", k)),
                    c.skewX = pe(P.skewX, O.skewX),
                    c.skewY = pe(P.skewY, O.skewY)
                }
                for (Ee && null != P.force3D && (O.force3D = P.force3D,
                f = !0),
                d = O.force3D || O.z || O.rotationX || O.rotationY || c.z || c.rotationX || c.rotationY || c.perspective,
                d || null == P.scale || (c.scaleZ = 1); --C > -1; )
                    x = ke[C],
                    z = c[x] - O[x],
                    (z > S || -S > z || null != P[x] || null != N[x]) && (f = !0,
                    s = new _e(O,x,O[x],z,s),
                    x in k && (s.e = k[x]),
                    s.xs0 = 0,
                    s.plugin = o,
                    a._overwriteProps.push(s.n));
                return z = P.transformOrigin,
                O.svg && (z || P.svgOrigin) && (y = O.xOffset,
                _ = O.yOffset,
                Be(e, oe(z), c, P.svgOrigin, P.smoothOrigin),
                s = we(O, "xOrigin", (b ? O : c).xOrigin, c.xOrigin, s, M),
                s = we(O, "yOrigin", (b ? O : c).yOrigin, c.yOrigin, s, M),
                (y !== O.xOffset || _ !== O.yOffset) && (s = we(O, "xOffset", b ? y : O.xOffset, O.xOffset, s, M),
                s = we(O, "yOffset", b ? _ : O.yOffset, O.yOffset, s, M)),
                z = "0px 0px"),
                (z || Ee && d && O.zOrigin) && (Me ? (f = !0,
                x = ze,
                z = (z || J(e, x, r, !1, "50% 50%")) + "",
                s = new _e(T,x,0,0,s,-1,M),
                s.b = T[x],
                s.plugin = o,
                Ee ? (h = O.zOrigin,
                z = z.split(" "),
                O.zOrigin = (z.length > 2 && (0 === h || "0px" !== z[2]) ? parseFloat(z[2]) : h) || 0,
                s.xs0 = s.e = z[0] + " " + (z[1] || "50%") + " 0px",
                s = new _e(O,"zOrigin",0,0,s,-1,s.n),
                s.b = h,
                s.xs0 = s.e = O.zOrigin) : s.xs0 = s.e = z) : oe(z + "", O)),
                f && (a._transformType = O.svg && Pe || !d && 3 !== this._transformType ? 2 : 3),
                u && (l[i] = u),
                p && (l.scale = p),
                s
            },
            prefix: !0
        }),
        Se("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }),
        Se("borderRadius", {
            defaultValue: "0px",
            parser: function(e, t, i, s, n, o) {
                t = this.format(t);
                var l, u, p, c, h, d, f, m, g, v, y, _, w, x, b, T, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], C = e.style;
                for (g = parseFloat(e.offsetWidth),
                v = parseFloat(e.offsetHeight),
                l = t.split(" "),
                u = 0; u < S.length; u++)
                    this.p.indexOf("border") && (S[u] = K(S[u])),
                    h = c = J(e, S[u], r, !1, "0px"),
                    -1 !== h.indexOf(" ") && (c = h.split(" "),
                    h = c[0],
                    c = c[1]),
                    d = p = l[u],
                    f = parseFloat(h),
                    _ = h.substr((f + "").length),
                    w = "=" === d.charAt(1),
                    w ? (m = parseInt(d.charAt(0) + "1", 10),
                    d = d.substr(2),
                    m *= parseFloat(d),
                    y = d.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(d),
                    y = d.substr((m + "").length)),
                    "" === y && (y = a[i] || _),
                    y !== _ && (x = ee(e, "borderLeft", f, _),
                    b = ee(e, "borderTop", f, _),
                    "%" === y ? (h = x / g * 100 + "%",
                    c = b / v * 100 + "%") : "em" === y ? (T = ee(e, "borderLeft", 1, "em"),
                    h = x / T + "em",
                    c = b / T + "em") : (h = x + "px",
                    c = b + "px"),
                    w && (d = parseFloat(h) + m + y,
                    p = parseFloat(c) + m + y)),
                    n = xe(C, S[u], h + " " + c, d + " " + p, !1, "0px", n);
                return n
            },
            prefix: !0,
            formatter: ge("0px 0px 0px 0px", !1, !0)
        }),
        Se("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function(e, t, i, a, s, n) {
                return xe(e.style, i, this.format(J(e, i, r, !1, "0px 0px")), this.format(t), !1, "0px", s)
            },
            prefix: !0,
            formatter: ge("0px 0px", !1, !0)
        }),
        Se("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(e, t, i, a, s, n) {
                var o, l, u, p, c, h, d = "background-position", f = r || $(e, null), g = this.format((f ? m ? f.getPropertyValue(d + "-x") + " " + f.getPropertyValue(d + "-y") : f.getPropertyValue(d) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"), v = this.format(t);
                if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && v.split(",").length < 2 && (h = J(e, "backgroundImage").replace(O, ""),
                h && "none" !== h)) {
                    for (o = g.split(" "),
                    l = v.split(" "),
                    Y.setAttribute("src", h),
                    u = 2; --u > -1; )
                        g = o[u],
                        p = -1 !== g.indexOf("%"),
                        p !== (-1 !== l[u].indexOf("%")) && (c = 0 === u ? e.offsetWidth - Y.width : e.offsetHeight - Y.height,
                        o[u] = p ? parseFloat(g) / 100 * c + "px" : parseFloat(g) / c * 100 + "%");
                    g = o.join(" ")
                }
                return this.parseComplex(e.style, g, v, s, n)
            },
            formatter: oe
        }),
        Se("backgroundSize", {
            defaultValue: "0 0",
            formatter: function(e) {
                return e += "",
                oe(-1 === e.indexOf(" ") ? e + " " + e : e)
            }
        }),
        Se("perspective", {
            defaultValue: "0px",
            prefix: !0
        }),
        Se("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }),
        Se("transformStyle", {
            prefix: !0
        }),
        Se("backfaceVisibility", {
            prefix: !0
        }),
        Se("userSelect", {
            prefix: !0
        }),
        Se("margin", {
            parser: ve("marginTop,marginRight,marginBottom,marginLeft")
        }),
        Se("padding", {
            parser: ve("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }),
        Se("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(e, t, i, a, s, n) {
                var o, l, u;
                return 9 > m ? (l = e.currentStyle,
                u = 8 > m ? " " : ",",
                o = "rect(" + l.clipTop + u + l.clipRight + u + l.clipBottom + u + l.clipLeft + ")",
                t = this.format(t).split(",").join(u)) : (o = this.format(J(e, this.p, r, !1, this.dflt)),
                t = this.format(t)),
                this.parseComplex(e.style, o, t, s, n)
            }
        }),
        Se("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }),
        Se("autoRound,strictUnits", {
            parser: function(e, t, i, a, r) {
                return r
            }
        }),
        Se("border", {
            defaultValue: "0px solid #000",
            parser: function(e, t, i, a, s, n) {
                var o = J(e, "borderTopWidth", r, !1, "0px")
                  , l = this.format(t).split(" ")
                  , u = l[0].replace(b, "");
                return "px" !== u && (o = parseFloat(o) / ee(e, "borderTopWidth", 1, u) + u),
                this.parseComplex(e.style, this.format(o + " " + J(e, "borderTopStyle", r, !1, "solid") + " " + J(e, "borderTopColor", r, !1, "#000")), l.join(" "), s, n)
            },
            color: !0,
            formatter: function(e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(me) || ["#000"])[0]
            }
        }),
        Se("borderWidth", {
            parser: ve("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }),
        Se("float,cssFloat,styleFloat", {
            parser: function(e, t, i, a, r, s) {
                var n = e.style
                  , o = "cssFloat"in n ? "cssFloat" : "styleFloat";
                return new _e(n,o,0,0,r,-1,i,!1,0,n[o],t)
            }
        });
        var Ge = function(e) {
            var t, i = this.t, a = i.filter || J(this.data, "filter") || "", r = this.s + this.c * e | 0;
            100 === r && (-1 === a.indexOf("atrix(") && -1 === a.indexOf("radient(") && -1 === a.indexOf("oader(") ? (i.removeAttribute("filter"),
            t = !J(this.data, "filter")) : (i.filter = a.replace(C, ""),
            t = !0)),
            t || (this.xn1 && (i.filter = a = a || "alpha(opacity=" + r + ")"),
            -1 === a.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = a + " alpha(opacity=" + r + ")") : i.filter = a.replace(T, "opacity=" + r))
        };
        Se("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(e, t, i, a, s, n) {
                var o = parseFloat(J(e, "opacity", r, !1, "1"))
                  , l = e.style
                  , u = "autoAlpha" === i;
                return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + o),
                u && 1 === o && "hidden" === J(e, "visibility", r) && 0 !== t && (o = 0),
                G ? s = new _e(l,"opacity",o,t - o,s) : (s = new _e(l,"opacity",100 * o,100 * (t - o),s),
                s.xn1 = u ? 1 : 0,
                l.zoom = 1,
                s.type = 2,
                s.b = "alpha(opacity=" + s.s + ")",
                s.e = "alpha(opacity=" + (s.s + s.c) + ")",
                s.data = e,
                s.plugin = n,
                s.setRatio = Ge),
                u && (s = new _e(l,"visibility",0,0,s,-1,null,!1,0,0 !== o ? "inherit" : "hidden",0 === t ? "hidden" : "inherit"),
                s.xs0 = "inherit",
                a._overwriteProps.push(s.n),
                a._overwriteProps.push(i)),
                s
            }
        });
        var qe = function(e, t) {
            t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t),
            e.removeProperty(t.replace(k, "-$1").toLowerCase())) : e.removeAttribute(t))
        }
          , Qe = function(e) {
            if (this.t._gsClassPT = this,
            1 === e || 0 === e) {
                this.t.setAttribute("class", 0 === e ? this.b : this.e);
                for (var t = this.data, i = this.t.style; t; )
                    t.v ? i[t.p] = t.v : qe(i, t.p),
                    t = t._next;
                1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else
                this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        Se("className", {
            parser: function(e, t, a, s, n, o, l) {
                var u, p, c, h, d, f = e.getAttribute("class") || "", m = e.style.cssText;
                if (n = s._classNamePT = new _e(e,a,0,0,n,2),
                n.setRatio = Qe,
                n.pr = -11,
                i = !0,
                n.b = f,
                p = ie(e, r),
                c = e._gsClassPT) {
                    for (h = {},
                    d = c.data; d; )
                        h[d.p] = 1,
                        d = d._next;
                    c.setRatio(1)
                }
                return e._gsClassPT = n,
                n.e = "=" !== t.charAt(1) ? t : f.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""),
                e.setAttribute("class", n.e),
                u = ae(e, p, ie(e), l, h),
                e.setAttribute("class", f),
                n.data = u.firstMPT,
                e.style.cssText = m,
                n = n.xfirst = s.parse(e, u.difs, n, o)
            }
        });
        var Ue = function(e) {
            if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var t, i, a, r, s, n = this.t.style, o = l.transform.parse;
                if ("all" === this.e)
                    n.cssText = "",
                    r = !0;
                else
                    for (t = this.e.split(" ").join("").split(","),
                    a = t.length; --a > -1; )
                        i = t[a],
                        l[i] && (l[i].parse === o ? r = !0 : i = "transformOrigin" === i ? ze : l[i].p),
                        qe(n, i);
                r && (qe(n, Me),
                s = this.t._gsTransform,
                s && (s.svg && (this.t.removeAttribute("data-svg-origin"),
                this.t.removeAttribute("transform")),
                delete this.t._gsTransform))
            }
        };
        for (Se("clearProps", {
            parser: function(e, t, a, r, s) {
                return s = new _e(e,a,0,0,s,2),
                s.setRatio = Ue,
                s.e = t,
                s.pr = -10,
                s.data = r._tween,
                i = !0,
                s
            }
        }),
        u = "bezier,throwProps,physicsProps,physics2D".split(","),
        be = u.length; be--; )
            Ce(u[be]);
        u = n.prototype,
        u._firstPT = u._lastParsedTransform = u._transform = null,
        u._onInitTween = function(e, t, o, u) {
            if (!e.nodeType)
                return !1;
            this._target = g = e,
            this._tween = o,
            this._vars = t,
            v = u,
            p = t.autoRound,
            i = !1,
            a = t.suffixMap || n.suffixMap,
            r = $(e, ""),
            s = this._overwriteProps;
            var d, m, y, _, w, x, b, T, C, P = e.style;
            if (c && "" === P.zIndex && (d = J(e, "zIndex", r),
            ("auto" === d || "" === d) && this._addLazySet(P, "zIndex", 0)),
            "string" == typeof t && (_ = P.cssText,
            d = ie(e, r),
            P.cssText = _ + ";" + t,
            d = ae(e, d, ie(e)).difs,
            !G && S.test(t) && (d.opacity = parseFloat(RegExp.$1)),
            t = d,
            P.cssText = _),
            t.className ? this._firstPT = m = l.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = m = this.parse(e, t, null),
            this._transformType) {
                for (C = 3 === this._transformType,
                Me ? h && (c = !0,
                "" === P.zIndex && (b = J(e, "zIndex", r),
                ("auto" === b || "" === b) && this._addLazySet(P, "zIndex", 0)),
                f && this._addLazySet(P, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (C ? "visible" : "hidden"))) : P.zoom = 1,
                y = m; y && y._next; )
                    y = y._next;
                T = new _e(e,"transform",0,0,null,2),
                this._linkCSSP(T, null, y),
                T.setRatio = Me ? We : je,
                T.data = this._transform || Ye(e, r, !0),
                T.tween = o,
                T.pr = -1,
                s.pop()
            }
            if (i) {
                for (; m; ) {
                    for (x = m._next,
                    y = _; y && y.pr > m.pr; )
                        y = y._next;
                    (m._prev = y ? y._prev : w) ? m._prev._next = m : _ = m,
                    (m._next = y) ? y._prev = m : w = m,
                    m = x
                }
                this._firstPT = _
            }
            return !0
        }
        ,
        u.parse = function(e, t, i, s) {
            var n, o, u, c, h, d, f, m, y, _, w = e.style;
            for (n in t) {
                if (d = t[n],
                "function" == typeof d && (d = d(v, g)),
                o = l[n])
                    i = o.parse(e, d, n, this, i, s, t);
                else {
                    if ("--" === n.substr(0, 2)) {
                        this._tween._propLookup[n] = this._addTween.call(this._tween, e.style, "setProperty", $(e).getPropertyValue(n) + "", d + "", n, !1, n);
                        continue
                    }
                    h = J(e, n, r) + "",
                    y = "string" == typeof d,
                    "color" === n || "fill" === n || "stroke" === n || -1 !== n.indexOf("Color") || y && P.test(d) ? (y || (d = de(d),
                    d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"),
                    i = xe(w, n, h, d, !0, "transparent", i, 0, s)) : y && D.test(d) ? i = xe(w, n, h, d, !0, null, i, 0, s) : (u = parseFloat(h),
                    f = u || 0 === u ? h.substr((u + "").length) : "",
                    ("" === h || "auto" === h) && ("width" === n || "height" === n ? (u = ne(e, n, r),
                    f = "px") : "left" === n || "top" === n ? (u = te(e, n, r),
                    f = "px") : (u = "opacity" !== n ? 0 : 1,
                    f = "")),
                    _ = y && "=" === d.charAt(1),
                    _ ? (c = parseInt(d.charAt(0) + "1", 10),
                    d = d.substr(2),
                    c *= parseFloat(d),
                    m = d.replace(b, "")) : (c = parseFloat(d),
                    m = y ? d.replace(b, "") : ""),
                    "" === m && (m = n in a ? a[n] : f),
                    d = c || 0 === c ? (_ ? c + u : c) + m : t[n],
                    f !== m && ("" !== m || "lineHeight" === n) && (c || 0 === c) && u && (u = ee(e, n, u, f),
                    "%" === m ? (u /= ee(e, n, 100, "%") / 100,
                    t.strictUnits !== !0 && (h = u + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? u /= ee(e, n, 1, m) : "px" !== m && (c = ee(e, n, c, m),
                    m = "px"),
                    _ && (c || 0 === c) && (d = c + u + m)),
                    _ && (c += u),
                    !u && 0 !== u || !c && 0 !== c ? void 0 !== w[n] && (d || d + "" != "NaN" && null != d) ? (i = new _e(w,n,c || u || 0,0,i,-1,n,!1,0,h,d),
                    i.xs0 = "none" !== d || "display" !== n && -1 === n.indexOf("Style") ? d : h) : Q("invalid " + n + " tween value: " + t[n]) : (i = new _e(w,n,u,c - u,i,0,n,p !== !1 && ("px" === m || "zIndex" === n),0,h,d),
                    i.xs0 = m))
                }
                s && i && !i.plugin && (i.plugin = s)
            }
            return i
        }
        ,
        u.setRatio = function(e) {
            var t, i, a, r = this._firstPT, s = 1e-6;
            if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; r; ) {
                        if (t = r.c * e + r.s,
                        r.r ? t = Math.round(t) : s > t && t > -s && (t = 0),
                        r.type)
                            if (1 === r.type)
                                if (a = r.l,
                                2 === a)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
                                else if (3 === a)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === a)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === a)
                                    r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + t + r.xs1,
                                    a = 1; a < r.l; a++)
                                        i += r["xn" + a] + r["xs" + (a + 1)];
                                    r.t[r.p] = i
                                }
                            else
                                -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
                        else
                            r.t[r.p] = t + r.xs0;
                        r = r._next
                    }
                else
                    for (; r; )
                        2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e),
                        r = r._next;
            else
                for (; r; ) {
                    if (2 !== r.type)
                        if (r.r && -1 !== r.type)
                            if (t = Math.round(r.s + r.c),
                            r.type) {
                                if (1 === r.type) {
                                    for (a = r.l,
                                    i = r.xs0 + t + r.xs1,
                                    a = 1; a < r.l; a++)
                                        i += r["xn" + a] + r["xs" + (a + 1)];
                                    r.t[r.p] = i
                                }
                            } else
                                r.t[r.p] = t + r.xs0;
                        else
                            r.t[r.p] = r.e;
                    else
                        r.setRatio(e);
                    r = r._next
                }
        }
        ,
        u._enableTransforms = function(e) {
            this._transform = this._transform || Ye(this._target, r, !0),
            this._transformType = this._transform.svg && Pe || !e && 3 !== this._transformType ? 2 : 3
        }
        ;
        var $e = function(e) {
            this.t[this.p] = this.e,
            this.data._linkCSSP(this, this._next, null, !0)
        };
        u._addLazySet = function(e, t, i) {
            var a = this._firstPT = new _e(e,t,0,0,this._firstPT,2);
            a.e = i,
            a.setRatio = $e,
            a.data = this
        }
        ,
        u._linkCSSP = function(e, t, i, a) {
            return e && (t && (t._prev = e),
            e._next && (e._next._prev = e._prev),
            e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next,
            a = !0),
            i ? i._next = e : a || null !== this._firstPT || (this._firstPT = e),
            e._next = t,
            e._prev = i),
            e
        }
        ,
        u._mod = function(e) {
            for (var t = this._firstPT; t; )
                "function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1),
                t = t._next
        }
        ,
        u._kill = function(t) {
            var i, a, r, s = t;
            if (t.autoAlpha || t.alpha) {
                s = {};
                for (a in t)
                    s[a] = t[a];
                s.opacity = 1,
                s.autoAlpha && (s.visibility = 1)
            }
            for (t.className && (i = this._classNamePT) && (r = i.xfirst,
            r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next),
            i._next && this._linkCSSP(i._next, i._next._next, r._prev),
            this._classNamePT = null),
            i = this._firstPT; i; )
                i.plugin && i.plugin !== a && i.plugin._kill && (i.plugin._kill(t),
                a = i.plugin),
                i = i._next;
            return e.prototype._kill.call(this, s)
        }
        ;
        var Ze = function(e, t, i) {
            var a, r, s, n;
            if (e.slice)
                for (r = e.length; --r > -1; )
                    Ze(e[r], t, i);
            else
                for (a = e.childNodes,
                r = a.length; --r > -1; )
                    s = a[r],
                    n = s.type,
                    s.style && (t.push(ie(s)),
                    i && i.push(s)),
                    1 !== n && 9 !== n && 11 !== n || !s.childNodes.length || Ze(s, t, i)
        };
        return n.cascadeTo = function(e, i, a) {
            var r, s, n, o, l = t.to(e, i, a), u = [l], p = [], c = [], h = [], d = t._internals.reservedProps;
            for (e = l._targets || l.target,
            Ze(e, p, h),
            l.render(i, !0, !0),
            Ze(e, c),
            l.render(0, !0, !0),
            l._enabled(!0),
            r = h.length; --r > -1; )
                if (s = ae(h[r], p[r], c[r]),
                s.firstMPT) {
                    s = s.difs;
                    for (n in a)
                        d[n] && (s[n] = a[n]);
                    o = {};
                    for (n in s)
                        o[n] = p[r][n];
                    u.push(t.fromTo(h[r], i, o, s))
                }
            return u
        }
        ,
        e.activate([n]),
        n
    }, !0),
    function() {
        var e = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.6.0",
            priority: -1,
            API: 2,
            init: function(e, t, i) {
                return this._tween = i,
                !0
            }
        })
          , t = function(e) {
            for (; e; )
                e.f || e.blob || (e.m = Math.round),
                e = e._next
        }
          , i = e.prototype;
        i._onInitAllProps = function() {
            for (var e, i, a, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), n = s.length, o = {}, l = r._propLookup.roundProps; --n > -1; )
                o[s[n]] = Math.round;
            for (n = s.length; --n > -1; )
                for (e = s[n],
                i = r._firstPT; i; )
                    a = i._next,
                    i.pg ? i.t._mod(o) : i.n === e && (2 === i.f && i.t ? t(i.t._firstPT) : (this._add(i.t, e, i.s, i.c),
                    a && (a._prev = i._prev),
                    i._prev ? i._prev._next = a : r._firstPT === i && (r._firstPT = a),
                    i._next = i._prev = null,
                    r._propLookup[e] = l)),
                    i = a;
            return !1
        }
        ,
        i._add = function(e, t, i, a) {
            this._addTween(e, t, i, i + a, t, Math.round),
            this._overwriteProps.push(t)
        }
    }(),
    function() {
        _gsScope._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.6.1",
            init: function(e, t, i, a) {
                var r, s;
                if ("function" != typeof e.setAttribute)
                    return !1;
                for (r in t)
                    s = t[r],
                    "function" == typeof s && (s = s(a, e)),
                    this._addTween(e, "setAttribute", e.getAttribute(r) + "", s + "", r, !1, r),
                    this._overwriteProps.push(r);
                return !0
            }
        })
    }(),
    _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function(e, t, i, a) {
            "object" != typeof t && (t = {
                rotation: t
            }),
            this.finals = {};
            var r, s, n, o, l, u, p = t.useRadians === !0 ? 2 * Math.PI : 360, c = 1e-6;
            for (r in t)
                "useRadians" !== r && (o = t[r],
                "function" == typeof o && (o = o(a, e)),
                u = (o + "").split("_"),
                s = u[0],
                n = parseFloat("function" != typeof e[r] ? e[r] : e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]()),
                o = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? n + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0,
                l = o - n,
                u.length && (s = u.join("_"),
                -1 !== s.indexOf("short") && (l %= p,
                l !== l % (p / 2) && (l = 0 > l ? l + p : l - p)),
                -1 !== s.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * p) % p - (l / p | 0) * p : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * p) % p - (l / p | 0) * p)),
                (l > c || -c > l) && (this._addTween(e, r, n, n + l, r),
                this._overwriteProps.push(r)));
            return !0
        },
        set: function(e) {
            var t;
            if (1 !== e)
                this._super.setRatio.call(this, e);
            else
                for (t = this._firstPT; t; )
                    t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p],
                    t = t._next
        }
    })._autoCSS = !0,
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
        var t, i, a, r = _gsScope.GreenSockGlobals || _gsScope, s = r.com.greensock, n = 2 * Math.PI, o = Math.PI / 2, l = s._class, u = function(t, i) {
            var a = l("easing." + t, function() {}, !0)
              , r = a.prototype = new e;
            return r.constructor = a,
            r.getRatio = i,
            a
        }, p = e.register || function() {}
        , c = function(e, t, i, a, r) {
            var s = l("easing." + e, {
                easeOut: new t,
                easeIn: new i,
                easeInOut: new a
            }, !0);
            return p(s, e),
            s
        }, h = function(e, t, i) {
            this.t = e,
            this.v = t,
            i && (this.next = i,
            i.prev = this,
            this.c = i.v - t,
            this.gap = i.t - e)
        }, d = function(t, i) {
            var a = l("easing." + t, function(e) {
                this._p1 = e || 0 === e ? e : 1.70158,
                this._p2 = 1.525 * this._p1
            }, !0)
              , r = a.prototype = new e;
            return r.constructor = a,
            r.getRatio = i,
            r.config = function(e) {
                return new a(e)
            }
            ,
            a
        }, f = c("Back", d("BackOut", function(e) {
            return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
        }), d("BackIn", function(e) {
            return e * e * ((this._p1 + 1) * e - this._p1)
        }), d("BackInOut", function(e) {
            return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
        })), m = l("easing.SlowMo", function(e, t, i) {
            t = t || 0 === t ? t : .7,
            null == e ? e = .7 : e > 1 && (e = 1),
            this._p = 1 !== e ? t : 0,
            this._p1 = (1 - e) / 2,
            this._p2 = e,
            this._p3 = this._p1 + this._p2,
            this._calcEnd = i === !0
        }, !0), g = m.prototype = new e;
        return g.constructor = m,
        g.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
        }
        ,
        m.ease = new m(.7,.7),
        g.config = m.config = function(e, t, i) {
            return new m(e,t,i)
        }
        ,
        t = l("easing.SteppedEase", function(e, t) {
            e = e || 1,
            this._p1 = 1 / e,
            this._p2 = e + (t ? 0 : 1),
            this._p3 = t ? 1 : 0
        }, !0),
        g = t.prototype = new e,
        g.constructor = t,
        g.getRatio = function(e) {
            return 0 > e ? e = 0 : e >= 1 && (e = .999999999),
            ((this._p2 * e | 0) + this._p3) * this._p1
        }
        ,
        g.config = t.config = function(e, i) {
            return new t(e,i)
        }
        ,
        i = l("easing.RoughEase", function(t) {
            t = t || {};
            for (var i, a, r, s, n, o, l = t.taper || "none", u = [], p = 0, c = 0 | (t.points || 20), d = c, f = t.randomize !== !1, m = t.clamp === !0, g = t.template instanceof e ? t.template : null, v = "number" == typeof t.strength ? .4 * t.strength : .4; --d > -1; )
                i = f ? Math.random() : 1 / c * d,
                a = g ? g.getRatio(i) : i,
                "none" === l ? r = v : "out" === l ? (s = 1 - i,
                r = s * s * v) : "in" === l ? r = i * i * v : .5 > i ? (s = 2 * i,
                r = s * s * .5 * v) : (s = 2 * (1 - i),
                r = s * s * .5 * v),
                f ? a += Math.random() * r - .5 * r : d % 2 ? a += .5 * r : a -= .5 * r,
                m && (a > 1 ? a = 1 : 0 > a && (a = 0)),
                u[p++] = {
                    x: i,
                    y: a
                };
            for (u.sort(function(e, t) {
                return e.x - t.x
            }),
            o = new h(1,1,null),
            d = c; --d > -1; )
                n = u[d],
                o = new h(n.x,n.y,o);
            this._prev = new h(0,0,0 !== o.t ? o : o.next)
        }, !0),
        g = i.prototype = new e,
        g.constructor = i,
        g.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                for (; t.next && e >= t.t; )
                    t = t.next;
                t = t.prev
            } else
                for (; t.prev && e <= t.t; )
                    t = t.prev;
            return this._prev = t,
            t.v + (e - t.t) / t.gap * t.c
        }
        ,
        g.config = function(e) {
            return new i(e)
        }
        ,
        i.ease = new i,
        c("Bounce", u("BounceOut", function(e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), u("BounceIn", function(e) {
            return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), u("BounceInOut", function(e) {
            var t = .5 > e;
            return e = t ? 1 - 2 * e : 2 * e - 1,
            e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375,
            t ? .5 * (1 - e) : .5 * e + .5
        })),
        c("Circ", u("CircOut", function(e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), u("CircIn", function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), u("CircInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })),
        a = function(t, i, a) {
            var r = l("easing." + t, function(e, t) {
                this._p1 = e >= 1 ? e : 1,
                this._p2 = (t || a) / (1 > e ? e : 1),
                this._p3 = this._p2 / n * (Math.asin(1 / this._p1) || 0),
                this._p2 = n / this._p2
            }, !0)
              , s = r.prototype = new e;
            return s.constructor = r,
            s.getRatio = i,
            s.config = function(e, t) {
                return new r(e,t)
            }
            ,
            r
        }
        ,
        c("Elastic", a("ElasticOut", function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
        }, .3), a("ElasticIn", function(e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
        }, .3), a("ElasticInOut", function(e) {
            return (e *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
        }, .45)),
        c("Expo", u("ExpoOut", function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), u("ExpoIn", function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), u("ExpoInOut", function(e) {
            return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })),
        c("Sine", u("SineOut", function(e) {
            return Math.sin(e * o)
        }), u("SineIn", function(e) {
            return -Math.cos(e * o) + 1
        }), u("SineInOut", function(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        })),
        l("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        }, !0),
        p(r.SlowMo, "SlowMo", "ease,"),
        p(i, "RoughEase", "ease,"),
        p(t, "SteppedEase", "ease,"),
        f
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(e, t) {
    "use strict";
    var i = {}
      , a = e.document
      , r = e.GreenSockGlobals = e.GreenSockGlobals || e;
    if (!r.TweenLite) {
        var s, n, o, l, u, p = function(e) {
            var t, i = e.split("."), a = r;
            for (t = 0; t < i.length; t++)
                a[i[t]] = a = a[i[t]] || {};
            return a
        }, c = p("com.greensock"), h = 1e-10, d = function(e) {
            var t, i = [], a = e.length;
            for (t = 0; t !== a; i.push(e[t++]))
                ;
            return i
        }, f = function() {}, m = function() {
            var e = Object.prototype.toString
              , t = e.call([]);
            return function(i) {
                return null != i && (i instanceof Array || "object" == typeof i && !!i.push && e.call(i) === t)
            }
        }(), g = {}, v = function(a, s, n, o) {
            this.sc = g[a] ? g[a].sc : [],
            g[a] = this,
            this.gsClass = null,
            this.func = n;
            var l = [];
            this.check = function(u) {
                for (var c, h, d, f, m = s.length, y = m; --m > -1; )
                    (c = g[s[m]] || new v(s[m],[])).gsClass ? (l[m] = c.gsClass,
                    y--) : u && c.sc.push(this);
                if (0 === y && n) {
                    if (h = ("com.greensock." + a).split("."),
                    d = h.pop(),
                    f = p(h.join("."))[d] = this.gsClass = n.apply(n, l),
                    o)
                        if (r[d] = i[d] = f,
                        "undefined" != typeof module && module.exports)
                            if (a === t) {
                                module.exports = i[t] = f;
                                for (m in i)
                                    f[m] = i[m]
                            } else
                                i[t] && (i[t][d] = f);
                        else
                            "function" == typeof define && define.amd && define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + a.split(".").pop(), [], function() {
                                return f
                            });
                    for (m = 0; m < this.sc.length; m++)
                        this.sc[m].check()
                }
            }
            ,
            this.check(!0)
        }, y = e._gsDefine = function(e, t, i, a) {
            return new v(e,t,i,a)
        }
        , _ = c._class = function(e, t, i) {
            return t = t || function() {}
            ,
            y(e, [], function() {
                return t
            }, i),
            t
        }
        ;
        y.globals = r;
        var w = [0, 0, 1, 1]
          , x = _("easing.Ease", function(e, t, i, a) {
            this._func = e,
            this._type = i || 0,
            this._power = a || 0,
            this._params = t ? w.concat(t) : w
        }, !0)
          , b = x.map = {}
          , T = x.register = function(e, t, i, a) {
            for (var r, s, n, o, l = t.split(","), u = l.length, p = (i || "easeIn,easeOut,easeInOut").split(","); --u > -1; )
                for (s = l[u],
                r = a ? _("easing." + s, null, !0) : c.easing[s] || {},
                n = p.length; --n > -1; )
                    o = p[n],
                    b[s + "." + o] = b[o + s] = r[o] = e.getRatio ? e : e[o] || new e
        }
        ;
        for (o = x.prototype,
        o._calcEnd = !1,
        o.getRatio = function(e) {
            if (this._func)
                return this._params[0] = e,
                this._func.apply(null, this._params);
            var t = this._type
              , i = this._power
              , a = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
            return 1 === i ? a *= a : 2 === i ? a *= a * a : 3 === i ? a *= a * a * a : 4 === i && (a *= a * a * a * a),
            1 === t ? 1 - a : 2 === t ? a : .5 > e ? a / 2 : 1 - a / 2
        }
        ,
        s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
        n = s.length; --n > -1; )
            o = s[n] + ",Power" + n,
            T(new x(null,null,1,n), o, "easeOut", !0),
            T(new x(null,null,2,n), o, "easeIn" + (0 === n ? ",easeNone" : "")),
            T(new x(null,null,3,n), o, "easeInOut");
        b.linear = c.easing.Linear.easeIn,
        b.swing = c.easing.Quad.easeInOut;
        var S = _("events.EventDispatcher", function(e) {
            this._listeners = {},
            this._eventTarget = e || this
        });
        o = S.prototype,
        o.addEventListener = function(e, t, i, a, r) {
            r = r || 0;
            var s, n, o = this._listeners[e], p = 0;
            for (this !== l || u || l.wake(),
            null == o && (this._listeners[e] = o = []),
            n = o.length; --n > -1; )
                s = o[n],
                s.c === t && s.s === i ? o.splice(n, 1) : 0 === p && s.pr < r && (p = n + 1);
            o.splice(p, 0, {
                c: t,
                s: i,
                up: a,
                pr: r
            })
        }
        ,
        o.removeEventListener = function(e, t) {
            var i, a = this._listeners[e];
            if (a)
                for (i = a.length; --i > -1; )
                    if (a[i].c === t)
                        return void a.splice(i, 1)
        }
        ,
        o.dispatchEvent = function(e) {
            var t, i, a, r = this._listeners[e];
            if (r)
                for (t = r.length,
                t > 1 && (r = r.slice(0)),
                i = this._eventTarget; --t > -1; )
                    a = r[t],
                    a && (a.up ? a.c.call(a.s || i, {
                        type: e,
                        target: i
                    }) : a.c.call(a.s || i))
        }
        ;
        var C = e.requestAnimationFrame
          , P = e.cancelAnimationFrame
          , k = Date.now || function() {
            return (new Date).getTime()
        }
          , M = k();
        for (s = ["ms", "moz", "webkit", "o"],
        n = s.length; --n > -1 && !C; )
            C = e[s[n] + "RequestAnimationFrame"],
            P = e[s[n] + "CancelAnimationFrame"] || e[s[n] + "CancelRequestAnimationFrame"];
        _("Ticker", function(e, t) {
            var i, r, s, n, o, p = this, c = k(), d = t !== !1 && C ? "auto" : !1, m = 500, g = 33, v = "tick", y = function(e) {
                var t, a, l = k() - M;
                l > m && (c += l - g),
                M += l,
                p.time = (M - c) / 1e3,
                t = p.time - o,
                (!i || t > 0 || e === !0) && (p.frame++,
                o += t + (t >= n ? .004 : n - t),
                a = !0),
                e !== !0 && (s = r(y)),
                a && p.dispatchEvent(v)
            };
            S.call(p),
            p.time = p.frame = 0,
            p.tick = function() {
                y(!0)
            }
            ,
            p.lagSmoothing = function(e, t) {
                m = e || 1 / h,
                g = Math.min(t, m, 0)
            }
            ,
            p.sleep = function() {
                null != s && (d && P ? P(s) : clearTimeout(s),
                r = f,
                s = null,
                p === l && (u = !1))
            }
            ,
            p.wake = function(e) {
                null !== s ? p.sleep() : e ? c += -M + (M = k()) : p.frame > 10 && (M = k() - m + 5),
                r = 0 === i ? f : d && C ? C : function(e) {
                    return setTimeout(e, 1e3 * (o - p.time) + 1 | 0)
                }
                ,
                p === l && (u = !0),
                y(2)
            }
            ,
            p.fps = function(e) {
                return arguments.length ? (i = e,
                n = 1 / (i || 60),
                o = this.time + n,
                void p.wake()) : i
            }
            ,
            p.useRAF = function(e) {
                return arguments.length ? (p.sleep(),
                d = e,
                void p.fps(i)) : d
            }
            ,
            p.fps(e),
            setTimeout(function() {
                "auto" === d && p.frame < 5 && "hidden" !== a.visibilityState && p.useRAF(!1)
            }, 1500)
        }),
        o = c.Ticker.prototype = new c.events.EventDispatcher,
        o.constructor = c.Ticker;
        var O = _("core.Animation", function(e, t) {
            if (this.vars = t = t || {},
            this._duration = this._totalDuration = e || 0,
            this._delay = Number(t.delay) || 0,
            this._timeScale = 1,
            this._active = t.immediateRender === !0,
            this.data = t.data,
            this._reversed = t.reversed === !0,
            U) {
                u || l.wake();
                var i = this.vars.useFrames ? Q : U;
                i.add(this, i._time),
                this.vars.paused && this.paused(!0)
            }
        });
        l = O.ticker = new c.Ticker,
        o = O.prototype,
        o._dirty = o._gc = o._initted = o._paused = !1,
        o._totalTime = o._time = 0,
        o._rawPrevTime = -1,
        o._next = o._last = o._onUpdate = o._timeline = o.timeline = null,
        o._paused = !1;
        var z = function() {
            u && k() - M > 2e3 && "hidden" !== a.visibilityState && l.wake();
            var e = setTimeout(z, 2e3);
            e.unref && e.unref()
        };
        z(),
        o.play = function(e, t) {
            return null != e && this.seek(e, t),
            this.reversed(!1).paused(!1)
        }
        ,
        o.pause = function(e, t) {
            return null != e && this.seek(e, t),
            this.paused(!0)
        }
        ,
        o.resume = function(e, t) {
            return null != e && this.seek(e, t),
            this.paused(!1)
        }
        ,
        o.seek = function(e, t) {
            return this.totalTime(Number(e), t !== !1)
        }
        ,
        o.restart = function(e, t) {
            return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
        }
        ,
        o.reverse = function(e, t) {
            return null != e && this.seek(e || this.totalDuration(), t),
            this.reversed(!0).paused(!1)
        }
        ,
        o.render = function(e, t, i) {}
        ,
        o.invalidate = function() {
            return this._time = this._totalTime = 0,
            this._initted = this._gc = !1,
            this._rawPrevTime = -1,
            (this._gc || !this.timeline) && this._enabled(!0),
            this
        }
        ,
        o.isActive = function() {
            var e, t = this._timeline, i = this._startTime;
            return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime(!0)) >= i && e < i + this.totalDuration() / this._timeScale - 1e-7
        }
        ,
        o._enabled = function(e, t) {
            return u || l.wake(),
            this._gc = !e,
            this._active = this.isActive(),
            t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)),
            !1
        }
        ,
        o._kill = function(e, t) {
            return this._enabled(!1, !1)
        }
        ,
        o.kill = function(e, t) {
            return this._kill(e, t),
            this
        }
        ,
        o._uncache = function(e) {
            for (var t = e ? this : this.timeline; t; )
                t._dirty = !0,
                t = t.timeline;
            return this
        }
        ,
        o._swapSelfInParams = function(e) {
            for (var t = e.length, i = e.concat(); --t > -1; )
                "{self}" === e[t] && (i[t] = this);
            return i
        }
        ,
        o._callback = function(e) {
            var t = this.vars
              , i = t[e]
              , a = t[e + "Params"]
              , r = t[e + "Scope"] || t.callbackScope || this
              , s = a ? a.length : 0;
            switch (s) {
            case 0:
                i.call(r);
                break;
            case 1:
                i.call(r, a[0]);
                break;
            case 2:
                i.call(r, a[0], a[1]);
                break;
            default:
                i.apply(r, a)
            }
        }
        ,
        o.eventCallback = function(e, t, i, a) {
            if ("on" === (e || "").substr(0, 2)) {
                var r = this.vars;
                if (1 === arguments.length)
                    return r[e];
                null == t ? delete r[e] : (r[e] = t,
                r[e + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i,
                r[e + "Scope"] = a),
                "onUpdate" === e && (this._onUpdate = t)
            }
            return this
        }
        ,
        o.delay = function(e) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay),
            this._delay = e,
            this) : this._delay
        }
        ,
        o.duration = function(e) {
            return arguments.length ? (this._duration = this._totalDuration = e,
            this._uncache(!0),
            this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0),
            this) : (this._dirty = !1,
            this._duration)
        }
        ,
        o.totalDuration = function(e) {
            return this._dirty = !1,
            arguments.length ? this.duration(e) : this._totalDuration
        }
        ,
        o.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
        }
        ,
        o.totalTime = function(e, t, i) {
            if (u || l.wake(),
            !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > e && !i && (e += this.totalDuration()),
                this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var a = this._totalDuration
                      , r = this._timeline;
                    if (e > a && !i && (e = a),
                    this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? a - e : e) / this._timeScale,
                    r._dirty || this._uncache(!1),
                    r._timeline)
                        for (; r._timeline; )
                            r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0),
                            r = r._timeline
                }
                this._gc && this._enabled(!0, !1),
                (this._totalTime !== e || 0 === this._duration) && (D.length && K(),
                this.render(e, t, !1),
                D.length && K())
            }
            return this
        }
        ,
        o.progress = o.totalProgress = function(e, t) {
            var i = this.duration();
            return arguments.length ? this.totalTime(i * e, t) : i ? this._time / i : this.ratio
        }
        ,
        o.startTime = function(e) {
            return arguments.length ? (e !== this._startTime && (this._startTime = e,
            this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)),
            this) : this._startTime
        }
        ,
        o.endTime = function(e) {
            return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
        }
        ,
        o.timeScale = function(e) {
            if (!arguments.length)
                return this._timeScale;
            if (e = e || h,
            this._timeline && this._timeline.smoothChildTiming) {
                var t = this._pauseTime
                  , i = t || 0 === t ? t : this._timeline.totalTime();
                this._startTime = i - (i - this._startTime) * this._timeScale / e
            }
            return this._timeScale = e,
            this._uncache(!1)
        }
        ,
        o.reversed = function(e) {
            return arguments.length ? (e != this._reversed && (this._reversed = e,
            this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
            this) : this._reversed
        }
        ,
        o.paused = function(e) {
            if (!arguments.length)
                return this._paused;
            var t, i, a = this._timeline;
            return e != this._paused && a && (u || e || l.wake(),
            t = a.rawTime(),
            i = t - this._pauseTime,
            !e && a.smoothChildTiming && (this._startTime += i,
            this._uncache(!1)),
            this._pauseTime = e ? t : null,
            this._paused = e,
            this._active = this.isActive(),
            !e && 0 !== i && this._initted && this.duration() && (t = a.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale,
            this.render(t, t === this._totalTime, !0))),
            this._gc && !e && this._enabled(!0, !1),
            this
        }
        ;
        var E = _("core.SimpleTimeline", function(e) {
            O.call(this, 0, e),
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        o = E.prototype = new O,
        o.constructor = E,
        o.kill()._gc = !1,
        o._first = o._last = o._recent = null,
        o._sortChildren = !1,
        o.add = o.insert = function(e, t, i, a) {
            var r, s;
            if (e._startTime = Number(t || 0) + e._delay,
            e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale),
            e.timeline && e.timeline._remove(e, !0),
            e.timeline = e._timeline = this,
            e._gc && e._enabled(!0, !0),
            r = this._last,
            this._sortChildren)
                for (s = e._startTime; r && r._startTime > s; )
                    r = r._prev;
            return r ? (e._next = r._next,
            r._next = e) : (e._next = this._first,
            this._first = e),
            e._next ? e._next._prev = e : this._last = e,
            e._prev = r,
            this._recent = e,
            this._timeline && this._uncache(!0),
            this
        }
        ,
        o._remove = function(e, t) {
            return e.timeline === this && (t || e._enabled(!1, !0),
            e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next),
            e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev),
            e._next = e._prev = e.timeline = null,
            e === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
            this
        }
        ,
        o.render = function(e, t, i) {
            var a, r = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = e; r; )
                a = r._next,
                (r._active || e >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)),
                r = a
        }
        ,
        o.rawTime = function() {
            return u || l.wake(),
            this._totalTime
        }
        ;
        var A = _("TweenLite", function(t, i, a) {
            if (O.call(this, i, a),
            this.render = A.prototype.render,
            null == t)
                throw "Cannot tween a null target.";
            this.target = t = "string" != typeof t ? t : A.selector(t) || t;
            var r, s, n, o = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType), l = this.vars.overwrite;
            if (this._overwrite = l = null == l ? q[A.defaultOverwrite] : "number" == typeof l ? l >> 0 : q[l],
            (o || t instanceof Array || t.push && m(t)) && "number" != typeof t[0])
                for (this._targets = n = d(t),
                this._propLookup = [],
                this._siblings = [],
                r = 0; r < n.length; r++)
                    s = n[r],
                    s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (n.splice(r--, 1),
                    this._targets = n = n.concat(d(s))) : (this._siblings[r] = $(s, this, !1),
                    1 === l && this._siblings[r].length > 1 && ee(s, this, null, 1, this._siblings[r])) : (s = n[r--] = A.selector(s),
                    "string" == typeof s && n.splice(r + 1, 1)) : n.splice(r--, 1);
            else
                this._propLookup = {},
                this._siblings = $(t, this, !1),
                1 === l && this._siblings.length > 1 && ee(t, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -h,
            this.render(Math.min(0, -this._delay)))
        }, !0)
          , I = function(t) {
            return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
        }
          , R = function(e, t) {
            var i, a = {};
            for (i in e)
                G[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!Y[i] || Y[i] && Y[i]._autoCSS) || (a[i] = e[i],
                delete e[i]);
            e.css = a
        };
        o = A.prototype = new O,
        o.constructor = A,
        o.kill()._gc = !1,
        o.ratio = 0,
        o._firstPT = o._targets = o._overwrittenProps = o._startAt = null,
        o._notifyPluginsOfEnabled = o._lazy = !1,
        A.version = "1.20.2",
        A.defaultEase = o._ease = new x(null,null,1,1),
        A.defaultOverwrite = "auto",
        A.ticker = l,
        A.autoSleep = 120,
        A.lagSmoothing = function(e, t) {
            l.lagSmoothing(e, t)
        }
        ,
        A.selector = e.$ || e.jQuery || function(t) {
            var i = e.$ || e.jQuery;
            return i ? (A.selector = i,
            i(t)) : "undefined" == typeof a ? t : a.querySelectorAll ? a.querySelectorAll(t) : a.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
        }
        ;
        var D = []
          , L = {}
          , B = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , N = /[\+-]=-?[\.\d]/
          , H = function(e) {
            for (var t, i = this._firstPT, a = 1e-6; i; )
                t = i.blob ? 1 === e && this.end ? this.end : e ? this.join("") : this.start : i.c * e + i.s,
                i.m ? t = i.m(t, this._target || i.t) : a > t && t > -a && !i.blob && (t = 0),
                i.f ? i.fp ? i.t[i.p](i.fp, t) : i.t[i.p](t) : i.t[i.p] = t,
                i = i._next
        }
          , F = function(e, t, i, a) {
            var r, s, n, o, l, u, p, c = [], h = 0, d = "", f = 0;
            for (c.start = e,
            c.end = t,
            e = c[0] = e + "",
            t = c[1] = t + "",
            i && (i(c),
            e = c[0],
            t = c[1]),
            c.length = 0,
            r = e.match(B) || [],
            s = t.match(B) || [],
            a && (a._next = null,
            a.blob = 1,
            c._firstPT = c._applyPT = a),
            l = s.length,
            o = 0; l > o; o++)
                p = s[o],
                u = t.substr(h, t.indexOf(p, h) - h),
                d += u || !o ? u : ",",
                h += u.length,
                f ? f = (f + 1) % 5 : "rgba(" === u.substr(-5) && (f = 1),
                p === r[o] || r.length <= o ? d += p : (d && (c.push(d),
                d = ""),
                n = parseFloat(r[o]),
                c.push(n),
                c._firstPT = {
                    _next: c._firstPT,
                    t: c,
                    p: c.length - 1,
                    s: n,
                    c: ("=" === p.charAt(1) ? parseInt(p.charAt(0) + "1", 10) * parseFloat(p.substr(2)) : parseFloat(p) - n) || 0,
                    f: 0,
                    m: f && 4 > f ? Math.round : 0
                }),
                h += p.length;
            return d += t.substr(h),
            d && c.push(d),
            c.setRatio = H,
            N.test(t) && (c.end = 0),
            c
        }
          , V = function(e, t, i, a, r, s, n, o, l) {
            "function" == typeof a && (a = a(l || 0, e));
            var u, p = typeof e[t], c = "function" !== p ? "" : t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3), h = "get" !== i ? i : c ? n ? e[c](n) : e[c]() : e[t], d = "string" == typeof a && "=" === a.charAt(1), f = {
                t: e,
                p: t,
                s: h,
                f: "function" === p,
                pg: 0,
                n: r || t,
                m: s ? "function" == typeof s ? s : Math.round : 0,
                pr: 0,
                c: d ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - h || 0
            };
            return ("number" != typeof h || "number" != typeof a && !d) && (n || isNaN(h) || !d && isNaN(a) || "boolean" == typeof h || "boolean" == typeof a ? (f.fp = n,
            u = F(h, d ? parseFloat(f.s) + f.c : a, o || A.defaultStringFilter, f),
            f = {
                t: u,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: r || t,
                pr: 0,
                m: 0
            }) : (f.s = parseFloat(h),
            d || (f.c = parseFloat(a) - f.s || 0))),
            f.c ? ((f._next = this._firstPT) && (f._next._prev = f),
            this._firstPT = f,
            f) : void 0
        }
          , X = A._internals = {
            isArray: m,
            isSelector: I,
            lazyTweens: D,
            blobDif: F
        }
          , Y = A._plugins = {}
          , j = X.tweenLookup = {}
          , W = 0
          , G = X.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1,
            id: 1,
            yoyoEase: 1
        }
          , q = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }
          , Q = O._rootFramesTimeline = new E
          , U = O._rootTimeline = new E
          , Z = 30
          , K = X.lazyRender = function() {
            var e, t = D.length;
            for (L = {}; --t > -1; )
                e = D[t],
                e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0),
                e._lazy = !1);
            D.length = 0
        }
        ;
        U._startTime = l.time,
        Q._startTime = l.frame,
        U._active = Q._active = !0,
        setTimeout(K, 1),
        O._updateRoot = A.render = function() {
            var e, t, i;
            if (D.length && K(),
            U.render((l.time - U._startTime) * U._timeScale, !1, !1),
            Q.render((l.frame - Q._startTime) * Q._timeScale, !1, !1),
            D.length && K(),
            l.frame >= Z) {
                Z = l.frame + (parseInt(A.autoSleep, 10) || 120);
                for (i in j) {
                    for (t = j[i].tweens,
                    e = t.length; --e > -1; )
                        t[e]._gc && t.splice(e, 1);
                    0 === t.length && delete j[i]
                }
                if (i = U._first,
                (!i || i._paused) && A.autoSleep && !Q._first && 1 === l._listeners.tick.length) {
                    for (; i && i._paused; )
                        i = i._next;
                    i || l.sleep()
                }
            }
        }
        ,
        l.addEventListener("tick", O._updateRoot);
        var $ = function(e, t, i) {
            var a, r, s = e._gsTweenID;
            if (j[s || (e._gsTweenID = s = "t" + W++)] || (j[s] = {
                target: e,
                tweens: []
            }),
            t && (a = j[s].tweens,
            a[r = a.length] = t,
            i))
                for (; --r > -1; )
                    a[r] === t && a.splice(r, 1);
            return j[s].tweens
        }
          , J = function(e, t, i, a) {
            var r, s, n = e.vars.onOverwrite;
            return n && (r = n(e, t, i, a)),
            n = A.onOverwrite,
            n && (s = n(e, t, i, a)),
            r !== !1 && s !== !1
        }
          , ee = function(e, t, i, a, r) {
            var s, n, o, l;
            if (1 === a || a >= 4) {
                for (l = r.length,
                s = 0; l > s; s++)
                    if ((o = r[s]) !== t)
                        o._gc || o._kill(null, e, t) && (n = !0);
                    else if (5 === a)
                        break;
                return n
            }
            var u, p = t._startTime + h, c = [], d = 0, f = 0 === t._duration;
            for (s = r.length; --s > -1; )
                (o = r[s]) === t || o._gc || o._paused || (o._timeline !== t._timeline ? (u = u || te(t, 0, f),
                0 === te(o, u, f) && (c[d++] = o)) : o._startTime <= p && o._startTime + o.totalDuration() / o._timeScale > p && ((f || !o._initted) && p - o._startTime <= 2e-10 || (c[d++] = o)));
            for (s = d; --s > -1; )
                if (o = c[s],
                2 === a && o._kill(i, e, t) && (n = !0),
                2 !== a || !o._firstPT && o._initted) {
                    if (2 !== a && !J(o, t))
                        continue;
                    o._enabled(!1, !1) && (n = !0)
                }
            return n
        }
          , te = function(e, t, i) {
            for (var a = e._timeline, r = a._timeScale, s = e._startTime; a._timeline; ) {
                if (s += a._startTime,
                r *= a._timeScale,
                a._paused)
                    return -100;
                a = a._timeline
            }
            return s /= r,
            s > t ? s - t : i && s === t || !e._initted && 2 * h > s - t ? h : (s += e.totalDuration() / e._timeScale / r) > t + h ? 0 : s - t - h
        };
        o._init = function() {
            var e, t, i, a, r, s, n = this.vars, o = this._overwrittenProps, l = this._duration, u = !!n.immediateRender, p = n.ease;
            if (n.startAt) {
                this._startAt && (this._startAt.render(-1, !0),
                this._startAt.kill()),
                r = {};
                for (a in n.startAt)
                    r[a] = n.startAt[a];
                if (r.overwrite = !1,
                r.immediateRender = !0,
                r.lazy = u && n.lazy !== !1,
                r.startAt = r.delay = null,
                r.onUpdate = n.onUpdate,
                r.onUpdateScope = n.onUpdateScope || n.callbackScope || this,
                this._startAt = A.to(this.target, 0, r),
                u)
                    if (this._time > 0)
                        this._startAt = null;
                    else if (0 !== l)
                        return
            } else if (n.runBackwards && 0 !== l)
                if (this._startAt)
                    this._startAt.render(-1, !0),
                    this._startAt.kill(),
                    this._startAt = null;
                else {
                    0 !== this._time && (u = !1),
                    i = {};
                    for (a in n)
                        G[a] && "autoCSS" !== a || (i[a] = n[a]);
                    if (i.overwrite = 0,
                    i.data = "isFromStart",
                    i.lazy = u && n.lazy !== !1,
                    i.immediateRender = u,
                    this._startAt = A.to(this.target, 0, i),
                    u) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                        this._startAt._enabled(!1),
                        this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = p = p ? p instanceof x ? p : "function" == typeof p ? new x(p,n.easeParams) : b[p] || A.defaultEase : A.defaultEase,
            n.easeParams instanceof Array && p.config && (this._ease = p.config.apply(p, n.easeParams)),
            this._easeType = this._ease._type,
            this._easePower = this._ease._power,
            this._firstPT = null,
            this._targets)
                for (s = this._targets.length,
                e = 0; s > e; e++)
                    this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], o ? o[e] : null, e) && (t = !0);
            else
                t = this._initProps(this.target, this._propLookup, this._siblings, o, 0);
            if (t && A._onPluginEvent("_onInitAllProps", this),
            o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
            n.runBackwards)
                for (i = this._firstPT; i; )
                    i.s += i.c,
                    i.c = -i.c,
                    i = i._next;
            this._onUpdate = n.onUpdate,
            this._initted = !0
        }
        ,
        o._initProps = function(t, i, a, r, s) {
            var n, o, l, u, p, c;
            if (null == t)
                return !1;
            L[t._gsTweenID] && K(),
            this.vars.css || t.style && t !== e && t.nodeType && Y.css && this.vars.autoCSS !== !1 && R(this.vars, t);
            for (n in this.vars)
                if (c = this.vars[n],
                G[n])
                    c && (c instanceof Array || c.push && m(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[n] = c = this._swapSelfInParams(c, this));
                else if (Y[n] && (u = new Y[n])._onInitTween(t, this.vars[n], this, s)) {
                    for (this._firstPT = p = {
                        _next: this._firstPT,
                        t: u,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: n,
                        pg: 1,
                        pr: u._priority,
                        m: 0
                    },
                    o = u._overwriteProps.length; --o > -1; )
                        i[u._overwriteProps[o]] = this._firstPT;
                    (u._priority || u._onInitAllProps) && (l = !0),
                    (u._onDisable || u._onEnable) && (this._notifyPluginsOfEnabled = !0),
                    p._next && (p._next._prev = p)
                } else
                    i[n] = V.call(this, t, n, "get", c, n, 0, null, this.vars.stringFilter, s);
            return r && this._kill(r, t) ? this._initProps(t, i, a, r, s) : this._overwrite > 1 && this._firstPT && a.length > 1 && ee(t, this, i, this._overwrite, a) ? (this._kill(i, t),
            this._initProps(t, i, a, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[t._gsTweenID] = !0),
            l)
        }
        ,
        o.render = function(e, t, i) {
            var a, r, s, n, o = this._time, l = this._duration, u = this._rawPrevTime;
            if (e >= l - 1e-7 && e >= 0)
                this._totalTime = this._time = l,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (a = !0,
                r = "onComplete",
                i = i || this._timeline.autoRemoveChildren),
                0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0),
                (0 > u || 0 >= e && e >= -1e-7 || u === h && "isPause" !== this.data) && u !== e && (i = !0,
                u > h && (r = "onReverseComplete")),
                this._rawPrevTime = n = !t || e || u === e ? e : h);
            else if (1e-7 > e)
                this._totalTime = this._time = 0,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== o || 0 === l && u > 0) && (r = "onReverseComplete",
                a = this._reversed),
                0 > e && (this._active = !1,
                0 === l && (this._initted || !this.vars.lazy || i) && (u >= 0 && (u !== h || "isPause" !== this.data) && (i = !0),
                this._rawPrevTime = n = !t || e || u === e ? e : h)),
                (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
            else if (this._totalTime = this._time = e,
            this._easeType) {
                var p = e / l
                  , c = this._easeType
                  , d = this._easePower;
                (1 === c || 3 === c && p >= .5) && (p = 1 - p),
                3 === c && (p *= 2),
                1 === d ? p *= p : 2 === d ? p *= p * p : 3 === d ? p *= p * p * p : 4 === d && (p *= p * p * p * p),
                1 === c ? this.ratio = 1 - p : 2 === c ? this.ratio = p : .5 > e / l ? this.ratio = p / 2 : this.ratio = 1 - p / 2
            } else
                this.ratio = this._ease.getRatio(e / l);
            if (this._time !== o || i) {
                if (!this._initted) {
                    if (this._init(),
                    !this._initted || this._gc)
                        return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                        return this._time = this._totalTime = o,
                        this._rawPrevTime = u,
                        D.push(this),
                        void (this._lazy = [e, t]);
                    this._time && !a ? this.ratio = this._ease.getRatio(this._time / l) : a && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1),
                this._active || !this._paused && this._time !== o && e >= 0 && (this._active = !0),
                0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : r || (r = "_dummyGS")),
                this.vars.onStart && (0 !== this._time || 0 === l) && (t || this._callback("onStart"))),
                s = this._firstPT; s; )
                    s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s,
                    s = s._next;
                this._onUpdate && (0 > e && this._startAt && e !== -1e-4 && this._startAt.render(e, t, i),
                t || (this._time !== o || a || i) && this._callback("onUpdate")),
                r && (!this._gc || i) && (0 > e && this._startAt && !this._onUpdate && e !== -1e-4 && this._startAt.render(e, t, i),
                a && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !t && this.vars[r] && this._callback(r),
                0 === l && this._rawPrevTime === h && n !== h && (this._rawPrevTime = 0))
            }
        }
        ,
        o._kill = function(e, t, i) {
            if ("all" === e && (e = null),
            null == e && (null == t || t === this.target))
                return this._lazy = !1,
                this._enabled(!1, !1);
            t = "string" != typeof t ? t || this._targets || this.target : A.selector(t) || t;
            var a, r, s, n, o, l, u, p, c, h = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
            if ((m(t) || I(t)) && "number" != typeof t[0])
                for (a = t.length; --a > -1; )
                    this._kill(e, t[a], i) && (l = !0);
            else {
                if (this._targets) {
                    for (a = this._targets.length; --a > -1; )
                        if (t === this._targets[a]) {
                            o = this._propLookup[a] || {},
                            this._overwrittenProps = this._overwrittenProps || [],
                            r = this._overwrittenProps[a] = e ? this._overwrittenProps[a] || {} : "all";
                            break
                        }
                } else {
                    if (t !== this.target)
                        return !1;
                    o = this._propLookup,
                    r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                }
                if (o) {
                    if (u = e || o,
                    p = e !== r && "all" !== r && e !== o && ("object" != typeof e || !e._tempKill),
                    i && (A.onOverwrite || this.vars.onOverwrite)) {
                        for (s in u)
                            o[s] && (c || (c = []),
                            c.push(s));
                        if ((c || !e) && !J(this, i, t, c))
                            return !1
                    }
                    for (s in u)
                        (n = o[s]) && (h && (n.f ? n.t[n.p](n.s) : n.t[n.p] = n.s,
                        l = !0),
                        n.pg && n.t._kill(u) && (l = !0),
                        n.pg && 0 !== n.t._overwriteProps.length || (n._prev ? n._prev._next = n._next : n === this._firstPT && (this._firstPT = n._next),
                        n._next && (n._next._prev = n._prev),
                        n._next = n._prev = null),
                        delete o[s]),
                        p && (r[s] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return l
        }
        ,
        o.invalidate = function() {
            return this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this),
            this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
            this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
            this._propLookup = this._targets ? {} : [],
            O.prototype.invalidate.call(this),
            this.vars.immediateRender && (this._time = -h,
            this.render(Math.min(0, -this._delay))),
            this
        }
        ,
        o._enabled = function(e, t) {
            if (u || l.wake(),
            e && this._gc) {
                var i, a = this._targets;
                if (a)
                    for (i = a.length; --i > -1; )
                        this._siblings[i] = $(a[i], this, !0);
                else
                    this._siblings = $(this.target, this, !0)
            }
            return O.prototype._enabled.call(this, e, t),
            this._notifyPluginsOfEnabled && this._firstPT ? A._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
        }
        ,
        A.to = function(e, t, i) {
            return new A(e,t,i)
        }
        ,
        A.from = function(e, t, i) {
            return i.runBackwards = !0,
            i.immediateRender = 0 != i.immediateRender,
            new A(e,t,i)
        }
        ,
        A.fromTo = function(e, t, i, a) {
            return a.startAt = i,
            a.immediateRender = 0 != a.immediateRender && 0 != i.immediateRender,
            new A(e,t,a)
        }
        ,
        A.delayedCall = function(e, t, i, a, r) {
            return new A(t,0,{
                delay: e,
                onComplete: t,
                onCompleteParams: i,
                callbackScope: a,
                onReverseComplete: t,
                onReverseCompleteParams: i,
                immediateRender: !1,
                lazy: !1,
                useFrames: r,
                overwrite: 0
            })
        }
        ,
        A.set = function(e, t) {
            return new A(e,0,t)
        }
        ,
        A.getTweensOf = function(e, t) {
            if (null == e)
                return [];
            e = "string" != typeof e ? e : A.selector(e) || e;
            var i, a, r, s;
            if ((m(e) || I(e)) && "number" != typeof e[0]) {
                for (i = e.length,
                a = []; --i > -1; )
                    a = a.concat(A.getTweensOf(e[i], t));
                for (i = a.length; --i > -1; )
                    for (s = a[i],
                    r = i; --r > -1; )
                        s === a[r] && a.splice(i, 1)
            } else if (e._gsTweenID)
                for (a = $(e).concat(),
                i = a.length; --i > -1; )
                    (a[i]._gc || t && !a[i].isActive()) && a.splice(i, 1);
            return a || []
        }
        ,
        A.killTweensOf = A.killDelayedCallsTo = function(e, t, i) {
            "object" == typeof t && (i = t,
            t = !1);
            for (var a = A.getTweensOf(e, t), r = a.length; --r > -1; )
                a[r]._kill(i, e)
        }
        ;
        var ie = _("plugins.TweenPlugin", function(e, t) {
            this._overwriteProps = (e || "").split(","),
            this._propName = this._overwriteProps[0],
            this._priority = t || 0,
            this._super = ie.prototype
        }, !0);
        if (o = ie.prototype,
        ie.version = "1.19.0",
        ie.API = 2,
        o._firstPT = null,
        o._addTween = V,
        o.setRatio = H,
        o._kill = function(e) {
            var t, i = this._overwriteProps, a = this._firstPT;
            if (null != e[this._propName])
                this._overwriteProps = [];
            else
                for (t = i.length; --t > -1; )
                    null != e[i[t]] && i.splice(t, 1);
            for (; a; )
                null != e[a.n] && (a._next && (a._next._prev = a._prev),
                a._prev ? (a._prev._next = a._next,
                a._prev = null) : this._firstPT === a && (this._firstPT = a._next)),
                a = a._next;
            return !1
        }
        ,
        o._mod = o._roundProps = function(e) {
            for (var t, i = this._firstPT; i; )
                t = e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")],
                t && "function" == typeof t && (2 === i.f ? i.t._applyPT.m = t : i.m = t),
                i = i._next
        }
        ,
        A._onPluginEvent = function(e, t) {
            var i, a, r, s, n, o = t._firstPT;
            if ("_onInitAllProps" === e) {
                for (; o; ) {
                    for (n = o._next,
                    a = r; a && a.pr > o.pr; )
                        a = a._next;
                    (o._prev = a ? a._prev : s) ? o._prev._next = o : r = o,
                    (o._next = a) ? a._prev = o : s = o,
                    o = n
                }
                o = t._firstPT = r
            }
            for (; o; )
                o.pg && "function" == typeof o.t[e] && o.t[e]() && (i = !0),
                o = o._next;
            return i
        }
        ,
        ie.activate = function(e) {
            for (var t = e.length; --t > -1; )
                e[t].API === ie.API && (Y[(new e[t])._propName] = e[t]);
            return !0
        }
        ,
        y.plugin = function(e) {
            if (!(e && e.propName && e.init && e.API))
                throw "illegal plugin definition.";
            var t, i = e.propName, a = e.priority || 0, r = e.overwriteProps, s = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_mod",
                mod: "_mod",
                initAll: "_onInitAllProps"
            }, n = _("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                ie.call(this, i, a),
                this._overwriteProps = r || []
            }, e.global === !0), o = n.prototype = new ie(i);
            o.constructor = n,
            n.API = e.API;
            for (t in s)
                "function" == typeof e[t] && (o[s[t]] = e[t]);
            return n.version = e.version,
            ie.activate([n]),
            n
        }
        ,
        s = e._gsQueue) {
            for (n = 0; n < s.length; n++)
                s[n]();
            for (o in g)
                g[o].func || e.console.log("GSAP encountered missing dependency: " + o)
        }
        u = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"),
function($) {
    $.fn.extend({
        smartpreload: function(e) {
            var t = $.extend({
                images: null,
                oneachimageload: null,
                onloadall: null
            }, e);
            return this.each(function() {
                for (var e = 0, i = 0; i < t.images.length; i++)
                    var a = $("<img/>").addClass("preloading").css("display", "none").attr("src", t.images[i]).on("load", function() {
                        e++,
                        null != t.oneachimageload && t.oneachimageload($(this).attr("src")),
                        e == t.images.length && null != t.onloadall && t.onloadall()
                    })
            })
        }
    })
}(jQuery),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function($) {
    function e(e) {
        if (a.raw)
            return e;
        try {
            return decodeURIComponent(e.replace(i, " "))
        } catch (t) {}
    }
    function t(t) {
        0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")),
        t = e(t);
        try {
            return a.json ? JSON.parse(t) : t
        } catch (i) {}
    }
    var i = /\+/g
      , a = $.cookie = function(i, r, s) {
        if (void 0 !== r) {
            if (s = $.extend({}, a.defaults, s),
            "number" == typeof s.expires) {
                var n = s.expires
                  , o = s.expires = new Date;
                o.setDate(o.getDate() + n)
            }
            return r = a.json ? JSON.stringify(r) : String(r),
            document.cookie = [a.raw ? i : encodeURIComponent(i), "=", a.raw ? r : encodeURIComponent(r), s.expires ? "; expires=" + s.expires.toUTCString() : "", s.path ? "; path=" + s.path : "", s.domain ? "; domain=" + s.domain : "", s.secure ? "; secure" : ""].join("")
        }
        for (var l = i ? void 0 : {}, u = document.cookie ? document.cookie.split("; ") : [], p = 0, c = u.length; c > p; p++) {
            var h = u[p].split("=")
              , d = e(h.shift())
              , f = h.join("=");
            if (i && i === d) {
                l = t(f);
                break
            }
            i || void 0 === (f = t(f)) || (l[d] = f)
        }
        return l
    }
    ;
    a.defaults = {},
    $.removeCookie = function(e, t) {
        return void 0 !== $.cookie(e) ? ($.cookie(e, "", $.extend({}, t, {
            expires: -1
        })),
        !0) : !1
    }
}),
!function() {
    "use strict";
    var e, t = function(a, r) {
        function s(e) {
            return Math.floor(e)
        }
        function n() {
            var e = x.params.autoplay
              , t = x.slides.eq(x.activeIndex);
            t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || x.params.autoplay),
            x.autoplayTimeoutId = setTimeout(function() {
                x.params.loop ? (x.fixLoop(),
                x._slideNext(),
                x.emit("onAutoplay", x)) : x.isEnd ? r.autoplayStopOnLast ? x.stopAutoplay() : (x._slideTo(0),
                x.emit("onAutoplay", x)) : (x._slideNext(),
                x.emit("onAutoplay", x))
            }, e)
        }
        function o(t, i) {
            var a = e(t.target);
            if (!a.is(i))
                if ("string" == typeof i)
                    a = a.parents(i);
                else if (i.nodeType) {
                    var r;
                    return a.parents().each(function(e, t) {
                        t === i && (r = i)
                    }),
                    r ? i : void 0
                }
            return 0 !== a.length ? a[0] : void 0
        }
        function l(e, t) {
            t = t || {};
            var i = window.MutationObserver || window.WebkitMutationObserver
              , a = new i(function(e) {
                e.forEach(function(e) {
                    x.onResize(!0),
                    x.emit("onObserverUpdate", x, e)
                })
            }
            );
            a.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            x.observers.push(a)
        }
        function u(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.keyCode || e.charCode;
            if (!x.params.allowSwipeToNext && (x.isHorizontal() && 39 === t || !x.isHorizontal() && 40 === t))
                return !1;
            if (!x.params.allowSwipeToPrev && (x.isHorizontal() && 37 === t || !x.isHorizontal() && 38 === t))
                return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === t || 39 === t || 38 === t || 40 === t) {
                    var i = !1;
                    if (x.container.parents("." + x.params.slideClass).length > 0 && 0 === x.container.parents("." + x.params.slideActiveClass).length)
                        return;
                    var a = {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    }
                      , r = window.innerWidth
                      , s = window.innerHeight
                      , n = x.container.offset();
                    x.rtl && (n.left = n.left - x.container[0].scrollLeft);
                    for (var o = [[n.left, n.top], [n.left + x.width, n.top], [n.left, n.top + x.height], [n.left + x.width, n.top + x.height]], l = 0; l < o.length; l++) {
                        var u = o[l];
                        u[0] >= a.left && u[0] <= a.left + r && u[1] >= a.top && u[1] <= a.top + s && (i = !0)
                    }
                    if (!i)
                        return
                }
                x.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1),
                (39 === t && !x.rtl || 37 === t && x.rtl) && x.slideNext(),
                (37 === t && !x.rtl || 39 === t && x.rtl) && x.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1),
                40 === t && x.slideNext(),
                38 === t && x.slidePrev()),
                x.emit("onKeyPress", x, t)
            }
        }
        function p(e) {
            var t = 0
              , i = 0
              , a = 0
              , r = 0;
            return "detail"in e && (i = e.detail),
            "wheelDelta"in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY"in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
            "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = i,
            i = 0),
            a = 10 * t,
            r = 10 * i,
            "deltaY"in e && (r = e.deltaY),
            "deltaX"in e && (a = e.deltaX),
            (a || r) && e.deltaMode && (1 === e.deltaMode ? (a *= 40,
            r *= 40) : (a *= 800,
            r *= 800)),
            a && !t && (t = 1 > a ? -1 : 1),
            r && !i && (i = 1 > r ? -1 : 1),
            {
                spinX: t,
                spinY: i,
                pixelX: a,
                pixelY: r
            }
        }
        function c(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = 0
              , i = x.rtl ? -1 : 1
              , a = p(e);
            if (x.params.mousewheelForceToAxis)
                if (x.isHorizontal()) {
                    if (!(Math.abs(a.pixelX) > Math.abs(a.pixelY)))
                        return;
                    t = a.pixelX * i
                } else {
                    if (!(Math.abs(a.pixelY) > Math.abs(a.pixelX)))
                        return;
                    t = a.pixelY
                }
            else
                t = Math.abs(a.pixelX) > Math.abs(a.pixelY) ? -a.pixelX * i : -a.pixelY;
            if (0 !== t) {
                if (x.params.mousewheelInvert && (t = -t),
                x.params.freeMode) {
                    var r = x.getWrapperTranslate() + t * x.params.mousewheelSensitivity
                      , s = x.isBeginning
                      , n = x.isEnd;
                    if (r >= x.minTranslate() && (r = x.minTranslate()),
                    r <= x.maxTranslate() && (r = x.maxTranslate()),
                    x.setWrapperTransition(0),
                    x.setWrapperTranslate(r),
                    x.updateProgress(),
                    x.updateActiveIndex(),
                    (!s && x.isBeginning || !n && x.isEnd) && x.updateClasses(),
                    x.params.freeModeSticky ? (clearTimeout(x.mousewheel.timeout),
                    x.mousewheel.timeout = setTimeout(function() {
                        x.slideReset()
                    }, 300)) : x.params.lazyLoading && x.lazy && x.lazy.load(),
                    x.emit("onScroll", x, e),
                    x.params.autoplay && x.params.autoplayDisableOnInteraction && x.stopAutoplay(),
                    0 === r || r === x.maxTranslate())
                        return
                } else {
                    if ((new window.Date).getTime() - x.mousewheel.lastScrollTime > 60)
                        if (0 > t)
                            if (x.isEnd && !x.params.loop || x.animating) {
                                if (x.params.mousewheelReleaseOnEdges)
                                    return !0
                            } else
                                x.slideNext(),
                                x.emit("onScroll", x, e);
                        else if (x.isBeginning && !x.params.loop || x.animating) {
                            if (x.params.mousewheelReleaseOnEdges)
                                return !0
                        } else
                            x.slidePrev(),
                            x.emit("onScroll", x, e);
                    x.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                !1
            }
        }
        function h(t, i) {
            t = e(t);
            var a, r, s, n = x.rtl ? -1 : 1;
            a = t.attr("data-swiper-parallax") || "0",
            r = t.attr("data-swiper-parallax-x"),
            s = t.attr("data-swiper-parallax-y"),
            r || s ? (r = r || "0",
            s = s || "0") : x.isHorizontal() ? (r = a,
            s = "0") : (s = a,
            r = "0"),
            r = r.indexOf("%") >= 0 ? parseInt(r, 10) * i * n + "%" : r * i * n + "px",
            s = s.indexOf("%") >= 0 ? parseInt(s, 10) * i + "%" : s * i + "px",
            t.transform("translate3d(" + r + ", " + s + ",0px)")
        }
        function d(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e),
            e
        }
        if (!(this instanceof t))
            return new t(a,r);
        var f = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            },
            flip: {
                slideShadows: !0,
                limitRotation: !0
            },
            cube: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            },
            fade: {
                crossFade: !1
            },
            parallax: !1,
            zoom: !1,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: !0,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: "container",
            hashnav: !1,
            hashnavWatchState: !1,
            history: !1,
            replaceState: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            normalizeSlideIndex: !0,
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            paginationClickableClass: "swiper-pagination-clickable",
            paginationModifierClass: "swiper-pagination-",
            lazyLoadingClass: "swiper-lazy",
            lazyStatusLoadingClass: "swiper-lazy-loading",
            lazyStatusLoadedClass: "swiper-lazy-loaded",
            lazyPreloaderClass: "swiper-lazy-preloader",
            notificationClass: "swiper-notification",
            preloaderClass: "preloader",
            zoomContainerClass: "swiper-zoom-container",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }
          , m = r && r.virtualTranslate;
        r = r || {};
        var g = {};
        for (var v in r)
            if ("object" != typeof r[v] || null === r[v] || r[v].nodeType || r[v] === window || r[v] === document || void 0 !== i && r[v]instanceof i || "undefined" != typeof jQuery && r[v]instanceof jQuery)
                g[v] = r[v];
            else {
                g[v] = {};
                for (var y in r[v])
                    g[v][y] = r[v][y]
            }
        for (var _ in f)
            if (void 0 === r[_])
                r[_] = f[_];
            else if ("object" == typeof r[_])
                for (var w in f[_])
                    void 0 === r[_][w] && (r[_][w] = f[_][w]);
        var x = this;
        if (x.params = r,
        x.originalParams = g,
        x.classNames = [],
        void 0 !== e && void 0 !== i && (e = i),
        (void 0 !== e || (e = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i)) && (x.$ = e,
        x.currentBreakpoint = void 0,
        x.getActiveBreakpoint = function() {
            if (!x.params.breakpoints)
                return !1;
            var e, t = !1, i = [];
            for (e in x.params.breakpoints)
                x.params.breakpoints.hasOwnProperty(e) && i.push(e);
            i.sort(function(e, t) {
                return parseInt(e, 10) > parseInt(t, 10)
            });
            for (var a = 0; a < i.length; a++)
                (e = i[a]) >= window.innerWidth && !t && (t = e);
            return t || "max"
        }
        ,
        x.setBreakpoint = function() {
            var e = x.getActiveBreakpoint();
            if (e && x.currentBreakpoint !== e) {
                var t = e in x.params.breakpoints ? x.params.breakpoints[e] : x.originalParams
                  , i = x.params.loop && t.slidesPerView !== x.params.slidesPerView;
                for (var a in t)
                    x.params[a] = t[a];
                x.currentBreakpoint = e,
                i && x.destroyLoop && x.reLoop(!0)
            }
        }
        ,
        x.params.breakpoints && x.setBreakpoint(),
        x.container = e(a),
        0 !== x.container.length)) {
            if (x.container.length > 1) {
                var b = [];
                return x.container.each(function() {
                    b.push(new t(this,r))
                }),
                b
            }
            x.container[0].swiper = x,
            x.container.data("swiper", x),
            x.classNames.push(x.params.containerModifierClass + x.params.direction),
            x.params.freeMode && x.classNames.push(x.params.containerModifierClass + "free-mode"),
            x.support.flexbox || (x.classNames.push(x.params.containerModifierClass + "no-flexbox"),
            x.params.slidesPerColumn = 1),
            x.params.autoHeight && x.classNames.push(x.params.containerModifierClass + "autoheight"),
            (x.params.parallax || x.params.watchSlidesVisibility) && (x.params.watchSlidesProgress = !0),
            x.params.touchReleaseOnEdges && (x.params.resistanceRatio = 0),
            ["cube", "coverflow", "flip"].indexOf(x.params.effect) >= 0 && (x.support.transforms3d ? (x.params.watchSlidesProgress = !0,
            x.classNames.push(x.params.containerModifierClass + "3d")) : x.params.effect = "slide"),
            "slide" !== x.params.effect && x.classNames.push(x.params.containerModifierClass + x.params.effect),
            "cube" === x.params.effect && (x.params.resistanceRatio = 0,
            x.params.slidesPerView = 1,
            x.params.slidesPerColumn = 1,
            x.params.slidesPerGroup = 1,
            x.params.centeredSlides = !1,
            x.params.spaceBetween = 0,
            x.params.virtualTranslate = !0),
            "fade" !== x.params.effect && "flip" !== x.params.effect || (x.params.slidesPerView = 1,
            x.params.slidesPerColumn = 1,
            x.params.slidesPerGroup = 1,
            x.params.watchSlidesProgress = !0,
            x.params.spaceBetween = 0,
            void 0 === m && (x.params.virtualTranslate = !0)),
            x.params.grabCursor && x.support.touch && (x.params.grabCursor = !1),
            x.wrapper = x.container.children("." + x.params.wrapperClass),
            x.params.pagination && (x.paginationContainer = e(x.params.pagination),
            x.params.uniqueNavElements && "string" == typeof x.params.pagination && x.paginationContainer.length > 1 && 1 === x.container.find(x.params.pagination).length && (x.paginationContainer = x.container.find(x.params.pagination)),
            "bullets" === x.params.paginationType && x.params.paginationClickable ? x.paginationContainer.addClass(x.params.paginationModifierClass + "clickable") : x.params.paginationClickable = !1,
            x.paginationContainer.addClass(x.params.paginationModifierClass + x.params.paginationType)),
            (x.params.nextButton || x.params.prevButton) && (x.params.nextButton && (x.nextButton = e(x.params.nextButton),
            x.params.uniqueNavElements && "string" == typeof x.params.nextButton && x.nextButton.length > 1 && 1 === x.container.find(x.params.nextButton).length && (x.nextButton = x.container.find(x.params.nextButton))),
            x.params.prevButton && (x.prevButton = e(x.params.prevButton),
            x.params.uniqueNavElements && "string" == typeof x.params.prevButton && x.prevButton.length > 1 && 1 === x.container.find(x.params.prevButton).length && (x.prevButton = x.container.find(x.params.prevButton)))),
            x.isHorizontal = function() {
                return "horizontal" === x.params.direction
            }
            ,
            x.rtl = x.isHorizontal() && ("rtl" === x.container[0].dir.toLowerCase() || "rtl" === x.container.css("direction")),
            x.rtl && x.classNames.push(x.params.containerModifierClass + "rtl"),
            x.rtl && (x.wrongRTL = "-webkit-box" === x.wrapper.css("display")),
            x.params.slidesPerColumn > 1 && x.classNames.push(x.params.containerModifierClass + "multirow"),
            x.device.android && x.classNames.push(x.params.containerModifierClass + "android"),
            x.container.addClass(x.classNames.join(" ")),
            x.translate = 0,
            x.progress = 0,
            x.velocity = 0,
            x.lockSwipeToNext = function() {
                x.params.allowSwipeToNext = !1,
                x.params.allowSwipeToPrev === !1 && x.params.grabCursor && x.unsetGrabCursor()
            }
            ,
            x.lockSwipeToPrev = function() {
                x.params.allowSwipeToPrev = !1,
                x.params.allowSwipeToNext === !1 && x.params.grabCursor && x.unsetGrabCursor()
            }
            ,
            x.lockSwipes = function() {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !1,
                x.params.grabCursor && x.unsetGrabCursor()
            }
            ,
            x.unlockSwipeToNext = function() {
                x.params.allowSwipeToNext = !0,
                x.params.allowSwipeToPrev === !0 && x.params.grabCursor && x.setGrabCursor()
            }
            ,
            x.unlockSwipeToPrev = function() {
                x.params.allowSwipeToPrev = !0,
                x.params.allowSwipeToNext === !0 && x.params.grabCursor && x.setGrabCursor()
            }
            ,
            x.unlockSwipes = function() {
                x.params.allowSwipeToNext = x.params.allowSwipeToPrev = !0,
                x.params.grabCursor && x.setGrabCursor()
            }
            ,
            x.setGrabCursor = function(e) {
                x.container[0].style.cursor = "move",
                x.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                x.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                x.container[0].style.cursor = e ? "grabbing" : "grab"
            }
            ,
            x.unsetGrabCursor = function() {
                x.container[0].style.cursor = ""
            }
            ,
            x.params.grabCursor && x.setGrabCursor(),
            x.imagesToLoad = [],
            x.imagesLoaded = 0,
            x.loadImage = function(e, t, i, a, r, s) {
                function n() {
                    s && s()
                }
                var o;
                e.complete && r ? n() : t ? (o = new window.Image,
                o.onload = n,
                o.onerror = n,
                a && (o.sizes = a),
                i && (o.srcset = i),
                t && (o.src = t)) : n()
            }
            ,
            x.preloadImages = function() {
                function e() {
                    void 0 !== x && null !== x && x && (void 0 !== x.imagesLoaded && x.imagesLoaded++,
                    x.imagesLoaded === x.imagesToLoad.length && (x.params.updateOnImagesReady && x.update(),
                    x.emit("onImagesReady", x)))
                }
                x.imagesToLoad = x.container.find("img");
                for (var t = 0; t < x.imagesToLoad.length; t++)
                    x.loadImage(x.imagesToLoad[t], x.imagesToLoad[t].currentSrc || x.imagesToLoad[t].getAttribute("src"), x.imagesToLoad[t].srcset || x.imagesToLoad[t].getAttribute("srcset"), x.imagesToLoad[t].sizes || x.imagesToLoad[t].getAttribute("sizes"), !0, e)
            }
            ,
            x.autoplayTimeoutId = void 0,
            x.autoplaying = !1,
            x.autoplayPaused = !1,
            x.startAutoplay = function() {
                return void 0 === x.autoplayTimeoutId && !!x.params.autoplay && !x.autoplaying && (x.autoplaying = !0,
                x.emit("onAutoplayStart", x),
                void n())
            }
            ,
            x.stopAutoplay = function(e) {
                x.autoplayTimeoutId && (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId),
                x.autoplaying = !1,
                x.autoplayTimeoutId = void 0,
                x.emit("onAutoplayStop", x))
            }
            ,
            x.pauseAutoplay = function(e) {
                x.autoplayPaused || (x.autoplayTimeoutId && clearTimeout(x.autoplayTimeoutId),
                x.autoplayPaused = !0,
                0 === e ? (x.autoplayPaused = !1,
                n()) : x.wrapper.transitionEnd(function() {
                    x && (x.autoplayPaused = !1,
                    x.autoplaying ? n() : x.stopAutoplay())
                }))
            }
            ,
            x.minTranslate = function() {
                return -x.snapGrid[0]
            }
            ,
            x.maxTranslate = function() {
                return -x.snapGrid[x.snapGrid.length - 1]
            }
            ,
            x.updateAutoHeight = function() {
                var e, t = [], i = 0;
                if ("auto" !== x.params.slidesPerView && x.params.slidesPerView > 1)
                    for (e = 0; e < Math.ceil(x.params.slidesPerView); e++) {
                        var a = x.activeIndex + e;
                        if (a > x.slides.length)
                            break;
                        t.push(x.slides.eq(a)[0])
                    }
                else
                    t.push(x.slides.eq(x.activeIndex)[0]);
                for (e = 0; e < t.length; e++)
                    if (void 0 !== t[e]) {
                        var r = t[e].offsetHeight;
                        i = r > i ? r : i
                    }
                i && x.wrapper.css("height", i + "px")
            }
            ,
            x.updateContainerSize = function() {
                var e, t;
                e = void 0 !== x.params.width ? x.params.width : x.container[0].clientWidth,
                t = void 0 !== x.params.height ? x.params.height : x.container[0].clientHeight,
                0 === e && x.isHorizontal() || 0 === t && !x.isHorizontal() || (e = e - parseInt(x.container.css("padding-left"), 10) - parseInt(x.container.css("padding-right"), 10),
                t = t - parseInt(x.container.css("padding-top"), 10) - parseInt(x.container.css("padding-bottom"), 10),
                x.width = e,
                x.height = t,
                x.size = x.isHorizontal() ? x.width : x.height)
            }
            ,
            x.updateSlidesSize = function() {
                x.slides = x.wrapper.children("." + x.params.slideClass),
                x.snapGrid = [],
                x.slidesGrid = [],
                x.slidesSizesGrid = [];
                var e, t = x.params.spaceBetween, i = -x.params.slidesOffsetBefore, a = 0, r = 0;
                if (void 0 !== x.size) {
                    "string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * x.size),
                    x.virtualSize = -t,
                    x.rtl ? x.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : x.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var n;
                    x.params.slidesPerColumn > 1 && (n = Math.floor(x.slides.length / x.params.slidesPerColumn) === x.slides.length / x.params.slidesPerColumn ? x.slides.length : Math.ceil(x.slides.length / x.params.slidesPerColumn) * x.params.slidesPerColumn,
                    "auto" !== x.params.slidesPerView && "row" === x.params.slidesPerColumnFill && (n = Math.max(n, x.params.slidesPerView * x.params.slidesPerColumn)));
                    var o, l = x.params.slidesPerColumn, u = n / l, p = u - (x.params.slidesPerColumn * u - x.slides.length);
                    for (e = 0; e < x.slides.length; e++) {
                        o = 0;
                        var c = x.slides.eq(e);
                        if (x.params.slidesPerColumn > 1) {
                            var h, d, f;
                            "column" === x.params.slidesPerColumnFill ? (d = Math.floor(e / l),
                            f = e - d * l,
                            (d > p || d === p && f === l - 1) && ++f >= l && (f = 0,
                            d++),
                            h = d + f * n / l,
                            c.css({
                                "-webkit-box-ordinal-group": h,
                                "-moz-box-ordinal-group": h,
                                "-ms-flex-order": h,
                                "-webkit-order": h,
                                order: h
                            })) : (f = Math.floor(e / u),
                            d = e - f * u),
                            c.css("margin-" + (x.isHorizontal() ? "top" : "left"), 0 !== f && x.params.spaceBetween && x.params.spaceBetween + "px").attr("data-swiper-column", d).attr("data-swiper-row", f)
                        }
                        "none" !== c.css("display") && ("auto" === x.params.slidesPerView ? (o = x.isHorizontal() ? c.outerWidth(!0) : c.outerHeight(!0),
                        x.params.roundLengths && (o = s(o))) : (o = (x.size - (x.params.slidesPerView - 1) * t) / x.params.slidesPerView,
                        x.params.roundLengths && (o = s(o)),
                        x.isHorizontal() ? x.slides[e].style.width = o + "px" : x.slides[e].style.height = o + "px"),
                        x.slides[e].swiperSlideSize = o,
                        x.slidesSizesGrid.push(o),
                        x.params.centeredSlides ? (i = i + o / 2 + a / 2 + t,
                        0 === a && 0 !== e && (i = i - x.size / 2 - t),
                        0 === e && (i = i - x.size / 2 - t),
                        Math.abs(i) < .001 && (i = 0),
                        r % x.params.slidesPerGroup == 0 && x.snapGrid.push(i),
                        x.slidesGrid.push(i)) : (r % x.params.slidesPerGroup == 0 && x.snapGrid.push(i),
                        x.slidesGrid.push(i),
                        i = i + o + t),
                        x.virtualSize += o + t,
                        a = o,
                        r++)
                    }
                    x.virtualSize = Math.max(x.virtualSize, x.size) + x.params.slidesOffsetAfter;
                    var m;
                    if (x.rtl && x.wrongRTL && ("slide" === x.params.effect || "coverflow" === x.params.effect) && x.wrapper.css({
                        width: x.virtualSize + x.params.spaceBetween + "px"
                    }),
                    x.support.flexbox && !x.params.setWrapperSize || (x.isHorizontal() ? x.wrapper.css({
                        width: x.virtualSize + x.params.spaceBetween + "px"
                    }) : x.wrapper.css({
                        height: x.virtualSize + x.params.spaceBetween + "px"
                    })),
                    x.params.slidesPerColumn > 1 && (x.virtualSize = (o + x.params.spaceBetween) * n,
                    x.virtualSize = Math.ceil(x.virtualSize / x.params.slidesPerColumn) - x.params.spaceBetween,
                    x.isHorizontal() ? x.wrapper.css({
                        width: x.virtualSize + x.params.spaceBetween + "px"
                    }) : x.wrapper.css({
                        height: x.virtualSize + x.params.spaceBetween + "px"
                    }),
                    x.params.centeredSlides)) {
                        for (m = [],
                        e = 0; e < x.snapGrid.length; e++)
                            x.snapGrid[e] < x.virtualSize + x.snapGrid[0] && m.push(x.snapGrid[e]);
                        x.snapGrid = m
                    }
                    if (!x.params.centeredSlides) {
                        for (m = [],
                        e = 0; e < x.snapGrid.length; e++)
                            x.snapGrid[e] <= x.virtualSize - x.size && m.push(x.snapGrid[e]);
                        x.snapGrid = m,
                        Math.floor(x.virtualSize - x.size) - Math.floor(x.snapGrid[x.snapGrid.length - 1]) > 1 && x.snapGrid.push(x.virtualSize - x.size)
                    }
                    0 === x.snapGrid.length && (x.snapGrid = [0]),
                    0 !== x.params.spaceBetween && (x.isHorizontal() ? x.rtl ? x.slides.css({
                        marginLeft: t + "px"
                    }) : x.slides.css({
                        marginRight: t + "px"
                    }) : x.slides.css({
                        marginBottom: t + "px"
                    })),
                    x.params.watchSlidesProgress && x.updateSlidesOffset()
                }
            }
            ,
            x.updateSlidesOffset = function() {
                for (var e = 0; e < x.slides.length; e++)
                    x.slides[e].swiperSlideOffset = x.isHorizontal() ? x.slides[e].offsetLeft : x.slides[e].offsetTop
            }
            ,
            x.currentSlidesPerView = function() {
                var e, t, i = 1;
                if (x.params.centeredSlides) {
                    var a, r = x.slides[x.activeIndex].swiperSlideSize;
                    for (e = x.activeIndex + 1; e < x.slides.length; e++)
                        x.slides[e] && !a && (r += x.slides[e].swiperSlideSize,
                        i++,
                        r > x.size && (a = !0));
                    for (t = x.activeIndex - 1; t >= 0; t--)
                        x.slides[t] && !a && (r += x.slides[t].swiperSlideSize,
                        i++,
                        r > x.size && (a = !0))
                } else
                    for (e = x.activeIndex + 1; e < x.slides.length; e++)
                        x.slidesGrid[e] - x.slidesGrid[x.activeIndex] < x.size && i++;
                return i
            }
            ,
            x.updateSlidesProgress = function(e) {
                if (void 0 === e && (e = x.translate || 0),
                0 !== x.slides.length) {
                    void 0 === x.slides[0].swiperSlideOffset && x.updateSlidesOffset();
                    var t = -e;
                    x.rtl && (t = e),
                    x.slides.removeClass(x.params.slideVisibleClass);
                    for (var i = 0; i < x.slides.length; i++) {
                        var a = x.slides[i]
                          , r = (t + (x.params.centeredSlides ? x.minTranslate() : 0) - a.swiperSlideOffset) / (a.swiperSlideSize + x.params.spaceBetween);
                        if (x.params.watchSlidesVisibility) {
                            var s = -(t - a.swiperSlideOffset)
                              , n = s + x.slidesSizesGrid[i];
                            (s >= 0 && s < x.size || n > 0 && n <= x.size || 0 >= s && n >= x.size) && x.slides.eq(i).addClass(x.params.slideVisibleClass)
                        }
                        a.progress = x.rtl ? -r : r
                    }
                }
            }
            ,
            x.updateProgress = function(e) {
                void 0 === e && (e = x.translate || 0);
                var t = x.maxTranslate() - x.minTranslate()
                  , i = x.isBeginning
                  , a = x.isEnd;
                0 === t ? (x.progress = 0,
                x.isBeginning = x.isEnd = !0) : (x.progress = (e - x.minTranslate()) / t,
                x.isBeginning = x.progress <= 0,
                x.isEnd = x.progress >= 1),
                x.isBeginning && !i && x.emit("onReachBeginning", x),
                x.isEnd && !a && x.emit("onReachEnd", x),
                x.params.watchSlidesProgress && x.updateSlidesProgress(e),
                x.emit("onProgress", x, x.progress)
            }
            ,
            x.updateActiveIndex = function() {
                var e, t, i, a = x.rtl ? x.translate : -x.translate;
                for (t = 0; t < x.slidesGrid.length; t++)
                    void 0 !== x.slidesGrid[t + 1] ? a >= x.slidesGrid[t] && a < x.slidesGrid[t + 1] - (x.slidesGrid[t + 1] - x.slidesGrid[t]) / 2 ? e = t : a >= x.slidesGrid[t] && a < x.slidesGrid[t + 1] && (e = t + 1) : a >= x.slidesGrid[t] && (e = t);
                x.params.normalizeSlideIndex && (0 > e || void 0 === e) && (e = 0),
                i = Math.floor(e / x.params.slidesPerGroup),
                i >= x.snapGrid.length && (i = x.snapGrid.length - 1),
                e !== x.activeIndex && (x.snapIndex = i,
                x.previousIndex = x.activeIndex,
                x.activeIndex = e,
                x.updateClasses(),
                x.updateRealIndex())
            }
            ,
            x.updateRealIndex = function() {
                x.realIndex = parseInt(x.slides.eq(x.activeIndex).attr("data-swiper-slide-index") || x.activeIndex, 10)
            }
            ,
            x.updateClasses = function() {
                x.slides.removeClass(x.params.slideActiveClass + " " + x.params.slideNextClass + " " + x.params.slidePrevClass + " " + x.params.slideDuplicateActiveClass + " " + x.params.slideDuplicateNextClass + " " + x.params.slideDuplicatePrevClass);
                var t = x.slides.eq(x.activeIndex);
                t.addClass(x.params.slideActiveClass),
                r.loop && (t.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + x.realIndex + '"]').addClass(x.params.slideDuplicateActiveClass));
                var i = t.next("." + x.params.slideClass).addClass(x.params.slideNextClass);
                x.params.loop && 0 === i.length && (i = x.slides.eq(0),
                i.addClass(x.params.slideNextClass));
                var a = t.prev("." + x.params.slideClass).addClass(x.params.slidePrevClass);
                if (x.params.loop && 0 === a.length && (a = x.slides.eq(-1),
                a.addClass(x.params.slidePrevClass)),
                r.loop && (i.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicateNextClass),
                a.hasClass(x.params.slideDuplicateClass) ? x.wrapper.children("." + x.params.slideClass + ":not(." + x.params.slideDuplicateClass + ')[data-swiper-slide-index="' + a.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass) : x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + a.attr("data-swiper-slide-index") + '"]').addClass(x.params.slideDuplicatePrevClass)),
                x.paginationContainer && x.paginationContainer.length > 0) {
                    var s, n = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length;
                    if (x.params.loop ? (s = Math.ceil((x.activeIndex - x.loopedSlides) / x.params.slidesPerGroup),
                    s > x.slides.length - 1 - 2 * x.loopedSlides && (s -= x.slides.length - 2 * x.loopedSlides),
                    s > n - 1 && (s -= n),
                    0 > s && "bullets" !== x.params.paginationType && (s = n + s)) : s = void 0 !== x.snapIndex ? x.snapIndex : x.activeIndex || 0,
                    "bullets" === x.params.paginationType && x.bullets && x.bullets.length > 0 && (x.bullets.removeClass(x.params.bulletActiveClass),
                    x.paginationContainer.length > 1 ? x.bullets.each(function() {
                        e(this).index() === s && e(this).addClass(x.params.bulletActiveClass)
                    }) : x.bullets.eq(s).addClass(x.params.bulletActiveClass)),
                    "fraction" === x.params.paginationType && (x.paginationContainer.find("." + x.params.paginationCurrentClass).text(s + 1),
                    x.paginationContainer.find("." + x.params.paginationTotalClass).text(n)),
                    "progress" === x.params.paginationType) {
                        var o = (s + 1) / n
                          , l = o
                          , u = 1;
                        x.isHorizontal() || (u = o,
                        l = 1),
                        x.paginationContainer.find("." + x.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + u + ")").transition(x.params.speed)
                    }
                    "custom" === x.params.paginationType && x.params.paginationCustomRender && (x.paginationContainer.html(x.params.paginationCustomRender(x, s + 1, n)),
                    x.emit("onPaginationRendered", x, x.paginationContainer[0]))
                }
                x.params.loop || (x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.isBeginning ? (x.prevButton.addClass(x.params.buttonDisabledClass),
                x.params.a11y && x.a11y && x.a11y.disable(x.prevButton)) : (x.prevButton.removeClass(x.params.buttonDisabledClass),
                x.params.a11y && x.a11y && x.a11y.enable(x.prevButton))),
                x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.isEnd ? (x.nextButton.addClass(x.params.buttonDisabledClass),
                x.params.a11y && x.a11y && x.a11y.disable(x.nextButton)) : (x.nextButton.removeClass(x.params.buttonDisabledClass),
                x.params.a11y && x.a11y && x.a11y.enable(x.nextButton))))
            }
            ,
            x.updatePagination = function() {
                if (x.params.pagination && x.paginationContainer && x.paginationContainer.length > 0) {
                    var e = "";
                    if ("bullets" === x.params.paginationType) {
                        for (var t = x.params.loop ? Math.ceil((x.slides.length - 2 * x.loopedSlides) / x.params.slidesPerGroup) : x.snapGrid.length, i = 0; t > i; i++)
                            e += x.params.paginationBulletRender ? x.params.paginationBulletRender(x, i, x.params.bulletClass) : "<" + x.params.paginationElement + ' class="' + x.params.bulletClass + '"></' + x.params.paginationElement + ">";
                        x.paginationContainer.html(e),
                        x.bullets = x.paginationContainer.find("." + x.params.bulletClass),
                        x.params.paginationClickable && x.params.a11y && x.a11y && x.a11y.initPagination()
                    }
                    "fraction" === x.params.paginationType && (e = x.params.paginationFractionRender ? x.params.paginationFractionRender(x, x.params.paginationCurrentClass, x.params.paginationTotalClass) : '<span class="' + x.params.paginationCurrentClass + '"></span> / <span class="' + x.params.paginationTotalClass + '"></span>',
                    x.paginationContainer.html(e)),
                    "progress" === x.params.paginationType && (e = x.params.paginationProgressRender ? x.params.paginationProgressRender(x, x.params.paginationProgressbarClass) : '<span class="' + x.params.paginationProgressbarClass + '"></span>',
                    x.paginationContainer.html(e)),
                    "custom" !== x.params.paginationType && x.emit("onPaginationRendered", x, x.paginationContainer[0])
                }
            }
            ,
            x.update = function(e) {
                function t() {
                    x.rtl,
                    x.translate,
                    i = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate()),
                    x.setWrapperTranslate(i),
                    x.updateActiveIndex(),
                    x.updateClasses()
                }
                if (x) {
                    x.updateContainerSize(),
                    x.updateSlidesSize(),
                    x.updateProgress(),
                    x.updatePagination(),
                    x.updateClasses(),
                    x.params.scrollbar && x.scrollbar && x.scrollbar.set();
                    var i;
                    e ? (x.controller && x.controller.spline && (x.controller.spline = void 0),
                    x.params.freeMode ? (t(),
                    x.params.autoHeight && x.updateAutoHeight()) : (("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0)) || t()) : x.params.autoHeight && x.updateAutoHeight()
                }
            }
            ,
            x.onResize = function(e) {
                x.params.onBeforeResize && x.params.onBeforeResize(x),
                x.params.breakpoints && x.setBreakpoint();
                var t = x.params.allowSwipeToPrev
                  , i = x.params.allowSwipeToNext;
                x.params.allowSwipeToPrev = x.params.allowSwipeToNext = !0,
                x.updateContainerSize(),
                x.updateSlidesSize(),
                ("auto" === x.params.slidesPerView || x.params.freeMode || e) && x.updatePagination(),
                x.params.scrollbar && x.scrollbar && x.scrollbar.set(),
                x.controller && x.controller.spline && (x.controller.spline = void 0);
                var a = !1;
                if (x.params.freeMode) {
                    var r = Math.min(Math.max(x.translate, x.maxTranslate()), x.minTranslate());
                    x.setWrapperTranslate(r),
                    x.updateActiveIndex(),
                    x.updateClasses(),
                    x.params.autoHeight && x.updateAutoHeight()
                } else
                    x.updateClasses(),
                    a = ("auto" === x.params.slidesPerView || x.params.slidesPerView > 1) && x.isEnd && !x.params.centeredSlides ? x.slideTo(x.slides.length - 1, 0, !1, !0) : x.slideTo(x.activeIndex, 0, !1, !0);
                x.params.lazyLoading && !a && x.lazy && x.lazy.load(),
                x.params.allowSwipeToPrev = t,
                x.params.allowSwipeToNext = i,
                x.params.onAfterResize && x.params.onAfterResize(x)
            }
            ,
            x.touchEventsDesktop = {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            },
            window.navigator.pointerEnabled ? x.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled && (x.touchEventsDesktop = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }),
            x.touchEvents = {
                start: x.support.touch || !x.params.simulateTouch ? "touchstart" : x.touchEventsDesktop.start,
                move: x.support.touch || !x.params.simulateTouch ? "touchmove" : x.touchEventsDesktop.move,
                end: x.support.touch || !x.params.simulateTouch ? "touchend" : x.touchEventsDesktop.end
            },
            (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === x.params.touchEventsTarget ? x.container : x.wrapper).addClass("swiper-wp8-" + x.params.direction),
            x.initEvents = function(e) {
                var t = e ? "off" : "on"
                  , i = e ? "removeEventListener" : "addEventListener"
                  , a = "container" === x.params.touchEventsTarget ? x.container[0] : x.wrapper[0]
                  , s = x.support.touch ? a : document
                  , n = !!x.params.nested;
                if (x.browser.ie)
                    a[i](x.touchEvents.start, x.onTouchStart, !1),
                    s[i](x.touchEvents.move, x.onTouchMove, n),
                    s[i](x.touchEvents.end, x.onTouchEnd, !1);
                else {
                    if (x.support.touch) {
                        var o = !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        a[i](x.touchEvents.start, x.onTouchStart, o),
                        a[i](x.touchEvents.move, x.onTouchMove, n),
                        a[i](x.touchEvents.end, x.onTouchEnd, o)
                    }
                    (r.simulateTouch && !x.device.ios && !x.device.android || r.simulateTouch && !x.support.touch && x.device.ios) && (a[i]("mousedown", x.onTouchStart, !1),
                    document[i]("mousemove", x.onTouchMove, n),
                    document[i]("mouseup", x.onTouchEnd, !1))
                }
                window[i]("resize", x.onResize),
                x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.nextButton[t]("click", x.onClickNext),
                x.params.a11y && x.a11y && x.nextButton[t]("keydown", x.a11y.onEnterKey)),
                x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.prevButton[t]("click", x.onClickPrev),
                x.params.a11y && x.a11y && x.prevButton[t]("keydown", x.a11y.onEnterKey)),
                x.params.pagination && x.params.paginationClickable && (x.paginationContainer[t]("click", "." + x.params.bulletClass, x.onClickIndex),
                x.params.a11y && x.a11y && x.paginationContainer[t]("keydown", "." + x.params.bulletClass, x.a11y.onEnterKey)),
                (x.params.preventClicks || x.params.preventClicksPropagation) && a[i]("click", x.preventClicks, !0)
            }
            ,
            x.attachEvents = function() {
                x.initEvents()
            }
            ,
            x.detachEvents = function() {
                x.initEvents(!0)
            }
            ,
            x.allowClick = !0,
            x.preventClicks = function(e) {
                x.allowClick || (x.params.preventClicks && e.preventDefault(),
                x.params.preventClicksPropagation && x.animating && (e.stopPropagation(),
                e.stopImmediatePropagation()))
            }
            ,
            x.onClickNext = function(e) {
                e.preventDefault(),
                x.isEnd && !x.params.loop || x.slideNext()
            }
            ,
            x.onClickPrev = function(e) {
                e.preventDefault(),
                x.isBeginning && !x.params.loop || x.slidePrev()
            }
            ,
            x.onClickIndex = function(t) {
                t.preventDefault();
                var i = e(this).index() * x.params.slidesPerGroup;
                x.params.loop && (i += x.loopedSlides),
                x.slideTo(i)
            }
            ,
            x.updateClickedSlide = function(t) {
                var i = o(t, "." + x.params.slideClass)
                  , a = !1;
                if (i)
                    for (var r = 0; r < x.slides.length; r++)
                        x.slides[r] === i && (a = !0);
                if (!i || !a)
                    return x.clickedSlide = void 0,
                    void (x.clickedIndex = void 0);
                if (x.clickedSlide = i,
                x.clickedIndex = e(i).index(),
                x.params.slideToClickedSlide && void 0 !== x.clickedIndex && x.clickedIndex !== x.activeIndex) {
                    var s, n = x.clickedIndex, l = "auto" === x.params.slidesPerView ? x.currentSlidesPerView() : x.params.slidesPerView;
                    if (x.params.loop) {
                        if (x.animating)
                            return;
                        s = parseInt(e(x.clickedSlide).attr("data-swiper-slide-index"), 10),
                        x.params.centeredSlides ? n < x.loopedSlides - l / 2 || n > x.slides.length - x.loopedSlides + l / 2 ? (x.fixLoop(),
                        n = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(),
                        setTimeout(function() {
                            x.slideTo(n)
                        }, 0)) : x.slideTo(n) : n > x.slides.length - l ? (x.fixLoop(),
                        n = x.wrapper.children("." + x.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + x.params.slideDuplicateClass + ")").eq(0).index(),
                        setTimeout(function() {
                            x.slideTo(n)
                        }, 0)) : x.slideTo(n)
                    } else
                        x.slideTo(n)
                }
            }
            ;
            var T, S, C, P, k, M, O, z, E, A, I = "input, select, textarea, button, video", R = Date.now(), D = [];
            x.animating = !1,
            x.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var L, B;
            x.onTouchStart = function(t) {
                if (t.originalEvent && (t = t.originalEvent),
                (L = "touchstart" === t.type) || !("which"in t) || 3 !== t.which) {
                    if (x.params.noSwiping && o(t, "." + x.params.noSwipingClass))
                        return void (x.allowClick = !0);
                    if (!x.params.swipeHandler || o(t, x.params.swipeHandler)) {
                        var i = x.touches.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX
                          , a = x.touches.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY;
                        if (!(x.device.ios && x.params.iOSEdgeSwipeDetection && i <= x.params.iOSEdgeSwipeThreshold)) {
                            if (T = !0,
                            S = !1,
                            C = !0,
                            k = void 0,
                            B = void 0,
                            x.touches.startX = i,
                            x.touches.startY = a,
                            P = Date.now(),
                            x.allowClick = !0,
                            x.updateContainerSize(),
                            x.swipeDirection = void 0,
                            x.params.threshold > 0 && (z = !1),
                            "touchstart" !== t.type) {
                                var r = !0;
                                e(t.target).is(I) && (r = !1),
                                document.activeElement && e(document.activeElement).is(I) && document.activeElement.blur(),
                                r && t.preventDefault()
                            }
                            x.emit("onTouchStart", x, t)
                        }
                    }
                }
            }
            ,
            x.onTouchMove = function(t) {
                if (t.originalEvent && (t = t.originalEvent),
                !L || "mousemove" !== t.type) {
                    if (t.preventedByNestedSwiper)
                        return x.touches.startX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX,
                        void (x.touches.startY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY);
                    if (x.params.onlyExternal)
                        return x.allowClick = !1,
                        void (T && (x.touches.startX = x.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX,
                        x.touches.startY = x.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY,
                        P = Date.now()));
                    if (L && x.params.touchReleaseOnEdges && !x.params.loop)
                        if (x.isHorizontal()) {
                            if (x.touches.currentX < x.touches.startX && x.translate <= x.maxTranslate() || x.touches.currentX > x.touches.startX && x.translate >= x.minTranslate())
                                return
                        } else if (x.touches.currentY < x.touches.startY && x.translate <= x.maxTranslate() || x.touches.currentY > x.touches.startY && x.translate >= x.minTranslate())
                            return;
                    if (L && document.activeElement && t.target === document.activeElement && e(t.target).is(I))
                        return S = !0,
                        void (x.allowClick = !1);
                    if (C && x.emit("onTouchMove", x, t),
                    !(t.targetTouches && t.targetTouches.length > 1)) {
                        if (x.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX,
                        x.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY,
                        void 0 === k) {
                            var i;
                            x.isHorizontal() && x.touches.currentY === x.touches.startY || !x.isHorizontal() && x.touches.currentX === x.touches.startX ? k = !1 : (i = 180 * Math.atan2(Math.abs(x.touches.currentY - x.touches.startY), Math.abs(x.touches.currentX - x.touches.startX)) / Math.PI,
                            k = x.isHorizontal() ? i > x.params.touchAngle : 90 - i > x.params.touchAngle)
                        }
                        if (k && x.emit("onTouchMoveOpposite", x, t),
                        void 0 === B && (x.touches.currentX === x.touches.startX && x.touches.currentY === x.touches.startY || (B = !0)),
                        T) {
                            if (k)
                                return void (T = !1);
                            if (B) {
                                x.allowClick = !1,
                                x.emit("onSliderMove", x, t),
                                t.preventDefault(),
                                x.params.touchMoveStopPropagation && !x.params.nested && t.stopPropagation(),
                                S || (r.loop && x.fixLoop(),
                                O = x.getWrapperTranslate(),
                                x.setWrapperTransition(0),
                                x.animating && x.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),
                                x.params.autoplay && x.autoplaying && (x.params.autoplayDisableOnInteraction ? x.stopAutoplay() : x.pauseAutoplay()),
                                A = !1,
                                !x.params.grabCursor || x.params.allowSwipeToNext !== !0 && x.params.allowSwipeToPrev !== !0 || x.setGrabCursor(!0)),
                                S = !0;
                                var a = x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY;
                                a *= x.params.touchRatio,
                                x.rtl && (a = -a),
                                x.swipeDirection = a > 0 ? "prev" : "next",
                                M = a + O;
                                var s = !0;
                                if (a > 0 && M > x.minTranslate() ? (s = !1,
                                x.params.resistance && (M = x.minTranslate() - 1 + Math.pow(-x.minTranslate() + O + a, x.params.resistanceRatio))) : 0 > a && M < x.maxTranslate() && (s = !1,
                                x.params.resistance && (M = x.maxTranslate() + 1 - Math.pow(x.maxTranslate() - O - a, x.params.resistanceRatio))),
                                s && (t.preventedByNestedSwiper = !0),
                                !x.params.allowSwipeToNext && "next" === x.swipeDirection && O > M && (M = O),
                                !x.params.allowSwipeToPrev && "prev" === x.swipeDirection && M > O && (M = O),
                                x.params.threshold > 0) {
                                    if (!(Math.abs(a) > x.params.threshold || z))
                                        return void (M = O);
                                    if (!z)
                                        return z = !0,
                                        x.touches.startX = x.touches.currentX,
                                        x.touches.startY = x.touches.currentY,
                                        M = O,
                                        void (x.touches.diff = x.isHorizontal() ? x.touches.currentX - x.touches.startX : x.touches.currentY - x.touches.startY)
                                }
                                x.params.followFinger && ((x.params.freeMode || x.params.watchSlidesProgress) && x.updateActiveIndex(),
                                x.params.freeMode && (0 === D.length && D.push({
                                    position: x.touches[x.isHorizontal() ? "startX" : "startY"],
                                    time: P
                                }),
                                D.push({
                                    position: x.touches[x.isHorizontal() ? "currentX" : "currentY"],
                                    time: (new window.Date).getTime()
                                })),
                                x.updateProgress(M),
                                x.setWrapperTranslate(M))
                            }
                        }
                    }
                }
            }
            ,
            x.onTouchEnd = function(t) {
                if (t.originalEvent && (t = t.originalEvent),
                C && x.emit("onTouchEnd", x, t),
                C = !1,
                T) {
                    x.params.grabCursor && S && T && (x.params.allowSwipeToNext === !0 || x.params.allowSwipeToPrev === !0) && x.setGrabCursor(!1);
                    var i = Date.now()
                      , a = i - P;
                    if (x.allowClick && (x.updateClickedSlide(t),
                    x.emit("onTap", x, t),
                    300 > a && i - R > 300 && (E && clearTimeout(E),
                    E = setTimeout(function() {
                        x && (x.params.paginationHide && x.paginationContainer.length > 0 && !e(t.target).hasClass(x.params.bulletClass) && x.paginationContainer.toggleClass(x.params.paginationHiddenClass),
                        x.emit("onClick", x, t))
                    }, 300)),
                    300 > a && 300 > i - R && (E && clearTimeout(E),
                    x.emit("onDoubleTap", x, t))),
                    R = Date.now(),
                    setTimeout(function() {
                        x && (x.allowClick = !0)
                    }, 0),
                    !T || !S || !x.swipeDirection || 0 === x.touches.diff || M === O)
                        return void (T = S = !1);
                    T = S = !1;
                    var r;
                    if (r = x.params.followFinger ? x.rtl ? x.translate : -x.translate : -M,
                    x.params.freeMode) {
                        if (r < -x.minTranslate())
                            return void x.slideTo(x.activeIndex);
                        if (r > -x.maxTranslate())
                            return void (x.slides.length < x.snapGrid.length ? x.slideTo(x.snapGrid.length - 1) : x.slideTo(x.slides.length - 1));
                        if (x.params.freeModeMomentum) {
                            if (D.length > 1) {
                                var s = D.pop()
                                  , n = D.pop()
                                  , o = s.position - n.position
                                  , l = s.time - n.time;
                                x.velocity = o / l,
                                x.velocity = x.velocity / 2,
                                Math.abs(x.velocity) < x.params.freeModeMinimumVelocity && (x.velocity = 0),
                                (l > 150 || (new window.Date).getTime() - s.time > 300) && (x.velocity = 0)
                            } else
                                x.velocity = 0;
                            x.velocity = x.velocity * x.params.freeModeMomentumVelocityRatio,
                            D.length = 0;
                            var u = 1e3 * x.params.freeModeMomentumRatio
                              , p = x.velocity * u
                              , c = x.translate + p;
                            x.rtl && (c = -c);
                            var h, d = !1, f = 20 * Math.abs(x.velocity) * x.params.freeModeMomentumBounceRatio;
                            if (c < x.maxTranslate())
                                x.params.freeModeMomentumBounce ? (c + x.maxTranslate() < -f && (c = x.maxTranslate() - f),
                                h = x.maxTranslate(),
                                d = !0,
                                A = !0) : c = x.maxTranslate();
                            else if (c > x.minTranslate())
                                x.params.freeModeMomentumBounce ? (c - x.minTranslate() > f && (c = x.minTranslate() + f),
                                h = x.minTranslate(),
                                d = !0,
                                A = !0) : c = x.minTranslate();
                            else if (x.params.freeModeSticky) {
                                var m, g = 0;
                                for (g = 0; g < x.snapGrid.length; g += 1)
                                    if (x.snapGrid[g] > -c) {
                                        m = g;
                                        break
                                    }
                                c = Math.abs(x.snapGrid[m] - c) < Math.abs(x.snapGrid[m - 1] - c) || "next" === x.swipeDirection ? x.snapGrid[m] : x.snapGrid[m - 1],
                                x.rtl || (c = -c)
                            }
                            if (0 !== x.velocity)
                                u = x.rtl ? Math.abs((-c - x.translate) / x.velocity) : Math.abs((c - x.translate) / x.velocity);
                            else if (x.params.freeModeSticky)
                                return void x.slideReset();
                            x.params.freeModeMomentumBounce && d ? (x.updateProgress(h),
                            x.setWrapperTransition(u),
                            x.setWrapperTranslate(c),
                            x.onTransitionStart(),
                            x.animating = !0,
                            x.wrapper.transitionEnd(function() {
                                x && A && (x.emit("onMomentumBounce", x),
                                x.setWrapperTransition(x.params.speed),
                                x.setWrapperTranslate(h),
                                x.wrapper.transitionEnd(function() {
                                    x && x.onTransitionEnd()
                                }))
                            })) : x.velocity ? (x.updateProgress(c),
                            x.setWrapperTransition(u),
                            x.setWrapperTranslate(c),
                            x.onTransitionStart(),
                            x.animating || (x.animating = !0,
                            x.wrapper.transitionEnd(function() {
                                x && x.onTransitionEnd()
                            }))) : x.updateProgress(c),
                            x.updateActiveIndex()
                        }
                        return void ((!x.params.freeModeMomentum || a >= x.params.longSwipesMs) && (x.updateProgress(),
                        x.updateActiveIndex()))
                    }
                    var v, y = 0, _ = x.slidesSizesGrid[0];
                    for (v = 0; v < x.slidesGrid.length; v += x.params.slidesPerGroup)
                        void 0 !== x.slidesGrid[v + x.params.slidesPerGroup] ? r >= x.slidesGrid[v] && r < x.slidesGrid[v + x.params.slidesPerGroup] && (y = v,
                        _ = x.slidesGrid[v + x.params.slidesPerGroup] - x.slidesGrid[v]) : r >= x.slidesGrid[v] && (y = v,
                        _ = x.slidesGrid[x.slidesGrid.length - 1] - x.slidesGrid[x.slidesGrid.length - 2]);
                    var w = (r - x.slidesGrid[y]) / _;
                    if (a > x.params.longSwipesMs) {
                        if (!x.params.longSwipes)
                            return void x.slideTo(x.activeIndex);
                        "next" === x.swipeDirection && (w >= x.params.longSwipesRatio ? x.slideTo(y + x.params.slidesPerGroup) : x.slideTo(y)),
                        "prev" === x.swipeDirection && (w > 1 - x.params.longSwipesRatio ? x.slideTo(y + x.params.slidesPerGroup) : x.slideTo(y))
                    } else {
                        if (!x.params.shortSwipes)
                            return void x.slideTo(x.activeIndex);
                        "next" === x.swipeDirection && x.slideTo(y + x.params.slidesPerGroup),
                        "prev" === x.swipeDirection && x.slideTo(y)
                    }
                }
            }
            ,
            x._slideTo = function(e, t) {
                return x.slideTo(e, t, !0, !0)
            }
            ,
            x.slideTo = function(e, t, i, a) {
                void 0 === i && (i = !0),
                void 0 === e && (e = 0),
                0 > e && (e = 0),
                x.snapIndex = Math.floor(e / x.params.slidesPerGroup),
                x.snapIndex >= x.snapGrid.length && (x.snapIndex = x.snapGrid.length - 1);
                var r = -x.snapGrid[x.snapIndex];
                if (x.params.autoplay && x.autoplaying && (a || !x.params.autoplayDisableOnInteraction ? x.pauseAutoplay(t) : x.stopAutoplay()),
                x.updateProgress(r),
                x.params.normalizeSlideIndex)
                    for (var s = 0; s < x.slidesGrid.length; s++)
                        -Math.floor(100 * r) >= Math.floor(100 * x.slidesGrid[s]) && (e = s);
                return !(!x.params.allowSwipeToNext && r < x.translate && r < x.minTranslate() || !x.params.allowSwipeToPrev && r > x.translate && r > x.maxTranslate() && (x.activeIndex || 0) !== e || (void 0 === t && (t = x.params.speed),
                x.previousIndex = x.activeIndex || 0,
                x.activeIndex = e,
                x.updateRealIndex(),
                x.rtl && -r === x.translate || !x.rtl && r === x.translate ? (x.params.autoHeight && x.updateAutoHeight(),
                x.updateClasses(),
                "slide" !== x.params.effect && x.setWrapperTranslate(r),
                1) : (x.updateClasses(),
                x.onTransitionStart(i),
                0 === t || x.browser.lteIE9 ? (x.setWrapperTranslate(r),
                x.setWrapperTransition(0),
                x.onTransitionEnd(i)) : (x.setWrapperTranslate(r),
                x.setWrapperTransition(t),
                x.animating || (x.animating = !0,
                x.wrapper.transitionEnd(function() {
                    x && x.onTransitionEnd(i)
                }))),
                0)))
            }
            ,
            x.onTransitionStart = function(e) {
                void 0 === e && (e = !0),
                x.params.autoHeight && x.updateAutoHeight(),
                x.lazy && x.lazy.onTransitionStart(),
                e && (x.emit("onTransitionStart", x),
                x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeStart", x),
                x.activeIndex > x.previousIndex ? x.emit("onSlideNextStart", x) : x.emit("onSlidePrevStart", x)))
            }
            ,
            x.onTransitionEnd = function(e) {
                x.animating = !1,
                x.setWrapperTransition(0),
                void 0 === e && (e = !0),
                x.lazy && x.lazy.onTransitionEnd(),
                e && (x.emit("onTransitionEnd", x),
                x.activeIndex !== x.previousIndex && (x.emit("onSlideChangeEnd", x),
                x.activeIndex > x.previousIndex ? x.emit("onSlideNextEnd", x) : x.emit("onSlidePrevEnd", x))),
                x.params.history && x.history && x.history.setHistory(x.params.history, x.activeIndex),
                x.params.hashnav && x.hashnav && x.hashnav.setHash()
            }
            ,
            x.slideNext = function(e, t, i) {
                return x.params.loop ? x.animating ? !1 : (x.fixLoop(),
                x.container[0].clientLeft,
                x.slideTo(x.activeIndex + x.params.slidesPerGroup, t, e, i)) : x.slideTo(x.activeIndex + x.params.slidesPerGroup, t, e, i)
            }
            ,
            x._slideNext = function(e) {
                return x.slideNext(!0, e, !0)
            }
            ,
            x.slidePrev = function(e, t, i) {
                return x.params.loop ? x.animating ? !1 : (x.fixLoop(),
                x.container[0].clientLeft,
                x.slideTo(x.activeIndex - 1, t, e, i)) : x.slideTo(x.activeIndex - 1, t, e, i)
            }
            ,
            x._slidePrev = function(e) {
                return x.slidePrev(!0, e, !0)
            }
            ,
            x.slideReset = function(e, t, i) {
                return x.slideTo(x.activeIndex, t, e)
            }
            ,
            x.disableTouchControl = function() {
                return x.params.onlyExternal = !0,
                !0
            }
            ,
            x.enableTouchControl = function() {
                return x.params.onlyExternal = !1,
                !0
            }
            ,
            x.setWrapperTransition = function(e, t) {
                x.wrapper.transition(e),
                "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTransition(e),
                x.params.parallax && x.parallax && x.parallax.setTransition(e),
                x.params.scrollbar && x.scrollbar && x.scrollbar.setTransition(e),
                x.params.control && x.controller && x.controller.setTransition(e, t),
                x.emit("onSetTransition", x, e)
            }
            ,
            x.setWrapperTranslate = function(e, t, i) {
                var a = 0
                  , r = 0;
                x.isHorizontal() ? a = x.rtl ? -e : e : r = e,
                x.params.roundLengths && (a = s(a),
                r = s(r)),
                x.params.virtualTranslate || (x.support.transforms3d ? x.wrapper.transform("translate3d(" + a + "px, " + r + "px, 0px)") : x.wrapper.transform("translate(" + a + "px, " + r + "px)")),
                x.translate = x.isHorizontal() ? a : r;
                var n, o = x.maxTranslate() - x.minTranslate();
                n = 0 === o ? 0 : (e - x.minTranslate()) / o,
                n !== x.progress && x.updateProgress(e),
                t && x.updateActiveIndex(),
                "slide" !== x.params.effect && x.effects[x.params.effect] && x.effects[x.params.effect].setTranslate(x.translate),
                x.params.parallax && x.parallax && x.parallax.setTranslate(x.translate),
                x.params.scrollbar && x.scrollbar && x.scrollbar.setTranslate(x.translate),
                x.params.control && x.controller && x.controller.setTranslate(x.translate, i),
                x.emit("onSetTranslate", x, x.translate)
            }
            ,
            x.getTranslate = function(e, t) {
                var i, a, r, s;
                return void 0 === t && (t = "x"),
                x.params.virtualTranslate ? x.rtl ? -x.translate : x.translate : (r = window.getComputedStyle(e, null),
                window.WebKitCSSMatrix ? (a = r.transform || r.webkitTransform,
                a.split(",").length > 6 && (a = a.split(", ").map(function(e) {
                    return e.replace(",", ".")
                }).join(", ")),
                s = new window.WebKitCSSMatrix("none" === a ? "" : a)) : (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
                i = s.toString().split(",")),
                "x" === t && (a = window.WebKitCSSMatrix ? s.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
                "y" === t && (a = window.WebKitCSSMatrix ? s.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
                x.rtl && a && (a = -a),
                a || 0)
            }
            ,
            x.getWrapperTranslate = function(e) {
                return void 0 === e && (e = x.isHorizontal() ? "x" : "y"),
                x.getTranslate(x.wrapper[0], e)
            }
            ,
            x.observers = [],
            x.initObservers = function() {
                if (x.params.observeParents)
                    for (var e = x.container.parents(), t = 0; t < e.length; t++)
                        l(e[t]);
                l(x.container[0], {
                    childList: !1
                }),
                l(x.wrapper[0], {
                    attributes: !1
                })
            }
            ,
            x.disconnectObservers = function() {
                for (var e = 0; e < x.observers.length; e++)
                    x.observers[e].disconnect();
                x.observers = []
            }
            ,
            x.createLoop = function() {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove();
                var t = x.wrapper.children("." + x.params.slideClass);
                "auto" !== x.params.slidesPerView || x.params.loopedSlides || (x.params.loopedSlides = t.length),
                x.loopedSlides = parseInt(x.params.loopedSlides || x.params.slidesPerView, 10),
                x.loopedSlides = x.loopedSlides + x.params.loopAdditionalSlides,
                x.loopedSlides > t.length && (x.loopedSlides = t.length);
                var i, a = [], r = [];
                for (t.each(function(i, s) {
                    var n = e(this);
                    i < x.loopedSlides && r.push(s),
                    i < t.length && i >= t.length - x.loopedSlides && a.push(s),
                    n.attr("data-swiper-slide-index", i)
                }),
                i = 0; i < r.length; i++)
                    x.wrapper.append(e(r[i].cloneNode(!0)).addClass(x.params.slideDuplicateClass));
                for (i = a.length - 1; i >= 0; i--)
                    x.wrapper.prepend(e(a[i].cloneNode(!0)).addClass(x.params.slideDuplicateClass))
            }
            ,
            x.destroyLoop = function() {
                x.wrapper.children("." + x.params.slideClass + "." + x.params.slideDuplicateClass).remove(),
                x.slides.removeAttr("data-swiper-slide-index")
            }
            ,
            x.reLoop = function(e) {
                var t = x.activeIndex - x.loopedSlides;
                x.destroyLoop(),
                x.createLoop(),
                x.updateSlidesSize(),
                e && x.slideTo(t + x.loopedSlides, 0, !1)
            }
            ,
            x.fixLoop = function() {
                var e;
                x.activeIndex < x.loopedSlides ? (e = x.slides.length - 3 * x.loopedSlides + x.activeIndex,
                e += x.loopedSlides,
                x.slideTo(e, 0, !1, !0)) : ("auto" === x.params.slidesPerView && x.activeIndex >= 2 * x.loopedSlides || x.activeIndex > x.slides.length - 2 * x.params.slidesPerView) && (e = -x.slides.length + x.activeIndex + x.loopedSlides,
                e += x.loopedSlides,
                x.slideTo(e, 0, !1, !0))
            }
            ,
            x.appendSlide = function(e) {
                if (x.params.loop && x.destroyLoop(),
                "object" == typeof e && e.length)
                    for (var t = 0; t < e.length; t++)
                        e[t] && x.wrapper.append(e[t]);
                else
                    x.wrapper.append(e);
                x.params.loop && x.createLoop(),
                x.params.observer && x.support.observer || x.update(!0)
            }
            ,
            x.prependSlide = function(e) {
                x.params.loop && x.destroyLoop();
                var t = x.activeIndex + 1;
                if ("object" == typeof e && e.length) {
                    for (var i = 0; i < e.length; i++)
                        e[i] && x.wrapper.prepend(e[i]);
                    t = x.activeIndex + e.length
                } else
                    x.wrapper.prepend(e);
                x.params.loop && x.createLoop(),
                x.params.observer && x.support.observer || x.update(!0),
                x.slideTo(t, 0, !1)
            }
            ,
            x.removeSlide = function(e) {
                x.params.loop && (x.destroyLoop(),
                x.slides = x.wrapper.children("." + x.params.slideClass));
                var t, i = x.activeIndex;
                if ("object" == typeof e && e.length) {
                    for (var a = 0; a < e.length; a++)
                        t = e[a],
                        x.slides[t] && x.slides.eq(t).remove(),
                        i > t && i--;
                    i = Math.max(i, 0)
                } else
                    t = e,
                    x.slides[t] && x.slides.eq(t).remove(),
                    i > t && i--,
                    i = Math.max(i, 0);
                x.params.loop && x.createLoop(),
                x.params.observer && x.support.observer || x.update(!0),
                x.params.loop ? x.slideTo(i + x.loopedSlides, 0, !1) : x.slideTo(i, 0, !1)
            }
            ,
            x.removeAllSlides = function() {
                for (var e = [], t = 0; t < x.slides.length; t++)
                    e.push(t);
                x.removeSlide(e)
            }
            ,
            x.effects = {
                fade: {
                    setTranslate: function() {
                        for (var e = 0; e < x.slides.length; e++) {
                            var t = x.slides.eq(e)
                              , i = t[0].swiperSlideOffset
                              , a = -i;
                            x.params.virtualTranslate || (a -= x.translate);
                            var r = 0;
                            x.isHorizontal() || (r = a,
                            a = 0);
                            var s = x.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                            t.css({
                                opacity: s
                            }).transform("translate3d(" + a + "px, " + r + "px, 0px)")
                        }
                    },
                    setTransition: function(e) {
                        if (x.slides.transition(e),
                        x.params.virtualTranslate && 0 !== e) {
                            var t = !1;
                            x.slides.transitionEnd(function() {
                                if (!t && x) {
                                    t = !0,
                                    x.animating = !1;
                                    for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < e.length; i++)
                                        x.wrapper.trigger(e[i])
                                }
                            })
                        }
                    }
                },
                flip: {
                    setTranslate: function() {
                        for (var t = 0; t < x.slides.length; t++) {
                            var i = x.slides.eq(t)
                              , a = i[0].progress;
                            x.params.flip.limitRotation && (a = Math.max(Math.min(i[0].progress, 1), -1));
                            var r = i[0].swiperSlideOffset
                              , s = -180 * a
                              , n = s
                              , o = 0
                              , l = -r
                              , u = 0;
                            if (x.isHorizontal() ? x.rtl && (n = -n) : (u = l,
                            l = 0,
                            o = -n,
                            n = 0),
                            i[0].style.zIndex = -Math.abs(Math.round(a)) + x.slides.length,
                            x.params.flip.slideShadows) {
                                var p = x.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top")
                                  , c = x.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'),
                                i.append(p)),
                                0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'),
                                i.append(c)),
                                p.length && (p[0].style.opacity = Math.max(-a, 0)),
                                c.length && (c[0].style.opacity = Math.max(a, 0))
                            }
                            i.transform("translate3d(" + l + "px, " + u + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                        }
                    },
                    setTransition: function(t) {
                        if (x.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t),
                        x.params.virtualTranslate && 0 !== t) {
                            var i = !1;
                            x.slides.eq(x.activeIndex).transitionEnd(function() {
                                if (!i && x && e(this).hasClass(x.params.slideActiveClass)) {
                                    i = !0,
                                    x.animating = !1;
                                    for (var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], a = 0; a < t.length; a++)
                                        x.wrapper.trigger(t[a])
                                }
                            })
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var t, i = 0;
                        x.params.cube.shadow && (x.isHorizontal() ? (t = x.wrapper.find(".swiper-cube-shadow"),
                        0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'),
                        x.wrapper.append(t)),
                        t.css({
                            height: x.width + "px"
                        })) : (t = x.container.find(".swiper-cube-shadow"),
                        0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'),
                        x.container.append(t))));
                        for (var a = 0; a < x.slides.length; a++) {
                            var r = x.slides.eq(a)
                              , s = 90 * a
                              , n = Math.floor(s / 360);
                            x.rtl && (s = -s,
                            n = Math.floor(-s / 360));
                            var o = Math.max(Math.min(r[0].progress, 1), -1)
                              , l = 0
                              , u = 0
                              , p = 0;
                            a % 4 == 0 ? (l = 4 * -n * x.size,
                            p = 0) : (a - 1) % 4 == 0 ? (l = 0,
                            p = 4 * -n * x.size) : (a - 2) % 4 == 0 ? (l = x.size + 4 * n * x.size,
                            p = x.size) : (a - 3) % 4 == 0 && (l = -x.size,
                            p = 3 * x.size + 4 * x.size * n),
                            x.rtl && (l = -l),
                            x.isHorizontal() || (u = l,
                            l = 0);
                            var c = "rotateX(" + (x.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (x.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + u + "px, " + p + "px)";
                            if (1 >= o && o > -1 && (i = 90 * a + 90 * o,
                            x.rtl && (i = 90 * -a - 90 * o)),
                            r.transform(c),
                            x.params.cube.slideShadows) {
                                var h = x.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top")
                                  , d = x.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                0 === h.length && (h = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'),
                                r.append(h)),
                                0 === d.length && (d = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'),
                                r.append(d)),
                                h.length && (h[0].style.opacity = Math.max(-o, 0)),
                                d.length && (d[0].style.opacity = Math.max(o, 0))
                            }
                        }
                        if (x.wrapper.css({
                            "-webkit-transform-origin": "50% 50% -" + x.size / 2 + "px",
                            "-moz-transform-origin": "50% 50% -" + x.size / 2 + "px",
                            "-ms-transform-origin": "50% 50% -" + x.size / 2 + "px",
                            "transform-origin": "50% 50% -" + x.size / 2 + "px"
                        }),
                        x.params.cube.shadow)
                            if (x.isHorizontal())
                                t.transform("translate3d(0px, " + (x.width / 2 + x.params.cube.shadowOffset) + "px, " + -x.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + x.params.cube.shadowScale + ")");
                            else {
                                var f = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90)
                                  , m = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2)
                                  , g = x.params.cube.shadowScale
                                  , v = x.params.cube.shadowScale / m
                                  , y = x.params.cube.shadowOffset;
                                t.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (x.height / 2 + y) + "px, " + -x.height / 2 / v + "px) rotateX(-90deg)")
                            }
                        var _ = x.isSafari || x.isUiWebView ? -x.size / 2 : 0;
                        x.wrapper.transform("translate3d(0px,0," + _ + "px) rotateX(" + (x.isHorizontal() ? 0 : i) + "deg) rotateY(" + (x.isHorizontal() ? -i : 0) + "deg)")
                    },
                    setTransition: function(e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                        x.params.cube.shadow && !x.isHorizontal() && x.container.find(".swiper-cube-shadow").transition(e)
                    }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var t = x.translate, i = x.isHorizontal() ? -t + x.width / 2 : -t + x.height / 2, a = x.isHorizontal() ? x.params.coverflow.rotate : -x.params.coverflow.rotate, r = x.params.coverflow.depth, s = 0, n = x.slides.length; n > s; s++) {
                            var o = x.slides.eq(s)
                              , l = x.slidesSizesGrid[s]
                              , u = o[0].swiperSlideOffset
                              , p = (i - u - l / 2) / l * x.params.coverflow.modifier
                              , c = x.isHorizontal() ? a * p : 0
                              , h = x.isHorizontal() ? 0 : a * p
                              , d = -r * Math.abs(p)
                              , f = x.isHorizontal() ? 0 : x.params.coverflow.stretch * p
                              , m = x.isHorizontal() ? x.params.coverflow.stretch * p : 0;
                            Math.abs(m) < .001 && (m = 0),
                            Math.abs(f) < .001 && (f = 0),
                            Math.abs(d) < .001 && (d = 0),
                            Math.abs(c) < .001 && (c = 0),
                            Math.abs(h) < .001 && (h = 0);
                            var g = "translate3d(" + m + "px," + f + "px," + d + "px)  rotateX(" + h + "deg) rotateY(" + c + "deg)";
                            if (o.transform(g),
                            o[0].style.zIndex = 1 - Math.abs(Math.round(p)),
                            x.params.coverflow.slideShadows) {
                                var v = x.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top")
                                  , y = x.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                                0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "left" : "top") + '"></div>'),
                                o.append(v)),
                                0 === y.length && (y = e('<div class="swiper-slide-shadow-' + (x.isHorizontal() ? "right" : "bottom") + '"></div>'),
                                o.append(y)),
                                v.length && (v[0].style.opacity = p > 0 ? p : 0),
                                y.length && (y[0].style.opacity = -p > 0 ? -p : 0)
                            }
                        }
                        x.browser.ie && (x.wrapper[0].style.perspectiveOrigin = i + "px 50%")
                    },
                    setTransition: function(e) {
                        x.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                    }
                }
            },
            x.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(t, i) {
                    if (void 0 !== t && (void 0 === i && (i = !0),
                    0 !== x.slides.length)) {
                        var a = x.slides.eq(t)
                          , r = a.find("." + x.params.lazyLoadingClass + ":not(." + x.params.lazyStatusLoadedClass + "):not(." + x.params.lazyStatusLoadingClass + ")");
                        !a.hasClass(x.params.lazyLoadingClass) || a.hasClass(x.params.lazyStatusLoadedClass) || a.hasClass(x.params.lazyStatusLoadingClass) || (r = r.add(a[0])),
                        0 !== r.length && r.each(function() {
                            var t = e(this);
                            t.addClass(x.params.lazyStatusLoadingClass);
                            var r = t.attr("data-background")
                              , s = t.attr("data-src")
                              , n = t.attr("data-srcset")
                              , o = t.attr("data-sizes");
                            x.loadImage(t[0], s || r, n, o, !1, function() {
                                if (void 0 !== x && null !== x && x) {
                                    if (r ? (t.css("background-image", 'url("' + r + '")'),
                                    t.removeAttr("data-background")) : (n && (t.attr("srcset", n),
                                    t.removeAttr("data-srcset")),
                                    o && (t.attr("sizes", o),
                                    t.removeAttr("data-sizes")),
                                    s && (t.attr("src", s),
                                    t.removeAttr("data-src"))),
                                    t.addClass(x.params.lazyStatusLoadedClass).removeClass(x.params.lazyStatusLoadingClass),
                                    a.find("." + x.params.lazyPreloaderClass + ", ." + x.params.preloaderClass).remove(),
                                    x.params.loop && i) {
                                        var e = a.attr("data-swiper-slide-index");
                                        if (a.hasClass(x.params.slideDuplicateClass)) {
                                            var l = x.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + x.params.slideDuplicateClass + ")");
                                            x.lazy.loadImageInSlide(l.index(), !1)
                                        } else {
                                            var u = x.wrapper.children("." + x.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            x.lazy.loadImageInSlide(u.index(), !1)
                                        }
                                    }
                                    x.emit("onLazyImageReady", x, a[0], t[0])
                                }
                            }),
                            x.emit("onLazyImageLoad", x, a[0], t[0])
                        })
                    }
                },
                load: function() {
                    var t, i = x.params.slidesPerView;
                    if ("auto" === i && (i = 0),
                    x.lazy.initialImageLoaded || (x.lazy.initialImageLoaded = !0),
                    x.params.watchSlidesVisibility)
                        x.wrapper.children("." + x.params.slideVisibleClass).each(function() {
                            x.lazy.loadImageInSlide(e(this).index())
                        });
                    else if (i > 1)
                        for (t = x.activeIndex; t < x.activeIndex + i; t++)
                            x.slides[t] && x.lazy.loadImageInSlide(t);
                    else
                        x.lazy.loadImageInSlide(x.activeIndex);
                    if (x.params.lazyLoadingInPrevNext)
                        if (i > 1 || x.params.lazyLoadingInPrevNextAmount && x.params.lazyLoadingInPrevNextAmount > 1) {
                            var a = x.params.lazyLoadingInPrevNextAmount
                              , r = i
                              , s = Math.min(x.activeIndex + r + Math.max(a, r), x.slides.length)
                              , n = Math.max(x.activeIndex - Math.max(r, a), 0);
                            for (t = x.activeIndex + i; s > t; t++)
                                x.slides[t] && x.lazy.loadImageInSlide(t);
                            for (t = n; t < x.activeIndex; t++)
                                x.slides[t] && x.lazy.loadImageInSlide(t)
                        } else {
                            var o = x.wrapper.children("." + x.params.slideNextClass);
                            o.length > 0 && x.lazy.loadImageInSlide(o.index());
                            var l = x.wrapper.children("." + x.params.slidePrevClass);
                            l.length > 0 && x.lazy.loadImageInSlide(l.index())
                        }
                },
                onTransitionStart: function() {
                    x.params.lazyLoading && (x.params.lazyLoadingOnTransitionStart || !x.params.lazyLoadingOnTransitionStart && !x.lazy.initialImageLoaded) && x.lazy.load()
                },
                onTransitionEnd: function() {
                    x.params.lazyLoading && !x.params.lazyLoadingOnTransitionStart && x.lazy.load()
                }
            },
            x.scrollbar = {
                isTouched: !1,
                setDragPosition: function(e) {
                    var t = x.scrollbar
                      , i = x.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY
                      , a = i - t.track.offset()[x.isHorizontal() ? "left" : "top"] - t.dragSize / 2
                      , r = -x.minTranslate() * t.moveDivider
                      , s = -x.maxTranslate() * t.moveDivider;
                    r > a ? a = r : a > s && (a = s),
                    a = -a / t.moveDivider,
                    x.updateProgress(a),
                    x.setWrapperTranslate(a, !0)
                },
                dragStart: function(e) {
                    var t = x.scrollbar;
                    t.isTouched = !0,
                    e.preventDefault(),
                    e.stopPropagation(),
                    t.setDragPosition(e),
                    clearTimeout(t.dragTimeout),
                    t.track.transition(0),
                    x.params.scrollbarHide && t.track.css("opacity", 1),
                    x.wrapper.transition(100),
                    t.drag.transition(100),
                    x.emit("onScrollbarDragStart", x)
                },
                dragMove: function(e) {
                    var t = x.scrollbar;
                    t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                    t.setDragPosition(e),
                    x.wrapper.transition(0),
                    t.track.transition(0),
                    t.drag.transition(0),
                    x.emit("onScrollbarDragMove", x))
                },
                dragEnd: function(e) {
                    var t = x.scrollbar;
                    t.isTouched && (t.isTouched = !1,
                    x.params.scrollbarHide && (clearTimeout(t.dragTimeout),
                    t.dragTimeout = setTimeout(function() {
                        t.track.css("opacity", 0),
                        t.track.transition(400)
                    }, 1e3)),
                    x.emit("onScrollbarDragEnd", x),
                    x.params.scrollbarSnapOnRelease && x.slideReset())
                },
                draggableEvents: function() {
                    return x.params.simulateTouch !== !1 || x.support.touch ? x.touchEvents : x.touchEventsDesktop
                }(),
                enableDraggable: function() {
                    var t = x.scrollbar
                      , i = x.support.touch ? t.track : document;
                    e(t.track).on(t.draggableEvents.start, t.dragStart),
                    e(i).on(t.draggableEvents.move, t.dragMove),
                    e(i).on(t.draggableEvents.end, t.dragEnd)
                },
                disableDraggable: function() {
                    var t = x.scrollbar
                      , i = x.support.touch ? t.track : document;
                    e(t.track).off(t.draggableEvents.start, t.dragStart),
                    e(i).off(t.draggableEvents.move, t.dragMove),
                    e(i).off(t.draggableEvents.end, t.dragEnd)
                },
                set: function() {
                    if (x.params.scrollbar) {
                        var t = x.scrollbar;
                        t.track = e(x.params.scrollbar),
                        x.params.uniqueNavElements && "string" == typeof x.params.scrollbar && t.track.length > 1 && 1 === x.container.find(x.params.scrollbar).length && (t.track = x.container.find(x.params.scrollbar)),
                        t.drag = t.track.find(".swiper-scrollbar-drag"),
                        0 === t.drag.length && (t.drag = e('<div class="swiper-scrollbar-drag"></div>'),
                        t.track.append(t.drag)),
                        t.drag[0].style.width = "",
                        t.drag[0].style.height = "",
                        t.trackSize = x.isHorizontal() ? t.track[0].offsetWidth : t.track[0].offsetHeight,
                        t.divider = x.size / x.virtualSize,
                        t.moveDivider = t.divider * (t.trackSize / x.size),
                        t.dragSize = t.trackSize * t.divider,
                        x.isHorizontal() ? t.drag[0].style.width = t.dragSize + "px" : t.drag[0].style.height = t.dragSize + "px",
                        t.divider >= 1 ? t.track[0].style.display = "none" : t.track[0].style.display = "",
                        x.params.scrollbarHide && (t.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function() {
                    if (x.params.scrollbar) {
                        var e, t = x.scrollbar, i = (x.translate,
                        t.dragSize);
                        e = (t.trackSize - t.dragSize) * x.progress,
                        x.rtl && x.isHorizontal() ? (e = -e,
                        e > 0 ? (i = t.dragSize - e,
                        e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e)) : 0 > e ? (i = t.dragSize + e,
                        e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e),
                        x.isHorizontal() ? (x.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"),
                        t.drag[0].style.width = i + "px") : (x.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"),
                        t.drag[0].style.height = i + "px"),
                        x.params.scrollbarHide && (clearTimeout(t.timeout),
                        t.track[0].style.opacity = 1,
                        t.timeout = setTimeout(function() {
                            t.track[0].style.opacity = 0,
                            t.track.transition(400)
                        }, 1e3))
                    }
                },
                setTransition: function(e) {
                    x.params.scrollbar && x.scrollbar.drag.transition(e)
                }
            },
            x.controller = {
                LinearSpline: function(e, t) {
                    var i = function() {
                        var e, t, i;
                        return function(a, r) {
                            for (t = -1,
                            e = a.length; e - t > 1; )
                                a[i = e + t >> 1] <= r ? t = i : e = i;
                            return e
                        }
                    }();
                    this.x = e,
                    this.y = t,
                    this.lastIndex = e.length - 1;
                    var a, r;
                    this.x.length,
                    this.interpolate = function(e) {
                        return e ? (r = i(this.x, e),
                        a = r - 1,
                        (e - this.x[a]) * (this.y[r] - this.y[a]) / (this.x[r] - this.x[a]) + this.y[a]) : 0
                    }
                },
                getInterpolateFunction: function(e) {
                    x.controller.spline || (x.controller.spline = x.params.loop ? new x.controller.LinearSpline(x.slidesGrid,e.slidesGrid) : new x.controller.LinearSpline(x.snapGrid,e.snapGrid))
                },
                setTranslate: function(e, i) {
                    function a(t) {
                        e = t.rtl && "horizontal" === t.params.direction ? -x.translate : x.translate,
                        "slide" === x.params.controlBy && (x.controller.getInterpolateFunction(t),
                        s = -x.controller.spline.interpolate(-e)),
                        s && "container" !== x.params.controlBy || (r = (t.maxTranslate() - t.minTranslate()) / (x.maxTranslate() - x.minTranslate()),
                        s = (e - x.minTranslate()) * r + t.minTranslate()),
                        x.params.controlInverse && (s = t.maxTranslate() - s),
                        t.updateProgress(s),
                        t.setWrapperTranslate(s, !1, x),
                        t.updateActiveIndex()
                    }
                    var r, s, n = x.params.control;
                    if (Array.isArray(n))
                        for (var o = 0; o < n.length; o++)
                            n[o] !== i && n[o]instanceof t && a(n[o]);
                    else
                        n instanceof t && i !== n && a(n)
                },
                setTransition: function(e, i) {
                    function a(t) {
                        t.setWrapperTransition(e, x),
                        0 !== e && (t.onTransitionStart(),
                        t.wrapper.transitionEnd(function() {
                            s && (t.params.loop && "slide" === x.params.controlBy && t.fixLoop(),
                            t.onTransitionEnd())
                        }))
                    }
                    var r, s = x.params.control;
                    if (Array.isArray(s))
                        for (r = 0; r < s.length; r++)
                            s[r] !== i && s[r]instanceof t && a(s[r]);
                    else
                        s instanceof t && i !== s && a(s)
                }
            },
            x.hashnav = {
                onHashCange: function(e, t) {
                    var i = document.location.hash.replace("#", "");
                    i !== x.slides.eq(x.activeIndex).attr("data-hash") && x.slideTo(x.wrapper.children("." + x.params.slideClass + '[data-hash="' + i + '"]').index())
                },
                attachEvents: function(t) {
                    var i = t ? "off" : "on";
                    e(window)[i]("hashchange", x.hashnav.onHashCange)
                },
                setHash: function() {
                    if (x.hashnav.initialized && x.params.hashnav)
                        if (x.params.replaceState && window.history && window.history.replaceState)
                            window.history.replaceState(null, null, "#" + x.slides.eq(x.activeIndex).attr("data-hash") || "");
                        else {
                            var e = x.slides.eq(x.activeIndex)
                              , t = e.attr("data-hash") || e.attr("data-history");
                            document.location.hash = t || ""
                        }
                },
                init: function() {
                    if (x.params.hashnav && !x.params.history) {
                        x.hashnav.initialized = !0;
                        var e = document.location.hash.replace("#", "");
                        if (e)
                            for (var t = 0, i = x.slides.length; i > t; t++) {
                                var a = x.slides.eq(t)
                                  , r = a.attr("data-hash") || a.attr("data-history");
                                if (r === e && !a.hasClass(x.params.slideDuplicateClass)) {
                                    var s = a.index();
                                    x.slideTo(s, 0, x.params.runCallbacksOnInit, !0)
                                }
                            }
                        x.params.hashnavWatchState && x.hashnav.attachEvents()
                    }
                },
                destroy: function() {
                    x.params.hashnavWatchState && x.hashnav.attachEvents(!0)
                }
            },
            x.history = {
                init: function() {
                    if (x.params.history) {
                        if (!window.history || !window.history.pushState)
                            return x.params.history = !1,
                            void (x.params.hashnav = !0);
                        x.history.initialized = !0,
                        this.paths = this.getPathValues(),
                        (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, x.params.runCallbacksOnInit),
                        x.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                    }
                },
                setHistoryPopState: function() {
                    x.history.paths = x.history.getPathValues(),
                    x.history.scrollToSlide(x.params.speed, x.history.paths.value, !1)
                },
                getPathValues: function() {
                    var e = window.location.pathname.slice(1).split("/")
                      , t = e.length;
                    return {
                        key: e[t - 2],
                        value: e[t - 1]
                    }
                },
                setHistory: function(e, t) {
                    if (x.history.initialized && x.params.history) {
                        var i = x.slides.eq(t)
                          , a = this.slugify(i.attr("data-history"));
                        window.location.pathname.includes(e) || (a = e + "/" + a),
                        x.params.replaceState ? window.history.replaceState(null, null, a) : window.history.pushState(null, null, a)
                    }
                },
                slugify: function(e) {
                    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                },
                scrollToSlide: function(e, t, i) {
                    if (t)
                        for (var a = 0, r = x.slides.length; r > a; a++) {
                            var s = x.slides.eq(a)
                              , n = this.slugify(s.attr("data-history"));
                            if (n === t && !s.hasClass(x.params.slideDuplicateClass)) {
                                var o = s.index();
                                x.slideTo(o, e, i)
                            }
                        }
                    else
                        x.slideTo(0, e, i)
                }
            },
            x.disableKeyboardControl = function() {
                x.params.keyboardControl = !1,
                e(document).off("keydown", u)
            }
            ,
            x.enableKeyboardControl = function() {
                x.params.keyboardControl = !0,
                e(document).on("keydown", u)
            }
            ,
            x.mousewheel = {
                event: !1,
                lastScrollTime: (new window.Date).getTime()
            },
            x.params.mousewheelControl && (x.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var e = "onwheel"in document;
                if (!e) {
                    var t = document.createElement("div");
                    t.setAttribute("onwheel", "return;"),
                    e = "function" == typeof t.onwheel
                }
                return !e && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (e = document.implementation.hasFeature("Events.wheel", "3.0")),
                e
            }() ? "wheel" : "mousewheel"),
            x.disableMousewheelControl = function() {
                if (!x.mousewheel.event)
                    return !1;
                var t = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (t = e(x.params.mousewheelEventsTarged)),
                t.off(x.mousewheel.event, c),
                x.params.mousewheelControl = !1,
                !0
            }
            ,
            x.enableMousewheelControl = function() {
                if (!x.mousewheel.event)
                    return !1;
                var t = x.container;
                return "container" !== x.params.mousewheelEventsTarged && (t = e(x.params.mousewheelEventsTarged)),
                t.on(x.mousewheel.event, c),
                x.params.mousewheelControl = !0,
                !0
            }
            ,
            x.parallax = {
                setTranslate: function() {
                    x.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        h(this, x.progress)
                    }),
                    x.slides.each(function() {
                        var t = e(this);
                        t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            h(this, Math.min(Math.max(t[0].progress, -1), 1))
                        })
                    })
                },
                setTransition: function(t) {
                    void 0 === t && (t = x.params.speed),
                    x.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var i = e(this)
                          , a = parseInt(i.attr("data-swiper-parallax-duration"), 10) || t;
                        0 === t && (a = 0),
                        i.transition(a)
                    })
                }
            },
            x.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    slide: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    image: void 0,
                    imageWrap: void 0,
                    zoomMax: x.params.zoomMax
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                },
                getDistanceBetweenTouches: function(e) {
                    if (e.targetTouches.length < 2)
                        return 1;
                    var t = e.targetTouches[0].pageX
                      , i = e.targetTouches[0].pageY
                      , a = e.targetTouches[1].pageX
                      , r = e.targetTouches[1].pageY;
                    return Math.sqrt(Math.pow(a - t, 2) + Math.pow(r - i, 2))
                },
                onGestureStart: function(t) {
                    var i = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2)
                            return;
                        i.gesture.scaleStart = i.getDistanceBetweenTouches(t)
                    }
                    return i.gesture.slide && i.gesture.slide.length || (i.gesture.slide = e(this),
                    0 === i.gesture.slide.length && (i.gesture.slide = x.slides.eq(x.activeIndex)),
                    i.gesture.image = i.gesture.slide.find("img, svg, canvas"),
                    i.gesture.imageWrap = i.gesture.image.parent("." + x.params.zoomContainerClass),
                    i.gesture.zoomMax = i.gesture.imageWrap.attr("data-swiper-zoom") || x.params.zoomMax,
                    0 !== i.gesture.imageWrap.length) ? (i.gesture.image.transition(0),
                    void (i.isScaling = !0)) : void (i.gesture.image = void 0)
                },
                onGestureChange: function(e) {
                    var t = x.zoom;
                    if (!x.support.gestures) {
                        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                            return;
                        t.gesture.scaleMove = t.getDistanceBetweenTouches(e)
                    }
                    t.gesture.image && 0 !== t.gesture.image.length && (x.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale,
                    t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)),
                    t.scale < x.params.zoomMin && (t.scale = x.params.zoomMin + 1 - Math.pow(x.params.zoomMin - t.scale + 1, .5)),
                    t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"))
                },
                onGestureEnd: function(e) {
                    var t = x.zoom;
                    !x.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), x.params.zoomMin),
                    t.gesture.image.transition(x.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"),
                    t.currentScale = t.scale,
                    t.isScaling = !1,
                    1 === t.scale && (t.gesture.slide = void 0))
                },
                onTouchStart: function(e, t) {
                    var i = e.zoom;
                    i.gesture.image && 0 !== i.gesture.image.length && (i.image.isTouched || ("android" === e.device.os && t.preventDefault(),
                    i.image.isTouched = !0,
                    i.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX,
                    i.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
                },
                onTouchMove: function(e) {
                    var t = x.zoom;
                    if (t.gesture.image && 0 !== t.gesture.image.length && (x.allowClick = !1,
                    t.image.isTouched && t.gesture.slide)) {
                        t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth,
                        t.image.height = t.gesture.image[0].offsetHeight,
                        t.image.startX = x.getTranslate(t.gesture.imageWrap[0], "x") || 0,
                        t.image.startY = x.getTranslate(t.gesture.imageWrap[0], "y") || 0,
                        t.gesture.slideWidth = t.gesture.slide[0].offsetWidth,
                        t.gesture.slideHeight = t.gesture.slide[0].offsetHeight,
                        t.gesture.imageWrap.transition(0),
                        x.rtl && (t.image.startX = -t.image.startX),
                        x.rtl && (t.image.startY = -t.image.startY));
                        var i = t.image.width * t.scale
                          , a = t.image.height * t.scale;
                        if (!(i < t.gesture.slideWidth && a < t.gesture.slideHeight)) {
                            if (t.image.minX = Math.min(t.gesture.slideWidth / 2 - i / 2, 0),
                            t.image.maxX = -t.image.minX,
                            t.image.minY = Math.min(t.gesture.slideHeight / 2 - a / 2, 0),
                            t.image.maxY = -t.image.minY,
                            t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                            t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                            !t.image.isMoved && !t.isScaling) {
                                if (x.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x)
                                    return void (t.image.isTouched = !1);
                                if (!x.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y)
                                    return void (t.image.isTouched = !1)
                            }
                            e.preventDefault(),
                            e.stopPropagation(),
                            t.image.isMoved = !0,
                            t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX,
                            t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY,
                            t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)),
                            t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)),
                            t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)),
                            t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)),
                            t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x),
                            t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y),
                            t.velocity.prevTime || (t.velocity.prevTime = Date.now()),
                            t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2,
                            t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2,
                            Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0),
                            Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0),
                            t.velocity.prevPositionX = t.image.touchesCurrent.x,
                            t.velocity.prevPositionY = t.image.touchesCurrent.y,
                            t.velocity.prevTime = Date.now(),
                            t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function(e, t) {
                    var i = e.zoom;
                    if (i.gesture.image && 0 !== i.gesture.image.length) {
                        if (!i.image.isTouched || !i.image.isMoved)
                            return i.image.isTouched = !1,
                            void (i.image.isMoved = !1);
                        i.image.isTouched = !1,
                        i.image.isMoved = !1;
                        var a = 300
                          , r = 300
                          , s = i.velocity.x * a
                          , n = i.image.currentX + s
                          , o = i.velocity.y * r
                          , l = i.image.currentY + o;
                        0 !== i.velocity.x && (a = Math.abs((n - i.image.currentX) / i.velocity.x)),
                        0 !== i.velocity.y && (r = Math.abs((l - i.image.currentY) / i.velocity.y));
                        var u = Math.max(a, r);
                        i.image.currentX = n,
                        i.image.currentY = l;
                        var p = i.image.width * i.scale
                          , c = i.image.height * i.scale;
                        i.image.minX = Math.min(i.gesture.slideWidth / 2 - p / 2, 0),
                        i.image.maxX = -i.image.minX,
                        i.image.minY = Math.min(i.gesture.slideHeight / 2 - c / 2, 0),
                        i.image.maxY = -i.image.minY,
                        i.image.currentX = Math.max(Math.min(i.image.currentX, i.image.maxX), i.image.minX),
                        i.image.currentY = Math.max(Math.min(i.image.currentY, i.image.maxY), i.image.minY),
                        i.gesture.imageWrap.transition(u).transform("translate3d(" + i.image.currentX + "px, " + i.image.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function(e) {
                    var t = e.zoom;
                    t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"),
                    t.gesture.imageWrap.transform("translate3d(0,0,0)"),
                    t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0,
                    t.scale = t.currentScale = 1)
                },
                toggleZoom: function(t, i) {
                    var a = t.zoom;
                    if (a.gesture.slide || (a.gesture.slide = t.clickedSlide ? e(t.clickedSlide) : t.slides.eq(t.activeIndex),
                    a.gesture.image = a.gesture.slide.find("img, svg, canvas"),
                    a.gesture.imageWrap = a.gesture.image.parent("." + t.params.zoomContainerClass)),
                    a.gesture.image && 0 !== a.gesture.image.length) {
                        var r, s, n, o, l, u, p, c, h, d, f, m, g, v, y, _, w, x;
                        void 0 === a.image.touchesStart.x && i ? (r = "touchend" === i.type ? i.changedTouches[0].pageX : i.pageX,
                        s = "touchend" === i.type ? i.changedTouches[0].pageY : i.pageY) : (r = a.image.touchesStart.x,
                        s = a.image.touchesStart.y),
                        a.scale && 1 !== a.scale ? (a.scale = a.currentScale = 1,
                        a.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"),
                        a.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"),
                        a.gesture.slide = void 0) : (a.scale = a.currentScale = a.gesture.imageWrap.attr("data-swiper-zoom") || t.params.zoomMax,
                        i ? (w = a.gesture.slide[0].offsetWidth,
                        x = a.gesture.slide[0].offsetHeight,
                        n = a.gesture.slide.offset().left,
                        o = a.gesture.slide.offset().top,
                        l = n + w / 2 - r,
                        u = o + x / 2 - s,
                        h = a.gesture.image[0].offsetWidth,
                        d = a.gesture.image[0].offsetHeight,
                        f = h * a.scale,
                        m = d * a.scale,
                        g = Math.min(w / 2 - f / 2, 0),
                        v = Math.min(x / 2 - m / 2, 0),
                        y = -g,
                        _ = -v,
                        p = l * a.scale,
                        c = u * a.scale,
                        g > p && (p = g),
                        p > y && (p = y),
                        v > c && (c = v),
                        c > _ && (c = _)) : (p = 0,
                        c = 0),
                        a.gesture.imageWrap.transition(300).transform("translate3d(" + p + "px, " + c + "px,0)"),
                        a.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + a.scale + ")"))
                    }
                },
                attachEvents: function(t) {
                    var i = t ? "off" : "on";
                    if (x.params.zoom) {
                        var a = (x.slides,
                        !("touchstart" !== x.touchEvents.start || !x.support.passiveListener || !x.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        });
                        x.support.gestures ? (x.slides[i]("gesturestart", x.zoom.onGestureStart, a),
                        x.slides[i]("gesturechange", x.zoom.onGestureChange, a),
                        x.slides[i]("gestureend", x.zoom.onGestureEnd, a)) : "touchstart" === x.touchEvents.start && (x.slides[i](x.touchEvents.start, x.zoom.onGestureStart, a),
                        x.slides[i](x.touchEvents.move, x.zoom.onGestureChange, a),
                        x.slides[i](x.touchEvents.end, x.zoom.onGestureEnd, a)),
                        x[i]("touchStart", x.zoom.onTouchStart),
                        x.slides.each(function(t, a) {
                            e(a).find("." + x.params.zoomContainerClass).length > 0 && e(a)[i](x.touchEvents.move, x.zoom.onTouchMove);
                        }),
                        x[i]("touchEnd", x.zoom.onTouchEnd),
                        x[i]("transitionEnd", x.zoom.onTransitionEnd),
                        x.params.zoomToggle && x.on("doubleTap", x.zoom.toggleZoom)
                    }
                },
                init: function() {
                    x.zoom.attachEvents()
                },
                destroy: function() {
                    x.zoom.attachEvents(!0)
                }
            },
            x._plugins = [];
            for (var N in x.plugins) {
                var H = x.plugins[N](x, x.params[N]);
                H && x._plugins.push(H)
            }
            return x.callPlugins = function(e) {
                for (var t = 0; t < x._plugins.length; t++)
                    e in x._plugins[t] && x._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }
            ,
            x.emitterEventListeners = {},
            x.emit = function(e) {
                x.params[e] && x.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var t;
                if (x.emitterEventListeners[e])
                    for (t = 0; t < x.emitterEventListeners[e].length; t++)
                        x.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                x.callPlugins && x.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }
            ,
            x.on = function(e, t) {
                return e = d(e),
                x.emitterEventListeners[e] || (x.emitterEventListeners[e] = []),
                x.emitterEventListeners[e].push(t),
                x
            }
            ,
            x.off = function(e, t) {
                var i;
                if (e = d(e),
                void 0 === t)
                    return x.emitterEventListeners[e] = [],
                    x;
                if (x.emitterEventListeners[e] && 0 !== x.emitterEventListeners[e].length) {
                    for (i = 0; i < x.emitterEventListeners[e].length; i++)
                        x.emitterEventListeners[e][i] === t && x.emitterEventListeners[e].splice(i, 1);
                    return x
                }
            }
            ,
            x.once = function(e, t) {
                e = d(e);
                var i = function() {
                    t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]),
                    x.off(e, i)
                };
                return x.on(e, i),
                x
            }
            ,
            x.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"),
                    e
                },
                addRole: function(e, t) {
                    return e.attr("role", t),
                    e
                },
                addLabel: function(e, t) {
                    return e.attr("aria-label", t),
                    e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0),
                    e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1),
                    e
                },
                onEnterKey: function(t) {
                    13 === t.keyCode && (e(t.target).is(x.params.nextButton) ? (x.onClickNext(t),
                    x.isEnd ? x.a11y.notify(x.params.lastSlideMessage) : x.a11y.notify(x.params.nextSlideMessage)) : e(t.target).is(x.params.prevButton) && (x.onClickPrev(t),
                    x.isBeginning ? x.a11y.notify(x.params.firstSlideMessage) : x.a11y.notify(x.params.prevSlideMessage)),
                    e(t.target).is("." + x.params.bulletClass) && e(t.target)[0].click())
                },
                liveRegion: e('<span class="' + x.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var t = x.a11y.liveRegion;
                    0 !== t.length && (t.html(""),
                    t.html(e))
                },
                init: function() {
                    x.params.nextButton && x.nextButton && x.nextButton.length > 0 && (x.a11y.makeFocusable(x.nextButton),
                    x.a11y.addRole(x.nextButton, "button"),
                    x.a11y.addLabel(x.nextButton, x.params.nextSlideMessage)),
                    x.params.prevButton && x.prevButton && x.prevButton.length > 0 && (x.a11y.makeFocusable(x.prevButton),
                    x.a11y.addRole(x.prevButton, "button"),
                    x.a11y.addLabel(x.prevButton, x.params.prevSlideMessage)),
                    e(x.container).append(x.a11y.liveRegion)
                },
                initPagination: function() {
                    x.params.pagination && x.params.paginationClickable && x.bullets && x.bullets.length && x.bullets.each(function() {
                        var t = e(this);
                        x.a11y.makeFocusable(t),
                        x.a11y.addRole(t, "button"),
                        x.a11y.addLabel(t, x.params.paginationBulletMessage.replace(/{{index}}/, t.index() + 1))
                    })
                },
                destroy: function() {
                    x.a11y.liveRegion && x.a11y.liveRegion.length > 0 && x.a11y.liveRegion.remove()
                }
            },
            x.init = function() {
                x.params.loop && x.createLoop(),
                x.updateContainerSize(),
                x.updateSlidesSize(),
                x.updatePagination(),
                x.params.scrollbar && x.scrollbar && (x.scrollbar.set(),
                x.params.scrollbarDraggable && x.scrollbar.enableDraggable()),
                "slide" !== x.params.effect && x.effects[x.params.effect] && (x.params.loop || x.updateProgress(),
                x.effects[x.params.effect].setTranslate()),
                x.params.loop ? x.slideTo(x.params.initialSlide + x.loopedSlides, 0, x.params.runCallbacksOnInit) : (x.slideTo(x.params.initialSlide, 0, x.params.runCallbacksOnInit),
                0 === x.params.initialSlide && (x.parallax && x.params.parallax && x.parallax.setTranslate(),
                x.lazy && x.params.lazyLoading && (x.lazy.load(),
                x.lazy.initialImageLoaded = !0))),
                x.attachEvents(),
                x.params.observer && x.support.observer && x.initObservers(),
                x.params.preloadImages && !x.params.lazyLoading && x.preloadImages(),
                x.params.zoom && x.zoom && x.zoom.init(),
                x.params.autoplay && x.startAutoplay(),
                x.params.keyboardControl && x.enableKeyboardControl && x.enableKeyboardControl(),
                x.params.mousewheelControl && x.enableMousewheelControl && x.enableMousewheelControl(),
                x.params.hashnavReplaceState && (x.params.replaceState = x.params.hashnavReplaceState),
                x.params.history && x.history && x.history.init(),
                x.params.hashnav && x.hashnav && x.hashnav.init(),
                x.params.a11y && x.a11y && x.a11y.init(),
                x.emit("onInit", x)
            }
            ,
            x.cleanupStyles = function() {
                x.container.removeClass(x.classNames.join(" ")).removeAttr("style"),
                x.wrapper.removeAttr("style"),
                x.slides && x.slides.length && x.slides.removeClass([x.params.slideVisibleClass, x.params.slideActiveClass, x.params.slideNextClass, x.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),
                x.paginationContainer && x.paginationContainer.length && x.paginationContainer.removeClass(x.params.paginationHiddenClass),
                x.bullets && x.bullets.length && x.bullets.removeClass(x.params.bulletActiveClass),
                x.params.prevButton && e(x.params.prevButton).removeClass(x.params.buttonDisabledClass),
                x.params.nextButton && e(x.params.nextButton).removeClass(x.params.buttonDisabledClass),
                x.params.scrollbar && x.scrollbar && (x.scrollbar.track && x.scrollbar.track.length && x.scrollbar.track.removeAttr("style"),
                x.scrollbar.drag && x.scrollbar.drag.length && x.scrollbar.drag.removeAttr("style"))
            }
            ,
            x.destroy = function(e, t) {
                x.detachEvents(),
                x.stopAutoplay(),
                x.params.scrollbar && x.scrollbar && x.params.scrollbarDraggable && x.scrollbar.disableDraggable(),
                x.params.loop && x.destroyLoop(),
                t && x.cleanupStyles(),
                x.disconnectObservers(),
                x.params.zoom && x.zoom && x.zoom.destroy(),
                x.params.keyboardControl && x.disableKeyboardControl && x.disableKeyboardControl(),
                x.params.mousewheelControl && x.disableMousewheelControl && x.disableMousewheelControl(),
                x.params.a11y && x.a11y && x.a11y.destroy(),
                x.params.history && !x.params.replaceState && window.removeEventListener("popstate", x.history.setHistoryPopState),
                x.params.hashnav && x.hashnav && x.hashnav.destroy(),
                x.emit("onDestroy"),
                e !== !1 && (x = null)
            }
            ,
            x.init(),
            x
        }
    };
    t.prototype = {
        isSafari: function() {
            var e = window.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
            lteIE9: function() {
                var e = document.createElement("div");
                return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->",
                1 === e.getElementsByTagName("i").length
            }()
        },
        device: function() {
            var e = window.navigator.userAgent
              , t = e.match(/(Android);?[\s\/]+([\d.]+)?/)
              , i = e.match(/(iPad).*OS\s([\d_]+)/)
              , a = e.match(/(iPod)(.*OS\s([\d_]+))?/)
              , r = !i && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: i || r || a,
                android: t
            }
        }(),
        support: {
            touch: window.Modernizr && Modernizr.touch === !0 || function() {
                return !!("ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                var e = document.createElement("div").style;
                return "webkitPerspective"in e || "MozPerspective"in e || "OPerspective"in e || "MsPerspective"in e || "perspective"in e
            }(),
            flexbox: function() {
                for (var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i++)
                    if (t[i]in e)
                        return !0
            }(),
            observer: function() {
                return "MutationObserver"in window || "WebkitMutationObserver"in window
            }(),
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    window.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: function() {
                return "ongesturestart"in window
            }()
        },
        plugins: {}
    };
    for (var i = (function() {
        var e = function(e) {
            var t = this
              , i = 0;
            for (i = 0; i < e.length; i++)
                t[i] = e[i];
            return t.length = e.length,
            this
        }
          , t = function(t, i) {
            var a = []
              , r = 0;
            if (t && !i && t instanceof e)
                return t;
            if (t)
                if ("string" == typeof t) {
                    var s, n, o = t.trim();
                    if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                        var l = "div";
                        for (0 === o.indexOf("<li") && (l = "ul"),
                        0 === o.indexOf("<tr") && (l = "tbody"),
                        0 !== o.indexOf("<td") && 0 !== o.indexOf("<th") || (l = "tr"),
                        0 === o.indexOf("<tbody") && (l = "table"),
                        0 === o.indexOf("<option") && (l = "select"),
                        n = document.createElement(l),
                        n.innerHTML = t,
                        r = 0; r < n.childNodes.length; r++)
                            a.push(n.childNodes[r])
                    } else
                        for (s = i || "#" !== t[0] || t.match(/[ .<>:~]/) ? (i || document).querySelectorAll(t) : [document.getElementById(t.split("#")[1])],
                        r = 0; r < s.length; r++)
                            s[r] && a.push(s[r])
                } else if (t.nodeType || t === window || t === document)
                    a.push(t);
                else if (t.length > 0 && t[0].nodeType)
                    for (r = 0; r < t.length; r++)
                        a.push(t[r]);
            return new e(a)
        };
        return e.prototype = {
            addClass: function(e) {
                if (void 0 === e)
                    return this;
                for (var t = e.split(" "), i = 0; i < t.length; i++)
                    for (var a = 0; a < this.length; a++)
                        this[a].classList.add(t[i]);
                return this
            },
            removeClass: function(e) {
                for (var t = e.split(" "), i = 0; i < t.length; i++)
                    for (var a = 0; a < this.length; a++)
                        this[a].classList.remove(t[i]);
                return this
            },
            hasClass: function(e) {
                return !!this[0] && this[0].classList.contains(e)
            },
            toggleClass: function(e) {
                for (var t = e.split(" "), i = 0; i < t.length; i++)
                    for (var a = 0; a < this.length; a++)
                        this[a].classList.toggle(t[i]);
                return this
            },
            attr: function(e, t) {
                if (1 === arguments.length && "string" == typeof e)
                    return this[0] ? this[0].getAttribute(e) : void 0;
                for (var i = 0; i < this.length; i++)
                    if (2 === arguments.length)
                        this[i].setAttribute(e, t);
                    else
                        for (var a in e)
                            this[i][a] = e[a],
                            this[i].setAttribute(a, e[a]);
                return this
            },
            removeAttr: function(e) {
                for (var t = 0; t < this.length; t++)
                    this[t].removeAttribute(e);
                return this
            },
            data: function(e, t) {
                if (void 0 !== t) {
                    for (var i = 0; i < this.length; i++) {
                        var a = this[i];
                        a.dom7ElementDataStorage || (a.dom7ElementDataStorage = {}),
                        a.dom7ElementDataStorage[e] = t
                    }
                    return this
                }
                if (this[0]) {
                    var r = this[0].getAttribute("data-" + e);
                    return r ? r : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                }
            },
            transform: function(e) {
                for (var t = 0; t < this.length; t++) {
                    var i = this[t].style;
                    i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
                }
                return this
            },
            transition: function(e) {
                "string" != typeof e && (e += "ms");
                for (var t = 0; t < this.length; t++) {
                    var i = this[t].style;
                    i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
                }
                return this
            },
            on: function(e, i, a, r) {
                function s(e) {
                    var r = e.target;
                    if (t(r).is(i))
                        a.call(r, e);
                    else
                        for (var s = t(r).parents(), n = 0; n < s.length; n++)
                            t(s[n]).is(i) && a.call(s[n], e)
                }
                var n, o, l = e.split(" ");
                for (n = 0; n < this.length; n++)
                    if ("function" == typeof i || i === !1)
                        for ("function" == typeof i && (a = arguments[1],
                        r = arguments[2] || !1),
                        o = 0; o < l.length; o++)
                            this[n].addEventListener(l[o], a, r);
                    else
                        for (o = 0; o < l.length; o++)
                            this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []),
                            this[n].dom7LiveListeners.push({
                                listener: a,
                                liveListener: s
                            }),
                            this[n].addEventListener(l[o], s, r);
                return this
            },
            off: function(e, t, i, a) {
                for (var r = e.split(" "), s = 0; s < r.length; s++)
                    for (var n = 0; n < this.length; n++)
                        if ("function" == typeof t || t === !1)
                            "function" == typeof t && (i = arguments[1],
                            a = arguments[2] || !1),
                            this[n].removeEventListener(r[s], i, a);
                        else if (this[n].dom7LiveListeners)
                            for (var o = 0; o < this[n].dom7LiveListeners.length; o++)
                                this[n].dom7LiveListeners[o].listener === i && this[n].removeEventListener(r[s], this[n].dom7LiveListeners[o].liveListener, a);
                return this
            },
            once: function(e, t, i, a) {
                function r(n) {
                    i(n),
                    s.off(e, t, r, a)
                }
                var s = this;
                "function" == typeof t && (t = !1,
                i = arguments[1],
                a = arguments[2]),
                s.on(e, t, r, a)
            },
            trigger: function(e, t) {
                for (var i = 0; i < this.length; i++) {
                    var a;
                    try {
                        a = new window.CustomEvent(e,{
                            detail: t,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (i) {
                        a = document.createEvent("Event"),
                        a.initEvent(e, !0, !0),
                        a.detail = t
                    }
                    this[i].dispatchEvent(a)
                }
                return this
            },
            transitionEnd: function(e) {
                function t(s) {
                    if (s.target === this)
                        for (e.call(this, s),
                        i = 0; i < a.length; i++)
                            r.off(a[i], t)
                }
                var i, a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], r = this;
                if (e)
                    for (i = 0; i < a.length; i++)
                        r.on(a[i], t);
                return this
            },
            width: function() {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
            },
            outerWidth: function(e) {
                return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
            },
            height: function() {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
            },
            outerHeight: function(e) {
                return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
            },
            offset: function() {
                if (this.length > 0) {
                    var e = this[0]
                      , t = e.getBoundingClientRect()
                      , i = document.body
                      , a = e.clientTop || i.clientTop || 0
                      , r = e.clientLeft || i.clientLeft || 0
                      , s = window.pageYOffset || e.scrollTop
                      , n = window.pageXOffset || e.scrollLeft;
                    return {
                        top: t.top + s - a,
                        left: t.left + n - r
                    }
                }
                return null
            },
            css: function(e, t) {
                var i;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (i = 0; i < this.length; i++)
                            for (var a in e)
                                this[i].style[a] = e[a];
                        return this
                    }
                    if (this[0])
                        return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (i = 0; i < this.length; i++)
                        this[i].style[e] = t;
                    return this
                }
                return this
            },
            each: function(e) {
                for (var t = 0; t < this.length; t++)
                    e.call(this[t], t, this[t]);
                return this
            },
            html: function(e) {
                if (void 0 === e)
                    return this[0] ? this[0].innerHTML : void 0;
                for (var t = 0; t < this.length; t++)
                    this[t].innerHTML = e;
                return this
            },
            text: function(e) {
                if (void 0 === e)
                    return this[0] ? this[0].textContent.trim() : null;
                for (var t = 0; t < this.length; t++)
                    this[t].textContent = e;
                return this
            },
            is: function(i) {
                if (!this[0])
                    return !1;
                var a, r;
                if ("string" == typeof i) {
                    var s = this[0];
                    if (s === document)
                        return i === document;
                    if (s === window)
                        return i === window;
                    if (s.matches)
                        return s.matches(i);
                    if (s.webkitMatchesSelector)
                        return s.webkitMatchesSelector(i);
                    if (s.mozMatchesSelector)
                        return s.mozMatchesSelector(i);
                    if (s.msMatchesSelector)
                        return s.msMatchesSelector(i);
                    for (a = t(i),
                    r = 0; r < a.length; r++)
                        if (a[r] === this[0])
                            return !0;
                    return !1
                }
                if (i === document)
                    return this[0] === document;
                if (i === window)
                    return this[0] === window;
                if (i.nodeType || i instanceof e) {
                    for (a = i.nodeType ? [i] : i,
                    r = 0; r < a.length; r++)
                        if (a[r] === this[0])
                            return !0;
                    return !1
                }
                return !1
            },
            index: function() {
                if (this[0]) {
                    for (var e = this[0], t = 0; null !== (e = e.previousSibling); )
                        1 === e.nodeType && t++;
                    return t
                }
            },
            eq: function(t) {
                if (void 0 === t)
                    return this;
                var i, a = this.length;
                return t > a - 1 ? new e([]) : 0 > t ? (i = a + t,
                new e(0 > i ? [] : [this[i]])) : new e([this[t]])
            },
            append: function(t) {
                var i, a;
                for (i = 0; i < this.length; i++)
                    if ("string" == typeof t) {
                        var r = document.createElement("div");
                        for (r.innerHTML = t; r.firstChild; )
                            this[i].appendChild(r.firstChild)
                    } else if (t instanceof e)
                        for (a = 0; a < t.length; a++)
                            this[i].appendChild(t[a]);
                    else
                        this[i].appendChild(t);
                return this
            },
            prepend: function(t) {
                var i, a;
                for (i = 0; i < this.length; i++)
                    if ("string" == typeof t) {
                        var r = document.createElement("div");
                        for (r.innerHTML = t,
                        a = r.childNodes.length - 1; a >= 0; a--)
                            this[i].insertBefore(r.childNodes[a], this[i].childNodes[0])
                    } else if (t instanceof e)
                        for (a = 0; a < t.length; a++)
                            this[i].insertBefore(t[a], this[i].childNodes[0]);
                    else
                        this[i].insertBefore(t, this[i].childNodes[0]);
                return this
            },
            insertBefore: function(e) {
                for (var i = t(e), a = 0; a < this.length; a++)
                    if (1 === i.length)
                        i[0].parentNode.insertBefore(this[a], i[0]);
                    else if (i.length > 1)
                        for (var r = 0; r < i.length; r++)
                            i[r].parentNode.insertBefore(this[a].cloneNode(!0), i[r])
            },
            insertAfter: function(e) {
                for (var i = t(e), a = 0; a < this.length; a++)
                    if (1 === i.length)
                        i[0].parentNode.insertBefore(this[a], i[0].nextSibling);
                    else if (i.length > 1)
                        for (var r = 0; r < i.length; r++)
                            i[r].parentNode.insertBefore(this[a].cloneNode(!0), i[r].nextSibling)
            },
            next: function(i) {
                return new e(this.length > 0 ? i ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(i) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            },
            nextAll: function(i) {
                var a = []
                  , r = this[0];
                if (!r)
                    return new e([]);
                for (; r.nextElementSibling; ) {
                    var s = r.nextElementSibling;
                    i ? t(s).is(i) && a.push(s) : a.push(s),
                    r = s
                }
                return new e(a)
            },
            prev: function(i) {
                return new e(this.length > 0 ? i ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(i) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            },
            prevAll: function(i) {
                var a = []
                  , r = this[0];
                if (!r)
                    return new e([]);
                for (; r.previousElementSibling; ) {
                    var s = r.previousElementSibling;
                    i ? t(s).is(i) && a.push(s) : a.push(s),
                    r = s
                }
                return new e(a)
            },
            parent: function(e) {
                for (var i = [], a = 0; a < this.length; a++)
                    e ? t(this[a].parentNode).is(e) && i.push(this[a].parentNode) : i.push(this[a].parentNode);
                return t(t.unique(i))
            },
            parents: function(e) {
                for (var i = [], a = 0; a < this.length; a++)
                    for (var r = this[a].parentNode; r; )
                        e ? t(r).is(e) && i.push(r) : i.push(r),
                        r = r.parentNode;
                return t(t.unique(i))
            },
            find: function(t) {
                for (var i = [], a = 0; a < this.length; a++)
                    for (var r = this[a].querySelectorAll(t), s = 0; s < r.length; s++)
                        i.push(r[s]);
                return new e(i)
            },
            children: function(i) {
                for (var a = [], r = 0; r < this.length; r++)
                    for (var s = this[r].childNodes, n = 0; n < s.length; n++)
                        i ? 1 === s[n].nodeType && t(s[n]).is(i) && a.push(s[n]) : 1 === s[n].nodeType && a.push(s[n]);
                return new e(t.unique(a))
            },
            remove: function() {
                for (var e = 0; e < this.length; e++)
                    this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                return this
            },
            add: function() {
                var e, i, a = this;
                for (e = 0; e < arguments.length; e++) {
                    var r = t(arguments[e]);
                    for (i = 0; i < r.length; i++)
                        a[a.length] = r[i],
                        a.length++
                }
                return a
            }
        },
        t.fn = e.prototype,
        t.unique = function(e) {
            for (var t = [], i = 0; i < e.length; i++)
                -1 === t.indexOf(e[i]) && t.push(e[i]);
            return t
        }
        ,
        t
    }()), a = ["jQuery", "Zepto", "Dom7"], r = 0; r < a.length; r++)
        window[a[r]] && function(e) {
            e.fn.swiper = function(i) {
                var a;
                return e(this).each(function() {
                    var e = new t(this,i);
                    a || (a = e)
                }),
                a
            }
        }(window[a[r]]);
    var s;
    s = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i,
    s && ("transitionEnd"in s.fn || (s.fn.transitionEnd = function(e) {
        function t(s) {
            if (s.target === this)
                for (e.call(this, s),
                i = 0; i < a.length; i++)
                    r.off(a[i], t)
        }
        var i, a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], r = this;
        if (e)
            for (i = 0; i < a.length; i++)
                r.on(a[i], t);
        return this
    }
    ),
    "transform"in s.fn || (s.fn.transform = function(e) {
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
        }
        return this
    }
    ),
    "transition"in s.fn || (s.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
        }
        return this
    }
    ),
    "outerWidth"in s.fn || (s.fn.outerWidth = function(e) {
        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    }
    )),
    window.Swiper = t
}(),
"undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
}),
function(e, t, i, a) {
    var n = i(t)
      , h = function(e) {
        return e && "string" === i.type(e)
    }
      , d = function(e) {
        return h(e) && 0 < e.indexOf("%")
    };
    n.ready(function() {
        var t, s;
        if (i.scrollbarWidth === a && (i.scrollbarWidth = function() {
            var e = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body")
              , t = e.children()
              , t = t.innerWidth() - t.height(99).innerWidth();
            return e.remove(),
            t
        }
        ),
        i.support.fixedPosition === a) {
            t = i.support,
            s = i('<div style="position:fixed;top:20px;"></div>').appendTo("body");
            var n = 20 === s[0].offsetTop || 15 === s[0].offsetTop;
            s.remove(),
            t.fixedPosition = n
        }
        t = i(e).width(),
        s = i(e).width()
    })
}(window, document, jQuery);