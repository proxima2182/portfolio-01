var IMAGE_LENGTH = 6;

var bg_images = [
    "./images/bg_icon_00.png",
    "./images/bg_icon_01.png",
    "./images/bg_icon_02.png",
    "./images/bg_icon_03.png",
    "./images/bg_icon_04.png",
    "./images/bg_icon_05.png"
];
var bg_image_nodata = "./images/bg_icon_nodata.png";
var nodata_images = ["./images/icon_nodata_on.png","./images/icon_nodata_off.png"];
var platform_images = [
    "./images/icon_platform_00.png",
    "./images/icon_platform_01.png",
    "./images/icon_platform_02.png",
    "./images/icon_platform_03.png",
    "./images/icon_platform_04.png",
    "./images/icon_platform_05.png",
    "./images/icon_platform_06.png",
    "./images/icon_platform_07.png",
];
var deco_images = [
    "./images/icon_deco_00.png",
    "./images/icon_deco_01.png",
    "./images/icon_deco_02.png",
    "./images/icon_deco_03.png",
    "./images/icon_deco_04.png",
    "./images/icon_deco_05.png",
];


var project_titles = {
//    name: "Project Name",
    position: "Position",
    platform: "Platform",
    keyword: "Keyword",
    company: "Company",
    description: "Description",
};
var project_text_types = {
//    name: "half_plain",
    position: "half_plain",
    platform: "half_plain",
    keyword: "half_plain",
    company: "half_plain",
    description: "plain",
};
var KEY_VALUES = ["work", "type", "name", "platform","position", "keyword", "year", "company", "description"];
var EXTRA_KEY_VALUES = ["url", "resources"];
function parseProject(data) {
    var result = {};
    for(var i= 0; i< KEY_VALUES.length; ++i) {
        var key = KEY_VALUES[i];
        result[key] = $(data).find(">"+key).text();
    }
    for(var i= 0; i< EXTRA_KEY_VALUES.length; ++i) {
        var key = EXTRA_KEY_VALUES[i];
        result[key] = $(data).find(">"+key);
    }
    result["content"] =  ["*" + result["work"], "*" + result["type"], result["year"]];
    result["popup_data"] = function(){
        var elements = $("<elements></elements>");
        var keys = Object.keys(project_titles);
        
        elements.append(this.resources);
        elements.append(this.url);
        elements.append("<name>" + this.name + "</name>");
        for(var i= 0; i< keys.length; ++i) {
            var key = keys[i];
            if(this[key].length > 0) {
                var element = $("<element></element>");
                element.append("<title>"+project_titles[key]+"</title>");
                element.append("<type>"+project_text_types[key]+"</type>");
                element.append("<content>"+this[key]+"</content>");
                elements.append(element);
            }
        }
        return elements;
    }
    return result;
}

