import React, { useState, useEffect } from "react";

import { Grid, withStyles } from "@material-ui/core";

import { MessagesActions } from "../../api";
import { Message } from "../../components";

const MessagesList = ({ classes }) => {
  const [messages, setMessages] = useState();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if(reload) {
      MessagesActions.listMessages({
        callback: data =>
          setMessages(data.sort((a, b) => a.createdAt < b.createdAt))
      });
      setReload(false);
    }
  }, [reload]);

  return (
    <Grid
      container
      direction="column"
      alignItems="stretch"
      spacing={2}
      className={classes.container}
    >
      {messages?.map(message => (
        <Grid item key={message._id}>
          <Message
            title={message.title}
            body={message.body}
            sender={message.creatorId}
            receiver={message.targetId}
            id={message._id}
            refreshList={() => setReload(true)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const styles = theme => ({
  container: {
    maxHeight: "500px",
    overflowY: "auto",
    flexWrap: "nowrap"
  }
});

export default withStyles(styles)(MessagesList);
