import { z } from 'zod';

export const ownerSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  document: z.string()
    .regex(/^\d{11}$|^\d{14}$/, 'Documento deve ter exatamente 11 dígitos (CPF) ou 14 dígitos (CNPJ)')
    .transform((doc) => {
      if (doc.length === 11) {
        // Formata CPF como XXX.XXX.XXX-XX
        return doc.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
      } else {
        // Formata CNPJ como XX.XXX.XXX/XXXX-XX
        return doc.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
      }
    }),
  enterprise_id: z.string()
    .min(1, 'Empresa é obrigatória'),
});