function platform_selector(platform) {
    switch(platform){
        case "Android":
            return 0;
        case "IOS":
            return 1;
        case "Web":
            return 2;
        case "Art":
            return 3;
        case "Video":
            return 4;
        case "Icon":
            return 5;
        case "Poster":
            return 6;
        case "Unity3D":
            return 7;
        default:
            return 0;
    }
}
function deco_li(index){
    var li = $("<li><img src=\""+deco_images[index%IMAGE_LENGTH]+"\"/></li>");
    $(li).css({
        "width":AREA_WIDTH,
        "text-align":"center",
        "position":"absolute",
    });
    var img = $(li).find("img");
    img.css({
        "width":AREA_WIDTH,
        "height":AREA_HEIGHT,
        "display":"inline-block",
    });
    return li;
}
function data_li(index, project){
    var li = $("<li class=\"data_li\"><img src=\""+bg_images[index%IMAGE_LENGTH]+"\"/><img class=\"icon_platform\" src=\""+platform_images[platform_selector(project["platform"])]+"\"/></li>");
    $(li).css({
        "width":AREA_WIDTH,
        "text-align":"center",
        "position":"absolute",
    });
    var img = $(li).find("img");
    img.css({
        "width":AREA_WIDTH,
        "height":AREA_HEIGHT,
        "display":"inline-block",
    });
    var icon = $(li).find(".icon_platform");
    $(icon).css({
        "top":0,
        "left":"50%",
        "margin-left":-1*AREA_WIDTH/2,
        "position":"absolute",
    });
    var top = (index +1) * 5;
    var interval = (index +1) * 800;
    function animate() {
        icon.animate({
            "top":0,
        },interval/2).animate({
            "top":-1*top,
        },interval/2);
    }
    animate();
    var id = setInterval(animate, interval);
    intervals.push(id);
    return li;
}
function info_li(css_value, project){
    var li = $("<li class=\"info_li\"><div class=\"info_box\"><p class=\"title\"></p><div class=\"content\"></div></div></li>");
    var bottom = css_value["bottom"];
    var left = css_value["left"];
    var z_index = css_value["z-index"];
    li.css({
        "text-align":"center",
        "bottom": bottom,
        "left": left + BOX_MARGIN,
        "z-index": z_index,
        "position":"absolute",
    })
    var info_box = li.find(".info_box");
    var title = info_box.find(".title");
    var content = info_box.find(".content");
    
//    title.html(project.name);
//    var content_value = project.content();
    title.html(project["name"]);
    var content_value = project["content"];
    for(var i= 0; i< content_value.length; ++i) {
        content.append($("<p>"+content_value[i]+"</p>"));
    }
    
    info_box.css({
        "width":BOX_SIZE,
        "height":BOX_SIZE,
        "padding":BOX_SIZE*0.1,
        "cursor":"pointer",
        "display":"inline-block",
        "opacity":0.7,
        "background-color":"#000",
        "border":"1px solid #fff",
        "position":"relative",
    }).hover(function(){
        $(this).parent().css("z-index",100);
        $(this).animate({
            "margin-top": CONTENT_WIDTH*-0.01,
            "opacity":1,
        }, 300);
    },function(){
        $(this).parent().css("z-index",z_index);
        $(this).animate({
            "margin-top": 0,
            "opacity":0.7,
        }, 300);
    }).click(function(){
//        var data = project.popup_data();
        var data = project["popup_data"]();
        popup(data);
    });
    var css_value = {
        "text-align": "left",
        "color": "#fff",
        "overflow": "hidden",
        "text-overflow": "ellipsis",
    }
    title.css(css_value);
    title.css({
        "font-size": AREA_WIDTH*0.1,
        "line-height": AREA_WIDTH*0.125 + "px",
        "max-height": AREA_WIDTH*0.3,
        "display": "-webkit-box",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
    })
    content.css({
        "bottom": BOX_SIZE*0.1,
        "left": BOX_SIZE*0.1,
        "position": "absolute",
    })
    content.find("p").css(css_value);
    content.find("p").css({
        "width":BOX_SIZE,
        "font-size": AREA_WIDTH*0.075,
        "line-height": AREA_WIDTH*0.1 + "px",
        "white-space": "nowrap",
        "font-weight": 200,
    })
    return li;
}

