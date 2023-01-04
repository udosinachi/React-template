import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Loader } from "../../components/WithSuspense";
import {
  useAddNewAgentMapping,
  useGetAllAgentMapping,
} from "../../services/query/agent-mapping";
import {
  useGetAllUserInfo,
  useGetUserInfoById,
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

  const [listOfSupervisors, setListOfSupervisors] = useState("");
  const [listOfAgent, setListOfAgent] = useState("");
  const [listOfSupervisorToAgent, setListOfSupervisorToAgent] = useState("");
  const [listofAgentsUnderaSupervisor, setListofAgentsUnderaSupervisor] =
    useState("");
  console.log(listofAgentsUnderaSupervisor, "Id of all under agents");

  const supervisorRole = [];
  for (let i = 0; i < allUserData?.length; i++) {
    if (allUserData[i].roleName === "Supervisor") {
      supervisorRole.push(allUserData[i]);
    }
  }
  //   console.log(supervisorRole, "For supervisors");

  const agentRole = [];
  for (let i = 0; i < allUserData?.length; i++) {
    if (allUserData[i].roleName === "Agent") {
      agentRole.push(allUserData[i]);
    }
  }
  //   console.log(agentRole, "For agents");
  //   console.log(listOfSupervisors);
  //   console.log(listOfAgent);

  const { mutate, isLoading: isCreateLoading } = useAddNewAgentMapping({
    onSuccess: (res: any) => {
      console.log(res);
      successToast("Mapped Successful");
    },
    onError: (err: any) => {
      console.log(err);
      errorToast("Failed");
    },
  });

  const handleSubmit = () => {
    // console.log(username);
    // console.log(password);
    toRefetch();
    mutate({
      SupervisorId: listOfSupervisors,
      AgentId: listOfAgent,
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

  const IdOfMappedSupervisor = [];
  for (let i = 0; i < allMappingDataArray?.length; i++) {
    if (allMappingDataArray[i].supervisorId === +listOfSupervisorToAgent) {
      IdOfMappedSupervisor.push(allMappingDataArray[i]);
    }
  }
  console.log(listOfSupervisorToAgent);
  console.log(IdOfMappedSupervisor);

  //   const {
  //     data: allUserById,
  //     isLoading: itsUserByIdLoader,
  //     refetch: toUserByIdRefetch,
  //   } = useGetUserInfoById(1);
  //     console.log(allUserById);

  const agentsUnderSupervisor: any = [];
  for (let i = 0; i < allUserData?.length; i++) {
    if (allUserData[i].id === +listofAgentsUnderaSupervisor) {
      agentsUnderSupervisor.push(allUserData[i]);
    }
  }

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
                {supervisorRole?.reverse()?.map((choose) => (
                  <option key={choose?.id} value={choose?.id}>
                    {choose?.firstName} {choose?.lastName} {choose?.id}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mr="2">
              <FormLabel>List of Agents</FormLabel>

              <Select onChange={(e) => setListOfAgent(e.target.value)}>
                <option value="">-- Select an Agent --</option>
                {agentRole?.reverse()?.map((choose) => (
                  <option key={choose?.id} value={choose?.id}>
                    {choose?.firstName} {choose?.lastName} {choose?.id}
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
                {supervisorRole?.map((choose) => (
                  <option key={choose?.id} value={choose?.id}>
                    {choose?.firstName} {choose?.lastName} {choose?.id}
                  </option>
                ))}
              </Select>
            </FormControl>
            {IdOfMappedSupervisor?.map((mappedAgents: any) => (
              <Box key={mappedAgents?.id}>
                <Box
                //   onChange={() =>
                //     setListofAgentsUnderaSupervisor(mappedAgents?.agentId)
                //   }
                >
                  {agentsUnderSupervisor?.map((one: any) => (
                    <Box key={one?.id}>{one?.firstName}</Box>
                  ))}
                  {mappedAgents?.supervisorId} {mappedAgents?.agentId}
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default AgentMapping;
