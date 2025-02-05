import { gql, useQuery } from '@apollo/client';

const OWNERS_QUERY = gql`
  query Owners {
    owners {
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

const OWNER_QUERY = gql`
  query Owner($id: ID!) {
    owner(id: $id) {
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

const FILTER_OWNERS_QUERY = gql`
  query FilterOwners($filters: OwnerFilter) {
    filterOwners(filters: $filters) {
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

export function useOwnersQuery() {
  return useQuery(OWNERS_QUERY);
}

export function useOwnerQuery(id: string) {
  return useQuery(OWNER_QUERY, { variables: { id } });
}

export function useFilterOwnersQuery(filters: { name?: string, document?: string, enterprise_id?: string }) {
  return useQuery(FILTER_OWNERS_QUERY, { variables: { filters } });
}

export { useCreateOwnerMutation, useUpdateOwnerMutation, useDeleteOwnerMutation } from '../mutations/owners';