function nodata_li(left, bg_image_nodata, nodata_images){
    var li = $("<li class=\"data_li\"><img src=\""+bg_image_nodata+"\"/><img class=\"on\" src=\""+nodata_images[0]+"\"/><img class=\"off\" src=\""+nodata_images[1]+"\"/></li>");
    $(li).css({
        "width":AREA_WIDTH,
        "text-align":"center",
        "bottom": 0,
        "left": left,
        "z-index": 1,
        "position":"absolute",
    });
    var img = $(li).find("img");
    img.css({
        "width":AREA_WIDTH,
        "height":AREA_HEIGHT,
        "display":"inline-block",
    });
    var on = $(li).find(".on");
    var off = $(li).find(".off");
    var css_value = {
        "top":0,
        "left":"50%",
        "margin-left":-1*AREA_WIDTH/2,
        "position":"absolute",
    };
    on.css(css_value);
    off.css(css_value);
    off.css({
        "display":"none",
        "top": 0,
    });
    function animate() {
        off.css({
            "display":"none",
        });
        on.css({
            "display":"inline-block",
        }).animate({
            "top":  CONTENT_WIDTH*-0.02,
        },600, function(){
            on.css({
                "display":"none",
                "top": 0,
            });
            off.css({
                "display":"inline-block",
                "top":  CONTENT_WIDTH*-0.02,
            }).animate({
                "top":0,
            },600);
        });
    }

    animate();
    intervals[0].push(setInterval(animate, 1200));
    
    return li;
}
function nodata_info_li(left, bottom, text){
    var text_value = text==undefined?"Nothing to show..." : text;
    var li = $("<li class=\"info_li\"><div class=\"info_box\"><p>"+text_value+"</p></div></li>");
    li.css({
        "text-align":"center",
        "bottom": bottom,
        "left": left,
        "z-index": 1,
        "position":"absolute",
    })
    var info_box = li.find(".info_box");
    var p = info_box.find("p");
    info_box.css({
        "width":AREA_WIDTH - BOX_SIZE/5 - 2,
        "height":BOX_SIZE/2,
        "line-height":BOX_SIZE/2+"px",
        "padding":BOX_SIZE/10,
        "opacity":0.7,
        "display":"inline-block",
        "background-color":"#000",
        "border":"1px solid #fff",
    })
    
    p.css({
        "font-size": AREA_WIDTH*0.1,
        "line-height":"normal",
        "display":"inline-block",
        "vertical-align":"middle",
        "color":"#fff",
    });
    return li;
}

var AREA_WIDTH;
var AREA_HEIGHT;
var GROUND_HEIGHT;
var BOX_SIZE;
var BOX_MARGIN;
var X_LINE;

var projects = [];
var filtered_projects = {};
//it use array for Objects to keep index after item is removed
var active_projects = [];

var container;

var map = [];
var map_index = 0;

var PAGE_COUNT = 4;
var TOTAL_PAGE_COUNT = 4;
var PAGE_LENGTH = 0;
var page = 0;
var PROJECT_LENGTH = 0;

var MAX_LINE_COUNT = 0;
var MAX_LINE_LENGTH = 0;

var intervals = [];
function map_clear() {
    for(var i= 0; i< intervals.length; ++i) {
        clearInterval(intervals[i]);
    }
    intervals = [];
}
function initialize_map() {
    var need_shift = false;
    MAX_LINE_COUNT= 0;
    MAX_LINE_LENGTH= 0;
    container.find("ul").remove();

    if(IS_PORTRAIT) {
        PAGE_COUNT = 2;
        map = [
            {
                line: 2,
                count: 0,
                list: $("<ul class= \"project\"></ul>"),
                info_list: $("<ul class= \"project_info\"></ul>"),
            },
            {
                line: 2,
                count: 0,
                list: $("<ul class= \"project\"></ul>"),
                info_list: $("<ul class= \"project_info\"></ul>"),
            },
        ];

        for(var i= 0; i< map.length; ++i) {
            if(!need_shift && map[i].line%2 != 0 && (MAX_LINE_COUNT + i*2)%2==0) {
                need_shift = true;
            }
            var list = $("<ul></ul>");
            list.css({
                "text-align":"left",
                "position":"absolute",
                "z-index":i,
            });
            map[i].upper_deco = list.clone();
            container.append(map[i].upper_deco);
            map[i].list = list.clone();
            container.append(map[i].list);
            map[i].info_list = list.clone();
            container.append(map[i].info_list);
            map[i].under_deco = list.clone();
            container.append(map[i].under_deco);
            MAX_LINE_COUNT+= map[i].line;
            if(MAX_LINE_LENGTH<map[i].line){
                MAX_LINE_LENGTH = map[i].line;
            }
        }
    } else {
        PAGE_COUNT = 4;
        map = [
            {
                line: 2,
                count: 0,
                list: $("<ul class= \"project\"></ul>"),
                info_list: $("<ul class= \"project_info\"></ul>"),
            },
        ];

        for(var i= 0; i< map.length; ++i) {
            var list = $("<ul></ul>");
            list.css({
                "text-align":"left",
                "position":"absolute",
                "z-index":i,
            });
            map[i].upper_deco = list.clone();
            container.append(map[i].upper_deco);
            map[i].list = list.clone();
            container.append(map[i].list);
            map[i].info_list = list.clone();
            container.append(map[i].info_list);
            map[i].under_deco = list.clone();
            container.append(map[i].under_deco);
            MAX_LINE_COUNT+= map[i].line;
            if(MAX_LINE_LENGTH<map[i].line){
                MAX_LINE_LENGTH = map[i].line;
            }
        }
    }
    var factor = PAGE_COUNT;
    if(MAX_LINE_LENGTH == 2) {
        factor += 0.5;
    }
    if(need_shift) {
        factor+=0.5;
    }
    AREA_WIDTH = container.width()/factor;
    AREA_HEIGHT = AREA_WIDTH*0.85;
    GROUND_HEIGHT = AREA_WIDTH*0.25;
    BOX_SIZE = AREA_WIDTH*0.6;
    BOX_MARGIN = (AREA_WIDTH - BOX_SIZE)/2;
    FONT_SIZE = AREA_WIDTH*0.1;
    X_LINE = container.height()/2 - AREA_HEIGHT;
    
    
    TOTAL_PAGE_COUNT = PAGE_COUNT*MAX_LINE_COUNT;
}

