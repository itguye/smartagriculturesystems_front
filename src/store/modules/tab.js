export default{
    state:{
        isCollapse: false// 控制菜单打开还是关闭
    },
    mutations:{
        // 修改菜单展开修改的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        }
    }
}