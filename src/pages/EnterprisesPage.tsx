import React from 'react';
import { DataTable, Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { Building2 } from 'lucide-react';
import { Enterprise } from '../types/enterprise';
import { useEnterprisesQuery, useCreateEnterpriseMutation, useUpdateEnterpriseMutation, useDeleteEnterpriseMutation } from '../services/graphql/queries/enterprises';
import { Input } from '../components/Input';
import { enterpriseSchema } from '../schemas/enterprise.schema';
import { useZodForm } from '../hooks/useZodForm';
import toast from 'react-hot-toast';

export function EnterprisesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [editingEnterprise, setEditingEnterprise] = React.useState<Enterprise | null>(null);
  const [pageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Busca dados das empresas da API
  const { data, refetch } = useEnterprisesQuery(pageSize, currentPage);
  const enterprises: Enterprise[] = data?.enterprises?.entries || [];
  const pageInfo = data?.enterprises?.pageInfo;

  // Configuração das colunas da tabela
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

  // Mutations para criar e atualizar empresas
  const [createEnterprise] = useCreateEnterpriseMutation();
  const [updateEnterprise] = useUpdateEnterpriseMutation();
  const [deleteEnterprise] = useDeleteEnterpriseMutation();

  // Formulario para criacao e edicao de empresas
  const EnterpriseForm = ({ enterprise }: { enterprise?: Enterprise }) => {
    const { validate, getFieldError } = useZodForm(enterpriseSchema);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      if (!validate(formData)) {
        return;
      }

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
          toast.success('Enterprise updated successfully');
        } catch (error) {
          console.error('Error updating enterprise:', error);
          toast.error('Error updating enterprise');
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
          toast.success('Enterprise created successfully');
        } catch (error) {
          console.error('Error creating enterprise:', error);
          toast.error('Error creating enterprise');
        }
      }

      setIsCreateModalOpen(false);
      setEditingEnterprise(null);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Name"
          name="name"
          id="name"
          defaultValue={enterprise?.name}
          required
          placeholder="Digite o nome da empresa"
          error={getFieldError('name')}
        />

        <Input
          label="Commercial Name"
          name="commercial_name"
          id="commercial_name"
          defaultValue={enterprise?.commercial_name}
          required
          placeholder="Digite o nome comercial"
          error={getFieldError('commercial_name')}
        />

        <Input
          label="CNPJ"
          name="cnpj"
          id="cnpj"
          defaultValue={enterprise?.cnpj}
          required
          placeholder="Digite o CNPJ (somente números)"
          error={getFieldError('cnpj')}
          maxLength={14}
          pattern="^\d{14}$"
        />

        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={enterprise?.description}
            required
            rows={3}
            className={`w-full px-3 py-2 bg-white border rounded-lg border-gray-300 
                     focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     disabled:bg-gray-100 disabled:cursor-not-allowed
                     placeholder:text-gray-400 transition-colors duration-200
                     ${getFieldError('description') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Digite a descrição da empresa"
          />
          {getFieldError('description') && (
            <p className="text-sm text-red-600">{getFieldError('description')}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setIsCreateModalOpen(false);
              setEditingEnterprise(null);
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
            {enterprise ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    );
  };

  // Configuração da paginacao
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          actions={{
            edit: (enterprise: Enterprise) => {
              setEditingEnterprise(enterprise);
              setIsCreateModalOpen(true);
            },
            delete: async (enterprise: Enterprise) => {
              if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
                try {
                  await deleteEnterprise({
                    variables: {
                      id: enterprise.id
                    }
                  });
                  refetch();
                  toast.success('Empresa excluída com sucesso');
                } catch (error) {
                  console.error('Erro ao excluir empresa:', error);
                  toast.error('Erro ao excluir empresa');
                }
              }
            }
          }}
          pageInfo={pageInfo}
          onPageChange={handlePageChange}
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