function read_project(file_path, callback) {
    $.get(file_path, function(data){
        var meta = $(data);
        var projects_meta = meta.find("project");
        container.css({
            "overflow":"hidden",
            "position":"relative",
         });
        
        PROJECT_LENGTH = projects_meta.length;
        for(var i= 0; i< PROJECT_LENGTH; ++i) {
//            var project = new Project(projects_meta.eq(i));
            var project = parseProject(projects_meta.eq(i));
            projects.push(project);
        }
        filtered_projects = projects;
        PAGE_LENGTH = parseInt((PROJECT_LENGTH -1) /TOTAL_PAGE_COUNT) + 1;
        
        initialize_map();
        draw(Object.keys(filtered_projects));
        callback();
    });
}
function go_up(obj, info_obj) {
    var bottom = $(obj).css("bottom");
    $(info_obj).css({
        "opacity":0,
    })
    $(obj).css({
        "opacity":0,
        "bottom":-1*$(container).height()/2,
    })
    $(obj).animate({
        "opacity":1,
        "bottom":bottom,
    },600, function(){
        animating--;
        $(info_obj).animate({
            opacity:1
        },300);
    });
}
function go_down(obj, info_obj, callback) {
    $(info_obj).animate({
        opacity:0
    },300, function(){
        $(obj).animate({
            "opacity":0,
            "bottom":-1*$(container).height()/2,
        }, 600, function(){
            callback();
        });
    });
}

function add(filtered_key ,selected, callback){
    page = 0;
    
    var project_li = container.find(".data_li");
    var project_info_li = container.find(".info_li");
//    for(var i= 0; i< map.length; ++i) {
//        project_li.push(map[i].list.find("li"));
//        project_info_li.push(map[i].info_list.find("li"));
//    }
    if(Object.keys(filtered_projects).length == 0 && project_li.length>0) {
        animating ++;
        for(var i= 0; i< project_li.length; ++i) {
            var obj = project_li[i];
            var info_obj = project_info_li[i];
            go_down(obj, info_obj, function(){
                start();
            });
        }   
    } else {
        start();
    }
    
    if(callback != undefined && selected.length == 0 && filtered_key.length == 0){
        callback();
    }
    
    function start() {
        draw(filtered_key, callback);
        var project_li = container.find(".data_li");
        var project_info_li = container.find(".info_li");
        animating = selected.length;
        for(var i= 0; i< selected.length; ++i) {
            var filtered_index = selected[i];
            var selected_index = filtered_key.indexOf(filtered_index) - page*PAGE_COUNT;
            var obj = project_li[selected_index];
            var info_obj = project_info_li[selected_index];
            var bottom = $(obj).css("bottom");
            if(info_obj ==undefined || obj == undefined) {
                animating--;
            } else {
                go_up(obj, info_obj);
            }
        }
    }
}
function subtract(filtered_key, selected, callback){
    var project_li = container.find(".data_li");
    var project_info_li = container.find(".info_li");
    animating = selected.length;
    
    var undefine = 0;
    for(var i= 0; i< selected.length; ++i) {
        //index of filtered
        var filtered_index = selected[i];
        //index of filtered_key
        var selected_index = filtered_key.indexOf(filtered_index) - page*PAGE_COUNT;

        var obj = project_li[selected_index];
        var info_obj = project_info_li[selected_index];

        delete filtered_projects[filtered_index];
        if(info_obj == undefined || obj == undefined) {
            animating--;
            undefine ++;
        } else {
            go_down(obj, info_obj, function(){
                animating--;
                finalize();
            })
        }
        function finalize() {
            if(animating<=0){
                page = 0;
                animating = 0;
                var filtered_key = Object.keys(filtered_projects);

                draw(filtered_key, callback);
                
                var project_li = container.find(".data_li");
                var project_info_li = container.find(".info_li");
                if(Object.keys(filtered_projects).length == 0) {
                    animating ++;
                    for(var i= 0; i< project_li.length; ++i) {
                        var obj = project_li[i];
                        var info_obj = project_info_li[i];
                        go_up(obj, info_obj);
                    }   
                }
            }
        }
    }
    if(undefine > 0 && undefine == selected.length) {
        finalize();
    }
    if(callback != undefined && selected.length == 0 && filtered_key.length == 0){
        callback();
    }
}

