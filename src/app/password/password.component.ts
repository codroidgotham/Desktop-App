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
hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }

 utf8(text) {
  var surrogate = encodeURIComponent(text);
  var result = '';
  for (var i = 0; i < surrogate.length;) {
      var character = surrogate[i];
  i += 1;
      if (character == '%') {
        var hex = surrogate.substring(i, i += 2);
    if (hex) {
      result += String.fromCharCode(parseInt(hex, 16));
    }
      } else {
        result += character;
      }
  }
  return result;
};

  readGPO():any{
    let pwdContents;
    var newContents:string[]=[];
    const args=[]
    fetch('../assets/group-policy.inf').then(response=>response.text()).then(body=>{
      pwdContents=body.split('\n').map(ele=>ele.replace(" ",'')).slice(3).slice(0,8)
      // newContents=pwdContents.map(content=>{
      //   newContents.push(content)
      //   console.log(typeof(content))
      console.log("in",pwdContents)
      pwdContents.map(
        (content)=>{
          args.push( parseInt(content.split("=")[1].replace(" ",'')));
        console.log("hh"+(content.split("=")[1].trim()
        )
        )
      } 
          )
      
      console.log("final",args)
      return args;
      })
      
      
      
     
        
    
    };
    
    
  
  check()
  {
    this.resPass=new Password(this.readGPO())
    this.resPass.MinimumPasswordLength>=8 ? this.status=false:this.status=true;
    if (this.status)     this.alertBox.style.color='green'
    else this.alertBox.style.color='red'
  }
}
