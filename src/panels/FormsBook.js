import React from 'react';
import { useUnit } from 'effector-react';
import {
    Panel, PanelHeader, Group, Button, FormItem, File, Input, Textarea, FormLayoutGroup, Div, Checkbox, ChipsSelect
} from '@vkontakte/vkui';
import { useSearchParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import axios from 'axios';
import { Icon24DeleteOutline, Icon24Camera, Icon24Document } from '@vkontakte/icons';





import { $books, $bookId, setBookId, filterBooks } from '../store/book';
import { $userServer } from '../store/user';
import { $janers } from '../store/janer';
import { getJaner } from '../api/requests';
import { getOneBook, createBookFx, putOneBook } from '../api/book';




const ChipsSelectJaner = ({ setJaners, currentJaners, bottom }) => {
    const janersServer = useUnit($janers);
    const [selectedJaners, setSelectedJaner] = React.useState(
        () => currentJaners.map(janer => ({ value: janer.id, label: janer.name }))
    );
    const [janersLocal, setJanersLocal] = React.useState(

        () => janersServer.map(janer => ({ value: janer.id, label: janer.name }))
    );

    React.useEffect(() => {

        const getData = async () => {
            const janers = await getJaner();

            setJanersLocal(() => janers.map(janer => ({ value: janer.id, label: janer.name })))
            console.log(janers)
            console.log(janersServer)
            console.log(currentJaners)

            //  if (currentJaners.length > 0) {
            //  setSelectedJaner()
            // }
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
    );
};








export const EditBook = ({ id, nav, fetchedUser }) => {

    const routeNavigator = useRouteNavigator();

    const [params] = useSearchParams()
    const [book, setBook] = React.useState(null);
    const userServer = useUnit($userServer);
    const idBook = Number(params.get('id') || 1);


    setBookId(idBook)

    const [ISBN, setISBN] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [isDamaged, setDamaged] = React.useState(null);
    const [janer, setJaners] = React.useState([]);
    const [autor, setAutor] = React.useState(null);
    const [photoUrl, setPhotoUrl] = React.useState(null);

    const [formErrors, setFormErrors] = React.useState({
        ISBN: false,
        name: false,
        autor: false,
        description: false,
        photo: false,
        janer: false
    });

    React.useEffect(() => {
        GetBook()
    }, [idBook])
    React.useEffect(() => {
        console.log(janer)
    }, [janer])

    function check_ean13(str) {
        var kof = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1];
        var sum = 0;
        for (i = 0; i < 13; i++) {
            sum = sum + (str.charCodeAt(i) - 48) * kof[i];
        }
        return (sum % 10);
    }
    function is978(str) {
        if (str[0] != '9') return false;
        if (str[1] != '7') return false;
        if (str[2] != '8') return false;
        return true;
    }
    function check_ean12(str) {
        var kof = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1];
        var sum = 0;
        for (i = 0; i < 12; i++) {
            sum = sum + (str.charCodeAt(i) - 48) * kof[i];
        }
        ost = sum % 10;
        if (ost > 0) ost = 10 - ost;
        return (ost);
    }
    const find = () => {
        const len = ISBN.length;
        if (len !== 12 && len !== 13) {
            return false;
        }
        if (!is978(ISBN)) {
            return false;
        }
        if (len === 12) {
            const res = check_ean12(ISBN);
            // сдесь если ISBN вверный 
            return true;
        } else if (len === 13) {
            const res = check_ean13(ISBN);
            if (res === 0) {
                // сдесь если ISBN вверный 
                return true;
            } else {
                return false;
            }
        }
    };

    const validateForm = () => {
        const errors = {
            ISBN: !ISBN || find(),
            name: !name || name.length > 90,
            autor: !autor,
            description: !description || description.length > 400,
            photo: false,
            janer: janer.length < 2
        };
        setFormErrors(errors);
        return !Object.values(errors).some((error) => error);
    };



    const GetBook = async () => {
        const currentBook = await getOneBook(fetchedUser.id, idBook);//userServer.id
        setBook(currentBook);
        setISBN(currentBook.ISBN);
        setName(currentBook.name);
        setDescription(currentBook.description);
        setDamaged(currentBook.isDamaged);
        setJaners(currentBook.janer);
        setAutor(currentBook.autor.name_autor);

    }
    const UpdateBook = async () => {
        if (validateForm()) {
            var formData = new FormData();
            formData.append('id', idBook)//если обновлять книгу то отправляем это
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
            const result = await putOneBook(formData)
            console.log(result);
            routeNavigator.push('/userBook');
        }
    }

    if (book == null) {
        return <Panel id={id}></Panel>
    }
    return (
        <Panel id={id}>
            <PanelHeader>
                Обновить информацию о книге
            </PanelHeader>
            {fetchedUser &&
                <Group>
                    <Div>
                        {fetchedUser.id == book.userInfo.id_vkontakte ? (<FormLayoutGroup>
                            <FormItem top="Название" bottom={formErrors.name && 'Введите название книги'}>
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={name}
                                    placeholder="Название" onChange={(e) => setName(e.target.value)} />
                            </FormItem>
                            <FormItem top="Автор" bottom={formErrors.autor && 'Введите автора. Если не знаете ФИО автора, напишите «Автор неизвестен»'}>
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={autor}
                                    placeholder="Автор" onChange={(e) => setAutor(e.target.value)} />
                            </FormItem>
                            <FormItem
                                htmlFor="colorsWithoutButton"
                                top="Выберите жанры"
                                bottom={
                                    formErrors.janer &&
                                    'Выберите не более трех жанров'
                                }
                            >
                                <ChipsSelectJaner currentJaners={janer} setJaners={setJaners} />

                            </FormItem>
                            <FormItem top="Обложка" bottom={formErrors.photo && 'Загрузите фото'}>
                                <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                                    (e) => {
                                        let image_as_files = e.target.files[0];
                                        // let image_as_base64 = URL.createObjectURL(e.target.files)
                                        setPhoto(image_as_files)
                                        setPhotoUrl(URL.createObjectURL(image_as_files));
                                        //  setCounterFiles(image_as_files.length)
                                        console.log(photo)
                                    }
                                } >
                                    Добавить фото
                                </File>
                            </FormItem>
                            <FormItem>
                                <div>{photoUrl ? <img src={photoUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} /> : null}</div>
                            </FormItem>
                            <FormItem top="Описание" bottom={formErrors.description && 'Ошибка описания'}>
                                <Textarea placeholder="описание"
                                    defaultValue={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                        console.log(e.target.value);
                                    }}
                                />
                            </FormItem>
                            <FormItem top="ISBN книги" bottom={formErrors.ISBN && 'Введите корректный ISBN'}>
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
                            <FormItem>
                                <Button size="s" align='center' mode="secondary" onClick={() => {
                                    // if (!dataSend) {
                                    //  setDataSend(!dataSend)
                                    UpdateBook()
                                    // }
                                }} >
                                    Сохранить
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


    const routeNavigator = useRouteNavigator();

    const [ISBN, setISBN] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [isDamaged, setDamaged] = React.useState(null);
    const [janer, setJaners] = React.useState([]);
    const [autor, setAutor] = React.useState(null);

    const [photoUrl, setPhotoUrl] = React.useState(null);

    const [formErrors, setFormErrors] = React.useState({
        ISBN: false,
        name: false,
        autor: false,
        description: false,
        photo: false,
        janer: false
    });

    React.useEffect(() => {
        console.log(janer)
    }, [janer])


    function check_ean13(str) {
        var kof = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1];
        var sum = 0;
        for (i = 0; i < 13; i++) {
            sum = sum + (str.charCodeAt(i) - 48) * kof[i];
        }
        return (sum % 10);
    }
    function is978(str) {
        if (str[0] != '9') return false;
        if (str[1] != '7') return false;
        if (str[2] != '8') return false;
        return true;
    }
    function check_ean12(str) {
        var kof = [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1];
        var sum = 0;
        for (i = 0; i < 12; i++) {
            sum = sum + (str.charCodeAt(i) - 48) * kof[i];
        }
        ost = sum % 10;
        if (ost > 0) ost = 10 - ost;
        return (ost);
    }
    const find = () => {
        const len = ISBN.length;
        if (len !== 12 && len !== 13) {
            return false;
        }
        if (!is978(ISBN)) {
            return false;
        }
        if (len === 12) {
            const res = check_ean12(ISBN);
            // сдесь если ISBN вверный 
            return true;
        } else if (len === 13) {
            const res = check_ean13(ISBN);
            if (res === 0) {
                // сдесь если ISBN вверный 
                return true;
            } else {
                return false;
            }
        }
    };

    const validateForm = () => {
        const errors = {
            ISBN: !ISBN || find(),
            name: !name || name.length > 90,
            autor: !autor,
            description: !description || description.length > 400,
            photo: false,
            janer: janer.length < 2
        };
        setFormErrors(errors);
        return !Object.values(errors).some((error) => error);
    };

    async function AddBook() {
        if (validateForm()) {
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
            const result = await createBookFx(formData)
            console.log(result);
            routeNavigator.push('/userBook');
        }
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

                            <FormItem top="ISBN книги" bottom={formErrors.ISBN && 'Введите корректный ISBN'}>
                                <Input
                                    type="text"
                                    value={ISBN}
                                    placeholder="ISBN"
                                    onChange={(e) => setISBN(e.target.value)}
                                />
                            </FormItem>
                            <FormItem top="Название книги" bottom={formErrors.name && 'Введите название книги'}>
                                <Input
                                    type="text"
                                    value={name}
                                    placeholder="Название"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormItem>
                            <FormItem top="Автор книги" bottom={formErrors.autor && 'Введите автора. Если не знаете ФИО автора, напишите «Автор неизвестен»'}>
                                <Input
                                    type="text"
                                    value={autor}
                                    placeholder="Автор"
                                    onChange={(e) => setAutor(e.target.value)}
                                />
                            </FormItem>
                            <FormItem top="Описание книги" bottom={formErrors.description && 'Ошибка описания'}>
                                <Textarea
                                    value={description}
                                    placeholder="Описание"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormItem>
                            <FormItem
                                htmlFor="colorsWithoutButton"
                                top="Выберите жанры"
                                bottom={
                                    formErrors.janer &&
                                    'Выберите не более трех жанров'
                                }
                            >
                                <ChipsSelectJaner currentJaners={janer} setJaners={setJaners} />
                            </FormItem>
                            <FormItem >
                                <Checkbox defaultChecked={isDamaged ? true : false} onChange={(e) => {
                                    setDamaged(e.target.checked)
                                    console.log(e.target.checked)
                                }}>в книге есть повреждения</Checkbox>
                            </FormItem>
                            <FormItem top="Загрузите ваше фото" bottom={formErrors.photo && 'Загрузите фото'}>
                                <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                                    (e) => {
                                        let image_as_files = e.target.files[0];

                                        // let image_as_base64 = URL.createObjectURL(e.target.files)
                                        setPhoto(image_as_files)

                                        setPhotoUrl(URL.createObjectURL(image_as_files));
                                        //  setCounterFiles(image_as_files.length)
                                        console.log(photo)
                                    }
                                } >
                                    загрузить файл
                                </File>
                            </FormItem>
                            <FormItem>
                                <div>{photoUrl ? <img src={photoUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} /> : null}</div>
                            </FormItem>
                            <FormItem>
                                <Button size="s" align='center' mode="secondary" onClick={() => {
                                    // if (!dataSend) {
                                    //  setDataSend(!dataSend)
                                    AddBook()
                                    // }
                                }} >
                                    Добавить книгу
                                </Button>
                            </FormItem>
                        </FormLayoutGroup>
                    </Div>
                </Group >

            }
        </Panel>
    )

}














