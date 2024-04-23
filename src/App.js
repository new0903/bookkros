import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Epic } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import TabBar from './Components/Tabbar';
import { Persik, Home , BookInfo,AddBook,EditBook,UserBook,Location,Modal } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import './index.css';
import { $userServer,$userVK,setUserVK } from './store/user';
import { setUserServerFx } from './api/user';
import { useUnit } from 'effector-react';
import '@vkontakte/vkui/dist/vkui.css';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [userServer,userVK] = useUnit([$userServer,$userVK]);
	const [activeModal, setActiveModal] = useState(null);

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
  const modal=<Modal fetchedUser={fetchedUser} activeModal={activeModal} setActiveModal={setActiveModal}/>
  //popout={popout} activeModal={activeModal} setActiveModal={setActiveModal}
  return (
    <SplitLayout popout={popout} modal={modal}>
      <SplitCol >
        <Epic activePanel={activePanel} tabbar={<TabBar activePanel={activePanel} />}>
          <View activePanel={activePanel}>
            <Home id="home" fetchedUser={fetchedUser} />
            <BookInfo id="bookInfo"  fetchedUser={fetchedUser} setActiveModal={setActiveModal}/>
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
