import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, WriteBar, WriteBarIcon, AdaptiveIconRenderer, usePlatform, SubnavigationBar,SubnavigationButton, CardGrid, Card } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import React, { useState } from 'react';
import { Icon24Filter, Icon24SearchOutline, Icon24VoiceOutline, Icon28VoiceOutline } from '@vkontakte/icons';
import { useUnit } from 'effector-react';
import { $books } from '../store/book';
import { $userServer } from '../store/user';
import { getBookFx } from '../api/book';
import axios from 'axios';
import './Home.css'


export const Home = ({ id, fetchedUser }) => {
  const [books, userServer] = useUnit([$books, $userServer]);

  const [text1, setText1] = useState('');
  const [test, setTest] = useState('');
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const platform = usePlatform();

  React.useEffect(() => {
      const getBooks = async () =>{
        const test2=  await getBookFx(123);
      //const test2= await axios.get('https://russcazak10.ru/web/index.php?r=api/getbook').then(res=>res.data);
      console.log(test2)
      setTest(test2)
    }
    getBooks()
  }, []);
  const FilterIconForWriteBar = (
    <AdaptiveIconRenderer
      IconCompact={platform === 'ios' ? Icon24Filter : Icon24Filter}
      IconRegular={Icon24Filter}
    />
  );
  const VoiceOutlineIcon = (
    <AdaptiveIconRenderer
      IconCompact={platform === 'ios' ? Icon28VoiceOutline : Icon24VoiceOutline}
      IconRegular={Icon28VoiceOutline}
    />
  );
console.log(books)
  return (
    <Panel id={id}>
      <PanelHeader>Найти книгу</PanelHeader>
      <Group>
        <WriteBar
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          before={<WriteBarIcon > <Icon24SearchOutline /> </WriteBarIcon>}
          after={
            <>
              <WriteBarIcon label="Фильтр">
                {FilterIconForWriteBar}
              </WriteBarIcon>
              <WriteBarIcon label="Записать голосовое сообщение">
                {VoiceOutlineIcon}
              </WriteBarIcon>
            </>
          }
          placeholder="Название/автор/ISBN"
        />
      </Group>
      <Group>
        <SubnavigationBar mode="horizontal" gap="m" stretched={false}>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
          <SubnavigationButton 
                  onClick={() => setSizeSelected(!sizeSelected)}>
            Бизнес
          </SubnavigationButton>
        </SubnavigationBar>
      </Group>
      <Button size="s" appearance="accent">Случайная книга</Button>
      <Group>
        <Header mode="primary">Другие книги
          в вашем городе</Header>
        
        <Div className='books'>

        </Div>
        {books.length > 0 ? (
          <div className='book-list'>
            {books.map((book) => (
                <div className='bookCard'>
                  <div>{book.name}
                  </div>
                  <div>{book.description}
                  </div>
                  <div>
                  </div>
                </div>
            ))}
          </div>
        ) : (<div>В вашем городе пока нет книг, которые отдают</div>)
        }
      </Group>
    </Panel>
  );
};
