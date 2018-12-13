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
    name: "Project Name",
    position: "Position",
    platform: "Platform",
    keyword: "Keyword",
    company: "Company",
    description: "Description",
};
var project_text_types = {
    name: "half_plain",
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
//class Project{
//    constructor(data){
//        this.work = $(data).find(">work").text();
//        this.type = $(data).find(">type").text();
//        this.name = $(data).find(">name").text();
//        this.platform = $(data).find(">platform").text();
//        this.position = $(data).find(">position").text();
//        this.company = $(data).find(">company").text();
//        this.description = $(data).find(">description").text();
//        this.url = $(data).find(">url");
//        this.resources = $(data).find(">resources");
////        this.content = function(){
////        };
//    }
//    content(){
//        return ["*" + this.work,
//        "*" + this.type,
//        this.platform,
//        this.position];
//    }
//    popup_data(){
//        var elements = $("<elements></elements>");
//        var keys = Object.keys(project_titles);
//        
//        elements.append(this.resources);
//        elements.append(this.url);
//        for(var i= 0; i< keys.length; ++i) {
//            var key = keys[i];
//            var element = $("<element></element>");
//            element.append("<title>"+project_titles[key]+"</title>");
//            element.append("<type>"+project_text_types[key]+"</type>");
//            element.append("<content>"+this[key]+"</content>");
//            elements.append(element);
//        }
//        return elements;
//    }
//}

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
//    var li = $("<li><img src=\""+bg_images[index%IMAGE_LENGTH]+"\"/><img class=\"icon_platform\" src=\""+platform_images[platform_selector(project.platform)]+"\"/></li>");
    var li = $("<li><img src=\""+bg_images[index%IMAGE_LENGTH]+"\"/><img class=\"icon_platform\" src=\""+platform_images[platform_selector(project["platform"])]+"\"/></li>");
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
    var top = (index%3 + 1) * 5;
    var interval = ((index%2)+1) * 1200;
    function animate() {
        icon.animate({
            "top":0,
        },interval/2).animate({
            "top":-1*top,
        },interval/2);
    }
    animate();
    var id = setInterval(animate, interval);
    intervals[0].push(id);
    return li;
}
function info_li(bottom, left, z_index, project){
    var li = $("<li><div class=\"info_box\"><p class=\"title\"></p><div class=\"content\"></div></div></li>");
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
        "font-size": CONTENT_WIDTH*0.02,
        "line-height": CONTENT_WIDTH*0.025 + "px",
        "max-height": CONTENT_WIDTH*0.4,
    })
    content.css({
        "bottom": BOX_SIZE*0.1,
        "left": BOX_SIZE*0.1,
        "position": "absolute",
    })
    content.find("p").css(css_value);
    content.find("p").css({
        "width":BOX_SIZE,
        "font-size": CONTENT_WIDTH*0.015,
        "line-height": CONTENT_WIDTH*0.02 + "px",
        "white-space": "nowrap",
        "font-weight": 200,
    })
    return li;
}
function nodata_li(left, bg_image_nodata, nodata_images){
    return unit_nodata_li(AREA_WIDTH, AREA_HEIGHT, CONTENT_WIDTH*-0.02, 0, left, bg_image_nodata, nodata_images)
}

