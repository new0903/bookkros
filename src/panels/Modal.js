import React from 'react'

import {
    Button,
    IconButton, ModalRoot, ModalPage, ModalPageHeader, FormLayoutGroup, Textarea,
    Group
} from '@vkontakte/vkui';
//import './PlaceInfo.css'
import { useSearchParams, useRouteNavigator, createBrowserRouter } from '@vkontakte/vk-mini-apps-router'
import { Icon24HammerOutline, Icon24DeleteOutline, Icon16Like, Icon16LikeOutline, Icon24LikeOutline, Icon24Like, Icon24ReportOutline } from '@vkontakte/icons';
//import { Likes } from '../api/setLikes';
import axios from 'axios';
import { ReportModal } from '../Components/ModalPage'





export const Modal = ({ fetchedUser, setActiveModal, activeModal }) => {


    const CloseModal = () => {
        setActiveModal(null)
    }
    return (
        <ModalRoot onClose={CloseModal} activeModal={activeModal}>
            <ModalPage
                id="report"
                onClose={CloseModal}
                header={
                    <ModalPageHeader>
                        Пожаловаться
                    </ModalPageHeader>
                }
            >
                <ReportModal CloseModal={CloseModal} fetchedUser={fetchedUser}  />
            </ModalPage>
        </ModalRoot>
    );
};