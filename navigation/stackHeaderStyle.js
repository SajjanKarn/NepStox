import colors from "../config/colors";

const stackHeaderStyle = (title = "Title") => ({
  headerTitle: title,
  headerStyle: {
    backgroundColor: colors.dark.secondary,
    elevation: 0,
  },
  headerTintColor: colors.dark.textColor,
});

export default stackHeaderStyle;
