export interface TransacaoCreateDTO {
  tipo: string;
  valor: number;
  data: string;
  categoria: string;
  origem?: string;
  descricao?: string;
  metodoPagamento?: string;
}

export interface TransacaoUpdateDTO {
  tipo?: string;
  valor?: number;
  data?: string;
  categoria?: string;
  origem?: string;
  data?: Date;
  descricao?: string;
  metodoPagamento?: string;
}
