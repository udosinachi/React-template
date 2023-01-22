import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Loader } from "../../components/WithSuspense";
import {
  useAddNewAgentMapping,
  useGetAllAgentMapping,
  useGetAllSupervisorAgentsMapping,
} from "../../services/query/agent-mapping";
import {
  useGetAllAgents,
  useGetAllSupervisors,
  useGetAllUserInfo,
  useGetUserInfoById,
  useGetUserInfoForAgents,
  useGetUserInfoForSupervisor,
} from "../../services/query/user";
import useCustomToast from "../../utils/notification";

const AgentMapping = () => {
  const { errorToast, successToast } = useCustomToast();

  const {
    data,
    isLoading,
    refetch: refetchAllUser,
  } = useGetAllUserInfo(1, 100);
  const allUserData = data?.document?.records;
  //   console.log(allUserData);

  const {
    data: dataSupervisor,
    isLoading: isLoadingSupervisor,
    refetch: refetchSupervisor,
  } = useGetAllSupervisors();
  const SupervisorData = dataSupervisor?.document?.records;
  console.log(SupervisorData);

  const {
    data: dataAgent,
    isLoading: isLoadingAgent,
    refetch: refetchAgent,
  } = useGetAllAgents();
  const AgentData = dataAgent?.document?.records;
  console.log(AgentData);

  const [listOfSupervisors, setListOfSupervisors] = useState("");
  const [listOfAgent, setListOfAgent] = useState("");
  const [listOfSupervisorToAgent, setListOfSupervisorToAgent] = useState("");
  const [listofAgentsUnderaSupervisor, setListofAgentsUnderaSupervisor] =
    useState("");

  const listOfAgentInfo = listOfAgent?.split(" ");
  const listOfSupervisorInfo = listOfSupervisors?.split(" ");

  const {
    data: dataSupervisorAgentsMapping,
    isLoading: isLoadingSupervisorAgentsMapping,
    refetch: refetchSupervisorAgentsMapping,
  } = useGetAllSupervisorAgentsMapping(listOfSupervisorToAgent, 1, 100);
  const SupervisorAgentsMappingData =
    dataSupervisorAgentsMapping?.document?.records;
  console.log(SupervisorAgentsMappingData);

  const { mutate, isLoading: isCreateLoading } = useAddNewAgentMapping({
    onSuccess: (res: any) => {
      console.log(res);
      if (res?.code === 1) {
        successToast(res?.message);
      } else {
        errorToast(res?.message);
      }
    },
    onError: (err: any) => {
      console.log(err);
      errorToast("Failed");
    },
  });

  const handleSubmit = () => {
    toRefetch();
    mutate({
      SupervisorId: listOfSupervisorInfo[0],
      AgentId: listOfAgentInfo[0],
      AgentEmail: listOfAgentInfo[1],
      SupervisorEmail: listOfSupervisorInfo[1],
    });
  };

  const {
    data: allMappingData,
    isLoading: itsLoading,
    refetch: toRefetch,
  } = useGetAllAgentMapping(1, 100);
  const allMappingDataArray = allMappingData?.document?.records;
  //   console.log(allMappingDataArray);
  //   console.log(allMappingData?.document?.records);

  return (
    <div>
      {isCreateLoading ? (
        <Loader />
      ) : (
        <>
          <Box bg="white" p="3">
            <FormControl mr="2">
              <FormLabel>List of Supervisors</FormLabel>

              <Select onChange={(e) => setListOfSupervisors(e.target.value)}>
                <option value="">-- Select a Supervisor --</option>
                {SupervisorData?.map((choose: any) => (
                  <option
                    key={choose?.id}
                    value={`${choose?.id} ${choose?.email}`}
                  >
                    {choose?.firstName} {choose?.lastName}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mr="2">
              <FormLabel>List of Agents</FormLabel>

              <Select onChange={(e) => setListOfAgent(e.target.value)}>
                <option value="">-- Select an Agent --</option>
                {AgentData?.map((choose: any) => (
                  <option
                    key={choose?.id}
                    value={`${choose?.id} ${choose?.email}`}
                  >
                    {choose?.firstName} {choose?.lastName}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button
              mt="5"
              onClick={handleSubmit}
              bgColor="#26C6DA"
              color="white"
              _hover={{ background: "#26C6DA", color: "white" }}
              _active={{ background: "#26C6DA", color: "white" }}
              _focus={{ background: "#26C6DA", color: "white" }}
            >
              Map Supervisor to Agent
            </Button>
          </Box>

          <Box bg="white" mt="3" p="3">
            <Text>Get All Agents of a Particular Supervisor</Text>
            <FormControl mr="2" mt="5">
              {/* <FormLabel>Choose a Supervisor</FormLabel> */}
              <Select
                onChange={(e) => setListOfSupervisorToAgent(e.target.value)}
              >
                <option value="">-- Select a Supervisor --</option>
                {SupervisorData?.map((choose: any) => (
                  <option key={choose?.id} value={choose?.id}>
                    {choose?.firstName} {choose?.lastName}
                  </option>
                ))}
              </Select>
            </FormControl>
            {/* {SupervisorAgentsMappingData?.map((mappedAgents: any) => (
              <Box key={mappedAgents?.id}>
                <Box>{mappedAgents?.id}</Box>
              </Box>
            ))} */}
            {isLoadingSupervisorAgentsMapping ? (
              <Loader />
            ) : (
              <TableContainer bg="white" my="5">
                <Table size="sm" variant="simple">
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead bgColor="gray.200">
                    <Tr>
                      {/* <Th color="#26C6DA" py="4">
                        ID
                      </Th> */}
                      <Th color="#26C6DA">Email </Th>
                      <Th color="#26C6DA">Role Name </Th>
                      <Th color="#26C6DA">First Name </Th>
                      <Th color="#26C6DA">Last Name </Th>
                      <Th color="#26C6DA">Logged In Status </Th>
                      {/* <Th color="#26C6DA"></Th> */}
                      {/* <Th>Last Login </Th> */}
                    </Tr>
                  </Thead>

                  <Tbody>
                    {SupervisorAgentsMappingData?.map((info: any) => (
                      <Tr
                        key={info.id}
                        //   onClick={() => {
                        //     setEditID(info?.id);
                        //     onOpenEdit();
                        //     byIdMutate({
                        //       id: info?.id,
                        //     });
                        //   }}
                        cursor="pointer"
                        _hover={{ background: "whitesmoke" }}
                      >
                        {/* <Td py="3">{info?.id}</Td> */}
                        <Td py="3">
                          <EmailIcon mr="3" color="#26C6DA" />
                          {info?.email}
                        </Td>
                        <Td>{info?.roleName}</Td>
                        <Td>{info?.firstName}</Td>
                        <Td>{info?.lastName}</Td>
                        {info?.id % 2 ? (
                          <Td bgColor="green.200" color="green">
                            Logged In
                          </Td>
                        ) : (
                          <Td bgColor="red.200" color="red">
                            Logged Out
                          </Td>
                        )}

                        {/* <Td>{info?.lastLogin}</Td> */}
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
            )}
          </Box>
        </>
      )}
    </div>
  );
};

export default AgentMapping;
