import { BaseError } from 'viem';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof BaseError) return error.shortMessage;
  if (error instanceof Error) return error.message;
  return 'Ocurrió un error inesperado.';
};
