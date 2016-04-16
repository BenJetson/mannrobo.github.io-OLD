function getNews() {
    
    xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            var fileDoc = $(xhttp.responseText);
            
            var fileHrefs = [];
            
            fileDoc.find('#files a').each(function() {
                fileHrefs.push($(this).attr("href"));
            });
            
            fileHrefs = fileHrefs.splice(1,fileHrefs.length);
            
            console.log(fileHrefs);
            
        }
    }
    
    xhttp.open("GET", "news", "true")
    xhttp.send();
    
}