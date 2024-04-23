import React from 'react'

import {
    Button,
    IconButton, ModalRoot, ModalPage, ModalPageHeader, FormLayoutGroup, Textarea, FormItem,
    Group
} from '@vkontakte/vkui';
//import './PlaceInfo.css'
import { useSearchParams, useRouteNavigator, createBrowserRouter } from '@vkontakte/vk-mini-apps-router'
import { Icon24HammerOutline, Icon24DeleteOutline, Icon16Like, Icon16LikeOutline, Icon24LikeOutline, Icon24Like, Icon24ReportOutline } from '@vkontakte/icons';
//import { Likes } from '../api/setLikes';
import axios from 'axios';






export const ReportModal = ({ fetchedUser, CloseModal }) => {

    const [params] = useSearchParams()
    const [reason, setReason] = React.useState('');
    //const [idBook, setBookId] = React.useState(0);
    const idBook= (Number(params.get('id') || 1))
    const handleReasonChange = (event) => {
        console.log(event.target.value)
        setReason(event.target.value);
    };
React.useEffect(()=>{
    console.log(reason)},[reason])
    console.log(idBook)
    const handleReport = (reason) => {
        
        var formData = new FormData();
        console.log(fetchedUser)
        //console.log(townid);
        formData.append('idBook', idBook)
        formData.append('reportedBy', fetchedUser.id)
        formData.append('messageReport', reason)
        // const reportData = {
        //     idBook: idBook,
        //     reportedBy: fetchedUser.id,
        //     messageReport: reason
        // };
        submitReport(formData);
    };
    const submitReport = async (reportData) => {
        try {
            // в беке нужно чтобы тут сохранялась жалоба 
            await axios.post('https://russcazak10.ru/web/index.php?r=api/reports', reportData);
        } catch (error) {
            console.error('Ошибка при отправке жалобы на книгу:', error);
        }
    };

    const handleSubmit = () => {
        if (reason.trim() !== '') {
            handleReport(reason);
            CloseModal()
        }
    };

    return (
        <Group>
            <FormLayoutGroup>
                <FormItem top="Описание">
                    <Textarea
                        value={reason}
                        onChange={handleReasonChange}
                        placeholder="Пожалуйста, укажите причину репорта..."
                    />
                </FormItem>

                <FormItem >
                    <Button onClick={handleSubmit}>Отправить</Button>

                </FormItem>
            </FormLayoutGroup>
        </Group>

    );
};