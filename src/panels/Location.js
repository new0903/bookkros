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

export function Location({ id, fetchedUser }) {

    const [userServer] = useUnit([$userServer]);
    console.log(userServer);
    const [value, setValue] = React.useState('');
    const [query, setQuery] = React.useState('');

    const [selectedCity, setSelectedCity] = React.useState([]);
    const [serverCity, setServerCity] = React.useState([]);
    React.useEffect(() => {
        const getTown = async () => {
            const t = await getTowns();

            setSelectedCity(() => t.map(town => ({ value: town.id, label: town.label })))
            setServerCity(t)

            //  setSelectedCity(t)
            console.log(t)
            // console.log(towns)

        }
        getTown()
    }, []);

    React.useEffect(() => {

        const town = serverCity.find((town) => town.id == userServer.town_id)
        if (town) {
            //setQuery(town.label)
            setValue(town.label)
            setQuery(town.label)
            console.log(town.label)
            console.log(4)
        }
    }, [userServer,serverCity]);



    React.useEffect(() => {
    console.log(value)
    }, [value]);


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
        setQuery(e.target.value);
    };

    const customSearchFilter = (value, option) =>
        option.label.toLowerCase().includes(value.toLowerCase());


    const setUserTown = async (value) => {
        const data = {
            id: fetchedUser.id,
            town: value.value
        }
        console.log(data)
        setUserServerTown(data);
        setValue(value.label);
    }
    if (userServer) {
        
   
    return (
        <>

            <Panel id={id}>
                <Div>
                    <Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        {selectedCity.length > 0 &&
                            <CustomSelect
                                value={value}
                                placeholder="Введите название города"
                                defaultValue={value}
                                
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
                        <Button style={{ marginTop: '10px' }}
                            size="l"
                            mode="primary"

                            onClick={() => {

                                setUserTown(value)
                            }}
                        >
                            Сохранить и продолжить
                        </Button>


                    </Group>
                </Div>
            </Panel>
        </>
    ); }
}

export default Location;

