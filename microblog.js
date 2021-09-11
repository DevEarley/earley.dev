(function () {
    let files = [
        '9-11-21.md',
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
            _entries = _entries.sort((a,b)=>a.id<b.id)
            for (let i = 0; i < _entries.length; i++) {
                blog.innerHTML += "<div class='copy'>"
                    + _entries[i].html
                    + "<!--" + _entries[i].url + "-->"
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
                let url = await client.responseURL;
                _entries.push({
                    html: html,
                    url: url, 
                    index:f
                });
                if (_entries.length == _files.length) {
                    updateBlog(_entries, _files);
                }
            }
        }
    }
    init(entries, files, converter);
})();
