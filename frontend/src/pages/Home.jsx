import Button from '../components/Button'
import Card from '../components/Card'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 lg:py-16' >
      <div className='w-full max-w-6xl mx-auto space-y-10' >
        <div className='text-center space-y-4' >
          <h2 className=' text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold text-gray-900' >
            Practice Interview Questions <span className=' block text-emerald-600'>Anytime</span>
          </h2>
          <p className='text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto' >
            Prepare for your next role with AI-powered interview practice. Choose your role and master the questions that matter.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' >
          <Card
            icon={<CheckCircle className='text-green-600' size={32} />}
            title='Multiple Questions'
            description='Practice questions tailored for Scrum Masters, Product Owners, Developers, and Designers' 
          />
          <Card
            icon={<CheckCircle className='text-green-600' size={32} />}
            title='Instant feedback'
            description='Get immediate feedback on your answers with up to 3 attempts per question'
          />
          <Card
            icon={<CheckCircle className='text-green-600' size={32} />}
            title='Track Progress'
            description='View detailed summaries and statistics after completing each session' 
          />
        </div>
        <div className='flex justify-center' >
          <div className='w-full sm:w-auto' >
            <Button  buttonText='Get Started' icon={<ArrowRight />} onButtonClick={() => navigate('/roles')} className='w-full sm:w-auto' />
          </div>
        </div>

        <div className='bg-emerald-50 border border-emerald-100 rounded-xl p-5 sm:p-6 lg:p-8'>
          <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4'>What You'll Get:</h3>
          <ul className='space-y-3 text-gray-700 text-sm sm:text-base' >
            <li className='flex items-start gap-2' >
              <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>curated interview questions for each chingu role</span>
            </li>
            <li className='flex items-start gap-2' >
              <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Multiple choice format with detailed explanations</span>
            </li>
            <li className='flex items-start gap-2' >
              <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Performance trackinng and statistics</span>
            </li>
            <li className='flex items-start gap-2' >
              <CheckCircle className="size-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Practice as many times as you need to build confidence</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
