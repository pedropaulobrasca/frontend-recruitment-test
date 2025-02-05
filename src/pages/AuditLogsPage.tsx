import React from "react";
import { AuditLog } from "../types/audit_log";
import { useAuditLogsQuery } from "../services/graphql/queries/audit_logs";
import { DataTable, Column } from "../components/DataTable";
import { formatDistanceToNow } from "date-fns";

export function AuditLogsPage() {
  const [pageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data } = useAuditLogsQuery(pageSize, currentPage);
  const auditLogs: AuditLog[] = data?.auditLogs?.entries || [];
  const pageInfo = data?.auditLogs?.pageInfo;

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <DataTable
          data={auditLogs}
          columns={columns}
          pageInfo={pageInfo}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}