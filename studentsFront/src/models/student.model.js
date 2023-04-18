
export class StudentModel{
   name     = '';
   last_name = '';
   age   =  '';
   address = false;
   related_courses = []

   constructor(id, name, lastName, age, address, relatedCourses){
      this.id = id;  
      this.name = name;
      this.last_name = lastName;
      this.age = age;
      this.address = address;
      this.related_courses = relatedCourses;
   }
}