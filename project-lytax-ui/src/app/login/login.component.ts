import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginObj: any ={
    username:'',
    password:''
  }

  apiLoginObj: any ={
    username:'',
    password:''
  }

  router = inject(Router);
  http = inject(HttpClient);

  onLogin(){
    this.http.post("http://localhost:3000/auth/login",this.loginObj).subscribe((res:any) =>{
      localStorage.setItem("angular19Token",res.access_token)
      this.router.navigateByUrl("allTitles");
    },error=>{
      alert("Credenciais Invalidas")
    });
  }
}
