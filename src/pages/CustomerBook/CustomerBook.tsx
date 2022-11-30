import { CustomerBookData } from "./CustomerBookData";
import {
  Box,
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  // TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const CustomerBook = () => {
  return (
    <div>
      <Box>
        <TableContainer bg="white">
          <Table size="sm">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Call Date</Th>
                <Th>Agent ID</Th>
                <Th>Enter Date </Th>
                <Th>Loan ID </Th>
                <Th>Disbursement Date </Th>
                <Th>Name of Borrower </Th>
                <Th>Email </Th>
                <Th>Signup Phone Number </Th>
                <Th>Reason For Non Payment </Th>
                <Th>Promise to Pay </Th>
                <Th>Comment </Th>
              </Tr>
            </Thead>
            <Tbody>
              {CustomerBookData.map((info) => (
                <Tr key={info.id}>
                  <Td>{info.date}</Td>
                  <Td>{info.agentID}</Td>
                  <Td>{info.enterDate}</Td>
                  <Td>{info.loanID}</Td>
                  <Td>{info.disbursementDate}</Td>
                  <Td>{info.borrowerName}</Td>
                  <Td>{info.email}</Td>
                  <Td>{info.phoneNumber}</Td>
                  <Td>{info.reasonForNonPayment}</Td>
                  <Td>{info.promiseToPay}</Td>
                  <Td>{info.comment}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default CustomerBook;
