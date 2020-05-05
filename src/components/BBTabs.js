import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import _w from 'utils/wrapActionCreators';
import * as UserActions from 'actions/user';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        padding: 0,
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class BBTabs extends React.Component {
    state = {
        userWidth: '25vw',
        imageWidth: 0,
        imageHeight: 0,
        totalCols:0,
        totalRows:0,
        overlayTop:20,
        overlayRight:0,
        overlayLeft:0
    };

    setImageSize = () => {
        const innerWidth = Math.round(window['innerWidth']);
        const innerHeight = Math.round(window['innerHeight']) - 53;

        if (this.props.user.usersInGroup.length == 0) return;

        const area = innerHeight * innerWidth;
        const singleImageArea = area / this.props.user.usersInGroup.length;

        const singleImageWidth = Math.sqrt(singleImageArea) * 1.2;
        const totalCols = Math.ceil(innerWidth / singleImageWidth);
        const imageWidth = innerWidth / totalCols;

        const totalRows = Math.ceil(this.props.user.usersInGroup.length / totalCols);
        const imageHeight = innerHeight / totalRows;

        this.setState({
            imageWidth,
            imageHeight,
            totalCols,
            totalRows
        })
    }

    interval;

    componentDidMount() {
        this.props.getBB();
        this.interval = setInterval(() => this.props.getBB(), (1000 * 60 * 5));
        this.setImageSize();
        window.addEventListener('resize', () => this.setImageSize());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.usersInGroup.length !== this.props.user.usersInGroup.length) {
            this.setImageSize();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.setImageSize());
        clearInterval(this.interval);
    }

    handleChange = (event, value) => {
        this.props.getBB(value);
    };

    showUser = idx => {
        let state = {
            showUserIdx: idx,
            overlayLeft: 'auto',
            overlayRight: 'auto'
        }
        if ((idx%this.state.totalCols) > (this.state.totalCols/2)){
            state.overlayLeft = 20;
        } else {
            state.overlayRight = 20;
        }
        this.setState(state);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {
                    (this.props.user.selectedGroupIdx > -1) && <>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.props.user.selectedGroupIdx}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto">
                                {
                                    this.props.user.groups.map((g, idx) => <Tab key={idx} label={g} />)
                                }
                            </Tabs>
                        </AppBar>
                        <div
                            onMouseLeave={() => this.showUser(null)}
                            style={{ position: 'relative', marginTop: 5, background: 'black', textAlign: 'center', fontSize: 0, height: 'calc(100vh - 53px)', overflowY: 'auto' }}>
                            {
                                this.props.user.usersInGroup.map((u, idx) => <div
                                    key={idx}
                                    onMouseEnter={() => this.showUser(idx)}
                                    style={{
                                        width: this.state.imageWidth,
                                        backgroundImage: `url(${u.image})`,
                                        backgroundSize: 'cover',
                                        backgroundColor: 'black',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        height: this.state.imageHeight,
                                        display: 'inline-block',
                                        position: 'relative'

                                    }}>

                                </div>)
                            }
                            {
                                this.state.showUserIdx && <div style={{
                                    width: 300,
                                    height: 250,
                                    backgroundImage: `url(${this.props.user.usersInGroup[this.state.showUserIdx].image})`,
                                    backgroundSize: 'cover',
                                    backgroundColor: 'black',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    top: 20,
                                    right: this.state.overlayRight,
                                    left: this.state.overlayLeft
                                }}>
                                    <div style={{ fontSize: 18, padding: 5, background: '#0086fb', position: 'absolute', top: 0, right: 0, color: 'white', fontFamily: 'arial' }}>
                                        {this.props.user.usersInGroup[this.state.showUserIdx].roomName}
                                    </div>
                                    <div style={{
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        position: 'absolute',
                                        fontFamily: 'arial',
                                        left: 0,
                                        bottom: 0,
                                        padding: 3,
                                        fontSize: 14
                                    }}>{this.props.user.usersInGroup[this.state.showUserIdx].userName}</div>
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        );
    }
}

BBTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state => ({
    user: state.user
}), _w(UserActions))(withStyles(styles)(BBTabs));