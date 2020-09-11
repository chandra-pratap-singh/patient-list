const fetch = require("node-fetch");

module.exports = {
  async patients() {
    const res = await fetch(
      "https://fhir.development.woundtech.net:8080/hapi-fhir-jpaserver/fhir/Patient"
    ).then((res) => res.json());
    return res.entry.slice(1).map((data) => data.resource);
  },
};
