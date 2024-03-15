import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { http } from "../../util/http";

const Group = ({ option, type }) => {
  const [getAuthor, setGetAuthor] = useState([]);
  const [getPublisher, setGetPublisher] = useState([]);

  useEffect(() => {
    http
      .get("/book/author")
      .then((getAuthor) => setGetAuthor(getAuthor.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http
      .get("/book/publisher")
      .then((getPublisher) => setGetPublisher(getPublisher.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {getAuthor.map((item, index) => {
        return (
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={item}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Author"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        );
      })}
    </>
  );
};

export default Group;
