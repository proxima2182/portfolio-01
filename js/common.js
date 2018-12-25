var CONTENT_WIDTH;
var WINDOW_WIDTH, WINDOW_HEIGHT;
var SCREEN_DEGREE = 0;
var IS_ROTATED = false;
var IS_IOS = false, IS_ANDROID = false, IS_PAD= false, IS_MOBILE = false;
var IS_DOCUMENT_LOADED = false;

$.fn.onEnterKey =
    function( closure ) {
        $(this).keypress(
            function( event ) {
                var code = event.keyCode ? event.keyCode : event.which;

                if (code == 13) {
                    closure();
                    return false;
                }
            } );
    }

function focus_check(list){
    for(var i= 0; i< list.length; ++i) {
        if(list.eq(i).is(":focus")){
            return list.eq(i);
        }
    }
    return undefined;
}
function focus_out() {
    $('input').each(function() {
       if($(this).is(":focus")) {
           $(this).blur();
       }
    })
    $('textarea').each(function() {
       if($(this).is(":focus")) {
           $(this).blur();
       }
    })
}
function check_device() {
    console.log("check_device");
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    IS_ANDROID = /android/i.test(userAgent);
    IS_IOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    IS_PAD = $(window).width() > 765;
    IS_MOBILE = IS_ANDROID || IS_IOS
//    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
//        IS_MOBILE = true;
//    } else {
//        IS_MOBILE = false;
//    }
    if(IS_MOBILE) {
        SCREEN_DEGREE = screen.orientation!= undefined?screen.orientation.angle:window.orientation;
        if(SCREEN_DEGREE == 0 || SCREEN_DEGREE == 180) {
            IS_ROTATED = true;
        } else {
            IS_ROTATED = false;
        }
    } else {
        IS_ROTATED = false;
    }
}

function check_resolution() {
    WINDOW_WIDTH = $(window).width();
    WINDOW_HEIGHT = $(window).height();
    if(IS_ROTATED) {
        WINDOW_WIDTH = $(window).height();
        WINDOW_HEIGHT = $(window).width();
    }
    if(WINDOW_WIDTH>=1000 && WINDOW_HEIGHT>=800) {
        CONTENT_WIDTH = 1000;
        console.log("CASE 01");
    }else if(WINDOW_HEIGHT<800 && WINDOW_WIDTH/WINDOW_HEIGHT>1.25) {
        CONTENT_WIDTH = WINDOW_HEIGHT* 1.25;
        console.log("CASE 02");
    }else{
        CONTENT_WIDTH = WINDOW_WIDTH;
        console.log("CASE 03");
    }
}

function make_extra_input(focused) {
//    $("#wrap").css("display","none");
    var width = $(window).width();
    var height = $(window).height();
    var input_wrap = $("<div class=\"extra_input_area\"></div>")
    var input = $("<input type=\"text\"></input>");
//    var margin_top = -1*height/2;
//    var margin_left = -1*width/2;
//    if(IS_IOS) {
//        margin_top -= window.innerHeight/2;
//    }
    input_wrap.append(input);
    var deg= "0deg";
    if(IS_ROTATED) {
        deg = "-90deg";
    }
    input_wrap.css({
        "width" : width,
        "height" : height,
        "line-height" : height + "px",
        "background" : "#000",
        "position" : "fixed",
        "opacity":"0.5",
        "z-index": 153,
        "-webkit-transform": "rotate("+deg+")",
        "-ms-transform": "rotate("+deg+")",
        "transform": "rotate("+deg+")",
        "top": "50%",
        "left": "50%",
        "margin-top": -1*height/2,
        "margin-left": -1*width/2,
    })
    $("body").append(input_wrap);
    input_wrap.click(function() {
        focus_out();
    }).on("touchmove", function(event){
        event.stopPropagation();
        event.preventDefault();
    });
    input_wrap.scrollTop(height/2);
    $("body").scrollTop(height);
    focused.blur();
//    input.css({
//        "margin-top": IS_IOS? -(window.innerHeight/2):0,
//    })
    input.data("focused", focused);
    input.css({
        "width": "80%",
        "font-size": CONTENT_WIDTH*0.02,
        "height": CONTENT_WIDTH*0.04,
        "line-height": CONTENT_WIDTH*0.04 + "px",
        "background":"#000",
        "color":"#fff",
        "border":0,
        "caret-color":"#fff",
        
    })
    input.val(focused.val());
    input.get(0).focus();
    input.click(function(event) {
        event.stopPropagation();
    })
    input.onEnterKey(function() {
        focused.val(input.val());
        focus_out();
    })
    if(IS_IOS) {
        //when user press 'done'
//        window.scrollTo(0, height/2);
//        document.body.scrollTop = height/2;
        
        console.log("scrollHeight: " + document.body.scrollHeight);
        input.on("focusout", function() {
            console.log("keyup");
            resize_standard();
        })
    }
}



