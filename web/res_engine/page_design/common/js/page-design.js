(function (win,plugin) {
    /***运行态 控件值渲染模板适配器,根据控件htmlType做适配处理 ******/
    var  PageDesignControlAdapter = {
        templateMap: {},
        templateMap4runtime:{},
        htmlTypeRender: {}
    };

    var html = oui.loadUrl(plugin.designTplUrl,1);
    var $tpls = $(html);
    $tpls.each(function(){
        var id = this.id;
        if(id.indexOf('page_design_control')>-1){
            PageDesignControlAdapter.templateMap[id.replace('page_design_control_','')] = $.trim(this.innerHTML);
        }else if(id.indexOf('page_runtime_control')>-1){
            PageDesignControlAdapter.templateMap4runtime[id.replace('page_runtime_control_','')] = $.trim(this.innerHTML);
        }else if(id.indexOf('list_design_content_tpl')>-1){
            PageDesignControlAdapter.templateMap['pageList'] = $.trim(this.innerHTML);
        }else if(id.indexOf('list_runtime_content_tpl')>-1){
            PageDesignControlAdapter.templateMap4runtime['pageList'] = $.trim(this.innerHTML);
        }
    });
    PageDesignControlAdapter.getHtmlTypeRender = function(htmlType,isRunTime) {
        var key = htmlType;
        if(isRunTime){
            key +='_runtime';
        }
        if(!this.htmlTypeRender[key]) {
            if(!isRunTime){
                if(!this.templateMap[htmlType]){
                    this.htmlTypeRender[key] = function(){};
                }else{
                    this.htmlTypeRender[key] = template.compile(this.templateMap[htmlType]);
                }
            }else{
                if(!this.templateMap4runtime[htmlType]){
                    this.htmlTypeRender[key] = function(){};
                }else{
                    this.htmlTypeRender[key] = template.compile(this.templateMap4runtime[htmlType]);
                }
            }
        }
        return this.htmlTypeRender[key];
    };
    PageDesignControlAdapter.render = function(control, isRunTime) {
        return this.getHtmlTypeRender(control.htmlType,isRunTime)({
            control:control || {},
            item:control || {}
        });
    };
    PageDesignControlAdapter.renderPageList = function(isRunTime) {
        return this.getHtmlTypeRender('pageList',isRunTime)({
            AbsoluteDesign:plugin.getDesigner()
        });
    };
    plugin.PageDesignControlAdapter = PageDesignControlAdapter;
})(window,com.oui.DesignBiz);

