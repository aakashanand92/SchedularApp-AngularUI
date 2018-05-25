import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interviewer } from '../models/Interviewer';
import { InterviewerService } from '../service/interviewerService';
import { filter, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css']
})
export class InterviewerComponent implements OnInit {
  mode:String;
  isCreate:boolean;
  isDelete:boolean;
  isUpdate:boolean;
  buttonName:String;
  interviewer:Interviewer;
  priorities:String[];
  id:Number;
  idsAvailable:Number[];
  interviewerArrServer:any[];
  constructor(private route:ActivatedRoute,
    private router:Router,
    private interviewerService:InterviewerService,
    private toasterService:ToastrService) { }

  ngOnInit() {
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
    this.interviewer= new Interviewer();
   this.idsAvailable=[];
    if(this.isDelete || this.isUpdate){
    this.interviewerService.getAllInterviewers().pipe(map(response=>response.json())).subscribe(
      (interviewerArr:any[])=>{
        this.interviewerArrServer=interviewerArr;
        interviewerArr.forEach((x)=>
        {this.idsAvailable.push(x.id)})
      },
      ()=>{},
      ()=>{console.log("Available ids for",this.mode,this.idsAvailable);}
      
    );
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
      this.interviewerService.createInterviewer(this.interviewer).subscribe(
        (response)=>{
          this.toasterService.success("Interviewer created");
        },
        (error) =>{
          this.toasterService.error("Error in creating interviewer");
        }
        );
    }else if(this.isDelete){
      this.interviewerService.deleteInterviewer(this.id).subscribe(
        ()=>{
         this.toasterService.success("Successfully Deleted");
        },
        ()=>{
        this.toasterService.error("Error in deleting interviewer");
        }

    );
    }else if(this.isUpdate){
      this.interviewerService.updateInterviewer(this.interviewer,this.id).subscribe(
        ()=>{
        this.toasterService.success("Updated interviewer");
        },
        ()=>{
        this.toasterService.error("Error in updating");
        }
    );
    }
    console.log("Interviewer created " ,this.interviewer);
  }
  idSelected(){
    console.log(this.id);
   
   let inter = this.interviewerArrServer.find((x)=>{if(x.id==this.id) return x});
   this.interviewer.name=inter.name;
   this.interviewer.priority=inter.priority;
   this.interviewer.supervisor=inter.supervisor;
   this.interviewer.supervisorContact=inter.supervisorContact;
   console.log(this.interviewerArrServer);
  }

}
