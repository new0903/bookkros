import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, WriteBar, WriteBarIcon, AdaptiveIconRenderer, usePlatform, ButtonGroup, CardGrid, Card } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import React, { useState } from 'react';
import { Icon24Filter, Icon24SearchOutline, Icon24VoiceOutline, Icon28VoiceOutline } from '@vkontakte/icons';
import { useUnit } from 'effector-react';
import { $books } from '../store/book';
import { $userServer } from '../store/user';


export const Home = ({ id, fetchedUser }) => {
  const [books, userServer] = useUnit([$books, $userServer]);

  const [text1, setText1] = useState('');
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();
  const platform = usePlatform();

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

  return (
    <Panel id={id}>
      <PanelHeader>Найти книгу</PanelHeader>
      <Group>
        <WriteBar
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          before={<WriteBarIcon onClick={noop}> <Icon24SearchOutline /> </WriteBarIcon>}
          after={
            <>
              <WriteBarIcon onClick={noop} label="Фильтр">
                {FilterIconForWriteBar}
              </WriteBarIcon>
              <WriteBarIcon onClick={noop} label="Записать голосовое сообщение">
                {VoiceOutlineIcon}
              </WriteBarIcon>
            </>
          }
          placeholder="Название/автор/ISBN"
        />
      </Group>
      <Group>
        <ButtonGroup mode="horizontal" gap="m" stretched={false}>
          <Button size="s" appearance="neutral">
            Бизнес
          </Button>
          <Button size="s" appearance="neutral">
            Журналы
          </Button>
          <Button size="s" appearance="neutral">
            Здоровье
          </Button>
          <Button size="s" appearance="neutral">
            Комиксы
          </Button>
          <Button size="s" appearance="neutral">
            Наука
          </Button>
          <Button size="s" appearance="neutral">
            Образование
          </Button>
          <Button size="s" appearance="neutral">
            Психология
          </Button>
          <Button size="s" appearance="neutral">
            Спорт
          </Button>
          <Button size="s" appearance="neutral">
            Хобби
          </Button>
          <Button size="s" appearance="neutral">
            Художественная литература
          </Button>
        </ButtonGroup>
      </Group>
      <Button stretched size="m" appearance="accent">Случайная книга</Button>
      <Group>
        <Header mode="primary">Другие книги
          в вашем городе</Header>
        {books.length > 0 ? (
          <CardGrid>
            {books.map((book) => (
              <Card mode='shadow' key={book.id}>
                <div>
                  <div>
                    {recipe.image}
                  </div>
                  <div>
                    {recipe.name}
                  </div>
                  <div>
                    {recipe.author}
                  </div>
                </div>
              </Card>
            ))}
          </CardGrid>
        ) : (<div>В вашем городе пока нет книг, которые отдают</div>)
        }
      </Group>
    </Panel>
  );
};
