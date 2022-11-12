import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  captcha : String;
  caracteres = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
  'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z', "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];



  constructor() { }

  ngOnInit(): void {
    this.getCaptcha();
  }
  getCaptcha() {
    this.captcha="";
    for(let i = 0; i < 5; i++){
      let randomCaptcha = this.caracteres[Math.floor(Math.random()*this.caracteres.length)];
      this.captcha += randomCaptcha;
    }
    console.log(this.captcha);
  }

}
