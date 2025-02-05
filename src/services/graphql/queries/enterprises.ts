import { gql, useQuery } from '@apollo/client';

const ENTERPRISES_QUERY = gql`
  query Enterprises($pageSize: Int!, $pageNumber: Int!) {
    enterprises(pageSize: $pageSize, pageNumber: $pageNumber) {
      entries {
        id
        name
        commercial_name
        cnpj
        description
        inserted_at
        updated_at
      }
      pageInfo {
        pageSize
        pageNumber
        totalEntries
        totalPages
      }
    }
  }
`;

const ENTERPRISE_QUERY = gql`
  query Enterprise($id: ID!) {
    enterprise(id: $id) {
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

const FILTER_ENTERPRISES_QUERY = gql`
  query FilterEnterprises($filters: EnterpriseFilter) {
    filterEnterprises(filters: $filters) {
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

export function useEnterprisesQuery(pageSize: number = 10, pageNumber: number = 1) {
  return useQuery(ENTERPRISES_QUERY, {
    variables: {
      pageSize,
      pageNumber
    },
    fetchPolicy: 'network-only'
  });
}

export function useEnterpriseQuery(id: string) {
  return useQuery(ENTERPRISE_QUERY, { variables: { id } });
}

export function useFilterEnterprisesQuery(filters: { name?: string, commercial_name?: string, cnpj?: string, description?: string }) {
  return useQuery(FILTER_ENTERPRISES_QUERY, { variables: { filters } });
}

export { useCreateEnterpriseMutation, useUpdateEnterpriseMutation, useDeleteEnterpriseMutation } from '../mutations/enterprises';