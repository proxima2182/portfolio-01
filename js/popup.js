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
            "opacity":"0",
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
            "opacity":0,
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
            finish_loading($("#wrap"));
            if(!content.complete) {
                loading($("#wrap"), false, 0.08, 0.012, "rgba(0,0,0,0)", "#fff", undefined, function() {
                    detail_view.remove();
                });
            } else {
                content.css("opacity",1);
                notice_wrap.css("opacity",1);
            }
            content.on("load loadeddata" ,function() {
                finish_loading($("#wrap"));
                content.css("opacity",1);
                notice_wrap.css("opacity",1);
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
            var title_font_size = IS_SCREEN_PORTRAIT? CONTENT_WIDTH* 0.04: CONTENT_WIDTH*0.025;
            notice_wrap.css({
                "height": WINDOW_HEIGHT*0.1,
                "font-size": IS_SCREEN_PORTRAIT ? WINDOW_HEIGHT*0.02:WINDOW_HEIGHT*0.03,
                "line-height": WINDOW_HEIGHT*0.1 +"px",
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
function popup(meta) {
    if($(".popup").length==0){
        if(IS_FULLPAGE_SCROLLABLE !=undefined) {
            IS_FULLPAGE_SCROLLABLE = false;
        }
        var elements = $(meta).find("element");
        var popup = $("<div class=\"popup\"></div>");
        var popup_content_wrap = $("<div class=\"popup_content_wrap\"></div>");
        //this is for IE9 because -ms-overflow-style:none is not working for it.
        var inner_container = $("<div class=\"inner_container\"></div>")
        var outer_container = $("<div class=\"outer_container\"></div>")
        
        var resource_wrap = $("<ul class=\"resource_wrap\"></ul>")
        inner_container.append(popup_content_wrap);
        outer_container.append(inner_container);
        popup.append(outer_container);
        popup_content_wrap.append(resource_wrap);
        $("#wrap").append(popup);
        
        popup.css({
            "opacity":0,
            "line-height":"normal",
            "background-color": "#002157",
            "border": "1px solid #fff",
            "color": "#fff",
            "overflow":"hidden",
            "left": "50%",
        });
        inner_container.css({
            "overflow-x":"hidden",
            "overflow-y":"scroll",
            "position":"absolute",
        })
        outer_container.css({
            "height": WINDOW_HEIGHT*0.6,
            "overflow":"hidden",
            "position":"relative",
        })
        popup_content_wrap.css({
            "text-align":"left",
        });
        resource_wrap.css({
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
                    "display":"inline-block",
                    "vertical-align":"top",
                })
            }
            var title = $("<p class=\"title\"></p>");
            title.html(title_value);
            row.append(title);

            var content_css_value = {
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
                    icon.css({
                        "background" : "url("+icon_value+") no-repeat",
                        "background-size" : "100%",
                        "display":"inline-block",
                        "vertical-align": "top",
                    });
                    text.html(text_value);
                    text.css({
                        "display":"inline-block",
                        "vertical-align":"top",
                    });
                    li.css(content_css_value);
                    li.append(icon);
                    li.append(text);
                    content.append(li);
                }
                row.append(content);
            }
            popup_content_wrap.append(row);
        }
        var url = $(meta).find("url");
        var name = $(meta).find("name");
        var project_title, button_url, button_close;
        if(name.length>0) {
            project_title = $("<p class=\"project_title\">"+name.text()+"</p>")
            project_title.css({
                "font-weight": 700,
                "opacity":"inherit",
                "text-align": "left",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                "position": "absolute",
            })
            popup.append(project_title);
        }
        if(url.length>0) {
            button_url = $("<div class=\"button_url\"><p>Go to link!<p></div>")
            button_url.find("p").css({
                "display":"inline-block",
                "opacity":"inherit",
                "vertical-align":"middle",
            })
            button_url.css({
                "text-align":"center",
                "cursor": "pointer",
                "left": 0,
                "right": 0,
                "bottom": 0,
                "margin": "0 auto",
                "position": "absolute",
            }).hover(function(){
                $(this).find("p").css({
                    "margin-bottom": "-1px",
                    "border-bottom": "1px solid #fff",
                });
            }, function(){
                $(this).find("p").css({
                    "margin-bottom": 0,
                    "border": 0,
                });
            }).click(function() {
                window.open(url.text());
            });
            popup.append(button_url);
        }
        button_close = $("<div class=\"button_close\"></div>");
        popup.append(button_close);
        button_close.css({
            "width": CONTENT_WIDTH*0.04,
            "height": CONTENT_WIDTH*0.04,
            "opacity":"inherit",
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
        popup.resize(function() {
            var popup_width = IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.8: CONTENT_WIDTH*0.6;
            var popup_padding = CONTENT_WIDTH*0.04;
            var title_font_size = IS_SCREEN_PORTRAIT? CONTENT_WIDTH* 0.04: CONTENT_WIDTH*0.025;
            var title_line_height = IS_SCREEN_PORTRAIT? CONTENT_WIDTH* 0.06: CONTENT_WIDTH*0.03;
            var content_font_size = IS_SCREEN_PORTRAIT? CONTENT_WIDTH* 0.03: CONTENT_WIDTH*0.02;
            var content_line_height = IS_SCREEN_PORTRAIT? CONTENT_WIDTH* 0.08: CONTENT_WIDTH*0.06;
            var icon_width = IS_SCREEN_PORTRAIT? CONTENT_WIDTH* 0.06: CONTENT_WIDTH*0.04;
            var button_width = IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.06:CONTENT_WIDTH*0.04;
            $(this).css({
                "width": popup_width,
                "max-height": WINDOW_HEIGHT*0.8,
                "padding": popup_padding + "px",
                "padding-top" : button_width*2,
                "padding-bottom": content_line_height,
                "border-radius": CONTENT_WIDTH*0.03,
                "margin-left": -1*(popup_width/2 + popup_padding),
            });
            popup_content_wrap.css({
                "width":popup_width,
            });
            resource_wrap.css({
                "width": popup_width,
            })
            button_close.css({
                "width": button_width,
                "height": button_width,
                "top": button_width/2,
                "right": button_width/2,
            })
            if(button_url) {
                button_url.css({
                    "height":content_line_height,
                    "line-height":content_line_height +"px",
                    "font-size": content_font_size,
                })
            }
            if(project_title){
                project_title.css({
                    "width": popup_width - button_width*2,
                    "font-size": title_font_size,
                    "height": button_width,
                    "line-height": button_width+"px",
                    "top": button_width/2,
                    "left": popup_padding,
                })
            }

            var content_padding = IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.008: CONTENT_WIDTH*0.005;
            var list_margin = IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.015: CONTENT_WIDTH*0.01;
            //normal contents
            $(this).find(".half_plain").css({
                "width":popup_width/2,
            })
            $(this).find(".title").css({
                "font-size": title_font_size,
                "line-height": title_line_height + "px",
                "margin-top": list_margin,
            })
            $(this).find(".content").css({
                "font-size": content_font_size,
                "padding": content_padding,
            })
            var text_width = popup_content_wrap.width() - icon_width*6/4 - content_padding*2;
            $(this).find(".content .icon").css({
                "width" : icon_width,
                "height" : icon_width,
                "margin" : "0 " + icon_width/4 + "px",
            })
            $(this).find(".content .text").css({
                "width": text_width,
                "font-size": content_font_size,
            })
            $(this).find("ul.content li").css({
                "padding":0,
                "margin-top": list_margin,
            })
            var css_value = {"height": WINDOW_HEIGHT*0.6};
            if(popup_content_wrap.height()<WINDOW_HEIGHT*0.6) {
                css_value = {"height": popup_content_wrap.height()};
            }
            outer_container.css(css_value);
            inner_container.css(css_value);
            
            if(popup.css("opacity") == 1) {
                popup.animate({
                    "bottom": (WINDOW_HEIGHT-popup.outerHeight())/2 + "px",
                },0);
            }
            //also resize when detail view exist.
            var detail_view = $(".detail_view");
            if(detail_view.length>0) {
                detail_view.resize();
            }
        });
        popup.resize();
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
            li.data("type",type);
            if(!IS_MOBILE) {
                li.hover(function() {
                    var hover = $("<div class=\"hover\"></div>")
                    hover.css({
                        "width" : "100%",
                        "height" : "100%",
                        "top" : 0,
                        "left" : 0,
                        "z-index" : 1,
                        "position": "absolute",
                    })
                    var type = $(this).data("type");
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
                    $(this).append(hover);
                }, function() {
                    $(this).find(".hover").remove();
                })
            }
            li.append(img);
            li.click(function() {
                show_detail_view($(this).index());
            })
            resource_wrap.append(li);
        }
        var images = popup.find("img");
        var load_count = images.length;

        loading($("#wrap"), true, 0.08, 0.012, "rgba(0,0,0,0)", "#fff", undefined, function() {
            $(images).off("load");
            popup.remove();
        });
        $(images).on("load", function() {
            load_count --;
            if(load_count == 0) {
                resource_wrap.slider_initialize({
                    page: page,

                    buttons: true,
                    button_image_left: "./images/icon_button_left_small.png",
                    button_image_right: "./images/icon_button_right_small.png",
                    button_background:"rgba(155,155,155,0)",
                    button_flexible_width: function() {
                        return IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.05: CONTENT_WIDTH*0.03;
                    },
                    button_flexible_height: function() {
                        return IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.05: CONTENT_WIDTH*0.03;
                    },
                    button_dispersion: "0",
                    button_basic_color:"#000",

                    scrollable:true,

                    navigator: false,

                    slider_flexible_margin: function() {
                        return IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.025: CONTENT_WIDTH*0.015;
                    },
                    slider_flexible_width:function() {
                        return IS_SCREEN_PORTRAIT? CONTENT_WIDTH*0.8: CONTENT_WIDTH*0.6;
                    }
                });
                show_popup();
            }
        });
        function set_popup_position() {
            if(popup==undefined) return;
            popup.css({
                "bottom": (WINDOW_HEIGHT-$(this).outerHeight())/2 + "px",
            });
        }
        function show_popup() {
            if(popup==undefined) return;
            var css_value = {"height": WINDOW_HEIGHT*0.6};
            if(popup_content_wrap.height()<WINDOW_HEIGHT*0.6) {
                css_value = {"height": popup_content_wrap.height()};
            }
            outer_container.css(css_value);
            inner_container.css(css_value);
            finish_loading($("#wrap"));
            
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
                "z-index": "100",
                "position": "fixed",
            });
            popup.animate({
                "bottom": (WINDOW_HEIGHT-popup.outerHeight())/2 + "px",
            },400);
        }
    }
}