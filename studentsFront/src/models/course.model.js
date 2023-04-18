import { Journeys } from "../components/enums/journeys.enums";

export class CourseModel{
   name         = '';
   schedule     = Journeys.Morning;
   startDate   = '';
   endDate     = '';
   relatedStudentsNumber = 0;

   constructor(name, schedule, startDate, endDate, relatedStudentsNumber){
        this.name = name;
        this.schedule = schedule;
        this.start_date = startDate;
        this.end_date = endDate;
        this.relatedStudentsNumber = relatedStudentsNumber;
   }
}