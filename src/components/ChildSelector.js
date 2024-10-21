import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import avatar1 from './../images/Settings/Profile.png'; // Reemplaza con la ruta correcta de la imagen
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AysDelete from './AysDelete'; // Importar AysDelete para confirmación
import { TbBackground } from 'react-icons/tb';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Poppins:wght@700&family=Quicksand:wght@400&display=swap');

  body {
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #6b21a8, #f3e5f5);
    user-select: none;
    overflow: hidden;
  }
  `;  

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 34px;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const ChildListContainer = styled.div`
  width: 100%;
  max-width: 450px;
  overflow-y: auto;
  max-height: 60vh;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  /* Estilos para el scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgb(107, 33, 168);  /* Track del scrollbar */
    border-radius: 10px;

  }

  &::-webkit-scrollbar-thumb {
    background: #6b21a8;  /* Color del pulgar del scrollbar */
    border-radius: 100px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);  /* Sombra interna */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #5a189a;
    border-radius: 20px;  /* Color cuando se hace hover en el scrollbar */
  }

  /* Estilos para otros navegadores (Firefox) */
  scrollbar-width: thin;
  scrollbar-color: #6b21a8 rgba(107, 33, 168, 0.2);
`;


const ChildCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ece7f5;
    transform: scale(1.02);
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  border: 2px solid #6b21a8;
`;

const ChildInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #6b21a8;
`;

const ChildName = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #6b21a8;
  margin: 0;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: green;
  border-radius: 50%;
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const CreateButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background-color: #6b21a8;
  color: #ffffff;
  border: none;
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #5a189a;
    transform: scale(1.05);
  }
`;

const LogoutButton = styled.button`
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 25px;
  margin-top: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e04a4a;
  }
`;

const ChildSelector = ({ onChildSelected, onCreateChild, onLogout }) => {
  const { user } = useAuth0();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [childToDelete, setChildToDelete] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['childrenData'],
    queryFn: async () => {
      const response = await axios.get("http://3.134.98.2:3000/database/getparentschildren", {
        params: {
          email_padre: user.email,
        },
      });
      return response.data;
    },
  });

  const deleteChildMutation = useMutation({
    mutationFn: async (childId) => {
      await axios.post('http://3.134.98.2:3000/database/deletechild', {
        child_id: childId,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const confirmDelete = (childId) => {
    setShowDeleteConfirm(true);
    setChildToDelete(childId);
  };

  const handleDeleteConfirmed = async () => {
    if (childToDelete) {
      await deleteChildMutation.mutate(childToDelete);
      setShowDeleteConfirm(false);
    }
  };

  const childrenList = Array.isArray(data) ? data : [];

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ocurrió un error: {error.message}</div>;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Digui</Title>
        <ChildListContainer>
          {childrenList.length > 0 ? (
            childrenList.map((kid) => (
              <ChildCard key={kid.id}>
                <div
                  onClick={() => onChildSelected(kid)}
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Avatar src={avatar1} alt={`Avatar de ${kid.Nombre}`} />
                  <ChildInfo>
                    <ChildName>{`${kid.Nombre} ${kid.Apellido}`}</ChildName>
                    <StatusIndicator />
                  </ChildInfo>
                </div>
                <DeleteButton onClick={() => confirmDelete(kid.id)}>Eliminar</DeleteButton>
              </ChildCard>
            ))
          ) : (
            <p>No hay niños disponibles</p>
          )}
        </ChildListContainer>
        <CreateButton onClick={onCreateChild}>Crear niño</CreateButton>
        <LogoutButton onClick={onLogout}>Cerrar sesión</LogoutButton>
      </Container>

      {showDeleteConfirm && (
        <AysDelete
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default ChildSelector;
