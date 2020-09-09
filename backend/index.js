const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
  type Query {
    hello(name: String): String!
    getPerson(id: Int!): Person
    getPatient(id: String): Patient
  }
  type Planet {
    name: String
    rotation_period: String
    orbital_period: String
    films: [Film]
  }
  type Film {
    title: String
    episode_id: Int
    opening_crawl: String
    director: String
    producer: String
    release_date: String
  }
  type Person {
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
    films: [Film]
    homeworld: Planet
  }

  type Given {
    first: String
    second: String
}

type Telecom {
    system: String
    value: String
    use: String
    rank: Int

}
type Address {
    use: String
    type: String
    text: String
    city: String
    district: String
    state: String
    postalCode: String
}


type Meta {
    versionId: Int
    lastUpdated: String
    source: String

}  
  
type Name {
    use: String
    family: String
    given: Given

}
type Text {
  status : String
  div :String
}

type Patient {
    id: String
    resourceType: String
    active: Boolean
    gender: String
    birthDate: String
    deceasedBoolean: Boolean
    name: [Name]
    telecom: [Telecom]
    address: [Address]
    meta: Meta
    text: Text
    


}

`;

const resolveFilms = parent => {
  const promises = parent.films.map(async url => {
    const response = await fetch(url);
    return response.json();
  });

  return Promise.all(promises);
};

const resolvers = {
  Planet: {
    films: resolveFilms
  },
  Person: {
    homeworld: async parent => {
      const response = await fetch(parent.homeworld);
      return response.json();
    },
    films: resolveFilms
  },


  
    Patient(parent) {
      return {
        meta:parent.Patient
    };

  },
 
    Patient(parent) {
      return {
        telecom:parent.Patient
    };
    },

    Patient(parent) {
      return {
        address:parent.Patient
    };
    },
   
    
  Patient(parent) {
    return {
      name:parent.Patient

  };
  
},

// Name(parent) {
//   return {
//     given:parent.Name
// };
// },

  
  
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getPerson: async (_, { id }) => {
      const response = await fetch(`https://swapi.co/api/people/${id}/`);
      return response.json();
    },
    getPatient: async (_, { id }) => {
      const response = await fetch(`http://hapi.fhir.org/baseR4/Patient/${id}/`);
      return response.json();
    },


   
  }
};



const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
