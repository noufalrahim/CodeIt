import { Editor } from '@monaco-editor/react'
import React from 'react'
import LanguageSelector from '../LanguageSelector';
import Console from '../Console';
import executeCode from '@/pages/api/ExecuteCode';
import Download from '../Download';
import { Languages } from '@/appConstants';
import InputBox from '../InputBox';

interface IProps {
  language: string;
  editorRef: any;
  value: string;
  onChange: any;
}

export default function index({
  language,
  editorRef,
  onChange,
  value
}: IProps) {

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  }



  return (
    <div className='w-full'>
        <Editor
          className='p-2 rounded-lg bg-[#333333] border-2 border-gray-800 w-full min-h-[37rem]'
          language={language}
          theme='vs-dark'
          onMount={onMount}
          value={value}
          onChange={onChange}
        />
    </div>
  )
}
