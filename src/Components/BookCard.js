import React from 'react'
import persik from '../assets/persik.png';
import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { setBookId } from '../store/book';
import { useUnit } from 'effector-react';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
//import { Icon16Like ,Icon16LikeOutline} from '@vkontakte/icons';
const BookCard = ({ Book, key }) => {
    const MAX_PRODUCT_CARD_SIZE = 220
    const routeNavigator = useRouteNavigator()
    const id = Number(Book.id)
    //   console.log(PlaceCard)
    //   console.log(key)
    let url = persik
    if (Object.keys(Book.photo)) {
        if(Book.photo.length>0){
            url = Book.photo
        }
        
        //console.log(PlaceCard.imgsFile)
    }

    return (
        <div  className="BookCard" onClick={() => {
            //setBookId(Book.id);
            routeNavigator.push(`/BookInfo?id=${id}`)//
        }}>
            <div className="BookCard_preview">
                <picture className="BookCard_preview_picture">
                    <source srcSet={url} type="image/webp"></source>
                    <img
                        src={url}
                        alt=""
                        width={MAX_PRODUCT_CARD_SIZE}
                        height={MAX_PRODUCT_CARD_SIZE}
                        className="BookCard_preview_picture_photo BookCard_preview_picture_photo__unload"
                    />
                </picture>
                <div style={{ position: "absolute", display: "flex", alignItems: "flex-end", height: "210px" }}>
                    <div style={{ width: "220px" }}>

                    </div>
                </div>

            </div>

            <div className="BookCard_bottom" >
                <div className="BookCard_info">
                    <div className="BookCard_title">{Book.name}</div>
                </div>
            </div>
        </div>
    )

}

export default BookCard
