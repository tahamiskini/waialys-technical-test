import { Input } from "./ui/input";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
      <Input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4  mb-4 p-2 border rounded w-full"
      />
    );
  };
  
  export default SearchBar;
  