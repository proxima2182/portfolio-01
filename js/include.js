function load_skills(data, list_name, background_color, slide_page) {
    var meta = $(data);
    var list = meta.find("list[name=\""+list_name+"\"]"+" element");
    var ul=$("."+list_name);
    list.each(function() {
        var li = $("<li><div><p class=\"name\"></p></div><ul class=\"level_list\"><li></li><li></li><li></li></ul></li>");
        var name = li.find(".name");
        name.parent().css({
            "background":background_color,
        })
        name.html($(this).find("name").text());
        var levels = li.find(".level_list li");
        for(var i= 0; i< $(this).find("level").text(); ++i) {
            levels.eq(i).addClass("active");
        }
        ul.append(li);
    })
    
    ul.slider_initialize({
        "page": slide_page,

        "buttons": true,
        "button_image_left": "./images/icon_button_left_small.png",
        "button_image_right": "./images/icon_button_right_small.png",
        "button_background":"rgba(155,155,155,0)",
//        "button_width":"25px",
//        "button_height": "25px",
        button_flexible_width: function() {
            return IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.05: CONTENT_WIDTH* 0.03;
        },
        button_flexible_height: function() {
            return IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.05: CONTENT_WIDTH* 0.03;
        },
        
        "button_dispersion": "0",
        "button_basic_color":"#000",

        "scrollable":true,

        "navigator": false,
    });
}
function mail_success(){
    $(".gform").get(0).reset();
    alert("The mail has been sent successfully!");
}
function mail_fail(){
    alert("The email address is not valid!");
}

check_device();
check_resolution();
var ORIGINAL_WIDTH = WINDOW_WIDTH;
var ORIGINAL_HEIGHT = WINDOW_HEIGHT;

function gnb_init() {
    if(IS_SCREEN_PORTRAIT) {
        if(FULLPAGE_INDEX == 0) {
            $("#button_gnb").css({
                "bottom": -1 * WINDOW_HEIGHT*0.24,
            });
        } else{
            $("#button_gnb").css({
                "bottom": WINDOW_WIDTH*0.08,
            });
        }
    } else{
        if(FULLPAGE_INDEX == 0) {
            $("#header").css({
                "bottom": -1 * WINDOW_HEIGHT,
            });
        } else{
            $("#header").css({
                "bottom": 0,
            });
        }
    }
}

function check_keyboard_open() {
    if((ORIGINAL_WIDTH == WINDOW_WIDTH && ORIGINAL_HEIGHT == WINDOW_HEIGHT ||
       ORIGINAL_WIDTH == WINDOW_HEIGHT && ORIGINAL_HEIGHT == WINDOW_WIDTH)) {
        return false;
    }
    return true;
}

function page_down() {
    page_move(1);
}

