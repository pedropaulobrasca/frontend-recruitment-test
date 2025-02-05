export type AuditLog = {
  id: string;
  action: string;
  occurred_at: string;
  resource_id: string;
  resource_type: string;
  details: Record<string, any>;
  inserted_at: string;
  updated_at: string;
};