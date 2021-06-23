export interface OnFeatureDropType {
  (featureId: string, pi: string, project: string): void;
}

export interface UpdateType {
  pi: string;
  project?: string;
  team?: string;
}
