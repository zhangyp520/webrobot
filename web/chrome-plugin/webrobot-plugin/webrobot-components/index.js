//自动任务配置
//自动任务描述
//元素定位
//自动任务显示在定位元素的位置：上、下、左、右； 默认下方
//根据当前页面路径 加载自动任务列表
//根据自动任务id加载自动任务定位器列表(包含元素定位规则列表)
!(function(){
    //ajax获取 WebRobot中当前业务系统和当前业务系统url对应的自动任务列表
    var doc = window.document,
        a = {},
        expose = +new Date(),
        rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/,
        isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
    //获取当前脚本路径
    var getCurrentPath = function(){
        // FF,Chrome
        if (doc.currentScript){
            return doc.currentScript.src;
        }

        var stack;
        try{
            a.b();
        }
        catch(e){
            stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
        }
        // IE10
        if (stack){
            var absPath = rExtractUri.exec(stack)[1];
            if (absPath){
                return absPath;
            }
        }

        // IE5-9
        for(var scripts = doc.scripts,
                i = scripts.length - 1,
                script; script = scripts[i--];){
            if (script.className !== expose && script.readyState === 'interactive'){
                script.className = expose;
                // if less than ie 8, must get abs path by getAttribute(src, 4)
                return isLtIE8 ? script.getAttribute('src', 4) : script.src;
            }
        }
    };
    //根据url 获取参数 url参考 为 http://www.xxx.com?hello=1&xxx=2 解析获得的参数为 {hello:"1",xxx:"2"}
    var getParams = function(url){
        var  reg=/(?:\?|&)(.*?)=(.*?)(?=&|$)/g, temp,res={};
        while((temp=reg.exec(url))!=null) res[temp[1]]=decodeURIComponent(temp[2]);
        return res;
    };
    //获取当前脚本路径所在的目录位置
    var getCurrFolder = function(url){
        var index = url.indexOf('?');
        var temp = url;
        if(index>0){
            temp = url.substring(0,index);
        }
        var path = temp.substring(0,temp.lastIndexOf('/')+1);
        return path;
    };
    //根据系统id参数集成自动任务组件
    //获取当前脚本url 如 http://127.0.0.1:8080/webrobot-components/res_common/index.js?sysId=${sysId}
    var scriptUrl = getCurrentPath(); //获取当前脚本url

    //获取当前脚本参数
    var params = getParams(scriptUrl); //获取url参数

    //系统id
    var sysId = params.sysId; //系统id

    var sysName = params.sysName; //系统名称
    //对于特殊的url 可以在系统中配置特殊url,如果配置了特殊url，则需要业务系统页面中传入特殊的url
    var url = params.url || location.pathname; //当前页面url，可以不传，如果不传则使用浏览页面的默认路径path

    if(!sysId){
        throw new Error('系统id不能为空');
    }
    //在portal中 根据系统id查询系统信息，根据页面url和系统id查询自动任务列表，和定位器列表

    //点击 操作按钮后 ajax 加载自动任务列表

    //如果有多个自动任务，提供选择自动任务

    //如果只有一个自动任务,直接显示自动任务

    //显示当前选择的自动任务

    //步骤式、触点式

    //获取url参数
    var origin = location.origin;
    if(origin.indexOf('startwe')>-1 || origin.indexOf('oursui')>-1){
        return;
    }
    if(window['oui_context']){
        //加载资源
        // 对于插件环境直接加载运行态相关资源
        //非插件环境 加载公共资源后，加载运行态业务资源
        debugger;
    }else{
        //获取当前资源所在目录
        var contextPath = getCurrFolder(scriptUrl);
        window.oui_context = {
            "version":"1.1.1",
            appId:'webrobot-app',
            sysId:sysId,
            sysName:sysName,
            scriptUrl:scriptUrl, //脚本路径
            pageUrl:url, //页面路径
            scriptParams:params,//脚本参数
            promise:true,//异步加载方案
            contextPath:contextPath ,
            "routerViewInnerId":"router-view-webrobot-comp-inner",
            "routerViewId":"routerViewHelpComp",
            "js_version":"?_v=1.1.1"
        };
        var _exports = window.exports;
        var _require = window.require;
        var _module = window.module;
        var _define = window.define;
        if(typeof  exports !='undefined'){
            window.exports =undefined;
        }
        if(typeof window.require!='undefined'){
            window.require = undefined;
        }
        if(typeof module !='undefined'){
            window.module = undefined;
        }
        if( typeof window.define !='undefined'){
            window.define = undefined;
        }
        var resetVars = function(win){
            win.exports = _exports;
            win.require =_require;
            win.module =_module;
            win.define = _define;
        };
        var arr = [
            contextPath+"res_common/oui/system/util.js",
            contextPath+"res_common/oui/system/component-adapter.js",
            contextPath+"res_common/oui/system/oui-tags.js",
            contextPath+"res_common/oui/system/parser.js",
            contextPath+"res_common/oui/system/oui-common.js",
            contextPath+"res_common/oui/system/oui-datautils.js",
            contextPath+"res_common/oui/system/oui-checkform.js",
            contextPath+"res_common/oui/ui/tpl-type.js",
            contextPath+"res_common/oui/ui/base-control.js",
            contextPath+"res_common/oui/ui/form-control.js",
            contextPath+"res_common/oui/ui/ui_common/controls/oui-view/oui-view.js",
            contextPath+"res_common/third/watch/watch.min.js",
            contextPath+"res_common/third/template/simple-virtual-dom/dist/bundle.js",
            contextPath+"res_common/oui/system/oui-biz-ext.js",
            contextPath+"res_common/third/vue/dist/vue.min.js",
            contextPath+"res_common/third/element-ui/lib/index.js",
            contextPath+"res_common/oui/system/main.js",
            contextPath+"res_engine/portal/js/portal.js",
            contextPath+"res_engine/portal/js/portal-ready.js",
            contextPath+"res_common/oui/ui/ui_pc/dialog/dialog.js",
            contextPath+"res_common/third/progress/nprogress.js",
            contextPath+"res_common/third/intro/intro.js",
            contextPath+"res_common/third/intro/introjs.css",
            contextPath+"res_common/third/progress/nprogress.css",
            contextPath+"css/content.css",
            contextPath+"res_common/third/element-ui/lib/theme-chalk/index.css"

        ];
        var start = new Date();
        var getParamByUrl = function(url,key){
            var cfg = {};
            if(!url){
                return cfg;
            }
            if (url.indexOf("?") != -1) {
                var str = url.substr(url.indexOf("?")+1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    if(strs[i].split("=")[0]){
                        cfg[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                    }
                }
            }
            if(key){
                return cfg[key]||"";
            }
            return cfg;
        };
        /** 加载js或者css资源***/
        var loadJsCss = function(url, callback,error ){// 非阻塞的加载 后面的js会先执行
            var isJs = /\/.+\.js($|\?)/i.test(url) ? true : false;
            /** 动态远程脚本场景 jsonp调用场景**/
            if(url.indexOf('__script__')>=0 && getParamByUrl(url,'__script__')){
                isJs = true;
            }

            if(!isJs){ //加载css
                var links = document.getElementsByTagName('link');
                for(var i = 0; i < links.length; i++){//是否已加载
                    var href = links[i].getAttribute('data-url') || links[i].href;
                    if(href.indexOf(url)>-1){
                        callback && (callback.constructor === Function) && callback();
                        return;
                    }
                }
                var link = document.createElement('link');
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                link.setAttribute('data-url',url);
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(link);
                callback && (callback.constructor === Function) && callback();
            }else{ //加载js
                var scripts = document.getElementsByTagName('script');
                for(var i = 0; i < scripts.length; i++){//是否已加载
                    var src =scripts[i].getAttribute('data-url') || scripts[i].src;
                    if(src.indexOf(url)>-1){
                        //已创建script
                        if(scripts[i].className === 'loaded'){//已加载
                            callback && (callback.constructor === Function) && callback();
                        }else{//加载中
                            onloaded(scripts[i], callback,error);
                        }
                        return;
                    }
                }
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.src = url;
                script.setAttribute('data-url',url);
                document.body.appendChild(script);
                onloaded(script, callback,error);
            }
        };
        /**监听加载回调 **/
        var onloaded = function(script, callback,error){//绑定加载完的回调函数
            if(script.readyState){ //ie
                script.attachEvent('onreadystatechange', function(){
                    if(script.readyState == 'loaded' || script.readyState == 'complete'){
                        script.className = 'loaded';
                        callback && (callback.constructor === Function) && callback();
                        script=null;
                    }
                });
                if(error){
                    script.attachEvent('onerror', function(){
                        error && (error.constructor === Function) && error();
                    });
                }

            }else{
                script.addEventListener('load',function(){
                    script.className = "loaded";
                    callback && (callback.constructor === Function) && callback();
                    script =null;
                }, false);
                if(error){
                    script.addEventListener('error',function(){
                        error && (error.constructor === Function) && error();
                    }, false);
                }
            }
        };

        /**加载基础资源 */
        var loadBase = function(array,callback){
            loadJsCss(contextPath+"res_common/third/template/template_debug_3_0_0.js",function(){
                loadJsCss(contextPath+"res_common/oui/system/oui-jsclazz.js",function(){
                    loadJsCss(contextPath+"res_common/oui/system/oui-define.js",function(){
                        oui.require(array,function(){
                            callback&&callback();

                        });
                    })
                })
            })
        };
        if((typeof window.$ !='undefined') && (typeof window.jQuery !='undefined')){
            loadBase(arr,function(){
                var end = new Date();
                console.log('loadTime:'+(end-start));
                resetVars(window);
            });
        }else{
            loadJsCss(contextPath+"res_common/third/jquery/jquery-3.2.1.min.js",function(){
                loadBase(arr,function(){
                    var end = new Date();
                    console.log('loadTime:'+(end-start));
                    resetVars(window);
                });
            });
        }

    }




})();