function unit_nodata_li(area_width, area_height, moving_factor, interval_index, left, bg_image_nodata, nodata_images){
    var li = $("<li><img src=\""+bg_image_nodata+"\"/><img class=\"on\" src=\""+nodata_images[0]+"\"/><img class=\"off\" src=\""+nodata_images[1]+"\"/></li>");
    $(li).css({
        "width":area_width,
        "text-align":"center",
        "bottom": 0,
        "left": left,
        "z-index": 1,
        "position":"absolute",
    });
    var img = $(li).find("img");
    img.css({
        "width":area_width,
        "height":area_height,
        "display":"inline-block",
    });
    var on = $(li).find(".on");
    var off = $(li).find(".off");
    var css_value = {
        "top":0,
        "left":"50%",
        "margin-left":-1*area_width/2,
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
            "top": moving_factor,
        },600, function(){
            on.css({
                "display":"none",
                "top": 0,
            });
            off.css({
                "display":"inline-block",
                "top": moving_factor,
            }).animate({
                "top":0,
            },600);
        });
    }

    animate();
    intervals[interval_index].push(setInterval(animate, 1200));
    
    return li;
}
function nodata_info_li(left, bottom, text) {
    return unit_nodata_info_li(AREA_WIDTH, BOX_SIZE, CONTENT_WIDTH*0.018, left, bottom, text, function_click);
}
function unit_nodata_info_li(area_width, box_size, font_size, left, bottom, text){
    var text_value = text==undefined?"Nothing to show..." : text;
    var li = $("<li><div class=\"info_box\"><p>"+text_value+"</p></div></li>");
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
        "width":area_width - box_size/5 - 2,
        "height":box_size/2,
        "line-height":box_size/2+"px",
        "padding":box_size/10,
        "opacity":0.7,
        "display":"inline-block",
        "background-color":"#000",
        "border":"1px solid #fff",
    })
    
    p.css({
        "font-size": font_size,
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
var deco_01_ul;
var deco_02_ul;
var project_ul;
var project_info_ul;

var PAGE_COUNT = 7;
var PAGE_LENGTH = 0;
var page = 0;
var PROJECT_LENGTH = 0;

var intervals = {0:[],1:[]};
function map_clear(index) {
    for(var i= 0; i< intervals[index].length; ++i) {
        clearInterval(intervals[index][i]);
    }
    intervals = {0:[],1:[]};
}
function project_index(i) {
    return page * PAGE_COUNT + i;
}

function initialize_map(file_path, callback) {
    $.get(file_path, function(data){
        var meta = $(data);
        var projects_meta = meta.find("project");
        container.css({
            "overflow":"hidden",
            "position":"relative",
         });
        
        deco_01_ul = $("<ul class=\"deco_list_01\"></ul>")
        deco_02_ul = $("<ul class=\"deco_list_02\"></ul>")
        project_ul = $("<ul class=\"project_li\"></ul>");
        project_info_ul = $("<ul class=\"work_info_li\"></ul>");
        container.append($(deco_01_ul));
        container.append($(deco_02_ul));
        container.append($(project_ul));
        container.append($(project_info_ul));
        
        $(container).find("ul").css("text-align","left");

        PROJECT_LENGTH = projects_meta.length;
        for(var i= 0; i< PROJECT_LENGTH; ++i) {
//            var project = new Project(projects_meta.eq(i));
            var project = parseProject(projects_meta.eq(i));
            projects.push(project);
        }
        filtered_projects = projects;
        PAGE_LENGTH = parseInt((PROJECT_LENGTH -1) /PAGE_COUNT) + 1;
        
        deco_01_ul.css({
            "left":0,
            "bottom":X_LINE-GROUND_HEIGHT,
            "position":"absolute",
            "z-index":"4",
        })
        deco_02_ul.css({
            "left":AREA_WIDTH/2,
            "bottom":X_LINE+GROUND_HEIGHT*2,
            "position":"absolute",
            "z-index":"1",
        })
        project_ul.css({
            "left":0,
            "bottom":X_LINE,
            "position":"absolute",
            "z-index":"2",
        })
        project_info_ul.css({
            "left":0,
            "bottom":X_LINE+AREA_HEIGHT,
            "position":"absolute",
            "z-index":"3",
        })
//        draw(Object.keys(filtered_projects));
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
    
    var project_li = project_ul.find("li");
    var project_info_li = project_info_ul.find("li");
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
        var project_li = project_ul.find("li");
        var project_info_li = project_info_ul.find("li");
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
    var project_li = project_ul.find("li");
    var project_info_li = project_info_ul.find("li");
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
                
                var project_li = project_ul.find("li");
                var project_info_li = project_info_ul.find("li");
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

var quit_drawing = false;

function draw(filtered_key, callback) {
    map_clear(0);
    quit_drawing = false;
    deco_01_ul.css("bottom",X_LINE-GROUND_HEIGHT);
    deco_02_ul.css("bottom",X_LINE+GROUND_HEIGHT*2);
    project_ul.css("bottom",X_LINE);
    project_info_ul.css("bottom",X_LINE+AREA_HEIGHT);
    deco_01_ul.children().remove();
    deco_02_ul.children().remove();
    project_ul.children().remove();
    project_info_ul.children().remove();
    filtered_projects = {};

    var bw= 0;
    var fw= AREA_WIDTH/2;
    var key_length = filtered_key.length
    
    var j= 0;
    PAGE_LENGTH = parseInt((filtered_key.length-1)/PAGE_COUNT) + 1;
    var DECO_LENGTH = key_length%PAGE_COUNT !=0 && page==PAGE_LENGTH-1 ? key_length%PAGE_COUNT: PAGE_COUNT;
    for(var i= 0; i< key_length && !quit_drawing;++i) {
        var filtered_index = filtered_key[i];
        var project = projects[filtered_index];
        filtered_projects[filtered_index] = project;
        
        var active_index = page * PAGE_COUNT + j;
        if(active_index==i &&
            j < PAGE_COUNT && project_index(j) < key_length) {
            
            var is_even = j%2==0;
            var bottom = is_even? GROUND_HEIGHT : 0;
            var left = is_even?bw : fw;
            var z_index = is_even?0 : 1;

            var css_value = {
                "bottom": bottom,
                "left": left,
                "z-index": z_index,
            };
            var li = data_li(j, project);
            li.css(css_value);

            //info_box

            project_info_ul.append(info_li(bottom, left, z_index, project));


            //decorations
            project_ul.append(li);
            if(j%2==0){
                bw+=AREA_WIDTH;
            } else {
                fw+=AREA_WIDTH;
            }
            var deco_index = (j + page)%3 *2;
            if(j<(DECO_LENGTH/2)) {
                var li = deco_li(deco_index);
                deco_01_ul.append(li);
                li.css({
                    "bottom": 0,
                    "left": li.index()*AREA_WIDTH,
                });
            }
            var checker = DECO_LENGTH%2==0? 0: -1;
            if(j<(DECO_LENGTH/2 + checker)){
                var li = deco_li(deco_index +1);
                deco_02_ul.append(li);
                li.css({
                    "bottom": 0,
                    "left": li.index()*AREA_WIDTH,
                });
            }
            
            j++;
        }
    }
    if(callback!=undefined) {
        callback();
    } else if(key_length==0){
        var bottom = 50;
        var left = AREA_WIDTH*1.5;
        project_ul.append(nodata_li(left, bg_image_nodata, nodata_images));
        project_info_ul.append(nodata_info_li(left, bottom));
    }
    if(container!=undefined) {
        var imgs = container.find("ul").find("img");
        var load_count = 0;
        imgs.each(function() {
            if($(this).get(0).complete){
                load_count++;
            }
        })
        if(load_count >= imgs.length-1) {
            page_update();
            return;
        } else {
            make_loading(container, false, 0.08, 0.012, "#1c2e5f", "#fff", 0.08, 0.012);
        }
        imgs.on("load",function() {
            load_count++;
            if(load_count >= imgs.length-1) {
                container.finish_loading();
                load_count = 0;
            }
        })
    }
    page_update();
}

var animating = 0;
var button_wrap = $("<div class=\"button_wrap\"></div>");
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
        "width":CONTENT_WIDTH*0.04,
        "height":CONTENT_WIDTH*0.04,
        "font-size":CONTENT_WIDTH*0.03,
        "text-align":"center",
        "display":"inline-block",
        "draggable":false,
        "color":"#fff",
    })
    button_wrap.css({
        "width":"100%",
        "text-align":"center",
        "left":0,
        "bottom":CONTENT_WIDTH*0.01,
        "z-index":10,
        "position":"absolute",
    })
    
    $(container).append(button_wrap);
}

function page_update(){
    button_wrap.find("span").css({
        "width":CONTENT_WIDTH*0.04,
        "height":CONTENT_WIDTH*0.04,
        "font-size":CONTENT_WIDTH*0.03,
    })
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
//    if(window.innerWidth>=1000) {
//        CONTENT_WIDTH = 1000;
//    } else {
//        CONTENT_WIDTH = window.innerWidth;
//    }
    //sizing
    if(container.parents(".fullpage_active").length>0) {
        console.log("map_resize");
        AREA_WIDTH = CONTENT_WIDTH*0.2;
        AREA_HEIGHT = CONTENT_WIDTH*0.17;
        GROUND_HEIGHT = CONTENT_WIDTH*0.05;
        BOX_SIZE = CONTENT_WIDTH*0.12;
        BOX_MARGIN = (AREA_WIDTH - BOX_SIZE)/2;
        X_LINE = container.height()/2-AREA_HEIGHT;
        quit_drawing = true;
    //    if(container!=undefined && container.parents("."))
        draw(Object.keys(filtered_projects));
    }
}

function load_map(callback){
    //map first load
    var container_value = "#section_04 .work_wrap";
    container = $(container_value);
    
    AREA_WIDTH = CONTENT_WIDTH*0.2;
    AREA_HEIGHT = CONTENT_WIDTH*0.17;
    GROUND_HEIGHT = CONTENT_WIDTH*0.05;
    BOX_SIZE = CONTENT_WIDTH*0.12;
    BOX_MARGIN = (AREA_WIDTH - BOX_SIZE)/2;
    X_LINE = container.height()/2-AREA_HEIGHT;
    
    initialize_map("./meta/project_list.xml", function(){
        window.addEventListener('resize', map_resize);
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