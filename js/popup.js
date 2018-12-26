var resources;
function show_detail_view(index) {
    if(resources!=undefined && resources.length>0) {
        var resource = resources.eq(index);
        var type = resource.find("type").text();
        var media = resource.find("media").text();
        var path = resource.find("path").text();
        var detail_view = $("<div class=\"detail_view\"></div>");
        $("#wrap").append(detail_view);
        var notice_wrap = $("<div class\"notice_wrap\">Tap outside to close</div>");

        detail_view.css({
            "text-align": "center",
            "z-index": 101,
            "top": "50%",
            "left": "50%",
            "position": "fixed",
            "cursor":"pointer",
            "background": "rgba(0,0,0,0.5)",
        });
        notice_wrap.css({
            "width": "100%",
            "text-align": "center",
            "color": "#fff",
            "left": 0,
            "top": 0,
            "position": "absolute",
        })
        detail_view.append(notice_wrap);
        
        var content_css_value ={
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
            $('video source').last().on('error', function(event) {
                alert(event);
            });
        }
        if(content!=undefined) {
            detail_view.append(content);
            content.click(function(e) {
                e.stopPropagation();
            })
            content.off("load");
            $("body>.section_loading").remove();
            if(!content.complete) {
                make_loading($("#wrap"), false, 0.08, 0.012, "rgba(0,0,0,0)", "#9d1f60");
            }
            content.on("load loadeddata" ,function() {
                $("#wrap>.section_loading").remove();
            })
        }
        detail_view.click(function(e) {
            detail_view.remove();
            e.stopPropagation();
        })
        detail_view.on("resize", function() {
            detail_view.css({
                "width": WINDOW_WIDTH,
                "height": WINDOW_HEIGHT,
                "line-height": WINDOW_HEIGHT + "px",
                "margin-top": -1*WINDOW_HEIGHT/2,
                "margin-left": -1*WINDOW_WIDTH/2,
            });
            notice_wrap.css({
                "height": IS_MOBILE ? WINDOW_HEIGHT*0.1 : WINDOW_HEIGHT*0.1,
                "font-size": IS_MOBILE ? WINDOW_HEIGHT*0.05:WINDOW_HEIGHT*0.03,
                "line-height": (IS_MOBILE ? WINDOW_HEIGHT*0.1:WINDOW_HEIGHT*0.1) +"px",
            })

            var content_css_value ={
                "margin-top":IS_MOBILE? WINDOW_HEIGHT*0.05: 0,
                "max-width": WINDOW_WIDTH*0.8,
                "max-height": WINDOW_HEIGHT*0.8,
            }
            content.css(content_css_value);
        });
        detail_view.resize();
    }
}
function popup_resize(){
    var popup = $(".popup");
    if(popup.length>0){
        popup.css({
            "width": CONTENT_WIDTH*0.6,
            "max-height": WINDOW_HEIGHT*0.8,
            "padding": CONTENT_WIDTH*0.08 + "px " + CONTENT_WIDTH*0.04 + "px",
            "border-radius": CONTENT_WIDTH*0.03,
            "margin-left": -1*CONTENT_WIDTH*0.32,
        });
        popup.find(".popup_content_wrap").css({
            "max-height": WINDOW_HEIGHT*0.6,
        });
        popup.find(".button_close").css({
            "width": CONTENT_WIDTH*0.04,
            "height": CONTENT_WIDTH*0.04,
            "top": CONTENT_WIDTH*0.02,
            "right": CONTENT_WIDTH*0.02,
        })
        popup.find(".button_url").css({
            "width": CONTENT_WIDTH*0.15,
            "font-size": CONTENT_WIDTH*0.02,
            "bottom": CONTENT_WIDTH*0.02,
        })
        popup.find(".project_title").css({
            "width": CONTENT_WIDTH*0.56,
            "font-size": CONTENT_WIDTH*0.025,
            "height": CONTENT_WIDTH*0.04,
            "line-height": CONTENT_WIDTH*0.04+"px",
            "top": CONTENT_WIDTH*0.02,
            "left": CONTENT_WIDTH*0.04,
        })
        
        popup.find(".half_plain").css({
            "width":CONTENT_WIDTH*0.3,
        })
        popup.find(".title").css({
            "font-size": CONTENT_WIDTH*0.025,
            "line-height": CONTENT_WIDTH*0.03 + "px",
            "margin-top": CONTENT_WIDTH*0.015,
        })
        popup.find("content").css({
            "font-size": CONTENT_WIDTH*0.02,
            "padding":CONTENT_WIDTH*0.005,
        })
        var icon_width = CONTENT_WIDTH*0.04;
        var text_width = popup.find(".popup_content_wrap").width() - icon_width*6/4 - CONTENT_WIDTH*0.01;
        popup.find(".content .icon").css({
            "width" : icon_width,
            "height" : icon_width,
            "margin" : "0 " + icon_width/4 + "px",
        })
        popup.find(".content .text").css({
            "width": text_width,
            "font-size": CONTENT_WIDTH*0.02,
        })
        popup.find("ul.content li").css({
            "padding":0,
            "margin-top": CONTENT_WIDTH*0.01,
        })
        popup.css({
            "bottom": (WINDOW_HEIGHT-popup.outerHeight())/2 + "px",
        });
    }
    var detail_view = $(".detail_view");
    if(detail_view.length>0) {
        detail_view.resize();
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
        $("#wrap").append(popup);

        popup.css({
            "opacity":0,
            "width": CONTENT_WIDTH*0.6,
            "max-height": WINDOW_HEIGHT*0.8,
            "padding": CONTENT_WIDTH*0.08 + "px " + CONTENT_WIDTH*0.04 + "px",
            "border-radius": CONTENT_WIDTH*0.03,
            "line-height":"normal",
            "background-color": "#002157",
            "border": "1px solid #fff",
            "color": "#fff",
        });
        popup_content_wrap.css({
            "width":"100%",
            "max-height": WINDOW_HEIGHT*0.6,
            "text-align":"left",
            "overflow-y":"scroll",
        });
        resource_wrap.css({
//            "width": "100%",
            "width": CONTENT_WIDTH*0.6,
//            "max-height": CONTENT_WIDTH*0.2,
            "margin": "0 auto",
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
                    "width":CONTENT_WIDTH*0.3,
                    "display":"inline-block",
                    "vertical-align":"top",
                })
            }
            var title = $("<p class=\"title\"></p>");
            title.html(title_value);
            title.css({
                "font-size": CONTENT_WIDTH*0.025,
                "line-height": CONTENT_WIDTH*0.03 + "px",
                "margin-top": CONTENT_WIDTH*0.015,
            });
            row.append(title);

            var content_css_value = {
                "font-size": CONTENT_WIDTH*0.02,
                "padding":CONTENT_WIDTH*0.005,
                "line-height": "normal",
                "word-wrap":"break-word",
                "font-weight": 200,
            }
            if(type_value == "plain" || type_value == "half_plain") {
                var content_text_value = elements.eq(i).find("content").text();
                var content = $("<p class=\"content\"></p>");
                content_text_value = content_text_value.replace(/\\n/gi,"<br/>");
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
                    text_value = text_value.replace(/\\n/gi,"<br/>");
                    var li = $("<li></li>");
                    var icon_width = CONTENT_WIDTH*0.04;
                    var text_width = popup_content_wrap.width() - icon_width*6/4 - CONTENT_WIDTH*0.01;
                    icon.css({
                        "width" : icon_width,
                        "height" : icon_width,
                        "margin" : "0 " + icon_width/4 + "px",
                        "background" : "url("+icon_value+") no-repeat",
                        "background-size" : "100%",
                        "display":"inline-block",
                        "vertical-align": "top",
                    });
                    text.html(text_value);
                    text.css({
                        "width": text_width,
                        "font-size": CONTENT_WIDTH*0.02,
                        "display":"inline-block",
                        "vertical-align":"top",
                    });
                    li.css(content_css_value);
                    li.css({
                        "padding":0,
                        "margin-top": CONTENT_WIDTH*0.01,
                    });
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
                    "background-size": CONTENT_WIDTH*0.05,
                    "background-position": "center",
                    "pointer-events":"none",
                })
            } else if(type =="video"){
                hover.css({
                    "background":"rgba(0, 0, 0, 0.5) url(./images/icon_play.png) no-repeat",
                    "background-size": CONTENT_WIDTH*0.05,
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
            li.click(function() {
                show_detail_view($(this).index());
            })
            resource_wrap.append(li);
        }
        var images = resource_wrap.find("img");
        var load_count = images.length;

        make_loading($("body"), true, 0.08, 0.012, "rgba(0,0,0,0)", "#9d1f60");
        $(images).on("load", function() {
            load_count --;
            if(load_count == 0) {
                resource_wrap.make_slider({
                    page: page,

                    buttons: true,
                    button_image_left: "./images/icon_button_left_small.png",
                    button_image_right: "./images/icon_button_right_small.png",
                    button_background:"rgba(155,155,155,0)",
                    button_flexible_width: function() {
                        if(IS_MOBILE) {
                            return CONTENT_WIDTH* 0.04;
                        }
                        return CONTENT_WIDTH* 0.03;
                    },
                    button_flexible_height: function() {
                        if(IS_MOBILE) {
                            return CONTENT_WIDTH* 0.04;
                        }
                        return CONTENT_WIDTH* 0.03;
                    },
                    button_dispersion: "0",
                    button_basic_color:"#000",

                    scrollable:false,

                    navigator: false,

                    slider_flexible_margin: function() {
                        return CONTENT_WIDTH* 0.015;
                    },
                    slider_flexible_width:function() {
                        return CONTENT_WIDTH* 0.6;
                    }
                });
                show_popup();
            }
        });
        function show_popup() {
            var loading = $("body>.section_loading");
            if(loading.length>0) {
                loading.remove();
            }
            var url = $(meta).find("url");
            var name = $(meta).find("name");
            if(name.length>0) {
                var title = $("<p class=\"project_title\">"+name.text()+"</p>")
                title.css({
                    "width": CONTENT_WIDTH*0.56,
                    "font-size": CONTENT_WIDTH*0.025,
                    "height": CONTENT_WIDTH*0.04,
                    "line-height": CONTENT_WIDTH*0.04+"px",
                    "font-weight": 700,
                    "text-align": "left",
                    "overflow": "hidden",
                    "text-overflow": "ellipsis",
                    "white-space": "nowrap",
                    "top": CONTENT_WIDTH*0.02,
                    "left": CONTENT_WIDTH*0.04,
                    "position": "absolute",
                })
                popup.append(title);
            }
            if(url.length>0) {
                var button_url = $("<div class=\"button_url\">Go to link!</div>")
                button_url.css({
                    "width": CONTENT_WIDTH*0.15,
                    "font-size": CONTENT_WIDTH*0.02,
                    "text-align":"center",
                    "cursor": "pointer",
                    "bottom": CONTENT_WIDTH*0.02,
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
                    window.open(url.text());
                });
                popup.append(button_url);
            }
            popup.append(button_close);
            button_close.css({
                "width": CONTENT_WIDTH*0.04,
                "height": CONTENT_WIDTH*0.04,
                "cursor": "pointer",
                "background": "url(./images/icon_close.png) no-repeat center",
                "background-size": "100%",
                "top": CONTENT_WIDTH*0.02,
                "right": CONTENT_WIDTH*0.02,
                "position": "absolute",
            }).click(function() {
                var popup = $(".popup");
                popup.animate({
                    "bottom":-1*popup.outerHeight(),
                },400,function(){
                    $(".popup").remove();
                    $("#wrap").off("click");
                    IS_FULLPAGE_SCROLLABLE = true;
                })
            });
            
            popup.click(function(e) {
                e.stopPropagation();
            })
            $("#wrap").click(function(e) {
                var popup = $(".popup");
                popup.animate({
                    "bottom":-1*popup.outerHeight(),
                },400,function(){
                    $(".popup").remove();
                    $("#wrap").off("click");
                    IS_FULLPAGE_SCROLLABLE = true;
                })
            })
            popup.css({
                "opacity":1,
                "bottom":-1*popup.outerHeight(),
                "left": "50%",
                "margin-left": -1*CONTENT_WIDTH*0.32,
                "z-index": "100",
                "position": "fixed",
            });
            popup.animate({
                "bottom": (WINDOW_HEIGHT-popup.outerHeight())/2 + "px",
            },400);
        }
    }
}