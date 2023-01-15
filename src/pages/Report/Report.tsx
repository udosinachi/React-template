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
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Loader } from "../../components/WithSuspense";
import { useGetCustomerDetailSearchMutate } from "../../services/query/customer";
import {
  useGetDispositionAgentReport,
  useGetDispositionAgentReportMutate,
  useGetDispositionReportByDateMutate,
  useGetDispositionReportMutate,
} from "../../services/query/disposition";
import useCustomToast from "../../utils/notification";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { useGetUserInfoForAgents } from "../../services/query/user";

const Report = () => {
  const { errorToast, successToast } = useCustomToast();

  const [searchedWords, setSearchedWords] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [noSearchRecord, setNoSearchRecord] = useState("");
  const [allSearchedUserData, setAllSearchedUserData] = useState([]);
  const [searchResponse, setSearchResponse] = useState(false);

  const { mutate: searchMutate, isLoading: searchLoader } =
    useGetDispositionReportByDateMutate({
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
    if (FromDate.length === 0) {
      errorToast("Enter a Start Date");
      return false;
    }
    if (ToDate.length === 0) {
      errorToast("Enter an End Date");
      return false;
    }

    if (noSearchRecord === "No Record Found") {
      errorToast("No Record Found");
    }

    searchMutate({
      page: 1,
      itemsPerPage: 100,
      fromDate: FromDate,
      toDate: ToDate,
    });
  };

  const {
    data: dataAgent,
    isLoading: isLoadingAgent,
    refetch: refetchAgent,
  } = useGetUserInfoForAgents();
  const AgentData = dataAgent?.document;
  // console.log(AgentData);
  const [listOfAgent, setListOfAgent] = useState("");

  // const {
  //   data: dataAgentTopReport,
  //   isLoading: isLoadingAgentTopReport,
  //   refetch: refetchAgentTopReport,
  // } = useGetDispositionAgentReport(listOfAgent, 5);
  // const dataAgentTopReportList = dataAgentTopReport?.document?.records;
  // console.log(dataAgentTopReportList);

  const {
    mutate: searchMutateAgentReport,
    isLoading: searchLoaderAgentReport,
  } = useGetDispositionAgentReportMutate({
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

  const optionChanger = (e: any) => {
    console.log(e.target.value);

    if (noSearchRecord === "No Record Found") {
      errorToast("No Record Found");
    }

    searchMutateAgentReport({
      agentId: e.target.value,
      itemsNumber: 5,
    });
  };

  return (
    <div>
      {searchLoader ? (
        <Loader />
      ) : (
        <Box>
          <Box bgColor="white" p="5">
            <Box>
              <Text>Start Date</Text>
              <Input
                type="date"
                placeholder="Search User"
                value={FromDate}
                onChange={(e) => setFromDate(e.target.value)}
                mb="5"
              />
            </Box>
            <Box>
              <Text>End Date</Text>
              <Input
                type="date"
                placeholder="Search User"
                value={ToDate}
                onChange={(e) => setToDate(e.target.value)}
                mb="5"
              />
            </Box>
            <Button
              bgColor="#26C6DA"
              color="white"
              cursor="pointer"
              onClick={() => searchHandler()}
              // onClick={() => setUserInfoToggle("Searched")}
            >
              Search
            </Button>

            {/* <Box bg="white" mb="5" mt="3">
              <FormControl mr="2">
                <FormLabel>List of Agents</FormLabel>

                <Select onChange={(e) => optionChanger(e)}>
                  <option value="">-- Select an Agent --</option>
                  {AgentData?.reverse()?.map((choose: any) => (
                    <option key={choose?.id} value={choose?.id}>
                      {choose?.id} {choose?.firstName} {choose?.lastName}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box> */}
          </Box>
          <Box mt="5">
            <TableContainer
              bg="white"
              mb="5"
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
                    <Th color="#26C6DA">First Name</Th>
                    <Th color="#26C6DA">Last Name</Th>
                    <Th color="#26C6DA">Email</Th>
                    <Th color="#26C6DA">Answered</Th>
                    <Th color="#26C6DA">Not Answered</Th>
                    <Th color="#26C6DA">Last Call Status </Th>
                    <Th color="#26C6DA">Last Date Created</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {allSearchedUserData?.map((info: any) => (
                    <Tr
                      key={info.id}
                      cursor="pointer"
                      _hover={{ background: "whitesmoke" }}
                    >
                      <Td py="3">{info?.agentId}</Td>
                      <Td py="3" display="flex" alignItems="center">
                        <Icon
                          as={CgProfile}
                          mr="3"
                          color="#26C6DA"
                          boxSize="4"
                        />
                        {info?.firstName}
                      </Td>
                      <Td py="3">{info?.lastName}</Td>
                      <Td py="3" display="flex" alignItems="center">
                        <EmailIcon mr="3" color="#26C6DA" />
                        {info?.email}
                      </Td>
                      <Td py="3">
                        <PhoneIcon mr="3" color="green" />
                        {info?.answered}
                      </Td>
                      <Td py="3">
                        <InfoOutlineIcon mr="3" color="orange" />
                        {info?.notAnswered}
                      </Td>
                      <Td>{info?.lastCallStatus?.slice(0, 10)}</Td>
                      <Td py="3">
                        {/* <ChatIcon mr="3" /> */}
                        {info?.lastDateCreated?.slice(0, 10)}
                      </Td>
                      {/* <Td>{info?.dateCreated?.slice(0, 10)}</Td> */}
                      {/* <Td>
                        <Icon
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
                        />
                      </Td> */}
                    </Tr>
                  ))}
                </Tbody>
                {/* <Tbody>
                  {dataAgentTopReportList?.map((info: any) => (
                    <Tr
                      key={info.id}
                      cursor="pointer"
                      _hover={{ background: "whitesmoke" }}
                    >
                      <Td py="3">{info?.agentId}</Td>
                      
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
                    </Tr>
                  ))}
                </Tbody> */}
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
