// variable
let LIST, id;

// select element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// class untuk perubahan content
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// get item from localstorage harus di bawah class perubahan content
let data = localStorage.getItem("TODO");
// cek data !empty
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length; //set id ke terakhir data
	loadList(LIST); //load list ke user interface
} else {
	LIST = [];
	id = 0
}
// load item ke user interface
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

clear.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
})

// date sekarang
const option = {weekday : "long", month : "short", day : "numeric", year : "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", option);

// fungsi add
function addToDo(toDo, id, done, trash){
	// trash true selesai
	if (trash) {return;}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const item = `
				<li class="item">
					<i class="fa ${DONE} co" job="complete" id="${id}"></i>
					<p class="text ${LINE}" job="text">${toDo}</p>
					<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
				</li>
				`;
	const position = "beforeend";
	list.insertAdjacentHTML(position, item);
}

// add saat enter key di input
document.addEventListener("keyup", function(e){
	// code enter
	if (e.key== 'Enter') {
		const toDo = input.value;
		// cek input kosong
		if (toDo) {
			addToDo(toDo, id, false, false);
			// masuk ke list
			LIST.push({
				name : toDo,
				id : id,
				done : false,
				trash : false
			});

			// add item to localstorage 
			localStorage.setItem("TODO", JSON.stringify(LIST));

			id++;
		}
		input.value = "";
	}
})

// complete
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove
function removeToDo(element){
  console.log(element.parentNode.parentNode)
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;
}

// mentarget item yang di klik
list.addEventListener("click", function(event){
	const element = event.target; //return element yang di klik di dalam list
	const elementJob = element.attributes.job.value; //complete atau delete

	if (elementJob == "complete") {
		completeToDo(element);
	} else if (elementJob == "delete"){
		removeToDo(element);
	}
	// add item to localstorage 
	localStorage.setItem("TODO", JSON.stringify(LIST));
})