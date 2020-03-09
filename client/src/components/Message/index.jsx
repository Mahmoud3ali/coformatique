import React, { useState } from "react";

import { Grid, Typography, withStyles, Button } from "@material-ui/core";

import { MessageDialogue } from "../index";
import { MessagesActions } from "../../api";
import { useUserData } from "../../hooks";

const Message = ({
  title,
  body,
  sender,
  receiver,
  id,
  refreshList,
  classes
}) => {
  const [isEditOpened, setIsEditOpened] = useState(false);
  const [isReplyOpened, setIsReplyOpened] = useState(false);
  const [userData] = useUserData(() => null);
  return (
    <>
      {isEditOpened && (
        <MessageDialogue
          data={{ title, body, target: receiver._id }}
          dialogOpened={isEditOpened}
          handleClose={() => setIsEditOpened(false)}
          handleConfirm={data =>
            MessagesActions.editMessage({
              messageId: id,
              messageData: data,
              callback: () => {
                setIsEditOpened(false);
                refreshList();
              }
            })
          }
        />
      )}
      {isReplyOpened && (
        <MessageDialogue
          reply
          dialogOpened={isReplyOpened}
          handleClose={() => setIsReplyOpened(false)}
          handleConfirm={data =>
            MessagesActions.createMessageReply({
              messageId: id,
              replyData: data,
              callback: () => {
                setIsReplyOpened(false);
                refreshList();
              }
            })
          }
        />
      )}
      <Grid container justify="space-between" className={classes.container}>
        <Grid item>
          <Grid container direction="column" alignItems="stretch" spacing={2}>
            <Grid item>
              <Typography>{title}</Typography>
            </Grid>
            <Grid item>
              <Typography>{body}</Typography>
            </Grid>
            <Grid item>
              <Typography>{`From: ${sender.name}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center" spacing={1}>
            {receiver._id === userData?.id && (
              <Grid item onClick={() => setIsReplyOpened(true)}>
                <Button variant="outlined"> Reply </Button>
              </Grid>
            )}
            {sender._id === userData?.id && (
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditOpened(true)}
                >
                  Edit
                </Button>
              </Grid>
            )}
            {sender._id === userData?.id && (
              <Grid
                item
                onClick={() => {
                  MessagesActions.deleteMessage({
                    messageId: id,
                    callback: () => refreshList()
                  });
                }}
              >
                <Button variant="outlined"> Delete </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const styles = theme => ({
  container: {
    borderWidth: "2px",
    borderStyle: "solid",
    padding: theme.spacing(2)
  }
});

export default withStyles(styles)(Message);
