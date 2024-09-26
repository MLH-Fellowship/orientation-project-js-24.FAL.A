import { useState } from "react";
import "./App.css";
import ExperienceComponent from "./features/experience/ExperienceComponent";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import AddEducation from "./features/education/addEducation";
import AddSkills from "./features/skills/addSkills";
import UserInformationComponent from "./features/user-information/UserInformationComponent";
import { API_URL } from "./constants";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  itemTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const MyDoc = ({ resumeData }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Resume</Text>

      <View style={styles.section}>
        <Text style={styles.itemTitle}>User Information</Text>
        {resumeData.user_information?.map((info, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{`Name: ${info.name}`}</Text>
            <Text>{`Email: ${info.email_address}`}</Text>
            <Text>{`Phone: ${info.phone_number}`}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.itemTitle}>Experience</Text>
        {resumeData.experience?.map((exp, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{`${exp.title} at ${exp.company} (${exp.start_date} - ${exp.end_date})`}</Text>
            <Text>{exp.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.itemTitle}>Education</Text>
        {resumeData.education?.map((edu, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{`${edu.course} from ${edu.school} (${edu.start_date} - ${edu.end_date})`}</Text>
            <Text>Grade: {edu.grade}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.itemTitle}>Skills</Text>
        {resumeData.skill?.map((skill, index) => (
          <Text key={index}>{`${skill.name} (${skill.proficiency})`}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerateResume = () => {
    setLoading(true);
    fetch(`${API_URL}/resume/data`)
      .then((response) => response.json())
      .then((data) => {
        setResumeData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };

  const handleResetData = () => {
    fetch(`${API_URL}/reset`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reset data");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error resetting data:", err);
      });
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>User Information</h2>
        <UserInformationComponent />
        <br />
      </div>
      <div className="resumeSection">
        <h2>Experience</h2>
        <ExperienceComponent />
        <br />
      </div>

      <div className="resumeSection">
        <h2>Education</h2>
        <AddEducation />
        <br />
      </div>

      <div className="resumeSection">
        <h2>Skills</h2>
        <AddSkills />
        <br />
      </div>

      <br />

      <button onClick={handleGenerateResume}>
        {loading ? "Loading..." : "Generate Resume"}
      </button>

      {resumeData && (
        <button>
          <PDFDownloadLink document={<MyDoc resumeData={resumeData} />} fileName="resume.pdf">
            {({ loading }) => (loading ? "Generating PDF..." : "Download Resume")}
          </PDFDownloadLink>
        </button>
      )}

      <br /><br />

      <button onClick={handleResetData}>Reset Data</button>
    </div>
  );
}

export default App;