//var quit_drawing = false;

function draw(filtered_key, callback) {
    map_clear();
    
    var middle_index = MAX_LINE_COUNT/2 + map.length;
    var line_count = 0;
    
    for(var i= 0; i< map.length; ++i) {
        map[i].count = 0;
        
        var upper_y = X_LINE + GROUND_HEIGHT * (middle_index - line_count);
        var y = upper_y - GROUND_HEIGHT*map[i].line;

        function getX(a) {
            return (line_count+a)%2 == 0? AREA_WIDTH/2:0;
        }
        
        var list_x = map[i].line%2==0? 0 : getX(map[i].line);
        map[i].list.css({
            "left":list_x,
            "bottom":y,
        })
        map[i].info_list.css({
            "left":list_x,
            "bottom":y + AREA_HEIGHT,
        })
        map[i].upper_deco.css({
            "left":getX(0),
            "bottom":upper_y,
        })
        map[i].under_deco.css({
            "left":getX(map[i].line+ 1),
            "bottom":y - GROUND_HEIGHT,
        })
        line_count+= (map[i].line + 2);
    }
    container.find("li").remove();
    filtered_projects = {};

    var key_length = filtered_key.length
    
    line_count = 0;
    var j= 0;
    
    function insert(index, i, project) {
        var lines = line_count + map.length*2;
        var is_double_line = map[index].line == 2;
        
        var css_value = {
            "bottom": 0,
            "left": map[index].count*AREA_WIDTH,
            "z-index": 0,
        };
        var deco_index = i;
        if(is_double_line){
            deco_index = parseInt(i/2);
            var is_even = i%2==0;
            var count = parseInt(map[index].count/2);
            var bottom = is_even? GROUND_HEIGHT : 0;
            var left = count * AREA_WIDTH + ((lines%2==0?is_even:!is_even) ? 0: AREA_WIDTH/2);
            var z_index = is_even?0 : 1;
            css_value = {
                "bottom": bottom,
                "left": left,
                "z-index": z_index,
            };
        }
        var is_line_even = (lines +1 + (is_double_line?i:0))%2==0;
        var background_index = (i + page)%3 * 2 + (is_line_even?0:1);
        var li = data_li(background_index, project);
        li.css(css_value);

        map[index].list.append(li);
        map[index].info_list.append(info_li(css_value, project));
        map[index].count++;

        //decoration
        var max_deco_length = map[index].count/map[index].line;
        var count = map[index].upper_deco.children().length;
        
        if(count<max_deco_length) {
            var css_value = {
                "bottom": 0,
                "left": count * AREA_WIDTH,
                "z-index": 0,
            }
            is_line_even = lines%2==0;
            var image_index = (deco_index + page)%3 * 2 + (is_line_even?0:1);
            var li = deco_li(image_index);
            map[index].upper_deco.append(li);
            li.css(css_value);
            
            is_line_even = (lines+ map[index].line + 1)%2==0;
            image_index = (deco_index + 1 + page)%3 * 2 + (is_line_even?0:1);
            li = deco_li(image_index);
            map[index].under_deco.append(li);
            li.css(css_value);
        }
    }
    
    
    PAGE_LENGTH = parseInt((filtered_key.length-1)/TOTAL_PAGE_COUNT) + 1;
    for(var i= 0; i< key_length;++i) {
        var filtered_index = filtered_key[i];
        var project = projects[filtered_index];
        filtered_projects[filtered_index] = project;
        
        if(map_index<map.length) {
            var map_count = PAGE_COUNT*(line_count + map[map_index].line);
            var active_index = page * TOTAL_PAGE_COUNT + j;
            if(active_index==i &&
                j < map_count && active_index < key_length) {
                insert(map_index, j, project);
                j++;
                if(j == map_count || active_index == key_length-1) {
                    line_count+=(map[map_index].line);
                    map_index++;
                }
            }
        }
    }
    map_index = 0;
    if(callback!=undefined) {
        callback();
    } else if(key_length==0){
        var bottom = 0;
        var left = container.width()/2 - AREA_WIDTH*0.5;
        map[map.length-1].list.append(nodata_li(left, bg_image_nodata, nodata_images));
        map[map.length-1].info_list.append(nodata_info_li(left, bottom));
        page_update();
        return;
    }
    if(container!=undefined) {
        var imgs = container.find("ul").find("img");
        imgs.off("load");
        finish_loading(container);
        var load_count = 0;
        imgs.each(function() {
            if($(this).get(0).complete){
                load_count++;
            }
        })
        if(load_count >= imgs.length) {
            page_update();
            return;
        } else {
            loading(container,false, 0.08, 0.012, "#1c2e5f", "#fff", 0.08, 0.012);
        }
        imgs.on("load",function() {
            load_count++;
            if(load_count >= imgs.length) {
                finish_loading(container);
                load_count = 0;
            }
        })
    }
    page_update();
}

