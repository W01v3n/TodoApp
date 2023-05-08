function List() {
  return (
    <div className="container mx-28 w-3/6 shadow-lg shadow-yellow-900 md:m-0 md:w-auto">
      <h3 className="bg-yellow-300 p-1 text-center text-2xl font-light">
        List Name
      </h3>
      <ul className="border border-solid border-yellow-300 py-4 text-center text-lg ">
        <li>List Item1</li>
        <li>List Item2</li>
        <li>List Item3</li>
      </ul>
    </div>
  );
}

export default List;
