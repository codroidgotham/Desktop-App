import { Component, OnInit,DoCheck,ViewChild,ViewContainerRef,ElementRef } from '@angular/core';
import * as fs from 'fs'
import { Password } from '../password';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit,DoCheck {
  resPass:Password
  status:boolean
  @ViewChild('alert',{read:ElementRef})
  alertBox:HTMLParagraphElement

  constructor() { }
  
  ngOnInit(): void {
    

  }

  ngDoCheck(): void {
   
  }
  readGPO():number[]{
    
    const pwdContents=fs.readFileSync('../assets/group-policy.inf','utf8').split('\n').slice(3).slice(0,8)
    const args=[]
    pwdContents.map(
      (content)=>args.push( parseInt(content.split("=")[1])   )
    )
      return args
  }
  check()
  {
    this.resPass=new Password(this.readGPO())
    this.resPass.MinimumPasswordLength>=8 ? this.status=false:this.status=true;
    if (this.status)     this.alertBox.style.color='green'
    else this.alertBox.style.color='red'
  }
}
