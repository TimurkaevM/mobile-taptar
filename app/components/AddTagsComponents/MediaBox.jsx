import React from 'react';
import { useSelector } from 'react-redux';
import MediaBoxFile from './MediaBoxFile';
import MediaBoxFiles from './MediaBoxFiles';

const MediaBox = () => {
  const files = useSelector((state) => state.files.files);

  return files.group ? <MediaBoxFiles /> : <MediaBoxFile />;
};

export default MediaBox;
