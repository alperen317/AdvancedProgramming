class Course{
  constructor(n, t, d, r){
	  this.name = n;
	  this.time = t;
	  this.date = d;
	  this.rooms= r;
	  
  }
  toString(){
	  return "Name : "+this.name+"Time : "+this.time+"Date : "+this.date+"Rooms : "+this.rooms;
  }
}
class Student{
	constructor(i, n, g, c){
		this.id = i;
		this.name = n;
		this.gpa = g;
		this.courses = c;
	}
  toString(){
	  return "İd : "+this.id+"Name : "+this.name+"Gpa : "+this.gpa+"Courses : "+this.courses;
  }
	
}

class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
		
	}
  toString(){
	  return "Point X : "+this.x+"Point Y : "+this.y;
  }
}

class Point3D extends Point {
	
	constructor(x,y,z){
		super(x,y);
		this.z = z ;
	}
	toString(){
	  return "Point X : "+this.x+"Point Y : "+this.y,"Point Z :"+this.z;
  }
}

class Distance {

constructor(km=0){

this.km=Math.round(km);

}


get miles() {
    return Math.round(this.km *1.6);
  }
  set miles(value=0) {
 this.km=Math.round(value/1.6);
  }
toString() {
   return this.km+" km";
  
 }
static fromMiles(value){
   let d =new Distance();
   d.miles=value;
   return d;

}
}

class CW4 extends Menu {
	constructor() {
		super();
		this.course1 = new Course("305","11:00","22.10.2019","202");
		this.stundent = new Student ("317","Ali","2.0","305");
	    this.point=new Point("3","7");
		this.point3d=new Point3D("4","7","9");
		this.distance=new Distance("5200","4300");
	}

}
