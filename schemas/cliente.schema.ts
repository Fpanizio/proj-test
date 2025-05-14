import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const schema = yup.object({
    nome: yup.string().required('Nome obrigatório'),
    pessoa: yup
        .string()
        .required('Pessoa obrigatória')
        .matches(/^[12]$/, 'Apenas números são permitidos'),
    cpf: yup
        .string()
        .nullable()
        .matches(/^\d{11}$/, {
            message: 'Formato de CPF inválido',
            excludeEmptyString: true,
        }),
    cnpj: yup
        .string()
        .nullable()
        .matches(/^\d{14}$/, {
            message: 'Formato de CNPJ inválido',
            excludeEmptyString: true,
        }),
    endereco: yup.string().nullable(),
    bairro: yup.string().nullable(),
    cep: yup
        .string()
        .required('CEP obrigatório')
        .matches(/^\d{8}$/, 'Formato de CEP inválido'),
    numero: yup.string().nullable(),
    cidade: yup.string().nullable(),
    estado: yup.string().nullable(),
    email: yup
        .string()
        .email('Email inválido')
        .required('Email obrigatório'),
    codcidade: yup.string().required('Código da cidade obrigatório'),
    fone: yup
        .string()
        .required('Telefone obrigatório')
        .matches(/^\d{10,11}$/, 'Formato de telefone inválido'),
}).test(
    'cpf-or-cnpj',
    'Preencha apenas CPF ou CNPJ, não ambos',
    (values) => {
        const { cpf, cnpj } = values;
        if ((cpf && cnpj) || (!cpf && !cnpj)) {
            return false;
        }
        return true;
    }
);

// Use the schema with yupResolver
export const resolver = yupResolver(schema);