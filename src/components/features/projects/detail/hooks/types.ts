import type { ProjectDetail } from '@/types/project';

export interface ProjectDetailState {
  project: ProjectDetail | null;
  content: any | null;
  loading: boolean;
  error: Error | null;
}

export interface UseProjectDetailReturn extends ProjectDetailState {
  isNotFound: boolean;
}