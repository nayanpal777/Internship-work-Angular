import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';
import { NgForm } from '@angular/forms';
import { AuthservicesService } from '../auth/authservices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }
  buttonDisable: boolean = true;
  constructor(private helper: HelperService, private auth: AuthservicesService, private route: Router) { }

  ngOnInit(): void {
  }

  loginVertification(form: NgForm) {
    if (form.value.username == undefined || form.value.username == "")
      alert("Please enter Username");
    else if (form.value.password == undefined || form.value.password == "")
      alert("Please enter Password");
    else {
      this.buttonDisable = false;
      this.helper.login(form.value).subscribe((res) => {
        if (res['is_success'] == true) {
          alert('login successfull');
          this.auth.SetlocalStorage("token", res['data']['token'], () => {
            alert('Token store in local storage');
            this.route.navigateByUrl('/movies');
          })
          this.buttonDisable = true;
        } else if (res['is_success'] == false) {
          alert('login fail');
          this.buttonDisable = true;
        }
        console.log(res);
      });
    }
  }

}
