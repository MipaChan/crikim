// in src/posts.js
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

export const TestList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
        </Datagrid>
    </List>
);