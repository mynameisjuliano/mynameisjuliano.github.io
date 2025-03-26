/* Student record script. started, Mar 23, 2025, 4 PM  */

/* 
 * `script.js` handles + creates student records
 * and grades and displays them. Uses objects
 * to create data, and html display tags for showing
 * info. */

/* Term explaination
 * - Function : a list of program code that does something without 
 *   writing the "code" in repeat, again. It can be used like a
 *   shortcut, or to organize the list of program "functions" or
 *   abilities. (search in dictionary)
 * - A variable: a small piece of data, with labels.
 * - "Prototypes", are essentialy variables with parts with labels.
 * - A "return" is a thing you want to "return" to variable that 
 *   called the function.
 * - An "array" is a list of things/data.
 */

function new_subject(name, major) {
	return {"name": name, "major": major}
};

/* variable Subjects, a list of Subject names. */
var SubjectList = [
	{"name": "JAVA/HTML", "major":1},
	{"name": "Visual FP", "major":1},
	{"name": "D.M.A.", "major":1},
	{"name": "CSS2", "major":1},
	{"name": "SAD", "major":1},
	{"name": "Photoshop", "major":1},
	// Minor
	{"name": "B.E.C.", "major":0},
	{"name": "Accounting 2", "major":0},
	{"name": "P.E.", "major":0}
	
];

/* list of created students. */
var Students = JSON.parse(localStorage.getItem("stu"));

if(Students == null) Students = [];

function copyStudentsList() {
	var copyList = [];
	for(var i = 0; i < Students.length; i++) {
		copyList[i] = Students[i];
	}
	return copyList;
}

/* **new_student** creates new student in data with firstName, 
 * lastName and lrn, without grades. (that is, empty grades) */
function new_student(firstName, lastName, lrn) {
	var student_info = {
		"firstName": firstName,
		"lastName": lastName,
		"lrn": lrn
	};
	/* make a prototype, with name "grades." */
	student_info["grades"] = [];
	/* make variable student_grades it's a shortcut
	 * to prototype ["grades"] */
	student_grades = student_info["grades"];
	/* make card structure based on @SubjectList */
	for(var i = 0; i < SubjectList.length; i++) {
		// TODO: are arrays length ".length"?
		var subj = SubjectList[i];
		student_grades[i] = {"name": subj["name"], "grade":0};
	}
	
	// command to add to list.
	Students.push(student_info);
	return student_info;
}

function delete_student(student_info) {
	Students = Students.filter(function(item) {
		return item != student_info;
	});
	close_display();
	save();
}

function save() {
	//var base64 = JSON.stringify(Students).atob();
	//document.cookie = "data=" + base64;	

	localStorage.setItem("stu", JSON.stringify(Students));
}

function get_student_average(student_info) {
	var student_grades = student_info["grades"];
	var total_grades = 0; /* Store grades in this variable */
	for(var i = 0; i < student_grades.length; i++) {
		var subj_grade = parseInt(student_grades[i]["grade"]);
		total_grades = total_grades + subj_grade;
	}
	var subj_total_count = student_grades.length;
	var average = total_grades/subj_total_count;

	return average;
}


// JavaScript Program for selectionSort
// g4g.com

function sort_students_by_average(list, type) {
    let n = list.length;
    for (let i = 0; i < n - 1; i++) {
	let minIndex = i;
        for (let j = i + 1; j < n; j++) {	
		var selAvg = get_student_average(list[j]);
		var minIndAvg = get_student_average(list[minIndex]);
		if (type == "highest") {
			if(selAvg > minIndAvg) minIndex = j;
		} else if(type == "lowest") 
			if(selAvg < minIndAvg) minIndex = j;
        }
         //Swap list[i] and list[minIndex]
        let temp = list[i];
        list[i] = list[minIndex];
        list[minIndex] = temp;
    }

    return list;
}

function sort_students_by_first_name(arr) {
	arr.sort(function(a, b) {
		var a_name = a["firstName"] + a["lastName"];
		var b_name = b["firstName"] + b["lastName"];
		if(a_name < b_name) return -1;
		if(a_name > b_name) return 1;
		if(a_name == b_name) return 0;
	});
	return arr;
}


function sort_students_by_last_name(arr) {
	arr.sort(function(a, b) {
		var a_name = a["lastName"] + a["firstName"];
		var b_name = b["lastName"] + b["firstName"];
		if(a_name < b_name) return -1;
		if(a_name > b_name) return 1;
		if(a_name == b_name) return 0;
	});

	return arr;
}

