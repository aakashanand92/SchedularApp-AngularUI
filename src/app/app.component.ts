import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent {
  title = 'app';

  constructor(private http:Http,private router:Router){

  }
  sendRequest(){
    console.log("sending request");
    let interviewer:any = {name:"I2",priority:"P1",supervisor:"Supervisor1"};
    console.log(interviewer);
    this.http.post("http://localhost:8080/interviewer/",interviewer).subscribe(
      (respose) => {
        console.log(respose);
      this.router.navigate(["interviewer"]);
      },
      (error)=> console.log(error)
    );
  }
}