console.log("몇번째 ? 17");
var ROTATE_WITH_KEYBOARD = false;
function resize_standard() {
    console.log("resize_standard");
    var need_rotate = SCREEN_DEGREE;
    check_device();
    need_rotate = need_rotate != SCREEN_DEGREE;
    if(IS_MOBILE) {
        var width = $(window).width();
        var height = $(window).height();
        if(!need_rotate && !ROTATE_WITH_KEYBOARD || ROTATE_WITH_KEYBOARD) {
            var input = $('#wrap input');
            var textarea = $('#wrap textarea');
            var input_checked = focus_check(input);
            var textarea_checked = focus_check(textarea);
            var focused = input_checked != undefined ? input_checked : textarea_checked;
            
            console.log("focused");
            console.log(focused);

            if(focused == undefined && !ROTATE_WITH_KEYBOARD) {
                $(".extra_input_area").remove();
            }
            ROTATE_WITH_KEYBOARD = false;
            if(IS_ANDROID && focused != undefined) {
                make_extra_input(focused);
                return;
            }
        } else if(IS_ANDROID){
            //It will be triggerred when the device is android
            //Android call resize function twice with soft keyboard.
            //so make it wait one time in that case
            ROTATE_WITH_KEYBOARD = true;
        } else if(IS_IOS){
            //IOS don't call resize function twice when the device is rotated.
            //because IOS don't call resize for soft keyboard is opened or closed.
            //But the reason of calling that function twice is that device has 0 degree.
            //Since safari browser in IOS always happens in vertical environment.
//            var input = $(".extra_input_area input");
//            if(input.length>0) {
//                console.log("INPUT IS AVAILABLE!");
//                input.get(0).focus();
//            } else {
//                console.log("INPUT IS NOT AVAILABLE!");
//            }
        }
        var input_wrap = $(".extra_input_area");
        if(input_wrap.length > 0){
            var deg= "0deg";
            if(IS_ROTATED) {
                deg = "-90deg";
            }
            input_wrap.css({
                "width" : width,
                "height" : height,
                "line-height" : height + "px",
                "background" : "#000",
                "position" : "fixed",
                "-webkit-transform": "rotate("+deg+")",
                "-ms-transform": "rotate("+deg+")",
                "transform": "rotate("+deg+")",
                "top": "50%",
                "left": "50%",
                "margin-top": -1*height/2,
                "margin-left": -1*width/2,
            })
            var input = input_wrap.find("input");
            input.css({
                "font-size": CONTENT_WIDTH*0.02,
                "height": CONTENT_WIDTH*0.04,
                "line-height": CONTENT_WIDTH*0.04 + "px",
            })
        }
    }
    IS_ROTATED = IS_ROTATED && !IS_PAD;
    check_resolution();
    
    console.log("WIDTH : " + window.innerWidth + ", HEIGHT : "+ window.innerHeight);
    console.log("WIDTH : " + $(window).width() + ", HEIGHT : "+ $(window).height());
    
    console.log("resize_not_returned");
    $("body").css({
        "width": WINDOW_WIDTH,
        "height": WINDOW_HEIGHT,
    })
    if(IS_MOBILE && IS_ROTATED) {
        $("body").css({
            "-webkit-transform": "rotate(90deg)",
            "-ms-transform": "rotate(90deg)",
            "transform": "rotate(90deg)",
            "top": "50%",
            "left": "50%",
            "margin-top": -1*WINDOW_HEIGHT/2,
            "margin-left": -1*WINDOW_WIDTH/2,
            position:"absolute",
        });
    } else {
        $("body").css({
            "-webkit-transform": "rotate(0deg)",
            "-ms-transform": "rotate(0deg)",
            "transform": "rotate(0deg)",
            "top": "0",
            "left": "0",
            "margin": 0,
            position:"absolute",
        });
    }
}


