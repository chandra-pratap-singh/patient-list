import React from "react";
import "./App.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import PatientList from "./components/patient-list/patient-list";
import { Box } from "@material-ui/core";

const client = new ApolloClient({
  uri: "https://vm8mjvrnv3.lp.gql.zone/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Box className={"app"} p={2}>
        {<PatientList></PatientList>}
      </Box>
    </ApolloProvider>
  );
}

export default App;
