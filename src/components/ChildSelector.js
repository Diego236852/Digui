import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import avatar1 from './../images/Settings/profile.jpeg'; // Reemplaza con la ruta correcta de la imagen
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AysDelete from './AysDelete'; // Importar AysDelete para confirmación

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Poppins:wght@700&family=Quicksand:wght@400&display=swap');

  body {
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f3e5f5;
    user-select: none;
    overflow: hidden;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3e5f5;
  padding: 20px;
`;

const Title = styled.h1`
  font-family: 'Baloo 2', sans-serif;
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const ChildCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover {
    background-color: #f3f3f3;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ChildInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChildName = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #333;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-left: 10px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 15px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  
  &:hover {
    background-color: #ff1a1a;
  }
`;

const CreateButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 15px;
  background-color: white;
  color: #333;
  border: 2px solid #333;
  border-radius: 15px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const ChildSelector = ({ onChildSelected, onCreateChild }) => {
  const { user } = useAuth0();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [childToDelete, setChildToDelete] = useState(null);

  // Realiza la consulta para obtener los hijos
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['childrenData'],
    queryFn: async () => {
      const response = await axios.get("http://3.134.98.2:3000/database/getparentschildren", {
        params: {
          email_padre: user.email, // Asegúrate de que sea dinámico según el email del padre
        },
      });
      return response.data;
    },
  });

  // Definimos la mutación para eliminar el niño
  const deleteChildMutation = useMutation({
    mutationFn: async (childId) => {
      await axios.post('http://3.134.98.2:3000/database/deletechild', {
        child_id: childId
      });
    },
    onSuccess: () => {
      refetch(); // Refresca la lista de hijos después de eliminar
    },
  });

  // Confirmar la eliminación de un niño
  const confirmDelete = (childId) => {
    setShowDeleteConfirm(true);
    setChildToDelete(childId);
  };

  // Maneja la confirmación de eliminación del niño
  const handleDeleteConfirmed = async () => {
    if (childToDelete) {
      await deleteChildMutation.mutate(childToDelete); // Llama a la mutación para eliminar
      setShowDeleteConfirm(false); // Cierra el menú de confirmación
    }
  };

  // Verifica que 'data' sea un array antes de usar .map()
  const childrenList = Array.isArray(data) ? data : [];

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Ocurrió un error: {error.message}</div>;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Digui</Title>
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
        <CreateButton onClick={onCreateChild}>Crear niño</CreateButton>
        <button onClick={onLogout}>cerrar sesion</button>
      </Container>

      {showDeleteConfirm && (
        <AysDelete
          onCancel={() => setShowDeleteConfirm(false)} // Cierra el menú sin eliminar
          onConfirm={handleDeleteConfirmed} // Confirma la eliminación
        />
      )}
    </>
  );
};

export default ChildSelector;
