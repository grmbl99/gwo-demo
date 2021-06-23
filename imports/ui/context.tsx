import React from 'react';
import { FeatureType, ProjectType } from '/imports/api/collections';

export const CollectionContext = React.createContext<collectionContextType | null>(null);

export interface collectionContextType {
  features: FeatureType[];
  projects: ProjectType[];
}
