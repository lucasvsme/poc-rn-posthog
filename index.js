import { AppRegistry } from 'react-native';
import App from './src/App';

import PostHog from 'posthog-react-native';

async function main() {
  await PostHog.setup('cGecHL7Hl_NTJV3FLQhF4hPrPUI_LzLOpRFBnibxVSc', {
    ios: false,
    host: 'http://172.17.0.3:31049',
    captureApplicationLifecycleEvents: true,
    recordScreenViews: true,
  });
}

main();

AppRegistry.registerComponent('rntemplate', () => App);