$(document).ready(function(){
    IS_DOCUMENT_LOADED = true;
    check_device();
    $("body").css({
        "width": WINDOW_WIDTH,
        "height": WINDOW_HEIGHT,
        "line-height": WINDOW_HEIGHT + "px",
    })
    $("#wrap").css({
        "width": WINDOW_WIDTH,
        "height": WINDOW_HEIGHT,
        "line-height": WINDOW_HEIGHT + "px",
    })
    $("input[type=text], textarea").focusin(function() {
        if(!IS_MOBILE) return;
        IS_FULLPAGE_SCROLLABLE = false;
        if(IS_ANDROID) {
            var parent_offset = $("#wrap").offset().top;
            var offset = $(this).offset().top - parent_offset;

            if(check_keyboard_open()){
                offset -= $(window).innerHeight()/2;
                if(offset<0) {
                    offset = 0;
                }
                $("#wrap").offset({top: -1*offset});
            } else {
                $("#wrap").data("offset", offset);
            }
        }
    })
    $("input[type=text], textarea").focusout(function() {
        if(!IS_MOBILE) return;
        IS_FULLPAGE_SCROLLABLE = true;
    })
    gnb_init();
    
    $("#section_05").on("resize",function() {
        if(!IS_MOBILE) return;
        if(IS_SCREEN_PORTRAIT) {
            $(this).find(".content_wrap").css({
                "width": WINDOW_WIDTH*0.9,
                "height": WINDOW_WIDTH*1.26,
                "line-height": WINDOW_WIDTH*1.26+"px",
                "margin-left": -1*WINDOW_WIDTH*0.45,
                "margin-top": -1*WINDOW_WIDTH*0.73,
            })
            $(this).find(".section_title").css({
                "font-size": WINDOW_WIDTH*0.06,
                "line-height": WINDOW_WIDTH*0.12 + "px",
            })
            $(this).find(".text_wrap").css({
                "width": WINDOW_WIDTH*0.9,
                "padding-bottom": WINDOW_WIDTH*0.24,
                "border-radius": WINDOW_WIDTH*0.03,
            })
            $(this).find("form").css({
                "padding": "0 " + WINDOW_WIDTH*0.05 +"px",
            })
            $(this).find("form p").css({
                "font-size": WINDOW_WIDTH*0.04,
                "line-height": WINDOW_WIDTH*0.06 + "px",
                "margin": WINDOW_WIDTH*0.03 +"px 0 0 0",
            })
            $(this).find("form textarea, form input").css({
                "height": WINDOW_WIDTH*0.06,
                "font-size": WINDOW_WIDTH*0.03,
                "line-height": WINDOW_WIDTH*0.06 + "px",
            })
            $(this).find("form textarea").css({
                "height": WINDOW_WIDTH*0.12,
            })
            $(this).find("form input[type=submit]").css({
                "height": "auto",
                "width": WINDOW_WIDTH*0.4,
                "padding": WINDOW_WIDTH*0.02,
                "font-size": WINDOW_WIDTH*0.04,
                "bottom": WINDOW_WIDTH*0.05,
                "margin-left": -1*WINDOW_WIDTH*0.2,
            })
        } else {
            $(this).find(".content_wrap").css({
                "width": CONTENT_WIDTH*0.9,
                "height": CONTENT_WIDTH*0.9,
                "line-height": CONTENT_WIDTH*0.9+"px",
                "margin-top": -1*CONTENT_WIDTH*0.45,
                "margin-left": -1*CONTENT_WIDTH*0.45,
            })
            $(this).find(".section_title").css({
                "font-size": CONTENT_WIDTH*0.04,
                "line-height": CONTENT_WIDTH*0.06 + "px",
            })
            $(this).find(".text_wrap").css({
                "width": CONTENT_WIDTH*0.7,
                "padding-bottom": CONTENT_WIDTH*0.12,
                "border-radius": CONTENT_WIDTH*0.03,
            })
            $(this).find("form").css({
                "padding": "0 " + CONTENT_WIDTH*0.04 +"px",
            })
            $(this).find("form p").css({
                "font-size": CONTENT_WIDTH*0.025,
                "line-height": CONTENT_WIDTH*0.04 + "px",
                "margin": CONTENT_WIDTH*0.02 +"px 0 0 0",
            })
            $(this).find("form textarea, form input").css({
                "height": CONTENT_WIDTH*0.06,
                "font-size": CONTENT_WIDTH*0.02,
                "line-height": CONTENT_WIDTH*0.06 + "px",
            })
            $(this).find("form textarea").css({
                "height": CONTENT_WIDTH*0.12,
            })
            $(this).find("form input[type=submit]").css({
                "height": "auto",
                "width": CONTENT_WIDTH*0.26,
                "padding": CONTENT_WIDTH*0.01,
                "font-size": CONTENT_WIDTH*0.025,
                "bottom": CONTENT_WIDTH*0.02,
                "margin-left": -1*CONTENT_WIDTH*0.13,
            })
        }
    })
    $("#section_05").resize();
    
    window.addEventListener("resize", function() {
//        resize_standard();
        
        var screen_degree = SCREEN_DEGREE;
        var is_keyboard_opened = false;
        if(IS_ANDROID) {
            is_keyboard_opened = check_keyboard_open();
        }
        
        check_device();
        check_resolution();
        
        if(screen_degree != SCREEN_DEGREE) {
            ORIGINAL_WIDTH = WINDOW_WIDTH;
            ORIGINAL_HEIGHT = WINDOW_HEIGHT;
        }
        
        if(IS_ANDROID) {
            if(check_keyboard_open()) {
                if($("#wrap").data("offset")!=undefined) {
                    var offset = $("#wrap").data("offset");
                    offset -= $(window).innerHeight()/2;
                    if(offset<0) {
                        offset = 0;
                    }
                    $("#wrap").offset({top: -1*offset});
                    $("#wrap").data("offset", undefined);
                }
                return;
            } else {
                if(is_keyboard_opened){
                    focus_out();
                }
            }
        }
        
        $("#wrap").offset({top: 0});
        $("body").removeAttr("style");
        $("#wrap").css({
            "width": WINDOW_WIDTH,
            "height": WINDOW_HEIGHT,
            "line-height": WINDOW_HEIGHT + "px",
        })
        $("body").css({
            "width": WINDOW_WIDTH,
            "height": WINDOW_HEIGHT,
            "line-height": WINDOW_HEIGHT + "px",
        })
        $("#section_05").resize();
        
        /*---- skill list update start ----*/
        var list_names = ["language_list", "platform_list", "tool_list"];
        var slide_pages = [5, 3, 2];
        if(IS_SCREEN_PORTRAIT) {
            slide_pages = [3, 3, 3];
        }

        for(var i= 0; i< list_names.length; ++i) {
            var slider = $("."+list_names[i]);
            slider.data("page_size", slide_pages[i]);
            slider.resize();
        }
        /*---- skill list update end ----*/
        
        gnb_init();
        fullpage_resize();
        map_resize();
        
        var popup = $(".popup");
        if(popup.length>0){
            popup.resize();
        }
        
        var loading = $(".section_loading");
        if(loading.length>0) {
            loading.each(function() {
                $(this).resize();
            })
        }
        //need to add gnb resize & fullscreen resize
    });
})

