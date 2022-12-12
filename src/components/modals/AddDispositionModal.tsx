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
  Box,
  Select,
} from "@chakra-ui/react";
import useCustomToast from "../../utils/notification";
import { useAddNewUserInfo } from "../../services/query/user";
import { useQueryClient } from "react-query";
import { ADD_DISPOSITION, ADD_USER_INFO } from "../../services/queryKeys";
import { useAddNewDisposition } from "../../services/query/disposition";

export const AddDispositionModal = ({
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
  const [agentID, setAgentID] = useState("");
  const [customerID, setCustomerID] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [cc, setCc] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [flag, setFlag] = useState("");

  const { mutate, isLoading: loader } = useAddNewDisposition({
    onSuccess: (res: any) => {
      console.log(res);
      successToast("Added Successfully");
      setTimeout(() => {
        // window.location.href = "/customer-book";
        queryClient.invalidateQueries(ADD_DISPOSITION);
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
      CustomerId: customerID,
      AgentId: agentID,
      Category: category,
      Subject: subject,
      MessageBody: messageBody,
      Cc: cc,
      Flag: flag,
      DateCreated: new Date(),
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box display="flex" justifyContent="space-between">
              <FormControl w="90%" mr="2">
                <FormLabel>Agent ID</FormLabel>
                <Input
                  type="text"
                  name="Agent ID"
                  value={agentID}
                  onChange={(e) => setAgentID(e.target.value)}
                />
              </FormControl>
              <FormControl w="90%" ml="2">
                <FormLabel>Customer ID</FormLabel>
                <Input
                  type="text"
                  name="Customer ID"
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                />
              </FormControl>
            </Box>

            <FormControl>
              <FormLabel>Category</FormLabel>
              {/* <Input
                type="text"
                name="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              /> */}

              <Select onChange={(e) => setCategory(e.target.value)}>
                <option value="Promise to payback">Promise to payback</option>
                <option value="Call Back">Call Back</option>
                <option value="Unable to pay">Unable to pay</option>
              </Select>
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              bgColor="#26C6DA"
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
