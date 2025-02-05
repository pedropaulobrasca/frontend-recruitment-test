import { z } from 'zod';

export const enterpriseSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  commercial_name: z.string()
    .min(3, 'Nome comercial deve ter pelo menos 3 caracteres')
    .max(100, 'Nome comercial deve ter no máximo 100 caracteres'),
  cnpj: z.string()
    .regex(/^\d{14}$/, 'CNPJ deve ter exatamente 14 dígitos')
    .transform((cnpj) => {
      // Formata CNPJ como XX.XXX.XXX/XXXX-XX
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }),
  description: z.string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
});
