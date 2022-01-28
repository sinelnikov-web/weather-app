import React, {FormEvent, HTMLProps} from 'react';

interface IFormProps {
    onSubmit: (event: FormEvent) => void,
}

const Form: React.FC<IFormProps & HTMLProps<HTMLFormElement>> = ({onSubmit, children, ...props}) => {

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSubmit(event)
    }

    return (
        <form onSubmit={handleSubmit} {...props}>
            {children}
        </form>
    );
};

export default Form;