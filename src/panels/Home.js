import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, WriteBar, WriteBarIcon, AdaptiveIconRenderer, usePlatform, SubnavigationBar, SubnavigationButton, CardGrid, Card } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import React, { useState } from 'react';
import { Icon24Filter, Icon24SearchOutline, Icon24VoiceOutline, Icon28VoiceOutline } from '@vkontakte/icons';
import { useUnit } from 'effector-react';
import { $books } from '../store/book';
import { $janers } from '../store/janer';
import { $userServer } from '../store/user';
import { getBookFx } from '../api/book';
import { getJaner } from '../api/requests';


import axios from 'axios';
import './Home.css'
import BookCard from '../Components/BookCard'

export const Home = ({ id, fetchedUser }) => {
  const [books, userServer, janers] = useUnit([$books, $userServer, $janers]);
  
  const [text, setText] = useState('');
  const [janerId, setJanerId] = useState(0);
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const platform = usePlatform();
  const getBooks = async () => {
    // const test2=  await getBookFx(123);
    //const test2= await axios.get('https://russcazak10.ru/web/index.php?r=api/getbook').then(res=>res.data);
    // console.log(test2)
    // setTest(test2)
    await getBookFx();
  }
  const getJaners = async () => {
  
    // const test2=  await getBookFx(123);
    //const test2= await axios.get('https://russcazak10.ru/web/index.php?r=api/getbook').then(res=>res.data);
    // console.log(test2)
    // setTest(test2)
    await getJaner();
  }
  React.useEffect(() => {

    getBooks()
    getJaners()
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


  let thematicsFilteredBook = books.filter(
    ({ name, ISBN, autor }) =>
      name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      autor.name_autor.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      ISBN.toLowerCase().indexOf(text.toLowerCase()) > -1
  );
  if (janerId != 0) {
    console.log(janerId)
    thematicsFilteredBook = thematicsFilteredBook.filter(({ janer }) => janer.find((elem)=>janerId==elem.id) )
  }

  console.log(thematicsFilteredBook)


  return (
    <Panel id={id}>
      <PanelHeader>Найти книгу</PanelHeader>
      <Group>
        <Div>
        <WriteBar
          value={text}
          onChange={(e) => setText(e.target.value)}
          before={<WriteBarIcon > <Icon24SearchOutline /> </WriteBarIcon>} // это нужно вставить 
          placeholder="Название/автор/ISBN"
        />
        </Div>
        <SubnavigationBar mode="horizontal" gap="m" stretched={false}>
          {janers.length > 0 &&
            janers.map((janer) => (
              <SubnavigationButton
                selected={janerId === janer.id}
                onClick={()=>{
                  setJanerId(janer.id)
                }}
                key={janer.id}
                >
                {janer.name}
              </SubnavigationButton>
            )
            )
          }

        </SubnavigationBar>
      </Group>
      <Button size="s" appearance="accent" onClick={()=>{
        
        const id = books[Math.floor(Math.random() * books.length)].id
        routeNavigator.push(`/BookInfo?id=${id}`)
      }}>Случайная книга</Button>
      <Group>
        <Header mode="primary">Другие книги
          в вашем городе</Header>

        <Div className='Books'>
          {thematicsFilteredBook.length > 0 ? (
            <div className='Books_grid'>
              {thematicsFilteredBook.map((book) => (
                <BookCard Book={book} />
              ))}
            </div>
          ) : (<div>В вашем городе пока нет книг, которые отдают</div>)
          }
        </Div>

      </Group>
    </Panel>
  );
};
