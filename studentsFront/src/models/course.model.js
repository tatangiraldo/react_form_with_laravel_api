import { Journeys } from "../components/enums/journeys.enums";

export class CourseModel{
   id = 0;
   name = '';
   schedule = Journeys.Morning;
   start_date = '';
   end_date = '';
   related_students_number = 0;

   constructor(id, name, schedule, startDate, endDate, related_students_number, created_at, updated_at){
      this.id = id;  
      this.name = name;
      this.schedule = schedule;
      this.start_date = startDate;
      this.end_date = endDate;
      this.related_students_number = related_students_number;
   }
}