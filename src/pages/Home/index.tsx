import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash, FiEdit } from 'react-icons/fi';
import Header from '../../components/Header';
import api from '../../services/api';
import { Container, Card } from './style';

interface Cargo {
  id: string;
  nome: string;
  descricao: string;
}
interface Funcionario {
  id: string;
  nome: string;
  sobrenome: string;
  cargo: Cargo;
  nascimento: string;
  salario: number;
}

const Home: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    api.get('funcionarios').then(resp => {
      setFuncionarios(resp.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        {funcionarios.map(funcionario => {
          return (
            <Card key={funcionario.id}>
              <div>
                <span>{funcionario.cargo.nome}</span>
                <div>
                  <Link to="/novo-funcionario">
                    <FiEdit size={20} color="#008EF6" />
                  </Link>
                  <button type="button">
                    <FiTrash size={20} color="#F60000" />
                  </button>
                </div>
              </div>
              <ul>
                <li>{`${funcionario.nome} ${funcionario.sobrenome}`}</li>
                <li>{funcionario.nascimento}</li>
                <li>{funcionario.cargo.descricao}</li>
                <li>
                  <span>R$ {funcionario.salario}</span>
                </li>
              </ul>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default Home;
