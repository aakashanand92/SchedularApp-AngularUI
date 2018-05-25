import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewerService } from '../service/interviewerService';
import { filter, map } from 'rxjs/operators';
import { CandidateService } from '../service/candidateService';

import { pipe } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  output:any;
  listOfInterviews:any[];
  showInterviews:boolean;
  interviewerArr:any[];
  candidateArr:any[];
  constructor(private router:Router,private interviewerService:InterviewerService,private candidateService:CandidateService) { }

  ngOnInit() {

    
  }

  createInterviewer(){
   // console.log("calling create flow for interviewer");
    this.router.navigate(["interviewer","create"]);
  }

  updateInterviewer(){
   // console.log("calling update flow for interviewer");
    this.router.navigate(["interviewer","update"],);
  }
  deleteInterviewer(){
   // console.log("calling delete flow for interviewer");
    this.router.navigate(["interviewer","delete"],);

  }

  createCandidate(){
    // console.log("calling create flow for interviewer");
     this.router.navigate(["candidate","create"]);
   }
 
   updateCandidate(){
    // console.log("calling update flow for interviewer");
     this.router.navigate(["candidate","update"],);
   }
   deleteCandidate(){
    // console.log("calling delete flow for interviewer");
     this.router.navigate(["candidate","delete"],);
 
   }

   addTimeSlotForInterviewer(){
     this.router.navigate(["timeSlot","interviewer"]);
   }

   addTimeSlotForCandidate(){
    this.router.navigate(["timeSlot","candidate"]);
  }
  schedule(){

    this.interviewerService.getAllInterviewers().subscribe(
      (response)=>{this.interviewerArr = response.json()},
      ()=>{}

    );

    this.candidateService.getAllCandidates().subscribe(
      (response)=>{this.candidateArr = response.json()},
      ()=>{}

    );
   
    this.interviewerService.schedule().pipe(map(x=>x.json())).subscribe(
      (y:any[])=>{
        if(y.length==0){
          this.output="No Matches"
        }else
        this.listOfInterviews=y;
       this.showInterviews=true;
       console.log("Interviews list",this.listOfInterviews);
      },
      (y)=>console.log(y),
    );
    
  }


  getInterviewerName(id){
    return this.interviewerArr.find((x)=>{if(x.id==id) return x;}).name;
  }

  getCandidateName(id){
    return this.candidateArr.find((x)=>{if(x.id==id) return x;}).name;
  }


}
