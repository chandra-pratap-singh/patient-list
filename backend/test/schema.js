const { buildSchema } = require("graphql");

// type testData {
//     text: String
//     views: Int
// }

// type patient {
//     name: String
//     age: Int
// }

module.exports = buildSchema(`

type RootQuery {
    patients: [Patient]
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
    text: String
}

type Text {
  status : String
  div :String
}

type Resource {
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
schema {
query: RootQuery
}
`);
