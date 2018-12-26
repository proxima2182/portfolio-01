var IS_LWE_IE8 = false;

var CONTENT_WIDTH, WINDOW_WIDTH, WINDOW_HEIGHT;
function check_resolution() {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    if(WINDOW_WIDTH>=1000 && WINDOW_HEIGHT>=800) {
        CONTENT_WIDTH = 1000;
    }else if(WINDOW_HEIGHT<800 && WINDOW_WIDTH/WINDOW_HEIGHT>1.25) {
        CONTENT_WIDTH = WINDOW_HEIGHT* 1.25;
    }else{
        CONTENT_WIDTH = WINDOW_WIDTH;
    }
}
//var callback = function(){
//  // Handler when the DOM is fully loaded
(function(ready){
    check_resolution();
    console.log("IS_LWE_IE8 : "+ IS_LWE_IE8);
    document.getElementById("wrap").outerHTML = "";
//                        if(IS_LWE_IE8) {
//                            $(".warning_wrap").resize();
//                        }
//                    if(IS_LWE_IE8){
    var container = document.createElement("div");
    container.setAttribute("class", "warning_wrap");
    container.style = "line-height: normal; display: inline-block; vertical-align: middle; color: #fff;";
    var img = document.createElement("img");
    img.setAttribute("src", "./images/icon_impossible.png");
    var title = document.createElement("p");
    title.innerHTML="Sorry.";
    title.setAttribute("class","title");
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    p1.innerHTML = "This page don\'t support lower version than IE9.";
    p2.innerHTML = "Please update this browser or try to access with another browser.";
    container.appendChild(img);
    container.appendChild(title);
    container.appendChild(p1);
    container.appendChild(p2);
    document.body.appendChild(container);

    container.resize = function() {
        img.style = "width: "+CONTENT_WIDTH*0.3+"px; height: "+CONTENT_WIDTH*0.18+";px";
        title.style =  "font-size: "+CONTENT_WIDTH*0.04+"px;";
        p1.style = "font-size: "+CONTENT_WIDTH*0.025+"px;";
        p2.style = "font-size: "+CONTENT_WIDTH*0.025+"px;";
    };
    container.resize();
    if (window.attachEvent) {
        window.attachEvent("onresize", function() {
            check_resolution();
            console.log("resize called");
            container.resize();
        })
    }
    else {
        window.addEventListener("resize", function() {
            check_resolution();
            console.log("resize called");
            container.resize();
        })
    }
})
//};
//
//if (
//    document.readyState === "complete" ||
//    (document.readyState !== "loading" && !document.documentElement.doScroll)
//) {
//  callback();
//} else {
//  document.addEventListener("DOMContentLoaded", callback);
//}