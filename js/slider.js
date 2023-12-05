$.fn.slider_initialize = function(opt){
    var slider = $(this);
    var button_wrap;
    var option = opt;
    var has_slider_flexible_width = option["slider_flexible_width"] != undefined;
    $(this).wrap("<div class='slider_touch_area'></div>");
    var touch_area = $(this).parent();
    touch_area.css({
        "width": slider.width(),
        "height": "auto",
        "position": "relative",
        "display":"inline-block",
    });
    $(this).wrap("<div class='slider_wrap'></div>");
    $(this).parent().css({
        "width": slider.width(),
        "height": "auto",
        "overflow": "hidden",
        "position": "relative",
    });
        
    var list= $(this).find('>li');
    var width= 0;
    var slider_height= has_slider_flexible_width? 0: $(this).height();
    var PAGE_SIZE= 4;
    
    var starting_point=0;
    var now_pos_x= 0;
    
    var navigator;

    if(option["page"]!=undefined) {
        PAGE_SIZE = option["page"];
    } else if(list.length<4) {
        PAGE_SIZE = list.length;
    }
    
    
    /*element height, width are updated and apply new width to each elements*/
    
    var slider_width = has_slider_flexible_width? option["slider_flexible_width"]() : $(slider).width();
    var elem_width = parseInt(slider_width/PAGE_SIZE*100)/100;
    var margin = option["slider_flexible_margin"] != undefined ? option["slider_flexible_margin"]() : 0 ;
    
    for(var i= 0; i< list.length; ++i) {
        var li = list.eq(i);
        li.css({
            "width": elem_width + "px",
            "display": "inline-block",
            "text-align":"center",
            "position": "absolute",
            "top": 0,
            "left": width + "px",
        });
        var elem_height = li.height();
        var image = li.find('img');
        if(image ==undefined || image.length == 0) {
            image = li.find('div');
            if(image !=undefined && image.length>0) {
                image.css({
                    "width": elem_width - 2 * margin,
                    "height": elem_width - 2 * margin,
                    "display": "inline-block",
                    "vertical-align": "middle",
                })
                slider_height = elem_width
            }
        } else {
            if(image !=undefined && image.length>0) {
                if(option["scrollable"] != undefined && option["scrollable"] == true) {
                    image.attr("draggable","false");
                }
                elem_height = image.height()/image.width() * elem_width;
                image.css({
                    "width": elem_width - 2*margin,
                    "height": elem_height - 2*margin,
                    "display": "inline-block",
                    "vertical-align": "middle",
                })
            }
        }
        var elem = list.get(i);
        slider_height = slider_height>elem_height? slider_height: elem_height;
        width+= elem_width;
    }
    if(list.length < PAGE_SIZE) {
        var additional_left = (slider_width - list.length*elem_width)/2;
        list.css({
            "left":"+="+additional_left,
        });
    }
    if(has_slider_flexible_width) {
        list.css({
            "line-height": slider_height + "px",
        })
        $(this).css({
            "width": width,
            "height": slider_height,
        });
    }
    
    /*attach navigation buttons*/
    var prev;
    var next;
    if(option["buttons"]) {
        prev = $("<div class='slider_prev'>"+(option["button_image_left"]!=undefined?"":"&lt;")+"</div>");
        next = $("<div class='slider_next'>"+(option["button_image_right"]!=undefined?"":"&gt;")+"</div>");
        slider.append(prev);
        slider.append(next);
        
        var button_height = option["button_height"]!=undefined?option["button_height"]: slider_height;
        button_height = option["button_flexible_height"] !=undefined?option["button_flexible_height"]() : button_height;
        var button_width = option["button_width"]!=undefined?option["button_width"]: 40;
        button_width = option["button_flexible_width"] !=undefined?option["button_flexible_width"]() : button_width;
        var dispersion = option["button_dispersion"]!=undefined?option["button_dispersion"].replace("px",""): 0;

//        button_wrap.css({
//            "width":"100%",
//            "height":slider_height,
//            "top":0,
//            "left":0,
//            "z-index":10,
//            "position": "absolute",
//        });
//        var height_value = button_height.match(/\d+/);
//        var unit_value = button_height.replace(/\d+/, "");
        var btn_attr={
            "width": button_width,
            "height": button_height,
            "line-height": button_height + "px",
            "text-align": "center",
            "font-style": "normal",
            "cursor": "pointer",
            "color": option["button_basic_color"]!=undefined?option["button_basic_color"]:"#fff",
            "font-size": "30px",
            "z-index":"50",
            "opacity": "1",
            
            "top": "50%",
            "margin-top": -1*button_height/2,
            "position": "absolute",
        };
        prev.css(btn_attr);
        prev.css({
            "background": (option["button_background"]!=undefined?option["button_background"]:"rgba(0,0,0,0.3)")+(option["button_image_left"]!=undefined?" url("+option["button_image_left"]+") no-repeat center":""),
            "background-size":"100%",
            "left": dispersion*-1 + "px",
        });
        next.css(btn_attr);
        next.css({
            "background": (option["button_background"]!=undefined?option["button_background"]:"rgba(0,0,0,0.3)")+(option["button_image_right"]!=undefined?" url("+option["button_image_right"]+") no-repeat center":""),
            "background-size":"100%",
            "right": dispersion*-1 + "px",
        });
        
        prev.click(function(){
            move_smoothly(now_pos_x + elem_width, 500);
        })
        next.click(function(){
            move_smoothly(now_pos_x - elem_width, 500);
        })
    }
    var option_background_off = option["navigator_color_off"]!=undefined? option["navigator_color_off"]:"#fff";
    var option_background_on = option["navigator_color_on"]!=undefined? option["navigator_color_on"]:"#000";
    
    if(option["navigator"]){
        var navigator_height = option["navigator_height"]!=undefined?option["navigator_height"].replace("px",""): 14;
        var navigator_width = option["navigator_width"]!=undefined?option["navigator_width"].replace("px",""): 14;
        
        var ul = $("<ul class=\"slider_navigator\"></ul>");
        for(var i= 0; i< list.length; ++i) {
            ul.append("<li></li>")
        }
        touch_area.append(ul);
        navigator = ul.find("li");
        
        ul.css({
            "width":"100%",
            "height": navigator_height + "px",
            "text-align": option["navigator_position"]!=undefined? option["navigator_position"]:"center",
            "bottom": option["navigator_bottom"]!=undefined? option["navigator_bottom"]:"14px",
            "margin-bottom": option["navigator_margin_bottom"]!=undefined? option["navigator_margin_bottom"]:0,
            "left":0,
            "position": "absolute",
        })
        navigator.css({
            "width": navigator_width + "px",
            "height": navigator_height + "px",
            "margin": "0 "+navigator_height/2+"px",
            "display": "inline-block",
            "cursor": "pointer",
            "border-radius": option["navigator_radious"]!=undefined? option["navigator_radious"]:"50%",
        })
        navigator.click(function(){
            move_smoothly(-1*$(this).index() * elem_width);
        })
    }
    
    button_display(0);
    
    /*add mouse events and define function finalize() for animation what makes suite for each index of images*/
    
    var MIN_POS_X= elem_width*(list.length - PAGE_SIZE)*-1;
    var MAX_POS_X= 0;
    
    var mouse_in = false;
    var is_animating = false;
    var range= 0;
    
    function button_display(index){
        if(navigator!=undefined){
            for(var i= 0; i< navigator.length;++i) {
                if(i == -1*index){
                    navigator.eq(i).css("background-color",option_background_on);
                } else {
                    navigator.eq(i).css("background-color",option_background_off);
                }
            }
        }
        if(prev!=undefined && next!=undefined) {
            if(index == 0) {
                prev.css({
                    "cursor":"auto",
                });
                prev.animate({
                    "opacity": 0,
                }, 100);
            } else {
                prev.css({
                    "cursor":"pointer",
                });
                prev.animate({
                    "opacity": 1,
                }, 100);
            }
            if(PAGE_SIZE - index >= list.length) {
                next.css({
                    "cursor":"auto",
                });
                next.animate({
                    "opacity": 0,
                }, 100);
            } else {
                next.css({
                    "cursor":"pointer",
                });
                next.animate({
                    "opacity": 1,
                }, 100);
            }
        }
    }
    
    function move(x) {
        if(x > MIN_POS_X && x <= MAX_POS_X) {
            for(var i= 0; i< list.length; ++i) {
                list.eq(i).css("left", x + i*elem_width);
            }
            now_pos_x = x;
        }
    }
    
    function move_smoothly(x, delay) {
        if(delay === undefined) {
          delay = 200;
        }
        if(x >= MIN_POS_X && x <= MAX_POS_X && !is_animating){
            is_animating = true;
            for(var i= 0; i< list.length; ++i) {
                list.eq(i).animate({
                    "left":x + i*elem_width
                }, delay, function(){
                    if(is_animating){
                        is_animating = false;
                        now_pos_x = x;
                        range= 0;
                        button_display(parseInt(now_pos_x/elem_width));
                    }
                });
            }
        }
    }
    
    function finalize(){
        if(range!=0) {
            var dest_pos_x= now_pos_x- range;
            var elem_index = parseInt(dest_pos_x/elem_width  -0.5);
            dest_pos_x = elem_width * elem_index;
            move_smoothly(dest_pos_x);
        }
    };
    
    if(option["scrollable"]) {
        touch_area
        .on("mousemove touchmove", function(event){
            var x= 0;
            if(event.type == "mousemove") {
                //for web
//                    y = IS_SCREEN_PORTRAIT? -1*event.pageX: event.pageY;
                x = event.pageX;
            } else{
                //for mobile
                if(event.targetTouches.length>1) {
                    return;
                }
//                    y = IS_SCREEN_PORTRAIT? -1*event.targetTouches[0].pageX: event.targetTouches[0].pageY;
                x = event.targetTouches[0].pageX;
            }
            event.preventDefault();
            if(mouse_in && !is_animating) {
                if(starting_point == 0){
                    starting_point = x;
                } else {
                    range = parseInt((starting_point - x)/10);
                    move(now_pos_x - range);
                }
            }
        }).on("mousedown touchstart", function(event){
            if(!mouse_in && !is_animating) {
                mouse_in = true;
                starting_point = 0;
            }
        }).on("mouseup touchend", function(event){
            if(mouse_in && !is_animating) {
                mouse_in = false;
                finalize();
            }
        }).on("mouseleave touchleave", function(event){
            if(mouse_in && !is_animating) {
                mouse_in = false;
                finalize();
            }
        });
//        .mousemove(function(event){
//            if(mouse_in && !is_animating) {
//                if(starting_point == 0){
//                    starting_point = event.pageX;
//                } else {
//                    range = parseInt((starting_point - event.pageX)/10);
//                    move(now_pos_x - range);
//                }
//            }
//        })
//        .mousedown(function(){
//            if(!mouse_in && !is_animating) {
//                mouse_in = true;
//                starting_point = 0;
//            }
//        }).mouseup(function(){
//            if(mouse_in && !is_animating) {
//                mouse_in = false;
//                finalize();
//            }
//        }).mouseleave(function(){
//            if(mouse_in && !is_animating) {
//                mouse_in = false;
//                finalize();
//            }
//        });
    }
    slider.on("resize", function() {
        var is_page_changed = slider.data("page_size")!=undefined;
        PAGE_SIZE = is_page_changed? slider.data("page_size"): PAGE_SIZE;
        width= 0;
        slider_height= has_slider_flexible_width? 0 : $(slider).height();

        var slider_width = has_slider_flexible_width? option["slider_flexible_width"]() : $(slider).width();
        var index = parseInt(now_pos_x/elem_width);
        elem_width = parseInt(slider_width/PAGE_SIZE*100)/100;
        now_pos_x = index * elem_width;

        var list= $(slider).find('>li');
        var margin = option["slider_flexible_margin"] != undefined ? option["slider_flexible_margin"]() : 0 ;
        
        for(var i= 0; i< list.length; ++i) {
            var li = list.eq(i);
            li.css({
                "width": elem_width + "px",
                "left": width + now_pos_x + "px",
            });
            var elem_height = li.height();
            var image = li.find('img');
            if(image ==undefined || image.length == 0) {
                image = li.find('div');
                if(image !=undefined && image.length>0) {
                    image.css({
                        "width": elem_width - 2 * margin,
                        "height": elem_width - 2 * margin,
                    })
                }
            } else {
                if(image !=undefined && image.length>0) {
                    elem_height = (image.height() + margin*2)/(image.width() + margin*2) * elem_width;
                    image.css({
                        "width": elem_width - 2*margin,
                        "height": elem_height - 2*margin,
                    })
                }
            }
            var elem = list.get(i);
            slider_height = slider_height>elem_height? slider_height: elem_height;
            width+= elem_width;
        }
        var css_value = {
            "width": slider_width,
            "height": slider_height,
        };
        if(list.length < PAGE_SIZE) {
            var additional_left = (slider_width - list.length*elem_width)/2;
            list.css({
                "left":"+="+additional_left,
            });
        }
        
        if(has_slider_flexible_width) {
            list.css({
                "line-height": slider_height + "px",
            })
            slider.css(css_value);
        }
        slider.parents(".slider_wrap, li, .slider_touch_area").css(css_value);
        button_height = option["button_flexible_height"] !=undefined?option["button_flexible_height"]() : button_height;
        button_width = option["button_flexible_width"] !=undefined?option["button_flexible_width"]() : button_width;
        
        slider.find(".slider_prev, .slider_next").css({
            "width": button_width,
            "height": button_height,
        })
        
        MIN_POS_X= elem_width*(list.length - PAGE_SIZE)*-1;
        MAX_POS_X= 0;
        if(is_page_changed) {
            move_smoothly(0,0);
        }
    })
}
