var resources;
function show_detail_view(index) {
    if(resources!=undefined && resources.length>0) {
        var resource = resources.eq(index);
        var type = resource.find("type").text();
        var media = resource.find("media").text();
        var path = resource.find("path").text();
        var detail_view = $("<div class=\"detail_view\"></div>");
        $("body").append(detail_view);
        var notice_wrap = $("<div class\"notice_wrap\">Tap outside to close</div>");

        detail_view.css({
            "width": "100vw",
            "height": "100vh",
            "line-height": "100vh",
            "text-align": "center",
            "z-index": 101,
            "top": "0",
            "left": "0",
            "position": "fixed",
            "cursor":"pointer",
            "background": "rgba(0,0,0,0.5)",
        });
        notice_wrap.css({
            "height": "4vh",
            "width": "100%",
            "text-align": "center",
            "font-size": "2vh",
            "line-height": "4vh",
            "color": "#fff",
            
            "top": "4vh",
            "left": "0",
            "position": "absolute",
        })
        detail_view.append(notice_wrap);
        
        console.log(type);
        console.log(media);
        var content_css_value ={
            "max-width": "80vw",
            "max-height": "80vh",
            "display": "inline-block",
            "vertical-align": "middle",
            "cursor":"auto",
        }
        var content;
        if(type == "image"){
            content = $("<img class=\"detail_content\" src=\""+path+"\"/>");
            content.css(content_css_value);
        } else if(type == "video") {
            content = $("<video class=\"detail_content\" muted=\"true\" controls autoplay><source src=\""+path+"\" type=\"video/"+media+"\"/></video>");
            content.css(content_css_value);
        }
        if(content!=undefined) {
            detail_view.append(content);
            content.click(function(e) {
                e.stopPropagation();
            })
        }
        detail_view.click(function(e) {
            detail_view.remove();
        })
    }
}

