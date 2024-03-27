import React, { useState } from 'react';

import {
    Panel, PanelHeader, Group, Button, FormItem, File, Input, Textarea, FormLayoutGroup, Div, Checkbox, ChipsSelect
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import axios from 'axios';
import { Icon24DeleteOutline, Icon24Camera, Icon24Document } from '@vkontakte/icons';
import { $books } from '../store/book';
import { $userServer } from '../store/user';
import { useUnit } from 'effector-react';



const ChipsSelectFormItem = ({ }) => {
    const colors = React.useMemo(
        () => [
            { value: 'red', label: 'Красный' },
            { value: 'blue', label: 'Синий' },
            { value: 'navarin', label: 'Наваринского пламени с дымом' },
        ],
        [],
    );
    const [selectedColorsCopy, setSelectedColorsCopy] = React.useState([]);

    return (
        <FormItem
            htmlFor="colorsWithoutButton"
            top="Выберите жанры"
        >
            <ChipsSelect
                id="colorsWithoutButton"
                value={selectedColorsCopy}
                onChange={setSelectedColorsCopy}
                options={colors}
                creatable={true}
                placeholder="Не выбраны"
            />
        </FormItem>
    );
};


export const EditBook = ({ id, nav, fetchedUser }) => {

    React.useEffect(() => {

    }, [])


    async function AddBook() {


    }




    // React.useEffect(() => {
    //     sendPlace()
    // }, place)

    return (
        <Panel id={id}>
            <PanelHeader>
                Обновить информацию о книге
            </PanelHeader>
            {fetchedUser &&
                <Group>


                    {fetchedUser.id ? (<FormLayoutGroup>

                        <FormItem top="ISBN книги" >
                            <Input
                                type="text"
                                align="left"
                                defaultValue={true}
                                placeholder="Название" onChange={(e) => setISBN(e.target.value)} />

                        </FormItem>
                        <FormItem top="Название книги">
                            <Input
                                type="text"
                                align="left"
                                defaultValue={true}
                                placeholder="Название" onChange={(e) => setName(e.target.value)} />
                        </FormItem>
                        <FormItem top="Описание книги ">
                            <Textarea placeholder="описание"
                                defaultValue={true}
                                onChange={(e) => {
                                    setISBN(e.target.value)
                                    console.log(e.target.value);
                                }}
                            />
                        </FormItem>

                        <ChipsSelectFormItem />
                        <FormItem>
                            <Checkbox defaultChecked={isMap ? true : false} onChange={(e) => {
                                setIsMap(e.target.checked)
                                console.log(e.target.checked)
                            }}>в книге есть повреждения</Checkbox>


                        </FormItem>
                        <FormItem top="Загрузите ваше фото">


                            <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                                (e) => {
                                    let image_as_files = e.target.files;

                                    // let image_as_base64 = URL.createObjectURL(e.target.files)
                                    setPhoto(image_as_files)
                                    setCounterFiles(image_as_files.length)
                                    console.log(photo)
                                }
                            } >
                                Открыть галерею
                            </File>
                            {counterFiles > 0 && <p>файлов загружено {counterFiles}</p>}
                        </FormItem>


                        <FormItem top="Загрузите ваше место">
                            <Button size="s" align='center' mode="secondary" onClick={() => {
                                if (!dataSend) {
                                    setDataSend(!dataSend)
                                    UpdatePlace()
                                }



                            }} >
                                обновить
                            </Button>
                        </FormItem>
                    </FormLayoutGroup>
                    ) : <Div>У вас нет доступа к форме редактирования</Div>}
                </Group >

            }
            {fetchedUser &&
                <Group>
                    Изображения которые уже есть в проекте
                    <div className='list-imgs' >

                        {oldPhoto && fetchedUser.id === idUser ? oldPhoto.map((item, index) => (
                            <div className='image-block'>
                                <Icon24DeleteOutline className='image-input' onClick={() => {
                                    axios.get(`https://russcazak10.ru/web/index.php?r=api%2Fdeletefiles&id_files=${item.id}`).then((res) => {
                                        console.log(res.data)
                                        let p = oldPhoto
                                        let img = p.imgsFile
                                        p = p.filter((el) => el.id !== item.id)
                                        setOldPhoto(p)
                                        // console.log(this.state.places)
                                        // this.forceUpdate()
                                    })
                                }} />
                                <img
                                    src={item.url}
                                    style={{ width: "125px", height: "125px" }}

                                />
                            </div>
                        )) : <Div>У вас нет доступа к фото проекта</Div>}
                    </div>
                </Group>}
        </Panel>
    )

}

