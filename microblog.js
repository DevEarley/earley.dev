(function () {
    let files = [
        { index:0,path:'9-11-21.md'} ,
        { index:1,path:'10-3-21.md'}
    ];
    let converter = new showdown.Converter();
    let entries = [];
    function updateBlog(_entries, _files) {
        let blog = document.getElementById("MicroBlog");
        if (blog != null) {
            blog.innerHTML = "";
            _entries = _entries.sort((a,b)=>a.index<b.index);
            console.log(_entries)
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
            const file = _files[f];
            const _index = file.index;
            client.open('GET', './' + _files[f].path);
            client.send();
            client.onreadystatechange = function () {
                if (client.readyState != 4) return;
                let html = _converter.makeHtml(client.responseText);
                let url = client.responseURL;
                let entry = {
                    html: html,
                    url: url, 
                    index: _index
                };
                console.log(entry);
                _entries.push(entry);
              
            }
        }
    }
    init(entries, files, converter);
})();
