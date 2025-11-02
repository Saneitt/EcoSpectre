export interface User {
  id: string;
  email: string;
  settings: {
    storeImages: boolean;
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ScanContext {
  detected_labels: string;
  packaging_type: string;
  material_hints: string;
  ocr_text?: string;
  brand_text?: string;
  user_note?: string;
  image?: string;
  image_thumb?: string;
}

export interface SustainabilityScore {
  score: number;
  breakdown: {
    materials: number;
    packaging: number;
    certifications: number;
    category_baseline: number;
  };
  top_factors: Array<{
    factor: string;
    impact: 'positive' | 'negative';
    explanation: string;
  }>;
  suggestion: string;
  disposal: string;
}

export interface ScanRecord {
  id: string;
  userId: string;
  timestamp: number;
  context: ScanContext;
  score: SustainabilityScore;
  action: 'consumed' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Camera: undefined;
  Processing: { imageUri: string };
  Result: { scanRecord: ScanRecord };
  Settings: undefined;
};