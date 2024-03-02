import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Epic } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Persik, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
/*    этот код пока не нужен
      const data = await bridge.send('VKWebAppStorageGet', {
				keys: [user.id.toString()],
			})

			if (data.keys[0].value) {

				console.log("заходил")
			} else {
				console.log("не заходил")

				
			}*/
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <Epic activePanel={activePanel}>
          <View activePanel={activePanel}>
            <Home id="home" fetchedUser={fetchedUser} />
            <Persik id="persik" />
          </View>
        </Epic>
        
      </SplitCol>
    </SplitLayout>
  );
};
