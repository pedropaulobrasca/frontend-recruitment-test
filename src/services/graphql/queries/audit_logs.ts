import { gql, useQuery } from '@apollo/client';
import { AuditLog } from '../../../types/audit_log';

export const AUDIT_LOGS_QUERY = gql`
  query AuditLogs {
    auditLogs {
      id
      action
      occurred_at
      resource_id
      resource_type
      details
      inserted_at
      updated_at
    }
  }
`;

interface AuditLogsData {
  auditLogs: AuditLog[];
}

export const useAuditLogsQuery = () => {
  return useQuery<AuditLogsData>(AUDIT_LOGS_QUERY);
};