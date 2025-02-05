import React from 'react';
import { DataTable, Column } from '../components/DataTable';
import { formatDistanceToNow } from 'date-fns';
import { AuditLog } from '../types/audit_log';
import { useAuditLogsQuery } from '../services/graphql/queries/audit_logs';

export function AuditLogsPage() {
  const { data } = useAuditLogsQuery();
  const auditLogs: AuditLog[] = data?.auditLogs || [];

  const columns: Column<AuditLog>[] = [
    {
      header: 'Time',
      accessor: (log: AuditLog) => {
        try {
          return formatDistanceToNow(new Date(log.occurred_at), { addSuffix: true });
        } catch (error) {
          console.error('Error formatting date:', error);
          return 'Invalid date';
        }
      },
      className: 'text-sm text-gray-500',
    },
    {
      header: 'Action',
      accessor: (log: AuditLog) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          {log.action}
        </span>
      ),
    },
    { header: 'Resource Type', accessor: 'resource_type' },
    {
      header: 'Details',
      accessor: (log: AuditLog) => (
        <pre className="text-sm text-gray-600 max-w-xs truncate">
          {JSON.stringify(log.details)}
        </pre>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <DataTable data={auditLogs} columns={columns} />
      </div>
    </div>
  );
}