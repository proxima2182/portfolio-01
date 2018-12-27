IS_LWE_IE8 = true;
var CONTENT_WIDTH, WINDOW_WIDTH, WINDOW_HEIGHT;
function check_resolution() {
    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;
    console.log("width : " + WINDOW_WIDTH +", height: "+ WINDOW_HEIGHT);
    document.body.setAttribute("style", "line-height: "+ WINDOW_HEIGHT +"px;");
    if(WINDOW_WIDTH>=1000 && WINDOW_HEIGHT>=800) {
        CONTENT_WIDTH = 1000;
    }else if(WINDOW_HEIGHT<800 && WINDOW_WIDTH/WINDOW_HEIGHT>1.25) {
        CONTENT_WIDTH = WINDOW_HEIGHT* 1.25;
    }else{
        CONTENT_WIDTH = WINDOW_WIDTH;
    }
}
var callback = function(){
  // Handler when the DOM is fully loaded
    check_resolution();
    console.log("IS_LWE_IE8 : "+ IS_LWE_IE8);
    document.getElementById("wrap").outerHTML = "";
    var container = document.createElement("div");
    container.setAttribute("class", "warning_wrap");
    container.setAttribute("style","line-height: normal; display: inline-block; vertical-align: middle; color: #fff;");
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
        img.setAttribute("style","width: "+CONTENT_WIDTH*0.3+"px; height: "+CONTENT_WIDTH*0.18+";px");
        title.setAttribute("style","font-size: "+CONTENT_WIDTH*0.04+"px;");
        p1.setAttribute("style","font-size: "+CONTENT_WIDTH*0.025+"px;");
        p2.setAttribute("style","font-size: "+CONTENT_WIDTH*0.025+"px;");
    };
    container.resize();
    if (window.attachEvent) {
        window.attachEvent("onresize", function() {
            check_resolution();
            container.resize();
        })
    }
    else {
        window.addEventListener("resize", function() {
            check_resolution();
            container.resize();
        })
    }
};
if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
    if (document.attachEvent) {
        document.attachEvent("onreadystatechange", function(){
          // check if the DOM is fully loaded
          if(document.readyState === "complete"){
            // remove the listener, to make sure it isn't fired in future
            document.detachEvent("onreadystatechange", arguments.callee);
            // The actual handler...
            callback();
          }
        });
    }
    else {
        document.addEventListener("DOMContentLoaded",callback);
    }
}