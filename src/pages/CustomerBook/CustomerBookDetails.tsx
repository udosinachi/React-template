import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddDispositionModal } from "../../components/modals/AddDispositionModal";
import { EditDispositionModal } from "../../components/modals/EditDispositionModal";
import { Loader } from "../../components/WithSuspense";
import {
  useGetCustomerDetailSearch,
  useGetCustomerDetailSearchByNumber,
} from "../../services/query/customer";
import { useParams } from "react-router-dom";

const CustomerBookDetails = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editID, setEditID] = useState("");
  const [userIdData, setUserIdData] = useState("");
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const {
    data,
    isLoading,
    refetch: refetchAllUser,
  } = useGetCustomerDetailSearchByNumber(id);
  const displayedData = data?.document?.records[0];
  const displayedData2 = data?.document?.records[0]?.preCustomers[0];
  console.log(data);
  //   console.log(data?.document?.data?.preCustomers[0]);

  //   console.log(data?.document?.data?.preCustomers);
  //   const customerDetailsArray = data?.document?.data?.preCustomers;

  //   const precustomerArray = [];
  //   for (let i = 0; i < customerDetailsArray?.length; i++) {
  //     precustomerArray.push(customerDetailsArray[i]?.kycInfos);
  //   }
  //   console.log(precustomerArray[0]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box fontStyle="Raleway">
          <Text>Customer Details {id}</Text>
          <Box>
            <Box>
              <Flex justifyContent="flex-end">
                <Button
                  mb="3"
                  onClick={onOpen}
                  bgColor="#26C6DA"
                  color="white"
                  _hover={{ background: "#26C6DA", color: "white" }}
                  _active={{ background: "#26C6DA", color: "white" }}
                  _focus={{ background: "#26C6DA", color: "white" }}
                >
                  Fill Disposition
                </Button>
              </Flex>
            </Box>
            <Box bgColor="white" border="1px solid silver">
              <Flex flexWrap="wrap">
                <Box
                  bgColor="whitesmoke"
                  m="20px"
                  mt="0"
                  p="5"
                  boxShadow="lg"
                  height="fit-content"
                  width="100%"
                >
                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      Full Name:{" "}
                    </Text>
                    <Text>
                      {displayedData?.firstname} {displayedData?.lastname}{" "}
                    </Text>
                  </Flex>
                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      Address:{" "}
                    </Text>
                    <Text>{displayedData2?.address1}</Text>
                  </Flex>
                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      Mobile No:{" "}
                    </Text>
                    <Text>{displayedData?.msisdn}</Text>
                  </Flex>

                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      DOB:{" "}
                    </Text>
                    <Text>{displayedData2?.dob}</Text>
                  </Flex>
                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      BVN Status:{" "}
                    </Text>
                    <Text>{displayedData2?.bvnStatus}</Text>
                  </Flex>
                </Box>

                <Box p="5" w="100%">
                  <Text fontWeight="700" fontSize="20px" p="3">
                    General Information
                  </Text>
                  <Divider />
                  <Flex flexWrap="wrap" mt="2">
                    <Box mr="10">
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          First Name:{" "}
                        </Text>
                        <Text>{displayedData2?.fname}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Last Name:{" "}
                        </Text>
                        <Text>{displayedData2?.lname}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Customer ID:{" "}
                        </Text>
                        <Text>{displayedData2?.customerId}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Ref No:{" "}
                        </Text>
                        <Text>{displayedData2?.refNo}</Text>
                      </Flex>
                    </Box>
                    <Box>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Device ID:{" "}
                        </Text>
                        <Text>{displayedData2?.deviceId}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          BVN Number:{" "}
                        </Text>
                        <Text>{displayedData2?.bvnNumber}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Risk Class:{" "}
                        </Text>
                        <Text>{displayedData2?.riskClass}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Created Date:{" "}
                        </Text>
                        <Text>{displayedData2?.created}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
          <AddDispositionModal
            isOpen={isOpen}
            onClose={onClose}
            refetchAllUser={refetchAllUser}
          />
        </Box>
      )}
    </div>
  );
};

export default CustomerBookDetails;
