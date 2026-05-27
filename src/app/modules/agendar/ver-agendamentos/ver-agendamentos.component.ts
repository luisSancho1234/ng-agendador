import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AgendamentoDto } from '../../../models/dto/agendamento-dto';
import { IPage } from '../../../models/pagination/page';
import { AppService } from './../../../app.service';
import { AgendamentoStatusEnum } from './../../../models/dto/agendamento-dto';

@Component({
  selector: 'app-ver-agendamentos',
  templateUrl: './ver-agendamentos.component.html',
})
export class VerAgendamentosComponent implements OnInit {
  appService = inject(AppService);
  router = inject(Router);
  agendamentosEmpty: boolean = true;
  agendamentos: AgendamentoDto[] = [];
  pageData: IPage<AgendamentoDto> | null = null;

  AgendamentoStatusEnum = AgendamentoStatusEnum;

  public agendamentoFilter$ = new BehaviorSubject<{
    status: AgendamentoStatusEnum | null;
    pageable: { page: number; size: number };
  }>({
    status: null,
    pageable: {
      page: 0,
      size: 9,
    },
  });

  public ordemStatus: Record<string, number> = {
    PENDENTE: 1,
    PROCESSANDO: 2,
    ERRO: 3,
    CONCLUIDO: 4,
  };

  agendamentos$: Observable<AgendamentoDto[]> = this.agendamentoFilter$.pipe(
    switchMap((filter) =>
      this.appService.getAgendamentos(filter.status, filter.pageable),
    ),
    map((response: IPage<AgendamentoDto>) => {
      this.agendamentosEmpty = response.empty ?? true;
      this.pageData = response;
      const sorted = response.content!.sort(
        (a, b) =>
          this.ordemStatus[a.ageTxStatus] - this.ordemStatus[b.ageTxStatus],
      );
      return sorted;
    }),
    map((response) => {
      this.agendamentos = response;
      return response;
    }),
  );

  ngOnInit(): void {
    // Initialize with page 0
  }

  ordenarStatus = (
    a: { key: string; value: AgendamentoStatusEnum },
    b: { key: string; value: AgendamentoStatusEnum },
  ): number => {
    return this.ordemStatus[a.key] - this.ordemStatus[b.key];
  };

  onPageChange(page: number): void {
    const value = this.agendamentoFilter$.value;
    value.pageable.page = page;
    this.agendamentoFilter$.next(value);
  }
  onStatusChange(status: AgendamentoStatusEnum): void {
    const value = this.agendamentoFilter$.value;
    if(value.status == status){
      value.status = null;
    }else{
      value.status = status;
    }
    this.agendamentoFilter$.next(value);
  }

  get currentPage(): number {
    return this.agendamentoFilter$.value.pageable.page;
  }

  get totalPages(): number {
    return this.pageData?.totalPages ?? 0;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  get hasPrevPage(): boolean {
    return this.currentPage > 0;
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.hasPrevPage) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.onPageChange(page);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const totalPages = this.totalPages;
    const maxPagesToShow = 5;

    let startPage = Math.max(
      0,
      this.currentPage - Math.floor(maxPagesToShow / 2),
    );
    let endPage = Math.min(totalPages, startPage + maxPagesToShow);

    if (endPage - startPage < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow);
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  abrirAgendamento(ageNrId: number) {
    this.router.navigate([`/agendar/criar/${ageNrId}`]).then();
  }
  criarAgendamento() {
    this.router.navigate([`/agendar/criar`]).then();
  }

  getRingStyle(status: AgendamentoStatusEnum): string {
    let str = '';
    switch (status) {
        case AgendamentoStatusEnum.PENDENTE:
          str = 'ring ring-yellow-300 ';
          break;
        case AgendamentoStatusEnum.PROCESSANDO:
          str = 'ring ring-blue-300 ';
          break;
        case AgendamentoStatusEnum.CONCLUIDO:
          str = 'ring ring-green-300 ';
          break;
        case AgendamentoStatusEnum.CANCELADO:
          str = 'ring ring-amber-300 ';
          break;
        case AgendamentoStatusEnum.ERRO:
          str = 'ring ring-red-300 ';
          break;
        default:
          str = '';
          break;
        }
    return str
  }

  getBadgeStatusClass(status: AgendamentoStatusEnum, border?: boolean): string {
    let str: string = '';
    if (!border) {
      switch (status) {
        case AgendamentoStatusEnum.PENDENTE:
          str = 'bg-yellow-100 text-yellow-800';
          break;
        case AgendamentoStatusEnum.PROCESSANDO:
          str = 'bg-blue-100 text-blue-800';
          break;
        case AgendamentoStatusEnum.CONCLUIDO:
          str = 'bg-green-100 text-green-800';
          break;
        case AgendamentoStatusEnum.CANCELADO:
          str = 'bg-amber-100 text-amber-800';
          break;
        case AgendamentoStatusEnum.ERRO:
          str = 'bg-red-100 text-red-800';
          break;
        default:
          str = '';
          break;
      }
    } else {
      switch (status) {
        case AgendamentoStatusEnum.PENDENTE:
          str = 'border-yellow-100 border-2 text-yellow-100';
          break;
        case AgendamentoStatusEnum.PROCESSANDO:
          str = 'border-blue-100 border-2 text-blue-800';
          break;
        case AgendamentoStatusEnum.CONCLUIDO:
          str = 'border-green-100 border-2 text-green-800';
          break;
        case AgendamentoStatusEnum.CANCELADO:
          str = 'border-amber-100 border-2 text-amber-800';
          break;
        case AgendamentoStatusEnum.ERRO:
          str = 'border-red-100 border-2 text-red-800';
          break;
        default:
          str = '';
          break;
      }
    }
    return str;
  }
  getTextStatusClass(status: AgendamentoStatusEnum): string {
    switch (status) {
      case AgendamentoStatusEnum.PENDENTE:
        return 'text-yellow-500';
      case AgendamentoStatusEnum.PROCESSANDO:
        return 'text-blue-500';
      case AgendamentoStatusEnum.CONCLUIDO:
        return 'text-green-500';
      case AgendamentoStatusEnum.CANCELADO:
        return 'text-amber-500';
      case AgendamentoStatusEnum.ERRO:
        return 'text-red-500';
      default:
        return '';
    }
  }

  getCount(type: AgendamentoStatusEnum) {
    return this.agendamentos.filter(
      (agendamento) => agendamento.ageTxStatus === type,
    ).length;
  }

  trackByAgeNrId(index: number, agendamento: AgendamentoDto) {
    return agendamento.ageNrId;
  }
}
