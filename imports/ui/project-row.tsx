import React, { ReactElement } from 'react';
import { PiCell } from './pi-cell';
import { CollectionContext } from './context';
import { OnFeatureDropType } from '/imports/api/types';

export { ProjectRow };

interface ProjectRowPropTypes {
  pis: string[];
  projectName: string;
  onFeatureDropped: OnFeatureDropType;
}

function ProjectRow(props: ProjectRowPropTypes): ReactElement | null {
  const context = React.useContext(CollectionContext);

  if (context) {
    const piCells = [];
    let key = 0;
    for (const pi of props.pis) {
      piCells.push(<PiCell key={key++} onFeatureDropped={props.onFeatureDropped} pi={pi} project={props.projectName} />);
    }

    return (
      <div className='project-header'>
        {props.projectName}
        <div className='pi-grid-container'>
          {piCells}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
