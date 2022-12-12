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
import { useGetCustomerDetailSearch } from "../../services/query/customer";

const CustomerBookDetails = () => {
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
  } = useGetCustomerDetailSearch();
  //   console.log(data);
  return (
    <div>
      {isLoading && <Loader />}
      <Box>
        <Text>Customer Details</Text>
        <Box>
          <Box>
            <Flex justifyContent="flex-end">
              <Button mb="3" onClick={onOpen}>
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
                  <Text>Ayobolu Segun</Text>
                </Flex>
                <Flex mb="1">
                  <Text w="150px" fontWeight="700">
                    Mobile No:{" "}
                  </Text>
                  <Text>09876553425</Text>
                </Flex>
                <Flex mb="1">
                  <Text w="150px" fontWeight="700">
                    Email:{" "}
                  </Text>
                  <Text>abcdefghijklmno@gmail.com</Text>
                </Flex>
                <Flex mb="1">
                  <Text w="150px" fontWeight="700">
                    Amount Repaid:{" "}
                  </Text>
                  <Text>56,890</Text>
                </Flex>

                <Flex mb="1">
                  <Text w="150px" fontWeight="700">
                    Address:{" "}
                  </Text>
                  <Text>No 1 way, double change avenue</Text>
                </Flex>
              </Box>

              <Box p="5" w="100%">
                <Text fontWeight="700" fontSize="20px" p="3">
                  General Information
                </Text>
                <Divider />
                <Flex flexWrap="wrap">
                  <Box mr="5">
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Amount to repay today:{" "}
                      </Text>
                      <Text>56,890</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Bank Name:{" "}
                      </Text>
                      <Text>Wema Bank</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Days Late:{" "}
                      </Text>
                      <Text>150</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Days past due:{" "}
                      </Text>
                      <Text>Bucket 3</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Disbursement Date:{" "}
                      </Text>
                      <Text>23-12-2022</Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Amount to repay today:{" "}
                      </Text>
                      <Text>56,890</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Bank Name:{" "}
                      </Text>
                      <Text>Wema Bank</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Days Late:{" "}
                      </Text>
                      <Text>150</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Days past due:{" "}
                      </Text>
                      <Text>Bucket 3</Text>
                    </Flex>
                    <Flex mb="1">
                      <Text w="200px" fontWeight="700">
                        Disbursement Date:{" "}
                      </Text>
                      <Text>23-12-2022</Text>
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
    </div>
  );
};

export default CustomerBookDetails;
