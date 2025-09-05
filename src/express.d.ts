declare namespace Express {
  interface Request {
    usuarioLogado: {
      id: string;
      nome: string | null;
      username: string;
      email: string;
    };
  }
}