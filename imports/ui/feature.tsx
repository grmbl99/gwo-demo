import React, { ReactElement } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '/imports/api/constants';
import { FeatureType } from '/imports/api/collections';

export { Feature };

interface FeaturePropTypes {
  feature: FeatureType;
}

function Feature(props: FeaturePropTypes): ReactElement {
  const feature = props.feature;

  // feature drag-and-drop logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FEATURE,
    item: { id: feature._id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));

  // truncate feature name
  const maxLength = 60;
  const trimmedName = feature.name.length > maxLength ? feature.name.substring(0, maxLength - 3) + '...' : feature.name;

  return (
    <div
      className={'feature'}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1
        // cursor: 'move'
      }}
    >
      <div className='feature-name'>{trimmedName}, {feature.project}, {feature.pi}</div>
    </div>
  );
}
