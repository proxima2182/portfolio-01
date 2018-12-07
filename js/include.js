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
            return WINDOW_WIDTH* 0.025;
        },
        button_flexible_height: function() {
            return WINDOW_WIDTH* 0.025;
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
function add_enter() {
    map_clear(1);
    var container = $("<div id=\"section_enter\"></div>");
    container.css({
        "width": "100%",
        "height": "100%",
        "background": "#1c2e5f",
        "top": 0,
        "left": 0,
        "z-index": 150,
        "position": "fixed",
    });
    $("body").append(container);
    var background = $("<div class=\"background\"></div>");
    var css_value = {
        "position": "absolute",
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0,
        "margin": "auto",
    };
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
//                    container.append(background);
    var ul = $("<ul class=\"enter_ul\"></ul>")
    var li = unit_nodata_li
    (AREA_WIDTH*2, AREA_HEIGHT*2, WINDOW_WIDTH*-0.04, 1,
     0, bg_image_nodata, ["./images/icon_enter_off.png", "./images/icon_enter_on.png"]);
    li.css({
        "line-height":"normal",
    })
    var data_li = unit_nodata_info_li
    (AREA_WIDTH*2, BOX_SIZE*2, WINDOW_WIDTH*0.03,
     0, AREA_HEIGHT*7/3, "Enter to the page!", function() {
        requestFullscreen($("html")[0]);
    })
    ul.css(css_value);
    ul.css({
        "width": AREA_WIDTH*2,
        "height": AREA_HEIGHT*4,
        "display": "inline-block",
        "vertical-align": "middle",
        "z-index":4,
    })
    data_li.css({
        "line-height":BOX_SIZE+"px",
    })
    ul.append(li);
    ul.append(data_li);
    container.append(ul);
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
                    console.log("callback");
                    $("#section_01 .icon_rocket img.off").css("display","block");
                    $("#section_01 .icon_rocket img.on").css("display","none");
                },
                direction:1,
                delay:600,
            },
        };
    function close_navigation(){
        $("#header").animate({
            "bottom":"-100vh",
        },600);
    }
    function open_navigation(){
        setTimeout(function(){
            $("#header").animate({
                "bottom":"0",
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
    if(window.innerWidth<768 && document.fullscreenEnabled) {
        add_enter();
    }
})