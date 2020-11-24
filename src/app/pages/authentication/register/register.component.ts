import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationBusinessService } from 'src/app/business/security/authorization-business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formDataRegister:any = new Object();
  isSubmit:boolean;
  politicsCheck =false;
  onAction = false;

  constructor(private business : AuthorizationBusinessService,
    private router: Router) {
      this.isSubmit = false;
  }


  RegisterUser(){
    this.onAction = true;

    this.business.RegisterUser(this.formDataRegister).then(x => {


        Swal.fire({
          title: "Éxito",
          text: "Se creó el usuario correctamente. Por favor inicie session.",
          type: 'success',
          confirmButtonText: 'Continuar',
          showCloseButton: false,
          showCancelButton: false
        } as any).then((confirm) => {

          if (!confirm.dismiss) {
            this.router.navigate(['/login']);
          }
        });

      }).catch(x => {
        Swal.fire({
          title: 'Error',
          text: x,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }

  ngOnInit() {
  }

}
