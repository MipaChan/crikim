// in src/posts.js
import { List, FilterForm, FilterList, Datagrid, TextField, DateField, BooleanField, TopToolbar, Button, CreateButton, ExportButton, FilterButton, Create, DateInput, required, SimpleForm, TextInput, Edit, EditButton, SelectField, SelectInput, SearchInput, FunctionField, SavedQueriesList, useTranslate, FilterListItem } from 'react-admin';
import IconEvent from '@mui/icons-material/Event';
import { Business, DateRange } from '@mui/icons-material'
import { Card, CardContent, Chip, Box } from '@mui/material'

const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    return <Chip sx={{ marginBottom: 1 }} label={translate(label)} />;
};
export const ClientFilters = [
    <TextInput source="name@like" alwaysOn label="名字" />,
]

function Ago(daynum) {
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - daynum * 24 * 3600 * 1000);
    const year = oneWeekAgo.getFullYear();
    const month = oneWeekAgo.getMonth() + 1;
    const day = oneWeekAgo.getDate();
    return `${year}-${month}-${day}`;
}

const LastVisitedFilter = () => (
    <FilterList label="最近联系">

        <FilterListItem
            label="一周未联系"
            value={{
                'last_contact@lte': Ago(7),
                last_seen_lte: undefined,
            }}
        />
        <FilterListItem
            label="半月未联系"
            value={{
                'last_contact@lte': Ago(15),
                last_seen_lte: undefined,
            }}
        />
        <FilterListItem
            label="一月未联系"
            value={{
                'last_contact@lte': Ago(30),
                last_seen_lte: undefined,
            }}
        />
        <FilterListItem
            label="二月未联系"
            value={{
                'last_contact@lte': Ago(60),
                last_seen_lte: undefined,
            }}
        />
        <FilterListItem
            label="一季未联系"
            value={{
                'last_contact@lte': Ago(90),
                last_seen_lte: undefined,
            }}
        />
    </FilterList>
)
const ListActions = () => (
    <TopToolbar>
        <CreateButton label='创建' />
        <ExportButton label='导出' />
    </TopToolbar>
);
export const ClientEdit = (props: any) => (
    <Edit title="Post edition" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} label="客户名称" />
            <TextInput source="address" label="详细地址" />
            <TextInput source="wechat" label="微信" />
            <TextInput source="phone" label="手机号" />
            <TextInput source="tel" label="联系电话" validate={[required()]} />
            <SelectInput label="客户类型" source="type" choices={[
                { id: '已加未通过', name: '已加未通过' },
                { id: '微信已通过', name: '微信已通过' },
                { id: '未接', name: '未接' },
                { id: '未通过已发短信', name: '未通过已发短信' },
                { id: '客户不加', name: '客户不加' },
                { id: '空号', name: '空号' },
                { id: '暂停服务', name: '暂停服务' },
                { id: '直接挂断', name: '直接挂断' },
                { id: '已经成交', name: '已经成交' },
                { id: '多次成交', name: '多次成交' },
                { id: '发短信给客户添加', name: '发短信给客户添加' },
                { id: '客户电话搜索不到微信', name: '客户电话搜索不到微信' },
            ]} />
            <TextInput source="level" label="客户级别" />
            <DateInput source="last_contact" label="最后联系" />
            <TextInput source="remark" label="备注其它" />
            <TextInput source="order_info" label="订单信息" />
            <TextInput source="product_amount" label="产品金额" />
            <TextInput source="salesman" label="业务员" />
        </SimpleForm>
    </Edit>
)
export const ClientCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="name" validate={[required()]} label="客户名称" />
            <TextInput source="address" label="详细地址" />
            <TextInput source="wechat" label="微信" />
            <TextInput source="phone" label="手机号" />
            <TextInput source="tel" label="联系电话" validate={[required()]} />
            <TextInput source="type" label="客户类型" />
            <TextInput source="level" label="客户级别" />
            <DateInput source="last_contact" label="最后联系" />
            <TextInput source="remark" label="备注其它" />
            <TextInput source="order_info" label="订单信息" />
            <TextInput source="product_amount" label="产品金额" />
            <TextInput source="salesman" label="业务员" />
            {/* <TextInput source="order" label="订单" /> */}
            {/* <TextInput source="manager" label="管理" /> */}
        </SimpleForm>
    </Create>
);
const formatTime = (time: string) => {
    if (!time) {
        return '';
    }
    // 拿到当前的时间戳（毫秒) -- 转换为秒
    let currentTime = new Date()
    let currentTimestamp = currentTime.getTime()
    // 传进来的时间戳（毫秒)
    let t = new Date(time)
    let timestamp = t.getTime()
    var diffValue = currentTimestamp - timestamp;
    // 几天前
    var day = 1000 * 60 * 60 * 24;
    return Math.floor(diffValue / day) + '天前'

}
const FilterSidebar = () => (
    <Box
        sx={{
            display: {
                xs: 'none',
                sm: 'block'
            },
            order: -1, // display on the left rather than on the right of the list
            width: '15em',
            marginRight: '1em',
        }}
    >
        <Card>
            <CardContent>
                <LastVisitedFilter />
            </CardContent>
        </Card>
    </Box >
);

export const ClientList = (props: any) => (
    <List {...props} actions={<ListActions />} filters={ClientFilters} aside={<FilterSidebar />}>
        <Datagrid>
            <TextField source="id" label="序号" />
            <DateField source="created_at" label="录入时间" />
            <TextField source="name" label="客户名称" />
            <TextField source="wechat" label="微信" />
            <TextField source="phone" label="手机号" />
            <TextField source="tel" label="联系电话" />
            <TextField source="address" label="详细地址" />
            <TextField source="type" label="客户类型" />
            <TextField source="level" label="客户级别" />
            <FunctionField label="最后联系" render={(record: { last_contact: string; }) => `${formatTime(record.last_contact)}`} ></FunctionField>
            <TextField source="remark" label="备注其它" />
            <TextField source="order_info" label="订单信息" />
            <TextField source="product_amount" label="产品金额" />
            <TextField source="salesman" label="业务员" />
            <TextField source="follow" label="跟单" />
            <TextField source="order" label="订单" />
            <EditButton label='编辑' />
        </Datagrid>
    </List>
);