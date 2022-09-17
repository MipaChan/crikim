// in app/components/App.tsx
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import postgrestRestProvider from "@promitheus/ra-data-postgrest";
import { TestList } from "~/test";
import { ClientCreate, ClientEdit, ClientList } from "~/client";

const dataProvider = postgrestRestProvider("http://192.168.1.165:3000");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource options={{ label: '客户信息' }} name="client" list={ClientList} create={ClientCreate} edit={ClientEdit}  />
  </Admin>
);

export default App;


