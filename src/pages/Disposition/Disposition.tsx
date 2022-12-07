import { useState } from "react";
import { EditIcon, DeleteIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
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
  useGetSearchDispositionMutate,
} from "../../services/query/disposition";
import { AddDispositionModal } from "../../components/modals/AddDispositionModal";
import { EditDispositionModal } from "../../components/modals/EditDispositionModal";
// import Pagination from "./Pagination";

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
  console.log(userIdData);

  const [allSearchedUserData, setAllSearchedUserData] = useState([]);
  console.log(allSearchedUserData);
  const [searchedWords, setSearchedWords] = useState("");
  const [noSearchRecord, setNoSearchRecord] = useState("");
  console.log(noSearchRecord);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  console.log(currentPage);
  console.log(recordsPerPage);

  const {
    data,
    isLoading,
    refetch: refetchAllUser,
  } = useGetAllDisposition(currentPage, recordsPerPage);
  const allUserData = data?.document?.records;
  console.log(allUserData);

  // const {
  //   data: searchedData,
  //   isLoading: searchLoader,
  //   refetch: refetchSearchedUser,
  // } = useGetSearchUserInfo(searchedWords, 1, 100);
  // const allSearchedUserData = searchedData?.document?.records;
  // console.log(allSearchedUserData);

  const { mutate: searchMutate, isLoading: searchLoader } =
    useGetSearchDispositionMutate({
      onSuccess: (res: any) => {
        console.log(res);
        setAllSearchedUserData(res?.document?.records);
        setNoSearchRecord(res?.message);
      },
      onError: (err: any) => {
        console.log(err?.response?.data);
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
    if (searchedWords.length < 3) {
      errorToast("Minimum 3 chracters required for search");
      return false;
    }
    if (noSearchRecord === "No Record Found") {
      errorToast("No Record Found");
    }

    searchMutate({
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
        console.log(err);
        errorToast("Failed");
      },
    });

  const { mutate, isLoading: isDelete } = useDeleteDisposition({
    onSuccess: (res: any) => {
      console.log(res);
      successToast("Record Deleted");
      setTimeout(() => {
        queryClient.invalidateQueries(GET_ALL_DISPOSITION);
      }, 200);
    },
    onError: (err: any) => {
      console.log(err);
      errorToast("Failed");
    },
  });

  const deleteUserInfo = (id: any) => {
    alert("Are you sure");
    console.log(id);
    mutate({
      id,
    });
  };

  // console.log(editID);

  return (
    <div>
      {isLoading && <Loader />}
      <Box>
        <Flex
          justifyContent="space-between"
          mb="3"
          flexWrap="wrap"
          alignItems="center"
        >
          <InputGroup
            w={["100%", "200px", "200px", "300px"]}
            size={"sm"}
            border="1px solid black"
          >
            <Input
              type="text"
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
            />
          </InputGroup>
          <Button size={"sm"} bgColor="#26C6DA" color="white" onClick={onOpen}>
            Add Disposition
          </Button>
        </Flex>
        <TableContainer bg="white">
          <Table size="sm">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Agent ID</Th>
                <Th>Customer ID </Th>
                <Th>Category </Th>
                <Th>CC </Th>
                <Th>Date Created</Th>
                <Th>Subject </Th>
                <Th>Message Body </Th>
                <Th>Flag</Th>
              </Tr>
            </Thead>

            <Tbody>
              {!allSearchedUserData || allSearchedUserData?.length === 0
                ? allUserData?.map((info: any) => (
                    <Tr key={info.id}>
                      <Td>{info?.agentId}</Td>
                      <Td>{info?.customerId}</Td>
                      <Td>{info?.category}</Td>
                      <Td>{info?.cc}</Td>
                      <Td>{info?.dateCreated}</Td>
                      <Td>{info?.subject}</Td>
                      <Td>{info?.messageBody}</Td>
                      <Td>{info?.flag}</Td>
                      <Td>
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
                        <Icon
                          onClick={() => deleteUserInfo(info?.id)}
                          as={DeleteIcon}
                          boxSize={5}
                          color="red.500"
                          cursor="pointer"
                        />
                      </Td>
                    </Tr>
                  ))
                : allSearchedUserData?.map((info: any) => (
                    <Tr key={info.id}>
                      <Td>{info?.agentId}</Td>
                      <Td>{info?.customerId}</Td>
                      <Td>{info?.category}</Td>
                      <Td>{info?.cc}</Td>
                      <Td>{info?.dateCreated}</Td>
                      <Td>{info?.subject}</Td>
                      <Td>{info?.messageBody}</Td>
                      <Td>{info?.flag}</Td>
                      <Td>
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
                        <Icon
                          onClick={() => deleteUserInfo(info?.id)}
                          as={DeleteIcon}
                          boxSize={5}
                          color="red.500"
                          cursor="pointer"
                        />
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
            {/* ) : ( */}

            {/* )} */}
          </Table>
        </TableContainer>
        {/* <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          recordsPerPage={recordsPerPage}
          setRecordsPerPage={setRecordsPerPage}
        /> */}

        <Box>
          <Flex flexWrap="wrap" mt="3" fontSize="13px">
            <Box
              p="1"
              px="2"
              border="1px solid grey"
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
                border="1px solid grey"
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
              border="1px solid grey"
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
                border="1px solid grey"
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
      <AddDispositionModal
        isOpen={isOpen}
        onClose={onClose}
        refetchAllUser={refetchAllUser}
      />
      <EditDispositionModal
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
