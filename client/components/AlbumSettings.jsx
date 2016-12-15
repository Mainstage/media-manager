import React from 'react';
import FileDrop from './Filedrop.jsx';
import { uploadFile } from '../utils/requests.js';

class AlbumSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
  }

  onDrop(files) {
    console.log(files);
    this.setState({ files });
  }

  upload() {
    const { files } = this.state;
    files.forEach((file) => {
      const headers = {
        'content-type': file.type || '',
        album: this.props.album,
        filename: file.name,
        type: file.type,
      };
      uploadFile(file, headers)
      .catch(console.error);
    });
  }

  render() {
    return (
      <div className="albumSettings">
        <FileDrop
          filedrop={this.onDrop}
          preview={(() => {
            if (this.state.files.length) {
              return this.state.files[0].preview;
            }
            return null;
          })()}
        />
        <button
          onClick={this.upload}
        >Upload</button>
      </div>
    );
  }
}

export default AlbumSettings;
