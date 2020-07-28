import { AppRegistry } from 'react-native';
import App from './src/App';

import PostHog from 'posthog-react-native';

async function main() {
  await PostHog.setup('AfWTF8DTiSv4YgcJoX7FnjoKRZpxcCbUS4aSljjWJWs', {
    ios: false,
    host: 'http://172.17.0.3:31049',
    captureApplicationLifecycleEvents: true,
    recordScreenViews: true,
  });
}

main();

AppRegistry.registerComponent('rntemplate', () => App);
