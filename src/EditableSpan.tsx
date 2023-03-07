import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const activateEditModeHandler = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewModeHandler = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewModeHandler()
        }
    }

    return (
        editMode
            ? <input type="text"
                     value={title}
                     autoFocus
                     onBlur={activateViewModeHandler}
                     onChange={onTitleChangeHandler}
                     onKeyDown={onEnterPressHandler}
            />
            : <span onDoubleClick={activateEditModeHandler}> {props.title} </span>
    )
}