var animating = 0;
var button_wrap = $("<div class=\"map_button_wrap\"></div>");
var left_button = $("<span class\"button_left\"></span>");
var right_button = $("<span class\"button_right\"></span>")
var page_span = $("<span class\"page\"></span>");
var page_length_span = $("<span class\"page_length\"></span>");

function page_init() {
    left_button.css({
        "cursor":"pointer",
        "background":"url(./images/icon_button_left_small.png) no-repeat",
        "background-size":"100%",
    })
    left_button.click(function(){
       if(page>0){
           page--;
           draw(Object.keys(filtered_projects));
       }
    });
    right_button.css({
        "cursor":"pointer",
        "background":"url(./images/icon_button_right_small.png) no-repeat",
        "background-size":"100%",
    })
    right_button.click(function(){
       if(page<PAGE_LENGTH - 1){
           page++;
           draw(Object.keys(filtered_projects));
       }
    });
    button_wrap.append(left_button);
    button_wrap.append(page_span);
    button_wrap.append($("<span>/</span>"));
    button_wrap.append(page_length_span);
    button_wrap.append(right_button);
    button_wrap.find("span").css({
        "text-align":"center",
        "vertical-align": "middle",
        "display": "inline-block",
        "draggable": false,
        "color": "#fff",
    })
    button_wrap.css({
        "width":"100%",
        "text-align":"center",
        "left":0,
        "z-index":10,
        "position":"absolute",
    })
    button_wrap.on("resize", function() {
        var area_size = CONTENT_WIDTH*0.05;
        var font_size = CONTENT_WIDTH*0.04;
        if(IS_PORTRAIT) {
            var area_size = CONTENT_WIDTH*0.06;
            var font_size = CONTENT_WIDTH*0.05;
        }
        button_wrap.find("span").css({
            "width": area_size,
            "height": area_size,
            "margin": "0 "+area_size/6 +"px",
            "font-size": font_size,
        })
        button_wrap.css({
            "line-height" : area_size + "px",
            "bottom":CONTENT_WIDTH*0.01,
        })
    })
    button_wrap.resize();
    
    $(container).append(button_wrap);
}

