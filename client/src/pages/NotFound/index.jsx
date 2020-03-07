import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { Grid, Typography, Button, withStyles } from "@material-ui/core";

const NotFoundPage = ({ history, classes }) => (
  <Grid container direction="column" alignItems="center">
    <Grid item>
      <Typography
        className={classes.text}
        variant="h2"
        align="center"
        color="error"
      >
        Page not found
      </Typography>
    </Grid>
    <Button onClick={() => history.push("/")} variant="outlined">
      Return to home page
    </Button>
  </Grid>
);

const styles = () => ({
  text: {
    fontWeight: "bold"
  }
});

NotFoundPage.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default withStyles(styles)(withRouter(NotFoundPage));
