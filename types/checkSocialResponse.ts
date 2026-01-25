// Variables matching the $ args in your GQL string
export interface CheckSocialVariables {
  providerId: string;
  email: string;
  isManuallyEntered: boolean;
  token: string;
}

// The inner data object
export interface CheckSocialDataContent {
  actionRequired: string | null; // Adjust type based on your schema (e.g., string or enum)
}

// The full response structure
export interface CheckSocialResponse {
  checkSocialProviderStatus: {
    code: number;
    success: boolean;
    message: string;
    data: CheckSocialDataContent | null;
  };
}
