//function loadHeadings() {
//    var headerRequest = new XMLHttpRequest();
//    
//    headerRequest.onreadystatechange = function() {
//        
//        if (headerRequest.readyState == 4 && headerRequest.status == 200) {
//            
//            headerContainer = document.createElement('div');
//            headerContainer.innerHTML = headerRequest.responseText;
//            componentHandler.upgradeElement(headerContainer);            
//            
//            document.getElementById('headerArea').appendChild(headerContainer);
//            
//        }    
//    };
//    
//    headerRequest.open('GET', 'header.html', true);
//    headerRequest.send();
//    
//    var footerRequest = new XMLHttpRequest();
//    
//    footerRequest.onreadystatechange = function() {
//        
//        if (footerRequest.readyState == 4 && footerRequest.status == 200) {
//            
//            document.getElementById('footerArea').innerHTML = footerRequest.responseText;
////            componentHandler.upgradeElement(document.getElementById('footerArea'));
//        }
//    };
//    
//    footerRequest.open('GET', 'footer.html', true);
//    footerRequest.send();
//    
//    componentHandler.upgradeDom();
//    
//}

function loadHeadings() {
    
//    alert();
    
    $(function() {
        $('header').load('header.html');
        $('footer').load('footer.html');
        $('md-sidenav').load('sidenav.html');
//        $('body').load('sidenav.html')
    })
    
//    $.ajax({url: "sidenav.html", success:function(result) {
//        $('body').prepend(result);
//    }})
//    
//    $.ajax({url: "header.html", success: function(result){
//        $("body").prepend(result);
//    }});
//    
//    $.ajax({url: "footer.html", success: function(result){
//        $("md-content").append(result);
//    }});

}