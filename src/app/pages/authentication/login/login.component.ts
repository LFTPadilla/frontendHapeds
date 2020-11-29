import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationBusinessService } from 'src/app/business/security/authorization-business.service';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import Swal from 'sweetalert2';

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
    if(AppEnviroment.User.UserId!=0){
      router.navigate(['planner-scrum']);
    }
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
          if(x.Success)
            this.router.navigate(['/api']);
          else
            Swal.fire({
              title: 'Error',
              text: 'Credenciales invalidas',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            });
        }
      ).catch(
        x => {
          throw x;
        }
      );
    } catch (error) {
      form.reset();
      ////console.log('Autenticación Fallida'+error);
      Swal.fire('Autenticación Fallida', error.message, 'error');
    }
    this.onAction = false;
  }

  ForgotPassword(){

    Swal.fire('Olvidó la contraseña', 'Por favor contatacte con el SCRUM-Master para la recuperación de su contraseña', 'info');

  }


  ngOnDestroy() {
  }

}
