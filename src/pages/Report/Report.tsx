import { Search2Icon } from "@chakra-ui/icons";
import {
  EditIcon,
  DeleteIcon,
  PhoneIcon,
  SearchIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EmailIcon,
  InfoOutlineIcon,
  ChatIcon,
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
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Loader } from "../../components/WithSuspense";
import { useGetCustomerDetailSearchMutate } from "../../services/query/customer";
import { useGetDispositionReportMutate } from "../../services/query/disposition";
import useCustomToast from "../../utils/notification";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMonetizationOn } from "react-icons/md";

const Report = () => {
  const { errorToast, successToast } = useCustomToast();

  const [searchedWords, setSearchedWords] = useState("");
  const [noSearchRecord, setNoSearchRecord] = useState("");
  const [allSearchedUserData, setAllSearchedUserData] = useState([]);
  const [searchResponse, setSearchResponse] = useState(false);

  const { mutate: searchMutate, isLoading: searchLoader } =
    useGetDispositionReportMutate({
      onSuccess: (res: any) => {
        console.log(res);
        setAllSearchedUserData(res?.document?.records);
        setSearchResponse(true);
        setNoSearchRecord(res?.message);
        if (res?.document === null) {
          errorToast(res?.message);
          setSearchResponse(false);
        } else {
          successToast(res?.message);
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

    if (noSearchRecord === "No Record Found") {
      errorToast("No Record Found");
    }

    searchMutate({
      // phoneNumber: "08036975694",
      page: 1,
      itemsPerPage: 100,
      searchKey: 15,
      searchDate: searchedWords,
    });
  };

  return (
    <div>
      {searchLoader ? (
        <Loader />
      ) : (
        <Box>
          {/* <Text mb="5">Customer Book Loan</Text> */}
          <InputGroup
            w={["100%", "300px", "300px", "300px"]}
            size={"md"}
            border="grey"
          >
            <Input
              type="date"
              placeholder="Search User"
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
            <TableContainer
              bg="white"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Table size="sm">
                <Thead bgColor="gray.200">
                  <Tr>
                    <Th color="#26C6DA" py="4">
                      Agent ID
                    </Th>
                    <Th color="#26C6DA">Customer Name</Th>
                    <Th color="#26C6DA">Email</Th>
                    <Th color="#26C6DA">Amount to Pay Today</Th>
                    <Th color="#26C6DA">Phone Number</Th>
                    <Th color="#26C6DA">Reason For No Payment</Th>
                    <Th color="#26C6DA">Promise To Pay </Th>
                    <Th color="#26C6DA">Comment</Th>
                    <Th color="#26C6DA">Enter Date</Th>
                  </Tr>
                </Thead>
                {}
                <Tbody>
                  {allSearchedUserData?.map((info: any) => (
                    <Tr
                      key={info.id}
                      cursor="pointer"
                      _hover={{ background: "whitesmoke" }}
                    >
                      <Td py="3">{info?.agentId}</Td>
                      {/* <Td>{info?.customerId}</Td> */}
                      {/* <Td>{info?.loanId}</Td> */}
                      {/* <Td>{info?.disbursementDate?.slice(0, 10)}</Td> */}
                      <Td py="3" display="flex" alignItems="center">
                        <Icon
                          as={CgProfile}
                          mr="3"
                          color="#26C6DA"
                          boxSize="4"
                        />
                        {info?.nameOfBrowser}
                      </Td>
                      <Td py="3">
                        <EmailIcon mr="3" color="#26C6DA" />
                        {info?.email}
                      </Td>
                      <Td py="3" display="flex" alignItems="center">
                        <Icon
                          as={MdOutlineMonetizationOn}
                          mr="3"
                          color="green"
                          boxSize="4"
                        />
                        {info?.amountToPayToday}
                      </Td>
                      <Td py="3">
                        <PhoneIcon mr="3" color="green" />
                        {info?.phoneNumber}
                      </Td>
                      <Td py="3">
                        <InfoOutlineIcon mr="3" color="orange" />
                        {info?.reasonForNoPayment}
                      </Td>
                      <Td>{info?.promiseToPay}</Td>
                      <Td py="3">
                        <ChatIcon mr="3" />
                        {info?.comment}
                      </Td>
                      <Td>{info?.dateCreated?.slice(0, 10)}</Td>

                      {/* 
                      <Td>{info?.category}</Td>
                      <Td>{info?.callStatus}</Td>
                      <Td>{info?.cc}</Td>
                      <Td>{info?.commitmentDate}</Td>
                      <Td>{info?.numberOfDays}</Td>
                      <Td>{info?.subReasonForNoPayment}</Td>
                      <Td>{info?.subject}</Td>
                      <Td>{info?.messageBody}</Td>
                      <Td>{info?.flag}</Td> */}
                      <Td>
                        {/* <Icon
                          onClick={() => {
                            setEditID(info?.id);
                            onOpenEdit();
                            byIdMutate({
                              id: info?.id,
                            });
                          }}
                          as={EditIcon}
                          boxSize={5}
                          mr="3"
                          cursor="pointer"
                        /> */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {searchResponse === false && (
              <Box
                bgColor="white"
                height="200px"
                display="flex"
                justifyContent="center"
              >
                <Box margin="auto" textAlign="center">
                  <>
                    <Search2Icon boxSize={10} color="#26C6DA" mb="3" />
                    <Text>Search with Date to get a response</Text>
                  </>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Report;
