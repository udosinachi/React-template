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
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Loader } from "../../components/WithSuspense";
import { useGetCustomerDetailSearchMutate } from "../../services/query/customer";
import useCustomToast from "../../utils/notification";

const CustomerBook = () => {
  const { errorToast, successToast } = useCustomToast();

  const [searchedWords, setSearchedWords] = useState("");
  const [noSearchRecord, setNoSearchRecord] = useState("");
  const [allSearchedUserData, setAllSearchedUserData] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [customerFirstname, setCustomerFirstname] = useState("");
  const [customerLastname, setCustomerLastname] = useState("");
  const [customerMsisdn, setCustomerMsisdn] = useState("");
  const [customerBVN, setCustomerBVN] = useState("");
  const [customerActivationDate, setCustomerActivationDate] = useState("");
  const [preCustomers, setPreCustomers] = useState([]);
  const [customerAddress, setCustomerAddress] = useState("");
  const [searchResponse, setSearchResponse] = useState(false);
  // const [falseSearchResponse, setFalseSearchResponse] = useState(false);
  const [theData, setTheData] = useState({});

  const { mutate: searchMutate, isLoading: searchLoader } =
    useGetCustomerDetailSearchMutate({
      onSuccess: (res: any) => {
        console.log(res);
        setTheData(res?.document?.data);
        setCustomerID(res?.document?.data?.id);
        setCustomerFirstname(res?.document?.data?.firstname);
        setCustomerLastname(res?.document?.data?.lastname);
        setCustomerMsisdn(res?.document?.data?.msisdn);
        setCustomerBVN(res?.document?.data?.bvn);
        setCustomerActivationDate(res?.document?.data?.activationDate);
        setPreCustomers(res?.document?.data?.preCustomers);
        setCustomerAddress(res?.document?.data?.preCustomers[0]?.address1);
        console.log(res?.document?.data?.preCustomers);
        setAllSearchedUserData(res?.document?.records);
        setSearchResponse(true);
        setNoSearchRecord(res?.message);
        if (res?.document?.data === null) {
          errorToast(res?.document?.message);
        } else {
          successToast(res?.document?.message);
          // setFalseSearchResponse(true);
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

  return (
    <div>
      {searchLoader && <Loader />}
      <Box>
        <Text mb="5">Customer Book Loan</Text>
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
          <TableContainer bg="white">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Customer ID</Th>
                  <Th>Full Name</Th>
                  <Th>Msisdn</Th>
                  <Th>BVN</Th>
                  <Th>Address</Th>
                  <Th>Activation Date</Th>
                </Tr>
              </Thead>
              {}
              <Tbody>
                <Tr
                  cursor="pointer"
                  _hover={{ bgColor: "whitesmoke" }}
                  onClick={() => {
                    window.location.href = "/customer-book-details";
                  }}
                >
                  <Td>{customerID}</Td>
                  <Td>
                    {customerFirstname} {customerLastname}
                  </Td>
                  <Td>{customerMsisdn}</Td>
                  <Td>{customerBVN}</Td>
                  <Td>{customerAddress?.toUpperCase()}</Td>
                  <Td>{customerActivationDate}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Box
            bgColor="white"
            height="200px"
            display="flex"
            justifyContent="center"
          >
            <Box margin="auto" textAlign="center">
              {!searchResponse && (
                <>
                  <Search2Icon boxSize={10} color="#26C6DA" mb="3" />
                  <Text>Search with phone number to get a response</Text>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CustomerBook;