$(window).on("load",function() {
    $("#wrap").css("opacity",1);
    finish_loading($("body"));
    
    //move this calling function from $(document).ready() scince it don't call sometimes.
    $("#wrap").click(function(event) {
        if(!$(event.target).is("input[type=text]") && !$(event.target).is("textarea")) {
            focus_out();
        }
    })
    
    //skill list load
    $.get("./meta/skill_list.xml", function(data) 
    {
        var list_names = ["language_list", "platform_list", "tool_list"];
        var background_colors = ["#440e62", "#0d004c", "#003663"];
        var slide_pages = [5, 3, 2];
        if(IS_SCREEN_PORTRAIT) {
            slide_pages = [3, 3, 3];
        }
        for(var i= 0; i< list_names.length; ++i) {
            load_skills(data, list_names[i], background_colors[i], slide_pages[i]);
        }
    });
    
    //basic functions
    var scroll_action_list={
        0:{
            action:function(){
                var effect = $("#section_01 .icon_effect");
                var rocket = $("#section_01 .icon_rocket img");
                var rocket_off = $("#section_01 .icon_rocket img.off");
                var rocket_on = $("#section_01 .icon_rocket img.on");
                effect.css({
                    "opacity":"0",
                })
                setTimeout(function(){
                    rocket_off.css("display","none");
                    rocket_on.css("display","block");
                }, 300);
                effect.animate({
                    "opacity":"1",
                },300).animate({
                    "opacity":"0",
                },300);
                if(IS_PORTRAIT){
                    var height = WINDOW_HEIGHT - rocket_on.height();
                    setTimeout(function(){
                        $("#section_01 .icon_rocket").animate({
                            bottom: height,
                        },900);
                    },300);
                }
            },
            callback: function(){
                setTimeout(function(){
                    $("#section_01 .icon_rocket img.off").css("display","block");
                    $("#section_01 .icon_rocket img.on").css("display","none");
                },600);
                var rocket = $("#section_01 .icon_rocket");
                if(rocket.attr("style")!=undefined) {
                    rocket.animate({
                        bottom: (WINDOW_WIDTH*0.18),
                    },600, function() {
                        rocket.removeAttr("style");
                    });
                }
            },
            direction:1,
            delay:600,
        },
    };
    function click_navigation(index) {
        if(IS_SCREEN_PORTRAIT) {
            if(index != 0) {
                $("#button_gnb").animate({
                    "bottom": WINDOW_WIDTH*0.08,
                },600);
            }
            $("#header").css({
                "display":"none",
                "bottom": 0,
            })
        }
        page_move(index);
    }
    
    //mobile portrait functions
    $("#button_gnb").click(function() {
        $("#button_gnb").animate({
            "bottom": -1 * WINDOW_HEIGHT*0.24,
        },600);
        $("#header").css({
            "display":"block",
            "bottom": 0,
        })
    })
    $("#header").click(function(event) {
        if(event.target!=this) return;
        if(IS_SCREEN_PORTRAIT) {
            $("#button_gnb").animate({
                "bottom": WINDOW_WIDTH*0.08,
            },600);
            $(this).css({
                "display":"none",
                "bottom": 0,
            });
        }
    })
    function close_navigation(){
        if(IS_SCREEN_PORTRAIT) {
            $("#button_gnb").animate({
                "bottom": -1 * WINDOW_WIDTH*0.24,
            },600);
        } else {
            $("#header").animate({
                "bottom": -1 * WINDOW_HEIGHT,
            },600);
        }
    }
    function open_navigation(){
        if(IS_SCREEN_PORTRAIT) {
            $("#button_gnb").animate({
                "bottom": WINDOW_WIDTH*0.08,
            },600);
        } else {
            setTimeout(function(){
                $("#header").animate({
                    "bottom": 0,
                },600);
            }, 200);
        }
    }
    var page_action_list=
        {
            0:{
                action: close_navigation,
            },
            1:{
                action: open_navigation,
            },
            2:{
                action: open_navigation,
            },
            3:{
                action: function() {
                    map_resize();
                    open_navigation();
                },
            },
            4:{
                action: open_navigation,
            },
        };
    function animate() {
        var icon_down = $("#section_01 .icon_down");
        icon_down.css({
            "margin-bottom": CONTENT_WIDTH*0.01,
        })
        icon_down.animate({
            "margin-bottom": 0,
        }, 800)
    }
    animate();
    setInterval(function() {
        animate();
    },1200);
    make_fullpage(scroll_action_list, page_action_list);
    $("#section_05 video").get(0).play();
    
    $("#home").click(function(){
        click_navigation(0);
    })
    $(".fullpage_navigation li").click(function(){
        if(IS_FULLPAGE_SCROLLABLE) {
            click_navigation($(this).index());
        }
    })
    
    
    load_map(function() {
        page_move(0);
    });

    $(".button_profile").click(function() {
        $.get("./meta/popup_about.xml", function(data) {
            var meta = $(data);
            popup(data);
        });
    })
})