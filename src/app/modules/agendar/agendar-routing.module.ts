import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarComponent } from './agendar.component';
import { CriarAgendamentoComponent } from './criar-agendamento/criar-agendamento.component';
import { VerAgendamentosComponent } from './ver-agendamentos/ver-agendamentos.component';

const routes: Routes = [
  {
    path: '',
    component: AgendarComponent,
    children: [
      {
        path: 'criar',
        component: CriarAgendamentoComponent,
      },
      {
        path: 'criar/:ageNrId',
        component: CriarAgendamentoComponent,
      },
      {
        path: '',
        component: VerAgendamentosComponent,
      },

    ],
  },
];

export const AgendarRoutes = RouterModule.forChild(routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarRoutingModule {}
