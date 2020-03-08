import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  Grid,
  Typography,
  TextField,
  withStyles,
  Button
} from "@material-ui/core";

import { AuthActions } from "../../api";

const LoginPage = ({ history, classes }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      className={classes.container}
      spacing={8}
    >
      <Grid item>
        <Typography
          variant="h1"
          color="textPrimary"
          align="center"
          className={classes.header}
        >
          Guestbook
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Email"
          type="email"
          fullWidth
          value={userData.email}
          onChange={e => {
            setUserData({ ...userData, email: e.target.value });
          }}
          variant="outlined"
          autoComplete="email"
          classes={{
            root: classes.textFieldRoot
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          placeholder="Password"
          type="password"
          fullWidth
          value={userData.password}
          onChange={e => {
            setUserData({
              ...userData,
              password: e.target.value
            });
          }}
          variant="outlined"
          autoComplete="password"
          classes={{
            root: classes.textFieldRoot
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
        />
      </Grid>
      <Grid item align="center">
        <Button
          variant="outlined"
          onClick={() => {
            AuthActions.loginUser({
              userData,
              callback: () => {
                history.push("/home");
              }
            });
          }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = theme => ({
  header: {
    fontWeight: "bold"
  },
  container: {
    height: "100%",
    alignContent: "center",
    marginTop: theme.spacing(10)
  }
});

LoginPage.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default withStyles(styles)(withRouter(LoginPage));
