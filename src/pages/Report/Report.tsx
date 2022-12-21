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
import { useGetDispositionReportMutate } from "../../services/query/disposition";
import useCustomToast from "../../utils/notification";

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
            w={["100%", "200px", "200px", "300px"]}
            size={"sm"}
            border="1px solid black"
          >
            <Input
              type="date"
              placeholder="Filter with Date"
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
                    <Th color="#26C6DA">Agent ID</Th>
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
                      <Td>{info?.agentId}</Td>

                      <Td>{info?.nameOfBrowser}</Td>
                      <Td>{info?.email}</Td>
                      <Td>{info?.amountToPayToday}</Td>
                      <Td>{info?.phoneNumber}</Td>
                      <Td>{info?.reasonForNoPayment}</Td>
                      <Td>{info?.promiseToPay}</Td>
                      <Td>{info?.comment}</Td>
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