//additional functions

function make_loading(target, is_fullscreen, width_ratio, border_ratio, background_color, point_color, text) {
    if(target.length==0) return;
    var container = $("<div class=\"section_loading\"></div>");
    container.css({
        "background": background_color,
        "top": "50%",
        "left": "50%",
        "z-index": 153,
        "position": is_fullscreen? "fixed": "absolute",
    });
    var common_css ={
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
        "margin" : "auto",
        "position" : "absolute",
    };
    var loading_wrap = $("<div class=\"loading_wrap rotate\"></div>");
    loading_wrap.css({
        "display": "inline-block",
        "vertical-align": "middle",
        "position":"relative",
    });
    
    var outer_square = $("<div class=\"outer_square\"></div>");
    var inner_square = $("<div class=\"inner_square scaling\"></div>");
    outer_square.css(common_css);
    inner_square.css(common_css);
    inner_square.css({
        "background-color": point_color,
    });
    loading_wrap.append(outer_square);
    loading_wrap.append(inner_square);
    
    if(text!=undefined && text.length>0) {
        var text = $("<p class=\"loading_text\">"+text+"</p>");
        text.css({
            "width": "100%",
            "text-align": "center",
            "color":"#fff",
            "top": 0,
            "position": "absolute",
        })
    }
    container.append(loading_wrap);
    container.append(text);
    container.on("resize",function(){
        var deg = IS_ROTATED && IS_DOCUMENT_LOADED?"-90deg":"0deg";
        if(is_fullscreen) {
            $(this).css({
                "-webkit-transform": "rotate("+deg+")",
                "-ms-transform": "rotate("+deg+")",
                "transform": "rotate(-"+deg+")",
            })
        }
        $(this).css({
            "width": is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"100vh":"100vw") : $(target).width(),
            "height": is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"100vw":"100vh") : $(target).height(),
            "line-height": is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"100vw":"100vh") : $(target).height()+"px",
            "margin-top": is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"-50vw":"-50vh"): -($(target).height()/2),
            "margin-left":  is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"-50vh":"-50vw"): -($(target).width()/2),
        });
        var width = parseInt(CONTENT_WIDTH*width_ratio);
        var border_width = parseInt(CONTENT_WIDTH*border_ratio);
        $(this).find(".loading_wrap").css({
            "width": width,
            "height": width,
        });

        var this_width = width - 2*border_width;
        $(this).find(".outer_square").css({
            "width": this_width,
            "height": this_width,
            "border": border_width+"px solid "+point_color,
        })
        $(this).find(".inner_square").css({
            "width": this_width - 2*border_width,
            "height": this_width - 2*border_width,
            
        })
        $(this).find(".loading_text").css({
            "margin-top": width,
            "font-size": CONTENT_WIDTH*0.03,
        })
    });
    container.on("remove",function(){
        $(this).animate({
            opacity: 0,
        }, 500, function() {
            $(this).remove();
        });
    });
    container.resize();
    $(target).append(container);
}