export const AddBook = ({ id, nav, fetchedUser }) => {

    const [books, userServer] = useUnit([$books, $userServer]);
    const [newNameBook, setNewNameBook] = useState("");
    const [newAutor, setNewAutor] = useState("");
    const [newJaner, setNewJaner] = useState([]); 
    const [newPhoto, setNewPhoto] = useState("");
    const [newISBN, setNewISBN] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [Damaged, setDamaged] = useState(false);

    const addBook = async () => {
        const dataToCreatedNewBook = {
            name: newNameBook,
            autor: newAutor,
            janer: newJaner,
            photo: newPhoto,
            ISBN: newISBN,
            description: newDescription,
            isDamaged: Damaged,
            userId: userServer.id,
        };

        const dataBook = await createBookFx(dataToCreatedNewBook);

        if (dataBook) {
            setNewNameBook("");
            setNewAutor("");
            setNewJaner([]);
            setNewPhoto("");
            setNewISBN("");
            setNewDescription("");
            setDamaged(false);
        }
    };

    const handleChange = () => {
        setDamaged(!Damaged);
    }

    React.useEffect(() => {

    }, [])

    // React.useEffect(() => {
    //     sendPlace()
    // }, place)

    return (
        <Panel id={id}>
            <PanelHeader>
                Добавить книгу
            </PanelHeader>

            <FormLayoutGroup>

                <FormItem top="ISBN книги" >
                    <Input
                        type="text"
                        align="left"
                        defaultValue={true}
                        value={newISBN}
                        placeholder="Введите ISBN книги" onChange={(e) => { setNewISBN(e.target.value); }} />
                </FormItem>
                <FormItem top="Название книги">
                    <Input
                        type="text"
                        align="left"
                        defaultValue={true}
                        value={newNameBook}
                        placeholder="Введите текст максимум 70 символов" onChange={(e) => { setNewNameBook(e.target.value); }} />
                </FormItem>
                <FormItem top="Автор">
                    <Input
                        type="text"
                        align="left"
                        placeholder="Введите текст"
                        defaultValue={true}
                        value={newAutor}
                        onChange={(e) => { setNewAutor(e.target.value); }}
                    />
                </FormItem>

                <FormItem top="Описание книги ">
                    <Textarea placeholder="Введите текст максимум 400 символов"
                        defaultValue={true}
                        value={newDescription}
                        onChange={(e) => { setNewDescription(e.target.value); }}
                    />
                </FormItem>

                <ChipsSelectFormItem />
                <FormItem>
                    <Checkbox value={Damaged} onChange={handleChange}
                    >в книге есть повреждения</Checkbox>
                </FormItem>
                <FormItem top="Загрузите фото книги">
                    <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                        (e) => {
                            let image_as_files = e.target.files;

                            // let image_as_base64 = URL.createObjectURL(e.target.files)
                            //setPhoto(image_as_files)
                            // setCounterFiles(image_as_files.length)
                            console.log(photo)
                        }
                    } >
                        Добавить фото
                    </File>
                    {/*counterFiles > 0 && <p>файлов загружено {counterFiles}</p>*/}
                </FormItem>


                <FormItem top="Загрузите ваше место">
                    <Button size="s" align='center' mode="secondary" onClick={() => {
                        // if (!dataSend) {
                        //     setDataSend(!dataSend)
                        //     UpdatePlace()
                        // }
                    }} >
                        обновить
                    </Button>
                </FormItem>
                <Button stretched size="l" onClick={addBook}>
                    Добавить
                </Button>
            </FormLayoutGroup>

            {fetchedUser &&
                <Group>


                    {fetchedUser.id ? (<FormLayout>

                        <FormItem top="ISBN книги" >
                            <Input
                                type="text"
                                align="left"
                                defaultValue={true}
                                value={newISBN}
                                placeholder="Введите ISBN книги" onChange={(e) => { setNewISBN(e.target.value); }} />

                        </FormItem>
                        <FormItem top="Название книги">
                            <Input
                                type="text"
                                align="left"
                                defaultValue={true}
                                value={newNameBook}
                                placeholder="Введите текст максимум 70 символов" onChange={(e) => { setNewNameBook(e.target.value); }} />
                        </FormItem>
                        <FormItem top="Автор">
                            <Input
                                type="text"
                                align="left"
                                placeholder="Введите текст"
                                defaultValue={true}
                                value={newAutor}
                                onChange={(e) => { setNewAutor(e.target.value); }}
                            />
                        </FormItem>
                        <FormItem top="Описание книги ">
                            <Textarea placeholder="Введите текст максимум 400 символов"
                                defaultValue={true}
                                value={newDescription}
                                onChange={(e) => { setNewDescription(e.target.value); }}
                            />
                        </FormItem>

                        <ChipsSelectFormItem />
                        <FormItem>
                            <Checkbox defaultChecked={isMap ? true : false} onChange={(e) => {
                                setIsMap(e.target.checked)
                                console.log(e.target.checked)
                            }}>отображать на карте</Checkbox>
                        </FormItem>
                        <FormItem top="Загрузите фото книги">
                            <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                                (e) => {
                                    let image_as_files = e.target.files;

                                    // let image_as_base64 = URL.createObjectURL(e.target.files)
                                    setPhoto(image_as_files)
                                    setCounterFiles(image_as_files.length)
                                    console.log(photo)
                                }
                            } >
                                Открыть галерею
                            </File>
                            {counterFiles > 0 && <p>файлов загружено {counterFiles}</p>}
                        </FormItem>


                        <FormItem top="Загрузите ваше место">
                            <Button size="s" align='center' mode="secondary" onClick={() => {
                                if (!dataSend) {
                                    setDataSend(!dataSend)
                                    UpdatePlace()
                                }
                            }} >
                                обновить
                            </Button>
                        </FormItem>
                        <Button stretched size="l" onClick={addBook}>
                            Добавить
                        </Button>

                    </FormLayout>
                    ) : <Div>У вас нет доступа к форме редактирования</Div>}
                </Group >

            }
            {fetchedUser &&
                <Group>
                    Изображения которые уже есть в проекте
                    <div className='list-imgs' >

                        {oldPhoto && fetchedUser.id === idUser ? oldPhoto.map((item, index) => (
                            <div className='image-block'>
                                <Icon24DeleteOutline className='image-input' onClick={() => {
                                    axios.get(`https://russcazak10.ru/web/index.php?r=api%2Fdeletefiles&id_files=${item.id}`).then((res) => {
                                        console.log(res.data)
                                        let p = oldPhoto
                                        let img = p.imgsFile
                                        p = p.filter((el) => el.id !== item.id)
                                        setOldPhoto(p)
                                        // console.log(this.state.places)
                                        // this.forceUpdate()
                                    })
                                }} />
                                <img
                                    src={item.url}
                                    style={{ width: "125px", height: "125px" }}

                                />
                            </div>
                        )) : <Div>У вас нет доступа к фото проекта</Div>}
                    </div>
                </Group>}
        </Panel>
    )

}