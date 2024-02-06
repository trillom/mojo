import './App.css';
import PolygonClient from './components/PolygonClient';
import { TabPanel } from './components/TabPanel';
import { Tabs } from './components/Tabs';

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabPanel label="Forex">
          <PolygonClient clientType='forex' apiKey={process.env.REACT_APP_API_KEY} symbols={['C.EUR/USD','C.CHF/USD']}/>
        </TabPanel>
        <TabPanel label="Crypto">
          <PolygonClient clientType='crypto' apiKey={process.env.REACT_APP_API_KEY} symbols={['XQ.BTC-USD','XQ.ETH-USD']}/>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
