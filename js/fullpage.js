var page_wraps;
var MAX_PAGE;
var navigation;
var scroll_action_list;
var page_action_list;

var HEIGHT;

var page_num= 0;
var is_animating = false;
var IS_FULLPAGE_SCROLLABLE = true;
var SCROLL_ANIMATE_DELAY = 800;

function make_fullpage(sal, pal) {
    scroll_action_list = sal;
    page_action_list = pal;
    $("#wrap").css({
        "overflow":"hidden",
        "position":"relative",
        "width" : "100%",
        "height" : "100%",
    })
    var pages = $(".fullpage");
    var mouse_in = false;
    var starting_point = 0;
    for(var i= 0; i< pages.length; ++i) {
        var page = pages.eq(i);
        page.wrap("<div class=\"fullpage_wrap\"></div>");
        page.css({
            "width" : "100%",
            "height" : "100%",
            "position": "relative",
        })
        page.parent().css({
            "width": "100%",
            "height": "100%",
            "overflow": "hidden",
            "top": i * WINDOW_HEIGHT+ "px",
            "left": 0,
            "position": "absolute",
        }).on("mousemove touchmove", function(event){
            if(IS_FULLPAGE_SCROLLABLE) {
                var y= 0;
                if(event.type == "mousemove") {
                    //for web
                    y = IS_ROTATED? -1*event.pageX: event.pageY;
                } else{
                    //for mobile
                    if(event.targetTouches.length>1) {
                        return;
                    }
                    y = IS_ROTATED? -1*event.targetTouches[0].pageX: event.targetTouches[0].pageY;
                }
                if(mouse_in && !is_animating) {
                    if(starting_point == 0){
                        starting_point = y;
                    } 
                    var range = starting_point - y;
                    if(Math.abs(range) > WINDOW_HEIGHT*0.2) {
                        move(range<0?-1:+1);
                    }
                }
            }
        }).on("mousedown touchstart", function(event){
            focus_out();
            if(event.type == "mousedown" && 
                   event.target.tagName != "INPUT" && event.target.tagName != "TEXTAREA") {
                    //for web
                event.stopPropagation();
                event.preventDefault();
            }
            if(!mouse_in && !is_animating) {
                if(IS_FULLPAGE_SCROLLABLE) {
                    mouse_in = true;
                    starting_point = 0;
                }
            }
        }).on("mouseup touchend", function(event){
            mouse_in = false;
            starting_point = 0;
        }).on("mouseleave touchleave", function(event){
            mouse_in = false;
            starting_point = 0;
        });
//        }).mousemove(function(event){
//            if(mouse_in && !is_animating) {
//                if(starting_point == 0){
//                    starting_point = event.pageY;
//                } else {
//                    var range = starting_point - event.pageY;
//                    if(Math.abs(range) > HEIGHT*0.3) {
//                        move(range<0?-1:+1);
//                    }
//                }
//            }
//        }).mousedown(function(){
//            if(!mouse_in && !is_animating) {
//                mouse_in = true;
//                starting_point = 0;
//            }
//        }).mouseup(function(){
//            mouse_in = false;
//        }).mouseleave(function(){
//            mouse_in = false;
//        });
        if(page.find(".fullpage_scroll_wrap img").length>0) {
            var scroll_wrap = page.find(".fullpage_scroll_wrap");
            var scroll = scroll_wrap.find(".fullpage_scroll");
            var img = scroll_wrap.find("img");
            if(scroll.length == 0) {
                scroll = $("<div class=\"fullpage_scroll\"></div>");
                img.wrap(scroll);
            }
            scroll_wrap.css({
                "width": "100%",
                "height": WINDOW_HEIGHT,
                "left":"0",
                "bottom":"0",
                "z-index":"-1",
                "position":"absolute",
            })
            img.css({
                "width": "100%",
                "draggable": false,
            })
            console.log("fullpage height : " + WINDOW_HEIGHT);
            console.log("fullpage img height : " + img.height());
            console.log(img);
            scroll.css({
                "width":"100%",
                //height will be set when img loaded
                "height": img.height(),
                "left":"0",
                "bottom":"0",
                "position":"absolute",
            })
        }
    }
    page_wraps = $(".fullpage_wrap");
    MAX_PAGE = page_wraps.length;
    page_num= 0;
    navigation = $(".fullpage_navigation");

    function move(direction){
        var scroll_wrap = page_wraps.eq(page_num).find(".fullpage_scroll_wrap");
        var scroll = scroll_wrap.find(".fullpage_scroll");
//        var scroll = scroll_wrap.find("img");
        var has_scroll = scroll_wrap.length>0 && scroll.length>0;
        var is_available= page_num + direction < MAX_PAGE && page_num + direction>=0;
        var is_scrollable_up = false;
        var is_scrollable_down = false;

        if(has_scroll) {
            var bottom = parseInt(scroll.css("bottom").replace("px", "") *100) / 100;
            var expected = parseInt((scroll_wrap.height() - scroll.height()) *100) / 100;
            is_scrollable_up = direction>0 && bottom == 0;
            is_scrollable_down = direction<0 && bottom == expected;
        }
        if((!has_scroll || has_scroll && !is_scrollable_up && !is_scrollable_down) && is_available) {
            //page moving action.
            //so need to check 'is_available' before
            page_num +=direction;
            is_animating = true;
            var page_action = page_action_list[page_num];
            if(page_action !=undefined) {
                page_action["action"]();
            }
            if(navigation.length>0) {
                var lists = $(navigation).find("li");
                
                for(var i= 0; i< lists.length; ++i) {
                    if(i == page_num) {
                        lists.eq(i).addClass("fullpage_selected");
                    } else {
                        lists.eq(i).removeClass("fullpage_selected");
                    }
                }
            }
            for(var i= 0; i< MAX_PAGE; ++i) {
                page_wraps.eq(i).animate({
                    "top": (i-page_num)*WINDOW_HEIGHT,
                },SCROLL_ANIMATE_DELAY, function(){
                    if(is_animating) {
                        is_animating = false;
                        var previous_index = page_num - direction;
                        var previous_scroll = page_wraps.eq(previous_index).find(".fullpage_scroll_wrap .fullpage_scroll");
                        if(previous_scroll!=undefined && previous_scroll.length>0) {
                            //need to put callback action.
                            var action = scroll_action_list[previous_index];
                            if(action != undefined) {
                                action["callback"]();
                            }
                            previous_scroll.css("bottom", 0);
                        }
                    }
                    page_wraps.eq(i).clearQueue();
                });
            }
        } else if(is_scrollable_down || is_scrollable_up){
            var action = scroll_action_list[page_num];
            if(action !=undefined && action["direction"] == direction) {
                is_animating = true;
                action["action"]();
                setTimeout(function(){
                    scrolling();
                }, action["delay"],function(){
                    is_animating = false;
                });
            } else {
                if(action !=undefined && action["direction"] != direction){
                    scrolling(action["callback"]);
                } else {
                    scrolling();
                }
            }
        }
        function scrolling(callback) {
            is_animating = true;
            var bottom = 0;
            if(direction>0) {
                bottom = scroll_wrap.height()-scroll.height();
            }
            scroll.animate({
                "bottom" : bottom,
            },SCROLL_ANIMATE_DELAY, function(){
                if(is_animating) {
                    is_animating = false;
                }
                if(callback!=undefined) {
                    callback();
                }
                scroll.clearQueue()
            });
        }

//                    if(page_wraps.eq(page_num).has(".fullpage_scroll_wrap img")){
//                        var scroll_wrap = page_wraps.eq(page_num).find(".fullpage_scroll_wrap");
//                        var scroll = scroll_wrap.find("img");
//                        var scroll_height = scroll.height();
//                        is_animating = true;
//                        var bottom = 0;
//                        if(direction>0) {
//                            bottom = scroll_wrap.height()-scroll_height;
//                        }
//                        console.log(scroll_height + "," + scroll_wrap.height());
//                        console.log(bottom);
//                        scroll.animate({
//                            "bottom" : bottom,
//                        },800, function(){
//                            is_animating = false;
//                        });
//                    } else {
//                        is_animating = true;
//                        for(var i= 0; i< MAX_PAGE; ++i) {
//                            page_wraps.eq(i).animate({
//                                "top": (i-page_num)*HEIGHT,
//                            },800, function(){
//                                if(is_animating) {
//                                    is_animating = false;
//                                }
//                            });
//    //                        page_wraps.eq(i).css({
//    //                            "top": (i-page_num)*HEIGHT,
//    //                        })
//                        }
//                        page_num += direction;
//                    }
    }
    $("body").bind('mousewheel', function(event){
        if(event.originalEvent.wheelDelta /120 > 0) {
            if(!is_animating && IS_FULLPAGE_SCROLLABLE) {
                move(-1);
            }
        }
        else{
            if(!is_animating && IS_FULLPAGE_SCROLLABLE) {
                move(+1);
            }
        }
    });
}

