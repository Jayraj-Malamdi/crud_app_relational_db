import { Typography, styled } from '@mui/material';

const Heading = styled(Typography)`
  text-align: center;
  padding-top: 100px;
  font-size: 35px;
  font-family: sans-serif;
  font-weight: bold;
  margin-bottom: 70px;

  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const SubHeading = styled(Typography)`
  text-align: center;
  font-size: 25px;
  font-family: sans-serif;
  font-weight: bold;
  margin-bottom: 70px;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Paragraph = styled(Typography)`
  text-align: center;
  font-size: 16px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const CodeforInterview = () => {
  return (
    <>
      <Heading>BOOKFOLIO</Heading>

      <SubHeading>This is a CRUD application, which uses MySQL, ExpressJS, NodeJS, ReactJS</SubHeading>

      <Paragraph>
        This is the books management page. Here you can perform various actions related to book management such as adding new books, editing existing books, and viewing all books.
      </Paragraph>
    </>
  );
};

export default CodeforInterview;
