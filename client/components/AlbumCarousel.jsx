import React from 'react';
import Promise from 'bluebird';
const AlbumPic = prop =>
  (
    <div className="albumTile">
      <img
        role="presentation"
        className="profileAlbumPic"
        src={prop.src}
        onClick={() => { console.log('should open picture view') }}
      />
    </div>
  );

class AlbumCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: false,
    };
  }
  componentDidMount() {
    this.props.getMedia({ album_id: this.props.album.id })
      .then((media) => {
        const mediaAlbum = this.props.album;
        mediaAlbum.media = media.data;
        this.setState({ mediaAlbum });
      })
      .catch(err => console.error(err));
  }

  render() {
    const carousel = this.state.mediaAlbum;
    const firstImage = (<AlbumPic src={this.props.album.iconCover} />);
    let otherImg = [];
    if (carousel) {
      otherImg = carousel.media.map((media, i) =>
       (<AlbumPic key={i} src={media.media_ref} />),
      );
    }
    return (<div className="carousel" >{firstImage}{otherImg}</div>);
  }
}

export default AlbumCarousel;
