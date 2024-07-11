import { Languages } from '@/appConstants';
import React from 'react'

export default function LanguageSelector({Language, setLanguage}: {Language: string, setLanguage: (prop: string) => void}) {
    const [show, setShow] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState(Language);

    const handleLang = (lang: any) => {
        localStorage.setItem('language', lang.language);
        setSelectedLanguage(lang.language);
        setLanguage(lang.language);
        setShow(false);
    }

    return (
        <div>
            <button onClick={() => { setShow(!show) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-[#333333] rounded-md font-medium text-sm px-5 py-2.5 text-center inline-flex items-center " type="button">
                {selectedLanguage} 
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>
            <div id="dropdown" className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${show ? '' : 'hidden'}`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {Languages.map((lang: any, index: any) => (
                        <li onClick={() => handleLang(lang)} key={index} className='hover:bg-black mx-2 rounded-md'>
                            <button className="block px-4 py-2">{lang?.language}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