var s_student = null;
function open_profile_display(student_info) {
	if(student_info == null) {
		// reset
		// TODO: Remove!
		student_info = {
			"firstName":"", 
			"lastName":"",
			"lrn":"",
			"grades":[]
		};
	}

	var fname = document.getElementById("fname");
	var lname = document.getElementById("lname");
	var lrninput = document.getElementById("idno");
	var gcontainer = document.getElementById("g-container");

	fname.value = student_info["firstName"];
	lname.value = student_info["lastName"];
	lrninput.value = student_info["lrn"];
	
	while(gcontainer.firstChild) {
		gcontainer.removeChild(gcontainer.firstChild);
	}
	
	for(var i = 0; i <= student_info["grades"].length; i++) {
		var odd = i % 2 == 0;
		m_t = "even";

		if(odd) { m_t = "odd" }; 
		var grades = {};
		var is_average = i == student_info["grades"].length
		if(is_average) {
			grades = {"name":"Average", "grade": get_student_average(student_info)};
		} else {
			grades = student_info["grades"][i];
		}

		var row = document.createElement("div");

		var label = document.createElement("p");
		label.className = "g-label";
		label.innerHTML = grades.name;

		var input = document.createElement("input");
		input.className = "grade-input";
		input.setAttribute("type", "number");
		input.setAttribute("value", grades.grade);
		//input.setAttribute("min", 75);
		//input.setAttribute("max", 100);

		input.addEventListener("change", function() {
			var v = parseInt(this.value);
			if(v < 75) this.value = 75;
			if(v > 100) this.value = 100;
		});
		input.setAttribute("id", "grade-" + grades.name);

		if(is_average) {
			row.className = "g-row-average";
			row.onclick = function() { 
				display_save(student_info);
				avg = get_student_average(student_info);
				input.setAttribute("value", avg);
			}

			input.readOnly = true;
		} else {
			row.className = "g-row-" + m_t;
		}

		row.appendChild(label);
		row.appendChild(input);

		gcontainer.appendChild(row);
	}

	document.getElementById("popup_bg").style.visibility = "visible";
	s_student = student_info;
}

function display_save(student_info) {
	if(student_info == null) {
		// TODO: Remove!
		student_info = {
			"firstName":"", 
			"lastName":"",
			"lrn":"",
			"grades":[]
		};
	}

	var fname = document.getElementById("fname");
	var lname = document.getElementById("lname");
	var lrninput = document.getElementById("idno");
	var gcontainer = document.getElementById("g-container");

	student_info["firstName"] = fname.value;
	student_info["lastName"] = lname.value;
	student_info["lrn"] = parseInt(lrninput.value); // get n
	
	for(var i = 0; i < student_info["grades"].length; i++) {
		var grades = student_info["grades"][i];
		var element = document.getElementById("grade-" + grades.name);
		grade = parseInt(element.value); // convert
		grades["grade"] = grade;
	}

}

function close_display(){
	window.scrollTo(0, 0);
	document.getElementById("popup_bg").style.visibility = "hidden";
	if(s_student["firstName"] == "" && s_student["lastName"] == "") {
		Students.delete_student(s_student);
	}

	reload_student_list();

}


function close_display_save(student_info) {
	display_save(student_info);
	close_display();
}

function display_student_list(list) {
	scontainer = document.getElementById("student-con");

	while(scontainer.firstChild) {
		scontainer.removeChild(scontainer.firstChild);
	}

	for(var i = 0; i <= list.length; i++) {
		var odd = i % 2 == 0;
		m_t = "even";

		if(odd) { m_t = "odd" }; 
		
		var student = list[i];
		var row = document.createElement("div");
		row.className = "g-row-" + m_t;
		
		var label = document.createElement("p");
		label.className = "g-label";
		label.innerHTML = student["lastName"] + ", " + 
			student["firstName"];
		label.stu = student

		label.onclick = function() {
			var st = this.stu;
			open_profile_display(st);
		}

		var input = document.createElement("input");
		input.className = "grade-input";
		input.setAttribute("type", "number");
		input.setAttribute("value", get_student_average(student));
		row.appendChild(label);
		row.appendChild(input);

		scontainer.appendChild(row);
	}
}

function reload_student_list() {
	var value = document.getElementById("arrangement").value;
	copy = copyStudentsList();
	switch(value) {
		case "avg-high":
			sort_students_by_average(copy, "highest");
			break;
		case "first-name":
			sort_students_by_first_name(copy);
			break;
		default:
			sort_students_by_last_name(copy);
			break;
	}
	
	save();
	display_student_list(copy);
}

//var student_test, student_test_2, student_test_3;
function _deploy_not() {
	var student_test = new_student("olfter'Jeff", "Bona-Person", 1928321);
	student_test["grades"][0]["grade"] = 90;
	student_test["grades"][1]["grade"] = 90;
	student_test["grades"][2]["grade"] = 90;

	var student_test_2 = new_student("BounfJoseph", "M'DPerson", 1928321);
	student_test_2["grades"][0]["grade"] = 90;
	student_test_2["grades"][1]["grade"] = 95;
	student_test_2["grades"][2]["grade"] = 90;

	var student_test_3 = new_student("Andergeoff", "Ferrison", 1928321);
	student_test_3["grades"][0]["grade"] = 90;
	student_test_3["grades"][1]["grade"] = 96;
	student_test_3["grades"][2]["grade"] = 90;

	var list2 = copyStudentsList();
	//sort_students_by_average(list2, "lowest");
	//sort_students_by_average(list2, "highest");
	sort_students_by_last_name(list2);
	for(let i of list2) {
		console.log(i["firstName"] + " " + i["lastName"]);
	}
}

//_deploy_not();

