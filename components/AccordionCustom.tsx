import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, CircularProgress, Link } from '@chakra-ui/react'

export default function AccordionCustom({ data }: { data: any }) {
  const qtdChaves = data?.clientes
  ? Object.keys(data.clientes).length
  : 0;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Accordion style={{ width: '-webkit-fill-available' }} allowToggle>
        {qtdChaves > 0  ? (
          data?.clientes?.map((item: any, index: number) => (
            <AccordionItem key={index}>
              <h2 style={{ borderColor: '##cdcdcd', marginTop: '5px', marginBottom: '5px' }}>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '40px' }}>
                      <p>{item.nome}</p>
                      <p>Cod. {item.codigo}</p>
                    </div>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '50%' }}>
                    <h2>Descrição da empresa</h2>
                    {item.cpf ? <p>CPF: {item.cpf}</p> : <p>CNPJ: {item.cnpj}</p>}
                    <p>Status do cliente: {item.status}</p>
                  </div>
                  <div style={{ width: '50%' }}>
                    <h2>Contato</h2>
                    {item.fone && <p>Telefone: {item.fone}</p>}
                    {item.email && <p>Email: {item.email}</p>}
                    {item.celular && <p>celular: {item.celular}</p>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                  <div>
                    <Link href={`/forms?codigo=${item.codigo}`}>
                      <Button colorScheme='teal' variant='solid'>
                        Editar cliente
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center' }}>
            <CircularProgress isIndeterminate color='blue.300' />
          </div>
        )}
      </Accordion>
    </div>
  )
}