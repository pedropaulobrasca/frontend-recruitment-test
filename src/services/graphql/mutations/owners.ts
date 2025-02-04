import { gql, useMutation } from '@apollo/client';

const CREATE_OWNER = gql`
  mutation CreateOwner($name: String!, $document: String!, $enterprise_id: ID!) {
    createOwner(name: $name, document: $document, enterprise_id: $enterprise_id) {
      id
      name
      document
      enterprise {
        id
        name
      }
      inserted_at
      updated_at
    }
  }
`;

const UPDATE_OWNER = gql`
  mutation UpdateOwner($id: ID!, $name: String!, $document: String!, $enterprise_id: ID!) {
    updateOwner(id: $id, name: $name, document: $document, enterprise_id: $enterprise_id) {
      id
      name
      document
      enterprise {
        id
        name
      }
      inserted_at
      updated_at
    } 
  }
`;

const DELETE_OWNER = gql`
  mutation DeleteOwner($id: ID!) {
    deleteOwner(id: $id) {
      id
      name
      document
      enterprise {
        id
        name
      }
      inserted_at
      updated_at
    }
  }
`;

export function useCreateOwnerMutation() {
  return useMutation(CREATE_OWNER);
}

export function useUpdateOwnerMutation() {
  return useMutation(UPDATE_OWNER);
}

export function useDeleteOwnerMutation() {
  return useMutation(DELETE_OWNER);
}