function page_update(){
    button_wrap.resize();
    if(Object.keys(filtered_projects).length==0) {
        button_wrap.stop().animate({
            "opacity":0,
        },300);
    } else {
        button_wrap.stop().animate({
            "opacity":1,
        },300);
    }
    if(page<=0){
        left_button.stop().animate({
            "opacity":0,
        },300, function(){
            left_button.css("cursor","auto");
        });
    } else {
        left_button.stop().animate({
            "opacity":1,
        },300, function(){
            left_button.css("cursor","pointer");
        });
    }
    if(page>=PAGE_LENGTH-1){
        right_button.stop().animate({
            "opacity":0,
        },300, function(){
            right_button.css("cursor","auto");
        });
    } else {
        right_button.stop().animate({
            "opacity":1,
        },300, function(){
            right_button.css("cursor","pointer");
        });
    }
    page_span.html(page+1);
    page_length_span.html(PAGE_LENGTH);
}

function map_resize() {
    initialize_map();
    
    if(container.parents(".fullpage_active").length>0) {
        quit_drawing = true;
    //    if(container!=undefined && container.parents("."))
        draw(Object.keys(filtered_projects));
    }
}
$(document).ready(function() {
    //map first load
    var container_value = "#section_04 .work_wrap";
    container = $(container_value);
})

function load_map(callback){
    read_project("./meta/project_list.xml", function(){
        page_init();
        if(callback !=undefined) {
            callback();
        }
    });
    
    var selection = {
        type:{Development: true, Artwork: true}, 
        work:{Affair: true, Practice:true},
    };
    var selection_keys = {
        type:["Development", "Artwork"],
        work:["Affair", "Practice"],
    };
    function match(name, key_value, project) {
        var selection_key = Object.keys(selection);
        for(var i= 0; i< selection_key.length; ++i) {
            var name = selection_key[i];
            if(!selection[name][project[name]]) {
                return false;
            }
        }
        return true;
    }
    function check(name) {
        var selection_key = Object.keys(selection[name]);
        var selected_count = 0;
        for(var i= 0; i< selection_key.length; ++i) {
            if(selection[name][selection_key[i]]) {
                selected_count++;
            }
        }
        return selected_count>0;
    }
    function subtraction(key_value, callback){
        var selected = [];
        var filtered_key = Object.keys(filtered_projects);
        for(var i= 0; i< filtered_key.length; ++i) {
            var project = filtered_projects[filtered_key[i]];
            var key = String(filtered_key[i]);
            if(!match(name, key_value, project)){
                //selected
                selected.push(key);
            }
        }
        subtract(filtered_key, selected, callback);
    }
    function addition(key_value, callback){
        var selected = [];
        var filtered_key = Object.keys(filtered_projects);
        for(var i= 0; i< projects.length; ++i) {
            var project = projects[i];
            var key = String(i);
            //this have additional condition to check
            //filtered array already have those projects
            if(match(name, key_value, project) &&
              filtered_key.indexOf(key)<0){
                //selected
                selected.push(key);
                filtered_key.push(key);
            }
        }
        
        filtered_key = filtered_key.sort(function(a, b) {
            return a - b;
        });
        add(filtered_key, selected, callback);
    }
    var select_button = $("#section_04 .button_wrap li");
    select_button.css("cursor","pointer");
    select_button.click(function(){
        if(animating <= 0) {
            animating = 0;
            var name = $(this).parent().attr("name");
            var key_value = selection_keys[name][$(this).index()];
            var button = $(this);
            
            button.toggleClass("unselected");
            if(button.hasClass("unselected")) {
                selection[name][key_value]= false;
                if(!check(name)) {
                    var siblings = button.siblings();
                    var addition_key_value = "";
                    for(var i= 0; i< siblings.length; ++i) {
                        addition_key_value = selection_keys[name][siblings.eq(i).index()];
                        selection[name][addition_key_value] = true;
                        siblings.eq(i).toggleClass("unselected");
                    }
                    subtraction(key_value, function() {
                        if(addition_key_value.length>0) {
                            addition(addition_key_value);
                        }
                    });
                } else {
                    subtraction(key_value);
                }
            } else{
                selection[name][key_value]= true;

                addition(key_value);
            }
        }
    })
}