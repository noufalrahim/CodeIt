import LanguageSelector from "@/components/LanguageSelector";
import Editor from "../components/Editor";
import React from "react";
import { Languages } from "@/appConstants";
import Download from "@/components/Download";
import executeCode from "./api/ExecuteCode";
import InputBox from "@/components/InputBox";
import Console from "@/components/Console";

export default function Home() {
  const [language, setLanguage] = React.useState('');
  const [extension, setExtension] = React.useState('');
  const [value, setValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [stdin, setStdin] = React.useState('' as string);
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState('' as string);

  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const code = localStorage.getItem('code');
      const language = localStorage.getItem('language');
      console.log(language);
      if (code) {
        setValue(code);
      }
      if (language) {
        setLanguage(language);
        setExtension(Languages.find((l) => l.language === language)?.extentions as string);
      }
    }
  }, []);

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
      out = await executeCode(language, sourceCode, stdin);
      console.log(out);
    }
    catch (err) {
      console.log(err);
    }

    setIsLoading(false);
    console.log(out.run);
    if(out.run.stderr) {
      setError(out.run.stderr);
      setOutput('');
      return;
    }
    else if (out.run.output){
      setOutput(out.run.output);
      setError('');
    }
  }

  const handleInput = (input: string) => {
    console.log(input);
    setStdin(input);
  }

  const handleOnChange = (value: any) => {
    localStorage.setItem('code', value);
    setValue(value);
  }

  return (
    <div className="bg-black w-full flex flex-col min-h-screen pt-5 px-5">
      <div className="flex md:flex-row lg:flex-row xl:flex-row 2xl:flex-row flex-col md:gap-0 gap-4 justify-between items-center">
        {language ? <LanguageSelector Language={language} setLanguage={handleLanguageChange} /> : (
          <LanguageSelector Language='Select Language' setLanguage={handleLanguageChange} />)}
        <div className='flex flex-row'>
          <Download extension={extension} value={value} />
          <button className='bg-[#333333] text-white py-1 px-4 rounded-md hover:bg-[#2a2a2a]' onClick={handleRun}>Run</button>
        </div>
      </div>
      <div className="w-full mt-5 min-h-[37rem] flex flex-col gap-4 mb-10 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        <Editor 
          language={language}
          editorRef={editorRef}
          onChange={(value: string) => handleOnChange(value)}
          value={value}
        />
        <div className='w-full h-[37rem] flex-col flex'>
          <InputBox value={stdin} setValue={handleInput} />
          <Console loading={isLoading} output={output} error={error} />
        </div>
      </div>
    </div>
  );
}
