var foo=1;
var bar=2;
var i=2;
function test(i){
	i=5;
	var foo=3;
	bar=4;
	console.log(i);//5
	console.log(foo);//3
	console.log(bar);//4
}
test(10);
console.log(i);//2?是因为test(i)，函数的参数本身是个局部变量，覆盖了全局变量
console.log(foo);//1
console.log(bar);//4