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
import { EDIT_DISPOSITION, EDIT_USER_INFO } from "../../services/queryKeys";
import { useEditDisposition } from "../../services/query/disposition";

interface iProps {
  isOpenEdit: any;
  onCloseEdit: () => void;
  editID: string;
  userIdData: any;
  refetchAllUser: any;
}

export const EditDispositionModal = ({
  isOpenEdit,
  onCloseEdit,
  editID,
  userIdData,
  refetchAllUser,
}: iProps) => {
  useEffect(() => {
    if (userIdData) {
      setAgentID(userIdData?.document?.agentId);
      setCustomerID(userIdData?.document?.customerId);
      setCategory(userIdData?.document?.category);
      setSubject(userIdData?.document?.subject);
      setCc(userIdData?.document?.cc);
      setMessageBody(userIdData?.document?.messageBody);
      setFlag(userIdData?.document?.flag);
    }
  }, [userIdData]);
  // console.log(userIdData?.document?.id);

  const queryClient = useQueryClient();
  const { errorToast, successToast } = useCustomToast();
  const [agentID, setAgentID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [cc, setCc] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [flag, setFlag] = useState("");

  //   console.log("state", userEmail);
  //   console.log(id);

  const { mutate, isLoading: loader } = useEditDisposition({
    onSuccess: (res: any) => {
      console.log(res);
      successToast("Edited Successfully");
      setTimeout(() => {
        queryClient.invalidateQueries(EDIT_DISPOSITION);
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
      CustomerId: customerID,
      AgentId: agentID,
      Category: category,
      Subject: subject,
      MessageBody: messageBody,
      Cc: cc,
      Flag: flag,
      DateCreated: userIdData?.document?.dateCreated,
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
              <FormLabel>Agent ID</FormLabel>
              <Input
                type="text"
                name="Agent ID"
                value={agentID}
                onChange={(e) => setAgentID(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Customer ID</FormLabel>
              <Input
                type="text"
                name="Customer ID"
                value={customerID}
                onChange={(e) => setCustomerID(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                name="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>CC</FormLabel>
              <Input
                type="text"
                name="CC"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Subject</FormLabel>
              <Input
                type="text"
                name="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Message Body</FormLabel>
              <Input
                type="text"
                name="Message Body"
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Flag</FormLabel>
              <Input
                type="text"
                name="Flag"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
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
