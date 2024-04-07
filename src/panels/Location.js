import React, { useState } from 'react';
import {
    Panel,
    CustomSelect,
    CustomSelectOption,
    Div,
    Group,
    Button
} from '@vkontakte/vkui'
import { getTowns } from '../api/requests';
import { setUserServerTown } from '../api/user';
import { useUnit } from 'effector-react';
import { $userServer } from '../store/user';
import { $towns } from '../store/towns';

// просто пример, города нужно будет взять, пока не знаю где
// const cities = [
//     { id: 1, name: 'Любой' },
//     { id: 2, name: 'Санкт-Петербург' },
//     { id: 3, name: 'Москва' },
//     { id: 4, name: 'Волгоград' },
//     { id: 5, name: 'Владивосток' },
//     { id: 6, name: 'Воронеж' },
//     { id: 7, name: 'Екатеринбург' },
//     { id: 8, name: 'Казань' },
//     { id: 9, name: 'Калининград' },
//     { id: 10, name: 'Краснодар' }
// ];

export function Location({ id, fetchedUser }) {
    //const [towns, userServer] = useUnit([$towns, $userServer]);

    const [value, setValue] = React.useState('');
    const [query, setQuery] = React.useState('');

    const [cities, setCities] = React.useState([
    ]);

    const [selectedCity, setSelectedCity] = React.useState([]);
    React.useEffect(() => {
        const getTown = async () => {
            const t = await getTowns();
            
            setSelectedCity(() => t.map(town => ({ value: town.id, label: town.label })))
          //  setSelectedCity(t)
            console.log(t)
           // console.log(towns)

        }
        getTown()
    }, []);
    const customSearchOptions = () => {
        console.log(3)
        const options = [...selectedCity];
        if (query.length > 0 && !options.find((town) => town.label === query)) {
            options.unshift({
                label: `Добавить город ${query}`,
                value: '0',
            });
            ///axios
        }
        return options;
    };

    const onCustomSearchChange = (e) => {
        console.log(1)
        if (e.target.value === '0') {
            setSelectedCity([...selectedCity, { label: query, value: query }]);
            setValue(query);
            console.log(query)
            // addTowns(query)
        } else {
            setValue(e.target.value);
            console.log(e.target.value)
        }
        setQuery('');
    };
    const onCustomSearchInputChange = (e) => {
        console.log(2)
        console.log(e.target.value)
        setQuery(e.target.value);
    };

    const customSearchFilter = (value, option) =>
        option.label.toLowerCase().includes(value.toLowerCase());


    const setUserTown =async (value)=>{
        const data={
            id: fetchedUser.id,
            town: value
        }
        console.log(data)
        //setUserServerTown(data);
    }

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

                <Div>
                    <Group style={{ marginBottom: "50px" }}>


                        {selectedCity.length > 0 &&
                            <CustomSelect
                                value={value}
                                placeholder="Введите название города"
                                searchable
                                options={customSearchOptions()}
                                onInputChange={onCustomSearchInputChange}
                                autoHideScrollbar
                                renderOption={({ option, ...restProps }) => (
                                    <CustomSelectOption
                                        style={option.value === '0' ? { color: 'var(--vkui--color_background_accent)' } : {}}
                                        {...restProps}
                                    >
                                        {option.label}
                                    </CustomSelectOption>
                                )}
                                onChange={onCustomSearchChange}
                            />}
                        <Button
                            size="l"
                            mode="primary"

                            onClick={() => {

                                setUserTown(value)
                            }}
                        >
                            Перейти в приложение
                        </Button>


                    </Group>
                </Div>
            </Panel>
        </>
    );
}

export default Location;

