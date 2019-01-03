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
            return IS_PORTRAIT? CONTENT_WIDTH*0.05: CONTENT_WIDTH* 0.03;
        },
        button_flexible_height: function() {
            return IS_PORTRAIT? CONTENT_WIDTH*0.05: CONTENT_WIDTH* 0.03;
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

//var section_05_values= {
//    "#section_05 .text_wrap": ["width", "padding", "border-radius"],
//    "#section_05 form": ["padding"],
//    "#section_05 form p": ["font-size", "line-height", "margin"],
//    "#section_05 form textarea": ["font-size", "line-height"],
//    "#section_05 form input": ["font-size", "line-height"],
//    "#section_05 form textarea": ["line-height"],
//    "#section_05 form input[type=submit]": ["width", "padding", "font-size", "bottom", "margin"],
//}

$(document).ready(function(){
    IS_DOCUMENT_LOADED = true;
    $("body").css({
        "width": WINDOW_WIDTH,
        "height": WINDOW_HEIGHT,
        "line-height": WINDOW_HEIGHT + "px",
    })
    $("#wrap").click(function(event) {
        if(!$(event.target).is("input[type=text]") && !$(event.target).is("textarea")) {
            focus_out();
        }
    })
    $("input[type=text], textarea").focusin(function() {
        IS_FULLPAGE_SCROLLABLE = false;
        var offset = $(this).offset().top;
        document.body.scrollTop = offset;
    })
    $("input[type=text], textarea").focusout(function() {
        IS_FULLPAGE_SCROLLABLE = true;
    })
    if(IS_PORTRAIT) {
        $("#button_gnb").css({
            "bottom": -1 * WINDOW_HEIGHT*0.24,
        });
    }
        
    $("#section_05").on("resize",function() {
        if(IS_PORTRAIT) {
            $(this).find(".content_wrap").removeAttr("style");
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
                "font-size": WINDOW_WIDTH*0.03,
                "line-height": WINDOW_WIDTH*0.06 + "px",
            })
            $(this).find("form input[type=submit]").css({
                "width": WINDOW_WIDTH*0.4,
                "padding": WINDOW_WIDTH*0.02,
                "font-size": WINDOW_WIDTH*0.04,
                "bottom": WINDOW_WIDTH*0.05,
                "margin-left": -1*WINDOW_WIDTH*0.2,
            })
        } else {
            $(this).find(".content_wrap").css({
                "line-height": CONTENT_WIDTH*0.7 + "px",
            })
            $(this).find(".section_title").css({
                "font-size": CONTENT_WIDTH*0.06,
                "line-height": CONTENT_WIDTH*0.12 + "px",
            })
            $(this).find(".text_wrap").css({
                "width": WINDOW_WIDTH*0.7,
                "padding-bottom": WINDOW_WIDTH*0.12,
                "border-radius": WINDOW_WIDTH*0.03,
            })
            $(this).find("form").css({
                "padding": "0 " + WINDOW_WIDTH*0.04 +"px",
            })
            $(this).find("form p").css({
                "font-size": WINDOW_WIDTH*0.025,
                "line-height": WINDOW_WIDTH*0.04 + "px",
                "margin": WINDOW_WIDTH*0.02 +"px 0 0 0",
            })
            $(this).find("form textarea, form input").css({
                "font-size": WINDOW_WIDTH*0.02,
                "line-height": WINDOW_WIDTH*0.06 + "px",
            })
            $(this).find("form input[type=submit]").css({
                "width": WINDOW_WIDTH*0.26,
                "padding": WINDOW_WIDTH*0.015,
                "font-size": WINDOW_WIDTH*0.025,
                "bottom": WINDOW_WIDTH*0.02,
                "margin-left": -1*WINDOW_WIDTH*0.13,
            })
        }
    })
    $("#section_05").resize();
    
    window.addEventListener("resize", function() {
        console.log("resize");
//        resize_standard();
        
        var screen_degree = SCREEN_DEGREE;
        var keyboard_opened = false;
        if(IS_ANDROID) {
            if((ORIGINAL_WIDTH == WINDOW_WIDTH && ORIGINAL_HEIGHT == WINDOW_HEIGHT ||
               ORIGINAL_WIDTH == WINDOW_HEIGHT && ORIGINAL_HEIGHT == WINDOW_WIDTH)) {
            } else {
                keyboard_opened = true;
            }
        }
        
        check_device();
        check_resolution();
        
        if(screen_degree != SCREEN_DEGREE) {
            ORIGINAL_WIDTH = WINDOW_WIDTH;
            ORIGINAL_HEIGHT = WINDOW_HEIGHT;
        }
        
        if(IS_ANDROID) {
            if((ORIGINAL_WIDTH == WINDOW_WIDTH && ORIGINAL_HEIGHT == WINDOW_HEIGHT ||
               ORIGINAL_WIDTH == WINDOW_HEIGHT && ORIGINAL_HEIGHT == WINDOW_WIDTH)) {
                if(keyboard_opened) {
                    focus_out();
                }
            } else {
                $("body").css({
                    "height": WINDOW_HEIGHT*3/2,
                })
                return;
            }
        }
        $("#section_05").resize();
//        $("body").css({
//            "width": WINDOW_WIDTH,
//            "height": WINDOW_HEIGHT,
//            "line-height": WINDOW_HEIGHT + "px",
//        })
        $("#wrap").css({
            "width": WINDOW_WIDTH,
            "height": WINDOW_HEIGHT,
            "line-height": WINDOW_HEIGHT + "px",
        })
        
        var list_names = ["language_list", "platform_list", "tool_list"];
        var slide_pages = [5, 3, 2];
        if(IS_PORTRAIT) {
            slide_pages = [3, 3, 3];
        }

        for(var i= 0; i< list_names.length; ++i) {
            var slider = $("."+list_names[i]);
            slider.data("page_size", slide_pages[i]);
            slider.resize();
        }

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
        
        if(IS_IOS) {
            var input_wrap = $(".extra_input_area");
            if(input_wrap.length > 0){
            }
        }else if(IS_ANDROID) {
        }
    });
})

$(window).on("load",function() {
    $("#wrap").css("opacity",1);
    finish_loading($("body"));
    
    //skill list load
    $.get("./meta/skill_list.xml", function(data) 
    {
        var list_names = ["language_list", "platform_list", "tool_list"];
        var background_colors = ["#440e62", "#0d004c", "#003663"];
        var slide_pages = [5, 3, 2];
        if(IS_PORTRAIT) {
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
                console.log("action");
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
                    console.log("height : "+height);
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
                console.log(rocket.attr("style"));
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
        if(IS_PORTRAIT) {
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
        if(IS_PORTRAIT) {
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
        if(IS_PORTRAIT) {
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
        if(IS_PORTRAIT) {
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