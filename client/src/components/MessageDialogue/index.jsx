import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  Grid,
  withStyles,
  TextField,
  MenuItem,
  Typography
} from "@material-ui/core";

import { UsersActions } from "../../api";
import { useUserData } from "../../hooks";

const MessageDialogue = ({
  reply,
  dialogOpened,
  handleClose,
  handleConfirm,
  classes
}) => {
  const [userData] = useUserData(() => null);

  const [target, setTarget] = useState("none");
  const [users, setUsers] = useState();
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    UsersActions.listUsers({ callback: setUsers });
  }, []);

  return (
    dialogOpened && (
      <Dialog
        open={dialogOpened}
        onClose={handleClose}
        className={classes.dialogue}
      >
        <Grid container justify="center" className={classes.mainContainer}>
          <Grid item xs={8}>
            <Grid container direction="column" alignItems="stretch" spacing={8}>
              {!reply && (
                <Grid item align="center">
                  <TextField
                    fullWidth
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              )}
              <Grid item align="center">
                <TextField
                  fullWidth
                  placeholder={reply ? "Reply" : "Body"}
                  rows={3}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  multiline
                  variant="outlined"
                />
              </Grid>
              {!reply && (
                <Grid item align="center">
                  <TextField
                    select
                    fullWidth
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="none"> To: </MenuItem>
                    {users
                      ?.filter(user => user._id !== userData.id)
                      .map(user => (
                        <MenuItem key={user._id} value={user._id}>
                          {user.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
              )}
              <Grid item>
                <Grid container justify="space-between">
                  <Grid item>
                    <Button variant="outlined" onClick={handleClose}>
                      <Typography> Close </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        handleConfirm(
                          reply ? { body } : { title, body, targetId: target }
                        )
                      }
                    >
                      <Typography> Submit </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    )
  );
};

const styles = theme => ({
  mainContainer: {
    width: "600px",
    padding: theme.spacing(4)
  },
  dialogue: {
    minHeight: "300px"
  }
});

MessageDialogue.defaultProps = {
  reply: false
};

MessageDialogue.propTypes = {
  reply: PropTypes.bool,
  dialogOpened: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(MessageDialogue);
