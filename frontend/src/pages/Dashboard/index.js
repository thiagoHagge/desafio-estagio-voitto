import React, { useEffect, useState } from 'react';

// components
import { Table, Button, Popup, Modal, Header, Icon, Form } from 'semantic-ui-react'

//services
import api from '../../services/api';

// styles
import { Container, InitialText } from './styles';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);
  const [modalInfos, setModalInfos] = useState(false);
  const [change, setChange] = useState(0);

  useEffect(()=>{
    async function fetchData() {
      try{
        const response = await api.get('/alunos');
        setAlunos(response.data);
      } catch {
        alert('Confira a api');
      }
    }
    fetchData();
  }, [currentInfo, modalInfos, change])
  function isACep(cep) {
    if (cep.length !== 8 && cep.length !== 9) {
      alert('Cep deve conter 8 dígitos');
      return false;
    } else {
        return true;
    }
  }
  function createValues(name, email, cep, city, state) {
    let values = {};
    if (name !== '') {
      values = {...values, "nome": name};
    }
    if(email !== '') {
      values = {...values, "email": email};
    }
    if(cep !== '') {
      values = {...values, "cep": cep};
    }
    if(city !== '') {
      values = {...values, "cidade": city};
    }
    if(state !== '') {
      values = {...values, "estado": state};
    }
    return values;
  }
    const submit = async () => {
      let city = '';
      let state;
      let isANewStudent = false;
      if (currentInfo.nome === undefined) {
        isANewStudent = true;
      }
      if(isANewStudent || cep !== ''){
        if(isACep(cep)){
          await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
              city = data.localidade;
              state = data.uf;
          });
      }
      }
       if(isANewStudent) {
        await api.post('/alunos', createValues(name, email, cep, city, state));
        setModalInfos(false);
      } else {
        await api.put(`/alunos/${currentInfo.id}` , createValues(name, email, cep, city, state));
        setModalInfos(false);
      }

  }

  const render_modal_info_alunos = () => (
    <Modal open={modalInfos} onClose={()=>{
      setModalInfos(false);
      setCurrentInfo([]);
    }} closeIcon>
    <Header content={`Editando informações de ${currentInfo.nome}`} />
    <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Nome' placeholder='Nome' value={name} onChange={event => setName(event.target.value)} />
          <Form.Input fluid label='Email' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
          <Form.Input fluid label='CEP' placeholder='CEP' value={cep} onChange={event => setCep(event.target.value)} />
        </Form.Group>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={()=>{

        setModalInfos(false);
        setCurrentInfo([]);
      }}>
        <Icon name='remove' /> Cancelar
      </Button>
      <Button color='green' onClick={() => submit()}>
        <Icon name='checkmark' /> Salvar
      </Button>
    </Modal.Actions>
  </Modal>
  )

  function open_info_alunos(data_aluno){
    console.log(data_aluno)
    setCurrentInfo(data_aluno)
    setModalInfos(true)
  }

  async function delete_aluno(aluno_id){
     await api.delete(`/alunos/${aluno_id}`);
     setChange(change+1);
  }

  function render_actions(data_aluno){
    return <center>
      <Popup
        trigger={<Button icon='edit' onClick={()=>open_info_alunos(data_aluno)} />}
        content="Editar informações"
        basic
      />
      <Popup
        trigger={<Button icon='plus' positive />}
        content="Adicionar curso para aluno"
        basic
      />
      <Popup
        trigger={<Button icon='close' negative onClick={()=>delete_aluno(data_aluno.id)} />}
        content="Excluir aluno"
        basic
      />
    </center>
  }

  function render_alunos(){
    return alunos.map((v)=><Table.Row>
      <Table.Cell>{v.id}</Table.Cell>
      <Table.Cell>{v.nome}</Table.Cell>
      <Table.Cell>{v.email}</Table.Cell>
      <Table.Cell>{v.cep}</Table.Cell>
      <Table.Cell>{render_actions(v)}</Table.Cell>
    </Table.Row>)
  }

  return (
    <Container>
      <InitialText>Administrador de alunos</InitialText>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID Aluno</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>CEP</Table.HeaderCell>
            <Table.HeaderCell>Ações</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { alunos.length > 0 ? render_alunos() : <h2>Nenhum dado registrado </h2> }
        </Table.Body>
      </Table>
      {render_modal_info_alunos()}
      <Button primary onClick={() => setModalInfos(true)}>Adicionar aluno</Button>
      <Button href="/" secondary>Ver instruções</Button>
    </Container>
  );
};

export default Dashboard;
