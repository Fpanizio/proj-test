export interface Root {
  status: number
  message: string
  registros: number
  clientes: Cliente[]
}

export interface Cliente {
  nome: string
  pessoa: string
  cpf: string
  cnpj: string
  endereco: string
  bairro: string
  cep: string
  numero: string
  cidade: string
  estado: string
  email: string
  codcidade: string
  fone: string
}