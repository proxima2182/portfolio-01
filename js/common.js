var CONTENT_WIDTH;
var WINDOW_WIDTH, WINDOW_HEIGHT;
var IS_ROTATED = false;
var IS_MOBILE = false;

var root = document.documentElement;

function focus_check(bulr){
    var need_resize = true;
   $('input').each(function() {
       if($(this).is(":focus")) {
           need_resize = false;
           if(bulr) $(this).blur();
       }
   })
   $('textarea').each(function() {
       if($(this).is(":focus")) {
           need_resize = false;
           if(bulr) $(this).blur();
       }
   })
    return need_resize;
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

function resize() {
    var need_resize = focus_check();
    var need_rotate = false;
//    if(!need_resize) {
//        return false;
//    }
   if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        IS_MOBILE = true;
    } else {
        IS_MOBILE = false;
    }
    console.log("resize");
    if(IS_MOBILE) {
        if(window.innerHeight > window.innerWidth) {
            need_rotate = true;
        } else {
            need_rotate = false;
        }
    } else {
        need_rotate = false;
    }
    console.log("need_rotate : " + need_rotate +", IS_ROTATED : " + IS_ROTATED+ ", need_resize : "+ need_resize);
    if(need_rotate == IS_ROTATED) {
        IS_ROTATED = need_rotate;
        focus_check(true);
//        return;
    }
    IS_ROTATED = need_rotate;
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    if(IS_ROTATED) {
        WINDOW_WIDTH = window.innerHeight;
        WINDOW_HEIGHT = window.innerWidth;
    }
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
    console.log("height : " + WINDOW_HEIGHT + ", width : "+ WINDOW_WIDTH);
    if(WINDOW_WIDTH>=1000 && WINDOW_HEIGHT>=800) {
        console.log("condition 01");
        CONTENT_WIDTH = 1000;
    }else if(WINDOW_HEIGHT<800 && WINDOW_WIDTH/WINDOW_HEIGHT>1.25) {
        console.log("condition 02");
        CONTENT_WIDTH = WINDOW_HEIGHT* 1.25;
    }else {
        console.log("condition 03");
        CONTENT_WIDTH = WINDOW_WIDTH;
    }
    root.style.setProperty('--content_wrap_width', CONTENT_WIDTH*0.8 + "px");
    root.style.setProperty('--content_wrap_height', CONTENT_WIDTH*0.7 + "px");
    root.style.setProperty('--content_wrap_margin_top', -1*CONTENT_WIDTH*0.35 + "px");
    root.style.setProperty('--content_wrap_margin_left',  -1*CONTENT_WIDTH*0.4 + "px");
    
    root.style.setProperty('--header_height', WINDOW_HEIGHT + "px");
    root.style.setProperty('--header_bottom', -1* WINDOW_HEIGHT + "px");
    
    root.style.setProperty('--section_01_rokcet_width', CONTENT_WIDTH*0.36 + "px");
    root.style.setProperty('--section_01_rokcet_height', CONTENT_WIDTH*0.75 + "px");
    root.style.setProperty('--section_01_rokcet_margin_left', -1*CONTENT_WIDTH*0.18 + "px");
    root.style.setProperty('--section_01_effect_width', CONTENT_WIDTH*0.46 + "px");
    root.style.setProperty('--section_01_effect_height', CONTENT_WIDTH*0.2 + "px");
    root.style.setProperty('--section_01_effect_margin_left', -1*CONTENT_WIDTH*0.23 + "px");
    
    root.style.setProperty('--section_02_tag_width', CONTENT_WIDTH*0.25 + "px");
    root.style.setProperty('--section_02_button_width', CONTENT_WIDTH*0.55 + "px");
    root.style.setProperty('--section_02_button_img_height', CONTENT_WIDTH*0.45 + "px");
    
    root.style.setProperty('--section_03_ul_height', CONTENT_WIDTH*0.18 + "px");
    root.style.setProperty('--section_03_li_width', CONTENT_WIDTH*0.12 + "px");
    root.style.setProperty('--section_03_li_height', CONTENT_WIDTH*0.16 + "px");
    root.style.setProperty('--section_03_ball_size', CONTENT_WIDTH*0.11 + "px");
    root.style.setProperty('--section_03_language_width', CONTENT_WIDTH*0.8 + "px");
    root.style.setProperty('--section_03_platform_width', CONTENT_WIDTH*0.48 + "px");
    root.style.setProperty('--section_03_tool_width', CONTENT_WIDTH*0.32 + "px");
    
    root.style.setProperty('--section_05_text_wrap_width', CONTENT_WIDTH*0.7 + "px");
    root.style.setProperty('--section_05_button_width', CONTENT_WIDTH*0.26 + "px");
    root.style.setProperty('--section_05_button_margin_left', -1*CONTENT_WIDTH*0.13 + "px");
    
    root.style.setProperty('--0_5',  CONTENT_WIDTH*0.005 + "px");
    root.style.setProperty('--1',  CONTENT_WIDTH*0.01 + "px");
    root.style.setProperty('--2',  CONTENT_WIDTH*0.02 + "px");
    root.style.setProperty('--2_5',  CONTENT_WIDTH*0.025 + "px");
    root.style.setProperty('--3',  CONTENT_WIDTH*0.03 + "px");
    root.style.setProperty('--4',  CONTENT_WIDTH*0.04 + "px");
    root.style.setProperty('--6',  CONTENT_WIDTH*0.06 + "px");
    root.style.setProperty('--8',  CONTENT_WIDTH*0.08 + "px");
    root.style.setProperty('--10',  CONTENT_WIDTH*0.1 + "px");
    root.style.setProperty('--15',  CONTENT_WIDTH*0.15 + "px");
    root.style.setProperty('--30',  CONTENT_WIDTH*0.3 + "px");
    root.style.setProperty('--40',  CONTENT_WIDTH*0.4 + "px");
    root.style.setProperty('--60',  CONTENT_WIDTH*0.6 + "px");
    
}

resize();
window.addEventListener('resize', resize);