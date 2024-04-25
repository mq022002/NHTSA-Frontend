/* eslint-disable @next/next/no-img-element */
import React from "react";

const TeamMemberCard = ({ imgSrc, altText, memberName, memberDescription }) => (
  <div className="p-4 bg-white rounded-lg shadow-lg">
    <img
      src={imgSrc}
      alt={altText}
      className="object-cover w-32 h-32 mx-auto rounded-full"
    />
    <div className="mt-3 text-center">
      <h2 className="text-xl font-semibold text-black">{memberName}</h2>
      <p className="text-sm text-black">{memberDescription}</p>
    </div>
  </div>
);

function AboutPage() {
  return (
    <div className="relative">
      {/* Group Photo Section */}
      <div
        className="bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/GroupPicture.jpeg')",
          height: "1000px",
        }}
      >
        <div className="flex items-center h-full bg-gray-800 bg-opacity-50">
          <div className="w-full text-center text-white">
            <h1 className="text-3xl font-bold">Team MAHA</h1>
            <p className="px-3">
              MAHA is an acronym representing the union of its four foundational
              members-- Matt, Alem, Hooghir and Antonio. Matt, the maestro,
              orchestrates project direction and ensuring all parts of the
              engineering machine are aligned with the team's goals and client
              needs. Alem, the backbone of the operation, focusing on the
              backend where he manages server-side logic and databases. Hooghir,
              the creative force behing the team's UI designs. He crafts
              interfaces that speak to the user and invite engagement. Antonio,
              the guardian of the digital domain, focusing on security. He
              ensures both client data and user privacy. Together, we have
              formed a cohesive and productive unit to ensure exellence in our
              craft.
            </p>
          </div>
        </div>
      </div>

      {/* Buffer Zone */}
      <div className="h-8 bg-transparent"></div>

      {/* Individual Team Members Section */}
      <div
        className="py-8 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/')" }}
      >
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TeamMemberCard
              imgSrc="/Matt.png"
              altText="Matthew Quijano"
              memberName="Matthew Quijano"
              memberDescription="I am currently an undergraduate student enrolled at Central Connecticut State University pursuing a degree in Computer Science (Honors Program), with a cybersecurity concentration. During my academic career, applied courses that I have completed thus far exposed me to programming languages such as Java, Python, and JavaScript/JQuery, some experience in SQL, hosting a Postgre database to scale from an SQLite in development through AWS' RDS for a research project that I am currently pursuing, and web development tools/frameworks being HTML/CSS (Bootstrap), and Django. Though I am most comfortable with web development tech stacks, I am always eager to take on the challenge of learning through a project-based environment."
            />
            <TeamMemberCard
              imgSrc="/Alem.png"
              altText="Team member name"
              memberName="Alem Beskovic"
              memberDescription="I am an undergraduate student currently enrolled in the Computer Science Honors program at Central Connecticut State University. Personal projects and courses that I have completed have provided me with a deep understanding in languages such as Java, Python, JavaScript, and MySQL. I have also worked with front end languages and frameworks such as HTML, CSS, React, and Spring boot. This semester, I am going to be expanding my skillset with classes such as computer security, algorithms, and what I am looking forward to most, software engineering. What I am looking forward to most this semester is the practical and real-world experience that I will be getting in software engineering, where we will be working with actual entities and businesses to hone our own skillset while also providing beneficial and efficient software to the client. "
            />
            <TeamMemberCard
              imgSrc="/Hoogir.jpg"
              altText="Hooghir Mohammed"
              memberName="Hooghir Mohammed"
              memberDescription="I'm an undergraduate student at Central Connecticut State University, where I'm getting my Computer Science degree in the Honors Program. My college journey has familiarized me with various programming languages and development frameworks. I've gained proficiency in Java, which has been instrumental in understanding core programming concepts. Additionally, I've delved into web development, honing my skills in HTML, CSS, Python, JavaScript, and Django, which has provided me with a solid understanding of full-stack development. This semester, I'm expanding my knowledge by taking a course in mobile app development, with a focus on Android development, broadening my technical skill set in the rapidly evolving field of mobile technology."
            />
            <TeamMemberCard
              imgSrc="/Antonio.png"
              altText="Antonio Baerga"
              memberName="Antonio Baerga"
              memberDescription="I am an undergraduate student currently enrolled at Central Connecticut State University, in my senior year. My time at the university has allowed me to pursue a degree in Computer Science with a minor in Cybersecurity. The courses which I have taken to obtain my degree have provided me with the frameworks of various programming languages and their implementations. I have worked with Java, Python, JavaScript/jQuery, and C. I also have experience in working with HTML, CSS, and Django. For this semester, I am further expanding my knowledge by taking courses in software engineering, computer architecture, and computer security. The completion of these courses will provide me with a stronger set of skills regarding the components of a computer, the systematic functions of computer software, and how they tie into the safety and security of a computer. "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
