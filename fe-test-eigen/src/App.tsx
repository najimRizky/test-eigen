import Routes from './components/modules/Routes'
import { ConfigProvider } from 'antd'
import theme from './config/theme'

function App() {

  return (
    <>
      <ConfigProvider theme={theme} >
        <Routes />
      </ConfigProvider >
    </>
  )
}

export default App
