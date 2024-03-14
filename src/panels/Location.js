import React, { useState } from 'react';
import { Select, Panel } from '@vkontakte/vkui';

// просто пример, города нужно будет взять, пока не знаю где
const cities = [
    { id: 1, name: 'Любой' },
    { id: 2, name: 'Санкт-Петербург' },
    { id: 3, name: 'Москва' },
    { id: 4, name: 'Волгоград' },
    { id: 5, name: 'Владивосток' },
    { id: 6, name: 'Воронеж' },
    { id: 7, name: 'Екатеринбург' },
    { id: 8, name: 'Казань' },
    { id: 9, name: 'Калининград' },
    { id: 10, name: 'Краснодар' }
];

function Location({ id, fetchedUser }) {
    const [selectedCity, setSelectedCity] = useState(null);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        console.log('Выбран город:', event.target.value);
        // тут можно обрабатывать выбор города 
    };

    return (
        <>
            <Panel id={id}>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    //backgroundImage: `url('background.jpg')`, хз как взять из макета 
                    backgroundSize: 'cover',
                    zIndex: -1
                }} />
                <Select
                    id="citySelect"
                    placeholder="Выберите город"
                    value={selectedCity}
                    onChange={handleCityChange}
                    options={cities.map(city => ({ value: city.name, label: city.name }))}
                />
            </Panel>
        </>
    );
}

export default Location;

