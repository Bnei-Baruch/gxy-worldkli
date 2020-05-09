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
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router';
import { Icon as Icn } from 'react-icons-kit'
import { man } from 'react-icons-kit/ionicons/man'
import { woman } from 'react-icons-kit/ionicons/woman'

const BLUE = '#2e88c8';
// const RED = 'red';

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
    tabsRoot: {
        background: BLUE,
        'box-shadow': 'none',
        color: 'white'
    },
    indicator: {
        background: 'white'
    },
    tabRoot: {
        color: '#ccc'
    },
    selected: {
        color: 'white'
    }
});

class BBTabs extends React.Component {
    state = {
        userWidth: '25vw',
        imageWidth: 0,
        imageHeight: 0,
        totalCols: 0,
        totalRows: 0,
        overlayTop: 20,
        overlayRight: 0,
        overlayLeft: 0,
        imageSufix: ''
    };

    setImageSize = () => {
        const innerWidth = Math.round(window['innerWidth']);
        const innerHeight = Math.round(window['innerHeight']) - 53;

        if (this.props.user.usersInGroup.length === 0) return;

        const area = innerHeight * innerWidth;
        const singleImageArea = area / this.props.user.usersInGroup.length;

        const singleImageWidth = Math.sqrt(singleImageArea) * 1.2;
        const totalCols = Math.ceil(innerWidth / singleImageWidth);
        const imageWidth = innerWidth / totalCols;

        const totalRows = Math.ceil(this.props.user.usersInGroup.length / totalCols);
        const imageHeight = innerHeight / totalRows;

        let imageSufix = '';

        if (imageWidth < 40) imageSufix = '-s';
        else if (imageWidth < 80) imageSufix = '-m';
        else if (imageWidth < 120) imageSufix = '-l';

        this.setState({
            imageWidth,
            imageHeight,
            totalCols,
            totalRows,
            imageSufix
        })
    }

    interval;

    componentDidMount() {
        this.props.getBB(false, this.props.match.params.gender);
        this.interval = setInterval(() => this.props.getBB(false, this.props.match.params.gender), (1000 * 60 * 5));
        this.setImageSize();
        window.addEventListener('resize', () => this.setImageSize());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.usersInGroup.length !== this.props.user.usersInGroup.length) {
            this.setImageSize();
        }
        if (prevProps.match.params.gender !== this.props.match.params.gender) {
            this.props.getBB('clear', this.props.match.params.gender);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.setImageSize());
        clearInterval(this.interval);
    }

    handleChange = (event, value) => {
        this.props.getBB(value, this.props.match.params.gender);
    };

    showUser = idx => {
        let state = {
            showUserIdx: idx,
            overlayLeft: 'auto',
            overlayRight: 'auto'
        }
        if ((idx % this.state.totalCols) > (this.state.totalCols / 2)) {
            state.overlayLeft = 20;
        } else {
            state.overlayRight = 20;
        }
        this.setState(state);
    }

    changeGender = () => {
        let gender = this.props.match.params.gender === 'w' ? 'm' : 'w';
        this.props.history.push('/' + gender);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {
                    (this.props.user.selectedGroupIdx > -1) && <>
                        <AppBar position="static" color="default">
                            <>
                                <Tabs
                                    style={{ width: 'calc(100% - 48px)' }}
                                    classes={{ root: classes.tabsRoot, indicator: classes.indicator }}
                                    value={this.props.user.selectedGroupIdx}
                                    onChange={this.handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="scrollable"
                                    scrollButtons="auto">
                                    {
                                        this.props.user.groups.map((g, idx) => <Tab style={{ color: 'white' }} classes={{ root: classes.tabRoot, selected: classes.selected }} key={idx} label={g} />)
                                    }
                                </Tabs>
                                <div style={{ width: 48, height: 48, background: BLUE, position: 'absolute', top: 0, right: 0 }}>
                                    <IconButton
                                        onClick={() => this.changeGender()}
                                        style={{ color: 'white' }} className={classes.button} aria-label="Delete">
                                        <Icn style={{ position: 'relative', top: -3 }} size='120%' icon={this.props.match.params.gender === 'w' ? woman : man} />
                                    </IconButton>
                                </div>
                            </>
                        </AppBar>
                        <div
                            onMouseLeave={() => this.showUser(null)}
                            style={{ position: 'relative', background: 'black', textAlign: 'center', fontSize: 0, height: 'calc(100vh - 48px)', overflowY: 'auto' }}>
                            {
                                this.props.user.usersInGroup.map((u, idx) => <div
                                    key={idx}
                                    onMouseEnter={() => this.showUser(idx)}
                                    style={{
                                        width: this.state.imageWidth,
                                        backgroundImage: `url(${u.image.replace('.jpg', `${this.state.imageSufix}.jpg`)})`,
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
                                    <div style={{ fontSize: 18, padding: 5, background: BLUE, position: 'absolute', top: 0, right: 0, color: 'white', fontFamily: 'arial' }}>
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

export default withRouter(connect(state => ({
    user: state.user
}), _w(UserActions))(withStyles(styles)(BBTabs)));