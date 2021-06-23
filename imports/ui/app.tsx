import React, { ReactElement } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Meteor } from 'meteor/meteor';
import { ProjectRow } from './project-row';
import { UpdateType } from '/imports/api/types';
import { CollectionContext } from './context';
import { FeaturesCollection, ProjectsCollection } from '/imports/api/collections';

export function App(): ReactElement {
  // move a feature between projects/pi's
  // (exectued using drag-and-drop)
  function moveFeature(featureId: string, pi: string, project: string) {
    const updates: UpdateType = { pi: pi };
    if (project !== '') {
      updates['project'] = project;
    }

    Meteor.call('MoveFeature', featureId, updates);
  }

  // subscribe to server collections, with useTracker for 'reactiveness'
  const features = useTracker(() => {
    Meteor.subscribe('features');
    return FeaturesCollection.find({}, { sort: { priority: 1 } }).fetch();
  });
  const projects = useTracker(() => {
    Meteor.subscribe('projects');
    return ProjectsCollection.find({}, { sort: { name: 1 } }).fetch();
  });

  const pis = ['PI-1', 'PI-2', 'PI-3', 'PI-4'];
  let menuEntryKey = 0;
  const projectsList = [];

  for (const project of projects) {
    projectsList.push(
      <ProjectRow key={menuEntryKey++} onFeatureDropped={moveFeature} pis={pis} projectName={project.name} />
    );
  }

  return (
    <div>
      <div className='main'>
        <DndProvider backend={HTML5Backend}>
          <CollectionContext.Provider value={{ features, projects }}>
            <div className='heading'>GWO Demo</div>
            {projectsList}
          </CollectionContext.Provider>
        </DndProvider>
      </div>
    </div>
  );
}
