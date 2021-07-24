/* Demo */

// set element text
function main(){
	console.log(getFuncName());
	document.getElementById('demo').innerHTML = "this is the index.html file";
}

// get method
function getFuncName() { 
	return getFuncName.caller.name + "()";
} 




 