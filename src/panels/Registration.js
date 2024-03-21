import { Button, Checkbox, ChipsSelect, FormItem, Group, Panel, PanelHeader, WriteBar } from "@vkontakte/vkui"
import { useState } from "react";
import { createBookFx } from "../api/book";
import { $books } from "../store/book";
import { $userServer } from "../store/user";


export const RegistrationBook = ({ id }) => {
    const [books, userServer] = useUnit([$books, $userServer]);
    const [newNameBook, setNewNameBook] = useState("");
    const [newAutor, setNewAutor] = useState("");
    const [newJaner, setNewJaner] = useState([]);
    const [newPhoto, setNewPhoto] = useState("");
    const [newISBN, setNewISBN] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [Damaged, setDamaged] = useState(false);
    const [showErrorNameBook, setShowErrorNameBook] = useState(false);
    const [showErrorAutor, setShowErrorAutor] = useState(false);
    const [showErrorJaner, setShowErrorJaner] = useState(false);
    const [showErrorPhoto, setShowErrorPhoto] = useState(false);
    const [showErrorDescription, setShowErrorDescription] = useState(false);
    const [showErrorISBN, setShowErrorISBN] = useState(false);

    const resetErrorNameBook = () => {
        setShowErrorNameBook(false);
    };
    const resetErrorAutor = () => {
        setShowErrorAutor(false);
    };
    const resetErrorJaner = () => {
        setShowErrorJaner(false);
    };
    const resetErrorPhoto = () => {
        setShowErrorPhoto(false);
    }; 
    const resetErrorDescription = () => {
        setShowErrorDescription(false);
    }; 
    const resetErrorISBN = () => {
        setShowErrorISBN(false);
    };  
    const addBook = async () => {

        if (!newNameBook.trim()) {
            setShowErrorNameBook(true);
            return;
        }
        if (!newAutor.trim()) {
            setShowErrorAutor(true);
            return;
        }
        if (!newPhoto.trim()) {
            setShowErrorPhoto(true);
            return;
        }
        if (!newJaner.length === 0) {
            setShowErrorJaner(true);
            return;
        }
        if (!newDescription.trim()) {
            setShowErrorDescription(true);
            return;
        }
        
        const validateISBN = (isbn) => {
            if (!isbn.trim()) {
                return false;
            }
            // Дополнительная проверка на корректность ISBN может быть здесь
            
            return true;
        };
        if (validateISBN(newISBN) === false) {
            setShowErrorISBN(true);
            return;
        }

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
            setShowErrorNameBook(false);
            setShowErrorAutor(false);
            setShowErrorPhoto(false);
            setShowErrorJaner(false);
            setShowErrorDescription(false);
            setShowErrorISBN(false);
        }
    };

    const handleChange = () => {
        setDamaged(!Damaged);
    }

    return (
        <Panel id={id}>
            <PanelHeader>Добавление книги</PanelHeader>
            <Group>
                <FormItem top="Название">
                    <WriteBar
                        style={{ border: "1px solid #d7d7d7", borderRadius: "8px" }}
                        placeholder="Введите текст максимум 70 символов"
                        value={newNameBook}
                        onChange={(e) => {setNewNameBook(e.target.value); resetErrorNameBook();}}
                    />
                    {showErrorNameBook && (
                        <Div style={{ color: 'red' }}>Поле не заполнено или в нем привышено количество символов</Div>
                    )}
                </FormItem>

                <FormItem top="Автор">
                    <WriteBar
                        style={{ border: "1px solid #d7d7d7", borderRadius: "8px" }}
                        placeholder="Введите текст"
                        value={newAutor}
                        onChange={(e) => {setNewAutor(e.target.value); resetErrorAutor();}}
                    />
                    {showErrorAutor && (
                        <Div style={{ color: 'red' }}>Введите автора. Если не знаете ФИО автора, напишите «Автор неизвестен»</Div>
                    )}
                </FormItem>
                <FormItem top="Жанр">
                    <ChipsSelect
                        value={newJaner}
                        placeholder="Выберите жанр (максимум 3)"
                        creatable="Выберите жанр"
                        //options={spisok} тут должен быть список жанров 
                        onChange={(e) => {setNewJaner(e.target.value); resetErrorJaner();}}
                    />
                    {showErrorJaner && (
                        <Div style={{ color: 'red' }}>жанры не выбраны или выбрано больше 3-х жанров</Div>
                    )}
                </FormItem>
                <FormItem top="Обложка">
                    <Button stretched size="m" onClick={resetErrorPhoto()}>
                        Добавить фото
                    </Button>
                    {showErrorPhoto && (
                        <Div style={{ color: 'red' }}>Выберите фото</Div>
                    )}
                </FormItem>
                {uploadedImage && (
                    <CardGrid size="l">
                        <Card mode="outline">
                            <Image src={newPhoto} />
                        </Card>
                    </CardGrid>
                )}
                <FormItem top="Описание">
                    <WriteBar
                        style={{ border: "1px solid #d7d7d7", borderRadius: "8px" }}
                        placeholder="Введите текст максимум 400 символов"
                        value={newDescription}
                        onChange={(e) => {setNewDescription(e.target.value); resetErrorDescription();}}
                    />
                    {showErrorDescription && (
                        <Div style={{ color: 'red' }}>Поле не заполнено или в нем привышено количество символов</Div>
                    )}
                </FormItem>
                
                <FormItem top="ISBN">
                    <WriteBar
                        style={{ border: "1px solid #d7d7d7", borderRadius: "8px" }}
                        placeholder="Введите ISBN книги"
                        value={newISBN}
                        onChange={(e) => {setNewISBN(e.target.value); resetErrorISBN();}}
                    />
                    {showErrorISBN && (
                        <Div style={{ color: 'red' }}>Поле не заполнено или ISBN указан не корректно</Div>
                    )}
                </FormItem>
                <Checkbox onChange={handleChange} value={Damaged}>
                    Книга повреждена?
                </Checkbox>
                {Damaged ?
                    <Div>на вашей книге будет указано, что она повреждена</Div>
                    : <></>}
                <Button stretched size="l" onClick={addBook}>
                    Добавить
                </Button>
            </Group>
        </Panel>
    )
}