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
import { useGetAllDropDown } from "../../services/query/drop-down";
import { useParams } from "react-router-dom";

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
  // const [agentID, setAgentID] = useState("");
  // const [customerID, setCustomerID] = useState("");
  // const [category, setCategory] = useState("");
  // const [subject, setSubject] = useState("");
  // const [cc, setCc] = useState("");
  // const [messageBody, setMessageBody] = useState("");
  // const [flag, setFlag] = useState("");
  const [DateCreated, setDateCreated] = useState("");
  const [CallAnswered, setCallAnswered] = useState("Yes");
  const [CallStatus, setCallStatus] = useState("");
  const [ReasonForNoPayment, setReasonForNoPayment] = useState("");
  const [SubReasonForNoPayment, setSubReasonForNoPayment] = useState("");
  const [PromiseToPay, setPromiseToPay] = useState("");
  const [AmountToPayToday, setAmountToPayToday] = useState("");
  const [NumberOfDays, setNumberOfDays] = useState("");
  const [Comment, setComment] = useState("");

  const { id } = useParams();

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

  const { data, isLoading, refetch } = useGetAllDropDown(1, 100);
  const dropdownList = data?.document?.records;
  // console.log(dropdownList);
  const callAnsweredOptionData = [];
  for (let i = 0; i < dropdownList?.length; i++) {
    if (dropdownList[i]?.dropDownName === "Call Answered") {
      callAnsweredOptionData.push(dropdownList[i]);
    }
    // console.log(dropdownList[i]?.dropDownName);
  }
  // console.log(callAnsweredOptionData);

  const callStatusOptionData = [];
  for (let i = 0; i < dropdownList?.length; i++) {
    if (dropdownList[i]?.dropDownName === "Call Status") {
      if (dropdownList[i]?.optionCode === CallAnswered)
        callStatusOptionData.push(dropdownList[i]);
    }
  }
  // console.log(callStatusOptionData);

  const reasonForNonPaymentOptionData = [];
  for (let i = 0; i < dropdownList?.length; i++) {
    if (dropdownList[i]?.dropDownName === "Reason For Non Payment") {
      if (dropdownList[i]?.optionCode === CallStatus && "Completed") {
        reasonForNonPaymentOptionData.push(dropdownList[i]);
      }
    }
  }
  // console.log(reasonForNonPaymentOptionData);

  const subReasonForNonPaymentOptionData = [];
  for (let i = 0; i < dropdownList?.length; i++) {
    if (dropdownList[i]?.dropDownName === "Sub-Reason For Non Payment") {
      if (dropdownList[i]?.optionCode === ReasonForNoPayment) {
        subReasonForNonPaymentOptionData.push(dropdownList[i]);
      }
    }
  }
  // console.log(subReasonForNonPaymentOptionData);

  const promiseToPayOptionData = [];
  for (let i = 0; i < dropdownList?.length; i++) {
    if (dropdownList[i]?.dropDownName === "Promise to Pay") {
      promiseToPayOptionData.push(dropdownList[i]);
    }
  }

  const handleSubmit = () => {
    mutate({
      CustomerId: "1",
      AgentId: "6",
      // AgentId: localStorage.getItem("agentID"),
      CommitmentDate: "2022-12-12",
      NameOfBrowser: "Lionel Messi",
      Email: "bruhh@test.com",
      PhoneNumber: "0967897556",
      DisbursementDate: "12 Dec 2022",
      LoanId: "30",

      DateCreated,
      CallAnswered,
      CallStatus,
      ReasonForNoPayment,
      SubReasonForNoPayment,
      PromiseToPay,
      AmountToPayToday,
      NumberOfDays,
      Comment,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Disposition for {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box display="flex" justifyContent="space-between">
              <FormControl w="90%" mr="2">
                <FormLabel>Call Answered</FormLabel>
                {/* <Input
                  type="text"
                  name="Agent ID"
                  value={agentID}
                  onChange={(e) => setAgentID(e.target.value)}
                /> */}
                <Select onChange={(e) => setCallAnswered(e.target.value)}>
                  {callAnsweredOptionData?.reverse()?.map((choose) => (
                    <option key={choose?.id} value={choose?.optionText}>
                      {choose?.optionText}
                    </option>
                  ))}
                  {/* <option value="Yes">Yes</option>
                  <option value="No">No</option> */}
                </Select>
              </FormControl>
              <FormControl w="90%" ml="2">
                <FormLabel>Call Status</FormLabel>
                {/* <Input
                  type="text"
                  name="Customer ID"
                  value={customerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                /> */}
                <Select onChange={(e) => setCallStatus(e.target.value)}>
                  {callStatusOptionData?.map((choose) => (
                    <option key={choose?.id} value={choose?.optionText}>
                      {choose?.optionText}
                    </option>
                  ))}
                  {/* <option value=""></option>
                  <option value="Received">Received</option>
                  <option value="Ignored">Ignored</option>
                  <option value="Failed">Failed</option> */}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="4">
              <FormControl w="90%" mr="2">
                <FormLabel>Reason for Non Payment</FormLabel>
                {/* <Input
                type="text"
                name="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              /> */}

                <Select onChange={(e) => setReasonForNoPayment(e.target.value)}>
                  {reasonForNonPaymentOptionData?.reverse()?.map((choose) => (
                    <option key={choose?.id} value={choose?.optionText}>
                      {choose?.optionText}
                    </option>
                  ))}
                  {/* <option value=""></option>
                  <option value="Promise to payback">Promise to payback</option>
                  <option value="Call Back">Call Back</option>
                  <option value="Unable to pay">Unable to pay</option> */}
                </Select>
              </FormControl>

              <FormControl w="90%" ml="2">
                <FormLabel>Sub Reason</FormLabel>
                {/* <Input
                  type="text"
                  name="CC"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                /> */}
                <Select
                  onChange={(e) => setSubReasonForNoPayment(e.target.value)}
                >
                  {subReasonForNonPaymentOptionData
                    ?.reverse()
                    ?.map((choose) => (
                      <option key={choose?.id} value={choose?.optionText}>
                        {choose?.optionText}
                      </option>
                    ))}
                  {/* <option value=""></option>
                  <option value="Promise to payback">Promise to payback</option>
                  <option value="Call Back">Call Back</option>
                  <option value="Unable to pay">Unable to pay</option> */}
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="4">
              <FormControl w="90%" mr="2">
                <FormLabel>Promise to Pay</FormLabel>
                {/* <Input
                  type="text"
                  name="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                /> */}
                <Select onChange={(e) => setPromiseToPay(e.target.value)}>
                  {promiseToPayOptionData?.reverse()?.map((choose) => (
                    <option key={choose?.id} value={choose?.optionText}>
                      {choose?.optionText}
                    </option>
                  ))}
                  {/* <option value=""></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option> */}
                </Select>
              </FormControl>

              <FormControl w="90%" ml="2">
                <FormLabel>Commitment Date</FormLabel>
                <Input
                  type="date"
                  name="Message Body"
                  value={DateCreated}
                  onChange={(e) => setDateCreated(e.target.value)}
                />
              </FormControl>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="4">
              <FormControl w="90%" mr="2">
                <FormLabel>Amount to Repay Today</FormLabel>
                <Input
                  type="number"
                  name="Flag"
                  value={AmountToPayToday}
                  onChange={(e) => setAmountToPayToday(e.target.value)}
                />
              </FormControl>

              <FormControl w="90%" ml="2">
                <FormLabel>Number of Days</FormLabel>
                <Input
                  type="number"
                  name="Flag"
                  value={NumberOfDays}
                  onChange={(e) => setNumberOfDays(e.target.value)}
                />
              </FormControl>
            </Box>

            <FormControl mt={4}>
              <FormLabel>Comment</FormLabel>
              <Input
                type="text"
                name="Flag"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
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
              Save & Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
