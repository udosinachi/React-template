import { useState } from "react";
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
  DownloadIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
  Flex,
  Icon,
  InputGroup,
  Input,
  InputRightElement,
  InputRightAddon,
  Select,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  useGetAllUserInfo,
  useDeleteUserInfo,
  useGetUserInfoByIdMutate,
  useGetSearchUserInfo,
  useGetSearchUserInfoMutate,
} from "../../services/query/user";
import useCustomToast from "../../utils/notification";
import { AddUserModal } from "../../components/modals/AddUserModal";
import { Loader } from "../../components/WithSuspense";
import { useQueryClient } from "react-query";
import {
  GET_ALL_DISPOSITION,
  GET_ALL_USER_INFO,
} from "../../services/queryKeys";
import { EditUserModal } from "../../components/modals/EditUserModal";
import { NavLink } from "react-router-dom";
import {
  useDeleteDisposition,
  useGetAllDisposition,
  useGetDispositionByIdMutate,
  useGetDispositionReportByDateMutate,
  useGetDispositionReportMutate,
  useGetSearchDispositionMutate,
} from "../../services/query/disposition";
import { AddDispositionModal } from "../../components/modals/AddDispositionModal";
import { EditDispositionModal } from "../../components/modals/EditDispositionModal";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { ViewDispositionModal } from "../../components/modals/ViewDispositionModal";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const Disposition = () => {
  const queryClient = useQueryClient();
  const { errorToast, successToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [editID, setEditID] = useState("");
  const [userIdData, setUserIdData] = useState("");
  // console.log(userIdData);

  const [allSearchedUserData, setAllSearchedUserData] = useState([]);
  // console.log(allSearchedUserData);
  const [searchedWords, setSearchedWords] = useState("");
  const [noSearchRecord, setNoSearchRecord] = useState("");
  // console.log(noSearchRecord);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  // console.log(currentPage);
  // console.log(recordsPerPage);

  const [typeOfDisposition, setTypeofDisposition] = useState("");

  const {
    data,
    isLoading,
    refetch: refetchAllUser,
  } = useGetAllDisposition(currentPage, recordsPerPage);
  const allUserData = data?.document?.records;
  // console.log(allUserData);

  const { mutate: searchMutate, isLoading: searchLoader } =
    useGetSearchDispositionMutate({
      onSuccess: (res: any) => {
        // console.log(res);
        setAllSearchedUserData(res?.document?.records);
        setNoSearchRecord(res?.message);
      },
      onError: (err: any) => {
        // console.log(err?.response?.data);
        errorToast("Failed to Search");
      },
    });

  const searchHandler = () => {
    // if (searchedWords.length === 0) {
    //   errorToast("No Record Found");
    //   setTimeout(() => {
    //     window.location.href = "/customer-book";
    //   }, 200);
    // }
    if (typeOfDisposition === "") {
      errorToast("Select Type of Call");
      return false;
    }
    if (searchedWords.length < 3) {
      errorToast("Minimum 3 chracters required for search");
      return false;
    }
    if (noSearchRecord === "No Record Found") {
      errorToast("No Record Found");
    } else {
      successToast("Record Found");
    }

    searchMutate({
      dispositionType: typeOfDisposition,
      searchKey: searchedWords,
      page: currentPage,
      itemsPerPage: recordsPerPage,
    });
  };

  const pageNumbers: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allUserData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  // console.log(currentRecords, "Recc");
  const nPages = Math.ceil(allUserData?.length / recordsPerPage);
  // console.log(nPages, "npage");

  const nextPage = () => {
    // if (currentPage !== nPages) {
    setCurrentPage(currentPage + 1);
    // searchMutate({
    //   searchKey: searchedWords,
    //   page: currentPage,
    //   itemsPerPage: recordsPerPage,
    // });
    // }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      // searchMutate({
      //   searchKey: searchedWords,
      //   page: currentPage,
      //   itemsPerPage: recordsPerPage,
      // });
    }
  };

  const tableSizeChanger = (e: any) => {
    setRecordsPerPage(e.target.value);
  };

  const { mutate: byIdMutate, isLoading: loaderId } =
    useGetDispositionByIdMutate({
      onSuccess: (res: any) => {
        // console.log(res);
        setUserIdData(res);
      },
      onError: (err: any) => {
        // console.log(err);
        errorToast("Failed");
      },
    });

  const { mutate, isLoading: isDelete } = useDeleteDisposition({
    onSuccess: (res: any) => {
      // console.log(res);
      successToast("Record Deleted");
      setTimeout(() => {
        queryClient.invalidateQueries(GET_ALL_DISPOSITION);
      }, 200);
    },
    onError: (err: any) => {
      // console.log(err);
      errorToast("Failed");
    },
  });

  const deleteUserInfo = (id: any) => {
    alert("Are you sure");
    // console.log(id);
    mutate({
      id,
    });
  };

  // console.log(editID);

  const {
    mutate: searchMutateAgentReport,
    isLoading: searchLoaderAgentReport,
  } = useGetDispositionReportMutate({
    onSuccess: (res: any) => {
      // console.log(res);
      // setAllSearchedUserData(res?.document?.records);
      // setSearchResponse(true);
      // setNoSearchRecord(res?.message);
      if (res?.document?.totalRecords === 0) {
        errorToast("No Record Found");
        // setSearchResponse(false);
      } else {
        successToast("RecordFound");
        // setFalseSearchResponse(true);
      }
    },
    onError: (err: any) => {
      // console.log(err?.response?.data);
      errorToast(err?.response?.data);
    },
  });

  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");

  const [searchResponse, setSearchResponse] = useState(false);

  const {
    mutate: searchDispositionDateMutate,
    isLoading: searchDispositionDateLoader,
  } = useGetDispositionReportMutate({
    onSuccess: (res: any) => {
      // console.log(res);
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
      // console.log(err?.response?.data);
      errorToast(err?.response?.data);
    },
  });

  const searchDispositionDateHandler = () => {
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

    searchDispositionDateMutate({
      page: 1,
      itemsPerPage: 100,
      fromDate: FromDate,
      toDate: ToDate,
    });
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const { data: dataDisposition } = useGetAllDisposition(1, 1000);
  const theDataDisposition = dataDisposition?.document?.records;

  const handleExport = async () => {
    const ws = XLSX.utils.json_to_sheet(theDataDisposition);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "Dispositions" + fileExtension);
  };

  return (
    <div>
      {isLoading || searchLoader || searchDispositionDateLoader ? (
        <Loader />
      ) : (
        <Box>
          <Box bg="white" p="5" mb="5">
            <Flex
              justifyContent="space-between"
              mb="3"
              flexWrap="wrap"
              alignItems="center"
            >
              <InputGroup
                w={["100%", "300px", "300px", "300px"]}
                size={"md"}
                border="grey"
              >
                <Input
                  type="text"
                  placeholder="Search Disposition"
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
              {/* <Button size={"sm"} bgColor="#26C6DA" color="white" onClick={onOpen}>
            Add Disposition
          </Button> */}
            </Flex>
            <FormControl mr="2" mb="2">
              <FormLabel>Type of Call</FormLabel>
              <Select onChange={(e) => setTypeofDisposition(e.target.value)}>
                <option value="">-- Select a Type --</option>
                <option value="Outbound">Outbound</option>
                <option value="Inbound">Inbound</option>
                <option value="Others">Others</option>
              </Select>
            </FormControl>

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
              onClick={() => searchDispositionDateHandler()}
            >
              Filter
            </Button>
          </Box>

          <Flex justifyContent="flex-end">
            <Button
              onClick={handleExport}
              bgColor="#26C6DA"
              color="white"
              cursor="pointer"
              size="sm"
              rightIcon={<DownloadIcon />}
            >
              Export
            </Button>
          </Flex>
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
                  <Th color="#26C6DA" py="5">
                    Agent ID
                  </Th>
                  <Th color="#26C6DA">Customer Name</Th>
                  <Th color="#26C6DA">Call Type</Th>
                  <Th color="#26C6DA">Phone Number</Th>
                  <Th color="#26C6DA">Amount to Pay Today</Th>
                  <Th color="#26C6DA">Reason For No Payment</Th>
                  <Th color="#26C6DA">Sub Reason For No Payment</Th>
                  <Th color="#26C6DA">Promise To Pay </Th>
                  <Th color="#26C6DA">Comment</Th>
                  <Th color="#26C6DA">Enter Date</Th>
                </Tr>
              </Thead>

              <Tbody>
                {!allSearchedUserData || allSearchedUserData?.length === 0
                  ? allUserData?.map((info: any) => (
                      <Tr
                        key={info.id}
                        cursor="pointer"
                        _hover={{ background: "whitesmoke" }}
                        onClick={() => {
                          setEditID(info?.id);
                          onOpenEdit();
                          byIdMutate({
                            id: info?.id,
                          });
                        }}
                        // background={i % 2 === 0 ? "red" : "blue"}
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
                        <Td py="3">{info?.dispositionType}</Td>
                        <Td py="3">
                          <PhoneIcon mr="3" color="green" />
                          {info?.phoneNumber}
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
                          <InfoOutlineIcon mr="3" color="orange" />
                          {info?.reasonForNoPayment}
                        </Td>
                        <Td py="3">{info?.subReasonForNoPayment}</Td>
                        <Td>{info?.promiseToPay}</Td>
                        <Td py="3">
                          <ChatIcon mr="3" />
                          {info?.comment}
                        </Td>
                        <Td>{info?.dateCreated?.slice(0, 10)}</Td>

                        {/* 
                      
                        {/* <Td>
                          <Icon
                            onClick={() => deleteUserInfo(info?.id)}
                            as={DeleteIcon}
                            boxSize={5}
                            color="red.500"
                            cursor="pointer"
                          />
                        </Td> */}
                      </Tr>
                    ))
                  : allSearchedUserData?.map((info: any) => (
                      <Tr
                        key={info.id}
                        cursor="pointer"
                        _hover={{ background: "whitesmoke" }}
                        onClick={() => {
                          setEditID(info?.id);
                          onOpenEdit();
                          byIdMutate({
                            id: info?.id,
                          });
                        }}
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
                        <Td py="3">{info?.dispositionType}</Td>

                        <Td py="3">
                          <PhoneIcon mr="3" color="green" />
                          {info?.phoneNumber}
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
                          <InfoOutlineIcon mr="3" color="orange" />
                          {info?.reasonForNoPayment}
                        </Td>
                        <Td py="3">{info?.subReasonForNoPayment}</Td>
                        <Td>{info?.promiseToPay}</Td>
                        <Td py="3">
                          <ChatIcon mr="3" />
                          {info?.comment}
                        </Td>
                        <Td>{info?.dateCreated?.slice(0, 10)}</Td>
                        {/* <Td>
                          
                          <Icon
                            onClick={() => deleteUserInfo(info?.id)}
                            as={DeleteIcon}
                            boxSize={5}
                            color="red.500"
                            cursor="pointer"
                          />
                        </Td> */}
                      </Tr>
                    ))}
              </Tbody>
              {/* ) : ( */}

              {/* )} */}
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
                  color={`${currentPage === pgNumber ? "white" : "#26C6DA"}`}
                  key={pgNumber}
                  bgColor={`${currentPage === pgNumber ? "#26C6DA" : "white"}`}
                  onClick={() => {
                    setCurrentPage(pgNumber);
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
      )}
      {/* <AddDispositionModal
        isOpen={isOpen}
        onClose={onClose}
        refetchAllUser={refetchAllUser}
      /> */}
      <ViewDispositionModal
        editID={editID}
        isOpenEdit={isOpenEdit}
        onCloseEdit={onCloseEdit}
        userIdData={userIdData}
        refetchAllUser={refetchAllUser}
      />
    </div>
  );
};

export default Disposition;
