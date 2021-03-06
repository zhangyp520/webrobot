
/** 默认未分类控件，不管是否使用调用方传入的控件列表 都可以使用的控件，如 插入文本， 插入表格一类****/
com.oui.absolute.AbsoluteDesign.defaultControls4Normal = [

    {
        "htmlType":"read",
        "controlType":"label",
        "showType":0,
        "isFormField":false,
        "name":"插入文本",
        "description":"插入文本",
        "fieldType":"string",
            innerStyle:{styleTitle:{textAlign:'center'}},
            "style":{width:793,height:60,layoutType:'onlyTitle'}
    },
    {
        "htmlType":"button",
        "controlType":"button",
        "showType":0,
        "isFormField":false,
        "name":"按钮",
        "description":"按钮",
        innerStyle:{
            styleFieldOuter:{
                textAlign:'center'
            }
        },
        "style":{width:793,height:60,layoutType:'hideTitle'}
    },
    {
        "htmlType":"read",
        "controlType":"image",
        "showType":0,
        "isFormField":false,
        "name":"查看图片",
        "fieldType":"string",
        "style":{width:300,height:300,layoutType:'hideTitle' }
    },
    {
        "htmlType":"read",//二维码
        "controlType":"qrcode",
        "showType":0,
        "isFormField":false,
        "name":"二维码",
        "fieldType":"string",
        "style":{width:300,height:300,layoutType:'hideTitle'}
    },
    {
        "htmlType":"read",//条型码
        "controlType":"barcode",
        "showType":0,
        "isFormField":false,
        "name":"条形码",
        "fieldType":"string",
        "style":{width:793,height:150,layoutType:'hideTitle'}
    },
    {
        "htmlType":"tableLine",
        "controlType":"tableLine",
        "showType":0,
        "isFormField":false,
        "name":"插入表格",
        "fieldType":"string",
        "style":{
            width:600,height:210,
            borderLeftWidth:0,
            borderTopWidth:0,
            borderRightWidth:0,
            borderBottomWidth:0,
            lineHeight:1,
            columnSize:3,
            rowSize:3,
            columnLines:(function(){
                var me = com.oui.absolute.AbsoluteDesign;
                return me.createTableColumnLines({
                    style:{
                        width:600,height:210,
                        lineHeight:1,
                        lineColor:'#e6e6e6',
                        columnSize:3,
                        rowSize:3,
                        borderRightWidth:0,
                        borderBottomWidth:0,
                        borderLeftWidth:0,
                        borderTopWidth:0
                    }
                });
            })(), //默认3列(4条竖线)
            rowLines:(function(){
                var me = com.oui.absolute.AbsoluteDesign;
                return me.createTableRowLines({
                    style:{
                        width:600,height:210,
                        lineHeight:1,
                        lineColor:'#e6e6e6',
                        columnSize:3,
                        rowSize:3,
                        borderRightWidth:0,
                        borderBottomWidth:0,
                        borderLeftWidth:0,
                        borderTopWidth:0
                    }
                });
            })()//默认3行(4条横线)
        }
    },
    {
        "htmlType":"tableLine",
        "controlType":"detail",
        "showType":0,
        "isFormField":false,
        "name":"插入表格",
        "fieldType":"string",
        "style":{
            width:600,height:120,
            borderLeftWidth:0,
            borderTopWidth:0,
            borderRightWidth:0,
            borderBottomWidth:0,
            lineHeight:1,
            columnSize:3,
            rowSize:2,
            columnLines:(function(){
                var me = com.oui.absolute.AbsoluteDesign;
                return me.createTableColumnLines({
                    style:{
                        width:600,height:120,
                        lineHeight:1,
                        lineColor:'#e6e6e6',
                        columnSize:3,
                        rowSize:2,
                        borderRightWidth:0,
                        borderBottomWidth:0,
                        borderLeftWidth:0,
                        borderTopWidth:0
                    }
                });
            })(), //默认3列(4条竖线)
            rowLines:(function(){
                var me = com.oui.absolute.AbsoluteDesign;
                return me.createTableRowLines({
                    style:{
                        width:600,height:120,
                        lineHeight:1,
                        lineColor:'#e6e6e6',
                        columnSize:3,
                        rowSize:2,
                        borderRightWidth:0,
                        borderBottomWidth:0,
                        borderLeftWidth:0,
                        borderTopWidth:0
                    }
                });
            })()//默认3行(4条横线)
        }
    }
];
/*** 基本分类控件*****/
com.oui.absolute.AbsoluteDesign.defaultControls =[
/** id,name,htmlType,controlType,fieldType**/
    {
        "htmlType":"button",
        "controlType":"button",
        "showType":0,
        "isFormField":false,
        "name":"按钮"
    },
    {
        "htmlType":"tableLine",
        "controlType":"tableLine",
        "showType":0,
        "isFormField":false,
        "name":"插入格子"
    },

    {
        "htmlType":"tableLine",
        "controlType":"detail",
        "showType":0,
        "isFormField":false,
        "name":"插入数据格子"
    },
    {
        "htmlType":"textInput",
        "controlType":"textfield",
        "showType":0,
        "isFormField":true,
        "name":"单行输入框",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"textInput",
        "controlType":"textarea",
        "showType":0,
        "isFormField":true,
        "name":"多行输入框",
        "fieldType":"string",
        "style":{width:793,height:80}
    },
    {
        "htmlType":"textInput",
        "controlType":"number",
        "showType":0,
        "isFormField":true,
        "name":"数字输入框",
        "fieldType":"number",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"textInput",
        "controlType":"cellphone",
        "showType":0,
        "isFormField":true,
        "name":"手机",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"singleselect",
        "showType":0,
        "isFormField":true,
        "name":"下拉框",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"datepicker",
        "showType":0,
        "isFormField":true,
        "name":"日期时间",
        "fieldType":"datetime",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"timepicker",
        "isFormField":true,
        "showType":0,
        "name":"时间",
        "fieldType":"time",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"uploadimage",
        "showType":0,
        "isFormField":true,
        "name":"上传图片",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"attachment",
        "showType":0,
        "isFormField":true,
        "name":"附件",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"address",
        "showType":0,
        "isFormField":true,
        "name":"省市区",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"outercontrol",
        "showType":0,
        "isFormField":true,
        "name":"外部控件",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"lbs",
        "showType":0,
        "isFormField":true,
        "name":"地理位置",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"selectperson",
        "showType":0,
        "isFormField":true,
        "name":"选人",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"selectInput",
        "controlType":"selectdept",
        "showType":0,
        "isFormField":true,
        "name":"选部门",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"repeatSelect",
        "controlType":"radio",
        "showType":0,
        "isFormField":true,
        "name":"单选",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"repeatSelect",
        "controlType":"multiselect",
        "showType":0,
        "isFormField":true,
        "name":"多选",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"repeatSelect",
        "controlType":"switch",
        "showType":0,
        "isFormField":true,
        "name":"开关",
        "fieldType":"boolean",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"repeatSelect",
        "controlType":"score",
        "showType":0,
        "isFormField":true,
        "name":"评分",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"repeatSelect",
        "controlType":"imagesingle",
        "showType":0,
        "isFormField":true,
        "name":"图片单选",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"repeatSelect",
        "controlType":"imagemulti",
        "showType":0,
        "isFormField":true,
        "name":"图片多选",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"read",
        "controlType":"image",
        "showType":0,
        "isFormField":false,
        "name":"查看图片"
    },
    {
        "htmlType":"read",//二维码
        "controlType":"qrcode",
        "showType":0,
        "isFormField":false,
        "name":"二维码"
    },
    {
        "htmlType":"read",//条型码
        "controlType":"barcode",
        "showType":0,
        "isFormField":false,
        "name":"条形码"
    },
    {
        "htmlType":"read",
        "controlType":"hidden",
        "showType":0,
        "isFormField":true,
        "name":"隐藏框",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"read",
        "controlType":"seperateline",
        "showType":0,
        "isFormField":false,
        "name":"分割线",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"read",
        "controlType":"label",
        "showType":0,
        "isFormField":false,
        "name":"文字说明",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"read",
        "controlType":"imagegroup",
        "showType":0,
        "isFormField":false,
        "name":"图片组",
        "style":{width:400,height:300}
    },
    {
        "htmlType":"read",
        "controlType":"serialnumber",
        "showType":0,
        "isFormField":true,
        "name":"流水号",
        "fieldType":"string",
        "style":{width:793,height:60}
    },
    {
        "htmlType":"other",
        "controlType":"textbutton",
        "showType":0,
        "isFormField":false,
        "name":"文本按钮",
        "fieldType":"string",
        "style":{width:793,height:60}
    }
];

