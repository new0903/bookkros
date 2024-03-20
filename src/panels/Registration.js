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

    // const handleInputChange = (event) => {
    //     setText(event.target.value);
    // };

    const addBook = async () => {
        if (!newNameBook.trim() || !newAutor.trim() || !newJaner.trim() || !newPhoto.trim()) return;

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
            setDamaged();
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
                    />
                </FormItem>
                <FormItem top="Автор">
                    <WriteBar
                        style={{ border: "1px solid #d7d7d7", borderRadius: "8px" }}
                        placeholder="Введите текст"
                        value={newAutor}
                    />
                </FormItem>
                <FormItem top="Жанр">
                    <ChipsSelect
                        value={newJaner}
                        placeholder="Выберите жанр (максимум 3)"
                        creatable="Выберите жанр"
                    //options={spisok} тут должен быть список жанров 
                    />
                </FormItem>
                <FormItem top="Обложка">
                    <Button stretched size="m">
                        Добавить фото
                    </Button>
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
                    />
                </FormItem>
                <FormItem top="Описание">
                    <WriteBar
                        style={{ border: "1px solid #d7d7d7", borderRadius: "8px" }}
                        placeholder="Введите текст максимум 400 символов"
                        value={newDescription}
                    />
                </FormItem>
                <FormItem top="ISBN">
                    <WriteBar
                        style={{ border: "1px solid #d7d7d7", borderRadius: "8px" }}
                        placeholder="Введите ISBN книги"
                        value={newISBN}
                    />
                </FormItem>
                <Checkbox onChange={handleChange} value={Damaged}>
                    Книга повреждена?
                </Checkbox>
                {Damaged ?
                <Div>на вашей книге будет указано, что она повреждена</Div>
                : <></>}
                <Button stretched size="l" onClick={addRecipe}>
                    Добавить
                </Button>
            </Group>
        </Panel>
    )
}