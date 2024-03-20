import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'

import { Icon24User,Icon24Settings,Icon24BookSpreadOutline,Icon24LogoVk ,Icon24PhotosStackOutline,Icon24Home,Icon24LocationMapOutline,Icon24LikeOutline} from '@vkontakte/icons';
const TabBar = (activePanel)=>  {

	const routeNavigator = useRouteNavigator()
    return (
    <Tabbar >
        <TabbarItem text='Главный экран'  onClick={()=>{ routeNavigator.push('/')}}
            selected={activePanel=="home"}
            >
            <Icon24Home fill="#447bba"/>
        </TabbarItem>
        <TabbarItem text='Список книг'  onClick={()=>{routeNavigator.push('/')}} selected={activePanel=="home"}>
            <Icon24BookSpreadOutline fill="#447bba"/>
        </TabbarItem>
        <TabbarItem text='Найти книгу'  onClick={()=>{routeNavigator.push('/')
                }}
                selected={activePanel=="home"}
                >
            <Icon24Home fill="#447bba" />
        </TabbarItem>
    </Tabbar>)
    
}

export default TabBar





/*
<div className="app-aside">

            <div className='app-block-aside'>
                <img src={user} />
            </div>
            <div className='app-block-aside'>
                <img src={books} />
            </div>
            <div className='app-block-aside'>
                <img src={VKcom} />
            </div>
            <div className='app-block-aside'>
                <img src={customer} />
            </div>
            <div className='app-block-aside'>
                <img src={setting} />
            </div>
        </div>

*/