import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { TransacoesService } from "../services/transacoes.service";
import { TransacaoCreateDTO, TransacaoUpdateDTO } from "../dtos/transacoes.dto";

export class TransacoesController {
  private service = new TransacoesService();

  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = req.usuarioLogado?.id;
      if (!usuarioId) {
        res.status(401).json({ sucesso: false, mensagem: "Usuário não autenticado" });
        return;
      }

      const transacoes = await this.service.listar(usuarioId);
      res.status(200).json({ sucesso: true, mensagem: "Transações encontradas", resultado: transacoes });
    } catch (error) {
      onError(error, res);
    }
  }

  public async buscar(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = req.usuarioLogado?.id;
      if (!usuarioId) {
        res.status(401).json({ sucesso: false, mensagem: "Usuário não autenticado" });
        return;
      }

      const { id } = req.params;
      const transacao = await this.service.buscar(id, usuarioId);
      res.status(200).json({ sucesso: true, mensagem: "Transação encontrada", resultado: transacao });
    } catch (error) {
      onError(error, res);
    }
  }

  public async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = req.usuarioLogado?.id;
      if (!usuarioId) {
        res.status(401).json({ sucesso: false, mensagem: "Usuário não autenticado" });
        return;
      }

      const { tipo, valor, categoria, origem, descricao, metodoPagamento }: TransacaoCreateDTO = req.body;

      const novaTransacao = await this.service.cadastrar({
        usuarioId,
        tipo,
        valor,
        categoria,
        origem,
        descricao,
        metodoPagamento,
      });

      res.status(201).json({ sucesso: true, mensagem: "Transação cadastrada com sucesso", resultado: novaTransacao });
    } catch (error) {
      onError(error, res);
    }
  }

  public async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = req.usuarioLogado?.id;
      if (!usuarioId) {
        res.status(401).json({ sucesso: false, mensagem: "Usuário não autenticado" });
        return;
      }

      const { id } = req.params;
      const { tipo, valor, categoria, origem, descricao, metodoPagamento }: TransacaoUpdateDTO = req.body;

      const transacaoAtualizada = await this.service.atualizar({
        usuarioId,
        transacaoId: id,
        tipo,
        valor,
        categoria,
        origem,
        descricao,
        metodoPagamento,
      });

      res.status(200).json({ sucesso: true, mensagem: "Transação atualizada com sucesso", resultado: transacaoAtualizada });
    } catch (error) {
      onError(error, res);
    }
  }

  public async deletar(req: Request, res: Response): Promise<void> {
    try {
      const usuarioId = req.usuarioLogado?.id;
      if (!usuarioId) {
        res.status(401).json({ sucesso: false, mensagem: "Usuário não autenticado" });
        return;
      }

      const { id } = req.params;
      await this.service.deletar({ usuarioId, transacaoId: id });

      res.status(200).json({ sucesso: true, mensagem: "Transação deletada com sucesso" });
    } catch (error) {
      onError(error, res);
    }
  }
}
