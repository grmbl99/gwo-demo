import { Meteor } from 'meteor/meteor';
import * as Collections from '/imports/api/collections';
import { UpdateType } from '/imports/api/types';

// Meteor methods, called from clients
Meteor.methods({
  MoveFeature(featureId: string, updates: UpdateType) {
    //check(text, String);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    Collections.FeaturesCollection.update({ _id: featureId }, { $set: updates });
  }
});
