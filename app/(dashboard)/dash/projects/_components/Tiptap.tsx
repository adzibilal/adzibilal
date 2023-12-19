'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    CgFormatBold,
    CgFormatItalic,
    CgFormatStrike,
    CgCode,
} from 'react-icons/cg'

import {BsTypeH1, BsTypeH2} from 'react-icons/bs'
import './style.css'

interface TiptapProps {
    initialContent?: string;
    onContentChange?: (content: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({initialContent, onContentChange}) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: initialContent || '<p>Hello World! 🌎️ apwodkapowkd</p>',
        onUpdate: ({ editor }) => {
            const newContent = editor.getHTML();
            onContentChange && onContentChange(newContent);
        },
    })

    return (
        <div className='border border-zinc-100 pb-3 rounded-lg'>
            {editor && (
                <div className='flex items-center border-b border-zinc-100 px-3'>
                    <div
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className={`w-7 h-7 flex items-center justify-center text-lg cursor-pointer ${
                            editor.isActive('bold') ? 'bg-zinc-100' : 'bg-white'
                        }`}>
                        <CgFormatBold />
                    </div>
                    <div
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className={`w-7 h-7 flex items-center justify-center text-lg cursor-pointer ${
                            editor.isActive('italic')
                                ? 'bg-zinc-100'
                                : 'bg-white'
                        }`}>
                        <CgFormatItalic />
                    </div>
                    <div
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        className={`w-7 h-7 flex items-center justify-center text-lg cursor-pointer ${
                            editor.isActive('strike')
                                ? 'bg-zinc-100'
                                : 'bg-white'
                        }`}>
                        <CgFormatStrike />
                    </div>
                    <div
                        onClick={() =>
                            editor.chain().focus().toggleCode().run()
                        }
                        className={`w-7 h-7 flex items-center justify-center text-lg cursor-pointer ${
                            editor.isActive('code') ? 'bg-zinc-100' : 'bg-white'
                        }`}>
                        <CgCode />
                    </div>
                    <div className="w-[1px] h-7 bg-zinc-100 mx-2"></div>
                    <div
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 1 }).run()
                        }
                        className={`w-7 h-7 flex items-center justify-center text-lg cursor-pointer ${
                            editor.isActive('heading', { level: 1 }) ? 'bg-zinc-100' : 'bg-white'
                        }`}>
                        <BsTypeH1 />
                    </div>
                    <div
                        onClick={() =>
                            editor.chain().focus().toggleHeading({ level: 2 }).run()
                        }
                        className={`w-7 h-7 flex items-center justify-center text-lg cursor-pointer ${
                            editor.isActive('heading', { level: 2 }) ? 'bg-zinc-100' : 'bg-white'
                        }`}>
                        <BsTypeH2 />
                    </div>
                </div>
            )}
            <div className='p-3'>
                <EditorContent className='focus:outline-none' editor={editor} />
            </div>
        </div>
    )
}

export default Tiptap
