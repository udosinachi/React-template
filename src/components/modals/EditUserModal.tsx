import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import useCustomToast from "../../utils/notification";
import {
  useEditUserInfo,
  useGetUserInfoById,
  useGetUserInfoByIdMutate,
} from "../../services/query/user";
import { useQueryClient } from "react-query";
import { EDIT_USER_INFO } from "../../services/queryKeys";

interface iProps {
  isOpenEdit: any;
  onCloseEdit: () => void;
  editID: string;
  userIdData: any;
  refetchAllUser: any;
}

export const EditUserModal = ({
  isOpenEdit,
  onCloseEdit,
  editID,
  userIdData,
  refetchAllUser,
}: iProps) => {
  useEffect(() => {
    if (userIdData) {
      setUserEmail(userIdData?.document?.email);
      setUserRoleName(userIdData?.document?.roleName);
      setUserFirstName(userIdData?.document?.firstName);
      setUserLastName(userIdData?.document?.lastName);
    }
  }, [userIdData]);
  // console.log(userIdData?.document?.id);

  const queryClient = useQueryClient();
  const [userEmail, setUserEmail] = useState("");
  const { errorToast, successToast } = useCustomToast();
  const [userRoleName, setUserRoleName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  //   console.log("state", userEmail);
  //   console.log(id);

  const { mutate, isLoading: loader } = useEditUserInfo({
    onSuccess: (res: any) => {
      console.log(res);
      successToast("Edited Successfully");
      setTimeout(() => {
        queryClient.invalidateQueries(EDIT_USER_INFO);
      }, 200);
      onCloseEdit();
      refetchAllUser();
    },
    onError: (err: any) => {
      console.log(err);
      errorToast("Failed");
    },
  });

  const handleSubmit = () => {
    mutate({
      Email: userEmail,
      RoleName: userRoleName,
      FirstName: userFirstName,
      LastName: userLastName,
      id: editID,
    });
  };

  return (
    <>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                name="Email"
                // placeholder={fetchUser?.email}
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Role Name</FormLabel>
              <Input
                type="text"
                name="Role Name"
                // placeholder={fetchUser?.roleName}
                value={userRoleName}
                onChange={(e) => setUserRoleName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                name="First Name"
                // placeholder={fetchUser?.firstName}
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                name="Last Name"
                // placeholder={fetchUser?.lastName}
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Edit User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
