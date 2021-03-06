(function () {
    let files = [
        '9-16-20.md',
        '9-2-20.md',
        '8-27-20.md',
        '8-25-20.md',
        '8-20-20.md',
        '8-18-20.md',
    ];
    let converter = new showdown.Converter();
    let entries = [];
    function updateBlog(_entries, _files) {
        let blog = document.getElementById("MicroBlog");
        if (blog != null) {
            blog.innerHTML = "";

            let sortedEntries = _entries.sort(function (a, b) {
                return (getIndex(a.url, _entries, _files) < getIndex(b.url, _entries, _files)) ? -1 : 1;
            });
            for (let i = 0; i < sortedEntries.length; i++) {
                blog.innerHTML += "<div class='copy'>"
                    + sortedEntries[i].html
                    + "<!--" + sortedEntries[i].url + "-->"
                    + "<br/>"
                    + "<div class='signature'>- DevEarley</div>"
                    + "<hr/>"
                    + "</div>";
            }

        }
    }

    function getIndex(_url, _entries, _files) {
        var fileName = extractFilename(_url);
        var index = 0;
        for (var i = 0; i < _files.length; i++) {
            let fileNameFromIndex = _files[i];
            if (fileNameFromIndex === fileName) {
                index = i;
            }
        }
        return index;
    }

    function extractFilename(_path) {
        const pathArray = _path.split("/");
        const lastIndex = pathArray.length - 1;
        return pathArray[lastIndex];
    }

    function init(_entries, _files, _converter) {
        for (let f = 0; f < _files.length; f++) {
            let client = new XMLHttpRequest();
            client.open('GET', './' + _files[f]);
            client.send();
            client.onreadystatechange = function () {
                if (client.readyState != 4) return;
                let html = _converter.makeHtml(client.responseText);
                let url = client.responseURL;
                _entries.push({
                    html: html,
                    url: url
                });
                if (_entries.length == _files.length) {
                    updateBlog(_entries, _files);
                }
            }
        }
    }
    init(entries, files, converter);
})();
