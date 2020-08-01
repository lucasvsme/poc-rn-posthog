import { AppRegistry } from 'react-native';
import App from './src/App';

import PostHog from 'posthog-react-native';

PostHog.setup('', {
  ios: false,
  host: 'http://172.17.0.3:31049',
  captureApplicationLifecycleEvents: true,
  recordScreenViews: true,
});

AppRegistry.registerComponent('rntemplate', () => App);
