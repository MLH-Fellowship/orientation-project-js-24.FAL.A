import "./App.css";
import ExperienceComponent from "./features/experience/ExperienceComponent";
import data from "./data";
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

const MyDoc = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Resume</Text>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.itemTitle}>Experience</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{`${exp.title} at ${exp.company} (${exp.start_date} - ${exp.end_date})`}</Text>
            <Text>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.itemTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>{`${edu.degree} from ${edu.institution} (${edu.start_date} - ${edu.end_date})`}</Text>
            <Text>Grade: {edu.grade}</Text>
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.itemTitle}>Skills</Text>
        {data.skill.map((skill, index) => (
          <Text key={index}>{`${skill.name} (${skill.experience})`}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

function App() {
  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        <ExperienceComponent />
        <br></br>
      </div>

      <div className="resumeSection">
        <h2>Education</h2>
        <AddEducation />
        <br></br>
      </div>

      <div className="resumeSection">
        <h2>Skills</h2>
        <AddSkills />
        <br></br>
      </div>

      <br></br>

      <button>
        <PDFDownloadLink document={<MyDoc />} fileName="resume.pdf">
          {({ loading }) => (loading ? "Generating PDF..." : "Download Resume")}
        </PDFDownloadLink>
      </button>
    </div>
  );
}

export default App;
