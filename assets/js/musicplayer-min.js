! function (t, e, s, i) {
    "use strict";
    var n = "musicPlayer",
        o = {
            playlistItemSelector: "li",
            autoPlay: !1,
            volume: 80,
            loop: !1,
            timeSeparator: " / ",
            playerAbovePlaylist: !0,
            infoElements: ["title", "artist"],
            elements: ["artwork", "information", "controls", "progress", "time", "volume"],
            timeElements: ["current", "duration"],
            controlElements: ["backward", "play", "forward", "stop"],
            onLoad: function () {},
            onPlay: function () {},
            onPause: function () {},
            onStop: function () {},
            onFwd: function () {},
            onRew: function () {},
            volumeChanged: function () {},
            seeked: function () {},
            trackClicked: function () {},
            onMute: function () {}
        },
        l = "ontouchstart" in e,
        a = l ? "touchstart" : "mousedown",
        r = l ? "touchmove" : "mousemove",
        d = l ? "touchcancel" : "mouseup";

    function u(e, s) {
        this.element = e, this.settings = t.extend({}, o, s), this._defaults = o, this._name = n, this.init()
    }
    t.extend(u.prototype, {
        init: function () {
            var e, s = "",
                i = "",
                n = "",
                o = "",
                l = "",
                a = "",
                r = "",
                d = "",
                u = "",
                h = "",
                c = "",
                m = "",
                v = "",
                f = this;
            for (var p in this.settings.elements)
                if ("volume" == this.settings.elements[p]) o += "<div class='volume'><div class='volume-btn' title='Volume'><i class='fas fa-volume-up'></i></div><div class=' volume-adjust'><div><div></div></div></div></div>";
                else if ("progress" == this.settings.elements[p]) o += "<div class='progressbar'><div class='bar-loaded' ></div><div class='bar-played'></div></div>";
            else if ("artwork" == this.settings.elements[p]) o += "<div class='cover'></div>";
            else if ("information" == this.settings.elements[p]) {
                l = "-1" != t.inArray("title", this.settings.infoElements) ? "<div class='title'></div>" : " ", a = "-1" != t.inArray("artist", this.settings.infoElements) ? "<div class='artist'></div>" : " ";
                for (var g in this.settings.infoElements) "title" == this.settings.infoElements[g] ? n += l : "artist" == this.settings.infoElements[g] && (n += a);
                o += "<div class='info' >" + n + "</div>"
            } else if ("time" == this.settings.elements[p]) {
                c = "-1" != t.inArray("current", this.settings.timeElements) ? "<div class='time-current'></div>" : " ", m = "-1" != t.inArray("duration", this.settings.timeElements) ? "<div class='time-duration'></div>" : " ", v = "<div class='time-separator'>" + this.settings.timeSeparator.replace(/\s/g, "&nbsp;") + "</div>";
                for (var g in this.settings.timeElements) 1 == g && (i += v), "current" == this.settings.timeElements[g] ? i += c : "duration" == this.settings.timeElements[g] && (i += m);
                o += "<div class='timeHolder'>" + i + "</div>"
            } else if ("controls" == this.settings.elements[p]) {
                r = "-1" != t.inArray("backward", this.settings.controlElements) ? "<div class='rew'><i class='fas fa-backward'></i></div>" : " ", d = "-1" != t.inArray("forward", this.settings.controlElements) ? "<div class='fwd'><i class='fas fa-forward'></i></div>" : " ", u = "-1" != t.inArray("stop", this.settings.controlElements) ? "<div class='stop'><i class='fas fa-stop'></i></div>" : " ", h = "-1" != t.inArray("play", this.settings.controlElements) ? "<div class='play'><i class='fas fa-play'></i></div><div class='pause'><i class='fas fa-pause'></i></div>" : " ";
                for (var g in this.settings.controlElements) "backward" == this.settings.controlElements[g] ? s += r : "play" == this.settings.controlElements[g] ? s += h : "forward" == this.settings.controlElements[g] ? s += d : "stop" == this.settings.controlElements[g] && (s += u);
                o += "<div class='controls'>" + s + "</div>"
            }
            e = t("<div class='player' >" + o + "</div>"), this.settings.playerAbovePlaylist ? t(e).insertBefore(t(this.element).find(".playlist")) : t(e).insertAfter(t(this.element).find(".playlist")), this.playlistItemSelector = this.settings.playlistItemSelector, this.playlistHolder = t(this.element).children(".playlist"), this.playerHolder = t(this.element).children(".player"), this.song = "", this.theBar = this.playerHolder.find(".progressbar"), this.barPlayed = this.playerHolder.find(".bar-played"), this.barLoaded = this.playerHolder.find(".bar-loaded"), this.timeCurrent = this.playerHolder.find(".time-current"), this.timeDuration = this.playerHolder.find(".time-duration"), this.timeSeparator = this.settings.timeSeparator, this.volumeInfo = this.playerHolder.find(".volume"), this.volumeButton = this.playerHolder.find(".volume-btn"), this.volumeAdjuster = this.playerHolder.find(".volume-adjust > div"), this.volumeValue = this.settings.volume / 100, this.volumeDefault = 0, this.trackInfo = this.playerHolder.find(".info"), this.coverInfo = this.playerHolder.find(".cover"), this.controlsInfo = this.playerHolder.find(".controls"), this.controlPlay = t(this.controlsInfo).find(".play"), this.controlPause = t(this.controlsInfo).find(".pause"), this.controlStop = t(this.controlsInfo).find(".stop"), this.controlFwd = t(this.controlsInfo).find(".fwd"), this.controlRew = t(this.controlsInfo).find(".rew"), this.cssClass = {
                playing: "playing",
                mute: "mute"
            }, /iPad|iPhone|iPod/.test(navigator.userAgent) && t(this.volumeInfo).hide(), this.initAudio(t(this.playlistHolder.find(this.playlistItemSelector + ":first"))), this.song.volume = this.volumeValue, this.timeDuration.html("&hellip;"), this.timeCurrent.text(this.secondsToTime(0)), t(this.controlPlay).click(function (t) {
                t.preventDefault(), f.playAudio()
            }), t(this.controlPause).click(function (t) {
                t.preventDefault(), f.stopAudio(), f.settings.onPause()
            }), t(this.controlFwd).click(function (e) {
                e.preventDefault(), f.stopAudio();
                var s = f.getSong(!0);
                0 == s.length && (s = t(f.playlistHolder).find(f.playlistItemSelector + ":first")), f.loadNewSong(s), f.playAudio(), f.settings.onFwd()
            }), t(this.controlRew).click(function (e) {
                e.preventDefault(), f.stopAudio();
                var s = f.getSong(!1);
                0 == s.length && (s = t(f.playlistHolder).find(f.playlistItemSelector + ":last")), f.loadNewSong(s), f.playAudio(), f.settings.onRew()
            }), t(this.controlStop).click(function (t) {
                t.preventDefault(), f.stopAudio(), f.song.currentTime = 0, f.settings.onStop()
            }), t(this.playlistHolder).find(this.playlistItemSelector).click(function (e) {
                e.preventDefault(), f.stopAudio(), f.loadNewSong(t(this)), f.playAudio(), f.settings.trackClicked()
            })
        },
        secondsToTime: function (t) {
            var e = Math.floor(t / 3600),
                s = Math.floor(t % 3600 / 60),
                i = Math.ceil(t % 3600 % 60);
            return (0 == e ? "" : e > 0 && e.toString().length < 2 ? "0" + e + ":" : e + ":") + (s.toString().length < 2 ? "0" + s : s) + ":" + (i.toString().length < 2 ? "0" + i : i)
        },
        adjustVolume: function (t) {
            var e = l ? t.originalEvent.touches[0] : t;
            this.song.volume = Math.abs((e.pageX - this.volumeAdjuster.offset().left) / this.volumeAdjuster.width())
        },
        adjustCurrentTime: function (t) {
            var e = l ? t.originalEvent.touches[0] : t;
            this.song.currentTime = Math.round(this.song.duration * (e.pageX - this.theBar.offset().left) / this.theBar.width())
        },
        initAudio: function (e) {
            var s = e.children("a:first-child").attr("href"),
                i = e.text(),
                n = e.attr("data-cover"),
                o = e.attr("data-artist"),
                l = this;
            t(this.trackInfo).children(".title").text(i), t(this.trackInfo).children(".artist").text(o), t(this.coverInfo).css("background-image", "url(" + n + ")"), this.song = new Audio(s), this.song.load(), this.song.addEventListener("loadeddata", function () {
                t(l.timeDuration).html(l.secondsToTime(this.duration)), t(l.volumeAdjuster).find("div").width(100 * this.volume + "%"), l.volumeDefault = this.volume
            }, !1), this.song.addEventListener("progress", function () {
                t(l.barLoaded).width(this.buffered.end(0) / this.duration * 100 + "%")
            }), this.song.addEventListener("timeupdate", function () {
                t(l.timeCurrent).text(l.secondsToTime(this.currentTime)), t(l.barPlayed).width(this.currentTime / this.duration * 100 + "%")
            }), this.song.addEventListener("volumechange", function () {
                Number(Math.round(100 * this.volume + "e1") + "e-1") <= .4 && (this.volume = 0), t(l.volumeAdjuster).find("div").width(100 * this.volume + "%"), this.volume > 0 && l.playerHolder.hasClass(l.cssClass.mute) && l.playerHolder.removeClass(l.cssClass.mute), this.volume <= 0 && !l.playerHolder.hasClass(l.cssClass.mute) && l.playerHolder.addClass(l.cssClass.mute), l.volumeValue = this.volume
            }), this.song.addEventListener("ended", function () {
                l.settings.autoPlay ? l.autoPlayNext() : (l.playerHolder.removeClass(l.cssClass.playing), t(l.controlPlay).removeClass("hidden"), t(l.controlPause).removeClass("visible"))
            }), t(this.volumeButton).on("click", function () {
                return t(l.playerHolder).hasClass(l.cssClass.mute) ? (t(l.playerHolder).removeClass(l.cssClass.mute), l.song.volume = l.volumeDefault) : (t(l.playerHolder).addClass(l.cssClass.mute), l.volumeDefault = l.song.volume, l.song.volume = 0, l.settings.onMute()), !1
            }), t(this.volumeAdjuster).on(a, function (t) {
                l.adjustVolume(t), l.volumeAdjuster.on(r, function (t) {
                    l.adjustVolume(t)
                }), l.settings.volumeChanged()
            }).on(d, function () {
                l.volumeAdjuster.unbind(r)
            }), t(this.theBar).on(a, function (t) {
                l.adjustCurrentTime(t), l.theBar.on(r, function (t) {
                    l.adjustCurrentTime(t)
                })
            }).on(d, function () {
                l.theBar.unbind(r), l.settings.seeked()
            }), t(this.playlistHolder).find(l.playlistItemSelector).removeClass("active"), e.addClass("active"), this.settings.onLoad(), this.settings.autoPlay && this.playAudio()
        },
        playAudio: function () {
            this.song.play(), this.playerHolder.addClass(this.cssClass.playing), "-1" != t.inArray("controls", this.settings.elements) && "-1" != t.inArray("play", this.settings.controlElements) && (t(this.controlPlay).addClass("hidden"), t(this.controlPause).addClass("visible")), this.settings.onPlay()
        },
        stopAudio: function () {
            this.song.pause(), this.playerHolder.removeClass(this.cssClass.playing), "-1" != t.inArray("controls", this.settings.elements) && "-1" != t.inArray("play", this.settings.controlElements) && (t(this.controlPlay).removeClass("hidden"), t(this.controlPause).removeClass("visible"))
        },
        autoPlayNext: function () {
            this.stopAudio();
            var e = this.getSong(!0);
            0 == e.length && this.settings.loop ? (e = t(this.playlistHolder).find(this.playlistItemSelector + ":first"), this.loadNewSong(e), this.playAudio()) : 0 == !e.length && (this.loadNewSong(e), this.playAudio())
        },
        getSong: function (e) {
            var s = t(this.playlistHolder).find(this.playlistItemSelector),
                i = t(this.playlistItemSelector + ".active");
            return e ? s.eq(s.index(i) + 1) : s.eq(s.index(i) - 1)
        },
        loadNewSong: function (t) {
            this.volumeValue = this.song.volume, this.initAudio(t), this.song.volume = this.volumeValue, this.volumeAdjuster.find("div").width(100 * this.volumeValue + "%"), this.barPlayed.width(0), this.barLoaded.width(0)
        }
    }), t.fn[n] = function (e) {
        return this.each(function () {
            t.data(this, "plugin_" + n) || t.data(this, "plugin_" + n, new u(this, e))
        })
    }
}(jQuery, window, document);