function fullpage_resize() {
    console.log("fullpage_resize");
    var pages = $(".fullpage");
    var mouse_in = false;
    var starting_point = 0;
    for(var i= 0; i< pages.length; ++i) {
        var page = pages.eq(i);
//        page.css({
//            "height" : WINDOW_HEIGHT,
//        })
        page.parent().css({
            "top": (i-page_num)*WINDOW_HEIGHT+ "px",
        })
        var scroll_wrap = page.find(".fullpage_scroll_wrap");
        if(scroll_wrap.length>0) {
            var scroll = scroll_wrap.find(".fullpage_scroll");
            var img = scroll_wrap.find("img");
            scroll_wrap.css({
                "height": WINDOW_HEIGHT,
            })
            scroll.css({
                "height": img.height(),
            })
            var bottom = parseInt(scroll.css("bottom").replace("px", "") *100) / 100;
            if(bottom!=0) {
                scroll.css({
                    "bottom": scroll_wrap.height()-img.height(),
                })
            }
        }
    }
}

function page_move(index){
    if(!is_animating) {
        var previous_index = page_num;
        var is_available= index < MAX_PAGE && index>=0;
        if(is_available) {
            page_num = index;
            is_animating = true;
            var page_action = page_action_list[page_num];
            if(page_action !=undefined) {
                page_action["action"]();
            }
            if(navigation.length>0) {
                var lists = $(navigation).find("li");

                for(var i= 0; i< lists.length; ++i) {
                    if(i == page_num) {
                        lists.eq(i).addClass("fullpage_selected");
                    } else {
                        lists.eq(i).removeClass("fullpage_selected");
                    }
                }
            }
            for(var i= 0; i< MAX_PAGE; ++i) {
                page_wraps.eq(i).stop().animate({
                    "top": (i-page_num)*WINDOW_HEIGHT,
                },SCROLL_ANIMATE_DELAY, function(){
                    if(is_animating) {
                        is_animating = false;
                        var previous_scroll = page_wraps.eq(previous_index).find(".fullpage_scroll_wrap .fullpage_scroll");
                        if(previous_scroll!=undefined && previous_scroll.length>0) {
                            //need to put callback action.
                            var action = scroll_action_list[previous_index];
                            if(action != undefined) {
                                action["callback"]();
                            }
                            previous_scroll.css("bottom", 0);
                        }
                    }
                    page_wraps.eq(i).clearQueue();
                });
            }
        }
    }
}
$(document).ready(function() {
    window.addEventListener('resize', fullpage_resize);
})