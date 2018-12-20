var CONTENT_WIDTH;
var WINDOW_WIDTH, WINDOW_HEIGHT;
var IS_ROTATED = false;
var IS_MOBILE = false;
var IS_DOCUMENT_LOADED = false;

var root = document.documentElement;
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
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        IS_MOBILE = true;
    } else {
        IS_MOBILE = false;
    }
    
    console.log("resize");
    if(IS_MOBILE) {
        if(screen.orientation!= undefined && (screen.orientation.angle == 0 || screen.orientation.angle == 180) ||
           window.orientation == 0 || window.orientation == 180) {
            IS_ROTATED = true;
        } else {
            IS_ROTATED = false;
        }
    } else {
        IS_ROTATED = false;
    }
    
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    if(IS_ROTATED) {
        WINDOW_WIDTH = window.innerHeight;
        WINDOW_HEIGHT = window.innerWidth;
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
console.log("몇번째 ? 4");
var test_count = -1;
function resize_standard() {
    var need_rotate = IS_ROTATED;
    check_device();
    console.log("need rotate : " + need_rotate+", IS ROTATE : " + IS_ROTATED);
    need_rotate = need_rotate != IS_ROTATED;
    if(IS_MOBILE) {
        if(!need_rotate || test_count >=1) {
        var input = $('#wrap input');
        var textarea = $('#wrap textarea');
        var input_checked = focus_check(input);
        var textarea_checked = focus_check(textarea);
        var focused = input_checked != undefined ? input_checked : textarea_checked;
        
        console.log("focused");
        console.log(focused);
        
        var add_focused = focus_check($(".additional_text_area input"));
        console.log("add_focused");
        console.log(add_focused);

        var width = window.innerWidth;
        var height = window.innerHeight;
        
        if(focused == undefined) {
            console.log("remove!");
            $(".additional_text_area").remove();
        }else {
            console.log("not remove!");
        }
            test_count = -1;
        //집에가서 왜 안되는지 다시보자
        var input_wrap = $(".additional_text_area");
        if(input_wrap.length > 0){
            input_wrap.css({
                "width" : width,
                "height" : height,
                "line-height" : height + "px",
                "background" : "#000",
                "position" : "fixed",
                "top": 0,
                "left": 0,
                "margin": 0,
            })
            if(IS_ROTATED) {
                input_wrap.css({
                    "-webkit-transform": "rotate(-90deg)",
                    "-ms-transform": "rotate(-90deg)",
                    "transform": "rotate(-90deg)",
                    "top": "50%",
                    "left": "50%",
                    "margin-top": -1*height/2,
                    "margin-left": -1*width/2,
                })
            }
            return;
        } else if(focused != undefined) {
            var input_wrap = $("<div class=\"additional_text_area\"></div>")
            var input = $("<input type=\"text\"></input>");
            input_wrap.append(input);
            input_wrap.css({
                "width" : width,
                "height" : height,
                "line-height" : height + "px",
                "background" : "#000",
                "position" : "fixed",
                "top": 0,
                "left": 0,
            })
            if(IS_ROTATED) {
                input_wrap.css({
                    "-webkit-transform": "rotate(-90deg)",
                    "-ms-transform": "rotate(-90deg)",
                    "transform": "rotate(-90deg)",
                    "top": "50%",
                    "left": "50%",
                    "margin-top": -1*height/2,
                    "margin-left": -1*width/2,
                })
            }
            $("body").append(input_wrap);
            focused.blur();
            input.val(focused.val());
            input.get(0).focus();
            input.onEnterKey(function() {
                focused.val(input.val());
                focus_out();
//                input_wrap.remove();
            })
            return;
        }
        } else{
            test_count++;
        }
    }
    
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
        $(this).css({
            "width": is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"100vh":"100vw") : $(target).width(),
            "height": is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"100vw":"100vh") : $(target).height(),
            "line-height": is_fullscreen? (IS_ROTATED && IS_DOCUMENT_LOADED?"100vw":"100vh") : $(target).height()+"px",
            "-webkit-transform": "rotate("+deg+")",
            "-ms-transform": "rotate("+deg+")",
            "transform": "rotate(-"+deg+")",
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

