import React, { useState } from "react";

import {
  Grid,
  Typography,
  TextField,
  withStyles,
  Button
} from "@material-ui/core";

const LoginPage = ({ classes }) => {
  const [userLoginData, setLoginData] = useState({
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
          value={userLoginData.email}
          onChange={e => {
            setLoginData({ ...userLoginData, email: e.target.value });
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
          value={userLoginData.password}
          onChange={e => {
            setLoginData({
              ...userLoginData,
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
        <Button variant="outlined" onClick={() => {}}>
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

export default withStyles(styles)(LoginPage);
