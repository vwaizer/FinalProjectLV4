import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({page, onClick}) {
  return (
    <Stack spacing={2}>
      <Pagination onClick={onClick} count={page} />
    </Stack>
  );
}
