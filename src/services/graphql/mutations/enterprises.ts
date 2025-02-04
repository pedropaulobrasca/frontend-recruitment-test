import { gql, useMutation } from '@apollo/client';

const CREATE_ENTERPRISE = gql`
  mutation CreateEnterprise($name: String!, $commercial_name: String!, $cnpj: String!, $description: String!) {
    createEnterprise(name: $name, commercial_name: $commercial_name, cnpj: $cnpj, description: $description) {
      id
      name
      commercial_name
      cnpj
      description
      inserted_at
      updated_at
    }
  }
`;

const UPDATE_ENTERPRISE = gql`
  mutation UpdateEnterprise($id: ID!, $name: String!, $commercial_name: String!, $cnpj: String!, $description: String!) {
    updateEnterprise(id: $id, name: $name, commercial_name: $commercial_name, cnpj: $cnpj, description: $description) {
      id
      name
      commercial_name
      cnpj
      description
      inserted_at
      updated_at
    } 
  }
`;

const DELETE_ENTERPRISE = gql`
  mutation DeleteEnterprise($id: ID!) {
    deleteEnterprise(id: $id) {
      id
      name
      commercial_name
      cnpj
      description 
      inserted_at
      updated_at
    }
  }
`;

export function useCreateEnterpriseMutation() {
  return useMutation(CREATE_ENTERPRISE);
}

export function useUpdateEnterpriseMutation() {
  return useMutation(UPDATE_ENTERPRISE);
}

export function useDeleteEnterpriseMutation() {
  return useMutation(DELETE_ENTERPRISE);
}
