if (!window.RTE_DefaultConfig) window.RTE_DefaultConfig = {};

// 2026-06-09 Document import — the natural pair to Export-to-Word/Markdown/PDF.
// Opens a local file and loads it into the editor. Library-free for the common
// formats: Markdown (.md/.markdown via the core fromMarkdown engine), HTML
// (.html/.htm), plain text (.txt), and Word's HTML-based format (.doc, which
// Word saves as MSO-flavored HTML) — Word junk (mso-* styles, o:/w: tags,
// conditional comments) is stripped the same way paste-from-Word is.
//
// .docx IS parsed library-free: it is a ZIP of XML, and the ZIP central
// directory is read directly while DecompressionStream("deflate-raw") handles
// the inflate. No dependency, no server round-trip.
// (This comment used to say .docx was not parseable library-free. That was true
// when it was written and stopped being true when the ZIP reader landed below;
// it then misled a reader into reporting the feature as missing. Kept explicit
// so it does not happen again.)
//
// 2026-07-28 fidelity pass — what a naive converter silently loses, and what
// this now preserves:
//   - HYPERLINK URLS. w:hyperlink carries only an r:id; the address lives in
//     word/_rels/document.xml.rels. Without resolving it every link imports as
//     plain text with the URL discarded.
//   - IMAGES. w:drawing -> a:blip r:embed -> word/media/*, inlined as data URIs
//     (set config.documentImportImages = false to skip, for image-heavy files).
//   - ORDERED vs BULLET lists and NESTING. document.xml stores every list the
//     same way; only word/numbering.xml says which is which, so a naive reader
//     turns numbered lists into bullets. w:ilvl gives real nesting, placed
//     inside the parent <li> so the markup is valid.
//   - Paragraph alignment (w:jc).
// Supply config.documentImportResolver(file) to override any type (e.g. to run
// a server-side converter for formats this does not cover).
//
// API:
//   editor.openImportDialog(options?)        -> file picker, then import
//   editor.importFile(file, options?)        -> import a File object (Promise)
//   editor.htmlFromImportText(text, kind)     -> convert text to HTML (kind: md|html|txt|doc)
// Command: exec_command "importdocument" opens the picker. Slash: "/import".
// Config:
//   config.documentImport = false                 // disable
//   config.documentImportMode = "replace" | "insert"   // default "replace"
//   config.documentImportAccept = ".md,.markdown,.html,.htm,.txt,.doc,.docx"
//   config.documentImportResolver = function(file){ return htmlOrPromise; }
RTE_DefaultConfig.plugin_documentimport = RTE_Plugin_DocumentImport;
if (typeof RTE_DefaultConfig.documentImport === "undefined") RTE_DefaultConfig.documentImport = true;

