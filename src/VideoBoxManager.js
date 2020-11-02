import React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import VideoBox from './VideoBox';

const styles = () => ({
  videoBoxManager: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
});

class VideoBoxManager extends React.Component {
  constructor(props) {
    super(props);

    this.classes = this.props.classes;

    this.videoBoxRefs = {};

    this.videoBoxes = [];

    this.state = {
      addVideoBox: false,
    };
  }

  stopStreamedVideo = (userId) => {
    this.videoBoxRefs[userId].current.stopStreamedVideo();
  }

  removeVideoBox = (userId) => {
    this.videoBoxRefs[userId].current.dismiss();
  }

  addVideoBox = (userId, videoTrack) => {
    this.videoBoxRefs[userId] = React.createRef();

    this.videoBoxes.push(<VideoBox
      ref={this.videoBoxRefs[userId]}
      userId={userId}
      videoTrack={videoTrack}
    />);

    this.setState({addVideoBox: true});
  }

  render() {
    return (
      <Container className={this.classes.videoBoxManager}>
        {
            this.state.addVideoBox ? this.videoBoxes : null
        }
      </Container>
    );
  }
}

VideoBoxManager.propTypes = {
  addVideoBox: PropTypes.func,
  removeVideoBox: PropTypes.func,
};

export default withStyles(styles)(VideoBoxManager);
