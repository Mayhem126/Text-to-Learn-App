import { CodeBlock, dracula } from 'react-code-blocks';

const Code = ({ language, text }) => {
    return (
        <CodeBlock
            text={text}
            language={language}
            showLineNumbers={true}
            theme={dracula}
        />
    );
};

export default Code;