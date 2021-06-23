import { Meteor } from 'meteor/meteor';
import * as Collections from '/imports/api/collections';
import { version } from '/package.json';
import '/imports/api/methods';

// Runs when the server is started
Meteor.startup(() => {
  [Collections.FeaturesCollection, Collections.ProjectsCollection].forEach((collection) => collection.remove({}));

  [
    { id: 1, name: 'item 1', pi: 'PI-1', project: 'project 1' },
    { id: 2, name: 'item 2', pi: 'PI-2', project: 'project 2' },
    { id: 3, name: 'item 3', pi: 'PI-3', project: 'project 2' },
    { id: 4, name: 'item 4', pi: 'PI-1', project: 'project 1' },
    { id: 5, name: 'item 5', pi: 'PI-4', project: 'project 3' },
    { id: 6, name: 'item 6', pi: 'PI-4', project: 'project 3' }
  ].forEach((feature) => Collections.FeaturesCollection.insert(feature));

  [{ name: 'project 1' }, { name: 'project 2' }, { name: 'project 3' }].forEach((project) =>
    Collections.ProjectsCollection.insert(project)
  );

  console.log('GWO-Demo v' + version);
});
