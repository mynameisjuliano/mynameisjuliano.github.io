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
	{"name": "Java/HTML", "major":1},
	{"name": "Visual Fox Pro", "major":1},
	{"name": "Database Mgmnt.", "major":1},
	{"name": "C.S.S. 2", "major":1},
	{"name": "S.A.D.", "major":1},
	{"name": "Photoshop", "major":1},
	// Minor
	{"name": "B.E.C.", "major":0},
	{"name": "Accounting 2", "major":0},
	{"name": "P.E.", "major":0}

];

var Users = [
	{"name": "admin", "pass":"password"},
	{"name": "teacher", "pass":"teac123"}
]

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

var logged_in = false;
function login(pass) {

	var unamei = document.getElementById("username");
	var pwordi = document.getElementById("pass");
	var pass_error = document.getElementById("pass-error-msg");

	var username = null;
	var pword = null;

	function new_screen() {
		var login_div = document.getElementById("login-div");
		var s_list = document.getElementById("s-list");

		login_div.style.visibility = "hidden";
		pass_error.style.visibility = "hidden";
		s_list.style.visibility = "visible";
		reload_student_list();
	}

	if(pass) {
		new_screen();
		logged_in = true;
		return;
	}

	if(unamei != null) {
		username = unamei.value;
	}

	if(pwordi != null) {
		pword = pwordi.value;
	}

	if(username === "" || username == null) {
		pass_error.innerHTML = "Please input username";
		pass_error.style.visibility = "visible";
_
		return;
	}

	for(var i = 0; i < Users.length; i++) {
		var user = Users[i];
		if(user.name == username) {
			if(user.pass == pword) {
				// alert("Login sucessful");
				pass_error.innerHTML = "Logging in";
				pass_error.style.visibility = "visible";
				pass_error.className = "login-success"
				var delayCount = 0;

				var coreFunction = function(func) {
					if(delayCount > 40) {
						new_screen();
					} else {
						var loader = [
							"◐",
							"◓",
							"◑",
							"◒"
						];
						var count = delayCount % loader.length;
						// var loader = ['⠾', '⠽', '⠻','⠯', '⠷'];
						// var loader = [
						// 	'⠁',
						// 	'⠃',
						// 	'⠂',
						// 	'⠆',
						// 	'⠄',
						// 	'⠤',
						// 	'⠠',
						// 	'⠰',
						// 	'⠐',
						// 	'⠘',
						// 	'⠈',
						// 	'⠉'
						// ]
						pass_error.innerHTML = "Logging in " + loader[count];
						window.setTimeout(function() {func(func)}, 50);
					}

					delayCount++;
				}
				window.setTimeout(function() {coreFunction(coreFunction)}, 300)
				// new_screen()
				logged_in = true;
				return;
			} else {
				pass_error.innerHTML = "Invalid password";
				pass_error.style.visibility = "visible";
				return;
			}
		}
	}

	pass_error.innerHTML = "No such user";
	pass_error.style.visibility = "visible";
}

/* **new_student** creates new student in data with firstName,
 * lastName and lrn, without grades. (that is, empty grades) */
function new_student(firstName, lastName, lrn) {
	var student_info = {
		"firstName": firstName,
		"lastName": lastName,
		"lrn": lrn,
		"schoolyear": new Date().getFullYear()
		// "changed": false
	};
	/* make a prototype, with name "grades." */
	student_info["grades"] = [];
	/* make variable student_grades it's a shortcut
	 * to prototype ["grades"] */
	student_grades = student_info["grades"];
	/* make card structure based on @SubjectList */
	for(var i = 0; i < SubjectList.length; i++) {
		var subj = SubjectList[i];
		// TODO: grade -> total_grades
		// TODO: Generate this on the fly.
		student_grades[i] = {
			"name": subj["name"],
			"total_grade":0,
			"performance": 0,
			"activities": 0,
			"quizzes": 0,
			"absent_months": 0,
			"present_months": 0
		};
	}

	// command to add to list.
	// Students.push(student_info);
	return student_info;
}

function delete_student(student_info) {
	Students = Students.filter(function(item) {
		return item != student_info;
	});
	// close_profile_display();
	save();
}

function save() {
	//var base64 = JSON.stringify(Students).atob();
	//document.cookie = "data=" + base64;

	localStorage.setItem("stu", JSON.stringify(Students));
}

function save_data_local() {
	var blob = new Blob([JSON.stringify(Students)]);
	var hlnk = document.createElement('a');
	var date = new Date();
	hlnk.download = "database (" +  date.toLocaleString() + ").json";
	// https://stackoverflow.com/a/56616752
	hlnk.href = window.URL.createObjectURL(blob);
	hlnk.click();
	save();
	hlnk.remove();
}

