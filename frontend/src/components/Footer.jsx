import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
  <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      
      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
        <FaGithub className="size-5 text-gray-600" />
        <a 
          href="https://github.com/chingu-voyages/V59-tier3-team-36" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-emerald-600 transition-colors"
        >
          View on Github
        </a>
      </div>
      
      <div className="text-sm text-gray-500 md:text-right space-y-1">
        <p className="font-medium text-gray-600">Team Members:</p>
        <p className="font-medium text-gray-600">Scrum Master:</p>
        <p>
          
          <a href="#" className="hover:text-emerald-600 transition-colors">Yangchen Dema</a>
        </p>
        <p className="font-medium text-gray-600 mt-2">Developers:</p>
        <p>
          {/* List of developers with hover effect to green instead of stale gray */}
          <a href="https://www.linkedin.com/in/stanleyeze01/" className="hover:text-emerald-600 transition-colors">Stanley Eze</a> &#8226; 
          <a href="https://www.linkedin.com/in/banto-laczi-klara/" className="hover:text-emerald-600 transition-colors">Banto Klara</a> &#8226; 
          <a href="https://www.linkedin.com/in/kevinllanos7/" className="hover:text-emerald-600 transition-colors">Kevin Llanos</a> &#8226; 
          <a href="https://www.linkedin.com/in/gregminezzi" className="hover:text-emerald-600 transition-colors">Greg Minezzi</a> &#8226; 
          <a href="https://www.linkedin.com/in/ssreddy/" className="hover:text-emerald-600 transition-colors">Shruthi Reddy</a>
        </p>
      </div>
    </div>
  </div>
</footer>
  );
}