function popup_resize(){
    console.log("map_resize");
    var popup = $(".popup");
    if(popup.length>0){
        popup.css({
            "width": WINDOW_WIDTH*0.6,
            "padding": WINDOW_WIDTH*0.08 + "px " + WINDOW_WIDTH*0.04 + "px",
            "border-radius": WINDOW_WIDTH*0.03,
            "margin-left": -1*WINDOW_WIDTH*0.32,
        });
        popup.find(".popup_content_wrap").css({
            "max-height": WINDOW_WIDTH*0.6,
        });
        popup.find(".button_close").css({
            "width": WINDOW_WIDTH*0.04,
            "height": WINDOW_WIDTH*0.04,
            "top": WINDOW_WIDTH*0.02,
            "right": WINDOW_WIDTH*0.02,
        })
        popup.find(".button_url").css({
            "width": WINDOW_WIDTH*0.1,
            "font-size": WINDOW_WIDTH*0.02,
            "bottom": WINDOW_WIDTH*0.02,
        })
        
        popup.find(".half_plain").css({
            "width":WINDOW_WIDTH*0.3,
        })
        popup.find(".title").css({
            "font-size": WINDOW_WIDTH*0.02,
            "line-height": WINDOW_WIDTH*0.03 + "px",
            "margin-top": WINDOW_WIDTH*0.015,
        })
        popup.find(".content").css({
            "font-size": WINDOW_WIDTH*0.018,
            "padding":WINDOW_WIDTH*0.005,
        })
        var icon_width = WINDOW_WIDTH*0.03;
        var text_width = popup.find(".popup_content_wrap").width() - icon_width*5/3 - WINDOW_WIDTH*0.01;
        popup.find(".content .icon").css({
            "width" : icon_width,
            "height" : icon_width,
            "margin" : "0 " + icon_width/3 + "px",
        })
        popup.find(".content .text").css({
            "width": text_width,
            "font-size": WINDOW_WIDTH*0.018,
        })
        popup.css({
            "bottom": (window.innerHeight-popup.outerHeight())/2 + "px",
        });
    }
}
function popup(meta) {
    if($(".popup").length==0){
        if(IS_FULLPAGE_SCROLLABLE !=undefined) {
            IS_FULLPAGE_SCROLLABLE = false;
        }
        var elements = $(meta).find("element");
        var popup = $("<div class=\"popup\"></div>");
        var popup_content_wrap = $("<div class=\"popup_content_wrap\"></div>");
        var button_close = $("<div class=\"button_close\"></div>");
        var resource_wrap = $("<ul class=\"resource_wrap\"></ul>")
//        var resource_wrap = $("<div class=\"resource_wrap\"></div>")
        popup.append(popup_content_wrap);
        popup_content_wrap.append(resource_wrap);
        $("body").append(popup);

        popup.css({
            "width": WINDOW_WIDTH*0.6,
            "padding": WINDOW_WIDTH*0.08 + "px " + WINDOW_WIDTH*0.04 + "px",
            "border-radius": WINDOW_WIDTH*0.03,
            "text-align": "left",
            "line-height":"normal",
            "background-color": "#002157",
            "border": "1px solid #fff",
            "color": "#fff",
        });
        popup_content_wrap.css({
            "width":"100%",
            "max-height":WINDOW_WIDTH*0.6,
            "text-align":"center",
            "overflow-y":"scroll",
        });
        resource_wrap.css({
//            "width": "100%",
            "width": WINDOW_WIDTH*0.6,
//            "max-height": WINDOW_WIDTH*0.2,
            "display":"inline-block",
            "overflow":"hidden",
            "text-align":"center",
        })
        
        for(var i= 0; i< elements.length; ++i) {
            var title_value = elements.eq(i).find("title").text();
            var type_value = elements.eq(i).find("type").text();
            var row = $("<div></div>");
            row.css({
                "text-align":"left",
                "width":"100%",
                "padding":0,
            });
            if(type_value == "half_plain") {
                row.attr("class","half_plain");
                row.css({
                    "width":WINDOW_WIDTH*0.3,
                    "display":"inline-block",
                    "vertical-align":"top",
                })
            }
            var title = $("<p class=\"title\"></p>");
            title.html(title_value);
            title.css({
                "font-size": WINDOW_WIDTH*0.02,
                "line-height": WINDOW_WIDTH*0.03 + "px",
                "margin-top": WINDOW_WIDTH*0.015,
            });
            row.append(title);

            var content_css_value = {
                "font-size": WINDOW_WIDTH*0.018,
                "padding":WINDOW_WIDTH*0.005,
                "line-height": "normal",
                "word-wrap":"break-word",
                "font-weight": 200,
            }
            if(type_value == "plain" || type_value == "half_plain") {
                var content_text_value = elements.eq(i).find("content").text();
                var content = $("<p class=\"content\"></p>");
                content.html(content_text_value);
                content.css(content_css_value);
                row.append(content);
            } else if(type_value == "list"){
                var content_value = elements.eq(i).find("content");
                var content = $("<ul class=\"content\"></ul>");
                for(var j= 0; j< content_value.length; ++j) {
                    var icon_value = content_value.eq(j).find("icon").text();
                    var text_value = content_value.eq(j).find("text").text();
                    var icon = $("<div class=\"icon\"></div>");
                    var text = $("<p class=\"text\"></p>");
                    var li = $("<li></li>");
                    var icon_width = WINDOW_WIDTH*0.03;
                    var text_width = popup_content_wrap.width() - icon_width*5/3 - WINDOW_WIDTH*0.01;
                    icon.css({
                        "width" : icon_width,
                        "height" : icon_width,
                        "margin" : "0 " + icon_width/3 + "px",
                        "background" : "url("+icon_value+") no-repeat",
                        "background-size" : "100%",
                        "display":"inline-block",
                        "vertical-align": "top",
                    });
                    text.html(text_value);
                    text.css({
                        "width": text_width,
                        "font-size": WINDOW_WIDTH*0.018,
                        "display":"inline-block",
                        "vertical-align":"top",
                    });
                    li.css(content_css_value);
                    li.css("padding",0);
                    li.append(icon);
                    li.append(text);
                    content.append(li);
                }
                row.append(content);
            }
            popup_content_wrap.append(row);
        }
        resources = $(meta).find("resources resource");
        var page = $(meta).find("resources page").text();
        if(resources.length == 0) {
            show_popup();
            return;
        }
        for(var i= 0; i< resources.length; ++i) {
            var resource = resources.eq(i);
            var type = resource.find("type").text();
            var thumb = resource.find("thumb").text();
            var img = $("<img src=\""+thumb+"\"/>");
            img.css({
                "cursor" : "pointer",
            })
            var index = i;
            img.click(function() {
                show_detail_view(index);
            })
            var li = $("<li></li>");
            li.css("position", "relative");
            var hover = $("<div class=\"hover\"></div>")
            hover.css({
                "width" : "100%",
                "height" : "100%",
                "top" : 0,
                "left" : 0,
                "z-index" : 1,
                "position": "absolute",
            })
            if(type == "image") {
                hover.css({
                    "background":"rgba(0, 0, 0, 0.5) url(./images/icon_open.png) no-repeat",
                    "background-size": WINDOW_WIDTH*0.05,
                    "background-position": "center",
                    "pointer-events":"none",
                })
            } else if(type =="video"){
                hover.css({
                    "background":"rgba(0, 0, 0, 0.5) url(./images/icon_play.png) no-repeat",
                    "background-size": WINDOW_WIDTH*0.05,
                    "background-position": "center",
                    "pointer-events":"none",
                })
            }
            li.hover(function() {
                $(this).append(hover);
            }, function() {
                hover.remove();
            })
            li.append(img);
            resource_wrap.append(li);
        }
        var images = resource_wrap.find("img");
        var load_count = images.length;

        $(images).on("load", function() {
            load_count --;
            if(load_count == 0) {
                resource_wrap.make_slider({
                    page: page,

                    buttons: true,
                    button_image_left: "./images/icon_button_left_small.png",
                    button_image_right: "./images/icon_button_right_small.png",
                    button_background:"rgba(155,155,155,0)",
//                    button_width:"25px",
//                    button_height: "25px",
                    button_flexible_width: function() {
                        return WINDOW_WIDTH* 0.03;
                    },
                    button_flexible_height: function() {
                        return WINDOW_WIDTH* 0.03;
                    },
                    button_dispersion: "0",
                    button_basic_color:"#000",

                    scrollable:false,

                    navigator: false,

                    slider_flexible_margin: function() {
                        return WINDOW_WIDTH* 0.015;
                    },
                    slider_flexible_width:function() {
                        return WINDOW_WIDTH* 0.6;
                    }
                });
                show_popup();
            }
        });
        function show_popup() {
            var url = $(meta).find("url");
            if(url.length>0) {
                var button_url = $("<div class=\"button_url\">Go to link!</div>")
                button_url.css({
                    "width": WINDOW_WIDTH*0.1,
                    "font-size": WINDOW_WIDTH*0.02,
                    "text-align":"center",
                    "cursor": "pointer",
                    "bottom": WINDOW_WIDTH*0.02,
                    "left": 0,
                    "right": 0,
                    "margin": "0 auto",
                    "position": "absolute",
                }).hover(function(){
                    $(this).css({
                        "margin-bottom": "-1px",
                        "border-bottom": "1px solid #fff",
                    });
                }, function(){
                    $(this).css({
                        "margin-bottom": 0,
                        "border": 0,
                    });
                }).click(function() {
                    console.log(url.text());
                    window.open(url.text());
    //                popup.animate({
    //                    "bottom":-1*popup.outerHeight(),
    //                },400,function(){
    //                    popup.remove();
    //                    is_scrollable = true;
    //                })
                });
                popup.append(button_url);
            }
            popup.append(button_close);
            button_close.css({
                "width": WINDOW_WIDTH*0.04,
                "height": WINDOW_WIDTH*0.04,
                "cursor": "pointer",
                "background": "url(./images/icon_close.png) no-repeat center",
                "background-size": "100%",
                "top": WINDOW_WIDTH*0.02,
                "right": WINDOW_WIDTH*0.02,
                "position": "absolute",
            }).click(function() {
                popup.animate({
                    "bottom":-1*popup.outerHeight(),
                },400,function(){
                    popup.remove();
                    IS_FULLPAGE_SCROLLABLE = true;
                })
            });
            popup.css({
                "bottom":-1*popup.outerHeight(),
                "left": "50%",
                "margin-left": -1*WINDOW_WIDTH*0.32,
                "z-index": "100",
                "position": "fixed",
            });
            popup.animate({
                "bottom": (window.innerHeight-popup.outerHeight())/2 + "px",
            },400);
        }
    }
}
$(document).ready(function() {
    window.addEventListener('resize', popup_resize);
})