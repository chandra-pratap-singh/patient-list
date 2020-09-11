import React, { Component } from "react";
import { Grid, Card, Box } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";

import { Query } from "react-apollo";
import gql from "graphql-tag";

interface Ipatient {
  id: String;
  active: Boolean;
  gender: String;
  birthDate: String;
  deceasedBoolean: Boolean;
  name: string;
  phone: string;
  address: string;
  age: string | number;
}
interface IpatientFhir {
  id: string;
  active: boolean;
  gender: string;
  birthDate: string;
  deceasedBoolean: boolean;
  name: {
    text: string;
  }[];
  telecom: {
    system: string;
    value: string;
  }[];
  address: {
    text: string;
    city: string;
    district: string;
    state: string;
    postalCode: string;
  }[];
}

type stateType = {
  patients?: Ipatient[];
};

export default class PatientList extends Component {
  heading: string = "Patients List";

  extractPhoneNumber(telecome: { system: string; value: string }[]): string {
    if (telecome && telecome.length > 0) {
      for (let item of telecome) {
        if (item.system === "phone") return item.value;
      }
      return "--";
    }
    return "--";
  }

  extractAddress(address: any): string {
    if (address && address.length > 0) {
      let add = [];
      for (var item in address[0]) add.push(address[0][item]);
      add = add.filter((item) => !!item);
      return add.join(", ");
    }
    return "--";
  }

  calculateAge(birthDate: string): number | string {
    if (!birthDate) return "--";
    const curDate: Date = new Date();
    const dob: Date = new Date(birthDate);
    return curDate.getFullYear() - dob.getFullYear();
  }

  extractGender(gender: string): string {
    if (!gender) return "--";
    return gender === "male" ? "M" : "F";
  }

  getPatientList(data: IpatientFhir[]) {
    const patients: Ipatient[] = this.extractPatientInfo(data);
    return patients.map((patient, index) => (
      <Card variant="outlined" key={index}>
        <Box
          p={2}
          borderLeft={4}
          borderColor={patient.active ? "success.main" : "primary.dark"}
        >
          <Box component="h4" mb={1} mt={0}>
            {patient.name} ~ {patient.gender} / {patient.age}
          </Box>
          <Box mb={1}>
            <Grid container>
              <Grid item xs={"auto"}>
                <PhoneIcon color="disabled" />
              </Grid>
              <Grid item xs>
                {patient.phone}
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container>
              <Grid item xs={"auto"}>
                <HomeIcon color="disabled" />
              </Grid>
              <Grid item xs>
                {patient.address}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    ));
  }

  extractPatientInfo(data: IpatientFhir[]): Ipatient[] {
    const patients: Ipatient[] = data.map((patient: IpatientFhir) => ({
      name: patient.name[0].text ?? "--",
      id: patient.id ?? "--",
      active: !!patient.active,
      gender: this.extractGender(patient?.gender),
      birthDate: patient.birthDate ?? "--",
      deceasedBoolean: !!patient.deceasedBoolean,
      phone: this.extractPhoneNumber(patient?.telecom),
      address: this.extractAddress(patient?.address),
      age: this.calculateAge(patient?.birthDate),
    }));
    return patients;
  }

  render() {
    return (
      <Box>
        <Query
          query={gql`
            {
              patients {
                id
                active
                gender
                birthDate
                deceasedBoolean
                name {
                  text
                }
                telecom {
                  system
                  value
                }
                address {
                  text
                  city
                  district
                  state
                  postalCode
                }
              }
            }
          `}
        >
          {(res: { loading?: any; error?: any; data?: any }) => {
            if (res.loading) return <p>Loading ...</p>;
            if (res.error) return <p>Error ...</p>;
            return (
              <div>
                <Grid container>
                  <Grid item md={3} xl={4}></Grid>
                  <Grid item xs={12} md={6} xl={4}>
                    <h2>{this.heading}</h2>
                    {this.getPatientList(res.data.patients)}
                  </Grid>
                  <Grid item md={3} xl={4}></Grid>
                </Grid>
              </div>
            );
          }}
        </Query>
      </Box>
    );
  }
}
