import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgendarRoutingModule } from './agendar-routing.module';
import { CriarAgendamentoComponent } from './criar-agendamento/criar-agendamento.component';
import { VerAgendamentosComponent } from './ver-agendamentos/ver-agendamentos.component';

@NgModule({
  declarations: [VerAgendamentosComponent, CriarAgendamentoComponent],
  imports: [
    CommonModule,
    AgendarRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [VerAgendamentosComponent, CriarAgendamentoComponent],
})
export class AgendarModule {}
