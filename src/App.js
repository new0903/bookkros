import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Epic } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import TabBar from './Components/Tabbar';
import { Persik, Home , BookInfo,AddBook,EditBook,UserBook,Location } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import './index.css';
import { $userServer,$userVK,setUserVK } from './store/user';
import { setUserServerFx } from './api/user';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');

      const data = await bridge.send('VKWebAppStorageGet', {
				keys: [user.id.toString()],
			})

			if (data.keys[0].value) {

				console.log("заходил")
			} else {
				console.log("не заходил")

				setUserServerFx(user); 
			}
      setUserVK(user);
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);
  //popout={popout}
  return (
    <SplitLayout popout={popout}>
      <SplitCol >
        <Epic activePanel={activePanel} tabbar={<TabBar activePanel={activePanel} />}>
          <View activePanel={activePanel}>
            <Home id="home" fetchedUser={fetchedUser} />
            <BookInfo id="bookInfo"  fetchedUser={fetchedUser} />
            <Persik id="persik"  fetchedUser={fetchedUser} />
            <AddBook id="createBook" fetchedUser={fetchedUser} />
            <EditBook id="editBook" fetchedUser={fetchedUser} />
            <UserBook id="userBook" fetchedUser={fetchedUser}/>
            <Location id="locationuser" fetchedUser={fetchedUser}/>
          </View>
        </Epic>
        
      </SplitCol >
    </SplitLayout>
  );
};
