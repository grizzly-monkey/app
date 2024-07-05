import { TableProps, Avatar, Typography, Tag } from "antd";
import { getAlphabetColor, getRoleColor } from "./utils";
import { User } from "./types";
import { getTranslation } from "@/translation/i18n";

const columns: TableProps<User>["columns"] = [
  {
    title: getTranslation("global.name"),
    dataIndex: "name",
    render: (_, record) => {
      const backgroundColor = getAlphabetColor(record?.firstName[0]);
      return (
        <>
          <Avatar
            shape="square"
            style={{
              backgroundColor: backgroundColor,
              verticalAlign: "middle",
            }}
          >
            {`${record?.firstName[0]}${record.lastName[0]}`}
          </Avatar>
          <Typography.Text style={{ marginLeft: "10px" }}>
            {`${record?.firstName} ${record?.lastName}`}
          </Typography.Text>
        </>
      );
    },
    sorter: (a, b) => a.firstName.length - b.firstName.length,
    key: "1",
  },

  {
    title: getTranslation("global.contactNumber"),
    dataIndex: "phone",
    key: "2",
  },
  {
    title: getTranslation("global.roles"),
    dataIndex: "roles",
    // render: (roles) => <>
    //     {roles.map((role: string) => {
    //         const color = getRoleColor(role)
    //         return <Tag color={color} key={role}>
    //             {role}
    //         </Tag>
    //     }

    //     )}
    // </>
    render: (_, record) => {
      const roles = record?.roles;
      return (
        <>
          {roles?.map((role: string) => {
            const color = getRoleColor(role);
            return (
              <Tag color={color} key={role}>
                {role}
              </Tag>
            );
          })}
        </>
      );
    },
    key: "3",
  },
];

export default columns;
