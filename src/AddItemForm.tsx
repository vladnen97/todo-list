import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
            setTitle('');
        } else {
            setTitle('');
            setError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.key === 'Enter') {
            addItem();
        }
    };


    return (
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}> {error} </div>}
        </div>
    )
}