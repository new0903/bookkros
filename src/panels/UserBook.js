import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, WriteBar, WriteBarIcon, AdaptiveIconRenderer, usePlatform, SubnavigationBar, SubnavigationButton, CardGrid, Card } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import React, { useState } from 'react';
import { Icon24Filter, Icon24SearchOutline, Icon24VoiceOutline, Icon28VoiceOutline } from '@vkontakte/icons';
import { useUnit } from 'effector-react';
import { $books } from '../store/book';
import { $janers } from '../store/janer';
import { $userServer } from '../store/user';
import { getBookFx,getUserBookFx } from '../api/book';
import { getJaner } from '../api/requests';
import axios from 'axios';
import './Home.css'
import BookCard from '../Components/BookCard'

export const UserBook = ({ id, fetchedUser }) => {
  const [books, userServer, janers] = useUnit([$books, $userServer, $janers]);
  
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const platform = usePlatform();
  const getBooks = async () => {
    // const test2=  await getBookFx(123);
    //const test2= await axios.get('https://russcazak10.ru/web/index.php?r=api/getbook').then(res=>res.data);
    // console.log(test2)
    // setTest(test2)
    await getUserBookFx(fetchedUser.id);
  }
  const getJaners = async () => {
    // const test2=  await getBookFx(123);
    //const test2= await axios.get('https://russcazak10.ru/web/index.php?r=api/getbook').then(res=>res.data);
    // console.log(test2)
    // setTest(test2)
    await getJaner(fetchedUser.id);
  }
  React.useEffect(() => {

    getBooks()
    getJaners()
  }, []);
  // const FilterIconForWriteBar = (
  //   <AdaptiveIconRenderer
  //     IconCompact={platform === 'ios' ? Icon24Filter : Icon24Filter}
  //     IconRegular={Icon24Filter}
  //   />
  // );
  // const VoiceOutlineIcon = (
  //   <AdaptiveIconRenderer
  //     IconCompact={platform === 'ios' ? Icon28VoiceOutline : Icon24VoiceOutline}
  //     IconRegular={Icon28VoiceOutline}
  //   />
  // );
  console.log(books)
  return (
    <Panel id={id}>
      <PanelHeader>Ваши книги для обмена</PanelHeader>
      
      <Button size="s" appearance="accent" onClick={()=>{
        routeNavigator.push('/createBook')
      }}>Добавить книгу</Button>
      <Group>
        <Header mode="primary">Список книг</Header>

        <Div className='Books'>
          {books.length > 0 ? (
            <div className='Books_grid'>
              {books.map((book) => (
                <BookCard Book={book} />
              ))}
            </div>
          ) : (<div>Здесь пока нет ни одной книги, которую вы хотели бы отдать. Подарите свою первую книгу другому. </div>)
          }
        </Div>

      </Group>
    </Panel>
  );
};
