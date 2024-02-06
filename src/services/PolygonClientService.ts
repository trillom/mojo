import { websocketClient } from '@polygon.io/client-js';

class PolygonClientService {
    public client: any;

    constructor (apiKey: string = '', clientType: string = 'crypto') {
        switch (clientType) {
            case 'crypto':
                this.client = websocketClient(apiKey).crypto();
                break;
            case 'forex':
                this.client = websocketClient(apiKey).forex();
                break;
            default:
                console.log('Unknown Polygon client type');
                return;
        }

        this.client.onerror = (err: string) => console.log('Failed to connect', err);
        this.client.onclose = (code: number, reason: string) => console.log('Connection closed', code, reason);
    }
}

export default PolygonClientService;