(function(){
    var hello = {};
    var table  = {};
    (function(){
        table.init  = function(){//创建并且设置表格表头
            var element =  document.body;
            var table = document.createElement('table');
            table.id = 'someId';
            table.border = '2';  
            //如果把js脚本放到头文件会报appendchild取到的对象为空的错误，放到文档末尾就可以，要先加载文档
            element.appendChild(table);//在body中添加table div
            var table = document.getElementById('someId');//重新设置table对应的元素
            var rowCount = table.rows.length;//行
            var row = table.insertRow(rowCount);//插入新行的方法
            var cell1 = row.insertCell(0);//创建第一个单元格
            cell1.innerHTML = '用户名'; 
            var cell2 = row.insertCell(1);//创建第二个单元格
            cell2.innerHTML = '密码'; 
         
        };
        table.append = function(user_list){
            var table = document.getElementById('someId');
            console.info(user_list);    
            for(var i=0 ,max = user_list.length; i< max ; i++){
                var rowCount = table.rows.length;
                console.info(user_list[i]);
                var row = table.insertRow(rowCount);
                var cell1 = row.insertCell(0);
                cell1.innerHTML = user_list[i].name; 
                var cell2 = row.insertCell(1);
                cell2.innerHTML =  user_list[i].age; 
            }
        };
    })();
    hello.table = table;
    //使用浏览器类型
    if (typeof window === 'object' && typeof window.document === 'object') {
         window.hello = hello;
    }
   /* // 使用CommonJs模块类型
     if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = MyApp;
        }
        exports.MyApp = MyApp;
    }
     
    //AMD模块
    if (typeof define === 'function' && define.amd) {
        define('MyApp', [], function () {
            return MyApp;
        });
    }*/
})();//(function(){})匿名闭包，将整个函数放到这个匿名闭包中，这样里面的代码就能访问外部全局变量，同时保证作用域只在该闭包函数内
