import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeSlot } from '../models/timeSlot';
import { CandidateService } from '../service/candidateService';
import { InterviewerService } from '../service/interviewerService';
import { filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ViewContainerData } from '@angular/core/src/view';
@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.css']
})
export class TimeSlotComponent implements OnInit {
  dates:Number[];
  months:String[];
  id:Number;
  mode:String;
  dateValue:String;
  monthValue:String;
  timeSlots:TimeSlot[];
  starts:String[];
  ends:String[];
  idsAvailable:Number[];
  constructor(private router:Router,
    private route:ActivatedRoute,
    private candidateService:CandidateService,
    private interviewerService:InterviewerService,
  private toasterService:ToastrService,
  
    
) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>this.mode=params["mode"]);
    this.dates=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    this.months=["May","June"];
    this.timeSlots=[];
    this.timeSlots.push(new TimeSlot());
    this.starts=["4","5","6"];
    this.ends=["5","6","7"];
    this.idsAvailable=[];
    console.log("Mode is",this.mode);
    if(this.mode=="interviewer"){
     
      this.interviewerService.getAllInterviewers().pipe(map(response=>response.json())).subscribe(
        (interviewerArr:any[])=>{interviewerArr.forEach((x)=>{this.idsAvailable.push(x.id)})},
        ()=>{},
        ()=>{console.log("Available ids for",this.mode,this.idsAvailable);}
        
      );
      
    }else if(this.mode=="candidate"){
      this.candidateService.getAllCandidates().pipe(map(response=>response.json())).subscribe(
        (candidateArr:any[])=>{candidateArr.forEach((x)=>{this.idsAvailable.push(x.id)})},
        ()=>{},
        ()=>{console.log("Available ids for",this.mode,this.idsAvailable)}
      
      )}
}

  goHome(){
    this.router.navigate(["/"]);
  }
  submit(){
   // console.log("Id is ",this.id,"Date is ",this.dateValue,"Month is ",this.monthValue);
   if(!this.isValid()){
    this.toasterService.error('Data invalid');

    return;
   }
    this.timeSlots.forEach((timeSlot:TimeSlot)=>{timeSlot.date=timeSlot.dateNum+timeSlot.month} )
    if(this.mode=="interviewer"){
      this.interviewerService.addTimeSlotForInterviewer(this.timeSlots,this.id).subscribe(
        ()=>this.toasterService.success("Added timeSlots for Interviewer"),
        ()=>this.toasterService.error("Failed to create the timeSlots for interviewer")
        );
    }else if(this.mode=="candidate"){
      this.candidateService.addTimeSlotForCandidate(this.timeSlots,this.id).subscribe(
        ()=>this.toasterService.success("Added timeSlots for candidate"),
        ()=>this.toasterService.error("Failed to create the timeSlots for candidate ")
    );
    }
  }
  isValid():boolean{
    console.log("caaling valid")
    let result:boolean=true;
    this.timeSlots.forEach((timeSlot:TimeSlot)=>{
      result = result && timeSlot.end>timeSlot.start;
      result = result && (timeSlot.end.valueOf()-timeSlot.start.valueOf()==1);
    });
    
      console.log(result);
      return result;
 }
  addMoreRows(){
    this.timeSlots.push(new TimeSlot());
  }


}
