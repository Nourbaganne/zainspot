import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
    const [content, setContent] = useState('');

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            [{ 'bold': true }, { 'italic': true }, { 'underline': true }, { 'strike': true }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <div className="bg-background p-4 rounded-md shadow-sm">
            <div className="h-80">
                <ReactQuill
                    className="border-none"
                    theme="snow"
                    formats={[
                        'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet', 'indent', 'link', 'image', 'video', 'color', 'background', 'align'
                    ]}
                    placeholder="Enter text..."
                    modules={modules}
                    onChange={setContent}
                    value={content}
                    style={{ height: '85%' }}
                />
            </div>
        </div>
    );
};

export default TextEditor;
