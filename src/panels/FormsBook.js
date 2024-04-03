import React from 'react';
import { useUnit } from 'effector-react';
import {
    Panel, PanelHeader, Group, Button, FormItem, File, Input, Textarea, FormLayoutGroup, Div, Checkbox, ChipsSelect
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import axios from 'axios';
import { Icon24DeleteOutline, Icon24Camera, Icon24Document } from '@vkontakte/icons';
import { $userServer } from '../store/user';
import { $janers } from '../store/janer';
import { getJaner } from '../api/requests';
import { getOneBook, createBookFx, putOneBook } from '../api/book';

const ChipsSelectJaner = ({ setJaners, currentJaners }) => {
    const janersServer = useUnit($janers);
    const [selectedJaners, setSelectedJaner] = React.useState([]);
    const [janersLocal, setJanersLocal] = React.useState(

        () => janersServer.map(janer => ({ value: janer.id, label: janer.name }))
    );

    React.useEffect(() => {

        const getData = async () => {
            const janers = await getJaner();

            setJanersLocal(() => janers.map(janer => ({ value: janer.id, label: janer.name })))
            console.log(janers)
            console.log(janersServer)

            if (currentJaners.length>0) {
                setSelectedJaner(() => currentJaners.map(janer => ({ value: janer.id, label: janer.name })))
            }
        }

        if (janersServer.length < 1) {


            getData()

        }
    }, [])

    // React.useEffect(() => {
    //     console.log(selectedJaners)
    //     setJaners(selectedJaners)
    // }, [selectedJaners])


    console.log(janersLocal)

    console.log(selectedJaners)
    return (
        <FormItem
            htmlFor="colorsWithoutButton"
            top="Выберите жанры"
        >
            <ChipsSelect
                id="colorsWithoutButton"
                value={selectedJaners}
                onChange={(j) => {
                    setJaners(j)
                    setSelectedJaner(j)
                }}
                options={janersLocal}
                creatable={true}
                placeholder="Не выбраны"
            />
        </FormItem>
    );
};


export const EditBook = ({ id, nav, fetchedUser }) => {

    const [params] = useSearchParams()
    const [book, setBook] = React.useState(null);
    const userServer = useUnit($userServer);
    const idBook = Number(params.get('id') || 1);



    const [ISBN, setISBN] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [isDamaged, setDamaged] = React.useState(null);
    const [janer, setJaners] = React.useState([]);
    const [autor, setAutor] = React.useState(null);



    React.useEffect(() => {
        GetBook()
    }, [idBook])
    React.useEffect(() => {
        console.log(janer)
    }, [janer])


    const GetBook = async () => {
        const currentBook = await getOneBook(fetchedUser.id, idBook);//userServer.id
        setBook(currentBook);
        setISBN(currentBook.ISBN);
        setName(currentBook.name);
        setDescription(currentBook.description);
        setDamaged(currentBook.isDamaged);
        setJaners(currentBook.janers);
        setAutor(currentBook.autor.name_autor);
    }
    const UpdateBook = async () => {
        var formData = new FormData();
        formData.append('id', idBook)//если обновлять книгу то отправляем это
        formData.append('ISBN', ISBN)
        formData.append('name', name)
        formData.append('description', description) //необязательно отправлять может быть пустым
        formData.append('isDamaged', isDamaged ? 1 : 0) // 0 или 1
        var ins = janer.length;
        for (var x = 0; x < ins; x++) {
            formData.append("janers[]", janer[x]); //загружаем в форму id жанров должен быть хотя бы 1 жанр
        }
        formData.append('file', photo) // сюда загружаем 1 файл, не обязательно
        formData.append('user_id', fetchedUser.id)//id пользователя ОБЯЗАТЕЛЬНО
        formData.append('autor_id', autor)//id автора, или просто передать ФИО автора, если на сервер не найдется то добавится новый автор. 
        const result=  await putOneBook(formData)
        console.log(result);
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
                    <Div>
                        {fetchedUser.id == book.userInfo.id ? (<FormLayoutGroup>
                            <FormItem top="Название книги">
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={name}
                                    placeholder="Название" onChange={(e) => setName(e.target.value)} />
                            </FormItem>
                            <FormItem top="Автор книги">
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={autor}
                                    placeholder="Автор" onChange={(e) => setAutor(e.target.value)} />
                            </FormItem>
                            <ChipsSelectJaner currendJaners={janer} setJaners={setJaners} />
                            <FormItem top="Загрузите фото книги">
                                <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                                    (e) => {
                                        let image_as_files = e.target.files[0];
                                        // let image_as_base64 = URL.createObjectURL(e.target.files)
                                        setPhoto(image_as_files)
                                        //  setCounterFiles(image_as_files.length)
                                        console.log(photo)
                                    }
                                } >
                                    загрузить файл
                                </File>
                            </FormItem>
                            <FormItem top="Описание книги ">
                                <Textarea placeholder="описание"
                                    defaultValue={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                        console.log(e.target.value);
                                    }}
                                />
                            </FormItem>
                            <FormItem top="ISBN книги" >
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={ISBN}
                                    placeholder="Название" onChange={(e) => setISBN(e.target.value)} />

                            </FormItem>
                            <FormItem>
                                <Checkbox defaultChecked={isDamaged ? true : false} onChange={(e) => {
                                    setDamaged(e.target.checked)
                                    console.log(e.target.checked)
                                }}>в книге есть повреждения</Checkbox>
                            </FormItem>
                            
                            <FormItem top="Обновить книгу">
                                <Button size="s" align='center' mode="secondary" onClick={() => {
                                    // if (!dataSend) {
                                    //  setDataSend(!dataSend)
                                    UpdateBook()
                                    // }
                                }} >
                                    обновить
                                </Button>
                            </FormItem>
                        </FormLayoutGroup>
                        ) : <Div>У вас нет доступа к форме редактирования</Div>}
                    </Div>
                </Group >

            }
        </Panel>
    )

}

