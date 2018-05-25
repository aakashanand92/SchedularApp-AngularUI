import { Injectable } from "@angular/core";
import { Http ,Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Interviewer } from "../models/Interviewer";
import { TimeSlot } from "../models/timeSlot";
import { idList } from "../models/idList";
import { filter, map } from 'rxjs/operators';

@Injectable()
export class InterviewerService{
    private INTERVIEWER_URL:String="http://localhost:8080/interviewer"
    headers: Headers;
    options: RequestOptions;
    constructor(private http:Http){
        this.headers = new Headers({ 'Content-Type': 'application/json' });
 
        this.options = new RequestOptions({ headers: this.headers });
    }

    createInterviewer(interviewer:Interviewer){
      return this.http.post(this.INTERVIEWER_URL+"/",interviewer);

        
    }

    deleteInterviewer(id:Number){
        
        console.log(this.INTERVIEWER_URL+"/"+id+"/delete");
      return  this.http.delete(this.INTERVIEWER_URL+"/"+id+"/delete",this.options);
    }
    updateInterviewer(interviewer:Interviewer,id:Number){
       return this.http.put(this.INTERVIEWER_URL+'/'+id+'/update',interviewer,this.options)
    }

    addTimeSlotForInterviewer(timeSlots:TimeSlot[],id:Number){
     return   this.http.put(this.INTERVIEWER_URL+"//"+id.toString()+"/timeSlots/add",timeSlots,this.options)
    }

    schedule(){
        return this.http.get(this.INTERVIEWER_URL+"//schedule",this.options);
    }

    getAllInterviewers(){

      return  this.http.get(this.INTERVIEWER_URL+"/",this.options);
   
    }

    getPriorityList(){
        return this.http.get(this.INTERVIEWER_URL+'/priority',this.options);
    }
}