//function resource_loading() {
//    var perfData = window.performance.timing, // The PerformanceTiming interface
//    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart), // Calculated Estimated Time of Page Load which returns negative value.
//    time = parseInt((EstimatedTime/1000)%60)*100;
//    console.log("now1 : "+new Date().getTime());
//    console.log("start : " + perfData.navigationStart);
//    console.log("end : " + perfData.loadEventEnd);
//    
//    var range = 100,
//      current = 0,
//      stepTime = Math.abs(Math.floor(time / range));
//    
//    var loadTime = (window.performance.timing.domComplete- window.performance.timing.navigationStart)/1000;
//    console.log(loadTime);
//    
//    var container = $("<div id=\"section_loading\">");
//    var width = WINDOW_WIDTH;
//    var height = WINDOW_HEIGHT;
//    var background_color = "#1c2e5f";
//    var deg = "0deg";
//    if(IS_ROTATED) {
//        width = WINDOW_HEIGHT;
//        height = WINDOW_WIDTH;
//        deg = "-90deg";
//    }
//    container.css({
//        "width": width,
//        "height": height,
//        "background": background_color,
//        "-webkit-transform": "rotate("+deg+")",
//        "-ms-transform": "rotate("+deg+")",
//        "transform": "rotate(-"+deg+")",
//        "top": "50%",
//        "left": "50%",
//        "margin-top": -1*height/2,
//        "margin-left": -1*width/2,
//        "z-index": 151,
//        "position": "fixed",
//    });
//    var width = parseInt(CONTENT_WIDTH*0.12);
//    var border_width = parseInt(CONTENT_WIDTH*0.01);
//    var font_size = parseInt(CONTENT_WIDTH*0.03);
//    var progress = make_progress_loading(width, border_width, font_size, background_color, "#fff");
//    container.append(progress);
//    $("body").append(container);
//    progress.update_progress(0);
//    var interval = setInterval(function() {
//        current ++;
//        
//        if(current > 100) {
//            container.animate({
//                opacity: 0,
//            }, 500, function() {
//                clearInterval(interval);
//                container.remove();
//            });
//        } else {
//            progress.update_progress(current);
//        }
//    }, stepTime);
//}
//function make_progress_loading(width, border_width, font_size, background_color, point_color) {
//    var absolute_center_css = {
//        "top": 0,
//        "right": 0,
//        "left": 0,
//        "bottom": 0,
//        "margin": "auto",
//        "position": "absolute",
//    };
//    
//    var circle_width = width + border_width*2;
//    var circle_half_width = circle_width/2;
//    var big_circle_width = circle_width + 10;
//    var big_circle_half_width = big_circle_width/2;
//    var progress_wrap = $("<div class=\"progress_wrap\"></div>");
//    var corver_circle = $("<div class=\"circle corver_circle\"></div>");
//    var circle_wrap = $("<div class=\"circle_wrap\"></div>")
//    var radius_circle = $("<div class=\"circle radius_circle\"></div>");
//    var text = $("<p class=\"text_wrap\"></p>");
//    progress_wrap.css({
//        "width": big_circle_width,
//        "height": big_circle_width,
//        "position": "relative",
//        "display": "inline-block",
//        "vertical-align": "middle",
//    })
//    corver_circle.css(absolute_center_css);
//    corver_circle.css({
//        "width": big_circle_width,
//        "height": big_circle_width,
//        "border-radius": "50%",
//        "background" : background_color,
//        "clip": "rect(0, "+big_circle_width+"px, "+big_circle_width+"px, "+big_circle_half_width+"px)",
//        "z-index":1,
//    });
//    text.css({
//        "width": big_circle_width,
//        "height": big_circle_width,
//        "line-height": big_circle_width + "px",
//        "font-size": font_size,
//        "color": point_color,
//        "top": 0,
//        "left": 0,
//        "z-index": 2,
//        "position": "absolute",
//    })
//    circle_wrap.css(absolute_center_css);
//    circle_wrap.css({
//        "width": circle_width,
//        "height": circle_width,
//    })
//    
//    radius_circle.css(absolute_center_css);
//    radius_circle.css({
//        "width": width,
//        "height": width,
//        "border-radius": "50%",
//        "border": border_width+"px solid "+point_color,
//    });
//    var radius_circle_clone = radius_circle.clone();
//    radius_circle_clone.css({
//        "display": "none",
//        "clip": "rect(0, "+circle_half_width+"px, "+circle_width+"px, 0)",
//    })
//    radius_circle.css({
//        "clip": "rect(0, "+circle_width+"px, "+circle_width+"px, "+circle_half_width+"px)",
//    })
//    $.fn.update_progress = function(progress) {
//        text.html(progress +"%");
//        if(progress<=50) {
//            corver_circle.css({
//                "border-color" : background_color,
//                "transform" :"rotate("+(progress)*3.6+"deg)",
//                "display": "block",
//            })
//            radius_circle_clone.css({
//                "display": "none",
//            })
//            if(progress == 50) {
//                corver_circle.css({
//                    "display": "none",
//                })
//            }
//        }
//        if(progress>50) {
//            corver_circle.css({
//                "display": "none",
//            })
//            radius_circle_clone.css({
//                "transform" :"rotate("+progress*3.6+"deg)",
//                "display": "block",
//            })
//        }
//    }
//    progress_wrap.append(text);
//    progress_wrap.append(corver_circle);
//    progress_wrap.append(circle_wrap);
//    circle_wrap.append(radius_circle);
//    circle_wrap.append(radius_circle_clone);
//    return progress_wrap;
//}
function make_loading() {
    var container = $("<div id=\"section_loading\">");
    var width = WINDOW_WIDTH;
    var height = WINDOW_HEIGHT;
    var background_color = "#1c2e5f";
    var point_color = "#fff";
    var deg = "0deg";
    if(IS_ROTATED) {
        width = WINDOW_HEIGHT;
        height = WINDOW_WIDTH;
        deg = "-90deg";
    }
    container.css({
        "width": width,
        "height": height,
        "background": background_color,
        "-webkit-transform": "rotate("+deg+")",
        "-ms-transform": "rotate("+deg+")",
        "transform": "rotate("+deg+")",
        "top": "50%",
        "left": "50%",
        "margin-top": -1*height/2,
        "margin-left": -1*width/2,
        "z-index": 152,
        "position": "fixed",
    });
    var common_css ={
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
        "margin" : "auto",
        "position" : "absolute",
    };
    var width = parseInt(CONTENT_WIDTH*0.12);
    var border_width = parseInt(CONTENT_WIDTH*0.015);
    var loading_wrap = $("<div class=\"loading_wrap rotate\"><div>");
    loading_wrap.css({
        "width": width,
        "height": width,
        "display": "inline-block",
        "vertical-align": "center",
        "position":"relative",
    });
    
    function generate_square(class_name, index, color) {
        var result = $("<div class=\""+class_name+"\"></div>");
        result.css(common_css);
        result.css({
            "width": width - i*border_width,
            "height": width - i*border_width,
            "background-color": color,
            "z-index": index,
        });
        return result;
    }
    var square_classes=["outer_square", "middle_square", "inner_square","moving_square"];
    var squares = [];
    for(var i= 0; i< square_classes.length; ++i) {
        squares[i] = generate_square(square_classes[i],i,i%2==0?point_color:background_color);
        loading_wrap.append(squares[i]);
    }
    
    function animate(){
//        console.log("execute interval");
//        loading_wrap.animate(
//            {rotation: 360},
//            {
//                duration: 1600,
//                step: function(now, fx) {
//                    $(this).css({"transform": "rotate("+now+"deg)"});
//                }
//            },function() {
//                $(this).css({"transform": "rotate(0deg)"});
//            }
//        );
        squares[3].animate({
            "width": 0,
            "height": 0,
        },800).animate({
            "width": width - 3*border_width,
            "height": width - 3*border_width,
        });
    }
    animate();
    setInterval(animate,1600);
    
    container.append(loading_wrap);
    $("body").append(container);
}
function loading_resize() {
    
}
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
    
    ul.make_slider({
        "page": slide_page,

        "buttons": true,
        "button_image_left": "./images/icon_button_left_small.png",
        "button_image_right": "./images/icon_button_right_small.png",
        "button_background":"rgba(155,155,155,0)",
//        "button_width":"25px",
//        "button_height": "25px",
        button_flexible_width: function() {
            return IS_MOBILE? CONTENT_WIDTH* 0.04 :CONTENT_WIDTH* 0.03;
        },
        button_flexible_height: function() {
            return IS_MOBILE? CONTENT_WIDTH* 0.04 :CONTENT_WIDTH* 0.03;
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
function resize_enter() {
    var container = $("#section_enter");
    if(container.length>0) {
        map_clear(1);
        var width = WINDOW_WIDTH;
        var height = WINDOW_HEIGHT;
        var deg = "0deg";
        if(IS_ROTATED) {
            width = WINDOW_HEIGHT;
            height = WINDOW_WIDTH;
            deg = "-90deg";
        }
        container.css({
            "width": width,
            "height": height,
            "-webkit-transform": "rotate("+deg+")",
            "-ms-transform": "rotate("+deg+")",
            "transform": "rotate(-"+deg+")",
            "margin-top": -1*height/2,
            "margin-left": -1*width/2,
        })
        container.children().remove();
        make_enter_element(container);
    }   
}
function make_enter_element(container){
    var css_value = {
        "position": "absolute",
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
        "margin": "auto",
    };
    var ul = $("<ul class=\"enter_ul\"></ul>")
    var li = unit_nodata_li
    (AREA_WIDTH*2, AREA_HEIGHT*2, CONTENT_WIDTH*-0.04, 1,
     0, bg_image_nodata, ["./images/icon_enter_off.png", "./images/icon_enter_on.png"]);
    li.css({
        "line-height":"normal",
    })
    var data_li = unit_nodata_info_li
    (AREA_WIDTH*2, BOX_SIZE*2, CONTENT_WIDTH*0.03,
     0, AREA_HEIGHT*7/3, "Enter to the page!")
    ul.css(css_value);
    ul.css({
        "width": AREA_WIDTH*2,
        "height": AREA_HEIGHT*4,
        "display": "inline-block",
        "vertical-align": "middle",
        "z-index":4,
        "cursor": "pointer",
    })
    ul.click(function() {
        screenfull.request();
        container.remove();
        resize();
    });
    data_li.css({
        "line-height":BOX_SIZE+"px",
    })
    ul.append(li);
    ul.append(data_li);
    container.append(ul);
}
function make_enter() {
    $(".popup").remove();
    IS_FULLPAGE_SCROLLABLE = true;
    map_clear(1);
    var container = $("<div id=\"section_enter\"></div>");
    var width = WINDOW_WIDTH;
    var height = WINDOW_HEIGHT;
    var deg = "0deg";
    if(IS_ROTATED) {
        width = WINDOW_HEIGHT;
        height = WINDOW_WIDTH;
        deg = "-90deg";
    }
    container.css({
        "width": width,
        "height": height,
        "background": "#1c2e5f",
        "-webkit-transform": "rotate("+deg+")",
        "-ms-transform": "rotate("+deg+")",
        "transform": "rotate(-"+deg+")",
        "top": "50%",
        "left": "50%",
        "margin-top": -1*height/2,
        "margin-left": -1*width/2,
        "z-index": 150,
        "position": "fixed",
    });
    $("body").append(container);
    var css_value = {
        "position": "absolute",
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
        "margin": "auto",
    };
    function background_animate() {
        var background = $("<div class=\"background\"></div>");
        background.css(css_value);
        var colors=["#32004b", "#440e62", "#1c2e5f"];
        var count = 3;
        for(var i= 0; i< count; ++i ) {
            let clone = background.clone();
            clone.css({
                "width":0,
                "height":0,
                "border-radius": "50%",
                "background-color": colors[i],
                "z-index":i,
            })
            container.append(clone);
            setTimeout(function() {
                clone.animate({
                    "width":AREA_HEIGHT*3,
                    "height":AREA_HEIGHT*3,
                },600, function() {
                    count --;
                    if(count == 0){
                        container.find(".background").remove();
                    }
                });
            }, 300 * i);
        }
    }
    background_animate();
    container.children().remove();
    make_enter_element(container);
}
$(document).ready(function(){
    //skill list load
    $.get("./meta/skill_list.xml", function(data) 
    {
        var list_names = ["language_list", "platform_list", "tool_list"];
        var background_colors = ["#440e62", "#0d004c", "#003663"];
        var slide_pages = [5, 3, 2];
        for(var i= 0; i< list_names.length; ++i) {
            load_skills(data, list_names[i], background_colors[i], slide_pages[i]);
        }
    });
    
    //basic functions
    var scroll_action_list=
        {
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
                },
                callback: function(){
                    $("#section_01 .icon_rocket img.off").css("display","block");
                    $("#section_01 .icon_rocket img.on").css("display","none");
                },
                direction:1,
                delay:600,
            },
        };
    function close_navigation(){
        $("#header").animate({
            "bottom": -1 * WINDOW_HEIGHT,
        },600);
    }
    function open_navigation(){
        setTimeout(function(){
            $("#header").animate({
                "bottom": 0,
            },600);
        }, 200);
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
                action: open_navigation,
            },
            4:{
                action: open_navigation,
            },
        };
    make_fullpage(scroll_action_list, page_action_list);
    $("#section_05 video").get(0).play();
    
    $("#home").click(function(){
        page_move(0);
    })
    $(".fullpage_navigation li").click(function(){
        if(IS_FULLPAGE_SCROLLABLE) {
            page_move($(this).index());
        }
    })
    if(IS_MOBILE){
        if(screenfull.enabled) {
            screenfull.on("change", function() {
                if(!screenfull.isFullscreen) {
                    make_enter();
                } else {
                    resize();
                }
            })
            make_enter();
        }
    }
    window.addEventListener("resize",resize_enter);
    window.addEventListener("resize",function() {
        var video = $("#section_05 video");
    });
})

$(window).on("load",function() {
    var loading = $("#section_loading");
    if(loading.length>0) {
        $("#section_loading").animate({
            opacity: 0,
        }, 500, function() {
            $(this).remove();
        });
    }
})