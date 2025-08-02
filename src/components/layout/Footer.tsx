import React from 'react'
import { Link } from 'react-router-dom'
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  LeafIcon,
} from 'lucide-react'

export function Footer() {
  return (
         <footer className="bg-gray-100 dark:bg-gray-800 z-10 relative">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg">
                <LeafIcon size={24} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                GreenRoute
              </h3>
            </div>
                         <p className="text-gray-600 dark:text-gray-400 mb-6 text-base sm:text-lg">
               Plataforma revolucionaria de optimización logística impulsada por IA que 
               transforma el transporte hacia un futuro sostenible. Reduciendo costos 
               mientras salvamos el planeta, una ruta a la vez.
             </p>
                         <div className="flex space-x-4">
               <SocialButton 
                 icon={<GithubIcon size={20} />} 
                 href="https://github.com/aymen0324"
               />
               <SocialButton 
                 icon={<LinkedinIcon size={20} />} 
                 href="https://www.linkedin.com/in/aymane-el-khilaly-42b7962a7/"
               />
               <SocialButton 
                 icon={<MailIcon size={20} />} 
                 href="mailto:aymenkhilaly@gmail.com"
               />
             </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Solutions
            </h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/roi-calculator" className="hover:text-green-500 dark:hover:text-green-400 flex items-center gap-2 transition-colors">
                  <ArrowIcon />
                  ROI Calculator
                </Link>
              </li>
              <li>
                <Link to="/fleet-management" className="hover:text-green-500 dark:hover:text-green-400 flex items-center gap-2 transition-colors">
                  <ArrowIcon />
                  Fleet Management
                </Link>
              </li>
              <li>
                <Link to="/ai-optimizer" className="hover:text-green-500 dark:hover:text-green-400 flex items-center gap-2 transition-colors">
                  <ArrowIcon />
                  AI Route Optimization
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-green-500 dark:hover:text-green-400 flex items-center gap-2 transition-colors">
                  <ArrowIcon />
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/gamification" className="hover:text-green-500 dark:hover:text-green-400 flex items-center gap-2 transition-colors">
                  <ArrowIcon />
                  Driver Gamification
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Contact
            </h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-3">
                <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <MapPinIcon size={16} />
                </div>
                <span>Elche, España</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <PhoneIcon size={16} />
                </div>
                <span>+34 677 412 048</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <MailIcon size={16} />
                </div>
                <span>aymenkhilaly@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
                 <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base text-center sm:text-left">
             &copy; {new Date().getFullYear()} GreenRoute. Impulsando el futuro del transporte sostenible.
           </p>
           <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
             <a href="#" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 text-sm transition-colors">
               Privacy Policy
             </a>
             <a href="#" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 text-sm transition-colors">
               Terms of Service
             </a>
             <a href="#" className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 text-sm transition-colors">
               Cookies
             </a>
           </div>
         </div>
      </div>
    </footer>
  )
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href?: string }) {
  return (
    <a
      href={href || "#"}
      target={href?.startsWith('http') ? "_blank" : undefined}
      rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
      className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
    >
      {icon}
    </a>
  )
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green-500"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
} 