import { Component, OnInit } from '@angular/core';
import { Candidate } from '../models/candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../service/candidateService';
import { filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { InterviewerService } from '../service/interviewerService';
@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  mode:String;
  isCreate:boolean;
  isDelete:boolean;
  isUpdate:boolean;
  buttonName:String;
  candidate:Candidate;
  priorities:String[];
  id:Number;
  idsAvailable:Number[];
  candidateArrServer:any[];
  constructor(private route:ActivatedRoute,
    private router:Router,private candidateService:CandidateService,
    private interviewerService:InterviewerService,
  private toasterService:ToastrService) { }

  ngOnInit() {

    this.idsAvailable=[]
    this.route.params.subscribe(
      
      (params)=>{
        console.log("Value in params is - " + params['mode']);
        this.mode=params['mode']
      }   
      )
    if(this.mode=="create"){
      this.isCreate = true;
      this.buttonName="Create";
    }else if(this.mode=="delete"){
      this.isDelete=true;
      this.buttonName="Delete";
    }else if (this.mode=="update"){
      this.isUpdate=true;
      this.buttonName="Update";
    }

    console.log("Mode is " + this.mode);
    this.candidate= new Candidate();
    if(this.isDelete || this.isUpdate){
      this.candidateService.getAllCandidates().pipe(map(response=>response.json())).subscribe(
        (candidateArr:any[])=>{
          this.candidateArrServer=candidateArr;
          candidateArr.forEach((x)=>{
            this.idsAvailable.push(x.id)
          })
      },
        ()=>{},
        ()=>{console.log("Available ids for",this.mode,this.idsAvailable)}
      
      )
    }
    this.interviewerService.getPriorityList().subscribe(
      (response)=>this.priorities=response.json(),
      ()=>console.log("Cant fetch priority list from server")
    );
  }

  goToHome(){
this.router.navigate(["/"]);
  }

  performAction(){
    if(this.isCreate){
      this.candidateService.createCandidate(this.candidate).subscribe(
        (response)=>this.toasterService.success("Successfully created candidate"),
        (error)=>this.toasterService.error("Error in creating candidate")
     );
    }else if(this.isDelete){
    this.candidateService.deleteCandidate(this.id).subscribe(
      ()=>this.toasterService.success("Successfully deleted candidate"),
      ()=>this.toasterService.error("Error in deleting candidate")
      

  );
    }else if(this.isUpdate){
      this.candidateService.updateCandidate(this.candidate,this.id).subscribe(
        ()=>this.toasterService.success("Candidate Updated succesfully"),
        ()=>this.toasterService.error("Error in updating candidate")

    );
    }
  
  }
  idSelected(){
    console.log(this.id);
   
   let cand = this.candidateArrServer.find((x)=>{if(x.id==this.id) return x});
   this.candidate.name=cand.name;
   this.candidate.priority=cand.priority;
   this.candidate.email=cand.email;
   this.candidate.phoneNo=cand.phoneNo;
   console.log(this.candidateArrServer);
  }
}
