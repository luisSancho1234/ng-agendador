import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { AppService } from './../../../app.service';
import { AgendamentoForm } from './../../../models/form/agendamento-form';
import { ControlsOf } from './../../auth/login/login.component';

@Component({
  selector: 'app-criar-agendamento',
  templateUrl: './criar-agendamento.component.html',
})
export class CriarAgendamentoComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  appService = inject(AppService);

  pathValue: number = 0;
  isLoading: boolean = false;

  get isEditing(): boolean {
    return this.pathValue > 0;
  }

  agendamentoForm = this.fb.group<ControlsOf<AgendamentoForm>>({
    ageTxNome: this.fb.control(null, Validators.required),
    ageDtAgenda: this.fb.control<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((value) => {
          this.pathValue = Number(value.get('ageNrId') ?? 0);
          if (this.isEditing) {
            return this.getAgendamento$();
          }
          return of(null);
        }),
      )
      .subscribe((res) => {
        if (res) {
          this.agendamentoForm.patchValue({
            ageTxNome: res.ageTxNome,
            ageDtAgenda: res.ageDtAgendamento.substring(0, 16),
          });
        }
      });
  }

  getAgendamento$() {
    return this.appService.getAgendamentoById(this.pathValue).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      }),
    );
  }

  onSubmit(): void {
    if (this.agendamentoForm.invalid) {
      return;
    }

    this.isLoading = true;

    const rawValue = this.agendamentoForm.value;

    const formData: AgendamentoForm = {
      ageTxNome: rawValue.ageTxNome!,
      ageDtAgenda: new Date(rawValue.ageDtAgenda!).toISOString(),
    };

    // Call appropriate service method based on edit/create mode
    const request$ = this.isEditing
      ? this.appService.updateAgendamento(this.pathValue, formData)
      : this.appService.createAgendamento(formData);

    request$
      .pipe(
        catchError((error) => {
          console.log(error);
          this.isLoading = false;
          return of(null);
        }),
      )
      .subscribe(() => {
        this.isLoading = false;
        this.router.navigate([
          `/agendar${this.isEditing ? `/criar/${this.pathValue}` : ''}`,
        ]);
      });
  }

  onCancel(): void {
    this.router.navigate(['/agendar']);
  }
  onDelete(): void {}

  

}
