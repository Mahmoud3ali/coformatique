import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { Typography, Grid, withStyles } from "@material-ui/core";

import { isUserAuthenticated } from "../../helpers";

const HomePage = ({ classes, history }) => {
  // using state since the app has only one page.
  const [user, setUser] = useState();

  useEffect(() => {
    if (isUserAuthenticated()) {
      const token = localStorage.getItem("jwtToken");
      setUser(jwtDecode(token).user);
    } else {
      history.push("/");
    }
  }, []);

  return (
    <Grid container direction="column" alignItems="stretch" spacing={10}>
      <Grid item align="center">
        <Typography variant="h2"> {`Hello ${user?.name}`} </Typography>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            alignItems="stretch"
            className={classes.messagesContainer}
          >
            <Grid item>HEYYE</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = theme => ({
  messagesContainer: {
    borderWidth: "2px",
    borderStyle: "solid",
    padding: theme.spacing(5)
  }
});

HomePage.propTypes = {
  history: PropTypes.shape().isRequired
};

export default withRouter(withStyles(styles)(HomePage));
