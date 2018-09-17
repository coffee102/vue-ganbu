
import Router from '@/router'
import { getMenu, setMenu } from '@/utils/auth'
//const _import = require('./import-' + process.env.NODE_ENV)
//平级转父子级数据
export function transTreeData(items){
    console.log(items)
    if(items.length>0){
        var curPid= 0 //pid=0，为最上层节点 ，即无父节点
        var parent=findChild(curPid,items);//数组
        return parent;
    }else{
        return [];
    }
}
//找子节点
function findChild (curPid,data){
    var _arr = [];
    var items=data;
    var length=items.length;
    for(var i = 0; i < length; i++){
        if(items[i].pid == curPid){
            var _obj = items[i];

           // _obj.label = items[i].text;
            _obj.children = findChild(_obj.id,data);
            _arr.push(_obj);
        }
    }
    return _arr;
}

function getViews(path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('@/views' + path + '.vue'))
    })
  }
}
//tree转router专用数据
export function transToMenu(menuList,ppath){
    var _arr = []
   /* for(var i=0;i<menuList.length;i++){
        var route = {
            path: menuList[i].attributes,
            meta: {title: menuList[i].text}
        }
        if(menuList[i].type===1||menuList[i].type===2){
            route.hidden= true
        }
        if(menuList[i].children&&menuList[i].children.length>0){
            route.component = Layout
            route.children = transToMenu(menuList[i].children,menuList[i].attributes)
        }else{
                var viewpath =ppath+'/'+menuList[i].attributes
                route.component = getViews(viewpath)
        }
        _arr.push(route)
        

    }*/
    for(var i=0;i<menuList.length;i++){
        var route = {
            path: menuList[i].attributes,
            meta: {title: menuList[i].text},
            component: getViews(menuList[i].componts)
        }
        if(menuList[i].type===1||menuList[i].type===2){
            route.hidden= true
        }
        if(menuList[i].redirect){
            route.redirect= menuList[i].redirect
        }
        if(menuList[i].children&&menuList[i].children.length>0){
            route.children = transToMenu(menuList[i].children,menuList[i].attributes)
        }
        _arr.push(route)
    }
        return _arr

}
