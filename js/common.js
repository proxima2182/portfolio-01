var WINDOW_WIDTH;
function resize() {
    console.log("width : "+ window.innerWidth + ", height : "+ window.innerHeight);
    if(window.innerWidth>=1000 && window.innerHeight>=800) {
        console.log("condition 02");
        WINDOW_WIDTH = 1000;
    }else if(window.innerHeight<800 && window.innerWidth/window.innerHeight>1.25) {
        console.log("condition 01");
        WINDOW_WIDTH = window.innerHeight * 1.25;
    }else {
        console.log("condition 03");
        WINDOW_WIDTH = window.innerWidth;
    }
}

document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

function requestFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	}
}

$(document).ready(function() {
//    $(window).bind('orientationchange resize', function(event){
//      if (event.orientation) {
//        if (event.orientation == 'landscape') {
//          if (window.rotation == 90) {
//            rotate(this, -90);
//          } else {
//            rotate(this, 90);
//          }
//        }
//      }
//    });
//    $("body").css({
//        "transform":"rotate(-90deg)",
//    })
    
    
//    $("html").click(function() {
//        if (document.fullscreenEnabled) {
//            console.log("true");
////            document.documentElement.webkitRequestFullscreen();
//            requestFullscreen($("html")[0]);
//        }
//    })
    resize();
    window.addEventListener('resize', resize);
})