function RTE_Plugin_DocumentImport() {
    var obj = this;
    var config, editor;

    obj.PluginName = "DocumentImport";

    obj.InitConfig = function (argconfig) { config = argconfig; };

    obj.InitEditor = function (argeditor) {
        editor = argeditor;
        if (config.documentImport === false) return;

        editor.htmlFromImportText = function (text, kind) { return toHtml(String(text == null ? "" : text), kind); };
        editor.importFile = function (file, options) { return importFile(file, options || {}); };
        editor.openImportDialog = function (options) { return openPicker(options || {}); };

        editor.attachEvent("exec_command_importdocument", function (state) {
            state.returnValue = true;
            state.stopBubble = true;
            openPicker({});
        });

        if (editor.slashCommands && typeof editor.slashCommands.register === "function") {
            try {
                editor.slashCommands.register({
                    id: "import-document",
                    title: "Import document",
                    description: "Open a Markdown, HTML, text, or Word (.doc) file into the editor",
                    keywords: ["import", "open", "file", "word", "markdown", "upload"],
                    action: function () { openPicker({}); }
                });
            } catch (e) {}
        }
    };

    function kindFromName(name) {
        var n = String(name || "").toLowerCase();
        if (/\.(md|markdown|mdown|mkd)$/.test(n)) return "md";
        if (/\.html?$/.test(n)) return "html";
        if (/\.doc$/.test(n)) return "doc";
        if (/\.docx$/.test(n)) return "docx";
        if (/\.txt$/.test(n)) return "txt";
        return "txt";
    }

    function esc(s) {
        return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Strip Word/MSO debris from .doc HTML (same intent as paste-from-Word).
    function cleanWordHtml(html) {
        var h = String(html || "");
        // body only, drop head/xml/style islands and conditional comments
        var bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(h);
        if (bodyMatch) h = bodyMatch[1];
        h = h.replace(/<!--\[if[\s\S]*?\[endif\]-->/gi, "");
        h = h.replace(/<!--[\s\S]*?-->/g, "");
        h = h.replace(/<\/?(o:p|o:|w:|xml|style|meta|link|title|head)[^>]*>/gi, "");
        h = h.replace(/<\\?\?xml[^>]*>/gi, "");
        // strip mso-* declarations + empty style/class/lang attrs
        h = h.replace(/\sstyle="[^"]*"/gi, function (m) {
            var cleaned = m.replace(/mso-[^;"]*;?/gi, "").replace(/style="\s*;*\s*"/i, "");
            return /style="\s*"/.test(cleaned) || cleaned === ' style=""' ? "" : cleaned;
        });
        h = h.replace(/\sclass="Mso[^"]*"/gi, "");
        h = h.replace(/\s(lang|xmlns(:\w+)?)="[^"]*"/gi, "");
        return h;
    }

    function toHtml(text, kind) {
        switch (kind) {
            case "md":
                if (editor && typeof editor.fromMarkdown === "function") return editor.fromMarkdown(text, { apply: false });
                return "<p>" + esc(text).replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>") + "</p>";
            case "html":
                return text;
            case "doc":
                return cleanWordHtml(text);
            case "txt":
            default:
                var paras = String(text).replace(/\r\n?/g, "\n").split(/\n{2,}/);
                return paras.map(function (p) {
                    return "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>";
                }).join("");
        }
    }

    function applyHtml(html, mode) {
        if (html == null) return false;
        if (mode === "insert") {
            if (typeof editor.insertHTML === "function") { editor.insertHTML(html); return true; }
        }
        if (typeof editor.setHTMLCode === "function") { editor.setHTMLCode(html); return true; }
        return false;
    }

    function importFile(file, options) {
        var mode = options.mode || config.documentImportMode || "replace";
        return new Promise(function (resolve) {
            if (!file) { resolve(false); return; }
            var kind = kindFromName(file.name);

            // BYOK resolver wins for any type (lets a host handle .docx etc.).
            if (typeof config.documentImportResolver === "function") {
                try {
                    var r = config.documentImportResolver(file);
                    Promise.resolve(r).then(function (html) {
                        if (typeof html === "string") { resolve(applyHtml(html, mode)); }
                        else { builtin(); }
                    }, function () { builtin(); });
                    return;
                } catch (e) { builtin(); return; }
            }
            builtin();

            function builtin() {
                if (kind === "docx") {
                    // Library-free .docx: unzip word/document.xml (native
                    // DecompressionStream) + transform WordprocessingML -> HTML.
                    if (!docxSupported()) {
                        notify("This browser can't unpack .docx (no DecompressionStream). Save as .doc/.html/.md, or wire config.documentImportResolver.");
                        resolve(false);
                        return;
                    }
                    readDocx(file).then(function (html) {
                        if (html != null) resolve(applyHtml(html, mode));
                        else { notify("Could not read this .docx file."); resolve(false); }
                    }, function () { notify("Could not read this .docx file."); resolve(false); });
                    return;
                }
                if (typeof FileReader === "undefined") { resolve(false); return; }
                var reader = new FileReader();
                reader.onload = function () {
                    var html = toHtml(reader.result, kind);
                    resolve(applyHtml(html, mode));
                };
                reader.onerror = function () { resolve(false); };
                reader.readAsText(file);
            }
        });
    }

    function openPicker(options) {
        try {
            var input = document.createElement("input");
            input.type = "file";
            input.accept = options.accept || config.documentImportAccept || ".md,.markdown,.html,.htm,.txt,.doc,.docx";
            input.style.position = "fixed";
            input.style.left = "-9999px";
            input.addEventListener("change", function () {
                var f = input.files && input.files[0];
                if (f) importFile(f, options);
                setTimeout(function () { try { document.body.removeChild(input); } catch (e) {} }, 0);
            });
            document.body.appendChild(input);
            input.click();
            return true;
        } catch (e) {
            if (window.console) console.error("documentimport: openPicker failed", e);
            return false;
        }
    }

    // ---- library-free .docx (ZIP of XML) ----
    function docxSupported() {
        return typeof DecompressionStream === "function" && typeof DOMParser === "function" &&
            (typeof Response === "function" || typeof Blob === "function");
    }

    // Locate an entry via the ZIP central directory (reliable comp sizes/offsets).
    function findZipEntry(bytes, wantName) {
        var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        // End Of Central Directory: signature 0x06054b50, scan from the end.
        var eocd = -1;
        for (var i = bytes.length - 22; i >= 0 && i >= bytes.length - 22 - 65536; i--) {
            if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
        }
        if (eocd < 0) return null;
        var cdOffset = dv.getUint32(eocd + 16, true);
        var cdCount = dv.getUint16(eocd + 10, true);
        var p = cdOffset;
        for (var n = 0; n < cdCount; n++) {
            if (dv.getUint32(p, true) !== 0x02014b50) break;
            var method = dv.getUint16(p + 10, true);
            var compSize = dv.getUint32(p + 20, true);
            var nameLen = dv.getUint16(p + 28, true);
            var extraLen = dv.getUint16(p + 30, true);
            var commentLen = dv.getUint16(p + 32, true);
            var localOff = dv.getUint32(p + 42, true);
            // Normalize separators: the ZIP spec mandates "/", but some Windows
            // tools (.NET ZipFile on older runtimes) emit "\".
            var name = utf8(bytes.subarray(p + 46, p + 46 + nameLen)).replace(/\\/g, "/");
            if (name === wantName) {
                var lh = new DataView(bytes.buffer, bytes.byteOffset + localOff, 30);
                var lNameLen = lh.getUint16(26, true);
                var lExtraLen = lh.getUint16(28, true);
                var dataStart = localOff + 30 + lNameLen + lExtraLen;
                return { method: method, data: bytes.subarray(dataStart, dataStart + compSize) };
            }
            p += 46 + nameLen + extraLen + commentLen;
        }
        return null;
    }

    function utf8(u8) {
        try { return new TextDecoder("utf-8").decode(u8); } catch (e) {
            var s = ""; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return s;
        }
    }

    function inflateRaw(u8) {
        // method 0 = stored, 8 = deflate (raw).
        var ds = new DecompressionStream("deflate-raw");
        var blob = new Blob([u8]);
        return new Response(blob.stream().pipeThrough(ds)).arrayBuffer().then(function (ab) {
            return new Uint8Array(ab);
        });
    }

    // Every entry whose name matches, decompressed. Needed because a faithful
    // conversion is not just document.xml: the hyperlink URLs live in the rels
    // part, whether a list is bulleted or numbered lives in numbering.xml, and
    // the images live in word/media.
    function listZipEntries(bytes) {
        var dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        var eocd = -1;
        for (var i = bytes.length - 22; i >= 0 && i >= bytes.length - 22 - 65536; i--) {
            if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
        }
        if (eocd < 0) return [];
        var cdOffset = dv.getUint32(eocd + 16, true);
        var cdCount = dv.getUint16(eocd + 10, true);
        var p = cdOffset, out = [];
        for (var n = 0; n < cdCount; n++) {
            if (dv.getUint32(p, true) !== 0x02014b50) break;
            var method = dv.getUint16(p + 10, true);
            var compSize = dv.getUint32(p + 20, true);
            var nameLen = dv.getUint16(p + 28, true);
            var extraLen = dv.getUint16(p + 30, true);
            var commentLen = dv.getUint16(p + 32, true);
            var localOff = dv.getUint32(p + 42, true);
            var name = utf8(bytes.subarray(p + 46, p + 46 + nameLen)).replace(/\\/g, "/");
            var lh = new DataView(bytes.buffer, bytes.byteOffset + localOff, 30);
            var dataStart = localOff + 30 + lh.getUint16(26, true) + lh.getUint16(28, true);
            out.push({ name: name, method: method, data: bytes.subarray(dataStart, dataStart + compSize) });
            p += 46 + nameLen + extraLen + commentLen;
        }
        return out;
    }

    function entryBytes(entry) {
        return entry.method === 0 ? Promise.resolve(entry.data) : inflateRaw(entry.data);
    }

    function mimeForExt(name) {
        var e = (name.split(".").pop() || "").toLowerCase();
        if (e === "png") return "image/png";
        if (e === "jpg" || e === "jpeg") return "image/jpeg";
        if (e === "gif") return "image/gif";
        if (e === "bmp") return "image/bmp";
        if (e === "webp") return "image/webp";
        if (e === "svg") return "image/svg+xml";
        return null;   // wmf/emf and friends have no browser-renderable form
    }

    function bytesToDataUri(u8, mime) {
        var CHUNK = 0x8000, s = "";
        for (var i = 0; i < u8.length; i += CHUNK) {
            s += String.fromCharCode.apply(null, u8.subarray(i, i + CHUNK));
        }
        return "data:" + mime + ";base64," + btoa(s);
    }

    function readDocx(file) {
        var bufPromise = file.arrayBuffer ? file.arrayBuffer() : new Promise(function (res, rej) {
            var r = new FileReader(); r.onload = function () { res(r.result); }; r.onerror = rej; r.readAsArrayBuffer(file);
        });
        return bufPromise.then(function (ab) {
            var bytes = new Uint8Array(ab);
            var entries = listZipEntries(bytes);
            var byName = {};
            for (var i = 0; i < entries.length; i++) byName[entries[i].name] = entries[i];
            if (!byName["word/document.xml"]) return null;

            var ctx = { rels: {}, numbering: {}, media: {} };

            // Images are opt-in: a document full of photographs would otherwise
            // inline megabytes of base64 into the editor.
            var wantMedia = config.documentImportImages !== false;

            var jobs = [entryBytes(byName["word/document.xml"]).then(function (b) { ctx.documentXml = utf8(b); })];

            if (byName["word/_rels/document.xml.rels"]) {
                jobs.push(entryBytes(byName["word/_rels/document.xml.rels"]).then(function (b) {
                    ctx.rels = parseRels(utf8(b));
                }));
            }
            if (byName["word/numbering.xml"]) {
                jobs.push(entryBytes(byName["word/numbering.xml"]).then(function (b) {
                    ctx.numbering = parseNumbering(utf8(b));
                }));
            }
            if (wantMedia) {
                for (var n = 0; n < entries.length; n++) {
                    (function (ent) {
                        if (ent.name.indexOf("word/media/") !== 0) return;
                        var mime = mimeForExt(ent.name);
                        if (!mime) return;
                        jobs.push(entryBytes(ent).then(function (b) {
                            try { ctx.media[ent.name] = bytesToDataUri(b, mime); } catch (e) {}
                        }));
                    })(entries[n]);
                }
            }

            return Promise.all(jobs).then(function () { return docxXmlToHtml(ctx.documentXml, ctx); });
        });
    }

    // r:id -> target. Without this, every hyperlink in the document survives as
    // plain text with its URL silently discarded.
    function parseRels(xml) {
        var map = {};
        try {
            var d = new DOMParser().parseFromString(xml, "application/xml");
            var rs = d.getElementsByTagName("*");
            for (var i = 0; i < rs.length; i++) {
                if (rs[i].localName !== "Relationship") continue;
                var id = rs[i].getAttribute("Id");
                var target = rs[i].getAttribute("Target");
                var mode = rs[i].getAttribute("TargetMode");
                if (id && target) map[id] = { target: target, external: mode === "External" };
            }
        } catch (e) {}
        return map;
    }

    // numId -> { level -> "bullet" | "decimal" | ... }. Word stores every list
    // the same way in document.xml; only numbering.xml says whether it renders
    // as bullets or numbers, which is why a naive converter turns every ordered
    // list into a <ul>.
    function parseNumbering(xml) {
        var out = {};
        try {
            var W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
            var d = new DOMParser().parseFromString(xml, "application/xml");
            function val(el) { return el ? (el.getAttributeNS(W, "val") || el.getAttribute("w:val") || "") : ""; }

            // abstractNumId -> { ilvl -> numFmt }
            var abstracts = {};
            var aNums = d.getElementsByTagNameNS(W, "abstractNum");
            for (var i = 0; i < aNums.length; i++) {
                var aid = aNums[i].getAttributeNS(W, "abstractNumId") || aNums[i].getAttribute("w:abstractNumId");
                var levels = {};
                var lvls = aNums[i].getElementsByTagNameNS(W, "lvl");
                for (var j = 0; j < lvls.length; j++) {
                    var ilvl = lvls[j].getAttributeNS(W, "ilvl") || lvls[j].getAttribute("w:ilvl") || "0";
                    var fmt = val(lvls[j].getElementsByTagNameNS(W, "numFmt")[0]);
                    levels[ilvl] = fmt || "decimal";
                }
                if (aid != null) abstracts[aid] = levels;
            }
            // num -> abstractNumId
            var nums = d.getElementsByTagNameNS(W, "num");
            for (var k = 0; k < nums.length; k++) {
                var nid = nums[k].getAttributeNS(W, "numId") || nums[k].getAttribute("w:numId");
                var ref = nums[k].getElementsByTagNameNS(W, "abstractNumId")[0];
                var aref = val(ref);
                if (nid != null && abstracts[aref]) out[nid] = abstracts[aref];
            }
        } catch (e) {}
        return out;
    }

    function docxXmlToHtml(xml, ctx) {
        ctx = ctx || { rels: {}, numbering: {}, media: {} };
        var doc = new DOMParser().parseFromString(xml, "application/xml");
        var W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
        var R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

        function relTarget(el) {
            if (!el) return null;
            var id = el.getAttributeNS(R, "id") || el.getAttribute("r:id") ||
                     el.getAttributeNS(R, "embed") || el.getAttribute("r:embed");
            if (!id) return null;
            return ctx.rels[id] || null;
        }

        // <w:drawing>/<w:pict> -> <img> from word/media, inlined as a data URI.
        function imageHtml(node) {
            var blips = node.getElementsByTagName("*");
            for (var i = 0; i < blips.length; i++) {
                if (blips[i].localName !== "blip" && blips[i].localName !== "imagedata") continue;
                var rel = relTarget(blips[i]);
                if (!rel) continue;
                // Targets are relative to word/: "media/image1.png".
                var path = rel.target.replace(/^\.\//, "");
                var key = path.indexOf("word/") === 0 ? path : "word/" + path;
                var uri = ctx.media[key];
                if (uri) return '<img src="' + uri + '" alt="">';
                if (rel.external) return '<img src="' + esc(rel.target) + '" alt="">';
            }
            return "";
        }
        function els(parent, ln) { return parent.getElementsByTagNameNS(W, ln); }
        function firstChildEl(parent, ln) {
            for (var i = 0; i < parent.childNodes.length; i++) {
                var c = parent.childNodes[i];
                if (c.nodeType === 1 && c.localName === ln && c.namespaceURI === W) return c;
            }
            return null;
        }
        function runText(r) {
            var t = "", kids = r.childNodes;
            for (var i = 0; i < kids.length; i++) {
                var c = kids[i];
                if (c.nodeType !== 1) continue;
                if (c.localName === "t") t += c.textContent || "";
                else if (c.localName === "tab") t += "\t";
                else if (c.localName === "br" || c.localName === "cr") t += "\n";
            }
            return t;
        }
        function runHtml(r) {
            // A run can carry a picture instead of text; without this every
            // image in the document is silently dropped on import.
            var pics = "";
            for (var d = 0; d < r.childNodes.length; d++) {
                var ch = r.childNodes[d];
                if (ch.nodeType === 1 && (ch.localName === "drawing" || ch.localName === "pict")) {
                    pics += imageHtml(ch);
                }
            }
            var txt = esc(runText(r));
            if (!txt) return pics;
            txt = txt.replace(/\n/g, "<br>");
            var rpr = firstChildEl(r, "rPr");
            if (rpr) {
                if (firstChildEl(rpr, "b")) txt = "<strong>" + txt + "</strong>";
                if (firstChildEl(rpr, "i")) txt = "<em>" + txt + "</em>";
                if (firstChildEl(rpr, "u")) txt = "<u>" + txt + "</u>";
                if (firstChildEl(rpr, "strike")) txt = "<s>" + txt + "</s>";
            }
            return pics + txt;
        }
        function paraInner(p) {
            var h = "", kids = p.childNodes;
            for (var i = 0; i < kids.length; i++) {
                var c = kids[i];
                if (c.nodeType === 1 && c.localName === "r" && c.namespaceURI === W) h += runHtml(c);
                else if (c.nodeType === 1 && c.localName === "hyperlink") {
                    var inner = "";
                    for (var j = 0; j < c.childNodes.length; j++) if (c.childNodes[j].localName === "r") inner += runHtml(c.childNodes[j]);
                    // Resolve r:id through the rels part. Previously the run text
                    // was emitted bare and the URL was thrown away, so every link
                    // in an imported document became plain text.
                    var rel = relTarget(c);
                    var anchor = c.getAttributeNS(W, "anchor") || c.getAttribute("w:anchor");
                    var href = rel ? rel.target : (anchor ? "#" + anchor : null);
                    h += href ? ('<a href="' + esc(href) + '">' + (inner || esc(href)) + "</a>") : inner;
                }
            }
            return h;
        }
        function paraStyle(p) {
            var ppr = firstChildEl(p, "pPr"); if (!ppr) return {};
            var info = {};
            var ps = firstChildEl(ppr, "pStyle");
            if (ps) { var v = ps.getAttributeNS(W, "val") || ps.getAttribute("w:val") || ""; var m = /heading(\d)/i.exec(v); if (m) info.heading = Math.min(6, parseInt(m[1], 10)); }
            var numPr = firstChildEl(ppr, "numPr");
            if (numPr) {
                info.list = true;
                var ilvl = firstChildEl(numPr, "ilvl");
                var numId = firstChildEl(numPr, "numId");
                info.level = parseInt(ilvl ? (ilvl.getAttributeNS(W, "val") || ilvl.getAttribute("w:val") || "0") : "0", 10) || 0;
                var nid = numId ? (numId.getAttributeNS(W, "val") || numId.getAttribute("w:val") || "") : "";
                var levels = ctx.numbering[nid];
                var fmt = levels ? levels[String(info.level)] : null;
                // Word marks bullets with numFmt="bullet"; anything else is an
                // ordered list. Defaulting to bullet when numbering.xml is absent
                // matches the old behaviour rather than inventing <ol>s.
                info.ordered = !!fmt && fmt !== "bullet" && fmt !== "none";
            }
            var jc = firstChildEl(ppr, "jc");
            if (jc) {
                var a = jc.getAttributeNS(W, "val") || jc.getAttribute("w:val") || "";
                if (a === "center" || a === "right" || a === "both") {
                    info.align = (a === "both") ? "justify" : a;
                }
            }
            return info;
        }
        var body = els(doc, "body")[0];
        if (!body) return "";
        var out = [];
        // Stack of open lists so w:ilvl produces real nesting instead of a flat
        // run of <li>s. liOpen tracks whether an <li> is still open at each
        // depth, because a nested list must live INSIDE its parent <li> --
        // <ol><li>a</li><ol>...</ol></ol> is invalid HTML, and shipping invalid
        // markup out of an importer undermines the whole clean-output promise.
        var listStack = [];
        var liOpen = [];
        function closeListsTo(depth) {
            while (listStack.length > depth) {
                var d = listStack.length - 1;
                if (liOpen[d]) { out.push("</li>"); liOpen[d] = false; }
                out.push("</" + listStack.pop() + ">");
                liOpen.pop();
            }
        }
        for (var i = 0; i < body.childNodes.length; i++) {
            var node = body.childNodes[i];
            if (node.nodeType !== 1 || node.namespaceURI !== W) continue;
            if (node.localName === "p") {
                var st = paraStyle(node);
                var inner = paraInner(node);
                if (st.list) {
                    var want = (st.level || 0) + 1;
                    var tag = st.ordered ? "ol" : "ul";
                    // Come back up to this depth FIRST. Checking the type before
                    // this ran compared against the wrong level, so a bullet
                    // following a deeper numbered item silently joined the <ol>.
                    if (listStack.length > want) closeListsTo(want);
                    // Now at this depth: a different list type means a new list.
                    if (listStack.length === want && listStack[want - 1] !== tag) closeListsTo(want - 1);
                    // Going deeper leaves the parent <li> open so the sublist
                    // nests inside it.
                    while (listStack.length < want) {
                        out.push("<" + tag + ">");
                        listStack.push(tag);
                        liOpen.push(false);
                    }
                    if (liOpen[want - 1]) { out.push("</li>"); liOpen[want - 1] = false; }
                    out.push("<li>" + (inner || ""));
                    liOpen[want - 1] = true;
                    continue;
                }
                closeListsTo(0);
                if (st.heading) out.push("<h" + st.heading + ">" + (inner || "") + "</h" + st.heading + ">");
                else {
                    var style = st.align ? ' style="text-align:' + st.align + '"' : "";
                    out.push("<p" + style + ">" + (inner || "<br>") + "</p>");
                }
            } else if (node.localName === "tbl") {
                closeListsTo(0);
                out.push(tableHtml(node));
            }
        }
        closeListsTo(0);
        return out.join("\n");

        function tableHtml(tbl) {
            var rows = [], kids = tbl.childNodes;
            for (var i = 0; i < kids.length; i++) {
                var tr = kids[i];
                if (tr.nodeType !== 1 || tr.localName !== "tr") continue;
                var cells = [];
                for (var j = 0; j < tr.childNodes.length; j++) {
                    var tc = tr.childNodes[j];
                    if (tc.nodeType !== 1 || tc.localName !== "tc") continue;
                    var cellHtml = "";
                    for (var k = 0; k < tc.childNodes.length; k++) {
                        if (tc.childNodes[k].localName === "p") cellHtml += "<p>" + (paraInner(tc.childNodes[k]) || "<br>") + "</p>";
                    }
                    cells.push("<td>" + cellHtml + "</td>");
                }
                rows.push("<tr>" + cells.join("") + "</tr>");
            }
            return "<table>" + rows.join("") + "</table>";
        }
    }

    function notify(msg) {
        try {
            if (editor && typeof editor.createDialog === "function") {
                var d = editor.createDialog((editor.getLangText && editor.getLangText("importtitle")) || "Import document", "rte-dialog-import");
                var w = d.ownerDocument.createElement("div");
                w.style.cssText = "padding:16px;max-width:420px;font:13px -apple-system,Segoe UI,sans-serif;line-height:1.5";
                w.textContent = msg;
                d.appendChild(w);
                return;
            }
        } catch (e) {}
        if (window.console) console.warn("documentimport:", msg);
    }
}
