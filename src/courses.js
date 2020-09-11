import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const Courses = () => (
  <Query
    query={gql`
      {
        patients {
          id
          active
          gender
          birthDate
          deceasedBoolean
          name {text}
          telecom {system value}
          address {text city district state postalCode}
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading ...</p>;
      if (error) return <p>Error ...</p>;
      return (
        <p>
          {console.log(data)}
          Data...
        </p>
      );
    }}
  </Query>
);
