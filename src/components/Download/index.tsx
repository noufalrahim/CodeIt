import React from 'react';
import { FaDownload, FaFileDownload } from 'react-icons/fa';

interface DownloadProps {
    value: string;
    extension: string;
}

export default function Download({value, extension}: DownloadProps) {
    const downLoadHandler = () => {
        if(!value) return alert('No content to download');
        const fileName = window.prompt('Enter file name (without extension):');
        const fileContent = value;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='bg-[#333333] text-white py-1 px-4 rounded-md hover:bg-[#2a2a2a] mr-5 flex flex-row text-center justify-center items-center'>
        <button className='mr-2' onClick={downLoadHandler}>Download</button>
        <FaFileDownload className='text-white' />
        </div>
    );
}
