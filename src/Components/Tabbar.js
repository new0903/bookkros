import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'

import {Icon24DocumentTextOutline ,Icon24LocationMapOutline,Icon24Search} from '@vkontakte/icons';
const TabBar = (activePanel)=>  {

	const routeNavigator = useRouteNavigator()
    return (
    <Tabbar >
        <TabbarItem text='Взять'  onClick={()=>{ routeNavigator.push('/')}}
            selected={activePanel=="home"}
            >
            <Icon24Search fill="#447bba"/>
        </TabbarItem>
        <TabbarItem text='Ваши книги'  onClick={()=>{routeNavigator.push('/userBook')}} selected={activePanel=="userBook"}>
            <Icon24DocumentTextOutline fill="#447bba"/>
        </TabbarItem>
        <TabbarItem text='Геолокация'  onClick={()=>{routeNavigator.push('/locationuser')
                }}
                selected={activePanel=="locationuser"}
                >
            <Icon24LocationMapOutline fill="#447bba" />
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