function import_data() {
	var input = document.getElementById("file-import");

	if(input) {
		var [f] = input.files;
		var rd = new FileReader();
		rd.addEventListener("load", function() {
			/* Catch for errors. */
			try {
				var imported = JSON.parse(rd.result);
				if(imported.length != undefined) {
					Students = imported;
					alert("Import success!");
					reload_student_list();
				} else {
					alert("Import failed. Invalid contents");
				}
			} catch (e) {
				alert("Import failed. Invalid file. Select another");
			}
		});
		if(f) {
			rd.readAsText(f);
		}
	}
}

function get_student_average(student_info) {
	var student_grades = student_info["grades"];
	var total_grades = 0; /* Store grades in this variable */
	for(var i = 0; i < student_grades.length; i++) {
		var subj_grade = parseInt(student_grades[i]["total_grade"]);
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

// to save when closing
var s_grade = null;
function open_grade_summary(grade) {
	var g_popup = document.getElementById("popup-grades-bg");
	g_popup.style.visibility = "visible";
	var g_sum_subname = document.getElementById("g-sum-subject");
	g_sum_subname.innerHTML = grade.name;
	g_popup.addEventListener("key", function() {

	})

	var input_perfmnc = document.getElementById("g-performance");
	var input_activities = document.getElementById("g-activities");
	var input_quizzes = document.getElementById("g-quizzes");
	var input_absent = document.getElementById("g-absent");
	// var input_present = document.getElementById("g-present");

	input_perfmnc.value = parseInt(grade.performance);
	input_activities.value = parseInt(grade.activities);
	input_quizzes.value = parseInt(grade.quizzes);
	input_absent.value = parseInt(grade.absent_months);
	// alert(grade.absent_months);
	// input_present.value = parseInt(grade.present_months);

	function calculate_grade() {
		var input_t_grade = document.getElementById("g-total-grades");
		// TODO: Save directly to the grade object the total_grade
		// TODO: So that display_save() can access it.

		// TODO: Directly update the average display
		if(this.value > 100) {
			this.value = 100;
		} else if(this.value < 0) {
			this.value = 0;
		}

		var grade_profile_input = document.getElementById("grade-" + grade.name);
		var perfrmnc = input_perfmnc.value * 0.4;
		var activities = input_activities.value * 0.2;
		var quizzes = input_quizzes.value * 0.2;
		var attendance = ( (12 - input_absent.value) / 12) * 100 * 0.2;

		var t_grade = Math.floor(perfrmnc + activities + quizzes + attendance);
		input_t_grade.value = t_grade;
		grade.total_grade = t_grade;
		grade_profile_input.value = t_grade;
		// relying on this to be consistent.
		// grade_profile_input.onchange();

		if(grade_profile_input.onchange != null) {
			grade_profile_input.onchange();
		}
	}

	input_perfmnc.onchange = calculate_grade;
	input_activities.onchange = calculate_grade;
	input_quizzes.onchange = calculate_grade;
	input_absent.onchange = calculate_grade;
	calculate_grade();
	s_grade = grade;
}

function close_grade_summary() {
	var g_popup = document.getElementById("popup-grades-bg");
	g_popup.style.visibility = "hidden";

	var input_perfmnc = document.getElementById("g-performance");
	var input_activities = document.getElementById("g-activities");
	var input_quizzes = document.getElementById("g-quizzes");
	var input_absent = document.getElementById("g-absent");
	// var input_present = document.getElementById("g-present");
	var input_t_grade = document.getElementById("g-total-grades");

	// assuming there's s[elected]_grade
	if(s_grade != null) {
		s_grade.performance = parseInt(input_perfmnc.value);
		s_grade.activities = parseInt(input_activities.value);
		s_grade.quizzes = parseInt(input_quizzes.value);
		s_grade.absent_months = parseInt(input_absent.value);
		// s_grade.present_months = parseInt(input_present.value);
		s_grade.total_grade = parseInt(input_t_grade.value);
	}
	// save();
}


var s_student = null;
function open_profile_display(student_info) {
	if(student_info == null) {
		throw new Error();
	}

	var fname = document.getElementById("fname");
	var lname = document.getElementById("lname");
	var lrninput = document.getElementById("idno");
	var sy = document.getElementById("schoolyear");
	var passed = document.getElementById("g-passed");
	var label = document.getElementById("student-label");
	var gcontainer = document.getElementById("g-container");

	fname.value = student_info["firstName"];
	lname.value = student_info["lastName"];
	lrninput.value = student_info["lrn"];
	sy.value = student_info["schoolyear"];

	while(gcontainer.firstChild) {
		gcontainer.removeChild(gcontainer.firstChild);
	}

	var average_input = document.getElementById("g-average");
	var avg = Math.floor(get_student_average(student_info));

	var update_info_pass = function(avg) {
		if(avg < 75) {
			passed.innerHTML = "Has Failing Grade";
			passed.className = "text-failed"
		} else {
			passed.innerHTML = "PASS";
			passed.className = "text-passed"
		}

	}
	var display_average = function() {
		// TODO: little fishy
		var a = Math.floor(get_student_average(student_info));
		average_input.value = a;
		update_info_pass(a);
		display_save(student_info);
	}
	update_info_pass(avg);



	function change_label() {
		var label = document.getElementById("student-label");
		var lName = document.getElementById("lname");
		var fName = document.getElementById("fname");

		var lastName = lName.value;
		var firstName = fName.value;

		if(lastName == "" && firstName == "") {
			label.innerHTML = "<em>Unnamed Student</em>";
		} else {
			if(lastName == "") {
				label.innerHTML = firstName;
			} else if(firstName == "") {
				label.innerHTML = lastName;
			} else {
				label.innerHTML = firstName + " " + lastName;
			}
		}
	}

	fname.onkeyup = change_label;
	lname.onkeyup = change_label;

	if(student_info["lastName"] == "" && student_info["firstName"] == "") {
		label.innerHTML = "<em>Unnamed Student</em>";
	} else {
		if(student_info["lastName"] == "") {
			label.innerHTML = student_info["firstName"];
		} else if(student_info["firstName"] == "") {
			label.innerHTML = student_info["lastName"];
		} else {
			label.innerHTML = student_info["lastName"] +
				", " + student_info["firstName"];
		}
	}



	document.getElementById("g-avg-row").onclick = display_average;
	average_input.value = parseInt(get_student_average(student_info));

	for(var i = 0; i < student_info["grades"].length; i++) {
		var odd = i % 2 == 0;
		m_t = "even";

		if(odd) { m_t = "odd" };
		var grades = student_info["grades"][i];

		var row = document.createElement("div");

		var label = document.createElement("p");
		label.className = "g-label";
		label.innerHTML = grades.name;

		var input = document.createElement("input");
		input.className = "grade-input";
		input.setAttribute("type", "number");
		input.setAttribute("value", grades.total_grade);
		input.setAttribute("id", "grade-" + grades.name);
		input.setAttribute("readonly", true);
		// input.readOnly = true;
		// TODO: Deprecated.
		input.onchange = function() {
			var v = parseInt(this.value);
			if(v < 0) this.value = 0;
			if(v > 100) this.value = 100;
			display_average();
		};

		row.className = "g-row-" + m_t;
		row.onclick = function() {
			open_grade_summary(this.grades);
		}
		row.grades = grades;

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
	var sy = document.getElementById("schoolyear");
	var gcontainer = document.getElementById("g-container");

	student_info["firstName"] = fname.value;
	student_info["lastName"] = lname.value;
	student_info["lrn"] = parseInt(lrninput.value);
	student_info["schoolyear"] = parseInt(sy.value);

	for(var i = 0; i < student_info["grades"].length; i++) {
		var grades = student_info["grades"][i];
		// TODO: Access it directly to student grade.
		var element = document.getElementById("grade-" + grades.name);
		grade = parseInt(element.value); // convert
		grades["total_grade"] = grade;
	}

	if(Students.includes(student_info) != true) {
		Students.push(student_info);
	}

}

function close_profile_display(){
	window.scrollTo(0, 0);
	document.getElementById("popup_bg").style.visibility = "hidden";

	if(s_student["firstName"] == "" && s_student["lastName"] == "" && s_student["new"] == true) {
		delete_student(s_student);
	}

	reload_student_list();
	save();
}


function close_profile_display_save(student_info) {
	display_save(student_info);
	close_profile_display();
}

function display_student_list(list) {
	scontainer = document.getElementById("student-con");
	var s_parent = document.getElementById("s-con")

	if(list.length < 1) {
	s_parent.style.visibility = "hidden";
		s_parent.style.height = "0";
	} else if(logged_in) {
		s_parent.style.visibility = "visible";
		s_parent.style.height = "inherit";
	}

	while(scontainer.firstChild) {
		scontainer.removeChild(scontainer.firstChild);
	}

	for(var i = 0; i < list.length; i++) {
		var odd = i % 2 == 0;
		m_t = "even";

		if(odd) { m_t = "odd" };

		var student = list[i];

		var row = document.createElement("div");
		row.className = "g-row-" + m_t;

		var label = document.createElement("p");

		label.className = "g-label";
		if(student["lastName"] == "" && student["firstName"] == "") {
			label.innerHTML = "<em>Unnamed Student</em>";

		} else {
			if(student["lastName"] == "") {
				label.innerHTML = "<em>[X]</em>, " +
					student["firstName"];
			} else if(student["firstName"] == "") {
				label.innerHTML = student["lastName"] +
					", <em>[?]</em>";
			} else {
				label.innerHTML = student["lastName"] +
					", " + student["firstName"];
			}
		}

		label.stu = student

		label.onclick = function() {
			var st = this.stu;
			open_profile_display(st);
		}

		var input = document.createElement("input");
		input.className = "grade-input";
		input.setAttribute("type", "number");
		input.setAttribute("value", parseInt(get_student_average(student)));
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
