import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  user:User

  constructor(private userService:UserService,private formbuilder:FormBuilder,private messageService:MessageService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formbuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    console.log("gey");
    if(this.loginForm.valid){
      console.log("gey");
      this.user = Object.assign({},this.loginForm.value)
    }
    this.userService.login(this.user).subscribe(data=>{
      console.log(data);
      if(data.length>0){
        localStorage.setItem("token", "true")
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successfully'
        })
        this.router.navigate([''])
      }
      else{
        this.messageService.add({
          severity: 'error',
          summary: 'Login information is incorrect',
          detail: 'Please check your information'
        })
      }
    })
  }

}