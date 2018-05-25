import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { Routes, RouterModule } from '@angular/router';
import { Interviewer } from './models/Interviewer';
import { HomeComponent } from './home/home.component';
import { InterviewerService } from './service/interviewerService';
import { CandidateComponent } from './candidate/candidate.component';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { CandidateService } from './service/candidateService';


import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
const appRoutes : Routes =[
  {path : "interviewer/:mode", component: InterviewerComponent },
  {path : "candidate/:mode", component: CandidateComponent },
  {path: "timeSlot/:mode", component:TimeSlotComponent},
  {path : "", component:HomeComponent},
  {path : "**", component:HomeComponent}
 ];

@NgModule({
  declarations: [
    AppComponent,
    InterviewerComponent,
    HomeComponent,
    CandidateComponent,
    TimeSlotComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
  RouterModule.forRoot(appRoutes),
  BrowserAnimationsModule,
  ToastrModule.forRoot( {timeOut: 10000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true}),
    CommonModule,
  
  ],
  providers: [RouterModule,InterviewerService,CandidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
