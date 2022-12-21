import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader } from "../../components/WithSuspense";
import {
  useGetCustomerDetailSearch,
  useGetCustomerDetailSearchMutate,
} from "../../services/query/customer";
import useCustomToast from "../../utils/notification";

const CustomerBook = () => {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();

  const [searchedWords, setSearchedWords] = useState("");
  const [noSearchRecord, setNoSearchRecord] = useState("");
  const [allSearchedUserData, setAllSearchedUserData] = useState([]);
  const [searchResponse, setSearchResponse] = useState(false);

  const { mutate: searchMutate, isLoading: searchLoader } =
    useGetCustomerDetailSearchMutate({
      onSuccess: (res: any) => {
        console.log(res);
        console.log(res?.document?.data);
        setAllSearchedUserData(res?.document?.data);
        setNoSearchRecord(res?.message);
        setSearchResponse(true);
        if (res?.document?.data?.length === 0) {
          setSearchResponse(false);
          errorToast(res?.document?.message);
        } else {
          successToast(res?.document?.message);
        }
      },
      onError: (err: any) => {
        console.log(err?.response?.data);
        errorToast(err?.response?.data);
      },
    });

  const searchHandler = () => {
    if (searchedWords.length === 0) {
      errorToast("Empty Field");
      return false;
    }
    if (searchedWords.length < 11) {
      errorToast("Invalid Number");
      return false;
    }
    if (noSearchRecord === "No Record Found") {
      errorToast("No Record Found");
    }

    searchMutate({
      // phoneNumber: "08036975694",
      phoneNumber: searchedWords,
    });
  };

  const {
    data: allCustomerData,
    isLoading: itsLoading,
    refetch: toRefetch,
  } = useGetCustomerDetailSearch();
  const useAllCustomerData = allCustomerData?.document?.data;
  const totalCustomerNumber = allCustomerData?.document?.meta?.totalCount;
  console.log(allCustomerData);
  console.log(allCustomerData?.document?.meta);

  return (
    <div>
      {itsLoading || searchLoader ? (
        <Loader />
      ) : (
        <Box pb="5">
          {/* <Text mb="5">Customer Book Loan</Text> */}
          <InputGroup
            w={["100%", "200px", "200px", "300px"]}
            size={"sm"}
            border="1px solid black"
          >
            <Input
              type="number"
              placeholder="Search with Msisdn"
              value={searchedWords}
              onChange={(e) => setSearchedWords(e.target.value)}
            />
            <InputRightAddon
              children="Search"
              bgColor="#26C6DA"
              color="white"
              cursor="pointer"
              onClick={() => searchHandler()}
              // onClick={() => setUserInfoToggle("Searched")}
            />
          </InputGroup>
          <Box mt="5">
            <TableContainer bg="white" pb="5">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Customer ID</Th>
                    <Th>Full Name</Th>
                    <Th>Msisdn</Th>
                    <Th>BVN</Th>
                    <Th>Activation Date</Th>
                    <Th>Address</Th>
                  </Tr>
                </Thead>
                {!allSearchedUserData || allSearchedUserData?.length === 0
                  ? useAllCustomerData?.map((customerList: any) => (
                      <Tbody key={customerList?.id}>
                        <Tr
                          cursor="pointer"
                          _hover={{ bgColor: "whitesmoke" }}
                          onClick={() => {
                            navigate(
                              `/customer-book-details/${customerList?.msisdn}`
                            );
                          }}
                        >
                          <Td>{customerList?.id}</Td>
                          <Td>
                            {customerList?.firstname} {customerList?.lastname}
                          </Td>
                          <Td>{customerList?.msisdn}</Td>
                          <Td>{customerList?.bvn}</Td>
                          <Td>{customerList?.activationDate}</Td>
                          <Td>{customerList?.preCustomers[0]?.address1}</Td>
                        </Tr>
                      </Tbody>
                    ))
                  : allSearchedUserData?.map((customerList: any) => (
                      <Tbody key={customerList?.id}>
                        <Tr
                          cursor="pointer"
                          _hover={{ bgColor: "whitesmoke" }}
                          onClick={() => {
                            navigate(
                              `/customer-book-details/${customerList?.msisdn}`
                            );
                          }}
                        >
                          <Td>{customerList?.id}</Td>
                          <Td>
                            {customerList?.firstname} {customerList?.lastname}
                          </Td>
                          <Td>{customerList?.msisdn}</Td>
                          <Td>{customerList?.bvn}</Td>
                          <Td>{customerList?.activationDate}</Td>
                          <Td>{customerList?.preCustomers[0]?.address1}</Td>
                        </Tr>
                      </Tbody>
                    ))}
              </Table>
            </TableContainer>
            {/* <Box>
            <Flex flexWrap="wrap" mt="3" fontSize="13px">
              <Box
                p="1"
                px="2"
                border="grey"
                bgColor="#26C6DA"
                color="white"
                cursor="pointer"
                onClick={prevPage}
                mr="3"
              >
                Previous
              </Box>
              {pageNumbers.map((pgNumber: any) => (
                <Box
                  p="1"
                  px="2"
                  border="grey"
                  cursor="pointer"
                  color={`${currentPage === pgNumber ? "white" : "#26C6DA"}`}
                  key={pgNumber}
                  bgColor={`${currentPage === pgNumber ? "#26C6DA" : "white"}`}
                  onClick={() => {
                    setCurrentPage(pgNumber);
                  }}
                >
                  {pgNumber}
                </Box>
              ))}
              <Box
                p="1"
                px="2"
                border="grey"
                bgColor="#26C6DA"
                color="white"
                cursor="pointer"
                onClick={nextPage}
                ml="3"
              >
                Next
              </Box>
              <Flex p="1" px="2" align="center">
                PageSize
                <Select
                  size="xs"
                  ml="3"
                  onChange={tableSizeChanger}
                  border="grey"
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </Select>
              </Flex>
            </Flex>
          </Box> */}
            {/* {searchResponse === false && (
            <Box
              bgColor="white"
              height="200px"
              display="flex"
              justifyContent="center"
            >
              <Box margin="auto" textAlign="center">
                <>
                  <Search2Icon boxSize={10} color="#26C6DA" mb="3" />
                  <Text>Search with phone number to get a response</Text>
                </>
              </Box>
            </Box>
          )} */}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default CustomerBook;
