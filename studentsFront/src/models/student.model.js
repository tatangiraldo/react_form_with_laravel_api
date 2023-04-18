
export class StudentModel{
   name     = '';
   lastName = '';
   age   =  '';
   address = false;
   relatedCourses = []

   constructor(name, lastName, age, address, relatedCourses){
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
        this.relatedCourses = relatedCourses;
   }
}