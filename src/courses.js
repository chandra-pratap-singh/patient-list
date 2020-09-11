// import React from 'react';
// import {Query} from 'react-apollo';
// import gql from 'graphql-tag'

// export const Courses = () => (
//     <Query query = {gql`{
//         Patient {
//             name
//             height
//         }
//     }`}>
// {({loading, error, data}) => {
//     if(loading) return <p>Loading ...</p>
//     if(error) return <p>Error ...</p>
//     return <p>data...</p>;
// }}
//     </Query>
// )