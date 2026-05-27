export interface AgendamentoDto {
  ageTxNome: string;
  ageNrId: number;
  ageDtAgendamento: string;
  ageTxStatus: AgendamentoStatusEnum;
}

export enum AgendamentoStatusEnum {
  PENDENTE= "PENDENTE",
  PROCESSANDO= "PROCESSANDO",
  CONCLUIDO= "CONCLUIDO",
  CANCELADO= "CANCELADO",
  ERRO= "ERRO"
}
