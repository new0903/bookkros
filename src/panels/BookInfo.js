import React from 'react'

import persik from '../assets/persik.png';
import {
    Panel,
    Gallery,
    Group,
    PanelHeader,
    Header,
    Button,
    Div,
    FixedLayout,
    IconButton,
    useAdaptivityWithJSMediaQueries,
    Cell,
    Avatar,
    FormItem, Text, MiniInfoCell
} from '@vkontakte/vkui';
//import './PlaceInfo.css'
import { useSearchParams, useRouteNavigator,createBrowserRouter } from '@vkontakte/vk-mini-apps-router'
import { Icon24HammerOutline, Icon24DeleteOutline, Icon16Like, Icon16LikeOutline, Icon24LikeOutline, Icon24Like } from '@vkontakte/icons';
//import { Likes } from '../api/setLikes';
import axios from 'axios';
import { $books, $bookId, setBookId, filterBooks } from '../store/book';
import { $userServer } from '../store/user';
import { getOneBook,deleteBookFx } from '../api/book';
import { useUnit } from 'effector-react';
import './BookInfo.css'



export const BookInfo = ({ id, nav, fetchedUser }) => {


    const [params] = useSearchParams()
    const [book, setBook] = React.useState(null);
    const userServer = useUnit($userServer);
    const routeNavigator = useRouteNavigator()
    //const bookId = useUnit($bookId);
    const idBook = Number(params.get('id') || 1);
    setBookId(idBook)


    React.useEffect(() => {
        const getCurrentTask = async () => {
            const currentBook = await getOneBook(123, idBook);//userServer.id
            setBook(currentBook);
        }
        getCurrentTask();
    }, [idBook]);





    if (book) {

        let imgs = false;
        console.log(book)
        const selectBook = book; ///.find((element) => element.id === idPlace)
        if (Object.keys(selectBook.photo)) {

            if (selectBook.photo.length > 0) {
                imgs = true
            }

            //console.log(PlaceCard.imgsFile)
        }
        return (

            <Panel id={id}>
                <div className="BookInfoPage">
                    <Group>
                        <div className="BookInfo">
                            {imgs &&
                                <Gallery
                                    showArrows
                                    align="center"
                                    bullets="light"
                                    className="BookInfo_gallery"
                                >
                                    <div className={`BookPhoto `}>
                                        <picture className="BookPhoto_picture">
                                            <source srcSet={selectBook.photo} type="image/webp"></source>
                                            <img
                                                src={selectBook.photo}
                                                className='BookPhoto_photo'
                                            />
                                        </picture>
                                    </div>
                                </Gallery>}
                        </div>

                        <div className="BookInfo_content">
                            <FormItem >
                                <Cell
                                    before={selectBook.userInfo.photo_200 ? <Avatar src={selectBook.userInfo.photo_200} /> : null}
                                >
                                    {`${selectBook.userInfo.first_name} ${selectBook.userInfo.last_name}`}
                                </Cell>

                            </FormItem>
                            <FormItem>
                                <Text style={{ fontSize: '24px' }}>{selectBook.name}</Text>
                            </FormItem>
                            <FormItem>
                                <Text>Автор</Text>
                                <MiniInfoCell style={{ padding: '0' }}>
                                    {selectBook.autor.name_autor}
                                </MiniInfoCell >
                            </FormItem>
                            <FormItem style={{ display: "flex", margin: "5px", flexDirection: 'column' }}>
                                <Text>Жанр</Text>
                                <MiniInfoCell style={{ padding: '0' }}>
                                    {selectBook.janer.map((janer) => {
                                        return (`${janer.name}, `)
                                    })}
                                </MiniInfoCell>
                            </FormItem>
                            <FormItem className='content'>
                                <Text style={{ paddingBottom: '5px' }}>Описание</Text>
                                <Text>
                                    {selectBook.description ? selectBook.description : ''}
                                </Text>
                            </FormItem>
                            {/* {selectBook.dameged ? (
                                <FormItem>
                                    <Text style={{ paddingBottom: '5px' }}>Повреждения присутствуют</Text>
                                </FormItem>
                            ) : (<></>)
                            } */}
                            <div className="BookInfo_content_description">
                                {fetchedUser.id == selectBook.userInfo.id_vkontakte &&
                                    <div style={{ display: "flex", margin: "5px" }}>

                                        <Icon24HammerOutline fill='#447bba' onClick={() => {
                                            routeNavigator.push(`/editBook?id=${selectBook.id}`)
                                        }} />
                                        редактировать книгу
                                    </div>
                                }
                                {fetchedUser.id == selectBook.userInfo.id_vkontakte &&
                                    <div style={{ display: "flex", margin: "5px" }}>
                                        <Icon24DeleteOutline fill='#447bba' onClick={async () => {
                                            await deleteBookFx(idBook)
                                            routeNavigator.push('/');

                                        }} />
                                        удалить книгу из приложения
                                    </div>
                                }

                            </div>
                             {/* <div className="BookInfo_content_description">
                                {fetchedUser.id == selectBook.userInfo.id_vkontakte &&
                                    <div style={{ display: "flex", margin: "5px" }}>

                                        <Icon24HammerOutline fill='#447bba' onClick={() => {
                                            routeNavigator.push(`/editBook?id=${selectBook.id}`)
                                        }} />
                                        редактировать книгу
                                    </div>
                                }
                                {fetchedUser.id == selectBook.userInfo.id_vkontakte &&
                                    <div style={{ display: "flex", margin: "5px" }}>
                                        <Icon24DeleteOutline fill='#447bba' onClick={() => {
                                            // axios.get(`https://russcazak10.ru/web/index.php?r=api/deleteplaces&id_place=${idBook}`).then((res) => {
                                            //     console.log(res.data)
                                            // })
                                            // routeNavigator.push(`/`)
                                        }} />
                                        удалить книгу из приложения
                                    </div>
                                }
                               <div style={{ display: "flex", margin: "5px" }}>
                                        дата создания поста: {selectBook.dateCreate}
                                    </div>  

                            </div>*/}
                                <a target="_blank" rel="noopener noreferrer" href={`https://vk.com/id${selectBook.userInfo.id_vkontakte}`}>
                            <Button size="s" appearance="accent" onClick={()=>{
                            }}>
                                    Связаться с владельцем
                            </Button>
                                </a>
                        </div>

                    </Group>

                </div>

            </Panel >
        )
    }
    return (
        <Panel id={id}>

        </Panel>
    )


}

