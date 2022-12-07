import React, { useState } from "react";
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
import { useAddNewUserInfo } from "../../services/query/user";
import { useQueryClient } from "react-query";
import { ADD_USER_INFO } from "../../services/queryKeys";

export const AddUserModal = ({
  isOpen,
  onClose,
  refetchAllUser,
}: {
  isOpen: any;
  onClose: () => void;
  refetchAllUser: any;
}) => {
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useCustomToast();
  const [userEmail, setUserEmail] = useState("");
  const [userRoleName, setUserRoleName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const { mutate, isLoading: loader } = useAddNewUserInfo({
    onSuccess: (res: any) => {
      console.log(res);
      successToast("Added Successfully");
      setTimeout(() => {
        // window.location.href = "/customer-book";
        queryClient.invalidateQueries(ADD_USER_INFO);
      }, 200);
      onClose();
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
      DateCreated: new Date(),
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                name="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Role Name</FormLabel>
              <Input
                type="text"
                name="Role Name"
                value={userRoleName}
                onChange={(e) => setUserRoleName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                type="text"
                name="First Name"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                type="text"
                name="Last Name"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
