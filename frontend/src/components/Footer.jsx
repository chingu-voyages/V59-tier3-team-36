
import { FaGithub } from "react-icons/fa";

function TeamLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-emerald-600 transition-colors"
    >
      {children}
    </a>
  );
}

const team = [
  {
    role: "Scrum Master",
    members: [
      { name: "Yangchen Dema", url: "https://www.linkedin.com/in/yangchendema/" }
    ]
  },
  {
    role: "Product Owner",
    members: [
      { name: "Chinedu Olekah", url: "https://www.linkedin.com/in/chinedu-olekah/" }
    ]
  },
  {
    role: "Developers",
    members: [
      { name: "Stanley Eze", url: "https://www.linkedin.com/in/stanleyeze01/" },
      { name: "Banto Klara", url: "https://www.linkedin.com/in/banto-laczi-klara/" },
      { name: "Kevin Llanos", url: "https://www.linkedin.com/in/kevinllanos7/" },
      { name: "Greg Minezzi", url: "https://www.linkedin.com/in/gregminezzi" },
      { name: "Shruthi Reddy", url: "https://www.linkedin.com/in/ssreddy/" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8 text-center text-gray-600">
      <div className="text-sm space-y-2">
        <p className="font-medium">Team Members:</p>
        <div>
          {team.map((section, idx) => (
            <span key={section.role} className="block md:inline">
              <span className="font-semibold">{section.role}</span>: {section.members.map((member, i) => (
                <span key={member.name}>
                  <TeamLink href={member.url}>{member.name}</TeamLink>
                  {i < section.members.length - 1 && ', '}
                </span>
              ))}
              {idx < team.length - 1 && <span className="mx-2 hidden md:inline">&#8226;</span>}
            </span>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 pt-2">
          <FaGithub className="size-5" />
          <TeamLink href="https://github.com/chingu-voyages/V59-tier3-team-36">
            View on Github
          </TeamLink>
        </div>
      </div>
    </footer>
  );
}