import { useState } from "react";
import { EditIcon, DeleteIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Flex,
  Icon,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import {
  useGetAllUserInfo,
  useDeleteUserInfo,
  useGetUserInfoByIdMutate,
} from "../../services/query/user";
import useCustomToast from "../../utils/notification";
import { AddUserModal } from "../../components/AddUserModal";
import { Loader } from "../../components/WithSuspense";
import { useQueryClient } from "react-query";
import { GET_ALL_USER_INFO } from "../../services/queryKeys";
import { EditUserModal } from "../../components/EditUserModal";
import { NavLink } from "react-router-dom";

const CustomerBook = () => {
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [editID, setEditID] = useState("");
  const [userIdData, setUserIdData] = useState("");
  console.log(userIdData);

  const { data, isLoading, refetch: refetchAllUser } = useGetAllUserInfo(1, 10);
  const allUserData = data?.document?.records;
  // console.log(allUserData);

  const { mutate: byIdMutate, isLoading: loaderId } = useGetUserInfoByIdMutate({
    onSuccess: (res: any) => {
      // console.log(res);
      setUserIdData(res);
    },
    onError: (err: any) => {
      console.log(err);
      errorToast("Failed");
    },
  });

  const { mutate, isLoading: isDelete } = useDeleteUserInfo({
    onSuccess: (res: any) => {
      console.log(res);
      successToast("Record Deleted");
      setTimeout(() => {
        queryClient.invalidateQueries(GET_ALL_USER_INFO);
      }, 200);
    },
    onError: (err: any) => {
      console.log(err);
      errorToast("Failed");
    },
  });

  const deleteUserInfo = (id: any) => {
    alert("Are you sure");
    console.log(id);
    mutate({
      id,
    });
  };

  // console.log(editID);

  return (
    <div>
      {isLoading && <Loader />}
      <Box>
        <Flex
          justifyContent="space-between"
          mb="3"
          flexWrap="wrap"
          alignItems="center"
        >
          <InputGroup w={["100%", "200px", "200px", "300px"]}>
            <Input type="tel" placeholder="Phone number" size={"sm"} />
            <InputRightElement
              pointerEvents="none"
              children={<PhoneIcon color="blue.300" />}
            />
          </InputGroup>
          <Button size={"sm"} onClick={onOpen}>
            Add New User
          </Button>
        </Flex>
        <TableContainer bg="white">
          <Table size="sm">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Email </Th>
                <Th>Role Name </Th>
                <Th>First Name </Th>
                <Th>Last Name </Th>
                <Th>Last Login </Th>
              </Tr>
            </Thead>
            <Tbody>
              {allUserData?.map((info: any) => (
                <Tr key={info.id}>
                  <Td>{info?.email}</Td>
                  <Td>{info?.roleName}</Td>
                  <Td>{info?.firstName}</Td>
                  <Td>{info?.lastName}</Td>
                  <Td>{info?.lastLogin}</Td>
                  <Td>
                    <Icon
                      onClick={() => {
                        setEditID(info?.id);
                        onOpenEdit();
                        byIdMutate({
                          id: info?.id,
                        });
                      }}
                      as={EditIcon}
                      boxSize={5}
                      mr="3"
                      cursor="pointer"
                    />
                    {/* <NavLink to={`/customer-book/${info?.id}`}>
                      <Icon as={EditIcon} boxSize={5} cursor="pointer" mr="3" />
                    </NavLink> */}
                    <Icon
                      onClick={() => deleteUserInfo(info?.id)}
                      as={DeleteIcon}
                      boxSize={5}
                      color="red.500"
                      cursor="pointer"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <AddUserModal
        isOpen={isOpen}
        onClose={onClose}
        refetchAllUser={refetchAllUser}
      />
      <EditUserModal
        editID={editID}
        isOpenEdit={isOpenEdit}
        onCloseEdit={onCloseEdit}
        userIdData={userIdData}
        refetchAllUser={refetchAllUser}
      />
    </div>
  );
};

export default CustomerBook;
