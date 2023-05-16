import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { RiSearchLine } from 'react-icons/ri';

type SearchInputProps = {
  searchField: string;
  setSearchField: (value: string) => void;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
};

const SearchInput = ({
  searchField,
  setSearchField,
  isFocused,
  setIsFocused,
}: SearchInputProps) => {
  const handleSearchField = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused((prev: boolean) => !prev);
  };

  return (
    <div className="relative mt-3">
      <RiSearchLine
        className={`text-gray-400 absolute top-1/2 left-2 -translate-y-1/2 transition-opacity duration-100 ${
          isFocused ? 'opacity-0' : 'opacity-100'
        }`}
        size={18}
      />
      <input
        className={`pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none ${
          isFocused ? 'pl-4' : 'pl-8'
        }`}
        type="search"
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleFocus}
        onChange={handleSearchField}
        value={searchField}
      />
    </div>
  );
};

export default SearchInput;
