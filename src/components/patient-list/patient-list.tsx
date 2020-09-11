import React, { Component } from "react";
import { Grid, Card, Box } from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
interface Ipatient {
  id: String;
  active: Boolean;
  gender: String;
  birthDate: String;
  deceasedBoolean: Boolean;
  name: string;
  telecom: string;
  address: string;
  age: number;
}

type stateType = {
  patients: Ipatient[];
};

export default class PatientList extends Component {
  heading: string = "Patients List";
  state: stateType = {
    patients: [
      {
        name: "Chandra Pratap Singh",
        id: "p1",
        active: true,
        gender: "M",
        birthDate: "05/05/1997",
        deceasedBoolean: false,
        telecom: "+91-7278541101",
        address: "51/1/A/20 JMD APP. Liluah - Howrah",
        age: 22,
      },
      {
        name: "Chandra Pratap Singh",
        id: "p2",
        active: false,
        gender: "M",
        birthDate: "05/05/1997",
        deceasedBoolean: false,
        telecom: "+91-7278541101",
        address: "51/1/A/20 JMD APP. Liluah - Howrah",
        age: 22,
      },
      {
        name: "Chandra Pratap Singh",
        id: "p1",
        active: true,
        gender: "M",
        birthDate: "05/05/1997",
        deceasedBoolean: false,
        telecom: "+91-7278541101",
        address: "51/1/A/20 JMD APP. Liluah - Howrah",
        age: 22,
      },
      {
        name: "Chandra Pratap Singh",
        id: "p2",
        active: false,
        gender: "M",
        birthDate: "05/05/1997",
        deceasedBoolean: false,
        telecom: "+91-7278541101",
        address: "51/1/A/20 JMD APP. Liluah - Howrah",
        age: 22,
      },
      {
        name: "Chandra Pratap Singh",
        id: "p1",
        active: true,
        gender: "M",
        birthDate: "05/05/1997",
        deceasedBoolean: false,
        telecom: "+91-7278541101",
        address: "51/1/A/20 JMD APP. Liluah - Howrah",
        age: 22,
      },
      {
        name: "Chandra Pratap Singh",
        id: "p2",
        active: false,
        gender: "M",
        birthDate: "05/05/1997",
        deceasedBoolean: false,
        telecom: "+91-7278541101",
        address: "51/1/A/20 JMD APP. Liluah - Howrah",
        age: 22,
      },
    ],
  };
  render() {
    const patientList = this.state.patients.map((patient, index) => (
      <Card variant="outlined" key={index}>
        <Box
          p={2}
          borderLeft={4}
          borderColor={patient.active ? "success.main" : "primary.dark"}
        >
          <Box component="h4" mb={1} mt={0}>
            {patient.name} - {patient.gender}/{patient.age}
          </Box>
          <Box mb={1}>
            <Grid container>
              <Grid item xs={"auto"}>
                <PhoneIcon color="disabled" />
              </Grid>
              <Grid item xs>
                {patient.telecom}
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
    return (
      <Box>
        <Grid container>
          <Grid item md={3} xl={4}></Grid>
          <Grid item xs={12} md={6} xl={4}>
            <h2>{this.heading}</h2>
            {patientList}
          </Grid>
          <Grid item md={3} xl={4}></Grid>
        </Grid>
      </Box>
    );
  }
}
