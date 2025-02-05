import React from 'react';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { Building2 } from 'lucide-react';
import { Enterprise } from '../types/enterprise';
import { useEnterprisesQuery, useCreateEnterpriseMutation, useUpdateEnterpriseMutation } from '../services/graphql/queries/enterprises';

export function EnterprisesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [editingEnterprise, setEditingEnterprise] = React.useState<Enterprise | null>(null);
  
  const { data, refetch } = useEnterprisesQuery();
  const enterprises: Enterprise[] = data?.enterprises || [];

  const columns: Column<Enterprise>[] = [
    { header: 'Name', accessor: (enterprise: Enterprise) => enterprise.name },
    { header: 'Commercial Name', accessor: (enterprise: Enterprise) => enterprise.commercial_name },
    { header: 'CNPJ', accessor: (enterprise: Enterprise) => enterprise.cnpj },
    {
      header: 'Description',
      accessor: (enterprise: Enterprise) => (
        <div className="max-w-xs truncate">{enterprise.description}</div>
      ),
    },
  ];

  const [createEnterprise] = useCreateEnterpriseMutation();
  const [updateEnterprise] = useUpdateEnterpriseMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enterpriseData = {
      name: formData.get('name')?.toString() || '',
      commercial_name: formData.get('commercial_name')?.toString() || '',
      cnpj: formData.get('cnpj')?.toString() || '',
      description: formData.get('description')?.toString() || '',
    };

    if (editingEnterprise) {
      try {
        await updateEnterprise({
          variables: {
            id: editingEnterprise.id,
            name: enterpriseData.name,
            commercial_name: enterpriseData.commercial_name,
            cnpj: enterpriseData.cnpj,
            description: enterpriseData.description
          }
        });
        refetch();
      } catch (error) {
        console.error('Error updating enterprise:', error);
      }
    } else {
      try {
        await createEnterprise({
          variables: {
            name: enterpriseData.name,
            commercial_name: enterpriseData.commercial_name,
            cnpj: enterpriseData.cnpj,
            description: enterpriseData.description
          }
        });
        refetch();
      } catch (error) {
        console.error('Error creating enterprise:', error);
      }
    }

    setIsCreateModalOpen(false);
    setEditingEnterprise(null);
  };

  const EnterpriseForm = ({ enterprise }: { enterprise?: Enterprise }) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={enterprise?.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="commercial_name" className="block text-sm font-medium text-gray-700">
          Commercial Name
        </label>
        <input
          type="text"
          name="commercial_name"
          id="commercial_name"
          defaultValue={enterprise?.commercial_name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
          CNPJ
        </label>
        <input
          type="text"
          name="cnpj"
          id="cnpj"
          defaultValue={enterprise?.cnpj}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          defaultValue={enterprise?.description}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => {
            setIsCreateModalOpen(false);
            setEditingEnterprise(null);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          {enterprise ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Enterprises</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Building2 className="h-5 w-5 mr-2" />
          Add Enterprise
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <DataTable
          data={enterprises}
          columns={columns}
          onRowClick={(enterprise) => setEditingEnterprise(enterprise)}
        />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Enterprise"
      >
        <EnterpriseForm />
      </Modal>

      <Modal
        isOpen={!!editingEnterprise}
        onClose={() => setEditingEnterprise(null)}
        title="Edit Enterprise"
      >
        {editingEnterprise && <EnterpriseForm enterprise={editingEnterprise} />}
      </Modal>
    </div>
  );
}