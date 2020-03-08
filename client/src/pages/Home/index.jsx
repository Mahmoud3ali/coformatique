import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { Typography, Grid, withStyles, Button } from "@material-ui/core";

import { useUserData } from "../../hooks";
import { MessageDialogue } from "../../components";
import { MessagesActions } from "../../api";

const HomePage = ({ classes, history }) => {
  const [userData] = useUserData(() => history.push("/"));

  const [isCreateOpened, setIsCreateOpened] = useState(false);

  return (
    <>
      {isCreateOpened && (
        <MessageDialogue
          dialogOpened={isCreateOpened}
          handleClose={() => setIsCreateOpened(false)}
          handleConfirm={data =>
            MessagesActions.createMessage({
              messageData: data,
              callback: () => setIsCreateOpened(false)
            })
          }
        />
      )}
      <Grid container direction="column" alignItems="stretch" spacing={10}>
        <Grid item align="center">
          <Typography variant="h2"> {`Hello ${userData?.name}`} </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              alignItems="stretch"
              className={classes.messagesContainer}
            >
              <Grid item align="right">
                <Button
                  variant="outlined"
                  onClick={() => setIsCreateOpened(true)}
                >
                  <Typography variant="body1">Create new message </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const styles = theme => ({
  messagesContainer: {
    borderWidth: "2px",
    borderStyle: "solid",
    padding: theme.spacing(1),
  }
});

HomePage.propTypes = {
  history: PropTypes.shape().isRequired
};

export default withRouter(withStyles(styles)(HomePage));
