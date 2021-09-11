(function () {
    let files = [
        { index:1,path:'9-11-21.md'},
        {index:2,path:'9-2-20.md'},
        { index:3,path:'8-25-20.md'},
        {index:4,path:'8-20-20.md'},
        {index:5,path:'8-18-20.md'},
    ];
    let converter = new showdown.Converter();
    let entries = [];
    function updateBlog(_entries, _files) {
        let blog = document.getElementById("MicroBlog");
        if (blog != null) {
            blog.innerHTML = "";
            _entries = _entries.sort((a,b)=>a.index<b.index)
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
        setTimeout(()=>{
             updateBlog(_entries,_files);
        },1000);
        for (let f = 0; f < _files.length; f++) {
            let client = new XMLHttpRequest();
            client.open('GET', './' + _files[f].path);
            client.send();
            const _index = file[f].index;
            client.onreadystatechange = function () {
                if (client.readyState != 4) return;
                let html = _converter.makeHtml(client.responseText);
                let url = client.responseURL;
                _entries.push({
                    html: html,
                    url: url, 
                    index: _index
                });
              
            }
        }
    }
    init(entries, files, converter);
})();
