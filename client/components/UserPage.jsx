import React from 'react';


const renderAlbums = (albums) => {
  if (albums) {
    return albums.map((album, i) =>
      <div key={i} className="albumTile">
        <img 
          role="presentation"
          className="profileAlbumPic"
          src={album.iconCover}
          onClick={() => { console.log('should open picture view') }}
        />
      </div>,
    );
  }
  return null;
};

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
    const { user, getUserInfo, updateUser } = this.props;
    getUserInfo({ userId: user.id })
    .then((res) => {
      console.log(res.data.albums)
      updateUser(res.data.albums, res.data.groups);
    })
    .catch((err) => {
      console.error(err);
    });
  }


  render() {
    return (
      <div className="profileSection">
        <h2>Albums</h2>
        <div className="profileAlbums">
          {renderAlbums(this.props.user.albums)}
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
