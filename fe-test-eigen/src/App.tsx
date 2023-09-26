import Routes from './components/modules/Routes'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Nunito, sans-serif'
          }
        }}
      >
        <Routes />
      </ConfigProvider>
    </>
  )
}

export default App
