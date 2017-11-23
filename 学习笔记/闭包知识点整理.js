/*知识点
闭包：通过引用访问函数内的函数，实现信息的驻留，即引用在空间不灭
1.引用在空间不灭
2.闭包环境内共享封闭空间
3.链式调用
*/
//简单闭包函数
var person =function(){
	var count=0;
	function getCount(){
		return count++;//返回后再加
	}
	return getCount();
}
var p=person();
p();//0
p();//1
p();//2  引用在空间上不灭

//共享密封空间
function fn(){
	var num=0;
	return {
		add1:function(){
			num++;
			console.log(num);//已经加过了
		},
		add2:function(){
			num+=2;
			console.log(num);
		}
	}
}
var a=fn();
a.add1();//1
a.add2();//3   1+2
a.add1();//4   1+2+1 证明add1，add2共享了return对象的密闭空间
//链式调用
function fn(){
	var name="a";
	function fn1(){
			return {
				getName:function(){
				console.log(name);
				return this;//将该对象返回后，才能用w.getName().setName(b);
			},
			setName:function(b){
				name=b;//会改变全局变量，如果用var name=b,则仅仅在当前作用域改变
				return this;
			}
			}
			
		}
	return fn1;
	}
var w=fn();
w.getName();
w.setName("b").getName();//如果不用return this将方法对象返回，会报错

//使用匿名函数自执行同理
(function(){
	var name="a";
	function fn1(){
			return {
				getName:function(){
				console.log(name);
				return this;//将该对象返回后，才能用w.getName().setName(b);
			},
			setName:function(b){
				name=b;//会改变全局变量，如果用var name=b,则仅仅在当前作用域改变
				return this;
			}
			}
			
		}
	return fn1;//或者将内部函数暴露给全局函数 window=fn1();如果fn1使用的是函数表达式，则不用加（）;
})()
