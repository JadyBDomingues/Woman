export interface Agendamento{
    nomeCliente: string,
    enderecoCliente: string,
    emailCliente: string,
    modeloServico: string,   /*no caso ele coloca modeloCarro carro.nome */
    precoTotal: number,
    confirmado: boolean,
    enviado: boolean,
    data: string
}