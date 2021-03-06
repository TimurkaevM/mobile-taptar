import React from 'react';
import MediaBoxFile from './MediaBoxFile';
import MediaBoxFiles from './MediaBoxFiles';

const MediaBox = ({ item }) => {
  return item.group_uid ? (
    <MediaBoxFiles media={item} />
  ) : (
    <MediaBoxFile item={item} />
  );
};

export default MediaBox;
