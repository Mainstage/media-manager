import React from 'react';
import Dropzone from 'react-dropzone';

const defaultPreview = 'assets/upload.svg';

const Filedrop = ({ filedrop, preview }) => (
  <div className="filedrop">
    <p>drop files here</p>
    <Dropzone
      onDrop={filedrop}
      multiple
      accept="image/*, video/*"
      style={{
        width: '90%',
        height: '11em',
        boxSizing: 'border-box',
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5,
        padding: '1em',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '0.5em',
        verticalAlign: 'bottom',
      }}
      activeStyle={{
        borderStyle: 'solid',
        backgroundColor: '#eee',
      }}
      rejectStyle={{
        borderStyle: 'solid',
        backgroundColor: '#ffdddd',
      }}
    >
      <img
        src={preview || defaultPreview}
        role="presentation"
      />
    </Dropzone>
  </div>
);

export default Filedrop;
