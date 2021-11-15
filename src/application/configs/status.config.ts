import { IStatusConfig } from '@domain/configs/status.config';

export const statusConfig = {
  reviewer: {
    pending: 'pending',
    approved: 'approved',
  },
  article: {
    pending: 'pending',
  },
} as IStatusConfig;
