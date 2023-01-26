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
  firstName,
  lastName,
  idIndex,
}: {
  isOpen: any;
  onClose: () => void;
  refetchAllUser: any;
  firstName: any;
  lastName: any;
  idIndex: any;
}) => {
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useCustomToast();
  const [DateCreated, setDateCreated] = useState("");
  const [CallAnswered, setCallAnswered] = useState("");
  const [CallStatus, setCallStatus] = useState("");
  const [ReasonForNoPayment, setReasonForNoPayment] = useState("Null");
  const [SubReasonForNoPayment, setSubReasonForNoPayment] = useState("Null");
  const [InboundReason, setInboundReason] = useState("Null");
  const [SubInboundReason, setSubInboundReason] = useState("Null");
  const [PromiseToPay, setPromiseToPay] = useState("");
  const [AmountToPayToday, setAmountToPayToday] = useState("");
  const [NumberOfDays, setNumberOfDays] = useState("");
  const [Comment, setComment] = useState("");
  const [typeOfCall, setTypeofCall] = useState("");
  const [typeOfCustomer, setTypeofCustomer] = useState("");

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

  const { data, isLoading, refetch } = useGetAllDropDown(1, 200);
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
  const namesOfCustomer = firstName + " " + lastName;

  const inboundReasonOptionData = [];
  for (let i = 0; i < dropdownList?.length; i++) {
    if (dropdownList[i]?.dropDownName === "Reason For Inbound") {
      inboundReasonOptionData.push(dropdownList[i]);
    }
  }
  console.log(inboundReasonOptionData);

  const inboundSubReasonOptionData = [];
  for (let i = 0; i < dropdownList?.length; i++) {
    if (dropdownList[i]?.dropDownName === "Sub-Reason For Inbound") {
      if (dropdownList[i]?.optionCode === InboundReason) {
        inboundSubReasonOptionData.push(dropdownList[i]);
      }
    }
  }

  const handleSubmit = () => {
    mutate({
      CommitmentDate: "2023-01-16",
      Email: "gatesbill@test.com",
      DisbursementDate: "10 Jan 2023",
      LoanId: "30",

      // AgentId: localStorage.getItem("agentID"),
      AgentId: 300,
      CustomerId: idIndex,
      NameOfBrowser: namesOfCustomer,
      PhoneNumber: id,
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
            <Box mb="2">
              <FormLabel>Type of Call</FormLabel>
              <Select onChange={(e) => setTypeofCall(e.target.value)}>
                <option value="">-- Select --</option>
                <option value="Outbound">Outbound</option>
                <option value="Inbound">Inbound</option>
                <option value="Others">Others</option>
              </Select>
            </Box>
            {typeOfCall === "Outbound" && (
              <Box mb="2">
                <FormLabel>Type of Customer</FormLabel>
                <Select onChange={(e) => setTypeofCustomer(e.target.value)}>
                  <option value="">-- Select --</option>
                  <option value="Newly Activated Customers">
                    Newly Activated Customers
                  </option>
                  <option value="Upcoming Renewals">Upcoming Renewals</option>
                  <option value="Overdue Renewals">Overdue Renewals</option>
                </Select>
              </Box>
            )}

            {typeOfCall === "Outbound" &&
              typeOfCustomer === "Overdue Renewals" && (
                <Box>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl w="90%" mr="2">
                      <FormLabel>Call Answered</FormLabel>

                      <Select onChange={(e) => setCallAnswered(e.target.value)}>
                        <option value="">-- Select --</option>
                        {callAnsweredOptionData?.reverse()?.map((choose) => (
                          <option key={choose?.id} value={choose?.optionText}>
                            {choose?.optionText}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl w="90%" ml="2">
                      <FormLabel>Call Status</FormLabel>

                      <Select onChange={(e) => setCallStatus(e.target.value)}>
                        <option value="">-- Select --</option>
                        {callStatusOptionData?.map((choose) => (
                          <option key={choose?.id} value={choose?.optionText}>
                            {choose?.optionText}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <>
                    {CallStatus === "Completed" && (
                      <Box display="flex" justifyContent="space-between" mt="4">
                        <FormControl w="90%" mr="2">
                          <FormLabel>Reason for Non Payment</FormLabel>

                          <Select
                            onChange={(e) =>
                              setReasonForNoPayment(e.target.value)
                            }
                          >
                            <option value="null">-- Select --</option>
                            {reasonForNonPaymentOptionData
                              ?.reverse()
                              ?.map((choose) => (
                                <option
                                  key={choose?.id}
                                  value={choose?.optionText}
                                >
                                  {choose?.optionText}
                                </option>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl w="90%" ml="2">
                          <FormLabel>Sub Reason</FormLabel>

                          <Select
                            onChange={(e) =>
                              setSubReasonForNoPayment(e.target.value)
                            }
                          >
                            <option value="null">-- Select --</option>
                            {subReasonForNonPaymentOptionData
                              ?.reverse()
                              ?.map((choose) => (
                                <option
                                  key={choose?.id}
                                  value={choose?.optionText}
                                >
                                  {choose?.optionText}
                                </option>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )}

                    <Box display="flex" justifyContent="space-between" mt="4">
                      <FormControl w="90%" mr="2">
                        <FormLabel>Promise to Pay</FormLabel>

                        <Select
                          onChange={(e) => setPromiseToPay(e.target.value)}
                        >
                          <option value="">-- Select --</option>
                          {promiseToPayOptionData?.reverse()?.map((choose) => (
                            <option key={choose?.id} value={choose?.optionText}>
                              {choose?.optionText}
                            </option>
                          ))}
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
                  </>
                </Box>
              )}

            {typeOfCall === "Outbound" &&
              typeOfCustomer === "Newly Activated Customers" && (
                <>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl w="90%" mr="2">
                      <FormLabel>Call Answered</FormLabel>

                      <Select onChange={(e) => setCallAnswered(e.target.value)}>
                        <option value="">-- Select --</option>
                        {callAnsweredOptionData?.reverse()?.map((choose) => (
                          <option key={choose?.id} value={choose?.optionText}>
                            {choose?.optionText}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl w="90%" ml="2">
                      <FormLabel>Call Status</FormLabel>

                      <Select onChange={(e) => setCallStatus(e.target.value)}>
                        <option value="">-- Select --</option>
                        {callStatusOptionData?.map((choose) => (
                          <option key={choose?.id} value={choose?.optionText}>
                            {choose?.optionText}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl w="90%" mr="2">
                      <FormLabel>ID Type</FormLabel>

                      <Select>
                        <option value="">-- Select --</option>
                        <option>NIN</option>
                        <option>Voter's Card</option>
                        <option>Driver's License</option>
                        <option>Staff ID</option>
                        <option>No ID</option>
                        <option>Int'l Passport</option>
                        <option>Others</option>
                      </Select>
                    </FormControl>
                    <FormControl w="90%" ml="2">
                      <FormLabel>ID Card Check</FormLabel>

                      <Select>
                        <option value="">-- Select --</option>
                        <option>Correct</option>
                        <option>Wrong</option>
                        <option>To be checked further</option>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl w="90%" mr="2">
                      <FormLabel>Reason</FormLabel>

                      <Select>
                        <option value="">-- Select --</option>
                        <option>N/A</option>
                        <option>Impersonation</option>
                        <option>Not Clear</option>
                        <option>Invalid</option>
                        <option>Others</option>
                      </Select>
                    </FormControl>
                    <FormControl w="90%" ml="2">
                      <FormLabel>Customer 360 download</FormLabel>

                      <Select>
                        <option value="">-- Select --</option>
                        <option>Yes</option>
                        <option>No</option>
                      </Select>
                    </FormControl>
                  </Box>
                  <FormControl>
                    <FormLabel>Customer Review</FormLabel>
                    <Select>
                      <option value="">-- Select --</option>
                      <option>Satisfied</option>
                      <option>Unsatisfied</option>
                      <option>Indifferent</option>
                    </Select>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Comment</FormLabel>
                    <Input
                      type="text"
                      name="Flag"
                      value={Comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>
                </>
              )}

            {typeOfCall === "Outbound" &&
              typeOfCustomer === "Upcoming Renewals" && (
                <>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl w="90%" mr="2">
                      <FormLabel>Call Answered</FormLabel>

                      <Select onChange={(e) => setCallAnswered(e.target.value)}>
                        <option value="">-- Select --</option>
                        {callAnsweredOptionData?.reverse()?.map((choose) => (
                          <option key={choose?.id} value={choose?.optionText}>
                            {choose?.optionText}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl w="90%" ml="2">
                      <FormLabel>Call Status</FormLabel>

                      <Select onChange={(e) => setCallStatus(e.target.value)}>
                        <option value="">-- Select --</option>
                        {callStatusOptionData?.map((choose) => (
                          <option key={choose?.id} value={choose?.optionText}>
                            {choose?.optionText}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl w="90%" mr="2">
                      <FormLabel>Reminder Done</FormLabel>

                      <Select>
                        <option value="">-- Select --</option>
                        <option>Yes</option>
                        <option>No</option>
                      </Select>
                    </FormControl>
                    <FormControl w="90%" ml="2">
                      <FormLabel>Customer's Response</FormLabel>

                      <Select>
                        <option value="">-- Select --</option>
                        <option>Positive</option>
                        <option>Negative</option>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <FormControl w="90%" mr="2">
                      <FormLabel>Promise to Pay</FormLabel>

                      <Select>
                        <option value="">-- Select --</option>
                        <option>Yes</option>
                        <option>No</option>
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
                  <FormControl mt={4}>
                    <FormLabel>Comment</FormLabel>
                    <Input
                      type="text"
                      name="Flag"
                      value={Comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>
                </>
              )}

            {typeOfCall === "Inbound" && (
              <>
                <FormControl>
                  <FormLabel>Call Purpose</FormLabel>
                  <Select>
                    <option value="">-- Select --</option>
                    <option>Complaint</option>
                    <option>Enquiry</option>
                    <option>Request</option>
                    <option>Others</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Reason</FormLabel>
                  <Select onChange={(e) => setInboundReason(e.target.value)}>
                    <option value="">-- Select --</option>
                    {inboundReasonOptionData?.reverse()?.map((choose) => (
                      <option key={choose?.id} value={choose?.optionText}>
                        {choose?.optionText}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Sub-Reason</FormLabel>
                  <Select onChange={(e) => setSubInboundReason(e.target.value)}>
                    <option value="">-- Select --</option>
                    {inboundSubReasonOptionData?.reverse()?.map((choose) => (
                      <option key={choose?.id} value={choose?.optionText}>
                        {choose?.optionText}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Comment</FormLabel>
                  <Input
                    type="text"
                    name="Flag"
                    value={Comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FormControl>
              </>
            )}
            {typeOfCall === "Others" && (
              <>
                <FormControl>
                  <FormLabel>Contact Platform</FormLabel>

                  <Select>
                    <option value="">-- Select --</option>
                    <option>Email</option>
                    <option>Paytrigger</option>
                    <option>Ticket/Customer 360</option>
                    <option>Whatsapp</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Reason</FormLabel>
                  <Select onChange={(e) => setInboundReason(e.target.value)}>
                    <option value="">-- Select --</option>
                    {inboundReasonOptionData?.reverse()?.map((choose) => (
                      <option key={choose?.id} value={choose?.optionText}>
                        {choose?.optionText}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Sub-Reason</FormLabel>
                  <Select onChange={(e) => setSubInboundReason(e.target.value)}>
                    <option value="">-- Select --</option>
                    {inboundSubReasonOptionData?.reverse()?.map((choose) => (
                      <option key={choose?.id} value={choose?.optionText}>
                        {choose?.optionText}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Comment</FormLabel>
                  <Input
                    type="text"
                    name="Flag"
                    value={Comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              bgColor="#26C6DA"
              color="white"
              _hover={{ background: "#26C6DA", color: "white" }}
              _active={{ background: "#26C6DA", color: "white" }}
              _focus={{ background: "#26C6DA", color: "white" }}
            >
              Save & Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
