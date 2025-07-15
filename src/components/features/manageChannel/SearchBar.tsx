export const SearchBar = () => (
  <div className="mb-6 border-2 border-green-300 p-4 rounded-lg">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="border border-gray-300 rounded-lg px-4 py-2">
        Select (Name/Email)
      </div>
      <div className="flex-1 border border-gray-300 rounded-lg px-4 py-2">
        Input (Find by name or email...)
      </div>
      <div className="border border-gray-300 rounded-lg px-4 py-2">
        Button (Search)
      </div>
    </div>
  </div>
);
