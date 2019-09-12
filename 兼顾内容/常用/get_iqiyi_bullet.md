## 获取爱奇艺弹幕

```javascript
var l = function() {
    return function t(a, r, i) {
        function n(o, c) {
            if (!r[o]) {
                if (!a[o]) {
                    var l = "function" == typeof e && e;
                    if (!c && l)
                        return e(o, !0);
                    if (s)
                        return s(o, !0);
                    var d = new Error("Cannot find module '" + o + "'");
                    throw d.code = "MODULE_NOT_FOUND",
                        d
                }
                var u = r[o] = {
                    exports: {}
                };
                a[o][0].call(u.exports, function(e) {
                    var t = a[o][1][e];
                    return n(t || e)
                }, u, u.exports, t, a, r, i)
            }
            return r[o].exports
        }
        for (var s = "function" == typeof e && e, o = 0; o < i.length; o++)
            n(i[o]);
        return n
    }({
        1: [function(e, t, a) {
            "use strict";
            var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
            a.assign = function(e) {
                for (var t = Array.prototype.slice.call(arguments, 1); t.length; ) {
                    var a = t.shift();
                    if (a) {
                        if ("object" != typeof a)
                            throw new TypeError(a + "must be non-object");
                        for (var r in a)
                            a.hasOwnProperty(r) && (e[r] = a[r])
                    }
                }
                return e
            }
                ,
                a.shrinkBuf = function(e, t) {
                    return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t,
                        e)
                }
            ;
            var i = {
                arraySet: function(e, t, a, r, i) {
                    if (t.subarray && e.subarray)
                        return void e.set(t.subarray(a, a + r), i);
                    for (var n = 0; n < r; n++)
                        e[i + n] = t[a + n]
                },
                flattenChunks: function(e) {
                    var t, a, r, i, n, s;
                    for (r = 0,
                             t = 0,
                             a = e.length; t < a; t++)
                        r += e[t].length;
                    for (s = new Uint8Array(r),
                             i = 0,
                             t = 0,
                             a = e.length; t < a; t++)
                        n = e[t],
                            s.set(n, i),
                            i += n.length;
                    return s
                }
            }
                , n = {
                arraySet: function(e, t, a, r, i) {
                    for (var n = 0; n < r; n++)
                        e[i + n] = t[a + n]
                },
                flattenChunks: function(e) {
                    return [].concat.apply([], e)
                }
            };
            a.setTyped = function(e) {
                e ? (a.Buf8 = Uint8Array,
                    a.Buf16 = Uint16Array,
                    a.Buf32 = Int32Array,
                    a.assign(a, i)) : (a.Buf8 = Array,
                    a.Buf16 = Array,
                    a.Buf32 = Array,
                    a.assign(a, n))
            }
                ,
                a.setTyped(r)
        }
            , {}],
        2: [function(e, t, a) {
            "use strict";
            function r(e, t) {
                if (t < 65537 && (e.subarray && s || !e.subarray && n))
                    return String.fromCharCode.apply(null, i.shrinkBuf(e, t));
                for (var a = "", r = 0; r < t; r++)
                    a += String.fromCharCode(e[r]);
                return a
            }
            var i = e("./common")
                , n = !0
                , s = !0;
            try {
                String.fromCharCode.apply(null, [0])
            } catch (e) {
                n = !1
            }
            try {
                String.fromCharCode.apply(null, new Uint8Array(1))
            } catch (e) {
                s = !1
            }
            for (var o = new i.Buf8(256), c = 0; c < 256; c++)
                o[c] = c >= 252 ? 6 : c >= 248 ? 5 : c >= 240 ? 4 : c >= 224 ? 3 : c >= 192 ? 2 : 1;
            o[254] = o[254] = 1,
                a.string2buf = function(e) {
                    var t, a, r, n, s, o = e.length, c = 0;
                    for (n = 0; n < o; n++)
                        a = e.charCodeAt(n),
                        55296 == (64512 & a) && n + 1 < o && 56320 == (64512 & (r = e.charCodeAt(n + 1))) && (a = 65536 + (a - 55296 << 10) + (r - 56320),
                            n++),
                            c += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
                    for (t = new i.Buf8(c),
                             s = 0,
                             n = 0; s < c; n++)
                        a = e.charCodeAt(n),
                        55296 == (64512 & a) && n + 1 < o && 56320 == (64512 & (r = e.charCodeAt(n + 1))) && (a = 65536 + (a - 55296 << 10) + (r - 56320),
                            n++),
                            a < 128 ? t[s++] = a : a < 2048 ? (t[s++] = 192 | a >>> 6,
                                t[s++] = 128 | 63 & a) : a < 65536 ? (t[s++] = 224 | a >>> 12,
                                t[s++] = 128 | a >>> 6 & 63,
                                t[s++] = 128 | 63 & a) : (t[s++] = 240 | a >>> 18,
                                t[s++] = 128 | a >>> 12 & 63,
                                t[s++] = 128 | a >>> 6 & 63,
                                t[s++] = 128 | 63 & a);
                    return t
                }
                ,
                a.buf2binstring = function(e) {
                    return r(e, e.length)
                }
                ,
                a.binstring2buf = function(e) {
                    for (var t = new i.Buf8(e.length), a = 0, r = t.length; a < r; a++)
                        t[a] = e.charCodeAt(a);
                    return t
                }
                ,
                a.buf2string = function(e, t) {
                    var a, i, n, s, c = t || e.length, l = new Array(2 * c);
                    for (i = 0,
                             a = 0; a < c; )
                        if ((n = e[a++]) < 128)
                            l[i++] = n;
                        else if ((s = o[n]) > 4)
                            l[i++] = 65533,
                                a += s - 1;
                        else {
                            for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && a < c; )
                                n = n << 6 | 63 & e[a++],
                                    s--;
                            s > 1 ? l[i++] = 65533 : n < 65536 ? l[i++] = n : (n -= 65536,
                                l[i++] = 55296 | n >> 10 & 1023,
                                l[i++] = 56320 | 1023 & n)
                        }
                    return r(l, i)
                }
                ,
                a.utf8border = function(e, t) {
                    var a;
                    for (t = t || e.length,
                         t > e.length && (t = e.length),
                             a = t - 1; a >= 0 && 128 == (192 & e[a]); )
                        a--;
                    return a < 0 ? t : 0 === a ? t : a + o[e[a]] > t ? a : t
                }
        }
            , {
                "./common": 1
            }],
        3: [function(e, t, a) {
            "use strict";
            function r(e, t, a, r) {
                for (var i = 65535 & e | 0, n = e >>> 16 & 65535 | 0, s = 0; 0 !== a; ) {
                    s = a > 2e3 ? 2e3 : a,
                        a -= s;
                    do {
                        i = i + t[r++] | 0,
                            n = n + i | 0
                    } while (--s);i %= 65521,
                        n %= 65521
                }
                return i | n << 16 | 0
            }
            t.exports = r
        }
            , {}],
        4: [function(e, t, a) {
            "use strict";
            t.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
            }
        }
            , {}],
        5: [function(e, t, a) {
            "use strict";
            function r(e, t, a, r) {
                var n = i
                    , s = r + a;
                e ^= -1;
                for (var o = r; o < s; o++)
                    e = e >>> 8 ^ n[255 & (e ^ t[o])];
                return -1 ^ e
            }
            var i = function() {
                for (var e, t = [], a = 0; a < 256; a++) {
                    e = a;
                    for (var r = 0; r < 8; r++)
                        e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                    t[a] = e
                }
                return t
            }();
            t.exports = r
        }
            , {}],
        6: [function(e, t, a) {
            "use strict";
            function r() {
                this.text = 0,
                    this.time = 0,
                    this.xflags = 0,
                    this.os = 0,
                    this.extra = null,
                    this.extra_len = 0,
                    this.name = "",
                    this.comment = "",
                    this.hcrc = 0,
                    this.done = !1
            }
            t.exports = r
        }
            , {}],
        7: [function(e, t, a) {
            "use strict";
            t.exports = function(e, t) {
                var a, r, i, n, s, o, c, l, d, u, f, g, h, p, _, b, m, v, y, k, E, w, A, x, T;
                a = e.state,
                    r = e.next_in,
                    x = e.input,
                    i = r + (e.avail_in - 5),
                    n = e.next_out,
                    T = e.output,
                    s = n - (t - e.avail_out),
                    o = n + (e.avail_out - 257),
                    c = a.dmax,
                    l = a.wsize,
                    d = a.whave,
                    u = a.wnext,
                    f = a.window,
                    g = a.hold,
                    h = a.bits,
                    p = a.lencode,
                    _ = a.distcode,
                    b = (1 << a.lenbits) - 1,
                    m = (1 << a.distbits) - 1;
                e: do {
                    h < 15 && (g += x[r++] << h,
                        h += 8,
                        g += x[r++] << h,
                        h += 8),
                        v = p[g & b];
                    t: for (; ; ) {
                        if (y = v >>> 24,
                            g >>>= y,
                            h -= y,
                        0 === (y = v >>> 16 & 255))
                            T[n++] = 65535 & v;
                        else {
                            if (!(16 & y)) {
                                if (0 == (64 & y)) {
                                    v = p[(65535 & v) + (g & (1 << y) - 1)];
                                    continue t
                                }
                                if (32 & y) {
                                    a.mode = 12;
                                    break e
                                }
                                e.msg = "invalid literal/length code",
                                    a.mode = 30;
                                break e
                            }
                            k = 65535 & v,
                                y &= 15,
                            y && (h < y && (g += x[r++] << h,
                                h += 8),
                                k += g & (1 << y) - 1,
                                g >>>= y,
                                h -= y),
                            h < 15 && (g += x[r++] << h,
                                h += 8,
                                g += x[r++] << h,
                                h += 8),
                                v = _[g & m];
                            a: for (; ; ) {
                                if (y = v >>> 24,
                                    g >>>= y,
                                    h -= y,
                                    !(16 & (y = v >>> 16 & 255))) {
                                    if (0 == (64 & y)) {
                                        v = _[(65535 & v) + (g & (1 << y) - 1)];
                                        continue a
                                    }
                                    e.msg = "invalid distance code",
                                        a.mode = 30;
                                    break e
                                }
                                if (E = 65535 & v,
                                    y &= 15,
                                h < y && (g += x[r++] << h,
                                (h += 8) < y && (g += x[r++] << h,
                                    h += 8)),
                                (E += g & (1 << y) - 1) > c) {
                                    e.msg = "invalid distance too far back",
                                        a.mode = 30;
                                    break e
                                }
                                if (g >>>= y,
                                    h -= y,
                                    y = n - s,
                                E > y) {
                                    if ((y = E - y) > d && a.sane) {
                                        e.msg = "invalid distance too far back",
                                            a.mode = 30;
                                        break e
                                    }
                                    if (w = 0,
                                        A = f,
                                    0 === u) {
                                        if (w += l - y,
                                        y < k) {
                                            k -= y;
                                            do {
                                                T[n++] = f[w++]
                                            } while (--y);w = n - E,
                                                A = T
                                        }
                                    } else if (u < y) {
                                        if (w += l + u - y,
                                        (y -= u) < k) {
                                            k -= y;
                                            do {
                                                T[n++] = f[w++]
                                            } while (--y);if (w = 0,
                                            u < k) {
                                                y = u,
                                                    k -= y;
                                                do {
                                                    T[n++] = f[w++]
                                                } while (--y);w = n - E,
                                                    A = T
                                            }
                                        }
                                    } else if (w += u - y,
                                    y < k) {
                                        k -= y;
                                        do {
                                            T[n++] = f[w++]
                                        } while (--y);w = n - E,
                                            A = T
                                    }
                                    for (; k > 2; )
                                        T[n++] = A[w++],
                                            T[n++] = A[w++],
                                            T[n++] = A[w++],
                                            k -= 3;
                                    k && (T[n++] = A[w++],
                                    k > 1 && (T[n++] = A[w++]))
                                } else {
                                    w = n - E;
                                    do {
                                        T[n++] = T[w++],
                                            T[n++] = T[w++],
                                            T[n++] = T[w++],
                                            k -= 3
                                    } while (k > 2);k && (T[n++] = T[w++],
                                    k > 1 && (T[n++] = T[w++]))
                                }
                                break
                            }
                        }
                        break
                    }
                } while (r < i && n < o);k = h >> 3,
                    r -= k,
                    h -= k << 3,
                    g &= (1 << h) - 1,
                    e.next_in = r,
                    e.next_out = n,
                    e.avail_in = r < i ? i - r + 5 : 5 - (r - i),
                    e.avail_out = n < o ? o - n + 257 : 257 - (n - o),
                    a.hold = g,
                    a.bits = h
            }
        }
            , {}],
        8: [function(e, t, a) {
            "use strict";
            function r(e) {
                return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
            }
            function i() {
                this.mode = 0,
                    this.last = !1,
                    this.wrap = 0,
                    this.havedict = !1,
                    this.flags = 0,
                    this.dmax = 0,
                    this.check = 0,
                    this.total = 0,
                    this.head = null,
                    this.wbits = 0,
                    this.wsize = 0,
                    this.whave = 0,
                    this.wnext = 0,
                    this.window = null,
                    this.hold = 0,
                    this.bits = 0,
                    this.length = 0,
                    this.offset = 0,
                    this.extra = 0,
                    this.lencode = null,
                    this.distcode = null,
                    this.lenbits = 0,
                    this.distbits = 0,
                    this.ncode = 0,
                    this.nlen = 0,
                    this.ndist = 0,
                    this.have = 0,
                    this.next = null,
                    this.lens = new m.Buf16(320),
                    this.work = new m.Buf16(288),
                    this.lendyn = null,
                    this.distdyn = null,
                    this.sane = 0,
                    this.back = 0,
                    this.was = 0
            }
            function n(e) {
                var t;
                return e && e.state ? (t = e.state,
                    e.total_in = e.total_out = t.total = 0,
                    e.msg = "",
                t.wrap && (e.adler = 1 & t.wrap),
                    t.mode = P,
                    t.last = 0,
                    t.havedict = 0,
                    t.dmax = 32768,
                    t.head = null,
                    t.hold = 0,
                    t.bits = 0,
                    t.lencode = t.lendyn = new m.Buf32(pe),
                    t.distcode = t.distdyn = new m.Buf32(_e),
                    t.sane = 1,
                    t.back = -1,
                    I) : L
            }
            function s(e) {
                var t;
                return e && e.state ? (t = e.state,
                    t.wsize = 0,
                    t.whave = 0,
                    t.wnext = 0,
                    n(e)) : L
            }
            function o(e, t) {
                var a, r;
                return e && e.state ? (r = e.state,
                    t < 0 ? (a = 0,
                        t = -t) : (a = 1 + (t >> 4),
                    t < 48 && (t &= 15)),
                    t && (t < 8 || t > 15) ? L : (null !== r.window && r.wbits !== t && (r.window = null),
                        r.wrap = a,
                        r.wbits = t,
                        s(e))) : L
            }
            function c(e, t) {
                var a, r;
                return e ? (r = new i,
                    e.state = r,
                    r.window = null,
                    a = o(e, t),
                a !== I && (e.state = null),
                    a) : L
            }
            function l(e) {
                return c(e, be)
            }
            function d(e) {
                if (me) {
                    var t;
                    for (_ = new m.Buf32(512),
                             b = new m.Buf32(32),
                             t = 0; t < 144; )
                        e.lens[t++] = 8;
                    for (; t < 256; )
                        e.lens[t++] = 9;
                    for (; t < 280; )
                        e.lens[t++] = 7;
                    for (; t < 288; )
                        e.lens[t++] = 8;
                    for (E(A, e.lens, 0, 288, _, 0, e.work, {
                        bits: 9
                    }),
                             t = 0; t < 32; )
                        e.lens[t++] = 5;
                    E(x, e.lens, 0, 32, b, 0, e.work, {
                        bits: 5
                    }),
                        me = !1
                }
                e.lencode = _,
                    e.lenbits = 9,
                    e.distcode = b,
                    e.distbits = 5
            }
            function u(e, t, a, r) {
                var i, n = e.state;
                return null === n.window && (n.wsize = 1 << n.wbits,
                    n.wnext = 0,
                    n.whave = 0,
                    n.window = new m.Buf8(n.wsize)),
                    r >= n.wsize ? (m.arraySet(n.window, t, a - n.wsize, n.wsize, 0),
                        n.wnext = 0,
                        n.whave = n.wsize) : (i = n.wsize - n.wnext,
                    i > r && (i = r),
                        m.arraySet(n.window, t, a - r, i, n.wnext),
                        r -= i,
                        r ? (m.arraySet(n.window, t, a - r, r, 0),
                            n.wnext = r,
                            n.whave = n.wsize) : (n.wnext += i,
                        n.wnext === n.wsize && (n.wnext = 0),
                        n.whave < n.wsize && (n.whave += i))),
                    0
            }
            function f(e, t) {
                var a, i, n, s, o, c, l, f, g, h, p, _, b, pe, _e, be, me, ve, ye, ke, Ee, we, Ae, xe, Te = 0, Be = new m.Buf8(4), Se = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in)
                    return L;
                a = e.state,
                a.mode === J && (a.mode = V),
                    o = e.next_out,
                    n = e.output,
                    l = e.avail_out,
                    s = e.next_in,
                    i = e.input,
                    c = e.avail_in,
                    f = a.hold,
                    g = a.bits,
                    h = c,
                    p = l,
                    we = I;
                e: for (; ; )
                    switch (a.mode) {
                        case P:
                            if (0 === a.wrap) {
                                a.mode = V;
                                break
                            }
                            for (; g < 16; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            if (2 & a.wrap && 35615 === f) {
                                a.check = 0,
                                    Be[0] = 255 & f,
                                    Be[1] = f >>> 8 & 255,
                                    a.check = y(a.check, Be, 2, 0),
                                    f = 0,
                                    g = 0,
                                    a.mode = G;
                                break
                            }
                            if (a.flags = 0,
                            a.head && (a.head.done = !1),
                            !(1 & a.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
                                e.msg = "incorrect header check",
                                    a.mode = fe;
                                break
                            }
                            if ((15 & f) !== j) {
                                e.msg = "unknown compression method",
                                    a.mode = fe;
                                break
                            }
                            if (f >>>= 4,
                                g -= 4,
                                Ee = 8 + (15 & f),
                            0 === a.wbits)
                                a.wbits = Ee;
                            else if (Ee > a.wbits) {
                                e.msg = "invalid window size",
                                    a.mode = fe;
                                break
                            }
                            a.dmax = 1 << Ee,
                                e.adler = a.check = 1,
                                a.mode = 512 & f ? U : J,
                                f = 0,
                                g = 0;
                            break;
                        case G:
                            for (; g < 16; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            if (a.flags = f,
                            (255 & a.flags) !== j) {
                                e.msg = "unknown compression method",
                                    a.mode = fe;
                                break
                            }
                            if (57344 & a.flags) {
                                e.msg = "unknown header flags set",
                                    a.mode = fe;
                                break
                            }
                            a.head && (a.head.text = f >> 8 & 1),
                            512 & a.flags && (Be[0] = 255 & f,
                                Be[1] = f >>> 8 & 255,
                                a.check = y(a.check, Be, 2, 0)),
                                f = 0,
                                g = 0,
                                a.mode = z;
                        case z:
                            for (; g < 32; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            a.head && (a.head.time = f),
                            512 & a.flags && (Be[0] = 255 & f,
                                Be[1] = f >>> 8 & 255,
                                Be[2] = f >>> 16 & 255,
                                Be[3] = f >>> 24 & 255,
                                a.check = y(a.check, Be, 4, 0)),
                                f = 0,
                                g = 0,
                                a.mode = $;
                        case $:
                            for (; g < 16; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            a.head && (a.head.xflags = 255 & f,
                                a.head.os = f >> 8),
                            512 & a.flags && (Be[0] = 255 & f,
                                Be[1] = f >>> 8 & 255,
                                a.check = y(a.check, Be, 2, 0)),
                                f = 0,
                                g = 0,
                                a.mode = O;
                        case O:
                            if (1024 & a.flags) {
                                for (; g < 16; ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                a.length = f,
                                a.head && (a.head.extra_len = f),
                                512 & a.flags && (Be[0] = 255 & f,
                                    Be[1] = f >>> 8 & 255,
                                    a.check = y(a.check, Be, 2, 0)),
                                    f = 0,
                                    g = 0
                            } else
                                a.head && (a.head.extra = null);
                            a.mode = H;
                        case H:
                            if (1024 & a.flags && (_ = a.length,
                            _ > c && (_ = c),
                            _ && (a.head && (Ee = a.head.extra_len - a.length,
                            a.head.extra || (a.head.extra = new Array(a.head.extra_len)),
                                m.arraySet(a.head.extra, i, s, _, Ee)),
                            512 & a.flags && (a.check = y(a.check, i, _, s)),
                                c -= _,
                                s += _,
                                a.length -= _),
                                a.length))
                                break e;
                            a.length = 0,
                                a.mode = N;
                        case N:
                            if (2048 & a.flags) {
                                if (0 === c)
                                    break e;
                                _ = 0;
                                do {
                                    Ee = i[s + _++],
                                    a.head && Ee && a.length < 65536 && (a.head.name += String.fromCharCode(Ee))
                                } while (Ee && _ < c);if (512 & a.flags && (a.check = y(a.check, i, _, s)),
                                    c -= _,
                                    s += _,
                                    Ee)
                                    break e
                            } else
                                a.head && (a.head.name = null);
                            a.length = 0,
                                a.mode = M;
                        case M:
                            if (4096 & a.flags) {
                                if (0 === c)
                                    break e;
                                _ = 0;
                                do {
                                    Ee = i[s + _++],
                                    a.head && Ee && a.length < 65536 && (a.head.comment += String.fromCharCode(Ee))
                                } while (Ee && _ < c);if (512 & a.flags && (a.check = y(a.check, i, _, s)),
                                    c -= _,
                                    s += _,
                                    Ee)
                                    break e
                            } else
                                a.head && (a.head.comment = null);
                            a.mode = W;
                        case W:
                            if (512 & a.flags) {
                                for (; g < 16; ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                if (f !== (65535 & a.check)) {
                                    e.msg = "header crc mismatch",
                                        a.mode = fe;
                                    break
                                }
                                f = 0,
                                    g = 0
                            }
                            a.head && (a.head.hcrc = a.flags >> 9 & 1,
                                a.head.done = !0),
                                e.adler = a.check = 0,
                                a.mode = J;
                            break;
                        case U:
                            for (; g < 32; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            e.adler = a.check = r(f),
                                f = 0,
                                g = 0,
                                a.mode = K;
                        case K:
                            if (0 === a.havedict)
                                return e.next_out = o,
                                    e.avail_out = l,
                                    e.next_in = s,
                                    e.avail_in = c,
                                    a.hold = f,
                                    a.bits = g,
                                    C;
                            e.adler = a.check = 1,
                                a.mode = J;
                        case J:
                            if (t === B || t === S)
                                break e;
                        case V:
                            if (a.last) {
                                f >>>= 7 & g,
                                    g -= 7 & g,
                                    a.mode = le;
                                break
                            }
                            for (; g < 3; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            switch (a.last = 1 & f,
                                f >>>= 1,
                                g -= 1,
                            3 & f) {
                                case 0:
                                    a.mode = Y;
                                    break;
                                case 1:
                                    if (d(a),
                                        a.mode = ae,
                                    t === S) {
                                        f >>>= 2,
                                            g -= 2;
                                        break e
                                    }
                                    break;
                                case 2:
                                    a.mode = Z;
                                    break;
                                case 3:
                                    e.msg = "invalid block type",
                                        a.mode = fe
                            }
                            f >>>= 2,
                                g -= 2;
                            break;
                        case Y:
                            for (f >>>= 7 & g,
                                     g -= 7 & g; g < 32; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            if ((65535 & f) != (f >>> 16 ^ 65535)) {
                                e.msg = "invalid stored block lengths",
                                    a.mode = fe;
                                break
                            }
                            if (a.length = 65535 & f,
                                f = 0,
                                g = 0,
                                a.mode = Q,
                            t === S)
                                break e;
                        case Q:
                            a.mode = X;
                        case X:
                            if (_ = a.length) {
                                if (_ > c && (_ = c),
                                _ > l && (_ = l),
                                0 === _)
                                    break e;
                                m.arraySet(n, i, s, _, o),
                                    c -= _,
                                    s += _,
                                    l -= _,
                                    o += _,
                                    a.length -= _;
                                break
                            }
                            a.mode = J;
                            break;
                        case Z:
                            for (; g < 14; ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            if (a.nlen = 257 + (31 & f),
                                f >>>= 5,
                                g -= 5,
                                a.ndist = 1 + (31 & f),
                                f >>>= 5,
                                g -= 5,
                                a.ncode = 4 + (15 & f),
                                f >>>= 4,
                                g -= 4,
                            a.nlen > 286 || a.ndist > 30) {
                                e.msg = "too many length or distance symbols",
                                    a.mode = fe;
                                break
                            }
                            a.have = 0,
                                a.mode = ee;
                        case ee:
                            for (; a.have < a.ncode; ) {
                                for (; g < 3; ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                a.lens[Se[a.have++]] = 7 & f,
                                    f >>>= 3,
                                    g -= 3
                            }
                            for (; a.have < 19; )
                                a.lens[Se[a.have++]] = 0;
                            if (a.lencode = a.lendyn,
                                a.lenbits = 7,
                                Ae = {
                                    bits: a.lenbits
                                },
                                we = E(w, a.lens, 0, 19, a.lencode, 0, a.work, Ae),
                                a.lenbits = Ae.bits,
                                we) {
                                e.msg = "invalid code lengths set",
                                    a.mode = fe;
                                break
                            }
                            a.have = 0,
                                a.mode = te;
                        case te:
                            for (; a.have < a.nlen + a.ndist; ) {
                                for (; Te = a.lencode[f & (1 << a.lenbits) - 1],
                                           _e = Te >>> 24,
                                           be = Te >>> 16 & 255,
                                           me = 65535 & Te,
                                           !(_e <= g); ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                if (me < 16)
                                    f >>>= _e,
                                        g -= _e,
                                        a.lens[a.have++] = me;
                                else {
                                    if (16 === me) {
                                        for (xe = _e + 2; g < xe; ) {
                                            if (0 === c)
                                                break e;
                                            c--,
                                                f += i[s++] << g,
                                                g += 8
                                        }
                                        if (f >>>= _e,
                                            g -= _e,
                                        0 === a.have) {
                                            e.msg = "invalid bit length repeat",
                                                a.mode = fe;
                                            break
                                        }
                                        Ee = a.lens[a.have - 1],
                                            _ = 3 + (3 & f),
                                            f >>>= 2,
                                            g -= 2
                                    } else if (17 === me) {
                                        for (xe = _e + 3; g < xe; ) {
                                            if (0 === c)
                                                break e;
                                            c--,
                                                f += i[s++] << g,
                                                g += 8
                                        }
                                        f >>>= _e,
                                            g -= _e,
                                            Ee = 0,
                                            _ = 3 + (7 & f),
                                            f >>>= 3,
                                            g -= 3
                                    } else {
                                        for (xe = _e + 7; g < xe; ) {
                                            if (0 === c)
                                                break e;
                                            c--,
                                                f += i[s++] << g,
                                                g += 8
                                        }
                                        f >>>= _e,
                                            g -= _e,
                                            Ee = 0,
                                            _ = 11 + (127 & f),
                                            f >>>= 7,
                                            g -= 7
                                    }
                                    if (a.have + _ > a.nlen + a.ndist) {
                                        e.msg = "invalid bit length repeat",
                                            a.mode = fe;
                                        break
                                    }
                                    for (; _--; )
                                        a.lens[a.have++] = Ee
                                }
                            }
                            if (a.mode === fe)
                                break;
                            if (0 === a.lens[256]) {
                                e.msg = "invalid code -- missing end-of-block",
                                    a.mode = fe;
                                break
                            }
                            if (a.lenbits = 9,
                                Ae = {
                                    bits: a.lenbits
                                },
                                we = E(A, a.lens, 0, a.nlen, a.lencode, 0, a.work, Ae),
                                a.lenbits = Ae.bits,
                                we) {
                                e.msg = "invalid literal/lengths set",
                                    a.mode = fe;
                                break
                            }
                            if (a.distbits = 6,
                                a.distcode = a.distdyn,
                                Ae = {
                                    bits: a.distbits
                                },
                                we = E(x, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, Ae),
                                a.distbits = Ae.bits,
                                we) {
                                e.msg = "invalid distances set",
                                    a.mode = fe;
                                break
                            }
                            if (a.mode = ae,
                            t === S)
                                break e;
                        case ae:
                            a.mode = re;
                        case re:
                            if (c >= 6 && l >= 258) {
                                e.next_out = o,
                                    e.avail_out = l,
                                    e.next_in = s,
                                    e.avail_in = c,
                                    a.hold = f,
                                    a.bits = g,
                                    k(e, p),
                                    o = e.next_out,
                                    n = e.output,
                                    l = e.avail_out,
                                    s = e.next_in,
                                    i = e.input,
                                    c = e.avail_in,
                                    f = a.hold,
                                    g = a.bits,
                                a.mode === J && (a.back = -1);
                                break
                            }
                            for (a.back = 0; Te = a.lencode[f & (1 << a.lenbits) - 1],
                                _e = Te >>> 24,
                                be = Te >>> 16 & 255,
                                me = 65535 & Te,
                                !(_e <= g); ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            if (be && 0 == (240 & be)) {
                                for (ve = _e,
                                         ye = be,
                                         ke = me; Te = a.lencode[ke + ((f & (1 << ve + ye) - 1) >> ve)],
                                         _e = Te >>> 24,
                                         be = Te >>> 16 & 255,
                                         me = 65535 & Te,
                                         !(ve + _e <= g); ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                f >>>= ve,
                                    g -= ve,
                                    a.back += ve
                            }
                            if (f >>>= _e,
                                g -= _e,
                                a.back += _e,
                                a.length = me,
                            0 === be) {
                                a.mode = ce;
                                break
                            }
                            if (32 & be) {
                                a.back = -1,
                                    a.mode = J;
                                break
                            }
                            if (64 & be) {
                                e.msg = "invalid literal/length code",
                                    a.mode = fe;
                                break
                            }
                            a.extra = 15 & be,
                                a.mode = ie;
                        case ie:
                            if (a.extra) {
                                for (xe = a.extra; g < xe; ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                a.length += f & (1 << a.extra) - 1,
                                    f >>>= a.extra,
                                    g -= a.extra,
                                    a.back += a.extra
                            }
                            a.was = a.length,
                                a.mode = ne;
                        case ne:
                            for (; Te = a.distcode[f & (1 << a.distbits) - 1],
                                       _e = Te >>> 24,
                                       be = Te >>> 16 & 255,
                                       me = 65535 & Te,
                                       !(_e <= g); ) {
                                if (0 === c)
                                    break e;
                                c--,
                                    f += i[s++] << g,
                                    g += 8
                            }
                            if (0 == (240 & be)) {
                                for (ve = _e,
                                         ye = be,
                                         ke = me; Te = a.distcode[ke + ((f & (1 << ve + ye) - 1) >> ve)],
                                         _e = Te >>> 24,
                                         be = Te >>> 16 & 255,
                                         me = 65535 & Te,
                                         !(ve + _e <= g); ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                f >>>= ve,
                                    g -= ve,
                                    a.back += ve
                            }
                            if (f >>>= _e,
                                g -= _e,
                                a.back += _e,
                            64 & be) {
                                e.msg = "invalid distance code",
                                    a.mode = fe;
                                break
                            }
                            a.offset = me,
                                a.extra = 15 & be,
                                a.mode = se;
                        case se:
                            if (a.extra) {
                                for (xe = a.extra; g < xe; ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                a.offset += f & (1 << a.extra) - 1,
                                    f >>>= a.extra,
                                    g -= a.extra,
                                    a.back += a.extra
                            }
                            if (a.offset > a.dmax) {
                                e.msg = "invalid distance too far back",
                                    a.mode = fe;
                                break
                            }
                            a.mode = oe;
                        case oe:
                            if (0 === l)
                                break e;
                            if (_ = p - l,
                            a.offset > _) {
                                if ((_ = a.offset - _) > a.whave && a.sane) {
                                    e.msg = "invalid distance too far back",
                                        a.mode = fe;
                                    break
                                }
                                _ > a.wnext ? (_ -= a.wnext,
                                    b = a.wsize - _) : b = a.wnext - _,
                                _ > a.length && (_ = a.length),
                                    pe = a.window
                            } else
                                pe = n,
                                    b = o - a.offset,
                                    _ = a.length;
                            _ > l && (_ = l),
                                l -= _,
                                a.length -= _;
                            do {
                                n[o++] = pe[b++]
                            } while (--_);0 === a.length && (a.mode = re);
                            break;
                        case ce:
                            if (0 === l)
                                break e;
                            n[o++] = a.length,
                                l--,
                                a.mode = re;
                            break;
                        case le:
                            if (a.wrap) {
                                for (; g < 32; ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f |= i[s++] << g,
                                        g += 8
                                }
                                if (p -= l,
                                    e.total_out += p,
                                    a.total += p,
                                p && (e.adler = a.check = a.flags ? y(a.check, n, p, o - p) : v(a.check, n, p, o - p)),
                                    p = l,
                                (a.flags ? f : r(f)) !== a.check) {
                                    e.msg = "incorrect data check",
                                        a.mode = fe;
                                    break
                                }
                                f = 0,
                                    g = 0
                            }
                            a.mode = de;
                        case de:
                            if (a.wrap && a.flags) {
                                for (; g < 32; ) {
                                    if (0 === c)
                                        break e;
                                    c--,
                                        f += i[s++] << g,
                                        g += 8
                                }
                                if (f !== (4294967295 & a.total)) {
                                    e.msg = "incorrect length check",
                                        a.mode = fe;
                                    break
                                }
                                f = 0,
                                    g = 0
                            }
                            a.mode = ue;
                        case ue:
                            we = R;
                            break e;
                        case fe:
                            we = D;
                            break e;
                        case ge:
                            return F;
                        case he:
                        default:
                            return L
                    }
                return e.next_out = o,
                    e.avail_out = l,
                    e.next_in = s,
                    e.avail_in = c,
                    a.hold = f,
                    a.bits = g,
                    (a.wsize || p !== e.avail_out && a.mode < fe && (a.mode < le || t !== T)) && u(e, e.output, e.next_out, p - e.avail_out) ? (a.mode = ge,
                        F) : (h -= e.avail_in,
                        p -= e.avail_out,
                        e.total_in += h,
                        e.total_out += p,
                        a.total += p,
                    a.wrap && p && (e.adler = a.check = a.flags ? y(a.check, n, p, e.next_out - p) : v(a.check, n, p, e.next_out - p)),
                        e.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === J ? 128 : 0) + (a.mode === ae || a.mode === Q ? 256 : 0),
                    (0 === h && 0 === p || t === T) && we === I && (we = q),
                        we)
            }
            function g(e) {
                if (!e || !e.state)
                    return L;
                var t = e.state;
                return t.window && (t.window = null),
                    e.state = null,
                    I
            }
            function h(e, t) {
                var a;
                return e && e.state ? (a = e.state,
                    0 == (2 & a.wrap) ? L : (a.head = t,
                        t.done = !1,
                        I)) : L
            }
            function p(e, t) {
                var a, r, i = t.length;
                return e && e.state ? (a = e.state,
                    0 !== a.wrap && a.mode !== K ? L : a.mode === K && (r = 1,
                    (r = v(r, t, i, 0)) !== a.check) ? D : u(e, t, i, i) ? (a.mode = ge,
                        F) : (a.havedict = 1,
                        I)) : L
            }
            var _, b, m = e("../utils/common"), v = e("./adler32"), y = e("./crc32"), k = e("./inffast"), E = e("./inftrees"), w = 0, A = 1, x = 2, T = 4, B = 5, S = 6, I = 0, R = 1, C = 2, L = -2, D = -3, F = -4, q = -5, j = 8, P = 1, G = 2, z = 3, $ = 4, O = 5, H = 6, N = 7, M = 8, W = 9, U = 10, K = 11, J = 12, V = 13, Y = 14, Q = 15, X = 16, Z = 17, ee = 18, te = 19, ae = 20, re = 21, ie = 22, ne = 23, se = 24, oe = 25, ce = 26, le = 27, de = 28, ue = 29, fe = 30, ge = 31, he = 32, pe = 852, _e = 592, be = 15, me = !0;
            a.inflateReset = s,
                a.inflateReset2 = o,
                a.inflateResetKeep = n,
                a.inflateInit = l,
                a.inflateInit2 = c,
                a.inflate = f,
                a.inflateEnd = g,
                a.inflateGetHeader = h,
                a.inflateSetDictionary = p,
                a.inflateInfo = "pako inflate (from Nodeca project)"
        }
            , {
                "../utils/common": 1,
                "./adler32": 3,
                "./crc32": 5,
                "./inffast": 7,
                "./inftrees": 9
            }],
        9: [function(e, t, a) {
            "use strict";
            var r = e("../utils/common")
                , i = 15
                , n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
                , s = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]
                , o = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]
                , c = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
            t.exports = function(e, t, a, l, d, u, f, g) {
                var h, p, _, b, m, v, y, k, E, w = g.bits, A = 0, x = 0, T = 0, B = 0, S = 0, I = 0, R = 0, C = 0, L = 0, D = 0, F = null, q = 0, j = new r.Buf16(16), P = new r.Buf16(16), G = null, z = 0;
                for (A = 0; A <= i; A++)
                    j[A] = 0;
                for (x = 0; x < l; x++)
                    j[t[a + x]]++;
                for (S = w,
                         B = i; B >= 1 && 0 === j[B]; B--)
                    ;
                if (S > B && (S = B),
                0 === B)
                    return d[u++] = 20971520,
                        d[u++] = 20971520,
                        g.bits = 1,
                        0;
                for (T = 1; T < B && 0 === j[T]; T++)
                    ;
                for (S < T && (S = T),
                         C = 1,
                         A = 1; A <= i; A++)
                    if (C <<= 1,
                    (C -= j[A]) < 0)
                        return -1;
                if (C > 0 && (0 === e || 1 !== B))
                    return -1;
                for (P[1] = 0,
                         A = 1; A < i; A++)
                    P[A + 1] = P[A] + j[A];
                for (x = 0; x < l; x++)
                    0 !== t[a + x] && (f[P[t[a + x]]++] = x);
                if (0 === e ? (F = G = f,
                    v = 19) : 1 === e ? (F = n,
                    q -= 257,
                    G = s,
                    z -= 257,
                    v = 256) : (F = o,
                    G = c,
                    v = -1),
                    D = 0,
                    x = 0,
                    A = T,
                    m = u,
                    I = S,
                    R = 0,
                    _ = -1,
                    L = 1 << S,
                    b = L - 1,
                1 === e && L > 852 || 2 === e && L > 592)
                    return 1;
                for (; ; ) {
                    y = A - R,
                        f[x] < v ? (k = 0,
                            E = f[x]) : f[x] > v ? (k = G[z + f[x]],
                            E = F[q + f[x]]) : (k = 96,
                            E = 0),
                        h = 1 << A - R,
                        p = 1 << I,
                        T = p;
                    do {
                        p -= h,
                            d[m + (D >> R) + p] = y << 24 | k << 16 | E | 0
                    } while (0 !== p);for (h = 1 << A - 1; D & h; )
                        h >>= 1;
                    if (0 !== h ? (D &= h - 1,
                        D += h) : D = 0,
                        x++,
                    0 == --j[A]) {
                        if (A === B)
                            break;
                        A = t[a + f[x]]
                    }
                    if (A > S && (D & b) !== _) {
                        for (0 === R && (R = S),
                                 m += T,
                                 I = A - R,
                                 C = 1 << I; I + R < B && !((C -= j[I + R]) <= 0); )
                            I++,
                                C <<= 1;
                        if (L += 1 << I,
                        1 === e && L > 852 || 2 === e && L > 592)
                            return 1;
                        _ = D & b,
                            d[_] = S << 24 | I << 16 | m - u | 0
                    }
                }
                return 0 !== D && (d[m + D] = A - R << 24 | 64 << 16 | 0),
                    g.bits = S,
                    0
            }
        }
            , {
                "../utils/common": 1
            }],
        10: [function(e, t, a) {
            "use strict";
            t.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
            }
        }
            , {}],
        11: [function(e, t, a) {
            "use strict";
            function r() {
                this.input = null,
                    this.next_in = 0,
                    this.avail_in = 0,
                    this.total_in = 0,
                    this.output = null,
                    this.next_out = 0,
                    this.avail_out = 0,
                    this.total_out = 0,
                    this.msg = "",
                    this.state = null,
                    this.data_type = 2,
                    this.adler = 0
            }
            t.exports = r
        }
            , {}],
        "/lib/inflate.js": [function(e, t, a) {
            "use strict";
            function r(e) {
                if (!(this instanceof r))
                    return new r(e);
                this.options = o.assign({
                    chunkSize: 16384,
                    windowBits: 0,
                    to: ""
                }, e || {});
                var t = this.options;
                t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits,
                0 === t.windowBits && (t.windowBits = -15)),
                !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
                t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
                    this.err = 0,
                    this.msg = "",
                    this.ended = !1,
                    this.chunks = [],
                    this.strm = new u,
                    this.strm.avail_out = 0;
                var a = s.inflateInit2(this.strm, t.windowBits);
                if (a !== l.Z_OK)
                    throw new Error(d[a]);
                this.header = new f,
                    s.inflateGetHeader(this.strm, this.header)
            }
            function i(e, t) {
                var a = new r(t);
                if (a.push(e, !0),
                    a.err)
                    throw a.msg || d[a.err];
                return a.result
            }
            function n(e, t) {
                return t = t || {},
                    t.raw = !0,
                    i(e, t)
            }
            var s = e("./zlib/inflate")
                , o = e("./utils/common")
                , c = e("./utils/strings")
                , l = e("./zlib/constants")
                , d = e("./zlib/messages")
                , u = e("./zlib/zstream")
                , f = e("./zlib/gzheader")
                , g = Object.prototype.toString;
            r.prototype.push = function(e, t) {
                var a, r, i, n, d, u, f = this.strm, h = this.options.chunkSize, p = this.options.dictionary, _ = !1;
                if (this.ended)
                    return !1;
                r = t === ~~t ? t : !0 === t ? l.Z_FINISH : l.Z_NO_FLUSH,
                    "string" == typeof e ? f.input = c.binstring2buf(e) : "[object ArrayBuffer]" === g.call(e) ? f.input = new Uint8Array(e) : f.input = e,
                    f.next_in = 0,
                    f.avail_in = f.input.length;
                do {
                    if (0 === f.avail_out && (f.output = new o.Buf8(h),
                        f.next_out = 0,
                        f.avail_out = h),
                        a = s.inflate(f, l.Z_NO_FLUSH),
                    a === l.Z_NEED_DICT && p && (u = "string" == typeof p ? c.string2buf(p) : "[object ArrayBuffer]" === g.call(p) ? new Uint8Array(p) : p,
                        a = s.inflateSetDictionary(this.strm, u)),
                    a === l.Z_BUF_ERROR && !0 === _ && (a = l.Z_OK,
                        _ = !1),
                    a !== l.Z_STREAM_END && a !== l.Z_OK)
                        return this.onEnd(a),
                            this.ended = !0,
                            !1;
                    f.next_out && (0 !== f.avail_out && a !== l.Z_STREAM_END && (0 !== f.avail_in || r !== l.Z_FINISH && r !== l.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i = c.utf8border(f.output, f.next_out),
                        n = f.next_out - i,
                        d = c.buf2string(f.output, i),
                        f.next_out = n,
                        f.avail_out = h - n,
                    n && o.arraySet(f.output, f.output, i, n, 0),
                        this.onData(d)) : this.onData(o.shrinkBuf(f.output, f.next_out)))),
                    0 === f.avail_in && 0 === f.avail_out && (_ = !0)
                } while ((f.avail_in > 0 || 0 === f.avail_out) && a !== l.Z_STREAM_END);return a === l.Z_STREAM_END && (r = l.Z_FINISH),
                    r === l.Z_FINISH ? (a = s.inflateEnd(this.strm),
                        this.onEnd(a),
                        this.ended = !0,
                    a === l.Z_OK) : r !== l.Z_SYNC_FLUSH || (this.onEnd(l.Z_OK),
                        f.avail_out = 0,
                        !0)
            }
                ,
                r.prototype.onData = function(e) {
                    this.chunks.push(e)
                }
                ,
                r.prototype.onEnd = function(e) {
                    e === l.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
                        this.chunks = [],
                        this.err = e,
                        this.msg = this.strm.msg
                }
                ,
                a.Inflate = r,
                a.inflate = i,
                a.inflateRaw = n,
                a.ungzip = i
        }
            , {
                "./utils/common": 1,
                "./utils/strings": 2,
                "./zlib/constants": 4,
                "./zlib/gzheader": 6,
                "./zlib/inflate": 8,
                "./zlib/messages": 10,
                "./zlib/zstream": 11
            }]
    }, {}, [])("/lib/inflate.js")
};
var _utf8ArrayToStr = function(e) {
    var t, a, r, i, n, s;
    for (t = "",
             r = e.length,
             a = 0; a < r; )
        switch ((i = e[a++]) >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                t += String.fromCharCode(i);
                break;
            case 12:
            case 13:
                n = e[a++],
                    t += String.fromCharCode((31 & i) << 6 | 63 & n);
                break;
            case 14:
                n = e[a++],
                    s = e[a++],
                    t += String.fromCharCode((15 & i) << 12 | (63 & n) << 6 | (63 & s) << 0)
        }
    return t
};

var load = (url,cb) => {
    var a = null;
    window.XMLHttpRequest && (a = new XMLHttpRequest),
    null != a && (a.open("GET", url, !0),
        a.responseType = "arraybuffer",
        a.onload = function(e) {
            cb(a, this)
        }
        ,
        a.send(null))
};
// 300 表示 5 分钟
// 1 表示第一个 5分钟的弹幕内容
url = 'https://cmts.iqiyi.com/bullet/61/00/4511576100_300_1.z?rn=0.7791105962241509&business=danmu&is_iqiyi=true&is_video_page=true&tvid=4511576100&albumid=4511576100&categoryid=1&qypid=01010021010000000000';

load(url, function(r, i) {
    var n = [];
    if (200 == i.status) {
        var s = r.response;
        if (s)
            try {
                var out = [];
                var o = new Uint8Array(s)
                    , c = _utf8ArrayToStr((new l).ungzip(o));
                var div = document.createElement('div');
                div.innerHTML = c;
                let entry = div.getElementsByTagName('entry');
                for (let i = 0;i < entry.length;i++) {
                    out.push({
                        time: + entry[i].children[0].innerText,
                        text: e[0].children[1].getElementsByTagName('content')[0].textContent
                    });
                }
            } catch (e) {}
    }
});
```