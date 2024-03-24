import { Editor } from '@monaco-editor/react'
import React from 'react'
import LanguageSelector from '../LanguageSelector';
import Console from '../Console';
import executeCode from '@/pages/api/ExecuteCode';
import Download from '../Download';
import { Languages } from '@/appConstants';

export default function index() {
  const [value, setValue] = React.useState('');
  const [language, setLanguage] = React.useState('c');
  const editorRef = React.useRef(null);
  const [output, setOutput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [extension, setExtension] = React.useState('c' as string);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  }

  const handleLanguageChange = (lang: string) => {
    const ext = Languages.find((l) => l.language === lang)?.extentions;
    setExtension(ext as string);
    setLanguage(lang);
  }

  const handleRun = async () => {
    console.log(value);
    const sourceCode = (editorRef.current as any).getValue();
    setIsLoading(true);
    let out;
    try {
      out = await executeCode(language, sourceCode);
    }
    catch (err) {
      console.log(err);
    }

    setIsLoading(false);
    console.log(out.run);
    setOutput(out.run.output);
  }

  return (
    <div>
      <div className='mx-5 mt-5 absolute flex z-10'>
        <LanguageSelector Language={language} setLanguage={handleLanguageChange} />
      </div>
      <div className='absolute top-5 right-5 flex flex-row'>
        <Download extension={extension} value={value} />
        <button className='bg-[#333333] text-white py-1 px-4 rounded-md hover:bg-[#2a2a2a]' onClick={handleRun}>Run</button>
      </div>
      <div className='flex flex-row'>
        <div className='mt-20 mx-5 w-3/5'>
          <Editor
            className='p-2 rounded-lg bg-[#333333] border-2 border-gray-800'
            height="29rem"
            language={language}
            theme='vs-dark'
            onMount={onMount}
            value={value}
            onChange={(value: any) => setValue(value)}
          />
        </div>
        <div className='mt-20 bg-black w-2/5 mr-5'>
          <Console loading={isLoading} output={output} />
        </div>
      </div>
      
    </div>
  )
}