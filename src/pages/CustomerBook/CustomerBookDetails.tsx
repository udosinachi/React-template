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
  // const displayedData2 = data?.document?.records[0]?.preCustomers[0];
  console.log(data);

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
                {localStorage.getItem("role")?.toString() ===
                  "customerserv1" && (
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
                )}
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
                      {/* {displayedData?.firstname} {displayedData?.lastname}{" "} */}
                      {displayedData?.customerName}
                    </Text>
                  </Flex>
                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      Mobile No:{" "}
                    </Text>
                    {/* <Text>{displayedData?.msisdn}</Text> */}
                    <Text>{id}</Text>
                  </Flex>
                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      Financier:{" "}
                    </Text>
                    <Text>{displayedData?.financier}</Text>
                  </Flex>
                  <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      Store Name:{" "}
                    </Text>
                    <Text>{displayedData?.storeName}</Text>
                  </Flex>
                  {/* <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      Address:{" "}
                    </Text>
                    <Text>{displayedData2?.address1}</Text>
                  </Flex> */}
                  {/* <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      DOB:{" "}
                    </Text>
                    <Text>{displayedData2?.dob}</Text>
                  </Flex> */}
                  {/* <Flex mb="1">
                    <Text w="150px" fontWeight="700">
                      BVN Status:{" "}
                    </Text>
                    <Text>{displayedData2?.bvnStatus}</Text>
                  </Flex> */}
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
                          Alt MSISDN:{" "}
                        </Text>
                        <Text>{displayedData?.alternateMSISDN}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Repayment Amount:{" "}
                        </Text>
                        <Text>{displayedData?.repaymentAmount}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Device Type:{" "}
                        </Text>
                        <Text>{displayedData?.deviceType}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Renewal Count:{" "}
                        </Text>
                        <Text>{displayedData?.renewalCount}</Text>
                      </Flex>
                    </Box>
                    <Box mr="10">
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Tenure:{" "}
                        </Text>
                        <Text>{displayedData?.tenure}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Date Activated:{" "}
                        </Text>
                        <Text>{displayedData?.dateActivated}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Date Extended:{" "}
                        </Text>
                        <Text>{displayedData?.dateExtended}</Text>
                      </Flex>
                      <Flex mb="1">
                        <Text w="200px" fontWeight="700">
                          Date Released:{" "}
                        </Text>
                        <Text>{displayedData?.dateReleased}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                  {/* <Flex flexWrap="wrap" mt="2">
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
                  </Flex> */}
                </Box>
              </Flex>
            </Box>
          </Box>
          <AddDispositionModal
            isOpen={isOpen}
            onClose={onClose}
            refetchAllUser={refetchAllUser}
            firstName={displayedData?.customerName}
            lastName={displayedData?.customerName}
            idIndex={displayedData?.id}
          />
        </Box>
      )}
    </div>
  );
};

export default CustomerBookDetails;
