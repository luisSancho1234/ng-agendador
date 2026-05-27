import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { UsuarioForm } from '../../../models/form/usuario-form';

export type ControlsOf<T> = { [K in keyof T]: FormControl<T[K] | null> };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  appService = inject(AppService);
  router = inject(Router);

  registerForm = this.fb.group<ControlsOf<UsuarioForm>>({
    usuTxNome: this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    usuTxEmail: this.fb.control('', [Validators.required, Validators.email]),
    usuTxSenha: this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  loginNavigate() {
    this.router.navigate(['/auth']).then();
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    const form = this.registerForm.getRawValue() as UsuarioForm;
    // Call registration service here
    console.log(form);
  }
}
