import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthForm } from '../../../models/form/auth-form';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';

export type ControlsOf<T> =  {[K in keyof T]: FormControl<T[K] | null>}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fb = inject(FormBuilder)
  appService = inject(AppService);
  router = inject(Router);
  authForm = this.fb.group<ControlsOf<AuthForm>>({
    username: this.fb.control('',Validators.required),
    password: this.fb.control('',Validators.required),
  })

  regsiterNavigate(){
    this.router.navigate(['/auth/register']).then();
  }

  onSubmit(){
    console.log(this.authForm);

    if(this.authForm.invalid) return
    const form = this.authForm.getRawValue() as AuthForm;
    this.appService.authGenerateToken(form).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/agendar']).then();
      },error: (err) => {
        console.log(err);
      }
    })
  }

}
