
function edi(total){
    var readAsBinaryExif = function () {
        function w(e, f, a, d, b) {
            var c = e.getShortAt(f + 2, b);
            d = e.getLongAt(f + 4, b);
            a = e.getLongAt(f + 8, b) + a;
            switch (c) {
                case 1:
                case 7:
                    if (1 == d)return e.getByteAt(f + 8, b);
                    a = 4 < d ? a : f + 8;
                    f = [];
                    for (c = 0; c < d; c++)f[c] = e.getByteAt(a + c);
                    return f;
                case 2:
                    return e.getStringAt(4 < d ? a : f + 8, d - 1);
                case 3:
                    if (1 == d)return e.getShortAt(f + 8, b);
                    a = 2 < d ? a : f + 8;
                    f = [];
                    for (c = 0; c < d; c++)f[c] = e.getShortAt(a + 2 * c, b);
                    return f;
                case 4:
                    if (1 == d)return e.getLongAt(f + 8, b);
                    f = [];
                    for (c = 0; c < d; c++)f[c] = e.getLongAt(a + 4 * c, b);
                    return f;
                case 5:
                    if (1 ==
                        d)return e.getLongAt(a, b) / e.getLongAt(a + 4, b);
                    f = [];
                    for (c = 0; c < d; c++)f[c] = e.getLongAt(a + 8 * c, b) / e.getLongAt(a + 4 + 8 * c, b);
                    return f;
                case 9:
                    if (1 == d)return e.getSLongAt(f + 8, b);
                    f = [];
                    for (c = 0; c < d; c++)f[c] = e.getSLongAt(a + 4 * c, b);
                    return f;
                case 10:
                    if (1 == d)return e.getSLongAt(a, b) / e.getSLongAt(a + 4, b);
                    f = [];
                    for (c = 0; c < d; c++)f[c] = e.getSLongAt(a + 8 * c, b) / e.getSLongAt(a + 4 + 8 * c, b);
                    return f
            }
        }

        var p = {
                256: "ImageWidth",
                257: "ImageHeight",
                34665: "ExifIFDPointer",
                34853: "GPSInfoIFDPointer",
                40965: "InteroperabilityIFDPointer",
                258: "BitsPerSample",
                259: "Compression",
                262: "PhotometricInterpretation",
                274: "Orientation",
                277: "SamplesPerPixel",
                284: "PlanarConfiguration",
                530: "YCbCrSubSampling",
                531: "YCbCrPositioning",
                282: "XResolution",
                283: "YResolution",
                296: "ResolutionUnit",
                273: "StripOffsets",
                278: "RowsPerStrip",
                279: "StripByteCounts",
                513: "JPEGInterchangeFormat",
                514: "JPEGInterchangeFormatLength",
                301: "TransferFunction",
                318: "WhitePoint",
                319: "PrimaryChromaticities",
                529: "YCbCrCoefficients",
                532: "ReferenceBlackWhite",
                306: "DateTime",
                270: "ImageDescription",
                271: "Make",
                272: "Model",
                305: "Software",
                315: "Artist",
                33432: "Copyright"
            },
            r = function (e, f, a) {
                var d = e, b = f || 0, c = 0;
                this.getRawData = function () {
                    return d
                };
                "string" == typeof e ? (c = a || d.length, this.getByteAt = function (a) {
                    return d.charCodeAt(a + b) & 255
                }) : "unknown" == typeof e && (c = a || IEBinary_getLength(d), this.getByteAt = function (a) {
                    return IEBinary_getByteAt(d, a + b)
                });
                this.getLength = function () {
                    return c
                };
                this.getSByteAt = function (a) {
                    a = this.getByteAt(a);
                    return 127 < a ? a - 256 : a
                };
                this.getShortAt = function (a, b) {
                    var c = b ? (this.getByteAt(a) << 8) +
                    this.getByteAt(a + 1) : (this.getByteAt(a + 1) << 8) + this.getByteAt(a);
                    0 > c && (c += 65536);
                    return c
                };
                this.getSShortAt = function (a, b) {
                    var c = this.getShortAt(a, b);
                    return 32767 < c ? c - 65536 : c
                };
                this.getLongAt = function (a, b) {
                    var c = this.getByteAt(a), d = this.getByteAt(a + 1), e = this.getByteAt(a + 2), q = this.getByteAt(a + 3), c = b ? (((c << 8) + d << 8) + e << 8) + q : (((q << 8) + e << 8) + d << 8) + c;
                    0 > c && (c += 4294967296);
                    return c
                };
                this.getSLongAt = function (a, b) {
                    var c = this.getLongAt(a, b);
                    return 2147483647 < c ? c - 4294967296 : c
                };
                this.getStringAt = function (a, b) {
                    for (var c =
                        [], d = a, e = 0; d < a + b; d++, e++)c[e] = String.fromCharCode(this.getByteAt(d));
                    return c.join("")
                };
                this.getCharAt = function (a) {
                    return String.fromCharCode(this.getByteAt(a))
                };
                this.toBase64 = function () {
                    return window.btoa(d)
                };
                this.fromBase64 = function (a) {
                    d = window.atob(a)
                }
            };
        return function (e, f) {
            var a;
            a:{
                var d = new r(e);
                if (255 != d.getByteAt(0) || 216 != d.getByteAt(1))a = !1; else {
                    var b = 2;
                    for (a = d.getLength(); b < a;) {
                        if (255 != d.getByteAt(b)) {
                            a = !1;
                            break a
                        }
                        var c = d.getByteAt(b + 1);
                        if (22400 == c || 225 == c) {
                            b:if (a = d, c = b + 4, d.getShortAt(b +
                                    2, !0), "Exif" != a.getStringAt(c, 4))a = !1; else {
                                var h = void 0, d = c + 6;
                                if (18761 == a.getShortAt(d))h = !1; else if (19789 == a.getShortAt(d))h = !0; else {
                                    a = !1;
                                    break b
                                }
                                if (42 != a.getShortAt(d + 2, h) || 8 != a.getLongAt(d + 4, h))a = !1; else {
                                    for (var b = d + 8, c = p, g = a.getShortAt(b, h), D = {}, z = 0; z < g; z++) {
                                        var E = b + 12 * z + 2, q = c[a.getShortAt(E, h)];
                                        D[q] = w(a, E, d, b, h)
                                    }
                                    a = D
                                }
                            }
                            break a
                        }
                        b += 2 + d.getShortAt(b + 2, !0)
                    }
                    a = void 0
                }
            }
            return a[f] ? a[f] : ""
        }
    }();
    function JPEGEncoder(w) {
        function p(a, q) {
            for (var b = 0, c = 0, d = [], h = 1; 16 >= h; h++) {
                for (var e = 1; e <= a[h]; e++)d[q[c]] = [], d[q[c]][0] = b, d[q[c]][1] = h, c++, b++;
                b *= 2
            }
            return d
        }

        function r(a) {
            var q = a[0];
            for (a = a[1] - 1; 0 <= a;)q & 1 << a && (x |= 1 << m), a--, m--, 0 > m && (255 == x ? (e(255), e(0)) : e(x), m = 7, x = 0)
        }

        function e(a) {
            C.push(t[a])
        }

        function f(a) {
            e(a >> 8 & 255);
            e(a & 255)
        }

        function a(a, q, b, c, d) {
            var h = d[0], e = d[240], u, g, m, f, C, x, k, t, l, v = 0;
            for (u = 0; 8 > u; ++u) {
                g = a[v];
                m = a[v + 1];
                f = a[v + 2];
                C = a[v + 3];
                x = a[v + 4];
                k = a[v + 5];
                t = a[v + 6];
                l = a[v + 7];
                var p = g + l;
                g -= l;
                l = m +
                    t;
                m -= t;
                t = f + k;
                f -= k;
                k = C + x;
                C -= x;
                x = p + k;
                p -= k;
                k = l + t;
                l -= t;
                a[v] = x + k;
                a[v + 4] = x - k;
                x = .707106781 * (l + p);
                a[v + 2] = p + x;
                a[v + 6] = p - x;
                x = C + f;
                k = f + m;
                l = m + g;
                f = .382683433 * (x - l);
                C = .5411961 * x + f;
                x = 1.306562965 * l + f;
                k *= .707106781;
                f = g + k;
                g -= k;
                a[v + 5] = g + C;
                a[v + 3] = g - C;
                a[v + 1] = f + x;
                a[v + 7] = f - x;
                v += 8
            }
            for (u = v = 0; 8 > u; ++u)g = a[v], m = a[v + 8], f = a[v + 16], C = a[v + 24], x = a[v + 32], k = a[v + 40], t = a[v + 48], l = a[v + 56], p = g + l, g -= l, l = m + t, m -= t, t = f + k, f -= k, k = C + x, C -= x, x = p + k, p -= k, k = l + t, l -= t, a[v] = x + k, a[v + 32] = x - k, x = .707106781 * (l + p), a[v + 16] = p + x, a[v + 48] = p - x, x = C + f, k = f + m, l = m + g, f = .382683433 *
                (x - l), C = .5411961 * x + f, x = 1.306562965 * l + f, k *= .707106781, f = g + k, g -= k, a[v + 40] = g + C, a[v + 24] = g - C, a[v + 8] = f + x, a[v + 56] = f - x, v++;
            for (u = 0; 64 > u; ++u)v = a[u] * q[u], X[u] = 0 < v ? v + .5 | 0 : v - .5 | 0;
            a = X;
            for (q = 0; 64 > q; ++q)T[y[q]] = a[q];
            a = T[0] - b;
            b = T[0];
            0 == a ? r(c[0]) : (u = 32767 + a, r(c[n[u]]), r(R[u]));
            for (c = 63; 0 < c && 0 == T[c]; c--);
            if (0 == c)return r(h), b;
            for (a = 1; a <= c;) {
                for (q = a; 0 == T[a] && a <= c; ++a);
                q = a - q;
                if (16 <= q) {
                    u = q >> 4;
                    for (v = 1; v <= u; ++v)r(e);
                    q &= 15
                }
                u = 32767 + T[a];
                r(d[(q << 4) + n[u]]);
                r(R[u]);
                a++
            }
            63 != c && r(h);
            return b
        }

        function d(a) {
            0 >= a && (a = 1);
            100 < a && (a =
                100);
            if (Y != a) {
                for (var q = 0, q = 50 > a ? Math.floor(5E3 / a) : Math.floor(200 - 2 * a), d = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], u = 0; 64 > u; u++) {
                    var e = b((d[u] * q + 50) / 100);
                    1 > e ? e = 1 : 255 < e && (e = 255);
                    c[y[u]] = e
                }
                d = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
                    99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99];
                for (u = 0; 64 > u; u++)e = b((d[u] * q + 50) / 100), 1 > e ? e = 1 : 255 < e && (e = 255), h[y[u]] = e;
                q = [1, 1.387039845, 1.306562965, 1.175875602, 1, .785694958, .5411961, .275899379];
                for (u = d = 0; 8 > u; u++)for (e = 0; 8 > e; e++)g[d] = 1 / (c[y[d]] * q[u] * q[e] * 8), D[d] = 1 / (h[y[d]] * q[u] * q[e] * 8), d++;
                Y = a
            }
        }

        var b = Math.floor, c = Array(64), h = Array(64), g = Array(64), D = Array(64), z, E, q, u, R = Array(65535), n = Array(65535), X = Array(64), T = Array(64), C = [], x = 0, m = 7, ba = Array(64), ca = Array(64), k = Array(64), t = Array(256), l = Array(2048), Y, y = [0,
            1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], A = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], B = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], L = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], M = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87,
            88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250], N = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], G = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], H = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], I = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18,
            65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232,
            233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];
        this.encode = function (b, R) {
            R && d(R);
            C = [];
            x = 0;
            m = 7;
            f(65496);
            f(65504);
            f(16);
            e(74);
            e(70);
            e(73);
            e(70);
            e(0);
            e(1);
            e(1);
            e(0);
            f(1);
            f(1);
            e(0);
            e(0);
            f(65499);
            f(132);
            e(0);
            for (var n = 0; 64 > n; n++)e(c[n]);
            e(1);
            for (n = 0; 64 > n; n++)e(h[n]);
            var n = b.width, t = b.height;
            f(65472);
            f(17);
            e(8);
            f(t);
            f(n);
            e(3);
            e(1);
            e(17);
            e(0);
            e(2);
            e(17);
            e(1);
            e(3);
            e(17);
            e(1);
            f(65476);
            f(418);
            e(0);
            for (n = 0; 16 > n; n++)e(A[n + 1]);
            for (n = 0; 11 >= n; n++)e(B[n]);
            e(16);
            for (n = 0; 16 > n; n++)e(L[n + 1]);
            for (n = 0; 161 >= n; n++)e(M[n]);
            e(1);
            for (n = 0; 16 > n; n++)e(N[n + 1]);
            for (n = 0; 11 >= n; n++)e(G[n]);
            e(17);
            for (n = 0; 16 > n; n++)e(H[n + 1]);
            for (n = 0; 161 >= n; n++)e(I[n]);
            f(65498);
            f(12);
            e(3);
            e(1);
            e(0);
            e(2);
            e(17);
            e(3);
            e(17);
            e(0);
            e(63);
            e(0);
            var X = t = n = 0;
            x = 0;
            m = 7;
            this.encode.displayName = "_encode_";
            for (var p = b.data, T = b.height, w = 4 * b.width, y, s = 0, S, K, F, Y, U; s < T;) {
                for (y = 0; y < w;) {
                    Y = w * s + y;
                    for (U = 0; 64 > U; U++)K = U >> 3, S = 4 * (U & 7), F = Y + K * w + S, s + K >= T && (F -= w * (s + 1 + K - T)), y + S >= w && (F -= y + S - w + 4), S = p[F++], K = p[F++], F = p[F++], ba[U] = (l[S] + l[K + 256 >> 0] + l[F + 512 >> 0] >> 16) - 128, ca[U] = (l[S + 768 >>
                        0] + l[K + 1024 >> 0] + l[F + 1280 >> 0] >> 16) - 128, k[U] = (l[S + 1280 >> 0] + l[K + 1536 >> 0] + l[F + 1792 >> 0] >> 16) - 128;
                    n = a(ba, g, n, z, q);
                    t = a(ca, D, t, E, u);
                    X = a(k, D, X, E, u);
                    y += 32
                }
                s += 8
            }
            0 <= m && (n = [], n[1] = m + 1, n[0] = (1 << m + 1) - 1, r(n));
            f(65497);
            n = "data:image/jpeg;base64," + btoa(C.join(""));
            C = [];
            return n
        };
        (function () {
            w || (w = 50);
            for (var a = String.fromCharCode, b = 0; 256 > b; b++)t[b] = a(b);
            z = p(A, B);
            E = p(N, G);
            q = p(L, M);
            u = p(H, I);
            for (var a = 1, b = 2, c = 1; 15 >= c; c++) {
                for (var e = a; e < b; e++)n[32767 + e] = c, R[32767 + e] = [], R[32767 + e][1] = c, R[32767 + e][0] = e;
                for (e = -(b - 1); e <= -a; e++)n[32767 +
                e] = c, R[32767 + e] = [], R[32767 + e][1] = c, R[32767 + e][0] = b - 1 + e;
                a <<= 1;
                b <<= 1
            }
            for (a = 0; 256 > a; a++)l[a] = 19595 * a, l[a + 256 >> 0] = 38470 * a, l[a + 512 >> 0] = 7471 * a + 32768, l[a + 768 >> 0] = -11059 * a, l[a + 1024 >> 0] = -21709 * a, l[a + 1280 >> 0] = 32768 * a + 8421375, l[a + 1536 >> 0] = -27439 * a, l[a + 1792 >> 0] = -5329 * a;
            d(w)
        })()
    }
    (function () {
        var w = document.createElement("canvas");
        w.width = w.height = 1;
        0 !== w.toDataURL("image/jpeg").indexOf("data:image/jpeg") && (HTMLCanvasElement.prototype._toDataURL = HTMLCanvasElement.prototype.toDataURL, HTMLCanvasElement.prototype.toDataURL = function (p, w) {
            return "image/jpeg" == p ? (new JPEGEncoder).encode(this.getContext("2d").getImageData(0, 0, this.width, this.height), 100 * (w || .7)) : this._toDataURL(p)
        })
    })();
    (function () {
        function w(a, d, b, c, e, g) {
            a = f(f(d, a), f(c, g));
            return f(a << e | a >>> 32 - e, b)
        }

        function p(a, d, b, c, e, g, f) {
            return w(d & b | ~d & c, a, d, e, g, f)
        }

        function r(a, d, b, c, e, g, f) {
            return w(d & c | b & ~c, a, d, e, g, f)
        }

        function e(a, d, b, c, e, g, f) {
            return w(b ^ (d | ~c), a, d, e, g, f)
        }

        function f(a, d) {
            var b = (a & 65535) + (d & 65535);
            return (a >> 16) + (d >> 16) + (b >> 16) << 16 | b & 65535
        }

        window.md5 = function (a) {
            for (var d = [], b = 0; b < 8 * a.length; b += 8)d[b >> 5] |= (a.charCodeAt(b / 8) & 255) << b % 32;
            a = 8 * a.length;
            d[a >> 5] |= 128 << a % 32;
            d[(a + 64 >>> 9 << 4) + 14] = a;
            a = 1732584193;
            for (var b =
                -271733879, c = -1732584194, h = 271733878, g = 0; g < d.length; g += 16) {
                var D = a, z = b, E = c, q = h;
                a = p(a, b, c, h, d[g + 0], 7, -680876936);
                h = p(h, a, b, c, d[g + 1], 12, -389564586);
                c = p(c, h, a, b, d[g + 2], 17, 606105819);
                b = p(b, c, h, a, d[g + 3], 22, -1044525330);
                a = p(a, b, c, h, d[g + 4], 7, -176418897);
                h = p(h, a, b, c, d[g + 5], 12, 1200080426);
                c = p(c, h, a, b, d[g + 6], 17, -1473231341);
                b = p(b, c, h, a, d[g + 7], 22, -45705983);
                a = p(a, b, c, h, d[g + 8], 7, 1770035416);
                h = p(h, a, b, c, d[g + 9], 12, -1958414417);
                c = p(c, h, a, b, d[g + 10], 17, -42063);
                b = p(b, c, h, a, d[g + 11], 22, -1990404162);
                a = p(a, b, c, h, d[g + 12],
                    7, 1804603682);
                h = p(h, a, b, c, d[g + 13], 12, -40341101);
                c = p(c, h, a, b, d[g + 14], 17, -1502002290);
                b = p(b, c, h, a, d[g + 15], 22, 1236535329);
                a = r(a, b, c, h, d[g + 1], 5, -165796510);
                h = r(h, a, b, c, d[g + 6], 9, -1069501632);
                c = r(c, h, a, b, d[g + 11], 14, 643717713);
                b = r(b, c, h, a, d[g + 0], 20, -373897302);
                a = r(a, b, c, h, d[g + 5], 5, -701558691);
                h = r(h, a, b, c, d[g + 10], 9, 38016083);
                c = r(c, h, a, b, d[g + 15], 14, -660478335);
                b = r(b, c, h, a, d[g + 4], 20, -405537848);
                a = r(a, b, c, h, d[g + 9], 5, 568446438);
                h = r(h, a, b, c, d[g + 14], 9, -1019803690);
                c = r(c, h, a, b, d[g + 3], 14, -187363961);
                b = r(b, c, h, a,
                    d[g + 8], 20, 1163531501);
                a = r(a, b, c, h, d[g + 13], 5, -1444681467);
                h = r(h, a, b, c, d[g + 2], 9, -51403784);
                c = r(c, h, a, b, d[g + 7], 14, 1735328473);
                b = r(b, c, h, a, d[g + 12], 20, -1926607734);
                a = w(b ^ c ^ h, a, b, d[g + 5], 4, -378558);
                h = w(a ^ b ^ c, h, a, d[g + 8], 11, -2022574463);
                c = w(h ^ a ^ b, c, h, d[g + 11], 16, 1839030562);
                b = w(c ^ h ^ a, b, c, d[g + 14], 23, -35309556);
                a = w(b ^ c ^ h, a, b, d[g + 1], 4, -1530992060);
                h = w(a ^ b ^ c, h, a, d[g + 4], 11, 1272893353);
                c = w(h ^ a ^ b, c, h, d[g + 7], 16, -155497632);
                b = w(c ^ h ^ a, b, c, d[g + 10], 23, -1094730640);
                a = w(b ^ c ^ h, a, b, d[g + 13], 4, 681279174);
                h = w(a ^ b ^ c, h, a, d[g + 0],
                    11, -358537222);
                c = w(h ^ a ^ b, c, h, d[g + 3], 16, -722521979);
                b = w(c ^ h ^ a, b, c, d[g + 6], 23, 76029189);
                a = w(b ^ c ^ h, a, b, d[g + 9], 4, -640364487);
                h = w(a ^ b ^ c, h, a, d[g + 12], 11, -421815835);
                c = w(h ^ a ^ b, c, h, d[g + 15], 16, 530742520);
                b = w(c ^ h ^ a, b, c, d[g + 2], 23, -995338651);
                a = e(a, b, c, h, d[g + 0], 6, -198630844);
                h = e(h, a, b, c, d[g + 7], 10, 1126891415);
                c = e(c, h, a, b, d[g + 14], 15, -1416354905);
                b = e(b, c, h, a, d[g + 5], 21, -57434055);
                a = e(a, b, c, h, d[g + 12], 6, 1700485571);
                h = e(h, a, b, c, d[g + 3], 10, -1894986606);
                c = e(c, h, a, b, d[g + 10], 15, -1051523);
                b = e(b, c, h, a, d[g + 1], 21, -2054922799);
                a = e(a, b, c, h, d[g + 8], 6, 1873313359);
                h = e(h, a, b, c, d[g + 15], 10, -30611744);
                c = e(c, h, a, b, d[g + 6], 15, -1560198380);
                b = e(b, c, h, a, d[g + 13], 21, 1309151649);
                a = e(a, b, c, h, d[g + 4], 6, -145523070);
                h = e(h, a, b, c, d[g + 11], 10, -1120210379);
                c = e(c, h, a, b, d[g + 2], 15, 718787259);
                b = e(b, c, h, a, d[g + 9], 21, -343485551);
                a = f(a, D);
                b = f(b, z);
                c = f(c, E);
                h = f(h, q)
            }
            d = [a, b, c, h];
            a = "";
            for (b = 0; b < 4 * d.length; b++)a += "0123456789abcdef".charAt(d[b >> 2] >> b % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(d[b >> 2] >> b % 4 * 8 & 15);
            return a
        }
    })();
    (function(){

        var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
        var isWIFI = navigator.userAgent.indexOf('NetType/WIFI') !== -1;
        var isWX =  navigator.userAgent.indexOf('Messenger') !== -1;

        var isMobile = navigator.userAgent.match(/(?:Windows Phone|SymbianOS|Android|iPad|iPod|iPhone)/);
        isMobile = isMobile ? isMobile[0] : false;

        function I(id){
            return document.getElementById(id);
        };
        function Q(s, p){
            return (p || document).querySelector(s);
        };
        function QA(s, p){
            return (p || document).querySelectorAll(s);
        };
        var readCookie = function(l){var i="",I=l+"=";if(document.cookie.length>0){var offset=document.cookie.indexOf(I);if(offset!=-1){offset+=I.length;var end=document.cookie.indexOf(";",offset);if(end==-1)end=document.cookie.length;i=document.cookie.substring(offset,end)}};return unescape(i)},
            writeCookie = function(O,o,l,I){var i="",c="";if(l!=null){i=new Date((new Date).getTime()+l*3600000);i="; expires="+i.toGMTString()};if(I!=null){c=";domain="+I};document.cookie=O+"="+escape(o)+i+c};

        if(isWX){
            if(location.host.indexOf('.people.com.cn') === -1){
                location.href = 'http://wx.people.com.cn/wx/thisyear';
                return;
            };
        };
        var localCache = {
            name : 'thisyear',
            get : function(name){
                if(/[&\\=\|\?%]/.test(name)){
                    alert('name不能包含特殊符号');
                    return;
                };
                if(window.localStorage){
                    var str = window.localStorage[this.name] || '';
                    var val = str.match(RegExp('(?:^|&)' + name + '=([^&]*)'));
                    if(val){
                        return decodeURIComponent(val[1]);
                    }else{
                        return;
                    };
                }
            },
            set : function(name, value){
                if(/[&\\=\|\?%]/.test(name)){
                    alert('name不能包含特殊符号');
                    return false;
                };
                if(window.localStorage){
                    var str = window.localStorage[this.name] || '';
                    if(this.get(name) === undefined){
                        str += (str === '' ? '' : '&') + name + '=' + value.replace(/&/g, '%26').replace(/=/g, '%3D');
                    }else{
                        str = str.replace(RegExp('(^|&)' + name + '=([^&]*)'), '$1' + name + '=' + encodeURIComponent(value));
                    }
                    window.localStorage[this.name] = str;
                    return true;
                };
                return false;
            },
            del : function(name){
                if(/[&\\=\|\?%]/.test(name)){
                    alert('name不能包含特殊符号');
                    return false;
                };
                if(window.localStorage){
                    if(this.get(name) !== undefined){
                        var str = window.localStorage[this.name] || '';
                        str = str.replace(RegExp('(^|&)' + name + '=([^&]*)'), '');
                        window.localStorage[this.name] = str.replace(/^&/, '');
                        return true;
                    };
                };
                return false;
            },
            clear : function(){
                if(window.localStorage){
                    window.localStorage[this.name] = '';
                }
            }
        }
        var viewWidth = document.body.clientWidth,
            viewHeight = document.body.clientHeight;
        var imageLoader = {
            ready : true,
            limit : total, //图数量限制
            maxWidth : 500,
            maxHeight : 550,
            type : 'jpeg', //jpeg | png | gif | *
            num : 0,
            init : function(){
                var _self = this;
                this.$fileRef = $('<div style="width:1px;height:1px;overflow:hidden;position:absolute;z-index:900;left:-10px;top:-10px;"></div>').prependTo(document.body);

                this.$form = $('<form method="post" enctype="multipart/form-data" target="enteUploadImgFrame" class="ente_uploadForm" style="width:260px;"><div class="ente_f"><input type="file" multiple="multiple" accept="image/' + this.type + '" name="upload" /></div></form>');

                this.$fileRef.append(this.$form);

                this.$file = this.$form.find('input[type=file]');
                this.$fileBox =  this.$form.find('.ente_f');

                this.$form.css('opacity', '0');

                if(iOS){
                    var s = 0;
                    var _endFn = function(){
                        s ++;
                        if(s >= 3 && _self.$file[0].files.length == 0 && typeof _self.oncomplete == 'function'){
                            _self.oncomplete();
                            $(document).unbind('touchstart', _endFn);
                        };
                    };
                    this.$file.click(function(){
                        if(typeof _self.onbegin == 'function'){
                            _self.onbegin();
                            $(document).bind('touchstart', _endFn);
                        };
                    });
                };
                this.$file.change(function(){
                    console.log(this);
                    if(!iOS){
                        if(typeof _self.onbegin == 'function'){
                            _self.onbegin();
                            $(document).bind('touchstart', _endFn);
                        };
                    };
                    $(document).unbind('touchstart', _endFn);
                    _self.setDisabled(true);
                    _self._push(this);
                });
            },
            bind : function($input){ //绑定图片和输入框
                var _self = this;
                $input = $($input);
                $input.mouseover(function(){
                    _self.coverTarget($input);
                });
                this.coverTarget($input);
            },
            _loadQueue : [],
            _load : function(){
                if(this._loadQueue.length){
                    var file = this._loadQueue.shift();
                    if(file){
                        if((file.size)/1024/1024>1.5){
                            alert('请上传小于1.5M的图片');
                            hideMessage();
                            return;
                        };
                        this._readExif(file);
                    };
                };
            },
            _push : function(input){
                var _self = this;
                this.sum = 0;
                this.num = 0;
                for (var i = 0; i < input.files.length; i++) {
                    if(i >= this.limit){break;}
                    this._loadQueue.push(input.files[i]);
                    console.dir(this._loadQueue)
                    this.sum ++;
                    _self._load();
                };

            },
            _readExif : function(file, worker){
                var _self = this;
                var url = (window.URL || window.webkitURL).createObjectURL(file);

                //读取文件exif
                if(file){
                    try{
                        var reader = new FileReader();
                        reader.onload = function(e){
                            console.log(e)
                            var orientation = readAsBinaryExif(this.result, 'Orientation');
                            _self._readFile(url, orientation, worker);
                        };
                        reader.onerror = function(e){
                            _self._readFile(url, 0, worker);
                        }
                        reader.readAsBinaryString(file);
                    }catch(e){
                        this._readFile(url, 0, worker);
                    }
                }
            },
            _readFile : function(url, orientation, worker){
                /* 生成图片
                 * ---------------------- */
                var _self = this;
                var img = new Image();
                var orien = orientation || 0;
                var iOS = navigator.userAgent.match(/ OS (\d+).*? Mac OS/) || false;
                if(iOS){
                    iOS = parseInt(iOS[1]);
                };

                img.onload = function(){
                    var width = img.width, height = img.height, scale = width / height,
                        cc, c2, ctx, data, squash = 1;
                    if(Math.max(width, height) > 3000){
                        width = width * 0.8;
                        height = height * 0.8;
                    }
                    if(iOS && iOS < 8){ //修正 iOS8 之前的bug
                        cc = document.createElement('canvas');
                        cc.width = width;
                        cc.height = height;
                        ctx = cc.getContext('2d');

                        ctx.drawImage(img, 0, 0, width, height);

                        data = ctx.getImageData(0, 0, 1, height).data;
                        squash = _self._detectSquash(data, height, 0);

                        var sum = 0;
                        while(squash != 1 && sum < 3){
                            sum ++;
                            var c2 = document.createElement('canvas');
                            c2.width = width;
                            c2.height = height;
                            ctx = c2.getContext('2d');

                            ctx.drawImage(cc, 0, 0, width, height / squash);

                            data = ctx.getImageData(0, 0, 1, height).data;
                            squash = _self._detectSquash(data, height, 0);
                            if(squash != 1){
                                width = width * 0.8;
                                height = height * 0.8;
                            }
                            cc = c2;
                        };
                        data = null;
                    }else{
                        cc = img;
                    };

                    var temp;
                    if(orien == 6 || orien == 8){
                        temp = width;
                        width = height;
                        height = temp;
                        scale = width / height;
                    };
                    if(width > _self.maxWidth){
                        width = parseInt(_self.maxWidth);
                        height = parseInt(width / scale);
                    }

                    if(height > _self.maxHeight){
                        height = parseInt(_self.maxHeight);
                        width = parseInt(height * scale);
                    };

                    // //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;

                    switch(orien){
                        case 3: //180度
                            ctx.rotate(180 * Math.PI / 180);
                            ctx.drawImage(cc, -width, -height, width, height);
                            break;
                        case 6: //90度
                            ctx.rotate(90 * Math.PI / 180);
                            ctx.drawImage(cc, 0, -width, height, width);
                            break;
                        case 8: //270度
                            ctx.rotate(270 * Math.PI / 180);
                            ctx.drawImage(cc, -height, 0, height, width);
                            break;
                        default:
                            ctx.rotate(0);
                            ctx.drawImage(cc, 0, 0, width, height);
                            break;
                    }

                    var base64;

                    base64 = canvas.toDataURL('image/jpeg', 0.7);

                    canvas = _self.zoomCanvas(canvas, 80, 80);
                    ctx = canvas.getContext('2d');

                    smallBase64 = canvas.toDataURL('image/jpeg', 0.7);

                    if(typeof _self.onadd == 'function'){
                        _self.add(base64, smallBase64);
                    };
                    _self._load();


                }
                img.onerror = function(){
                    _self.onerror('没有权限访问文件');
                    alert('由于安全限制，无法从手机中读取照片，请尝试在浏览器中打开，使用拍照上传。');
                };
                img.src = url;

            },
            zoomCanvas : function(cc, toW, toH){ //缩放
                var canvas, cvs1, cvs2, ctx1, ctx2, w = cc.width, h = cc.height, x = 0, y = 0, sw = w, sh = h;
                if(w / toW > 1.8){ //阶梯缩小，避免锯齿
                    cvs1 = document.createElement('canvas');
                    cvs2 = document.createElement('canvas');
                    ctx1 = cvs1.getContext('2d');
                    ctx2 = cvs2.getContext('2d');
                    cvs1.width = w;
                    cvs1.height = h;

                    ctx1.drawImage(cc, 0, 0, w, h);

                    while(w / toW > 1.8){
                        w = Math.round(w * 0.6);
                        h = Math.round(h * 0.6);

                        cvs2.width = w;
                        cvs2.height = h;
                        ctx2.drawImage(cvs1, 0, 0, w, h);

                        cvs1.width = w;
                        cvs1.height = h;
                        ctx1.drawImage(cvs2, 0, 0, w, h);
                    }
                    canvas = cvs1;
                }else{
                    canvas = cc;
                };
                if(canvas.width > canvas.height){
                    sw = canvas.height / toH * toW;
                    sh = canvas.height;
                    x = (canvas.width - (canvas.height / toH * toW)) / 2;
                    y = 0;
                }else{
                    sw = canvas.width;
                    sh = canvas.width / toW * toH;
                    x = 0;
                    y = (canvas.height - (canvas.width / toW * toH)) / 2;
                };

                var nCanvas = document.createElement('canvas');
                nCanvas.width = toW;
                nCanvas.height = toH;
                var ctx = nCanvas.getContext('2d');
                ctx.drawImage(canvas, x, y, sw, sh, 0, 0, toW, toH);
                return nCanvas;
            },
            error : function(msg){
                if(typeof this.onerror == 'function'){
                    this.onerror(msg);
                };
                this.setDisabled(false);
                this.$file.val('');
            },
            add : function(data, smallData){
                if(typeof this.onadd == 'function'){
                    this.onadd(data, smallData);
                };
                this.num ++;

                if(typeof this.onprogress == 'function'){
                    this.onprogress(this.num / this.sum);
                };
                if(this.num == this.sum){
                    this.setDisabled(false);
                    this.$file.val('');
                    if(typeof this.oncomplete == 'function'){
                        this.oncomplete();
                    };
                };
            },
            _detectSquash : function(data, width, orien) {
                switch(orien){
                    case 3://180
                    case 6://90
                        for (var i = width - 1; i >= 0; i--) {
                            if(data[i * 4 + 3] === 0){
                                break;
                            };
                        };
                        i = width - 2 - i;

                        break;
                    case 8://270
                    default:
                        for (var i = 0; i < width; i++) {
                            if(data[i * 4 + 3] === 0){
                                break;
                            };
                        };
                        i = i - 1;
                        break;

                }
                if(width - i <= 2){
                    return 1;
                };
                var ratio = (i / (width - 1));
                return (ratio<=0)?1:ratio;
            },
            coverTarget : function($target, $input){
                this.$target = $target;
                this.$input = $input;
                var offset = $target.offset();

                this.$fileRef.css({
                    width : $target.width(),
                    height : $target.height(),
                    left : offset.left,
                    top : offset.top
                });

                this.$fileRef.show();

                //修正IE 8、9位置bug
                if(this.revise){
                    return;
                }else if(navigator.userAgent.indexOf('MSIE 8') !== -1){
                    this.$fileBox.css('left', '-183px');
                }else if(navigator.userAgent.match(/MSIE (9|10)/)){
                    this.$fileBox.css('left', '-' + (this.$fileBox[0].offsetWidth * 15 - this.$target[0].offsetWidth) + 'px');
                }else if(navigator.userAgent.indexOf('MSIE') === -1){
                    this.$fileBox.css('left', '-100px');
                };
                this.revise = true;
            },
            setDisabled : function(s){
                var s = !!s;
                this.ready = !s;
                if(s){
                    this.$form.hide();
                }else{
                    this.$form.show();
                }
            },
            hide : function(){
                this.$fileRef.hide();
            },
            show : function(){
                this.$fileRef.show();
            }
        };
        imageLoader.onbegin = function(){
            showMessage('处理照片中，请稍后...');
        };
        imageLoader.onadd = function(bigBase64, smallBase64){
            editor.addImage(bigBase64, smallBase64);
        };
        imageLoader.onprogress = function(p){
            showMessage('处理照片中，进度' + (Math.round(p * 10000) / 100) + '%');
        };
        imageLoader.oncomplete = function(){
            hideMessage();
        };
        imageLoader.init();
        imageLoader.bind('#addImage');
        function showMessage(str){
            $('#promptLayer').show();
            $('#promptLayer .p_cont').css({width: viewWidth, height:viewHeight});
            $('#promptLayer .txt').css({width: viewWidth, height:viewHeight});
            $('#promptLayer .txt').html(str);
        };
        function hideMessage(){
            $('#promptLayer').hide();
        };
        //编辑器
        var editor = {
            page : 1,
            imagePath : '../images/',
            elementsPath : '../images/',
            elements : [ //需要加载的元素

            ],
            style : 1,
            items : [],
            limit : total,
            init : function(){
                var _self = this;
                $('.e_page_1 ol li a').click(function(){
                    _self.setStyle( parseInt( this.getAttribute('data-style') ) );
                });

                $('.preview').click(function(){
                    console.log(1)
                    _self.preview();
                });
            },
            addImage : function(img, smallBase64){
                var _self = this;
                if(this.items.length >= this.limit){
                    return;
                };
                var item = {};
                item.smallBase64 = smallBase64;
                item.li = document.createElement('li');
                item.img = new Image();
                var span = document.createElement('span');
                item.img.src = img;
                item.li.appendChild(span);
                span.appendChild(item.img);
                var txtIcon = document.createElement('i');
                item.li.appendChild(txtIcon);
                $('#addItemBtn').before(item.li);

                item.isDefaTxt = true;
                $(item.li).find('i').click(function(){
                    _self.delItem(item);
                });
                this.items.push(item);
                this.checkLimit();
            },
            checkLimit : function(){
                if(this.items.length >= this.limit){
                    $('#addItemBtn').hide();
                    imageLoader.hide();
                }else{
                    $('#addItemBtn').show();
                    imageLoader.bind('#addImage');
                    imageLoader.show();
                    imageLoader.limit = this.limit - this.items.length;
                }
            },
            delItem : function(item){
                console.log(item)
                if(!item){
                    return;
                };
                var items = [];
                for (var i = 0; i < this.items.length; i++) {
                    console.log(this.items)
                    if(this.items[i] != item){
                        items.push(this.items[i]);
                    }else{
                        $(item.li).remove();
                    };
                };
                this.items = items;
                this.checkLimit();
            },
            uploadImg : function(){
                var _self = this;
                showMessage('图片上传中...');
                this.uploadIndex = -1;

                //统计进度
                var total = 0, sumSize = 0;
                for (var i = 0; i < this.items.length; i++) {
                    if(!this.items[i].imgUrl){
                        total += this.items[i].smallBase64.length + this.items[i].img.src.length;
                    };
                };

                var API = '/wx2015ImageUpload.action';
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4 && xhr.status == 200){
                        //上传完成
                        var rTxt = xhr.responseText;
                        if(rTxt && (/^\d+$/).test(rTxt)){
                            var imgUrl = getImgPath(rTxt);

                            //成功
                            _self.items[_self.uploadIndex].imgUrl = imgUrl;
                            //cache
                            localCache.set('img_' + _self.items[_self.uploadIndex].md5, imgUrl);

                            sumSize += _self.items[_self.uploadIndex].smallBase64.length + _self.items[_self.uploadIndex].img.src.length;

                            //下一张
                            postImg();

                        }else{
                            alert('图片上传失败，请稍后再试！code:600');
                            hideMessage();
                        };
                    }else if(xhr.readyState == 4){
                        alert('网络忙，请稍后再试！code:' + xhr.status);
                        hideMessage();
                    };
                };
                xhr.ontimeout = function(e){
                    alert('上传超时，请在较好的网络环境中再试！');
                    hideMessage();
                }
                if(xhr.upload)xhr.upload.onprogress = function(e){
                    if(e.lengthComputable) {
                        var p = (sumSize + e.loaded) / total;
                        p = p > 1 ? 1 : p;
                        showMessage('图片上传进度' + '<br>' + Math.round(total/1024) + 'k/' + Math.round(p * 100) + '%');
                    };
                };
                function postImg(){
                    _self.uploadIndex ++;
                    if(_self.uploadIndex >= _self.items.length){
                        //全部完成
                        _self.uploadJSON();
                        return;
                    };
                    if(_self.items[_self.uploadIndex].imgUrl){
                        postImg();
                        return;
                    };
                    xhr.open('POST', API, true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    var data = 'dataStr=' + encodeURIComponent(_self.items[_self.uploadIndex].img.src.substr(23)) + '&dataSmall=' + encodeURIComponent(_self.items[_self.uploadIndex].smallBase64.substr(23));
                    xhr.send(data);
                };
                postImg();
            },
            preview : function() {
                if (this.items.length == 0) {
                    alert('至少需要添加1张照片，请点击“+”按钮添加照片。');
                    return;
                }
            }
        };
        $('.loadingPage').hide();
        editor.init()
    })();
}