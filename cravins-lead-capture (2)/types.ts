
export type AppStatus = 'idle' | 'submitting' | 'success' | 'error' | 'already_subscribed';

export interface LeadCaptureResponse {
  status: 'success' | 'error' | 'already_subscribed';
  message?: string;
}

export interface FormState {
  email: string;
  consent: boolean;
  isSubmitting: boolean;
  status: AppStatus;
  errorMessage: string;
}
