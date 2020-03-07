import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiTypography: {
      root: {
        color: "#071413",
        textTransform: "none"
      }
    },
    MuiButton: {
      root: {
        borderRadius: "8px"
      }
    }
  },

  typography: {
    fontFamily: "Montserrat",
    h1: {
      fontSize: "52px"
    },
    h2: {
      fontSize: "47px"
    },
    h3: {
      fontSize: "42px"
    },
    h4: {
      fontSize: "37px"
    },
    h5: {
      fontSize: "30px"
    },
    h6: {
      fontSize: "24px"
    },
    subtitle2: {
      fontSize: "20px"
    },
    body1: {
      fontSize: "16px"
    },
    body2: {
      fontSize: "12px"
    },
    caption: {
      fontSize: "7px"
    },
    button: {
      textTransform: "none"
    }
  }
});
