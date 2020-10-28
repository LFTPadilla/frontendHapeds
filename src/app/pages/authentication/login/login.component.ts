import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationBusinessService } from 'src/app/business/security/authorization-business.service';

export class FormInput {
  userLogin: any;
  password: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formInput: FormInput;
  form: any;
  public isSubmit: boolean;
  public onAction: boolean = false;

  constructor(private business : AuthorizationBusinessService,
    private router: Router) {
      this.isSubmit = false;

  }

  ngOnInit() {
    this.formInput = {
      userLogin: '',
      password: ''
    };
  }

  public async Authenticate(form){
    try
    {

      if (!form.valid) {
        this.isSubmit = true;
        return;
      }
      this.onAction = true;
      await this.business.CreateSession(form.value.userLogin, form.value.password).then(
        x => {
          if(!x.Active) //redirecciona a cambio de password
            this.router.navigate(['/auth/changePassword']);
          else  //Redirecciona a menú
            this.router.navigate(['/api/']);
        }
      ).catch(
        x => {
          throw x;
        }
      );
    } catch (error) {
      form.reset();
      console.log('Autenticación Fallida'+error);
      //Swal.fire('Autenticación Fallida', error.message, 'error');
    }
    this.onAction = false;
  }

  ngOnDestroy() {
  }

}
