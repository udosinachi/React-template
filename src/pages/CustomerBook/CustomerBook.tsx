import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LinkIcon,
  Search2Icon,
} from "@chakra-ui/icons";
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
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PhoneIcon, CalendarIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
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
        console.log(res?.document?.records);
        setAllSearchedUserData(res?.document?.records);
        setNoSearchRecord(res?.message);
        setSearchResponse(true);
        if (res?.document?.records?.length === 0) {
          setSearchResponse(false);
          errorToast("No Record Found");
        } else {
          successToast("Record Found");
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
    if (searchedWords.length > 11) {
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
  const useAllCustomerData = allCustomerData?.document?.records;
  console.log(allCustomerData);
  // console.log(allCustomerData?.document?.meta);

  const pageNumbers: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = useAllCustomerData?.slice(
  //   indexOfFirstRecord,
  //   indexOfLastRecord
  // );
  // console.log(currentRecords, "Recc");
  // const nPages = Math.ceil(allUserData?.length / recordsPerPage);
  // console.log(nPages, "npage");

  const nextPage = () => {
    // if (currentPage !== nPages) {
    // setCurrentPage(currentPage + 1);
    // searchMutate({
    //   searchKey: searchedWords,
    //   page: currentPage,
    //   itemsPerPage: recordsPerPage,
    // });
    // }
  };
  const prevPage = () => {
    // if (currentPage !== 1) {
    //   setCurrentPage(currentPage - 1);
    //   // searchMutate({
    //   //   searchKey: searchedWords,
    //   //   page: currentPage,
    //   //   itemsPerPage: recordsPerPage,
    //   // });
    // }
  };

  const tableSizeChanger = (e: any) => {
    // setRecordsPerPage(e.target.value);
  };

  return (
    <div>
      {itsLoading || searchLoader ? (
        <Loader />
      ) : (
        <Box pb="5">
          {/* <Text mb="5">Customer Book Loan</Text> */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <InputGroup
              w={["100%", "300px", "300px", "300px"]}
              size={"md"}
              border="grey"
            >
              <Input
                type="text"
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
            {/* <Text>Total of {totalCustomerNumber} Customers</Text> */}
          </Box>
          <Box mt="5">
            <TableContainer
              bg="white"
              pb="5"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Table size="sm">
                <Thead bgColor="gray.200">
                  <Tr>
                    {/* <Th color="#26C6DA" py="4">
                      Customer ID
                    </Th> */}
                    <Th color="#26C6DA">Full Name</Th>
                    <Th color="#26C6DA">Msisdn</Th>
                    <Th color="#26C6DA">Device Cost</Th>
                    <Th color="#26C6DA">Activation Date</Th>
                    <Th color="#26C6DA">Device Type</Th>
                  </Tr>
                </Thead>
                {!allSearchedUserData || allSearchedUserData?.length === 0
                  ? useAllCustomerData?.map((customerList: any) => (
                      <Tbody key={customerList?.customerName}>
                        <Tr
                          cursor="pointer"
                          _hover={{ bgColor: "whitesmoke" }}
                          onClick={() => {
                            navigate(
                              `/customer-book-details/${customerList?.msisdn}`
                            );
                          }}
                        >
                          {/* <Td py="3">{customerList?.id}</Td> */}
                          <Td py="3" display="flex" alignItems="center">
                            <Icon
                              as={CgProfile}
                              mr="3"
                              color="#26C6DA"
                              boxSize="4"
                            />
                            {customerList?.customerName}
                          </Td>
                          <Td py="3">
                            <PhoneIcon mr="3" color="green" />
                            {customerList?.msisdn}
                          </Td>
                          <Td>{customerList?.deviceCost}</Td>
                          <Td py="3">
                            <CalendarIcon mr="3" color="#26C6DA" />
                            {customerList?.dateActivated}
                          </Td>
                          <Td py="3">
                            <LinkIcon mr="3" color="green" />
                            {customerList?.deviceType}
                          </Td>
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
                          <Td py="3" display="flex" alignItems="center">
                            <Icon
                              as={CgProfile}
                              mr="3"
                              color="#26C6DA"
                              boxSize="4"
                            />
                            {customerList?.firstname} {customerList?.lastname}
                          </Td>
                          <Td py="3">
                            <PhoneIcon mr="3" color="green" />
                            {customerList?.msisdn}
                          </Td>
                          <Td>{customerList?.bvn}</Td>
                          <Td py="3">
                            <CalendarIcon mr="3" color="#26C6DA" />
                            {customerList?.activationDate}
                          </Td>
                          <Td py="3">
                            <LinkIcon mr="3" color="green" />
                            {customerList?.preCustomers[0]?.address1}
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
              </Table>
            </TableContainer>
            <Box>
              <Flex flexWrap="wrap" mt="3" fontSize="13px">
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  mr="2"
                  border="grey"
                  borderRadius="5px"
                  w="35px"
                  h="35px"
                  cursor="pointer"
                  bgColor="white"
                  onClick={prevPage}
                  color="#26C6DA"
                  // mr="3"
                  _hover={{ background: "#26C6DA", color: "white" }}
                >
                  <ArrowLeftIcon />
                </Flex>
                {pageNumbers.map((pgNumber: any) => (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    mr="2"
                    border="grey"
                    borderRadius="5px"
                    w="35px"
                    h="35px"
                    cursor="pointer"
                    mb="2"
                    // color={`${currentPage === pgNumber ? "white" : "#26C6DA"}`}
                    key={pgNumber}
                    // bgColor={`${
                    //   currentPage === pgNumber ? "#26C6DA" : "white"
                    // }`}
                    bgColor="white"
                    onClick={() => {
                      // setCurrentPage(pgNumber);
                    }}
                    _hover={{ background: "#26C6DA", color: "white" }}
                  >
                    {pgNumber}
                  </Flex>
                ))}
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  mr="2"
                  border="grey"
                  borderRadius="5px"
                  w="35px"
                  h="35px"
                  bgColor="white"
                  cursor="pointer"
                  onClick={nextPage}
                  color="#26C6DA"
                  _hover={{ background: "#26C6DA", color: "white" }}
                  // ml="3"
                >
                  <ArrowRightIcon />
                </Flex>
                <Flex p="1" px="2" align="center">
                  PageSize
                  <Select
                    size="xs"
                    ml="3"
                    w="55px"
                    h="35px"
                    onChange={tableSizeChanger}
                    border="grey"
                    bgColor="white"
                    borderRadius="5px"
                  >
                    {/* <option value="5">5</option> */}
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </Select>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default CustomerBook;
