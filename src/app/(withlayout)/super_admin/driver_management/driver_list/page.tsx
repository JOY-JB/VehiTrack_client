"use client";
import ActionBar from "@/components/ui/ActionBar";

import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Tag } from "antd";
import Link from "next/link";
import { useState } from "react";

import dayjs from "dayjs";

import CreateDriver from "@/components/CreateUpdateFrom/DriverCreate";
import ModalComponent from "@/components/ui/Modal";
import UMTable from "@/components/ui/Table";
import { USER_ROLE } from "@/constants/role";
import { useGetAllDriverQuery } from "@/redux/api/driver/driverApi";

const AllDriverList = () => {
  const SUPER_ADMIN = USER_ROLE.ADMIN;
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // query["limit"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  //@ts-ignore
  // const AllDriverData = [
  //   {
  //     _id: 1,
  //     name: "sampood",
  //     email: "sampood@gmail.com",
  //     createdAt: "2023-01-01",
  //     phoneNumber: "014741154151",
  //     profileImage:
  //       "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     _id: 2,
  //     name: "akahs",
  //     email: "kakspood@gmail.com",
  //     createdAt: "2023-01-01",
  //     phoneNumber: "018044518521",
  //     profileImage:
  //       "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     _id: 3,
  //     name: "roihime",
  //     email: "roihime@gmail.com",
  //     phoneNumber: "018769988521",
  //     createdAt: "2023-01-01",
  //     profileImage:
  //       "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];
  //@ts-ignore
  //   const meta = {
  //     "page": 1,
  //     "limit": 10,
  //     "total": 3
  // };

  const columns = [
    {
      title: "Image",

      render: function (data: any) {
        return <Avatar size={64} icon={<UserOutlined />} />;
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (isActive: boolean) =>
        isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Not Active</Tag>
        ),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: "15%",
      render: function (data: any) {
        return (
          <>
            <Link href={`/${SUPER_ADMIN}/general_user/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${SUPER_ADMIN}/general_user/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              //   onClick={() => deleteGeneralUserHandler(data)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const { data, isLoading } = useGetAllDriverQuery({ ...query });
  const AllDriverData = data?.drivers || [];
  const meta = data?.meta;

  console.log(AllDriverData);

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  //   const deleteGeneralUserHandler = async (id: string) => {
  //     console.log(id);
  //     confirm_modal(`Are you sure you want to delete`).then(async (res) => {
  //       if (res.isConfirmed) {
  //         try {
  //           const res = await deleteGeneralUser(id).unwrap();
  //           if (res.success == false) {
  //             // message.success("Admin Successfully Deleted!");
  //             // setOpen(false);
  //             Error_model_hook(res?.message);
  //           } else {
  //             Success_model("Customer Successfully Deleted");
  //           }
  //         } catch (error: any) {
  //           message.error(error.message);
  //         }
  //       }
  //     });
  //   };
  //   if (isLoading) {
  //     return <LoadingForDataFetch />;
  //   }
  return (
    <div className="rounded-xl bg-white p-5 shadow-xl">
      <ActionBar title="Driver List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <ModalComponent buttonText="Create Driver">
            <CreateDriver />
          </ModalComponent>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={false}
        columns={columns}
        dataSource={AllDriverData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      {/* <UMModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteGeneralUserHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal> */}
    </div>
  );
};

export default AllDriverList;