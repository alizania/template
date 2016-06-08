var numchars = (relatedSnippetDisplay >= 1) ? relatedSnippetChars : 0;
var imageStyle = (relatedImageDisplay >= 1) ? "display:block" : "display:none";
var relatedTitlesNum = 0;
var relatedUrl = new Array();
var relatedTitle = new Array();
var relatedSnippet = new Array();
var relatedImage = new Array();

function filtertags(g, h) {
    var e = g.split("<");
    for (var f = 0; f < e.length; f++) {
        if (e[f].indexOf(">") != -1) {
            e[f] = e[f].substring(e[f].indexOf(">") + 1, e[f].length)
        }
    }
    e = e.join("");
    e = e.substring(0, h - 1);
    return e
}
function getRelatedPost(h) {
    for (var e = 0; e < h.feed.entry.length; e++) {
        var g = h.feed.entry[e];
        relatedTitle[relatedTitlesNum] = g.title.$t;
        postcontent = "";
        if ("content" in g) {
            postcontent = g.content.$t
        } else {
            if ("summary" in g) {
                postcontent = g.summary.$t
            }
        }
        relatedSnippet[relatedTitlesNum] = filtertags(postcontent, numchars);
        if ("media$thumbnail" in g) {
            postimg = g.media$thumbnail.url.replace("/s72-c/", "/w" + relatedImage_w + "-h" + relatedImage_h + "-c/");
        } else {
            postimg = "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s1600/grey.GIF"
        }
        relatedImage[relatedTitlesNum] = postimg;
        for (var f = 0; f < g.link.length; f++) {
            if (g.link[f].rel == "alternate") {
                relatedUrl[relatedTitlesNum] = g.link[f].href;
                break
            }
        }
        relatedTitlesNum++
    }
}
function removeDuplicates() {
    var v = new Array(0);
    var w = new Array(0);
    var x = new Array(0);
    var A = new Array(0);
    for (var u = 0; u < relatedUrl.length; u++) {
        if (!contains(v, relatedUrl[u])) {
            v.length += 1;
            v[v.length - 1] = relatedUrl[u];
            w.length += 1;
            w[w.length - 1] = relatedTitle[u];
            x.length += 1;
            x[x.length - 1] = relatedSnippet[u];
            A.length += 1;
            A[A.length - 1] = relatedImage[u]
        }
    }
    relatedTitle = w;
    relatedUrl = v;
    relatedSnippet = x;
    relatedImage = A;
}
function contains(a, e) {
    for (var f = 0; f < a.length; f++) {
        if (a[f] == e) {
            return true
        }
    }
    return false
}
function relatedPost() {
    for (var u = 0; u < relatedTitle.length; u++) {
        var B = Math.floor((relatedTitle.length - 1) * Math.random());
        var i = relatedTitle[u];
        var s = relatedUrl[u];
        var y = relatedSnippet[u];
        var C = relatedImage[u];
        relatedTitle[u] = relatedTitle[B];
        relatedUrl[u] = relatedUrl[B];
        relatedSnippet[u] = relatedSnippet[B];
        relatedImage[u] = relatedImage[B];
        relatedTitle[B] = i;
        relatedUrl[B] = s;
        relatedSnippet[B] = y;
        relatedImage[B] = C
    }
    var r = 0;
    var D = Math.floor((relatedTitle.length - 1) * Math.random());
    var z = D;
    var q;
    var t = document.URL;
    while (r < relatedPostNum) {
        if (relatedUrl[D] != t) {
            q = "<li>";
            q += "<a href='" + relatedUrl[D] + "' rel='nofollow' target='_top' title='" + relatedTitle[D] + "'><div class='overlay'></div><img src='" + relatedImage[D] + "' style='"+imageStyle+"'/></a>";
            q += "<a class='title' href='" + relatedUrl[D] + "' target='_top'>" + relatedTitle[D] + "</a>";
            q += "<span class='snippet'>" + relatedSnippet[D] + "</span>";
            q += "</li>";
            document.write(q);
            r++;
            if (r == relatedPostNum) {
                break
            }
        }
        if (D < relatedTitle.length - 1) {
            D++
        } else {
            D = 0
        }
        if (D == z) {
            break
        }
    }
};
function printRelatedPost() {
    removeDuplicates();
    relatedPost();
};