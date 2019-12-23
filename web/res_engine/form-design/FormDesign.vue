<template>
  <div class="design-container">
    <Row>
      <Col span="4" class="col-content design-controls ">控件列表

        <Menu theme="light" :open-names="openNames">
          <Submenu v-for="(item,index) in findRootGroups()" :key="index" :name="item.id">
            <template slot="title">
              <Icon type="ios-paper" />
              {{item.title}}
            </template>
            <MenuItem v-for="(child,cIndex) in findChildren(item.id)" :key="cIndex" :name="child.id">{{child.title}}</MenuItem>
          </Submenu>
        </Menu>

      </Col>
      <Col span="16" class="col-content design-content">设计区域
        <draggable :list="controls" :move="event2dragMoveControl" @update="event2controlsDragEnd" :options="{animation: 60,handle:'.row-hot-input'}">
          <transition-group name="list-complete" class='form-inline'>
            <div v-for="(item,index) in controls" :key="item.id" class="list-complete-item form-group">
              {{getHtml(item)}}
            </div>
          </transition-group>
        </draggable>
      </Col>
      <Col span="4" class="col-content design-props">属性设置</Col>
    </Row>
  </div>
</template>

<script>
    export default {
        name: "FormDesign",
        data() {
          return {groups:[]}
        },
        methods:{
          /****
           * 获取控件根菜单分组
           */
          findRootGroups:function () {
            return oui.findManyFromArrayBy(this.groups,function (item) {
              if(item&&(!item.parentId)){
                return true;
              }
            });
          },
          findChildren:function (id) {
            return oui.findManyFromArrayBy(this.groups,function (item) {
              if(item&&(item.parentId&&item.parentId==id)){
                return true;
              }
            });
          },
          /****
           * 初始化控件区域
           */
          init4controlsArea:function () {
            //数据加载与数据处理
            this.groups= [{
              id:'1',
              title:'布局'
            },{
              id:'2',
              title:'表单控件'
            },{
              id:'3',
              title:'容器'
            },{
              id:'4',
              title:'数据源'
            },{
              id:'1-1',
              parentId:'1',
              title:'grid布局'
            },{
              id:'2-1',
              parentId:'2',
              controlType:'textfield',
              title:'文本框'
            }];
            var temp = this.findRootGroups();
            var openNames = [];
            oui.findManyFromArrayBy(temp,function (item) {
              openNames.push(item.id);
            });
            this.openNames = openNames;
          },
          /****
           * 初始化设计区域
           */
          init4DesignContent:function () {
            this.controls = [];

          },
          /** 事件开始******/
          /****
           * 拖拽移动控件
           */
          event2dragMoveControl:function () {

          },
          /**
           *  拖拽结束事件
           */
          event2controlsDragEnd:function () {

          }
        },
        created() {
          this.init4controlsArea();//初始化控件 区域
          this.init4DesignContent();//初始化设计区域


        },
        mounted() {
          //页面二次加工

        }
    }
</script>

<style scoped>
  .design-container .col-content{
    min-height: 800px;
  }
</style>




