import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export interface FeatureType {
  _id: string;
  id: number;
  name: string;
  pi: string;
  project: string;
}

export interface ProjectType {
  _id: string;
  name: string;
}

export const FeaturesCollection = new Mongo.Collection<FeatureType>('features');
export const ProjectsCollection = new Mongo.Collection<ProjectType>('projects');

if (Meteor.isServer) {
  Meteor.publish('features', function publishFeatures() {
    return FeaturesCollection.find();
  });
  Meteor.publish('projects', function publishProjects() {
    return ProjectsCollection.find();
  });
}
