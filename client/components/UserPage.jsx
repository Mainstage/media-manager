import React from 'react';
import AlbumCarousel from './AlbumCarousel.jsx';
import { getMedia, getUserInfo } from '../utils/requests.js';


const renderGroups = (groups) => {
  if (groups) {
    return groups.map((group, i) =>
      <div key={i} className="albumTile"> {group.name} </div>,
    );
  }
  return null;
};

class UserPage extends React.Component {
  componentDidMount() {
    const { user, updateUser } = this.props;
    getUserInfo({ userId: user.id })
    .then((res) => {
      updateUser(res.data.albums, res.data.groups);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  renderAlbums(albums) {
    if (albums) {
      const result = albums.map((album, i) =>
        (<AlbumCarousel getMedia={getMedia} updateUser={this.props.updateUser} key={i} album={album} />),
      );
      return result;
    }
    return null;
  };

  render() {
    return (
      <div className="profileSection">
        <h2>Albums</h2>
        <div className="profileAlbums">
          {this.renderAlbums(this.props.user.albums)}
        </div>
        <h2>Groups</h2>
        <div className="profileGroups">
          {renderGroups(this.props.user.groups)}
        </div>
      </div>
    );
  }
}

export default UserPage;
