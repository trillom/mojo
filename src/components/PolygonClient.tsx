import { useEffect, useState } from "react";
import PolygonClientService from "../services/PolygonClientService";
import './PolygonClient.css';
import PriceTable from "./PriceTable";

interface IPolygonClientProps {
  clientType: 'forex' | 'crypto';
  apiKey?: string;
  symbols: string[];
}

function PolygonClient (props: IPolygonClientProps) {
  const { clientType, apiKey, symbols } = props;
  let initialState: {[key: string]: number[][]} = {};
  const [ state, setState ] = useState(initialState);

  useEffect(() => {
    let wsClient = new PolygonClientService(apiKey, clientType).client;
    wsClient.onmessage = (msg: any) => {
      const parsedMessage = JSON.parse(msg.data);

      // Wait for authentication, then subscribe
      let messageType = parsedMessage[0].ev;
      if (messageType === 'status' && parsedMessage[0].status === 'auth_success') {
          console.log('Subscribing to requested symbols', symbols);
          wsClient.send(`{"action":"subscribe", "params":"${symbols.join(',')}"}`);
      } else if (messageType === 'C' || messageType === 'XQ') {
          // Defaults set to 'C' type
          var tk = 't', pk = 'p', ak = 'a', bk = 'b';

          switch (messageType) {
              case 'XQ':
                  ak = 'ap';
                  bk = 'bp';
                  pk = 'pair'
                  break;
          }

          setState(s => {
            let newState = Object.assign({}, s);
            let price = parsedMessage[0];
            let symbol = messageType + '.' + price[pk];
            let history = s[symbol] ? s[symbol] : [];
            history.push([price[tk], price[ak], price[bk]]);
            newState[symbol] = history.slice(-20);
            return newState;
          });
      }
    }
  }, [clientType, apiKey, symbols]);

  return (
    <div className="row-display">
        { symbols.map((symbol, index) => {
            return <PriceTable symbol={symbol} quotes={state[symbol]} key={index}/>
        })}
    </div>
  )
}

export default PolygonClient;