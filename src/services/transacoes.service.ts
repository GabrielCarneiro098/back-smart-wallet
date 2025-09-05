import { Transacao } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { HTTPError } from "../utils/http.error";
import { TransacaoCreateDTO, TransacaoUpdateDTO } from "../dtos/transacoes.dto";

export class TransacoesService {
  // Listar todas as transações do usuário
  public async listar(usuarioId: string): Promise<Transacao[]> {
    return prismaClient.transacao.findMany({
      where: { usuarioId },
      orderBy: { createdAt: "desc" },
    });
  }

  // Buscar transação específica
  public async buscar(transacaoId: string, usuarioId: string): Promise<Transacao> {
    const transacao = await prismaClient.transacao.findUnique({
      where: { id: transacaoId },
    });

    if (!transacao || transacao.usuarioId !== usuarioId) {
      throw new HTTPError(404, "Transação não encontrada ou não pertence ao usuário");
    }

    return transacao;
  }

  // Cadastrar nova transação
  public async cadastrar({
    usuarioId,
    tipo,
    valor,
    categoria,
    origem,
    descricao,
    metodoPagamento,
  }: TransacaoCreateDTO & { usuarioId: string }): Promise<Transacao> {
    if (!tipo || valor == null || !categoria) {
      throw new HTTPError(400, "Preencha todos os campos obrigatórios");
    }

    return prismaClient.transacao.create({
      data: {
        usuarioId,
        tipo,
        valor,
        categoria,
        origem,
        descricao,
        metodoPagamento,
      },
    });
  }

  // Atualizar transação existente
public async atualizar({
  usuarioId,
  transacaoId,
  tipo,
  valor,
  categoria,
  origem,
  descricao,
  metodoPagamento,
}: TransacaoUpdateDTO & { usuarioId: string; transacaoId: string }): Promise<Transacao> {
  const transacaoExistente = await prismaClient.transacao.findUnique({
    where: { id: transacaoId },
  });

  if (!transacaoExistente || transacaoExistente.usuarioId !== usuarioId) {
    throw new HTTPError(404, "Transação não encontrada ou não pertence ao usuário");
  }

  // Monta o objeto apenas com campos definidos
  const dadosParaAtualizar: Partial<TransacaoUpdateDTO> = {};
  if (tipo !== undefined) dadosParaAtualizar.tipo = tipo;
  if (valor !== undefined) dadosParaAtualizar.valor = valor;
  if (categoria !== undefined) dadosParaAtualizar.categoria = categoria;
  if (origem !== undefined) dadosParaAtualizar.origem = origem;
  if (descricao !== undefined) dadosParaAtualizar.descricao = descricao;
  if (metodoPagamento !== undefined) dadosParaAtualizar.metodoPagamento = metodoPagamento;

  return prismaClient.transacao.update({
    where: { id: transacaoId },
    data: dadosParaAtualizar,
  });
}


  // Deletar transação
  public async deletar({ usuarioId, transacaoId }: { usuarioId: string; transacaoId: string }): Promise<Transacao> {
    const transacaoExistente = await prismaClient.transacao.findUnique({
      where: { id: transacaoId },
    });

    if (!transacaoExistente || transacaoExistente.usuarioId !== usuarioId) {
      throw new HTTPError(404, "Transação não encontrada ou não pertence ao usuário");
    }

    return prismaClient.transacao.delete({
      where: { id: transacaoId },
    });
  }
}
