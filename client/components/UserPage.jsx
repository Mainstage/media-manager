import React from 'react';

const renderAlbums = (albums) => {
  if (albums) {
    return albums.map(album =>
      <div className="albumTile"> {album.name} </div>
    );
  }
  return null;
};
const renderGroups = (groups) => {
  if (groups) {
    return groups.map(group =>
      <div className="albumTile"> {group.name} </div>
    );
  }
  return null;
};

const UserPage = ({ user, getUserInfo, updateUser }) => {
  getUserInfo({ userId: user.id })
  .then((res) => {
    updateUser(res.albums, res.groups);
  })
  .catch((err) => {
    console.error(err);
  });
  return (
    <div>
      <div className="profileAlbums">
        {renderAlbums()}
      </div>
      <div className="profileGroups">
        {renderGroups()}
      </div>
    </div>
  );
};


export default UserPage;
