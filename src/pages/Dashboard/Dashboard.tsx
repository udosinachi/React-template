import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Select,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcMissedCall, FcCallTransfer, FcCallback } from "react-icons/fc";
import DashboardChart from "../../components/DashboardChart";
import { Loader } from "../../components/WithSuspense";
import { useGetAgentDispositionReport } from "../../services/query/agent-mapping";
import {
  useGetAgentDashboardStatistics,
  useGetDashboardChart,
  useGetDashboardStatistics,
} from "../../services/query/dashboard";
import {
  useGetAllAgents,
  useGetUserInfoForAgents,
} from "../../services/query/user";
import { CgProfile } from "react-icons/cg";
import { MdOutlineMonetizationOn } from "react-icons/md";
import {
  ChatIcon,
  EmailIcon,
  InfoOutlineIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { ViewDispositionModal } from "../../components/modals/ViewDispositionModal";
import {
  useGetAllDisposition,
  useGetDispositionByIdMutate,
} from "../../services/query/disposition";
import useCustomToast from "../../utils/notification";

const Dashboard = () => {
  const [typeOfDisposition, setTypeofDisposition] = useState("Outbound");
  const { data, isLoading, refetch } =
    useGetDashboardStatistics(typeOfDisposition);
  // console.log(data);

  const {
    data: dataAgent,
    isLoading: isLoadingAgent,
    refetch: refetchAgent,
  } = useGetAllAgents();
  const AgentData = dataAgent?.document?.records;
  // console.log(AgentData);
  const [listOfAgent, setListOfAgent] = useState("");

  const {
    data: dataAgentStatistics,
    isLoading: isLoadingAgentStatistics,
    refetch: refetchAgentStatistics,
  } = useGetAgentDashboardStatistics(listOfAgent, typeOfDisposition);
  // console.log(dataAgentStatistics);

  const {
    data: dataAgentDispositionReport,
    isLoading: isLoadingAgentDispositionReport,
    refetch: refetchAgentDispositionReport,
  } = useGetAgentDispositionReport(listOfAgent, 1, 100);
  const agentDispositionReport = dataAgentDispositionReport?.document?.records;
  console.log(dataAgentDispositionReport);

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [editID, setEditID] = useState("");
  const [userIdData, setUserIdData] = useState("");
  const { errorToast, successToast } = useCustomToast();

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

  const {
    data: data2,
    isLoading: isLoading2,
    refetch: refetchAllUser,
  } = useGetAllDisposition(1, 100);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {localStorage.getItem("role")?.toString() !== "customerserv1" && (
            <Box>
              <Box bg="white" p="5" mb="5">
                <FormControl mr="2" mb="2">
                  <FormLabel>Type of Call</FormLabel>
                  <Select
                    onChange={(e) => setTypeofDisposition(e.target.value)}
                  >
                    <option value="">-- Select a Type --</option>
                    <option value="Outbound">Outbound</option>
                    <option value="Inbound">Inbound</option>
                    <option value="Others">Others</option>
                  </Select>
                </FormControl>
                <FormControl mr="2">
                  <FormLabel>List of Agents</FormLabel>
                  <Select onChange={(e) => setListOfAgent(e.target.value)}>
                    <option value="">-- Select an Agent --</option>
                    {AgentData?.reverse()?.map((choose: any) => (
                      <option key={choose?.id} value={choose?.id}>
                        {choose?.id} {choose?.firstName} {choose?.lastName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {dataAgentStatistics?.message === "Data fetch successfully" ? (
                <Flex justifyContent="space-evenly" flexWrap="wrap" mb="5">
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcCallTransfer} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {dataAgentStatistics?.document?.totalCalls}
                      </Text>
                      <Text fontSize="14">Total Calls</Text>
                    </Flex>
                  </Card>
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcCallback} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {dataAgentStatistics?.document?.successfulCalls}
                      </Text>
                      <Text fontSize="14">Successful Calls</Text>
                    </Flex>
                  </Card>
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcMissedCall} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {dataAgentStatistics?.document?.failedCalls}
                      </Text>
                      <Text fontSize="14">Failed Calls</Text>
                    </Flex>
                  </Card>
                </Flex>
              ) : (
                <Flex justifyContent="space-evenly" flexWrap="wrap" mb="5">
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcCallTransfer} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {data?.document?.totalCalls}
                      </Text>
                      <Text fontSize="14">Total Calls</Text>
                    </Flex>
                  </Card>
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcCallback} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {data?.document?.successfulCalls}
                      </Text>
                      <Text fontSize="14">Successful Calls</Text>
                    </Flex>
                  </Card>
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcMissedCall} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {data?.document?.failedCalls}
                      </Text>
                      <Text fontSize="14">Failed Calls</Text>
                    </Flex>
                  </Card>
                </Flex>
              )}

              <Box bg="white" p={["2", "5", "5", "5"]}>
                <Box mb="5">
                  <DashboardChart listOfAgent={listOfAgent} />
                </Box>
              </Box>

              <Box>
                <TableContainer
                  bg="white"
                  sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                  mb="50px"
                >
                  <Table size="sm">
                    <Thead bgColor="gray.200">
                      <Tr>
                        <Th color="#26C6DA" py="5">
                          Agent ID
                        </Th>
                        {/* <Th color="#26C6DA">Loan ID</Th> */}
                        {/* <Th color="#26C6DA">Disbursement Date</Th> */}
                        <Th color="#26C6DA">Disposition Type</Th>
                        <Th color="#26C6DA">Customer Name</Th>
                        {/* <Th color="#26C6DA">Email</Th> */}
                        <Th color="#26C6DA">Phone Number</Th>
                        <Th color="#26C6DA">Amount to Pay Today</Th>
                        <Th color="#26C6DA">Reason For No Payment</Th>
                        <Th color="#26C6DA">Sub Reason For No Payment</Th>
                        <Th color="#26C6DA">Promise To Pay </Th>
                        <Th color="#26C6DA">Comment</Th>
                        <Th color="#26C6DA">Enter Date</Th>
                        <Th color="#26C6DA"></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {agentDispositionReport?.map((info: any) => (
                        <Tr
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
                          <Td py="3">{info?.dispositionType}</Td>
                          <Td py="3" display="flex" alignItems="center">
                            <Icon
                              as={CgProfile}
                              mr="3"
                              color="#26C6DA"
                              boxSize="4"
                            />
                            {info?.nameOfBrowser}
                          </Td>
                          {/* <Td py="3">
                            <EmailIcon mr="3" color="#26C6DA" />
                            {info?.email}
                          </Td> */}
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
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          )}
          <>
            {localStorage.getItem("role")?.toString() === "customerserv1" && (
              <>
                <Flex justifyContent="space-evenly" flexWrap="wrap" mb="5">
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcCallTransfer} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {data?.document?.totalCalls}
                      </Text>
                      <Text fontSize="14">Total Calls</Text>
                    </Flex>
                  </Card>
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcCallback} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {data?.document?.successfulCalls}
                      </Text>
                      <Text fontSize="14">Successful Calls</Text>
                    </Flex>
                  </Card>
                  <Card
                    bg="white"
                    w={["100%", "100%", "100%", "31%"]}
                    mb="3"
                    borderRadius="none"
                    p="4"
                  >
                    <Flex align="center">
                      <Icon as={FcMissedCall} fontSize="30" mr="4" />
                      <Text fontSize="22" mr="2" fontWeight="600">
                        {data?.document?.failedCalls}
                      </Text>
                      <Text fontSize="14">Failed Calls</Text>
                    </Flex>
                  </Card>
                </Flex>
                <Box bg="white" p={["2", "5", "5", "5"]}>
                  <Box mb="5">
                    <DashboardChart
                      listOfAgent={listOfAgent}
                      typeOfDisposition={typeOfDisposition}
                    />
                  </Box>
                </Box>
              </>
            )}
          </>
        </Box>
      )}
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

export default Dashboard;