/*
export const AddBook = ({ id, nav, fetchedUser }) => {

    const history = useRouteNavigator() 

    const [ISBN, setISBN] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [photoUrl, setPhotoUrl] = React.useState(null);
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
            Добавление книги
            </PanelHeader>
            {fetchedUser &&
                <Group>
                    <Div>
                        <FormLayoutGroup>
                        <FormItem top="Название">
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={name}
                                    placeholder="Название" onChange={(e) => setName(e.target.value)} />
                            </FormItem>
                            <FormItem top="Автор">
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={autor}
                                    placeholder="Автор" onChange={(e) => setAutor(e.target.value)} />
                            </FormItem>
                            <ChipsSelectJaner currentJaners={janer} setJaners={setJaners} />
                            <FormItem top="Обложка">
                                <File before={<Icon24Camera role="presentation" />} multiple size="m" a onChange={
                                    (e) => {
                                        let image_as_files = e.target.files[0];

                                        // let image_as_base64 = URL.createObjectURL(e.target.files)
                                        setPhoto(image_as_files)
                                        //  setCounterFiles(image_as_files.length)
                                        setPhotoUrl(URL.createObjectURL(image_as_files));
                                        console.log(photo)
                                    }
                                } >
                                    Добавить фото
                                </File>
                            </FormItem>
                            <FormItem>
                                <div>{photoUrl ? <img src={photoUrl} style={{ maxWidth: '100%', maxHeight: '100%' }} /> : null}</div>
                            </FormItem>
                            <FormItem top="ISBN" >
                                <Input
                                    type="text"
                                    align="left"
                                    defaultValue={ISBN}
                                    placeholder="Название" onChange={(e) => setISBN(e.target.value)} />

                            </FormItem>
                            <FormItem top="Описание">
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
                            <FormItem>
                                <Button size="s" align='center' mode="secondary" onClick={() => {
                                    // if (!dataSend) {
                                    //  setDataSend(!dataSend)
                                    AddBook()

                                    // }
                                }} >
                                    Сохранить
                                </Button>
                            </FormItem>
                        </FormLayoutGroup>
                    </Div>
                </Group >
            }
        </Panel>
    )

}



*/