export const AddBook = ({ id, nav, fetchedUser }) => {

    const history = useRouteNavigator() 

    const [ISBN, setISBN] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [isDamaged, setDamaged] = React.useState(null);
    const [janer, setJaners] = React.useState([]);
    const [autor, setAutor] = React.useState(null);

    React.useEffect(() => {
        console.log(janer)
    }, [janer])
    async function AddBook() {

       

        var formData = new FormData();
        formData.append('ISBN', ISBN)
        formData.append('name', name)
        formData.append('description', description) //необязательно отправлять может быть пустым
        formData.append('isDamaged', isDamaged ? 1 : 0) // 0 или 1
        var ins = janer.length;
        for (var x = 0; x < ins; x++) {
            formData.append("janers[]", janer[x].value); //загружаем в форму id жанров должен быть хотя бы 1 жанр
        }
        formData.append('file', photo) // сюда загружаем 1 файл, не обязательно
        formData.append('user_id', fetchedUser.id)//id пользователя ОБЯЗАТЕЛЬНО
        formData.append('autor_id', autor)//id автора, или просто передать ФИО автора, если на сервер не найдется то добавится новый автор. 
        const result=await createBookFx(formData)
        console.log(result);

        /*--------------тут перекидывание на новый экран + анимацию небольшую думаю ддобавить---------------*/

        setTimeout(() => {
            history.push('/userBook'); // Перекидываем на новый экран
          }, 400);
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
                    <Div>
                        <FormLayoutGroup>
                        <FormItem top="Название книги">
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={name}
                                    placeholder="Название" onChange={(e) => setName(e.target.value)} />
                            </FormItem>
                            <FormItem top="Автор книги">
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={autor}
                                    placeholder="Автор" onChange={(e) => setAutor(e.target.value)} />
                            </FormItem>
                            <ChipsSelectJaner currentJaners={janer} setJaners={setJaners} />
                            <FormItem top="Загрузите фото книги">
                                <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                                    (e) => {
                                        let image_as_files = e.target.files[0];

                                        // let image_as_base64 = URL.createObjectURL(e.target.files)
                                        setPhoto(image_as_files)
                                        //  setCounterFiles(image_as_files.length)
                                        console.log(photo)
                                    }
                                } >
                                    загрузить файл
                                </File>
                            </FormItem>
                            <FormItem top="ISBN книги" >
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={ISBN}
                                    placeholder="Название" onChange={(e) => setISBN(e.target.value)} />

                            </FormItem>
                            <FormItem top="Описание книги ">
                                <Textarea placeholder="описание"
                                    defaultValue={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                        console.log(e.target.value);
                                    }}
                                />
                            </FormItem>
                            <FormItem>
                                <Checkbox defaultChecked={isDamaged ? true : false} onChange={(e) => {
                                    setDamaged(e.target.checked)
                                    console.log(e.target.checked)
                                }}>в книге есть повреждения</Checkbox>
                            </FormItem>
                            <FormItem top="Загрузить книгу">
                                <Button size="s" align='center' mode="secondary" onClick={() => {
                                    // if (!dataSend) {
                                    //  setDataSend(!dataSend)
                                    AddBook()

                                    // }
                                }} >
                                    обновить
                                </Button>
                            </FormItem>
                        </FormLayoutGroup>
                    </Div>
                </Group >
            }
        </Panel>
    )

}