import { useParams } from "react-router-dom";

function ListPage() {
  const { name } = useParams();
  return <h1>List {name}</h1>;
}

export default ListPage;
