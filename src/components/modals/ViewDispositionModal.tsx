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
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import useCustomToast from "../../utils/notification";
import {
  useEditUserInfo,
  useGetUserInfoById,
  useGetUserInfoByIdMutate,
} from "../../services/query/user";
import { useQueryClient } from "react-query";
import {
  EDIT_DISPOSITION,
  EDIT_USER_INFO,
  GET_DISPOSITION_BY_ID,
} from "../../services/queryKeys";
import {
  useEditDisposition,
  useGetDispositionById,
  useGetDispositionByIdMutate,
} from "../../services/query/disposition";
import { Loader } from "../WithSuspense";

interface iProps {
  isOpenEdit: any;
  onCloseEdit: () => void;
  editID: string;
  userIdData: any;
  refetchAllUser: any;
}

export const ViewDispositionModal = ({
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

  const {
    data,
    isLoading,
    refetch: refetchAllUser2,
  } = useGetDispositionById(editID);
  console.log(data);
  const viewData = data?.document;

  const { mutate, isLoading: loader } = useGetDispositionByIdMutate({
    onSuccess: (res: any) => {
      console.log(res);
      setTimeout(() => {
        queryClient.invalidateQueries(GET_DISPOSITION_BY_ID);
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
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Disposition</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          {isLoading ? (
            <Loader />
          ) : (
            <Box w="90%" margin="auto" mt="-5">
              <Box>
                {viewData?.dispositionType !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Disposition Type:
                    </Text>
                    <Box> {viewData?.dispositionType}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.typeOfCustomer !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Type Of Customer:
                    </Text>
                    <Box> {viewData?.typeOfCustomer}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.agentId !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Agent ID:
                    </Text>
                    <Box> {viewData?.agentId}</Box>
                  </Flex>
                ) : null}
              </Box>
              <Box>
                {viewData?.amountToPayToday !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Amount to Pay:
                    </Text>
                    <Box> {viewData?.amountToPayToday}</Box>
                  </Flex>
                ) : null}
              </Box>
              <Box>
                {viewData?.callAnswered !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Call Answered:
                    </Text>
                    <Box> {viewData?.callAnswered}</Box>
                  </Flex>
                ) : null}
              </Box>
              <Box>
                {viewData?.callPurpose !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Call Purpose:
                    </Text>
                    <Box> {viewData?.callPurpose}</Box>
                  </Flex>
                ) : null}
              </Box>
              <Box>
                {viewData?.callStatus !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Call Status:
                    </Text>
                    <Box> {viewData?.callStatus}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.comment !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Comment:
                    </Text>
                    <Box> {viewData?.comment}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.commitmentDate !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Commitment Date:
                    </Text>
                    <Box> {viewData?.commitmentDate}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.contactPlatform !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Contact Platform:
                    </Text>
                    <Box> {viewData?.contactPlatform}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.customer360download !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Customer 360 download:
                    </Text>
                    <Box> {viewData?.customer360download}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.customerResponse !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Customer Response:
                    </Text>
                    <Box> {viewData?.customerResponse}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.customerReview !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Customer Review:
                    </Text>
                    <Box> {viewData?.customerReview}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.dateCreated !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Date Created:
                    </Text>
                    <Box> {viewData?.dateCreated}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.idCardCheck !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Id Card Check:
                    </Text>
                    <Box> {viewData?.idCardCheck}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.idType !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Id Type:
                    </Text>
                    <Box> {viewData?.idType}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.nameOfBrowser !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Customer's Name:
                    </Text>
                    <Box> {viewData?.nameOfBrowser}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.numberOfDays !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Number Of Days:
                    </Text>
                    <Box> {viewData?.numberOfDays}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.phoneNumber !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Phone Number:
                    </Text>
                    <Box> {viewData?.phoneNumber}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.promiseToPay !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Promise To Pay:
                    </Text>
                    <Box> {viewData?.promiseToPay}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.reminderDone !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Reminder Done:
                    </Text>
                    <Box> {viewData?.reminderDone}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.reasonForNoPayment !== "" ? (
                  <Flex>
                    <Text fontWeight="bold" mr="2">
                      Reason For Non Payment:
                    </Text>
                    <Box> {viewData?.reasonForNoPayment}</Box>
                  </Flex>
                ) : null}
              </Box>

              <Box>
                {viewData?.subReasonForNoPayment !== "" ? (
                  <Box>
                    <Text fontWeight="bold" mr="2">
                      Sub Reason For No Payment:
                    </Text>
                    <Box> {viewData?.subReasonForNoPayment}</Box>
                  </Box>
                ) : null}
              </Box>
            </Box>
          )}
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Edit User
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
