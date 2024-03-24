import React, { useRef, useEffect } from 'react';
import '@fontsource/special-elite';

export default function Console({ output, loading, error }: { output: string, loading: boolean, error: string }) {
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [output]);

    return (
        <div ref={consoleRef} className='w-[27.5rem] rounded-md bg-[#262626] h-[35rem] overflow-auto'>
            <div className='px-5 bg-[#333333] py-5'>
                <p className='text-gray-300 text-sm'>Terminal</p>
            </div>
            {
                loading ? (
                    <div className='p-5'>
                        <p className='text-white text-sm'>Compiling...</p>
                    </div>
                ) : (
                    <div className='p-5'>
                        {
                            error != ''? (
                                <pre className='text-red-500 text-sm'>{error}</pre>
                            ) : (
                                <pre className='text-white text-sm'>{output}</pre>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}
