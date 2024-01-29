import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

interface InputViewProps {
   name: string; // Change the type to string
   placeholder: string;
   clickhandle?: Dispatch<SetStateAction<string>>;
}

export const InputView: FC<InputViewProps> = ({
   name,
   placeholder,
   clickhandle,
}) => {
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      clickhandle(event.target.value);
   };

   return (
      <div className="mb-4">
         <label
            htmlFor={name}
            className="text-base/normal text-ddefault-200 mb-2 block font-semibold"
         >
            {name}
         </label>
         <input
            type="text"
            id={name}
            onChange={handleChange}
            placeholder={placeholder}
            className="border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
         />
      </div>
   );
};
