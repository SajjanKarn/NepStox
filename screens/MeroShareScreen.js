import { WebView } from "react-native-webview";
import Loader from "../components/Loader";

export default function MeroShareScreen() {
  return (
    <WebView
      source={{
        uri: `https://meroshare.cdsc.com.np/#/login`,
      }}
      renderLoading={() => <Loader />}
      startInLoadingState={true}
      onLoadStart={() => <Loader />}
      style={{ flex: 1 }}
    />
  );
}
