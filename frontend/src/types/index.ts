export type SubjectType = 'mathematics' | 'physics' | 'chemistry' | string;

export interface VerificationResult {
  valid: boolean;
  message: string;
}

export interface RetrievedKnowledgeItem {
  document?: string;
  text?: string;
  content?: string;
  score?: number;
  relevance?: number;
  title?: string;
  source?: string;
  [key: string]: unknown;
}

export interface ParsedProblem {
  operation?: string;
  formula?: string;
  variables?: Record<string, unknown>;
  unknown?: string;
  topic?: string;
  units?: Record<string, string>;
  [key: string]: unknown;
}

export interface SolverResultData {
  question?: string;
  problem?: ParsedProblem;
  retrieved_knowledge?: RetrievedKnowledgeItem[];
  result: string | number | Record<string, unknown>;
  verification: VerificationResult;
  explanation: string;
  [key: string]: unknown;
}

export interface SolveResponse {
  subject: SubjectType;
  question: string;
  result: SolverResultData;
}

export interface SolveRequest {
  question: string;
}

export interface ExampleQuestion {
  id: string;
  subject: 'mathematics' | 'physics' | 'chemistry';
  title: string;
  question: string;
  icon: string;
  badge: string;
}

export type LoadingStage = 
  | 'idle'
  | 'parsing'
  | 'searching'
  | 'solving'
  | 'verifying'
  | 'explaining';
