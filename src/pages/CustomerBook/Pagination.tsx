import { Box, Flex, Select, Text } from "@chakra-ui/react";
import React from "react";

const Pagination = (
  nPages: any,
  currentPage: any,
  setCurrentPage: any,
  setRecordsPerPage: any,
  recordsPerPage: any
) => {
  console.log(currentPage);

  const pageNumbers: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <Box>
        <Flex flexWrap="wrap" mt="3">
          <Box
            p="1"
            px="2"
            border="1px solid black"
            color="blue"
            onClick={prevPage}
          >
            Previous
          </Box>
          {pageNumbers.map((pgNumber: any) => (
            <Box
              p="1"
              px="2"
              border="1px solid black"
              color={`${currentPage === pgNumber ? "white" : "blue"}`}
              key={pgNumber}
              bgColor={`${currentPage === pgNumber ? "blue" : "white"}`}
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
            border="1px solid black"
            color="blue"
            onClick={nextPage}
          >
            Next
          </Box>
          <Flex p="1" px="2" align="center">
            PageSize
            <Select size="xs" ml="3">
              <option onClick={() => setRecordsPerPage(5)}>5</option>
              <option onClick={() => setRecordsPerPage(10)}>10</option>
              <option onClick={() => setRecordsPerPage(15)}>15</option>
              <option onClick={() => setRecordsPerPage(20)}>20</option>
            </Select>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Pagination;
