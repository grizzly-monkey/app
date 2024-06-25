import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import "@/assets/styles/global.scss";
import { store } from "@/redux/store";
import "@/translation/i18n";
import AppRoutes from "./routes";
import theme from "./theme";
// import { Spin } from 'antd'
// import { LoadingOutlined } from '@ant-design/icons';

// const setSpinner = () => {
//   const antIcon = <LoadingOutlined data-testid="loader" style={{ fontSize: 24 }} spin />
//   Spin.setDefaultIndicator(antIcon)
// }

function App() {
  // setSpinner()
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <AppRoutes />
        <Toaster position="top-right" reverseOrder={true} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
