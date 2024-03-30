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
    Avatar
} from '@vkontakte/vkui';
//import './PlaceInfo.css'
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Icon24HammerOutline, Icon24DeleteOutline, Icon16Like, Icon16LikeOutline, Icon24LikeOutline, Icon24Like } from '@vkontakte/icons';
//import { Likes } from '../api/setLikes';
import axios from 'axios';
import { $books ,$bookId,setBookId,filterBooks } from '../store/book';
import { $userServer } from '../store/user';
import { getOneBook } from '../api/book';
import { useUnit } from 'effector-react';
import './BookInfo.css'



export const BookInfo = ({ id, nav, fetchedUser }) => {
    // const [books, userServer] = useUnit([$books, $userServer]);
    // const [params] = useSearchParams()
    // const routeNavigator = useRouteNavigator()
    // const idBook = Number(params.get('id') || 1);

    // const [book, setBook] = React.useState(null)
    // console.log(idBook)

    const [params] = useSearchParams()
    const [isEditing, setIsEditing] =  React.useState(false);
    const [book, setBook] =  React.useState(null);
    const userServer = useUnit($userServer);
    //const bookId = useUnit($bookId);
    const idBook = Number(params.get('id') || 1);
    setBookId(idBook)


    React. useEffect(() => {
      const getCurrentTask = async () => {
        const currentBook = await getOneBook(123, idBook);//userServer.id
        setBook(currentBook);
      }
      getCurrentTask();
    }, [idBook]);
  
    



    if (book) {
        
        let imgs=false;
        console.log(book)
        const selectBook = book; ///.find((element) => element.id === idPlace)
        if (Object.keys(selectBook.photo)) {
            
            if(selectBook.photo.length>0){
                imgs=true
            }
            
            //console.log(PlaceCard.imgsFile)
        }
        return (

            <Panel id={id}>
                <div className="BookInfoPage">
                    <PanelHeader
                    >
                        Место
                    </PanelHeader>

                    <Group>
                       

                        <div className="BookInfo">
                            {imgs&&
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

                            <div className="BookInfo_content">
                                <div >
                                     <Cell
                                        before={selectBook.userInfo.photo_200 ? <Avatar src={selectBook.userInfo.photo_200} /> : null}
                                    >
                                        {`${selectBook.userInfo.first_name} ${selectBook.userInfo.last_name}`} автор
                                    </Cell> 

                                </div>
                                <div className="BookInfo_content_title">{selectBook.name}</div>
                                <div className="BookInfo_content_price" >
                                    {selectBook.ISBN}
                                </div>
                                <div className="BookInfo_content_description">
                                     {isEditing &&
                                        <div style={{ display: "flex", margin: "5px" }}>

                                            <Icon24HammerOutline fill='#447bba' onClick={() => {
                                                routeNavigator.push(`/editBook?id=${selectBook.id}`)
                                            }} />
                                            редактировать книгу
                                        </div>
                                    } 
                                    {isEditing &&
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
                                        относится к жанрам: 
                                        {selectBook.janer.map((janer) => {
                                            return (`${janer.name}, `)
                                        })}
                                    </div>


                                    {/* <div style={{ display: "flex", margin: "5px" }}>
                                        дата создания поста: {selectBook.dateCreate}
                                    </div>  */}

                                </div>
                            </div>
                        </div>
                    </Group>
                    <Group>
                        <div className='content'>
                             { selectBook.description ? selectBook.description : ''} 
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

