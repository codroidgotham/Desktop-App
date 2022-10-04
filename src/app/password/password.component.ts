import { Component, OnInit, DoCheck, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import * as fs from 'fs'
import { Password } from '../password';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit, DoCheck {
  resPass: Password
  status: boolean
  @ViewChild('alert1')
  alertBox:ElementRef
  container:HTMLElement
  constructor() { }

  ngOnInit(): void {
    console.log("oninit")
    //this.container=this.alertBox
    console.log(this.alertBox)
  }

  ngDoCheck(): void {

  }
  
 

  readGPO() {
    let pwdContents;
    var newContents: string[] = [];
    const args = []
    fetch('../assets/group-policy.inf').then(response => response.text()).then(body => {
      pwdContents = body.split('\n').map(ele => ele.replace(" ", '')).slice(3).slice(0, 8)
      // newContents=pwdContents.map(content=>{
      //   newContents.push(content)
      //   console.log(typeof(content))
      console.log("in", pwdContents)
      pwdContents.map(
        (content) => {
          args.push(parseInt(content.split("=")[1].replace(/\x00/g,"").replace('\r')));
          //console.log("hh" + content.split("=")[1].replace(/\x00/g,"").replace('\r').length)
          
        }
      )

      console.log("final", (args[1]))
      this.container=this.alertBox.nativeElement
      this.resPass = new Password(args)
    this.resPass.MinimumPasswordLength >= 8 ? this.status = true: this.status = false;
    if (this.status) this.container.style.color='blue'
    else this.container.style.color='red'
    })






  };



  check() {
    this.readGPO()
  }
}
