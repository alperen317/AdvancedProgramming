class Course{
  constructor(code, time, date){
	  this.course_code = code ;
	  this.course_time = time;
	  this.course_date = date;
	  this.course_rooms= [];
	  
  }
  toString(){
	  return "Code : "+this.course_code+"Time : "+this.course_time+"Date : "+this.course_date+"Rooms : "+this.course_rooms;
  }
}
class Student{
	constructor(id, name, gpa){
		this.student_id = id;
		this.student_name = name;
		this.student_gpa = gpa;
		this.student_courses = [];
		
	}
	 addCourse(a){
		 this.student_courses.push(a);
		 
	 }
  toString(){
	  return "İd : "+this.student_id+"Name : "+this.student_name+"Gpa : "+this.student_gpa+"Courses : "+this.student_courses;
  }
	
}


   

class Database{
	constructor(){
		this.database_students = new Map();
		this.database_courses = new Map();
		this.readStudent();
		this.readCourses();
	
	
		
	}
	addCourse(text){
		
		let txt = text.split('\n')
		for(let line of txt){
			let a = this.parseCourse(line);
			this.database_courses.set(a.course_code, a);
			
		}
		
		//console.log(this.database_courses)
	
	}
	parseCourse(line){
		let s = line.split("\t");
		let course = new Course(s[0],s[1],s[2]);
		let i;
			for(i=3; i<s.length; i++){
				course.course_rooms.push(s[i]);
			}
			return course;
		
	}
	parseStudent(line){
		
		let s = line.split("\t");	
		let student = new Student(s[0],s[1],s[2]);
		let i;	
		for(i=3; i<s.length; i++){
			student.student_courses.push(s[i]);
		}
		
		return student;
		
		
	}
	
	readCourses(){
		fetch("https://maeyler.github.io/JS/data/Courses.txt")
        .then(res => res.text())
		.then(res => [this.addCourse(res)])
	}
	readStudent() {
		
    fetch("https://maeyler.github.io/JS/data/Students.txt")
        .then(res => res.text())
		.then(res => [this.addStudents(res)])

        
}
	addStudents(text){
        let txt = text.split('\n');
		// console.log(txt.length) // ---> 3129
		// console.log(typeof(txt)+"  --- "+txt[0])
		
		for (let line of txt){
			
				let a = this.parseStudent(line);
			    this.database_students.set(a.student_id, a)
		    
		}

		// console.log(this.database_students.get("116690070"))
		
		
		
	}
	dersBul(id){
		
		// console.log(typeof(id)) --> string
		return   this.database_students.get(id);
	
	}
	findBest(){
		let mp = this.database_students
		var maxGpa ;
		let max = 0.0;
		for(var[key, value] of mp){
			let gpa = parseFloat(value.student_gpa)
			if(max < gpa){
				maxGpa = value
				max = gpa
			
			}
		}
		
		return maxGpa
	}
	biggerThan(gpa){
		//console.log(gpa);
		let count=0;
		let mp1 = this.database_students;
		let gpa1 = parseFloat(gpa)
		for(var[key, value] of mp1){
			let value1 = parseFloat(value.student_gpa)
			if (value1 > gpa1 ){
				count ++
			}
		}
		return count
	}
	searchStudent(courseCode){
		// console.log(courseCode+"   "+typeof(courseCode))
		let mp1 = this.database_students;
		var msg = ''
		for(var[key,value] of mp1){
			let value1 = value.student_courses;
			for(let lesson of value1){
				if(courseCode == lesson){
					msg += "İd:  "+value.student_id+"  Name:  "+value.student_name+"\n"
					
					break;
				}
				
			}
			
		}
		//console.log("js"+msg)
		return msg;
		
	}
	randomStdId(){
		let keys = new Array();
		
		
		for(var [key,value] of this.database_students){
				keys.push(key)
		
		}
		let randomId = parseInt(Math.random() * keys.length)
		console.log(keys[randomId]+" type   " + typeof(keys[randomId])) // --> type string
		return keys[randomId];
		
		
		
	}
	derslikBul(roomCode){
		
		//console.log(roomCode)
		let mp1 = this.database_courses;
		let msg =''
		let count = 0;
		for(var[key,value] of mp1){
			let value1 = value.course_rooms;
			// array console.log(value),
			for(let course of value1){
				if(roomCode == course){
					msg += "Course Code : "+value.course_code+" ------>   Course Date   :"+value.course_date+"\n"
					msg += "\n"
					
					count++
					break;
				}
			}
		}
		let msg1 = "Derslikte ki toplam ders sayısı = "+count+"\n"
		console.log(msg1)
		return  msg1 + msg;
	}
	sınavTakvimi(student){
		let a = student.student_courses;
		let mp1 = this.database_courses;
		let msg = '';
		for(let lesson of a){
			for(var [key, value] of mp1){
				if(key == lesson){
					msg += "Code : "+key+"  Exam Date : "+value.course_date+"Course Time : "+value.course_time+"\n"
				}
			}
		}
		return msg;
	}
}
