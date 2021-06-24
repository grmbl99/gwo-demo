import { Meteor } from 'meteor/meteor';
import * as Collections from '/imports/api/collections';
import { UpdateType } from '/imports/api/types';

// Meteor methods, called from clients
Meteor.methods({
  MoveFeature(featureId: string, updates: UpdateType) {
    Collections.FeaturesCollection.update({ _id: featureId }, { $set: updates });
  }
});
