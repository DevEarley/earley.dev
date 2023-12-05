class MicroBlog{
   
     updateBlog(_entries, _files) {
        let blog = document.getElementById("MicroBlog");
        if (blog != null) {
            blog.innerHTML = "";
            _entries = _entries.sort((a,b)=>a.index-b.index);
           // console.log(_entries)
            for (let i = 0; i < _entries.length; i++) {
                blog.innerHTML += "<div class='copy'>"
                    + _entries[i].html
                    + "<!--" + _entries[i].url + "-->"
                    + "</div>";
            }
        }
        else{
            console.error("could not find tag with MicroBlog")
            
        }
    }

     getIndex(_url, _entries, _files) {
        var fileName = this.extractFilename(_url);
        var index = 0;
        for (var i = 0; i < _files.length; i++) {
            let fileNameFromIndex = _files[i];
            if (fileNameFromIndex === fileName) {
                index = i;
            }
        }
        return index;
    }

     extractFilename(_path) {
        const pathArray = _path.split("/");
        const lastIndex = pathArray.length - 1;
        return pathArray[lastIndex];
    }

     init(_files,  _converter, _entries) {
   
        for (let f = 0; f < _files.length; f++) {
            let client = new XMLHttpRequest();
            const file = _files[f];
            const _index = file.index;
            client.open('GET', './' + _files[f].path);
            client.send();
            client.onreadystatechange =  () =>{
                if (client.readyState != 4) return;
                //console.log("update Blog | "+ client.readyState);
                let html = _converter.makeHtml(client.responseText);
                let url = client.responseURL;
                let entry = {
                    html: html,
                    url: url, 
                    index: _index
                };
               // console.log(entry);
                _entries.push(entry);
                  this.updateBlog(_entries,_files);

            }
        }
    }
}
