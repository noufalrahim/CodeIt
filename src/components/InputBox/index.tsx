import React from 'react'

export default function InputBox({value, setValue}: {value: string, setValue: any}) {

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
          const inp = localStorage.getItem('inputs');
          if (inp) {
            setValue(inp);
          }
        }
      },[]);

    const handleValueChange = (e: any) => {
        console.log(e.target.value);
        setValue(e.target.value);
        localStorage.setItem('inputs', e.target.value);
    }

    return (
        <div className='w-[27.5rem] bg-[#2a2a2a] mb-5 rounded-md'>
            <div className='px-5 bg-[#333333] py-5 rounded-t-md'>
                <p className='text-gray-300 text-sm'>Input</p>
            </div>
            <div className='px-2'>
                <textarea
                    className="text-white p-2 w-full bg-[#2a2a2a] h-full border-none focus:outline-none"
                    rows={5}
                    placeholder="Enter your input here"
                    value={value}
                    onChange={(e) => handleValueChange(e)}
                ></textarea>
            </div>
        </div>
    )
}
