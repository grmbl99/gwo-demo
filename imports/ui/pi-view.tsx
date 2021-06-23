import React, { ReactElement } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '/imports/api/constants';
import { Feature } from './feature';
import { CollectionContext } from './context';
import { OnFeatureDropType } from '/imports/api/types';

export { PiView };

interface PiViewPropTypes {
  onFeatureDropped: OnFeatureDropType;
  pi: string;
  project: string;
}

function PiView(props: PiViewPropTypes): ReactElement | null {
  const context = React.useContext(CollectionContext);

  if (context) {
    const { features } = context;

    // feature drag and drop logic
    const [{ isOver }, drop] = useDrop(
      () => ({
        accept: ItemTypes.FEATURE,
        drop: (item: { id: string }) => {
          props.onFeatureDropped(item.id, props.pi, props.project);
        },
        collect: (monitor) => ({ isOver: monitor.isOver() })
      }),
      [props]
    );

    const featuresList = []; // list of Feature objects
    for (const feature of features) {
      if (feature.pi === props.pi && (props.project === '' || feature.project === props.project)) {
        featuresList.push(<Feature key={feature._id} feature={feature} />);
      }
    }

    return (
      <div
        className='pi-view'
        ref={drop}
        style={{
          opacity: isOver ? 0.5 : 1
        }}
      >
        <div className='pi-header'>
          {props.pi} {props.project}
        </div>
        {featuresList}
      </div>
    );
  } else {
    return null;
  }
}
