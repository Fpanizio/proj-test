import { useMutation, useQuery } from "@tanstack/react-query"
import { useServiceClientes } from "../service/clientes";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    ButtonGroup,
    CircularProgress,
    FormErrorMessage,
    useToast,
    HStack,
} from '@chakra-ui/react'
import { useForm, useWatch } from "react-hook-form";
import { resolver } from "../schemas/cliente.schema";

export default function Forms() {
    const toast = useToast();
    const router = useRouter();
    const { codigo } = router.query; // aqui vem "2274"
    const { getOneCliente, putCliente, postCliente } = useServiceClientes();


    const isEditMode = Boolean(codigo); // Verifica se está no modo de edição

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver,
        defaultValues: {
            nome: '',
            email: '',
            cpf: '',
            cnpj: '',
            endereco: '',
            bairro: '',
            cep: '',
            numero: '',
            cidade: '',
            estado: '',
            codcidade: '',
            fone: '',
            pessoa: '',
        }
    });

    const cpfValue = watch('cpf');
    const cnpjValue = watch('cnpj');

    const { isLoading, error, data } = useQuery({
        queryKey: ['getDataId'],
        queryFn: () => {
            if (isEditMode && typeof codigo === 'string') {
                return getOneCliente([codigo]);
            }
            return Promise.reject(new Error("Invalid codigo format"));
        },
        enabled: isEditMode, // Só faz a query se estiver no modo de edição
    });

    const mutation = useMutation({
        mutationFn: async (formData: any) => {
            if (isEditMode && typeof codigo === 'string') {
                return await putCliente(formData); // Atualiza cliente no modo de edição
            } else {
                return await postCliente(formData); // Cria novo cliente no modo de criação
            }
        },
        onSuccess: () => {
            toast({
                title: isEditMode ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: false,
            });
            router.push('/');
        },
        onError: (error: any) => {
            toast({
                title: "Erro ao salvar os dados.",
                description: error.message || "Ocorreu um erro inesperado.",
                status: "error",
                duration: 3000,
                isClosable: false,
            });
        },
    });

    useEffect(() => {
        if (isEditMode && data && data.clientes) {
            reset({
                nome: data.clientes.nome,
                pessoa: data.clientes.pessoa,
                cpf: data.clientes.cpf,
                cnpj: data.clientes.cnpj,
                endereco: data.clientes.endereco,
                bairro: data.clientes.bairro,
                cep: data.clientes.cep,
                numero: data.clientes.numero,
                cidade: data.clientes.cidade,
                estado: data.clientes.estado,
                email: data.clientes.email,
                codcidade: data.clientes.codcidade,
                fone: data.clientes.fone,
            });
        }
    }, [isEditMode, data, reset]);

    useEffect(() => {
        if (cpfValue) {
            setValue('pessoa', '1');
        } else if (cnpjValue) {
            setValue('pessoa', '2');
        } else {
            setValue('pessoa', '');
        }
    }, [cpfValue, cnpjValue, setValue]);

    const handleCancel = () => {
        router.push('/');
    };

    const onSubmit = (formData: any) => {
        const updatedData = isEditMode ? { ...data?.clientes, ...formData } : formData;
        mutation.mutate(updatedData);
    };

    if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
        <CircularProgress isIndeterminate color='green.300' />
    </div>;
    if (error) return <p>Erro ao carregar dados.</p>;

    return (
        <main className={styles.main}>
            <div className="container">
                <h1 className="container__title">{isEditMode ? `Informações sobre o cliente #${codigo}` : 'Cadastrar novo cliente'}</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={!!errors.nome} mb={4} className="form">
                        <FormLabel>Nome</FormLabel>
                        <Input id="nome" {...register('nome')} placeholder="Nome" />
                        <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
                    </FormControl>


                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FormControl isInvalid={!!errors.cpf} mb={4} className="form">
                            <FormLabel>CPF</FormLabel>
                            <Input id="cpf" {...register('cpf')} placeholder="CPF" />
                            <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.cnpj} mb={4} className="form">
                            <FormLabel>CNPJ</FormLabel>
                            <Input id="cnpj" {...register('cnpj')} placeholder="CNPJ" />
                            <FormErrorMessage>{errors.cnpj?.message}</FormErrorMessage>
                        </FormControl>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FormControl isInvalid={!!errors.endereco} mb={4} className="form">
                            <FormLabel>Endereço</FormLabel>
                            <Input id="endereco" {...register('endereco')} placeholder="Endereço" />
                            <FormErrorMessage>{errors.endereco?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.bairro} mb={4} className="form">
                            <FormLabel>Bairro</FormLabel>
                            <Input id="bairro" {...register('bairro')} placeholder="Bairro" />
                            <FormErrorMessage>{errors.bairro?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.cep} mb={4} className="form">
                            <FormLabel>CEP</FormLabel>
                            <Input id="cep" {...register('cep')} placeholder="CEP" />
                            <FormErrorMessage>{errors.cep?.message}</FormErrorMessage>
                        </FormControl>
                    </div>

                    <HStack spacing={4} mb={4}>
                        <FormControl isInvalid={!!errors.numero} mb={4} className="form">
                            <FormLabel>Número</FormLabel>
                            <Input id="numero" {...register('numero')} placeholder="Número" />
                            <FormErrorMessage>{errors.numero?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.cidade} mb={4} className="form">
                            <FormLabel>Cidade</FormLabel>
                            <Input id="cidade" {...register('cidade')} placeholder="Cidade" />
                            <FormErrorMessage>{errors.cidade?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.estado} mb={4} className="form">
                            <FormLabel>Estado</FormLabel>
                            <Input id="estado" {...register('estado')} placeholder="Estado" />
                            <FormErrorMessage>{errors.estado?.message}</FormErrorMessage>
                        </FormControl>
                    </HStack >


                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FormControl isInvalid={!!errors.email} mb={4} className="form">
                            <FormLabel>Email</FormLabel>
                            <Input id="email" {...register('email')} placeholder="Email" />
                            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors.fone} mb={4} className="form">
                            <FormLabel>Telefone</FormLabel>
                            <Input id="fone" {...register('fone')} placeholder="Telefone" />
                            <FormErrorMessage>{errors.fone?.message}</FormErrorMessage>
                        </FormControl>
                    </div>

                    <FormControl isInvalid={!!errors.codcidade} mb={4} className="form">
                        <FormLabel>Código da Cidade</FormLabel>
                        <Input id="codcidade" {...register('codcidade')} placeholder="Código da Cidade" />
                        <FormErrorMessage>{errors.codcidade?.message}</FormErrorMessage>
                    </FormControl>


                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <ButtonGroup variant='outline' spacing='6'>
                            <Button colorScheme='teal' type="submit" isLoading={isSubmitting}>Salvar</Button>
                            <Button onClick={handleCancel}>Cancelar</Button>
                        </ButtonGroup>
                    </div>
                </form>
            </div>
        </main>
    )
}