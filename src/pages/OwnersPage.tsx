import React from 'react';
import { Column, DataTable } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { UserPlus } from 'lucide-react';
import { Owner } from '../types/owner';
import { Enterprise } from '../types/enterprise';
import { useEnterprisesQuery } from '../services/graphql/queries/enterprises';
import { useCreateOwnerMutation, useOwnersQuery, useUpdateOwnerMutation } from '../services/graphql/queries/owners';
import { ownerSchema } from '../schemas/owner.schema';
import { useZodForm } from '../hooks/useZodForm';

export function OwnersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [editingOwner, setEditingOwner] = React.useState<Owner | null>(null);

  const { data: ownerData, refetch } = useOwnersQuery();
  const { data: enterpriseData } = useEnterprisesQuery();
  const owners: Owner[] = ownerData?.owners || [];
  const enterprises: Enterprise[] = enterpriseData?.enterprises || [];

  const columns: Column<Owner>[] = [
    { header: 'Name', accessor: 'name' as keyof Owner },
    { header: 'Document', accessor: 'document' as keyof Owner },
    {
      header: 'Enterprise',
      accessor: (owner: Owner) => owner.enterprise.name
    }
  ];

  const [createOwner] = useCreateOwnerMutation();
  const [updateOwner] = useUpdateOwnerMutation();

  const OwnerForm = ({ owner }: { owner?: Owner }) => {
    const { validate, getFieldError } = useZodForm(ownerSchema);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      if (!validate(formData)) {
        return;
      }

      const ownerData = {
        name: formData.get('name')?.toString() || '',
        document: formData.get('document')?.toString() || '',
        enterprise_id: formData.get('enterprise_id')?.toString() || '',
      };

      if (editingOwner) {
        try {
          await updateOwner({
            variables: {
              id: editingOwner.id,
              name: ownerData.name,
              document: ownerData.document,
              enterprise_id: ownerData.enterprise_id
            }
          });
          refetch();
        } catch (error) {
          console.error('Error updating owner:', error);
        }
      } else {
        try {
          await createOwner({
            variables: {
              name: ownerData.name,
              document: ownerData.document,
              enterprise_id: ownerData.enterprise_id
            }
          });
          refetch();
        } catch (error) {
          console.error('Error creating owner:', error);
        }
      }

      setIsCreateModalOpen(false);
      setEditingOwner(null);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Name"
          name="name"
          id="name"
          defaultValue={owner?.name}
          required
          placeholder="Digite o nome do proprietário"
          error={getFieldError('name')}
        />

        <Input
          label="Document"
          name="document"
          id="document"
          defaultValue={owner?.document}
          required
          placeholder="Digite o CPF (somente números)"
          error={getFieldError('document')}
          maxLength={14}
          pattern="^\d{11}$|^\d{14}$"
        />

        <div className="space-y-1">
          <label htmlFor="enterprise_id" className="block text-sm font-medium text-gray-700">
            Enterprise
          </label>
          <select
            name="enterprise_id"
            id="enterprise_id"
            defaultValue={owner?.enterprise.id}
            required
            className={`w-full px-3 py-2 bg-white border rounded-lg border-gray-300 
                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     text-gray-900 transition-colors duration-200
                     ${getFieldError('enterprise_id') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          >
            <option value="">Selecione uma empresa</option>
            {enterprises.map((enterprise) => (
              <option key={enterprise.id} value={enterprise.id}>
                {enterprise.name}
              </option>
            ))}
          </select>
          {getFieldError('enterprise_id') && (
            <p className="text-sm text-red-600">{getFieldError('enterprise_id')}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setIsCreateModalOpen(false);
              setEditingOwner(null);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                     rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent 
                     rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500"
          >
            {owner ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Owners</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Owner
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <DataTable
          data={owners}
          columns={columns}
          onRowClick={(owner) => setEditingOwner(owner)}
        />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Owner"
      >
        <OwnerForm />
      </Modal>

      <Modal
        isOpen={!!editingOwner}
        onClose={() => setEditingOwner(null)}
        title="Edit Owner"
      >
        {editingOwner && <OwnerForm owner={editingOwner} />}
      </Modal>
    </div>
  );
}