import React from 'react';
import { PiView } from './pi-view';
import { CollectionContext } from './context';
import { OnFeatureDropType } from '/imports/api/types';

export { PiViewRow };

interface PiViewRowPropTypes {
  pis: string[];
  projectName: string;
  onFeatureDropped: OnFeatureDropType;
}

const PiViewRow = React.forwardRef((props: PiViewRowPropTypes, ref: React.ForwardedRef<HTMLDivElement>) => {
  const context = React.useContext(CollectionContext);

  if (context) {
    const piRow = [];
    let key = 0;
    for (const pi of props.pis) {
      piRow.push(<PiView key={key++} onFeatureDropped={props.onFeatureDropped} pi={pi} project={props.projectName} />);
    }

    return (
      <div ref={ref} className={'pi-grid-container'}>
        {piRow}
      </div>
    );
  } else {
    return null;
  }
});

PiViewRow.displayName = 'PiViewRow';
