import { IStatusConfig } from '@domain/configs/status.config';

export const statusConfig = {
  reviewer: {
    pending: 'PENDING',
    approved: 'APPROVED',
  },
  article: {
    pending: 'PENDING',
    approved: 'APPROVED',
  },
} as IStatusConfig;
