import { Injectable } from "@angular/core";
import {  Http ,Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { Candidate } from "../models/candidate";
import { TimeSlot } from "../models/timeSlot";
import { Observable } from "rxjs";

@Injectable()
export class CandidateService{

    private CANDIDATE_URL:String="http://localhost:8080/candidate";
    headers: Headers;
    options: RequestOptions;

constructor(private http:Http){
    this.headers = new Headers({ 'Content-Type': 'application/json' });
 
    this.options = new RequestOptions({ headers: this.headers });

}

createCandidate(candidate:Candidate){
return this.http.post(this.CANDIDATE_URL+"/",candidate)
}
addTimeSlotForCandidate(timeSlots:TimeSlot[],id:Number){
return this.http.put(this.CANDIDATE_URL+"/" + id.toString()+"/timeSlots/add",timeSlots,this.options)
}

deleteCandidate(id:Number){
    console.log(this.CANDIDATE_URL+"/"+id+"/delete");
 return  this.http.delete(this.CANDIDATE_URL+"/"+id+"/delete",this.options);
}

updateCandidate(candidate:Candidate, id:Number){
   return this.http.put(this.CANDIDATE_URL+'/'+id.toString()+'/update',candidate)
}
getAllCandidates()
{
  return  this.http.get(this.CANDIDATE_URL+"/",this.options);
}

}