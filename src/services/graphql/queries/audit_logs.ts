import { gql, useQuery } from '@apollo/client';
import { AuditLog } from '../../../types/audit_log';

export const AUDIT_LOGS_QUERY = gql`
  query AuditLogs($pageSize: Int!, $pageNumber: Int!) {
    auditLogs(pageSize: $pageSize, pageNumber: $pageNumber) {
      entries {
        id
        action
        occurred_at
        resource_id
        resource_type
        details
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

export const useAuditLogsQuery = (pageSize: number = 10, pageNumber: number = 1) => {
  return useQuery(AUDIT_LOGS_QUERY, {
    variables: {
      pageSize,
      pageNumber
    }
  });
};