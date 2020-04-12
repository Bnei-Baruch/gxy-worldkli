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
        userWidth: '25vw'
    };

    setUserWidth = () => {
        this.setState({
            userWidth: `${100 / Math.round((window['innerWidth'] / 250))}vw`
        })
    }

    interval;

    componentDidMount() {
        this.props.getBB();
        this.interval = setInterval(() => this.props.getBB(), (1000*60*5));
        this.setUserWidth();
        window.addEventListener('resize', () => this.setUserWidth());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.setUserWidth());
        clearInterval(this.interval);
    }

    handleChange = (event, value) => {
        this.props.getBB(value);
    };

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
                        <div style={{ marginTop: 5, fontSize: 0, height: 'calc(100vh - 53px)', overflowY: 'auto' }}>
                            {
                                this.props.user.usersInGroup.map((u, idx) => <div key={idx} style={{
                                    width: this.state.userWidth,
                                    backgroundImage: `url(${u.image})`,
                                    backgroundSize: 'cover',
                                    backgroundColor: 'black',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: 120,
                                    display: 'inline-block',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        position: 'absolute',
                                        fontFamily: 'arial',
                                        left: 0,
                                        bottom: 0,
                                        padding: 3,
                                        fontSize: 14
                                    }}>{u.userName}</div>
                                </div>)
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